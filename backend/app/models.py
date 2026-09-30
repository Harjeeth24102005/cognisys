import datetime
from sqlalchemy import (
    Column, Integer, String, Text, Float, Boolean, DateTime, ForeignKey
)
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(80), unique=True, index=True, nullable=True)
    full_name = Column(String(120), nullable=False)
    email = Column(String(120), unique=True, index=True, nullable=False)
    phone = Column(String(50), nullable=True)
    hashed_password = Column(String(255), nullable=True)
    role = Column(String(20), default="customer") # "customer" or "admin"
    is_active = Column(Boolean, default=True)
    google_id = Column(String(100), unique=True, index=True, nullable=True)
    profile_picture = Column(String(500), nullable=True)
    last_login = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    orders = relationship("Order", back_populates="user", cascade="all, delete-orphan")
    quotations = relationship("Quotation", back_populates="user", cascade="all, delete-orphan")
    projects = relationship("Project", back_populates="user", cascade="all, delete-orphan")
    notifications = relationship("Notification", back_populates="user", cascade="all, delete-orphan")
    sent_messages = relationship("Message", foreign_keys="Message.sender_id", back_populates="sender")
    received_messages = relationship("Message", foreign_keys="Message.recipient_id", back_populates="recipient")
    auth_logs = relationship("AuthLog", back_populates="user", cascade="all, delete-orphan")

class PendingSignup(Base):
    __tablename__ = "pending_signups"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(120), unique=True, index=True, nullable=False)
    full_name = Column(String(120), nullable=True)
    google_id = Column(String(100), nullable=True)
    profile_picture = Column(String(500), nullable=True)
    hashed_password = Column(String(255), nullable=True)
    otp = Column(String(10), nullable=False)
    otp_expires_at = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(80), unique=True, index=True, nullable=False)
    name = Column(String(120), nullable=False)
    category = Column(String(80), nullable=False)
    short_desc = Column(Text, nullable=False)
    full_desc = Column(Text, nullable=False)
    icon = Column(String(50), default="Cpu")
    features_json = Column(Text, nullable=True) # JSON string
    technologies_json = Column(Text, nullable=True) # JSON string
    base_price = Column(Float, default=0.0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    orders = relationship("Order", back_populates="service")

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    order_number = Column(String(40), unique=True, index=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True) # Optional for guest orders
    customer_name = Column(String(150), nullable=True)
    customer_email = Column(String(150), nullable=True)
    customer_phone = Column(String(50), nullable=True)
    service_id = Column(Integer, ForeignKey("services.id"), nullable=True)
    service_name = Column(String(120), nullable=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    budget = Column(String(80), nullable=True)
    timeline = Column(String(80), nullable=True)
    tech_preferences = Column(Text, nullable=True)
    cart_items_json = Column(Text, nullable=True) # JSON of items in cart
    attachment_filename = Column(String(255), nullable=True)
    email_dispatched = Column(Boolean, default=False)
    
    # Lifecycle: REQUESTED -> REVIEWED -> QUOTATION -> APPROVED -> PAYMENT -> DEVELOPMENT -> TESTING -> COMPLETED
    status = Column(String(30), default="REQUESTED")
    admin_notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    user = relationship("User", back_populates="orders")
    service = relationship("Service", back_populates="orders")
    quotation = relationship("Quotation", back_populates="order", uselist=False, cascade="all, delete-orphan")
    payments = relationship("Payment", back_populates="order", cascade="all, delete-orphan")
    project = relationship("Project", back_populates="order", uselist=False)
    messages = relationship("Message", back_populates="order", cascade="all, delete-orphan")

class Quotation(Base):
    __tablename__ = "quotations"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False, unique=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    development_cost = Column(Float, nullable=False)
    additional_cost = Column(Float, default=0.0)
    discount = Column(Float, default=0.0)
    total_amount = Column(Float, nullable=False)
    estimated_delivery = Column(String(100), nullable=False)
    deliverables_json = Column(Text, nullable=True)
    notes = Column(Text, nullable=True)
    status = Column(String(30), default="PENDING") # PENDING, ACCEPTED, REJECTED
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    order = relationship("Order", back_populates="quotation")
    user = relationship("User", back_populates="quotations")
    payments = relationship("Payment", back_populates="quotation")

class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    quotation_id = Column(Integer, ForeignKey("quotations.id"), nullable=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    amount = Column(Float, nullable=False)
    currency = Column(String(10), default="INR")
    payment_method = Column(String(50), default="UPI / Card / NetBanking")
    transaction_id = Column(String(100), unique=True, index=True, nullable=False)
    status = Column(String(30), default="COMPLETED") # PENDING, COMPLETED, FAILED
    paid_at = Column(DateTime, default=datetime.datetime.utcnow)

    order = relationship("Order", back_populates="payments")
    quotation = relationship("Quotation", back_populates="payments")

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    title = Column(String(200), nullable=False)
    category = Column(String(80), default="Software")
    description = Column(Text, nullable=False)
    problem_statement = Column(Text, nullable=True)
    solution_statement = Column(Text, nullable=True)
    features_json = Column(Text, nullable=True)
    technologies_json = Column(Text, nullable=True)
    results_json = Column(Text, nullable=True)
    image_url = Column(String(255), nullable=True)
    demo_url = Column(String(255), nullable=True)
    github_url = Column(String(255), nullable=True)
    is_featured = Column(Boolean, default=False)
    progress_pct = Column(Integer, default=0) # 0 to 100 for active customer project
    status = Column(String(40), default="IN_PROGRESS") # PLANNING, IN_PROGRESS, TESTING, COMPLETED
    start_date = Column(DateTime, nullable=True)
    completion_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    order = relationship("Order", back_populates="project")
    user = relationship("User", back_populates="projects")
    files = relationship("ProjectFile", back_populates="project", cascade="all, delete-orphan")
    messages = relationship("Message", back_populates="project", cascade="all, delete-orphan")

class ProjectFile(Base):
    __tablename__ = "project_files"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    filename = Column(String(255), nullable=False)
    file_url = Column(String(500), nullable=False)
    file_size = Column(String(50), default="1.2 MB")
    file_type = Column(String(50), default="document")
    uploaded_by = Column(String(100), default="Cognisys Team")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    project = relationship("Project", back_populates="files")

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=True)
    sender_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    recipient_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    content = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    sender = relationship("User", foreign_keys=[sender_id], back_populates="sent_messages")
    recipient = relationship("User", foreign_keys=[recipient_id], back_populates="received_messages")
    order = relationship("Order", back_populates="messages")
    project = relationship("Project", back_populates="messages")

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String(150), nullable=False)
    message = Column(Text, nullable=False)
    link = Column(String(200), default="/dashboard")
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="notifications")

class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    slug = Column(String(220), unique=True, index=True, nullable=False)
    summary = Column(Text, nullable=False)
    content = Column(Text, nullable=False)
    category = Column(String(80), default="AI & Innovation")
    author_name = Column(String(100), default="Cognisys Research Team")
    image_url = Column(String(255), nullable=True)
    read_time = Column(String(20), default="5 min read")
    status = Column(String(20), default="published") # draft, published
    published_at = Column(DateTime, default=datetime.datetime.utcnow)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class AuthLog(Base):
    __tablename__ = "auth_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    email = Column(String(120), nullable=False, index=True)
    event_type = Column(String(30), nullable=False) # "SIGN_UP" or "SIGN_IN"
    auth_provider = Column(String(30), default="EMAIL") # "EMAIL" or "GOOGLE"
    ip_address = Column(String(50), nullable=True)
    user_agent = Column(String(255), nullable=True)
    status = Column(String(20), default="SUCCESS") # "SUCCESS" or "FAILED"
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="auth_logs")

