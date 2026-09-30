from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Quotation, Order, User, Notification
from ..schemas import QuotationCreate, QuotationOut, QuotationAction
from ..auth import get_current_user, get_admin_user

router = APIRouter(prefix="/api/quotations", tags=["Quotations"])

@router.post("", response_model=QuotationOut)
def create_quotation(
    quote_in: QuotationCreate,
    admin: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    order = db.query(Order).filter(Order.id == quote_in.order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Referenced order not found")

    existing = db.query(Quotation).filter(Quotation.order_id == quote_in.order_id).first()
    if existing:
        # Update existing quotation
        existing.development_cost = quote_in.development_cost
        existing.additional_cost = quote_in.additional_cost or 0.0
        existing.discount = quote_in.discount or 0.0
        existing.total_amount = (existing.development_cost + existing.additional_cost) - existing.discount
        existing.estimated_delivery = quote_in.estimated_delivery
        existing.deliverables_json = quote_in.deliverables_json
        existing.notes = quote_in.notes
        existing.status = "PENDING"
        db.commit()
        db.refresh(existing)
        quote = existing
    else:
        total = (quote_in.development_cost + (quote_in.additional_cost or 0.0)) - (quote_in.discount or 0.0)
        quote = Quotation(
            order_id=quote_in.order_id,
            user_id=order.user_id,
            development_cost=quote_in.development_cost,
            additional_cost=quote_in.additional_cost or 0.0,
            discount=quote_in.discount or 0.0,
            total_amount=max(0.0, total),
            estimated_delivery=quote_in.estimated_delivery,
            deliverables_json=quote_in.deliverables_json,
            notes=quote_in.notes,
            status="PENDING"
        )
        db.add(quote)
        db.commit()
        db.refresh(quote)

    # Update order status to QUOTATION
    order.status = "QUOTATION"
    
    # Notify Customer
    notif = Notification(
        user_id=order.user_id,
        title="Quotation Ready for Review",
        message=f"Official quotation for order #{order.order_number} has been generated (Total: ₹{quote.total_amount:,.2f}).",
        link=f"/dashboard?tab=quotations&id={quote.id}"
    )
    db.add(notif)
    db.commit()

    return quote

@router.get("", response_model=List[QuotationOut])
def get_user_quotations(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    base_query = db.query(Quotation).join(Order).filter(Order.email_dispatched == True)
    if current_user.role == "admin":
        return base_query.order_by(Quotation.created_at.desc()).all()
    return base_query.filter(Quotation.user_id == current_user.id).order_by(Quotation.created_at.desc()).all()

@router.get("/order/{order_id}", response_model=Optional[QuotationOut])
def get_quotation_by_order(
    order_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    quote = db.query(Quotation).filter(Quotation.order_id == order_id).first()
    if not quote:
        return None
    if current_user.role != "admin" and quote.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access forbidden")
    return quote

@router.post("/{quotation_id}/action", response_model=QuotationOut)
def respond_to_quotation(
    quotation_id: int,
    action_in: QuotationAction,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    quote = db.query(Quotation).filter(Quotation.id == quotation_id).first()
    if not quote:
        raise HTTPException(status_code=404, detail="Quotation not found")
    if quote.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized to act on this quotation")

    action = action_in.action.upper()
    if action == "ACCEPT":
        quote.status = "ACCEPTED"
        quote.order.status = "APPROVED"
        notif_msg = f"Customer {current_user.full_name} accepted quotation for order #{quote.order.order_number}."
    elif action == "REJECT":
        quote.status = "REJECTED"
        quote.order.status = "REVIEWED"
        notif_msg = f"Customer {current_user.full_name} rejected quotation for order #{quote.order.order_number}."
    else:
        raise HTTPException(status_code=400, detail="Action must be ACCEPT or REJECT")

    # Notify Admins
    admins = db.query(User).filter(User.role == "admin").all()
    for adm in admins:
        adm_notif = Notification(
            user_id=adm.id,
            title=f"Quotation {action.capitalize()}ed",
            message=notif_msg,
            link=f"/admin?tab=quotations&id={quote.id}"
        )
        db.add(adm_notif)

    db.commit()
    db.refresh(quote)
    return quote
