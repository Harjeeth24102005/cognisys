import sys
from fastapi.testclient import TestClient
from app.database import SessionLocal
from app.models import User, AuthLog, Order, Quotation
from main import app

client = TestClient(app)

def test_full_auth_flow():
    print("=== 1. Testing Registration ===")
    test_email = "testuser_unique_2026@cognisys.ai"
    
    # Clean up test user if exists
    db = SessionLocal()
    existing = db.query(User).filter(User.email == test_email).first()
    if existing:
        db.delete(existing)
        db.commit()
    db.close()

    # Too short password
    res = client.post("/api/auth/register", json={
        "email": test_email,
        "password": "123",
        "confirm_password": "123",
        "full_name": "Test User"
    })
    assert res.status_code == 400, f"Expected 400 for short password, got {res.status_code}: {res.text}"
    print("[PASS] Short password rejected successfully")

    # Valid registration
    res = client.post("/api/auth/register", json={
        "email": test_email,
        "password": "password123",
        "confirm_password": "password123",
        "full_name": "Test User Regular"
    })
    assert res.status_code == 200, f"Expected 200 for valid registration, got {res.status_code}: {res.text}"
    reg_data = res.json()
    assert "access_token" in reg_data
    assert reg_data["user"]["email"] == test_email
    print("[PASS] Registration successful with token and user profile")

    # Duplicate registration
    res = client.post("/api/auth/register", json={
        "email": test_email,
        "password": "password123",
        "confirm_password": "password123"
    })
    assert res.status_code == 400, f"Expected 400 for duplicate email, got {res.status_code}"
    print("[PASS] Duplicate registration rejected successfully")

    print("\n=== 2. Testing Sign In Restrictions ===")
    # Unregistered email
    unregistered_email = "nonexistent_client_9999@nowhere.com"
    res = client.post("/api/auth/login", json={
        "username_or_email": unregistered_email,
        "password": "password123"
    })
    assert res.status_code == 404, f"Expected 404 for unregistered email, got {res.status_code}: {res.text}"
    assert "Only registered accounts can sign in" in res.json()["detail"]
    print("[PASS] Unregistered email rejected with 404 and clear prompt to sign up")

    # Wrong password
    res = client.post("/api/auth/login", json={
        "username_or_email": test_email,
        "password": "wrongpassword"
    })
    assert res.status_code == 401, f"Expected 401 for wrong password, got {res.status_code}: {res.text}"
    assert "Incorrect password" in res.json()["detail"]
    print("[PASS] Wrong password rejected with 401")

    # Valid login
    res = client.post("/api/auth/login", json={
        "username_or_email": test_email,
        "password": "password123"
    })
    assert res.status_code == 200, f"Expected 200 for valid login, got {res.status_code}: {res.text}"
    login_data = res.json()
    user_token = login_data["access_token"]
    assert "access_token" in login_data
    print("[PASS] Registered user login successful")

    print("\n=== 3. Testing Admin Login & Auth Logs ===")
    # Admin login
    res = client.post("/api/auth/login", json={
        "username_or_email": "harjeeth",
        "password": "harjeeth@2005"
    })
    assert res.status_code == 200, f"Admin login failed: {res.text}"
    admin_token = res.json()["access_token"]
    assert res.json()["user"]["role"] == "admin"
    print("[PASS] Admin harjeeth logged in successfully")

    # Fetch Auth Logs as Admin
    res = client.get("/api/admin/auth-logs", headers={"Authorization": f"Bearer {admin_token}"})
    assert res.status_code == 200, f"Failed to fetch auth logs: {res.text}"
    logs = res.json()
    assert len(logs) > 0, "No auth logs found"
    print(f"[PASS] Retrieved {len(logs)} auth logs from database")
    print(f"  Latest log entry: Event={logs[0]['event_type']}, Email={logs[0]['email']}, Status={logs[0]['status']}, Provider={logs[0]['auth_provider']}")

    # Check non-admin cannot access admin auth logs
    res = client.get("/api/admin/auth-logs", headers={"Authorization": f"Bearer {user_token}"})
    assert res.status_code == 403, f"Expected 403 for non-admin on admin logs, got {res.status_code}"
    print("[PASS] Regular user forbidden from admin logs (security verified)")

    print("\n=== 4. Checking Database for Sample Data Absence ===")
    db = SessionLocal()
    sample_orders = db.query(Order).filter(
        Order.customer_email.in_(["rajesh.kumar@example.com", "client@test.com", "test@example.com"])
    ).all()
    assert len(sample_orders) == 0, f"Found {len(sample_orders)} sample orders! They should be purged."
    print("[PASS] Database verified clean: 0 sample orders present")

    # Clean up test user
    test_user_obj = db.query(User).filter(User.email == test_email).first()
    if test_user_obj:
        db.delete(test_user_obj)
        db.commit()
    db.close()

    print("\nALL BACKEND AUTH & AUDIT LOG TESTS PASSED!")

if __name__ == "__main__":
    test_full_auth_flow()
