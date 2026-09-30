import json
import datetime
from sqlalchemy.orm import Session
from .models import User, Service, Project, BlogPost, Order, Quotation, Payment, Notification
from .auth import get_password_hash

def seed_database(db: Session):
    # 1. Admin User (harjeeth)
    admin = db.query(User).filter((User.username == "harjeeth") | (User.email == "harjeeth@cognisys.ai") | (User.email == "contact.cognisys@gmail.com")).first()
    if not admin:
        admin = User(
            username="harjeeth",
            email="harjeeth@cognisys.ai",
            full_name="Harjeeth S (Admin)",
            phone="+91 82483 49844",
            hashed_password=get_password_hash("harjeeth@2005"),
            role="admin",
            is_active=True
        )
        db.add(admin)
        db.commit()
        db.refresh(admin)
    else:
        # Ensure credentials match harjeeth and harjeeth@2005
        admin.username = "harjeeth"
        admin.email = "harjeeth@cognisys.ai"
        admin.hashed_password = get_password_hash("harjeeth@2005")
        admin.role = "admin"
        admin.is_active = True
        db.commit()

    # Clean up demo customer if previously seeded
    demo_user = db.query(User).filter(User.email == "demo@cognisys.ai").first()
    if demo_user:
        db.delete(demo_user)
        db.commit()

    # 2. Services (6 Core Offerings)
    services_data = [
        {
            "slug": "ai-cctv-attendance",
            "name": "AI-Based CCTV Attendance Monitoring System",
            "category": "Computer Vision & Attendance",
            "short_desc": "Transform existing or new CCTV infrastructure into an autonomous, contactless biometric attendance and surveillance network powered by edge AI.",
            "full_desc": "Cognisys AI-Based CCTV Attendance Monitoring System integrates state-of-the-art computer vision (YOLOv11 & FaceNet/ArcFace) with real-time video streaming. Features contactless multi-person facial recognition attendance marking, anti-spoofing verification, entry/exit timestamp logging, automated shift rosters, and instant management reporting.",
            "icon": "Eye",
            "features_json": json.dumps([
                "Contactless multi-face recognition attendance marking with sub-50ms latency",
                "Automated shift, overtime, and roster logging with exportable PDF/Excel reports",
                "Real-time intrusion alerts & webhook/SMS notifications for unauthorized personnel",
                "Heatmaps, occupancy analytics, and multi-camera live dashboard monitoring",
                "Seamless plug-and-play integration with standard IP and RTSP CCTV cameras"
            ]),
            "technologies_json": json.dumps(["PyTorch", "OpenCV", "YOLOv11", "FaceNet", "FastAPI", "WebRTC", "PostgreSQL"]),
            "base_price": 25000.0
        },
        {
            "slug": "websites",
            "name": "Websites & Modern Web Development",
            "category": "Web Applications & Platforms",
            "short_desc": "High-performance, beautifully responsive business websites, interactive client portals, and cloud-native modern web applications.",
            "full_desc": "Cognisys delivers ultra-fast, modern websites and web applications built with modern frontend frameworks (React, Vite, Next.js), secure REST APIs, and scalable backend infrastructure. Engineered for speed, responsive aesthetics, high conversion, and seamless user experiences across all devices.",
            "icon": "Globe",
            "features_json": json.dumps([
                "Custom responsive UI/UX web design optimized for conversions and aesthetics",
                "Enterprise admin portals and real-time operational client dashboards",
                "Secure RESTful API integration & cloud database architecture",
                "Full SEO optimization, accessibility (a11y), and fast Core Web Vitals",
                "Mobile-first responsive layouts across phones, tablets, and desktops"
            ]),
            "technologies_json": json.dumps(["React", "Vite", "JavaScript", "HTML5/CSS3", "FastAPI", "Node.js", "PostgreSQL"]),
            "base_price": 15000.0
        },
        {
            "slug": "ai-projects",
            "name": "AI-Based Projects",
            "category": "Artificial Intelligence & Machine Learning",
            "short_desc": "End-to-end artificial intelligence systems including deep learning, NLP, computer vision, LLM integrations, and neural predictive pipelines.",
            "full_desc": "Custom artificial intelligence and machine learning solutions engineered from architecture to deployment. We design and implement custom deep learning models, LLM-powered applications, document intelligence, automated classification, and neural predictive models.",
            "icon": "Cpu",
            "features_json": json.dumps([
                "Custom Deep Learning & Neural Network model development and training",
                "Natural Language Processing (NLP) & Generative AI/LLM agent workflows",
                "Computer Vision, object detection, semantic segmentation, and tracking",
                "Predictive analytics and automated decision intelligence algorithms",
                "Production-ready REST API deployment and cloud synchronization"
            ]),
            "technologies_json": json.dumps(["Python", "PyTorch", "TensorFlow", "HuggingFace", "LangChain", "FastAPI", "OpenCV"]),
            "base_price": 28000.0
        },
        {
            "slug": "python-projects",
            "name": "Python-Based Projects",
            "category": "Python & Automation Engineering",
            "short_desc": "High-throughput Python applications, FastAPI/Django backend architectures, data scrapers, automation bots, and desktop software.",
            "full_desc": "Robust Python-powered solutions built for scalability, automation, and speed. From high-performance asynchronous microservices and data engineering pipelines to intelligent automation bots, desktop utilities, and custom scripts.",
            "icon": "Terminal",
            "features_json": json.dumps([
                "High-performance asynchronous backend APIs using FastAPI and Django",
                "Intelligent web scraping, data extraction & automated ETL pipelines",
                "Custom business automation scripts, desktop GUIs & bot workflows",
                "Data analysis, processing, and interactive dashboard tools",
                "Clean modular code architecture with full Docker containerization"
            ]),
            "technologies_json": json.dumps(["Python", "FastAPI", "Django", "Flask", "Pandas", "Selenium", "Docker"]),
            "base_price": 20000.0
        },
        {
            "slug": "final-year-projects",
            "name": "Final Year Projects",
            "category": "Academic Engineering & Research",
            "short_desc": "Complete engineering final-year capstones with working source code, IEEE base papers, complete documentation, and viva guidance.",
            "full_desc": "Comprehensive guidance and prototype development for engineering final-year students across CSE, IT, AI/DS, and ECE domains. Includes verified working source code, complete documentation, IEEE base paper implementations, architecture diagrams, and one-on-one viva preparation support.",
            "icon": "GraduationCap",
            "features_json": json.dumps([
                "100% verified, fully working source code with step-by-step setup guide",
                "IEEE base paper implementation with clear novelty justification",
                "Comprehensive documentation, synopsis, and IEEE-standard project report",
                "System architecture diagrams, dataflow charts, and database schemas",
                "One-on-one project demo walkthrough and technical viva preparation"
            ]),
            "technologies_json": json.dumps(["Python", "React", "PyTorch", "FastAPI", "OpenCV", "IoT", "PostgreSQL"]),
            "base_price": 8000.0
        },
        {
            "slug": "face-recognition",
            "name": "Face Recognition System",
            "category": "Computer Vision & Biometrics",
            "short_desc": "Enterprise-grade facial recognition engine for secure access control, biometric identity verification, and anti-spoofing surveillance.",
            "full_desc": "State-of-the-art multi-face recognition architecture engineered for lightning-fast identity verification. Includes 3D depth anti-spoofing against physical photos and screen replays, multi-angle pose tolerance, instant door-lock/turnstile relay triggers, and comprehensive audit logs.",
            "icon": "UserCheck",
            "features_json": json.dumps([
                "High-accuracy facial recognition with >99.4% biometric verification precision",
                "Advanced anti-spoofing liveness detection rejecting printed photos and video replays",
                "Multi-angle facial recognition supporting dynamic head tilts and masks",
                "Sub-40ms edge verification with secure local embedding vector database",
                "Hardware relay triggers for automated smart turnstiles and electronic access doors"
            ]),
            "technologies_json": json.dumps(["Python", "ArcFace", "OpenCV", "InsightFace", "FastAPI", "PostgreSQL", "Docker"]),
            "base_price": 22000.0
        }
    ]

    # Ensure ONLY the 6 core services exist in database
    allowed_slugs = [s["slug"] for s in services_data]
    for s_data in services_data:
        existing = db.query(Service).filter(Service.slug == s_data["slug"]).first()
        if existing:
            for k, v in s_data.items():
                setattr(existing, k, v)
            existing.is_active = True
        else:
            svc = Service(**s_data)
            db.add(svc)

    # Delete any obsolete services not in the 6 offerings
    for old_svc in db.query(Service).all():
        if old_svc.slug not in allowed_slugs:
            db.delete(old_svc)

    db.commit()

    # 4. Completed Systems Records (No live demos - marked as completed production systems)
    projects_data = [
        {
            "title": "CogniVision AI CCTV & Multi-Camera Edge Analytics",
            "category": "Computer Vision & AI",
            "description": "Enterprise-grade intelligent surveillance pipeline with real-time multi-person tracking, restricted-area perimeter breach detection, and automated biometric attendance logging across 32 synchronized IP camera streams.",
            "problem_statement": "Traditional CCTV setups require manual human monitoring, causing delayed reaction to unauthorized intrusions, zero automated attendance tracking, and high labor overhead.",
            "solution_statement": "Engineered an edge-AI streaming server with YOLOv11 + ByteTrack and ArcFace recognition, achieving 99.2% identification accuracy with sub-60ms inference latency.",
            "features_json": json.dumps([
                "Simultaneous 32-stream RTSP decoding & tensor pipeline",
                "Zero-touch facial attendance with instant CSV and API export",
                "Real-time camera coverage topology viewer",
                "Instant multi-channel Telegram & SMS alarm dispatch"
            ]),
            "technologies_json": json.dumps(["PyTorch", "YOLOv11", "FastAPI", "React", "WebSockets", "Docker"]),
            "results_json": json.dumps([
                "99.2% facial recognition accuracy in varied lighting",
                "94% reduction in manual surveillance review time",
                "Zero false alarms in designated security zones"
            ]),
            "image_url": "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80",
            "demo_url": None,
            "github_url": None,
            "is_featured": False,
            "progress_pct": 100,
            "status": "COMPLETED"
        },
        {
            "title": "AeroCloud SaaS & Real-time Telemetry Dashboard",
            "category": "Web Applications",
            "description": "Next-generation distributed web application featuring real-time telemetry visualization, instant WebSocket metrics, role-based governance, and micro-frontend architecture.",
            "problem_statement": "Legacy monitoring software suffered from high latency, rigid non-responsive interfaces, and lacked real-time collaborative insights.",
            "solution_statement": "Built a reactive Single Page Application with React, telemetry data streams, FastAPI asynchronous backend, and distributed Redis pub/sub.",
            "features_json": json.dumps([
                "Interactive telemetry node visualizer",
                "Sub-100ms bidirectional WebSocket telemetry updates",
                "Automated PDF export and automated analytics reports",
                "Enterprise role-based permissions matrix"
            ]),
            "technologies_json": json.dumps(["React", "FastAPI", "Redis", "PostgreSQL", "TailwindCSS Tokens"]),
            "results_json": json.dumps([
                "Sub-50ms render loop performance",
                "10,000+ concurrent telemetry data points handled",
                "40% improvement in team operational response time"
            ]),
            "image_url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
            "demo_url": None,
            "github_url": None,
            "is_featured": False,
            "progress_pct": 100,
            "status": "COMPLETED"
        },
        {
            "title": "OmniFlow Microservices & Enterprise Workflow Engine",
            "category": "Software Systems",
            "description": "High-throughput asynchronous job execution and workflow engine for multi-tenant data transformation, API orchestrations, and automated invoice reconciliation.",
            "problem_statement": "Manual business workflows created processing bottlenecks and error-prone batch operations with zero auditing trails.",
            "solution_statement": "Architected an event-driven microservices platform utilizing Python Celery, RabbitMQ, and PostgreSQL with atomic transaction logs and automated disaster recovery.",
            "features_json": json.dumps([
                "Visual workflow DAG builder and dependency resolver",
                "Atomic rollback and audit trail for financial reconciliation",
                "Rate-limited external API connectors with retry backoff",
                "Comprehensive Prometheus metrics and Grafana telemetry"
            ]),
            "technologies_json": json.dumps(["Python", "Celery", "RabbitMQ", "SQLAlchemy", "PostgreSQL", "Docker"]),
            "results_json": json.dumps([
                "Over 500,000 daily jobs processed with 99.99% uptime",
                "Zero data loss across distributed microservice nodes",
                "85% decrease in operational cycle turnaround"
            ]),
            "image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
            "demo_url": None,
            "github_url": None,
            "is_featured": False,
            "progress_pct": 100,
            "status": "COMPLETED"
        },
        {
            "title": "NeuroBot: Edge AI Autonomous Student Research Vehicle",
            "category": "Student Projects & IoT",
            "description": "Award-winning university final-year engineering prototype combining Raspberry Pi 5, Intel RealSense depth camera, and TensorRT neural networks for indoor GPS-denied autonomous navigation.",
            "problem_statement": "Students needed a comprehensive, reproducible, and robust edge-AI robotics platform for advanced SLAM and obstacle avoidance research within academic budget constraints.",
            "solution_statement": "Engineered an integrated hardware/software solution with complete ROS2 drivers, LiDAR SLAM mapping, custom Python neural vision models, and full documentation.",
            "features_json": json.dumps([
                "LiDAR-based SLAM and spatial occupancy mapping",
                "Real-time obstacle avoidance with custom depth CNN",
                "Comprehensive IEEE research paper draft & circuit schematics",
                "Complete step-by-step viva presentation deck and video walkthrough"
            ]),
            "technologies_json": json.dumps(["ROS2", "Python", "TensorRT", "OpenCV", "Raspberry Pi", "LiDAR", "React Dashboard"]),
            "results_json": json.dumps([
                "Published in IEEE student research symposium",
                "Graded A+ in University Final Year Capstone review",
                "Sub-30ms real-time path replanning in dynamic mazes"
            ]),
            "image_url": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
            "demo_url": None,
            "github_url": None,
            "is_featured": False,
            "progress_pct": 100,
            "status": "COMPLETED"
        }
    ]

    for p_data in projects_data:
        existing = db.query(Project).filter(Project.title == p_data["title"]).first()
        if existing:
            for k, v in p_data.items():
                setattr(existing, k, v)
        else:
            proj = Project(**p_data)
            db.add(proj)

    db.commit()

    # 5. Sample Blog Posts
    blog_data = [
        {
            "title": "Architecting Autonomous AI CCTV Systems with Low Latency Vision Pipelines",
            "slug": "architecting-autonomous-ai-cctv-systems",
            "summary": "How modern computer vision architectures combine edge inference, dynamic region-of-interest scanning, and cloud intelligence to deliver real-time surveillance at scale.",
            "content": """Surveillance infrastructure is undergoing a seismic shift. Traditional passive CCTV setups that merely record footage for forensic review are being rapidly replaced by intelligent, proactive edge-vision systems that detect, track, and alert before security incidents escalate.

### The Problem with Cloud-Only Inference
Transmitting continuous high-definition video streams (1080p or 4K at 30fps) from dozens of cameras to cloud servers consumes massive bandwidth, introduces 500ms+ network latencies, and creates significant recurring infrastructure costs.

### The Cognisys Hybrid Edge Architecture
At Cognisys, we deploy an optimized edge gateway adjacent to camera clusters. The architecture consists of:
1. **Hardware-Accelerated Decoding**: Direct RTSP stream ingestion via NVIDIA DeepStream and FFmpeg hardware decoders.
2. **YOLOv11 TensorRT Optimization**: Quantized FP16/INT8 inference delivering object detection in under 12 milliseconds.
3. **ByteTrack Multi-Object Association**: Persistent tracking IDs that survive camera occlusions.
4. **Cloud Event Sync**: Only structured metadata, keyframe embeddings, and anomalous security events are sent to the cloud dashboard.

This hybrid approach slashes bandwidth requirements by up to 90% while guaranteeing sub-50ms local alert trigger times.""",
            "category": "Computer Vision",
            "author_name": "Cognisys Research Team",
            "image_url": "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80",
            "read_time": "6 min read"
        },
        {
            "title": "Building Ultra-Fast Modern Web Applications with React & Modern Frameworks",
            "slug": "building-fast-modern-web-applications",
            "summary": "A practical guide to rendering high-performance websites without sacrificing mobile responsiveness or Lighthouse performance scores.",
            "content": """Modern web development has transitioned to an indispensable standard for modern technology companies. However, poor optimization can quickly ruin user experience.

### Key Optimization Strategies
- **Component Splitting & Lazy Loading**: Instead of loading megabyte-heavy bundles upfront, code splitting allows fast initial paint and smooth transitions.
- **Adaptive Pixel Ratio & Frame Optimization**: Dynamically adjust assets and animations based on device capabilities (1.0 for high-DPI mobile, 1.5-2.0 for desktop).
- **Graceful Fallback Handling**: Always provide responsive, lightweight fallback layers when context creation fails or reduced motion preferences are detected.

Cognisys implements these principles to deliver seamless 60FPS digital journeys across all screen sizes.""",
            "category": "Web Engineering",
            "author_name": "Cognisys Frontend Lab",
            "image_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
            "read_time": "5 min read"
        },
        {
            "title": "The Student Engineer's Blueprint: From Capstone Idea to Working Prototype",
            "slug": "student-engineers-blueprint-capstone-prototype",
            "summary": "Proven methodologies for computer science and engineering students to design, architect, and successfully present high-impact final year projects.",
            "content": """Every great project begins with a clear problem definition. When starting a final year engineering project, many students get overwhelmed by choosing overly complex frameworks without a solid architectural foundation.

### The 5-Stage Engineering Pipeline
1. **Problem Scoping**: Define a realistic, measurable problem statement with clear constraints.
2. **Modular Architecture**: Separate data ingestion, business logic, ML inference, and user presentation.
3. **Reproducible Environment**: Containerize dependencies with Docker or clean virtual environments.
4. **Rigorous Testing & Metrics**: Benchmark performance against standard datasets and compute quantifiable accuracy metrics.
5. **Clear Documentation & Viva Preparation**: Maintain architectural diagrams, API schemas, and interactive live demos.

Cognisys Student Technical Solutions provides hands-on mentorship across this entire journey.""",
            "category": "Student Innovation",
            "author_name": "Cognisys Academic Division",
            "image_url": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
            "read_time": "4 min read"
        }
    ]

    for b_data in blog_data:
        existing = db.query(BlogPost).filter(BlogPost.slug == b_data["slug"]).first()
        if not existing:
            post = BlogPost(**b_data)
            db.add(post)

    db.commit()

    # Clean up demo/sample orders if previously seeded
    demo_order = db.query(Order).filter(
        (Order.order_number == "COG-2026-DEMO01") |
        (Order.customer_email.in_(["rajesh.kumar@example.com", "client@test.com", "test@example.com", "demo@cognisys.ai"]))
    ).all()
    for d_ord in demo_order:
        db.delete(d_ord)
    db.commit()


