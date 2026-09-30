from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from ..database import get_db
from ..models import User, Order, Project, Quotation, Payment, Message, BlogPost, AuthLog
from ..schemas import AdminStatsOut, UserOut, AuthLogOut
from ..auth import get_admin_user

router = APIRouter(prefix="/api/admin", tags=["Admin Management"])

@router.get("/stats", response_model=AdminStatsOut)
def get_admin_dashboard_stats(
    admin: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    total_users = db.query(func.count(User.id)).scalar() or 0
    total_orders = db.query(func.count(Order.id)).filter(Order.email_dispatched == True).scalar() or 0
    active_projects = db.query(func.count(Project.id)).filter(Project.order_id != None, Project.status != "COMPLETED").scalar() or 0
    completed_projects = db.query(func.count(Project.id)).filter(Project.order_id != None, Project.status == "COMPLETED").scalar() or 0
    pending_quotations = db.query(func.count(Quotation.id)).join(Order).filter(Order.email_dispatched == True, Quotation.status == "PENDING").scalar() or 0
    
    total_revenue = db.query(func.sum(Payment.amount)).join(Order).filter(Order.email_dispatched == True, Payment.status == "COMPLETED").scalar() or 0.0
    total_messages = db.query(func.count(Message.id)).scalar() or 0

    return {
        "total_users": total_users,
        "total_orders": total_orders,
        "active_projects": active_projects,
        "completed_projects": completed_projects,
        "pending_quotations": pending_quotations,
        "total_revenue": float(total_revenue),
        "total_messages": total_messages
    }

@router.get("/users", response_model=List[UserOut])
def get_all_users(
    admin: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    return db.query(User).order_by(User.created_at.desc()).all()

@router.patch("/users/{user_id}/role")
def change_user_role(
    user_id: int,
    role: str,
    admin: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    if role not in ["customer", "admin"]:
        raise HTTPException(status_code=400, detail="Invalid role specification")
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.role = role
    db.commit()
    return {"message": f"User {user.email} role updated to {role}"}

@router.get("/auth-logs", response_model=List[AuthLogOut])
def get_admin_auth_logs(
    admin: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Returns chronological audit logs of user registrations and logins."""
    return db.query(AuthLog).order_by(AuthLog.created_at.desc()).limit(150).all()

