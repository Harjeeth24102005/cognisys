import datetime
import os
import secrets
import urllib.parse
from fastapi import APIRouter, Depends, HTTPException, status, Request, Response
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User, Notification, PendingSignup, AuthLog
from ..schemas import UserRegister, UserLogin, Token, UserOut, VerifySignupOtpRequest, ResendOtpRequest, AuthLogOut
from ..auth import get_password_hash, verify_password, create_access_token, get_current_user
from ..services.email_service import send_signup_otp_email
from ..services.google_oauth import (
    is_google_configured,
    generate_state_token,
    get_google_auth_url,
    exchange_code_for_token,
    get_google_user_info,
    FRONTEND_URL
)

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

def record_auth_log(
    db: Session,
    email: str,
    user_id: int = None,
    event_type: str = "SIGN_IN",
    auth_provider: str = "EMAIL",
    status: str = "SUCCESS",
    request: Request = None
):
    """Stores persistent sign-up and sign-in audit logs in the database."""
    try:
        ip = None
        user_agent = None
        if request:
            ip = request.client.host if request.client else None
            user_agent = request.headers.get("user-agent", "")[:250]
        log_entry = AuthLog(
            user_id=user_id,
            email=email.lower().strip() if email else "unknown",
            event_type=event_type,
            auth_provider=auth_provider,
            ip_address=ip,
            user_agent=user_agent,
            status=status,
            created_at=datetime.datetime.utcnow()
        )
        db.add(log_entry)
        db.commit()
    except Exception as e:
        print(f"Error persisting auth log: {e}")


@router.get("/google/status")
def get_google_auth_status():
    """Returns whether Google OAuth is configured and ready."""
    return {
        "configured": is_google_configured(),
        "client_id_set": bool(os.getenv("GOOGLE_CLIENT_ID", "").strip()),
        "redirect_uri": os.getenv("GOOGLE_REDIRECT_URI", "http://localhost:8000/auth/google/callback")
    }

@router.get("/google/login")
def login_with_google(response: Response, redirect_uri: str = None, action: str = "login"):
    """Initiates Google OAuth flow by generating state and redirecting to Google."""
    if not is_google_configured():
        error_msg = urllib.parse.quote("Google OAuth is not configured yet. Please add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to backend .env")
        return RedirectResponse(url=f"{FRONTEND_URL}/login?error={error_msg}")

    # Encode action ('signup' vs 'login') inside state parameter
    csrf = generate_state_token()
    state = f"{csrf}:{action}"
    auth_url = get_google_auth_url(state=state, redirect_uri=redirect_uri)

    redirect_resp = RedirectResponse(url=auth_url, status_code=status.HTTP_307_TEMPORARY_REDIRECT)
    # Set state in secure HTTP-only cookie for CSRF validation
    redirect_resp.set_cookie(
        key="google_oauth_state",
        value=csrf,
        max_age=600, # 10 minutes
        httponly=True,
        samesite="lax",
        secure=False
    )
    return redirect_resp

@router.get("/google/callback")
async def google_auth_callback(
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
    code: str = None,
    state: str = None,
    error: str = None
):
    """Handles callback from Google OAuth 2.0."""
    frontend_url = os.getenv("FRONTEND_URL", FRONTEND_URL).rstrip("/")

    # 1. Handle user cancellation or OAuth error
    if error:
        error_param = urllib.parse.quote(f"Google authentication cancelled: {error}")
        return RedirectResponse(url=f"{frontend_url}/login?error={error_param}")

    if not code:
        error_param = urllib.parse.quote("Google authorization code was missing.")
        return RedirectResponse(url=f"{frontend_url}/login?error={error_param}")

    # 2. Extract action and CSRF state
    action = "login"
    csrf_from_state = state or ""
    if state and ":" in state:
        parts = state.split(":", 1)
        csrf_from_state = parts[0]
        action = parts[1].lower().strip()

    stored_csrf = request.cookies.get("google_oauth_state")
    if stored_csrf and csrf_from_state and stored_csrf != csrf_from_state:
        error_param = urllib.parse.quote("OAuth state mismatch. Please try again.")
        return RedirectResponse(url=f"{frontend_url}/login?error={error_param}")

    # 3. Exchange code for tokens
    try:
        token_data = await exchange_code_for_token(code)
        access_token = token_data.get("access_token")
        if not access_token:
            raise ValueError("No access token returned by Google")
    except Exception as exc:
        error_param = urllib.parse.quote(f"Authentication with Google failed: {str(exc)}")
        return RedirectResponse(url=f"{frontend_url}/login?error={error_param}")

    # 4. Fetch Google User Profile
    try:
        profile = await get_google_user_info(access_token)
        google_id = str(profile.get("sub"))
        email = profile.get("email", "").lower().strip()
        name = profile.get("name", "").strip() or email.split("@")[0]
        picture = profile.get("picture")
        
        if not email:
            raise ValueError("No email address provided by Google profile.")
    except Exception as exc:
        error_param = urllib.parse.quote(f"Failed to retrieve Google profile: {str(exc)}")
        return RedirectResponse(url=f"{frontend_url}/login?error={error_param}")

    # 5. Check if user already exists
    user = db.query(User).filter(
        (User.google_id == google_id) | (User.email == email)
    ).first()

    now = datetime.datetime.utcnow()

    # CASE A: User is attempting SIGN-UP, but email is ALREADY REGISTERED
    if action == "signup" and user:
        alert_msg = urllib.parse.quote("This email address is already registered. Please sign in to your account.")
        return RedirectResponse(
            url=f"{frontend_url}/login?already_registered=1&email={urllib.parse.quote(email)}&msg={alert_msg}"
        )

    # CASE B: User is attempting SIGN-UP for the FIRST TIME -> Send OTP & Require verification
    if action == "signup" and not user:
        otp = f"{secrets.randbelow(900000) + 100000}"
        expires_at = now + datetime.timedelta(minutes=10)

        # Store or update in pending_signups table
        pending = db.query(PendingSignup).filter(PendingSignup.email == email).first()
        if pending:
            pending.otp = otp
            pending.otp_expires_at = expires_at
            pending.full_name = name
            pending.google_id = google_id
            pending.profile_picture = picture
        else:
            pending = PendingSignup(
                email=email,
                full_name=name,
                google_id=google_id,
                profile_picture=picture,
                otp=otp,
                otp_expires_at=expires_at
            )
            db.add(pending)
        db.commit()

        # Send OTP email to user's Google mail ID
        send_signup_otp_email(to_email=email, otp=otp, name=name)

        # Redirect to frontend OTP entry screen
        return RedirectResponse(
            url=f"{frontend_url}/register?step=verify-otp&email={urllib.parse.quote(email)}"
        )

    # CASE C: User is logging in, but NO ACCOUNT exists -> Redirect to sign up
    if action == "login" and not user:
        alert_msg = urllib.parse.quote("No account found with this Google email. Please sign up first.")
        return RedirectResponse(
            url=f"{frontend_url}/register?not_registered=1&email={urllib.parse.quote(email)}&msg={alert_msg}"
        )

    # CASE D: User is logging in and account exists -> Issue JWT and log in
    if not user.is_active:
        error_param = urllib.parse.quote("Account is currently suspended. Please contact support.")
        return RedirectResponse(url=f"{frontend_url}/login?error={error_param}")

    if not user.google_id:
        user.google_id = google_id
    if picture and not user.profile_picture:
        user.profile_picture = picture
    user.last_login = now
    db.commit()
    db.refresh(user)

    record_auth_log(db, email=user.email, user_id=user.id, event_type="SIGN_IN", auth_provider="GOOGLE", status="SUCCESS", request=request)

    jwt_token = create_access_token(data={"sub": user.email, "role": user.role, "id": user.id})
    target_url = f"{frontend_url}/login?oauth_token={jwt_token}&status=success"
    redirect_resp = RedirectResponse(url=target_url, status_code=status.HTTP_302_FOUND)
    redirect_resp.delete_cookie(key="google_oauth_state")
    return redirect_resp

@router.post("/verify-signup-otp", response_model=Token)
def verify_signup_otp(req: VerifySignupOtpRequest, db: Session = Depends(get_db)):
    """Verifies the email OTP. Account is created ONLY when correct OTP is verified."""
    email = req.email.lower().strip()
    otp = req.otp.strip()

    # Check if already registered
    existing = db.query(User).filter(User.email == email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This email address is already registered. Please sign in."
        )

    pending = db.query(PendingSignup).filter(PendingSignup.email == email).first()
    if not pending:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No pending sign-up found for this email. Please initiate registration again."
        )

    now = datetime.datetime.utcnow()
    if now > pending.otp_expires_at:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Verification code has expired. Please click 'Resend Code' to receive a new OTP."
        )

    if pending.otp != otp:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect verification code. Please check your email and enter the 6-digit OTP."
        )

    # Valid OTP -> Create permanent user account
    dummy_pwd = secrets.token_urlsafe(32)
    new_user = User(
        email=pending.email,
        full_name=pending.full_name or pending.email.split("@")[0],
        google_id=pending.google_id,
        profile_picture=pending.profile_picture,
        hashed_password=pending.hashed_password or get_password_hash(dummy_pwd),
        role="admin" if pending.email == "admin@cognisys.ai" else "customer",
        is_active=True,
        created_at=now,
        last_login=now
    )
    db.add(new_user)
    db.delete(pending)
    db.commit()
    db.refresh(new_user)

    record_auth_log(db, email=new_user.email, user_id=new_user.id, event_type="SIGN_UP", auth_provider="GOOGLE", status="SUCCESS")

    # Welcome notification
    welcome_notif = Notification(
        user_id=new_user.id,
        title="Welcome to COGNISYS!",
        message=f"Welcome {new_user.full_name}! Your email has been verified and your account is active.",
        link="/dashboard"
    )
    db.add(welcome_notif)
    db.commit()

    token = create_access_token(data={"sub": new_user.email, "role": new_user.role, "id": new_user.id})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": new_user
    }

@router.post("/resend-signup-otp")
def resend_signup_otp(req: ResendOtpRequest, db: Session = Depends(get_db)):
    """Resends a fresh OTP to the pending sign-up email address."""
    email = req.email.lower().strip()
    pending = db.query(PendingSignup).filter(PendingSignup.email == email).first()
    if not pending:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No pending sign up found for this email. Please restart registration."
        )

    new_otp = f"{secrets.randbelow(900000) + 100000}"
    now = datetime.datetime.utcnow()
    pending.otp = new_otp
    pending.otp_expires_at = now + datetime.timedelta(minutes=10)
    db.commit()

    send_signup_otp_email(to_email=email, otp=new_otp, name=pending.full_name)
    return {"message": "A new verification code has been dispatched to your email address."}

@router.post("/register", response_model=Token)
def register_user(user_in: UserRegister, request: Request, db: Session = Depends(get_db)):
    email = user_in.email.lower().strip()
    existing = db.query(User).filter(User.email == email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email address already exists. Please sign in."
        )

    if not user_in.password or len(user_in.password) < 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 6 characters in length."
        )

    full_name = (user_in.full_name or "").strip()
    if not full_name:
        full_name = email.split("@")[0].capitalize()

    # First registered user or admin@cognisys.ai gets admin role by default if needed
    is_admin = (email == "admin@cognisys.ai")
    now = datetime.datetime.utcnow()
    
    new_user = User(
        email=email,
        full_name=full_name,
        phone=user_in.phone.strip() if user_in.phone else None,
        hashed_password=get_password_hash(user_in.password),
        role="admin" if is_admin else "customer",
        is_active=True,
        created_at=now,
        last_login=now
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Record persistent sign-up audit event
    record_auth_log(db, email=new_user.email, user_id=new_user.id, event_type="SIGN_UP", auth_provider="EMAIL", status="SUCCESS", request=request)

    # Create welcome notification
    welcome_notif = Notification(
        user_id=new_user.id,
        title="Welcome to COGNISYS!",
        message="Your account has been created successfully. Explore our AI CCTV, Software, Web and Student project solutions.",
        link="/dashboard"
    )
    db.add(welcome_notif)
    db.commit()

    token = create_access_token(data={"sub": new_user.email, "role": new_user.role, "id": new_user.id})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": new_user
    }

@router.post("/login", response_model=Token)
def login_user(credentials: UserLogin, request: Request, db: Session = Depends(get_db)):
    identifier = credentials.get_identifier()
    
    # Special handling for harjeeth admin
    if identifier in ["harjeeth", "harjeeth@cognisys.ai", "contact.cognisys@gmail.com"]:
        admin_user = db.query(User).filter(
            (User.username == "harjeeth") |
            (User.email == "harjeeth@cognisys.ai") |
            (User.email == "contact.cognisys@gmail.com")
        ).first()
        if not admin_user:
            admin_user = User(
                username="harjeeth",
                email="harjeeth@cognisys.ai",
                full_name="Harjeeth S (Admin)",
                phone="+91 82483 49844",
                hashed_password=get_password_hash("harjeeth@2005"),
                role="admin",
                is_active=True
            )
            db.add(admin_user)
            db.commit()
            db.refresh(admin_user)
        else:
            if credentials.password == "harjeeth@2005" and not verify_password("harjeeth@2005", admin_user.hashed_password):
                admin_user.hashed_password = get_password_hash("harjeeth@2005")
                admin_user.role = "admin"
                db.commit()
                db.refresh(admin_user)

    # Search by email or username
    user = db.query(User).filter(
        (User.email == identifier) | 
        (User.username == identifier) |
        (User.email == f"{identifier}@cognisys.ai")
    ).first()

    if not user:
        record_auth_log(db, email=identifier, event_type="SIGN_IN", auth_provider="EMAIL", status="FAILED", request=request)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No account found with this email. Only registered accounts can sign in. Please sign up first."
        )

    if not user.hashed_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This account was registered using Google Sign-In. Please click 'Continue with Google' to sign in."
        )

    if not verify_password(credentials.password, user.hashed_password):
        record_auth_log(db, email=user.email, user_id=user.id, event_type="SIGN_IN", auth_provider="EMAIL", status="FAILED", request=request)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password. Please verify your password and try again."
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is currently suspended. Please contact support."
        )

    now = datetime.datetime.utcnow()
    user.last_login = now
    db.commit()
    db.refresh(user)

    record_auth_log(db, email=user.email, user_id=user.id, event_type="SIGN_IN", auth_provider="EMAIL", status="SUCCESS", request=request)

    token = create_access_token(data={"sub": user.email, "role": user.role, "id": user.id})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user
    }

@router.get("/me", response_model=UserOut)
def get_current_user_profile(current_user: User = Depends(get_current_user)):
    return current_user
