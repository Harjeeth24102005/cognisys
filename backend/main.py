import os
from pathlib import Path
from dotenv import load_dotenv

# Ensure backend/.env is loaded immediately with explicit path regardless of CWD
BASE_DIR = Path(__file__).resolve().parent
ENV_PATH = BASE_DIR / ".env"
load_dotenv(dotenv_path=ENV_PATH, override=True)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.database import engine, Base, SessionLocal
from app.seed import seed_database
from app.routers import (
    auth_router,
    services_router,
    orders_router,
    quotations_router,
    payments_router,
    projects_router,
    messages_router,
    notifications_router,
    blog_router,
    admin_router
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Seed initial data
db = SessionLocal()
try:
    seed_database(db)
finally:
    db.close()

app = FastAPI(
    title="cognisys",
    description="Backend REST API for cognisys: AI CCTV Surveillance, Web Development, Software Engineering, Student Innovation Projects",
    version="1.0.0"
)

# CORS configuration
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount uploads directory if exists
uploads_dir = os.path.join(os.path.dirname(__file__), "app", "uploads")
os.makedirs(uploads_dir, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=uploads_dir), name="uploads")

# Include Routers
app.include_router(auth_router.router)
app.include_router(services_router.router)
app.include_router(orders_router.router)
app.include_router(quotations_router.router)
app.include_router(payments_router.router)
app.include_router(projects_router.router)
app.include_router(messages_router.router)
app.include_router(notifications_router.router)
app.include_router(blog_router.router)
app.include_router(admin_router.router)

# Top-level OAuth compatibility endpoints (support both /auth/google/* and /api/auth/google/*)
@app.get("/auth/google/login")
def auth_google_login_alias(response: auth_router.Response, redirect_uri: str = None, action: str = "login"):
    return auth_router.login_with_google(response=response, redirect_uri=redirect_uri, action=action)

@app.get("/auth/google/callback")
async def auth_google_callback_alias(
    request: auth_router.Request,
    response: auth_router.Response,
    db = auth_router.Depends(auth_router.get_db),
    code: str = None,
    state: str = None,
    error: str = None
):
    return await auth_router.google_auth_callback(
        request=request,
        response=response,
        db=db,
        code=code,
        state=state,
        error=error
    )

@app.get("/")
def root():
    return {
        "company": "cognisys",
        "tagline": "Intelligence. Innovation. Digital Solutions.",
        "status": "Online",
        "docs": "/docs",
        "version": "1.0.0"
    }

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "cognisys API"}

@app.post("/api/contact")
def submit_contact_inquiry(inquiry_data: dict):
    from app.services.email_service import send_contact_inquiry_email
    dispatched = send_contact_inquiry_email(inquiry_data)
    return {
        "success": True,
        "delivered": bool(dispatched),
        "message": "Inquiry transmitted to contact.cognisys@gmail.com via Backend SMTP protocol."
    }

