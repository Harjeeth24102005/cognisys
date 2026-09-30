import uuid
import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Order, User, Notification, Service, Project
from ..schemas import OrderCreate, OrderOut, OrderStatusUpdate
from ..auth import get_optional_user, get_current_user, get_admin_user
from ..services.email_service import send_order_specifications_email, send_contact_inquiry_email

router = APIRouter(prefix="/api/orders", tags=["Orders"])

def generate_order_number():
    random_suffix = uuid.uuid4().hex[:6].upper()
    year = datetime.datetime.utcnow().year
    return f"COG-{year}-{random_suffix}"

@router.post("", response_model=OrderOut)
def create_order(
    order_in: OrderCreate,
    current_user: Optional[User] = Depends(get_optional_user),
    db: Session = Depends(get_db)
):
    order_num = generate_order_number()
    
    # Resolve service name if service_id passed
    service_name = order_in.service_name
    if order_in.service_id and not service_name:
        svc = db.query(Service).filter(Service.id == order_in.service_id).first()
        if svc:
            service_name = svc.name

    user_id = current_user.id if current_user else None
    customer_name = order_in.customer_name or (current_user.full_name if current_user else "Guest Customer")
    customer_email = order_in.customer_email or (current_user.email if current_user else "Not provided")
    customer_phone = order_in.customer_phone or (current_user.phone if current_user else "Not provided")

    new_order = Order(
        order_number=order_num,
        user_id=user_id,
        customer_name=customer_name,
        customer_email=customer_email,
        customer_phone=customer_phone,
        service_id=order_in.service_id,
        service_name=service_name or "Custom Software Solution",
        title=order_in.title,
        description=order_in.description,
        budget=order_in.budget,
        timeline=order_in.timeline,
        tech_preferences=order_in.tech_preferences,
        cart_items_json=order_in.cart_items_json,
        attachment_filename=order_in.attachment_filename,
        status="REQUESTED",
        email_dispatched=False
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    # Automatically dispatch complete specifications or contact message to contact.cognisys@gmail.com
    email_dispatched = False
    if new_order.service_name == "General / Custom Inquiry" or (new_order.description and new_order.description.startswith("[CONTACT MESSAGE]")):
        email_dispatched = send_contact_inquiry_email({
            "name": customer_name,
            "email": customer_email,
            "phone": customer_phone,
            "subject": new_order.title,
            "message": new_order.description.replace("[CONTACT MESSAGE]\n", "")
        })
    else:
        order_payload = {
            "order_number": order_num,
            "customer_name": customer_name,
            "customer_email": customer_email,
            "customer_phone": customer_phone,
            "service_name": new_order.service_name,
            "title": new_order.title,
            "description": new_order.description,
            "budget": new_order.budget,
            "timeline": new_order.timeline,
            "tech_preferences": new_order.tech_preferences,
            "cart_items": order_in.cart_items_json
        }
        email_dispatched = send_order_specifications_email(order_payload)

    new_order.email_dispatched = bool(email_dispatched)

    # If logged-in user, create in-app notification
    if user_id:
        notif = Notification(
            user_id=user_id,
            title="Project Request Submitted",
            message=f"Your order #{order_num} ({new_order.title}) has been received and emailed to engineering.",
            link=f"/dashboard?tab=orders&id={new_order.id}"
        )
        db.add(notif)

    # Admin in-app notifications
    admins = db.query(User).filter(User.role == "admin").all()
    for adm in admins:
        admin_notif = Notification(
            user_id=adm.id,
            title="New Project Order Received",
            message=f"Order #{order_num} submitted by {customer_name} for '{new_order.title}'.",
            link=f"/admin?tab=orders&id={new_order.id}"
        )
        db.add(admin_notif)

    db.commit()
    return new_order

@router.get("", response_model=List[OrderOut])
def get_user_orders(
    current_user: Optional[User] = Depends(get_optional_user),
    db: Session = Depends(get_db)
):
    if not current_user:
        return []
    base_query = db.query(Order).filter(Order.email_dispatched == True)
    if current_user.role == "admin":
        return base_query.order_by(Order.created_at.desc()).all()
    return base_query.filter(Order.user_id == current_user.id).order_by(Order.created_at.desc()).all()

@router.get("/{order_id}", response_model=OrderOut)
def get_order_by_id(
    order_id: int,
    current_user: Optional[User] = Depends(get_optional_user),
    db: Session = Depends(get_db)
):
    order = db.query(Order).filter(Order.id == order_id, Order.email_dispatched == True).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found or not verified")
    return order

@router.delete("/{order_id}")
def delete_order(
    order_id: int,
    admin: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Delete associated project if exists
    if order.project:
        db.delete(order.project)
    # Delete associated quotation if exists
    if order.quotation:
        db.delete(order.quotation)
    # Delete order
    db.delete(order)
    db.commit()
    return {"message": f"Order #{order.order_number} successfully deleted"}

@router.patch("/{order_id}/status", response_model=OrderOut)
def update_order_status(
    order_id: int,
    status_update: OrderStatusUpdate,
    admin: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    order.status = status_update.status
    if status_update.admin_notes:
        order.admin_notes = status_update.admin_notes
    db.commit()
    db.refresh(order)

    # If status is DEVELOPMENT or APPROVED, ensure project entry exists
    if order.status in ["DEVELOPMENT", "APPROVED"] and not order.project:
        proj = Project(
            order_id=order.id,
            user_id=order.user_id,
            title=order.title,
            category=order.service_name or "Custom Engineering",
            description=order.description,
            progress_pct=15,
            status="IN_PROGRESS",
            start_date=datetime.datetime.utcnow()
        )
        db.add(proj)
        db.commit()

    # Notify customer if registered
    if order.user_id:
        notif = Notification(
            user_id=order.user_id,
            title=f"Order Status Updated: {order.status}",
            message=f"Your order #{order.order_number} is now marked as {order.status}.",
            link=f"/dashboard?tab=orders&id={order.id}"
        )
        db.add(notif)
        db.commit()

    return order
