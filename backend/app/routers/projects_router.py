from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Project, ProjectFile, User, Notification
from ..schemas import ProjectOut, ProjectUpdate, ProjectFileOut
from ..auth import get_current_user, get_admin_user

router = APIRouter(prefix="/api/projects", tags=["Projects"])

@router.get("/public", response_model=List[ProjectOut])
def get_public_projects(db: Session = Depends(get_db)):
    # Return featured and portfolio showcase projects
    return db.query(Project).filter(Project.is_featured == True).all()

@router.get("/public/{project_id}", response_model=ProjectOut)
def get_public_project_detail(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.get("/my", response_model=List[ProjectOut])
def get_my_projects(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role == "admin":
        return db.query(Project).filter(Project.order_id != None).order_by(Project.updated_at.desc()).all()
    return db.query(Project).filter(Project.user_id == current_user.id).order_by(Project.updated_at.desc()).all()

@router.get("/{project_id}", response_model=ProjectOut)
def get_project_by_id(
    project_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if current_user.role != "admin" and project.user_id != current_user.id and not project.is_featured:
        raise HTTPException(status_code=403, detail="Forbidden")
    return project

@router.patch("/{project_id}", response_model=ProjectOut)
def update_project(
    project_id: int,
    update_data: ProjectUpdate,
    admin: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    if update_data.progress_pct is not None:
        project.progress_pct = update_data.progress_pct
    if update_data.status:
        project.status = update_data.status
        if update_data.status == "COMPLETED" and project.order:
            project.order.status = "COMPLETED"
    if update_data.demo_url:
        project.demo_url = update_data.demo_url
    if update_data.github_url:
        project.github_url = update_data.github_url

    # Notify customer
    if project.user_id:
        notif = Notification(
            user_id=project.user_id,
            title="Project Progress Updated",
            message=f"'{project.title}' is now at {project.progress_pct}% completion ({project.status}).",
            link=f"/dashboard?tab=projects&id={project.id}"
        )
        db.add(notif)

    db.commit()
    db.refresh(project)
    return project

@router.post("/{project_id}/files", response_model=ProjectFileOut)
def add_project_file(
    project_id: int,
    filename: str,
    file_url: str,
    file_size: str = "2.4 MB",
    file_type: str = "archive",
    admin: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    new_file = ProjectFile(
        project_id=project.id,
        filename=filename,
        file_url=file_url,
        file_size=file_size,
        file_type=file_type,
        uploaded_by="Cognisys Engineering Team"
    )
    db.add(new_file)

    if project.user_id:
        notif = Notification(
            user_id=project.user_id,
            title="New Project Deliverable Uploaded",
            message=f"File '{filename}' has been added to your project '{project.title}'.",
            link=f"/dashboard?tab=files"
        )
        db.add(notif)

    db.commit()
    db.refresh(new_file)
    return new_file
