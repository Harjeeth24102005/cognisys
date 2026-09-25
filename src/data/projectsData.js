export const COMPLETED_PROJECTS = [
  {
    id: 1,
    title: "CogniVision AI CCTV & Multi-Camera Edge Analytics",
    category: "Computer Vision & AI",
    description: "Enterprise-grade intelligent surveillance pipeline with real-time multi-person tracking, restricted-area perimeter breach detection, and automated biometric attendance logging across 32 synchronized IP camera streams.",
    problem_statement: "Traditional CCTV setups require manual human monitoring, causing delayed reaction to unauthorized intrusions, zero automated attendance tracking, and high labor overhead.",
    solution_statement: "Engineered an edge-AI streaming server with YOLOv11 + ByteTrack and ArcFace recognition, achieving 99.2% identification accuracy with sub-60ms inference latency.",
    features: [
      "Simultaneous 32-stream RTSP decoding & tensor pipeline",
      "Zero-touch facial attendance with instant CSV and API export",
      "Real-time camera coverage topology viewer",
      "Instant multi-channel Telegram & SMS alarm dispatch"
    ],
    technologies: ["PyTorch", "YOLOv11", "FastAPI", "React", "WebSockets", "Docker"],
    results: [
      "99.2% facial recognition accuracy in varied lighting",
      "94% reduction in manual surveillance review time",
      "Zero false alarms in designated security zones"
    ],
    image_url: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80",
    status: "COMPLETED",
    progress_pct: 100
  },
  {
    id: 2,
    title: "AeroCloud SaaS & Real-time Telemetry Dashboard",
    category: "Web Applications",
    description: "Next-generation distributed web application featuring real-time telemetry visualization, instant WebSocket metrics, role-based governance, and micro-frontend architecture.",
    problem_statement: "Legacy monitoring software suffered from high latency, rigid non-responsive interfaces, and lacked real-time collaborative insights.",
    solution_statement: "Built a reactive Single Page Application with React, telemetry data streams, FastAPI asynchronous backend, and distributed Redis pub/sub.",
    features: [
      "Interactive telemetry node visualizer",
      "Sub-100ms bidirectional WebSocket telemetry updates",
      "Automated PDF export and automated analytics reports",
      "Enterprise role-based permissions matrix"
    ],
    technologies: ["React", "FastAPI", "Redis", "PostgreSQL", "TailwindCSS Tokens"],
    results: [
      "Sub-50ms render loop performance",
      "10,000+ concurrent telemetry data points handled",
      "40% improvement in team operational response time"
    ],
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    status: "COMPLETED",
    progress_pct: 100
  },
  {
    id: 3,
    title: "OmniFlow Microservices & Enterprise Workflow Engine",
    category: "Software Systems",
    description: "High-throughput asynchronous job execution and workflow engine for multi-tenant data transformation, API orchestrations, and automated invoice reconciliation.",
    problem_statement: "Manual business workflows created processing bottlenecks and error-prone batch operations with zero auditing trails.",
    solution_statement: "Architected an event-driven microservices platform utilizing Python Celery, RabbitMQ, and PostgreSQL with atomic transaction logs and automated disaster recovery.",
    features: [
      "Visual workflow DAG builder and dependency resolver",
      "Atomic rollback and audit trail for financial reconciliation",
      "Rate-limited external API connectors with retry backoff",
      "Comprehensive Prometheus metrics and Grafana telemetry"
    ],
    technologies: ["Python", "Celery", "RabbitMQ", "SQLAlchemy", "PostgreSQL", "Docker"],
    results: [
      "Over 500,000 daily jobs processed with 99.99% uptime",
      "Zero data loss across distributed microservice nodes",
      "85% decrease in operational cycle turnaround"
    ],
    image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    status: "COMPLETED",
    progress_pct: 100
  },
  {
    id: 4,
    title: "NeuroBot: Edge AI Autonomous Student Research Vehicle",
    category: "Student Projects & IoT",
    description: "Award-winning university final-year engineering prototype combining Raspberry Pi 5, Intel RealSense depth camera, and TensorRT neural networks for indoor GPS-denied autonomous navigation.",
    problem_statement: "Students needed a comprehensive, reproducible, and robust edge-AI robotics platform for advanced SLAM and obstacle avoidance research within academic budget constraints.",
    solution_statement: "Engineered an integrated hardware/software solution with complete ROS2 drivers, LiDAR SLAM mapping, custom Python neural vision models, and full documentation.",
    features: [
      "LiDAR-based SLAM and spatial occupancy mapping",
      "Real-time obstacle avoidance with custom depth CNN",
      "Comprehensive IEEE research paper draft & circuit schematics",
      "Complete step-by-step viva presentation deck and video walkthrough"
    ],
    technologies: ["ROS2", "Python", "TensorRT", "OpenCV", "Raspberry Pi", "LiDAR", "React Dashboard"],
    results: [
      "Published in IEEE student research symposium",
      "Graded A+ in University Final Year Capstone review",
      "Sub-30ms real-time path replanning in dynamic mazes"
    ],
    image_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    status: "COMPLETED",
    progress_pct: 100
  }
];
