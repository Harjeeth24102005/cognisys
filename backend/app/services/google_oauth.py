import os
import secrets
import urllib.parse
import httpx
from pathlib import Path
from typing import Optional, Dict, Any
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent.parent
ENV_PATH = BASE_DIR / ".env"
load_dotenv(dotenv_path=ENV_PATH)

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET", "")
GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI", "http://localhost:8000/auth/google/callback")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8000")

def is_google_configured() -> bool:
    """Check if Google OAuth credentials have been configured."""
    client_id = os.getenv("GOOGLE_CLIENT_ID", GOOGLE_CLIENT_ID).strip()
    client_secret = os.getenv("GOOGLE_CLIENT_SECRET", GOOGLE_CLIENT_SECRET).strip()
    if not (client_id and client_secret and "your-google" not in client_id.lower()):
        # Retry with explicit reload in case .env was edited after process start
        load_dotenv(dotenv_path=ENV_PATH, override=True)
        client_id = os.getenv("GOOGLE_CLIENT_ID", "").strip()
        client_secret = os.getenv("GOOGLE_CLIENT_SECRET", "").strip()
    return bool(client_id and client_secret and "your-google" not in client_id.lower())

def generate_state_token() -> str:
    """Generate a cryptographically secure random state token for CSRF protection."""
    return secrets.token_urlsafe(32)

def get_google_auth_url(state: str, redirect_uri: Optional[str] = None) -> str:
    """Construct Google OAuth 2.0 authorization URL."""
    resolved_redirect_uri = redirect_uri or os.getenv("GOOGLE_REDIRECT_URI", GOOGLE_REDIRECT_URI)
    client_id = os.getenv("GOOGLE_CLIENT_ID", GOOGLE_CLIENT_ID).strip()
    
    params = {
        "client_id": client_id,
        "redirect_uri": resolved_redirect_uri,
        "response_type": "code",
        "scope": "openid email profile",
        "state": state,
        "access_type": "offline",
        "prompt": "select_account"
    }
    return f"https://accounts.google.com/o/oauth2/v2/auth?{urllib.parse.urlencode(params)}"

async def exchange_code_for_token(code: str, redirect_uri: Optional[str] = None) -> Dict[str, Any]:
    """Exchange authorization code for access token at Google token endpoint."""
    resolved_redirect_uri = redirect_uri or os.getenv("GOOGLE_REDIRECT_URI", GOOGLE_REDIRECT_URI)
    client_id = os.getenv("GOOGLE_CLIENT_ID", GOOGLE_CLIENT_ID).strip()
    client_secret = os.getenv("GOOGLE_CLIENT_SECRET", GOOGLE_CLIENT_SECRET).strip()

    token_endpoint = "https://oauth2.googleapis.com/token"
    payload = {
        "client_id": client_id,
        "client_secret": client_secret,
        "code": code,
        "grant_type": "authorization_code",
        "redirect_uri": resolved_redirect_uri
    }

    async with httpx.AsyncClient(timeout=15.0) as client:
        response = await client.post(token_endpoint, data=payload)
        if response.status_code != 200:
            error_data = response.json() if response.headers.get("content-type", "").startswith("application/json") else response.text
            raise RuntimeError(f"Google Token Exchange Failed ({response.status_code}): {error_data}")
        return response.json()

async def get_google_user_info(access_token: str) -> Dict[str, Any]:
    """Retrieve authenticated user's profile information from Google userinfo endpoint."""
    userinfo_endpoint = "https://www.googleapis.com/oauth2/v3/userinfo"
    headers = {"Authorization": f"Bearer {access_token}"}

    async with httpx.AsyncClient(timeout=15.0) as client:
        response = await client.get(userinfo_endpoint, headers=headers)
        if response.status_code != 200:
            raise RuntimeError(f"Failed to fetch Google user profile ({response.status_code})")
        return response.json()
