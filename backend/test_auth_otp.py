import sys
import json
import urllib.request
import urllib.error
from datetime import datetime, timedelta
from app.database import SessionLocal
from app.models import PendingSignup, User
from app.security import get_password_hash

def test_otp_flow():
    db = SessionLocal()
    test_email = "cognisys_test_user@gmail.com"
    
    # Cleanup previous test runs
    db.query(User).filter(User.email == test_email).delete()
    db.query(PendingSignup).filter(PendingSignup.email == test_email).delete()
    db.commit()

    # Step 1: Create a PendingSignup (as would happen when user clicks Google Sign-Up or standard signup)
    test_otp = "492817"
    pending = PendingSignup(
        email=test_email,
        full_name="Alex Mercer",
        google_id="google_test_12345",
        profile_picture="https://lh3.googleusercontent.com/test.jpg",
        hashed_password=get_password_hash("TestPassword123!"),
        otp=test_otp,
        otp_expires_at=datetime.utcnow() + timedelta(minutes=10)
    )
    db.add(pending)
    db.commit()
    print("✓ 1. PendingSignup created for:", test_email, "with OTP:", test_otp)

    # Step 2: Test wrong OTP submission
    payload_bad = json.dumps({"email": test_email, "otp": "000000"}).encode('utf-8')
    req = urllib.request.Request(
        "http://127.0.0.1:8000/api/auth/verify-signup-otp",
        data=payload_bad,
        headers={"Content-Type": "application/json"}
    )
    try:
        urllib.request.urlopen(req)
        print("✗ Expected failure on wrong OTP, but succeeded!")
        sys.exit(1)
    except urllib.error.HTTPError as e:
        err_body = json.loads(e.read().decode('utf-8'))
        print("✓ 2. Incorrect OTP rejected properly:", e.code, err_body.get('detail'))

    # Step 3: Test correct OTP verification
    payload_good = json.dumps({"email": test_email, "otp": test_otp}).encode('utf-8')
    req = urllib.request.Request(
        "http://127.0.0.1:8000/api/auth/verify-signup-otp",
        data=payload_good,
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode('utf-8'))
        print("✓ 3. Correct OTP verified successfully!")
        print("     User Created:", res['user']['email'], "| Name:", res['user']['full_name'])
        print("     JWT Token Issued:", res['access_token'][:25] + "...")

    # Step 4: Verify PendingSignup was removed after activation
    remaining_pending = db.query(PendingSignup).filter(PendingSignup.email == test_email).first()
    assert remaining_pending is None, "Pending signup was not cleaned up!"
    print("✓ 4. PendingSignup record cleaned up from database.")

    # Step 5: Verify User exists in database
    created_user = db.query(User).filter(User.email == test_email).first()
    assert created_user is not None, "User was not found in users table!"
    print("✓ 5. User activated in DB with ID:", created_user.id)

    # Step 6: Test resend-otp rejection when already registered
    resend_payload = json.dumps({"email": test_email}).encode('utf-8')
    req = urllib.request.Request(
        "http://127.0.0.1:8000/api/auth/resend-signup-otp",
        data=resend_payload,
        headers={"Content-Type": "application/json"}
    )
    try:
        urllib.request.urlopen(req)
        print("✗ Expected failure on resend for registered user, but succeeded!")
        sys.exit(1)
    except urllib.error.HTTPError as e:
        err_body = json.loads(e.read().decode('utf-8'))
        print("✓ 6. Resend rejected because email already registered:", e.code, err_body.get('detail'))

    # Cleanup
    db.query(User).filter(User.email == test_email).delete()
    db.commit()
    db.close()
    print("\n✓✓ ALL AUTH OTP & REGISTRATION CHECKS PASSED PERFECTLY! ✓✓")

if __name__ == "__main__":
    test_otp_flow()
