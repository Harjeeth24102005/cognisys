import uuid
import datetime
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Payment, Quotation, Order, User, Notification, Project
from ..schemas import PaymentCreate, PaymentOut
from ..auth import get_current_user

router = APIRouter(prefix="/api/payments", tags=["Payments"])

@router.post("", response_model=PaymentOut)
def make_payment(
    payment_in: PaymentCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    order = db.query(Order).filter(Order.id == payment_in.order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Forbidden")

    # Get amount from quotation or default
    amount = 5000.0
    if order.quotation:
        amount = order.quotation.total_amount

    tx_id = f"TXN-COG-{uuid.uuid4().hex[:10].upper()}"
    
    payment = Payment(
        quotation_id=order.quotation.id if order.quotation else None,
        order_id=order.id,
        user_id=current_user.id,
        amount=amount,
        currency="INR",
        payment_method=payment_in.payment_method or "UPI / Card / NetBanking",
        transaction_id=tx_id,
        status="COMPLETED",
        paid_at=datetime.datetime.utcnow()
    )
    db.add(payment)

    # Progress order lifecycle
    order.status = "DEVELOPMENT"

    # Create or update project
    project = db.query(Project).filter(Project.order_id == order.id).first()
    if not project:
        project = Project(
            order_id=order.id,
            user_id=order.user_id,
            title=order.title,
            category=order.service_name or "Custom Engineering",
            description=order.description,
            progress_pct=25,
            status="IN_PROGRESS",
            start_date=datetime.datetime.utcnow()
        )
        db.add(project)
    else:
        project.status = "IN_PROGRESS"
        project.progress_pct = max(project.progress_pct, 25)

    # Customer notification
    notif = Notification(
        user_id=current_user.id,
        title="Payment Successful — Project Initiated!",
        message=f"Payment of ₹{amount:,.2f} received. Your project '{order.title}' has entered active development.",
        link=f"/dashboard?tab=projects"
    )
    db.add(notif)

    # Admin notifications
    admins = db.query(User).filter(User.role == "admin").all()
    for adm in admins:
        admin_notif = Notification(
            user_id=adm.id,
            title=f"Payment Received: ₹{amount:,.2f}",
            message=f"Order #{order.order_number} by {current_user.full_name} is now paid and in DEVELOPMENT.",
            link=f"/admin?tab=payments"
        )
        db.add(admin_notif)

    db.commit()
    db.refresh(payment)
    return payment

@router.get("", response_model=List[PaymentOut])
def get_user_payments(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role == "admin":
        return db.query(Payment).order_by(Payment.paid_at.desc()).all()
    return db.query(Payment).filter(Payment.user_id == current_user.id).order_by(Payment.paid_at.desc()).all()
