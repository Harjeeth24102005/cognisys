from typing import Optional, List, Any
from datetime import datetime
from pydantic import BaseModel, EmailStr

# ----------------- AUTH SCHEMAS -----------------
class UserBase(BaseModel):
    username: Optional[str] = None
    email: EmailStr
    full_name: Optional[str] = None
    phone: Optional[str] = None
    profile_picture: Optional[str] = None

class UserRegister(UserBase):
    password: str
    confirm_password: Optional[str] = None

class UserLogin(BaseModel):
    username_or_email: Optional[str] = None
    email: Optional[str] = None
    password: str

    def get_identifier(self) -> str:
        return (self.username_or_email or self.email or "").strip().lower()

class UserOut(UserBase):
    id: int
    role: str
    is_active: bool
    google_id: Optional[str] = None
    last_login: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True

class AuthLogOut(BaseModel):
    id: int
    user_id: Optional[int] = None
    email: str
    event_type: str
    auth_provider: str
    ip_address: Optional[str] = None
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut

class TokenData(BaseModel):
    email: Optional[str] = None
    role: Optional[str] = None

class VerifySignupOtpRequest(BaseModel):
    email: EmailStr
    otp: str

class ResendOtpRequest(BaseModel):
    email: EmailStr

# ----------------- SERVICE SCHEMAS -----------------
class ServiceBase(BaseModel):
    slug: str
    name: str
    category: str
    short_desc: str
    full_desc: str
    icon: Optional[str] = "Cpu"
    features_json: Optional[str] = None
    technologies_json: Optional[str] = None
    base_price: Optional[float] = 0.0
    is_active: Optional[bool] = True

class ServiceCreate(ServiceBase):
    pass

class ServiceOut(ServiceBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# ----------------- ORDER SCHEMAS -----------------
class OrderCreate(BaseModel):
    service_id: Optional[int] = None
    service_name: Optional[str] = None
    customer_name: Optional[str] = None
    customer_email: Optional[str] = None
    customer_phone: Optional[str] = None
    title: str
    description: str
    budget: Optional[str] = None
    timeline: Optional[str] = None
    tech_preferences: Optional[str] = None
    cart_items_json: Optional[str] = None
    attachment_filename: Optional[str] = None

class OrderStatusUpdate(BaseModel):
    status: str
    admin_notes: Optional[str] = None

class OrderOut(BaseModel):
    id: int
    order_number: str
    user_id: Optional[int] = None
    customer_name: Optional[str] = None
    customer_email: Optional[str] = None
    customer_phone: Optional[str] = None
    service_id: Optional[int] = None
    service_name: Optional[str] = None
    title: str
    description: str
    budget: Optional[str] = None
    timeline: Optional[str] = None
    tech_preferences: Optional[str] = None
    cart_items_json: Optional[str] = None
    attachment_filename: Optional[str] = None
    status: str
    admin_notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    user: Optional[UserOut] = None

    class Config:
        from_attributes = True

# ----------------- QUOTATION SCHEMAS -----------------
class QuotationCreate(BaseModel):
    order_id: int
    development_cost: float
    additional_cost: Optional[float] = 0.0
    discount: Optional[float] = 0.0
    estimated_delivery: str
    deliverables_json: Optional[str] = None
    notes: Optional[str] = None

class QuotationAction(BaseModel):
    action: str # "ACCEPT" or "REJECT"

class QuotationOut(BaseModel):
    id: int
    order_id: int
    user_id: int
    development_cost: float
    additional_cost: float
    discount: float
    total_amount: float
    estimated_delivery: str
    deliverables_json: Optional[str] = None
    notes: Optional[str] = None
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# ----------------- PAYMENT SCHEMAS -----------------
class PaymentCreate(BaseModel):
    order_id: int
    quotation_id: Optional[int] = None
    payment_method: Optional[str] = "UPI / Card / NetBanking"

class PaymentOut(BaseModel):
    id: int
    quotation_id: Optional[int]
    order_id: int
    user_id: int
    amount: float
    currency: str
    payment_method: str
    transaction_id: str
    status: str
    paid_at: datetime

    class Config:
        from_attributes = True

# ----------------- PROJECT SCHEMAS -----------------
class ProjectFileOut(BaseModel):
    id: int
    project_id: int
    filename: str
    file_url: str
    file_size: str
    file_type: str
    uploaded_by: str
    created_at: datetime

    class Config:
        from_attributes = True

class ProjectOut(BaseModel):
    id: int
    order_id: Optional[int] = None
    user_id: Optional[int] = None
    title: str
    category: str
    description: str
    problem_statement: Optional[str] = None
    solution_statement: Optional[str] = None
    features_json: Optional[str] = None
    technologies_json: Optional[str] = None
    results_json: Optional[str] = None
    image_url: Optional[str] = None
    demo_url: Optional[str] = None
    github_url: Optional[str] = None
    is_featured: bool
    progress_pct: int
    status: str
    start_date: Optional[datetime] = None
    completion_date: Optional[datetime] = None
    created_at: datetime
    files: Optional[List[ProjectFileOut]] = []

    class Config:
        from_attributes = True

class ProjectUpdate(BaseModel):
    progress_pct: Optional[int] = None
    status: Optional[str] = None
    demo_url: Optional[str] = None
    github_url: Optional[str] = None

# ----------------- MESSAGE SCHEMAS -----------------
class MessageCreate(BaseModel):
    order_id: Optional[int] = None
    project_id: Optional[int] = None
    recipient_id: Optional[int] = None
    content: str

class MessageOut(BaseModel):
    id: int
    order_id: Optional[int]
    project_id: Optional[int]
    sender_id: int
    recipient_id: Optional[int]
    content: str
    is_read: bool
    created_at: datetime
    sender_name: Optional[str] = None
    sender_role: Optional[str] = None

    class Config:
        from_attributes = True

# ----------------- NOTIFICATION SCHEMAS -----------------
class NotificationOut(BaseModel):
    id: int
    user_id: int
    title: str
    message: str
    link: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True

# ----------------- BLOG SCHEMAS -----------------
class BlogPostBase(BaseModel):
    title: str
    slug: str
    summary: str
    content: str
    category: Optional[str] = "AI & Innovation"
    author_name: Optional[str] = "Cognisys Research Team"
    image_url: Optional[str] = None
    read_time: Optional[str] = "5 min read"
    status: Optional[str] = "published"

class BlogPostCreate(BlogPostBase):
    pass

class BlogPostOut(BlogPostBase):
    id: int
    published_at: datetime
    created_at: datetime

    class Config:
        from_attributes = True

# ----------------- STATS & DASHBOARD SCHEMAS -----------------
class AdminStatsOut(BaseModel):
    total_users: int
    total_orders: int
    active_projects: int
    completed_projects: int
    pending_quotations: int
    total_revenue: float
    total_messages: int
