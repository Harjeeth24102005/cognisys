from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from ..database import get_db
from ..models import Message, User, Notification
from ..schemas import MessageCreate, MessageOut
from ..auth import get_current_user

router = APIRouter(prefix="/api/messages", tags=["Messages"])

@router.post("", response_model=MessageOut)
def send_message(
    msg_in: MessageCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Determine recipient
    recipient_id = msg_in.recipient_id
    if not recipient_id:
        if current_user.role == "customer":
            admin = db.query(User).filter(User.role == "admin").first()
            recipient_id = admin.id if admin else None
    
    new_msg = Message(
        order_id=msg_in.order_id,
        project_id=msg_in.project_id,
        sender_id=current_user.id,
        recipient_id=recipient_id,
        content=msg_in.content.strip(),
        is_read=False
    )
    db.add(new_msg)
    
    if recipient_id:
        notif = Notification(
            user_id=recipient_id,
            title=f"New Message from {current_user.full_name}",
            message=new_msg.content[:100] + ("..." if len(new_msg.content) > 100 else ""),
            link="/dashboard?tab=messages" if current_user.role == "admin" else "/admin?tab=messages"
        )
        db.add(notif)

    db.commit()
    db.refresh(new_msg)

    out = MessageOut(
        id=new_msg.id,
        order_id=new_msg.order_id,
        project_id=new_msg.project_id,
        sender_id=new_msg.sender_id,
        recipient_id=new_msg.recipient_id,
        content=new_msg.content,
        is_read=new_msg.is_read,
        created_at=new_msg.created_at,
        sender_name=current_user.full_name,
        sender_role=current_user.role
    )
    return out

@router.get("", response_model=List[MessageOut])
def get_user_messages(
    order_id: Optional[int] = None,
    project_id: Optional[int] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(Message)
    if current_user.role != "admin":
        query = query.filter(or_(Message.sender_id == current_user.id, Message.recipient_id == current_user.id))
    
    if order_id:
        query = query.filter(Message.order_id == order_id)
    if project_id:
        query = query.filter(Message.project_id == project_id)

    messages = query.order_by(Message.created_at.asc()).all()

    # Enrich sender info
    result = []
    for m in messages:
        sender = db.query(User).filter(User.id == m.sender_id).first()
        result.append(MessageOut(
            id=m.id,
            order_id=m.order_id,
            project_id=m.project_id,
            sender_id=m.sender_id,
            recipient_id=m.recipient_id,
            content=m.content,
            is_read=m.is_read,
            created_at=m.created_at,
            sender_name=sender.full_name if sender else "Unknown",
            sender_role=sender.role if sender else "user"
        ))
    return result
