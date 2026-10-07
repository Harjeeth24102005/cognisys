export const COMPLETED_PROJECTS = [
  {
    id: 1,
    title: "CogniVision AI CCTV & Multi-Camera Edge Analytics",
    slug: "cognivision-ai-cctv-analytics",
    category: "Computer Vision & CCTV",
    categoryKey: "vision",
    serviceSlug: "ai-cctv-surveillance",
    description: "Enterprise-grade intelligent surveillance pipeline with real-time multi-person tracking, restricted-area perimeter breach detection, and automated biometric attendance logging across 32 synchronized IP camera streams.",
    problem_statement: "Traditional CCTV setups require continuous manual monitoring, leading to delayed incident response, zero automated attendance tracking, and high ongoing operational labor overhead.",
    solution_statement: "Engineered an edge-AI streaming server with YOLOv11, ByteTrack, and ArcFace biometric recognition, achieving 99.2% identification accuracy with sub-60ms inference latency across high-density corridors.",
    features: [
      "Simultaneous 32-stream RTSP decoding and tensor pipeline optimization",
      "Zero-touch facial recognition attendance with instant CSV and API export",
      "Real-time camera coverage topology viewer and spatial occupancy heatmaps",
      "Instant multi-channel Telegram, SMS, and Webhook alarm dispatch"
    ],
    technologies: ["PyTorch", "YOLOv11", "ArcFace", "FastAPI", "React", "WebSockets", "Docker"],
    results: [
      "99.2% facial recognition accuracy in varied ambient lighting",
      "94% reduction in manual surveillance review time",
      "Sub-50ms identification latency per person"
    ],
    image_url: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80",
    status: "PRODUCTION DEPLOYED",
    progress_pct: 100
  },
  {
    id: 2,
    title: "BioGate Edge Facial Recognition & Access Controller",
    slug: "biogate-facial-access-controller",
    category: "Biometrics & Access Control",
    categoryKey: "biometrics",
    serviceSlug: "face-recognition",
    description: "High-security standalone facial recognition access controller with active 3D depth anti-spoofing, dry-contact relay triggers, and decentralized encrypted vector database synchronization.",
    problem_statement: "Physical keycards and fingerprint scanners created security vulnerabilities via buddy punching, card sharing, and hygiene issues in high-traffic commercial office entrances.",
    solution_statement: "Architected an edge vision controller using InsightFace ArcFace models paired with infrared liveness detection, triggering electromagnetic door locks in under 40 milliseconds.",
    features: [
      "Sub-40ms on-device biometric vector matching without external cloud dependency",
      "3D liveness detection rejecting printed photographs, tablet screens, and masks",
      "Automated relay pulse control for magnetic locks and motorized turnstiles",
      "Tamper-proof encrypted local vector storage with role-based admin dashboard"
    ],
    technologies: ["Python", "ArcFace", "OpenCV", "FastAPI", "SQLite Vector", "Relay GPIO", "React"],
    results: [
      "99.6% true acceptance rate with zero spoof bypasses",
      "< 40ms access decision latency",
      "100% offline edge operational reliability"
    ],
    image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    status: "PRODUCTION DEPLOYED",
    progress_pct: 100
  },
  {
    id: 3,
    title: "AeroCloud SaaS & Real-time Telemetry Dashboard",
    slug: "aerocloud-telemetry-dashboard",
    category: "Web Applications & SaaS",
    categoryKey: "web",
    serviceSlug: "web-development",
    description: "Next-generation distributed web application featuring real-time telemetry visualization, instant WebSocket metrics, role-based governance, and micro-frontend architecture.",
    problem_statement: "Legacy monitoring software suffered from high latency, rigid non-responsive interfaces, and lacked real-time collaborative insights across distributed engineering teams.",
    solution_statement: "Built a reactive Single Page Application with React, telemetry data streams, FastAPI asynchronous backend, and distributed Redis pub/sub handling 10,000+ continuous metrics.",
    features: [
      "Interactive telemetry node visualizer with custom Canvas data rendering",
      "Sub-100ms bidirectional WebSocket telemetry updates",
      "Automated PDF export and scheduled analytics reports",
      "Enterprise role-based permissions matrix and multi-tenant access control"
    ],
    technologies: ["React", "FastAPI", "Redis", "PostgreSQL", "WebSockets", "Vite", "Docker"],
    results: [
      "Sub-50ms render loop performance under high data stream load",
      "10,000+ concurrent telemetry data points handled seamlessly",
      "40% improvement in team operational response time"
    ],
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    status: "PRODUCTION DEPLOYED",
    progress_pct: 100
  },
  {
    id: 4,
    title: "OmniFlow Microservices & Enterprise Workflow Engine",
    slug: "omniflow-microservices-workflow",
    category: "Custom Software & Microservices",
    categoryKey: "software",
    serviceSlug: "custom-software",
    description: "High-throughput asynchronous job execution and workflow engine for multi-tenant data transformation, API orchestrations, and automated invoice reconciliation.",
    problem_statement: "Manual business workflows created processing bottlenecks and error-prone batch operations with zero auditing trails across accounting and inventory databases.",
    solution_statement: "Architected an event-driven microservices platform utilizing Python Celery, RabbitMQ, and PostgreSQL with atomic transaction logs and automated disaster recovery.",
    features: [
      "Visual workflow DAG builder and dependency resolver",
      "Atomic rollback and audit trail for financial reconciliation",
      "Rate-limited external API connectors with exponential backoff retries",
      "Comprehensive Prometheus metrics and Grafana telemetry dashboards"
    ],
    technologies: ["Python", "FastAPI", "Celery", "RabbitMQ", "SQLAlchemy", "PostgreSQL", "Docker"],
    results: [
      "Over 500,000 daily jobs processed with 99.99% system uptime",
      "Zero data loss across distributed microservice worker nodes",
      "85% decrease in operational cycle turnaround time"
    ],
    image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    status: "PRODUCTION DEPLOYED",
    progress_pct: 100
  },
  {
    id: 5,
    slug: "neurobot-student-research-vehicle",
    title: "NeuroBot: Edge AI Autonomous Student Research Vehicle",
    category: "Student Projects & Robotics",
    categoryKey: "student",
    serviceSlug: "final-year-projects",
    description: "Award-winning university final-year engineering prototype combining Raspberry Pi 5, Intel RealSense depth camera, and TensorRT neural networks for indoor GPS-denied autonomous navigation.",
    problem_statement: "Students needed a reproducible, robust, and cost-effective edge-AI robotics platform for advanced SLAM and obstacle avoidance research within academic budget constraints.",
    solution_statement: "Engineered an integrated hardware/software solution with complete ROS2 drivers, LiDAR SLAM mapping, custom Python neural vision models, and full IEEE documentation.",
    features: [
      "LiDAR-based SLAM and spatial occupancy mapping in GPS-denied environments",
      "Real-time obstacle avoidance with custom depth CNN inference",
      "Comprehensive IEEE research paper draft, circuit schematics, and synopsis",
      "Complete step-by-step viva presentation deck and video walkthrough"
    ],
    technologies: ["ROS2", "Python", "TensorRT", "OpenCV", "Raspberry Pi", "LiDAR", "React Dashboard"],
    results: [
      "Published in IEEE student research symposium",
      "Graded A+ in University Final Year Capstone review",
      "Sub-30ms real-time path replanning in dynamic mazes"
    ],
    image_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    status: "ACADEMIC CAPSTONE (A+ GRADE)",
    progress_pct: 100
  }
];
