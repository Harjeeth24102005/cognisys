from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import BlogPost, User
from ..schemas import BlogPostOut, BlogPostCreate
from ..auth import get_admin_user

router = APIRouter(prefix="/api/blog", tags=["Blog"])

@router.get("", response_model=List[BlogPostOut])
def get_all_posts(
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(BlogPost).filter(BlogPost.status == "published")
    if category and category.lower() != "all":
        query = query.filter(BlogPost.category == category)
    return query.order_by(BlogPost.published_at.desc()).all()

@router.get("/{slug}", response_model=BlogPostOut)
def get_post_by_slug(slug: str, db: Session = Depends(get_db)):
    post = db.query(BlogPost).filter(BlogPost.slug == slug).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog article not found")
    return post

@router.post("", response_model=BlogPostOut)
def create_blog_post(
    post_in: BlogPostCreate,
    admin: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    existing = db.query(BlogPost).filter(BlogPost.slug == post_in.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Article with this slug already exists")
    
    new_post = BlogPost(**post_in.model_dump())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

@router.delete("/{post_id}")
def delete_blog_post(
    post_id: int,
    admin: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    db.delete(post)
    db.commit()
    return {"message": "Post deleted successfully"}
