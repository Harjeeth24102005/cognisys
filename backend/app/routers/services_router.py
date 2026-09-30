from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Service, User
from ..schemas import ServiceOut, ServiceCreate
from ..auth import get_admin_user

router = APIRouter(prefix="/api/services", tags=["Services"])

@router.get("", response_model=List[ServiceOut])
def get_all_services(db: Session = Depends(get_db)):
    return db.query(Service).filter(Service.is_active == True).all()

@router.get("/{slug}", response_model=ServiceOut)
def get_service_by_slug(slug: str, db: Session = Depends(get_db)):
    service = db.query(Service).filter(Service.slug == slug, Service.is_active == True).first()
    if not service:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")
    return service

@router.post("", response_model=ServiceOut)
def create_service(service_in: ServiceCreate, admin: User = Depends(get_admin_user), db: Session = Depends(get_db)):
    existing = db.query(Service).filter(Service.slug == service_in.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Service slug already exists")
    
    new_service = Service(**service_in.model_dump())
    db.add(new_service)
    db.commit()
    db.refresh(new_service)
    return new_service
