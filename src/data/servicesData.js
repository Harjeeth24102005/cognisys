import { Eye, Globe, Cpu, Terminal, GraduationCap, UserCheck, Layers, Sparkles, Shield, Server, Box } from 'lucide-react';
import imgAiCctv from '../assets/images/card-ai-cctv.jpg';
import imgWebDev from '../assets/images/card-web-dev.jpg';
import imgAiProjects from '../assets/images/card-ai-projects.jpg';
import imgPythonProjects from '../assets/images/card-python-projects.jpg';
import imgStudentProjects from '../assets/images/card-student-projects.jpg';
import imgFaceRecog from '../assets/images/card-face-recognition.jpg';
import imgSoftware from '../assets/images/card-software.jpg';
import { getAssetUrl } from '../utils/assets';

export const CORE_SERVICES = [
  {
    id: 1,
    slug: 'ai-cctv-surveillance',
    aliases: ['ai-cctv-attendance'],
    name: 'AI CCTV Surveillance & Attendance Monitoring System',
    category: 'Computer Vision & Attendance',
    videoFileName: 'AI-Based CCTV Attendance Monitoring System.mp4',
    metaTitle: 'Cognisys AI CCTV Surveillance & Attendance Monitoring System',
    metaDesc: 'Transform standard IP and RTSP cameras into autonomous AI CCTV surveillance and contactless biometric attendance networks with sub-50ms facial recognition by Cognisys.',
    primaryKeyword: 'AI CCTV surveillance',
    secondaryKeywords: ['AI CCTV monitoring', 'CCTV attendance monitoring', 'AI attendance monitoring system', 'AI attendance system', 'AI surveillance system', 'CCTV AI integration', 'AI video analytics', 'face recognition attendance'],
    short_desc: 'Transform existing or new CCTV infrastructure into an autonomous, contactless biometric attendance and surveillance network powered by edge AI.',
    full_desc: 'Cognisys AI CCTV Surveillance & Attendance Monitoring System integrates cutting-edge computer vision (YOLOv11 and ArcFace deep neural embeddings) with real-time video stream ingestion. The system delivers sub-50ms contactless multi-person facial recognition attendance marking, anti-spoofing verification, entry/exit timestamp logging, automated shift rosters, and instant management reporting. Compatible with any standard IP or RTSP camera network without requiring proprietary hardware replacements.',
    image: imgAiCctv,
    icon: Eye,
    color: '#00B4D8',
    technologies: ['PyTorch', 'OpenCV', 'YOLOv11', 'ArcFace', 'FastAPI', 'RTSP Streaming', 'Docker'],
    metrics: [
      { label: 'Verification Latency', value: '< 50ms' },
      { label: 'Biometric Precision', value: '99.8%' },
      { label: 'Camera Compatibility', value: 'Any IP / RTSP' },
      { label: 'Roster Automation', value: 'Real-time' }
    ],
    features: [
      'Contactless multi-face recognition attendance marking with sub-50ms latency',
      'Automated shift, overtime, and roster logging with exportable PDF/Excel reports',
      'Real-time perimeter intrusion alerts and instant SMS/Webhook notification dispatch',
      'Heatmaps, occupancy analytics, and multi-camera live dashboard monitoring',
      'Seamless plug-and-play integration with standard IP and RTSP CCTV cameras'
    ],
    workflow: [
      { step: '01', title: 'RTSP Stream Ingestion', desc: 'Connects directly to existing IP cameras via secure RTSP feeds with low-latency decoding.' },
      { step: '02', title: 'YOLOv11 Face & Person Detection', desc: 'Isolates and tracks subjects simultaneously across high-density environments.' },
      { step: '03', title: 'Biometric Vector Matching', desc: 'Extracts 512-dimensional facial embeddings and checks against local database in <50ms.' },
      { step: '04', title: 'Automated Logging & Alerting', desc: 'Updates attendance logs, detects unauthorized entries, and pushes real-time telemetry.' }
    ],
    applications: [
      { title: 'Corporate Workplaces', desc: 'Queue-free contactless attendance marking and restricted-zone access governance.' },
      { title: 'Educational Institutions', desc: 'Automated classroom and campus entry monitoring with automated parent notifications.' },
      { title: 'Industrial & Manufacturing Plants', desc: 'Safety helmet detection, unauthorized perimeter alerts, and shift change verification.' },
      { title: 'Healthcare Facilities', desc: 'Touchless patient and staff check-in eliminating contact-borne contamination risks.' }
    ],
    faqs: [
      {
        q: 'What is an AI CCTV surveillance system?',
        a: 'An AI CCTV surveillance system utilizes edge computer vision and deep learning neural networks to analyze video streams in real time. Unlike passive recording cameras, it automatically detects persons, identifies authorized faces, tracks movement patterns, and flags security breaches without manual human monitoring.'
      },
      {
        q: 'Can AI CCTV be used for attendance monitoring?',
        a: 'Yes. Cognisys AI CCTV Attendance Monitoring marks attendance contactlessly as employees or students walk past standard security cameras. It logs entry and exit times with sub-50ms latency and 99.8% precision, eliminating biometric fingerprint queues.'
      },
      {
        q: 'Does Cognisys require replacing our existing CCTV cameras?',
        a: 'No. The Cognisys system connects seamlessly with any existing standard IP or RTSP camera network. Our edge processing server processes camera feeds over local networks without requiring costly hardware replacements.'
      },
      {
        q: 'How does the system prevent photo and video spoofing?',
        a: 'We implement 3D depth analysis and multi-frame texture liveness algorithms that immediately reject printed photos, tablet screens, and video playback attacks.'
      }
    ],
    related_services: ['face-recognition', 'computer-vision', 'ai-integration']
  },
  {
    id: 2,
    slug: 'face-recognition',
    aliases: [],
    name: 'Face Recognition Systems & Biometric Verification',
    category: 'Computer Vision & Biometrics',
    videoFileName: 'Face Recognition System.mp4',
    metaTitle: 'Cognisys Face Recognition Systems | AI Biometric Access Control',
    metaDesc: 'Enterprise-grade facial recognition engine with 3D depth anti-spoofing, sub-40ms edge verification, and automated door/turnstile relays engineered by Cognisys.',
    primaryKeyword: 'face recognition system',
    secondaryKeywords: ['face recognition attendance', 'AI face recognition', 'computer vision face recognition', 'face recognition surveillance', 'contactless biometric attendance', 'facial recognition access control'],
    short_desc: 'Enterprise-grade facial recognition engine for secure access control, biometric identity verification, and anti-spoofing surveillance.',
    full_desc: 'Cognisys delivers a high-precision facial recognition architecture engineered for lightning-fast biometric identity verification. Featuring 3D depth anti-spoofing against physical photos and screen replays, multi-angle pose tolerance, sub-40ms edge vector matching, instant door-lock and turnstile relay triggers, and tamper-proof audit logging.',
    image: imgFaceRecog,
    icon: UserCheck,
    color: '#10B981',
    technologies: ['Python', 'ArcFace', 'InsightFace', 'OpenCV', 'FastAPI', 'Vector SQLite/Qdrant'],
    metrics: [
      { label: 'Biometric Precision', value: '> 99.4%' },
      { label: 'Anti-Spoofing', value: '3D Depth Liveness' },
      { label: 'Matching Latency', value: '< 40ms Edge' },
      { label: 'Relay Triggers', value: 'Turnstiles & Doors' }
    ],
    features: [
      'High-accuracy facial recognition with >99.4% biometric verification precision',
      'Advanced anti-spoofing liveness detection rejecting printed photos and video replays',
      'Multi-angle facial recognition supporting dynamic head tilts, glasses, and masks',
      'Sub-40ms edge verification with secure local embedding vector database',
      'Hardware relay triggers for automated smart turnstiles and electronic access doors'
    ],
    workflow: [
      { step: '01', title: 'Image Capture & Alignment', desc: 'Detects facial landmarks and corrects head pose geometry dynamically.' },
      { step: '02', title: 'Liveness & Anti-Spoofing QA', desc: 'Validates natural eye/skin reflectivity to defeat printed photos and digital screens.' },
      { step: '03', title: 'Deep Feature Extraction', desc: 'Generates a unique 512D biometric vector that cannot be reverse-engineered to photos.' },
      { step: '04', title: 'Hardware Relay Trigger', desc: 'Instantly pulses dry-contact relays to open speed gates, magnetic doors, or turnstiles.' }
    ],
    applications: [
      { title: 'Turnstile & Speed Gates', desc: 'Rapid pedestrian ingress control in high-traffic office lobbies and transit stations.' },
      { title: 'Server Rooms & High-Security Areas', desc: 'Multi-factor authentication verifying authorized personnel before granting access.' },
      { title: 'Visitor Management Systems', desc: 'Temporary guest badge issuance and automated entry authorization.' },
      { title: 'Contactless Time Clocks', desc: 'Hygienic biometric attendance logging replacing touch fingerprint scanners.' }
    ],
    faqs: [
      {
        q: 'What is face recognition attendance?',
        a: 'Face recognition attendance is a touchless biometric system that identifies individuals using facial features captured via cameras. It logs time-in and time-out automatically, eliminating physical cards, fingerprint scanning lines, and buddy-punching fraud.'
      },
      {
        q: 'Can the face recognition system operate offline without internet?',
        a: 'Yes. Cognisys face recognition systems run entirely on local edge hardware with localized vector embeddings, ensuring zero dependence on external internet connectivity and maximum data privacy.'
      },
      {
        q: 'How fast is the facial recognition matching speed?',
        a: 'Vector comparison against databases of up to 10,000 enrolled individuals executes in under 40 milliseconds on standard edge compute devices.'
      }
    ],
    related_services: ['ai-cctv-surveillance', 'computer-vision', 'python-projects']
  },
  {
    id: 3,
    slug: 'ai-integration',
    aliases: [],
    name: 'AI Integration & Enterprise AI Solutions',
    category: 'Enterprise AI & Implementation',
    videoFileName: 'COGNISYS AI.mp4',
    metaTitle: 'Cognisys AI Integration & Enterprise AI Solutions Company',
    metaDesc: 'Integrate custom AI, deep learning models, LLMs, and real-time computer vision into your existing business software, ERPs, and CCTV systems with Cognisys.',
    primaryKeyword: 'AI integration',
    secondaryKeywords: ['AI integration company', 'AI solutions', 'AI implementation', 'AI software integration', 'AI CCTV integration', 'custom AI projects', 'enterprise AI solutions'],
    short_desc: 'Seamlessly embed artificial intelligence, deep learning models, LLMs, and computer vision pipelines into your existing software and business workflows.',
    full_desc: 'Cognisys empowers enterprises and growing companies to adopt practical artificial intelligence. We design, fine-tune, and integrate custom AI models, generative LLM workflows, automated visual inspection pipelines, and intelligent decision engines directly into your existing enterprise software, ERPs, databases, and CCTV camera networks.',
    image: imgAiProjects,
    icon: Sparkles,
    color: '#7C3AED',
    technologies: ['PyTorch', 'TensorFlow', 'FastAPI', 'HuggingFace', 'LangChain', 'Docker', 'REST/gRPC'],
    metrics: [
      { label: 'Integration Architecture', value: 'Zero-Downtime APIs' },
      { label: 'Model Optimization', value: 'ONNX / TensorRT' },
      { label: 'Security & Privacy', value: 'On-Premise Ready' },
      { label: 'Codebase Ownership', value: '100% Unencumbered' }
    ],
    features: [
      'Custom AI model integration via high-throughput REST and gRPC microservice APIs',
      'CCTV AI integration converting legacy surveillance cameras into smart vision hubs',
      'Private generative AI & LLM agent integration with internal knowledge bases',
      'Automated visual anomaly detection and quality assurance for industrial workflows',
      'Full deployment support on local edge servers, AWS, GCP, or private data centers'
    ],
    workflow: [
      { step: '01', title: 'System Architecture Audit', desc: 'Assess existing software APIs, data structures, and hardware capacity.' },
      { step: '02', title: 'Custom Model Adaptation', desc: 'Train or quantize domain-specific neural models for optimal speed and accuracy.' },
      { step: '03', title: 'Microservice API Wrapper', desc: 'Encapsulate inference engines into containerized, rate-limited REST/gRPC endpoints.' },
      { step: '04', title: 'Continuous Monitoring & Telemetry', desc: 'Deploy drift monitoring, fallback routines, and automated failover pipelines.' }
    ],
    applications: [
      { title: 'ERP & Business Systems', desc: 'Automating document data extraction, invoice reconciliation, and predictive planning.' },
      { title: 'Security & Surveillance Networks', desc: 'Layering computer vision object detection onto legacy video management systems (VMS).' },
      { title: 'Customer Support Portals', desc: 'Deploying autonomous generative AI assistants trained on proprietary corporate docs.' },
      { title: 'Warehouse Logistics', desc: 'Automated barcode reading, parcel volume measurement, and inventory tracking.' }
    ],
    faqs: [
      {
        q: 'Can Cognisys integrate AI into our existing legacy software?',
        a: 'Yes. We build lightweight containerized microservices that expose standard REST or WebSocket APIs. Your existing software simply makes API requests to receive real-time predictions, requiring zero disruptive rewrites of your legacy codebase.'
      },
      {
        q: 'Does Cognisys offer on-premise AI integration?',
        a: 'Yes. For clients handling sensitive biometric, financial, or proprietary records, we deploy models completely within your on-premise private infrastructure.'
      },
      {
        q: 'What types of AI solutions can Cognisys implement?',
        a: 'We implement computer vision, CCTV video analytics, automated natural language processing, predictive classification models, document intelligence, and multi-agent LLM systems.'
      }
    ],
    related_services: ['computer-vision', 'ai-cctv-surveillance', 'custom-software', 'ai-projects']
  },
  {
    id: 4,
    slug: 'computer-vision',
    aliases: [],
    name: 'Computer Vision Solutions & Edge Video Analytics',
    category: 'Computer Vision & Deep Learning',
    videoFileName: 'AI-Based CCTV Attendance Monitoring System.mp4',
    metaTitle: 'Cognisys Computer Vision Solutions & Edge Video Analytics',
    metaDesc: 'Production-ready computer vision solutions: real-time YOLOv11 object tracking, anomaly detection, automated visual inspection, and video analytics by Cognisys.',
    primaryKeyword: 'computer vision solutions',
    secondaryKeywords: ['computer vision', 'computer vision company', 'computer vision projects', 'Python computer vision', 'AI image processing', 'AI video analytics', 'object detection solutions'],
    short_desc: 'Custom computer vision algorithms, real-time object detection, defect inspection, and edge video analytics for industry and enterprise.',
    full_desc: 'Cognisys builds production-grade computer vision systems that extract actionable intelligence from visual data. From real-time multi-object tracking (YOLOv11, ByteTrack) and automated optical defect inspection to thermal imaging analysis, spatial crowd density estimation, and license plate recognition (ALPR).',
    image: imgAiCctv,
    icon: Eye,
    color: '#0891B2',
    technologies: ['OpenCV', 'YOLOv11', 'PyTorch', 'TensorRT', 'DeepSORT', 'FastAPI', 'Python'],
    metrics: [
      { label: 'Inference Speed', value: '60+ FPS Real-Time' },
      { label: 'Detection Accuracy', value: 'mAP@50 > 94%' },
      { label: 'Edge Hardware', value: 'NVIDIA Jetson / x86' },
      { label: 'Video Streams', value: 'Multi-Channel RTSP' }
    ],
    features: [
      'Real-time multi-class object detection, classification, and persistent trajectory tracking',
      'Automated defect inspection and dimensional tolerance verification in manufacturing',
      'Perimeter security, virtual tripwire crossing, and intrusion zone alarming',
      'Automatic Number Plate Recognition (ANPR / ALPR) for smart parking and toll gates',
      'Hardware acceleration using NVIDIA TensorRT, ONNX Runtime, and CUDA'
    ],
    workflow: [
      { step: '01', title: 'Dataset Engineering & Annotation', desc: 'Curating, cleaning, and augmenting high-quality domain-specific image datasets.' },
      { step: '02', title: 'Deep Neural Architecture Design', desc: 'Training custom vision backbones optimized for edge latency and detection accuracy.' },
      { step: '03', title: 'Quantization & Hardware Tuning', desc: 'Converting models into FP16/INT8 TensorRT engines for maximum inference throughput.' },
      { step: '04', title: 'Production Pipeline Deployment', desc: 'Integrating video decoders, tracking logic, and business alert dispatchers.' }
    ],
    applications: [
      { title: 'Smart Retail & Commercial', desc: 'Customer footfall heatmaps, aisle dwell times, and queue management analytics.' },
      { title: 'Manufacturing Quality Control', desc: 'High-speed automated visual inspection identifying surface flaws on assembly lines.' },
      { title: 'Transportation & Traffic', desc: 'Vehicle counting, speed estimation, lane violation detection, and smart parking.' },
      { title: 'Workplace Safety Compliance', desc: 'Automatic PPE detection (helmets, safety vests, gloves) in hazardous zones.' }
    ],
    faqs: [
      {
        q: 'What is computer vision and how does it help businesses?',
        a: 'Computer vision enables software systems to interpret and understand visual information from digital cameras and videos. It automates inspection, security monitoring, counts inventory, and detects safety hazards with faster speed and higher consistency than human visual monitoring.'
      },
      {
        q: 'Can Cognisys build Python computer vision projects for custom hardware?',
        a: 'Yes. We engineer Python computer vision solutions optimized for NVIDIA Jetson edge devices, Intel mini-PCs, Raspberry Pi 5 with AI accelerators, and cloud GPU clusters.'
      },
      {
        q: 'What computer vision frameworks does Cognisys use?',
        a: 'We specialize in OpenCV, PyTorch, Ultralytics YOLOv11, TensorRT, MediaPipe, and ByteTrack.'
      }
    ],
    related_services: ['ai-cctv-surveillance', 'face-recognition', 'python-projects', 'ai-integration']
  },
  {
    id: 5,
    slug: 'web-development',
    aliases: ['websites'],
    name: 'Web Design & Modern Web Development',
    category: 'Web Platforms & Systems',
    videoFileName: 'Websites & Modern Web Development.mp4',
    metaTitle: 'Cognisys Web Design & High-Performance Web Development Company',
    metaDesc: 'Modern web development company building ultra-fast React, Vite & Next.js web applications, responsive business websites, and enterprise client portals.',
    primaryKeyword: 'web development company',
    secondaryKeywords: ['web designer', 'web design', 'website development', 'custom website development', 'business website development', 'modern web development', 'web design company India'],
    short_desc: 'High-performance, beautifully responsive business websites, interactive client portals, and cloud-native modern web applications.',
    full_desc: 'Cognisys engineers modern websites and responsive web applications built for speed, visual excellence, and measurable conversion. Utilizing modern frontend technologies (React, Vite, Next.js), modular CSS design systems, clean semantic code, and robust backend REST APIs. Engineered with fast Core Web Vitals, seamless mobile responsiveness, and clean SEO architecture.',
    image: imgWebDev,
    icon: Globe,
    color: '#0284C7',
    technologies: ['React', 'Vite', 'Next.js', 'JavaScript', 'HTML5/CSS3', 'FastAPI', 'Node.js'],
    metrics: [
      { label: 'Lighthouse Performance', value: '98/100' },
      { label: 'Responsive Design', value: '100% Mobile' },
      { label: 'Stack Architecture', value: 'Modern React' },
      { label: 'SEO & Speed', value: 'Core Web Vitals' }
    ],
    features: [
      'Custom responsive UI/UX web design optimized for conversions and aesthetics',
      'Enterprise admin portals and real-time operational client dashboards',
      'Secure RESTful API integration and scalable cloud database architectures',
      'Full SEO technical optimization, accessibility (a11y), and fast Core Web Vitals',
      'Mobile-first responsive layouts across phones, tablets, and desktops'
    ],
    workflow: [
      { step: '01', title: 'UI/UX Wireframing & Design', desc: 'Crafting visually stunning, brand-aligned interfaces with modern micro-interactions.' },
      { step: '02', title: 'Component-Driven Architecture', desc: 'Building modular React components with pure vanilla styling and optimal bundle size.' },
      { step: '03', title: 'API & State Management Integration', desc: 'Connecting fast asynchronous endpoints, secure authentication, and real-time state.' },
      { step: '04', title: 'SEO, Accessibility & Performance QA', desc: 'Optimizing Core Web Vitals, Schema.org metadata, and responsive device testing.' }
    ],
    applications: [
      { title: 'Corporate Websites', desc: 'Establishing modern brand authority, service discovery, and lead generation.' },
      { title: 'SaaS Platforms & Web Apps', desc: 'Interactive subscription platforms with role-based user management.' },
      { title: 'Client & Admin Portals', desc: 'Real-time operational dashboards for project tracking, analytics, and billing.' },
      { title: 'E-Commerce & Digital Catalogs', desc: 'Fast, secure storefronts with frictionless checkout experiences.' }
    ],
    faqs: [
      {
        q: 'What types of websites does Cognisys develop?',
        a: 'Cognisys builds modern corporate websites, high-performance web applications, interactive customer portals, SaaS interfaces, e-commerce storefronts, and internal operational dashboards.'
      },
      {
        q: 'Are Cognisys websites optimized for mobile devices and search engines?',
        a: 'Yes. Every website is built mobile-first, ensuring fluid responsiveness across smartphones, tablets, and desktops. We incorporate Google-recommended technical SEO best practices, structured data, semantic HTML, and Core Web Vitals optimization.'
      },
      {
        q: 'Do you provide full source code ownership upon project completion?',
        a: 'Yes. Clients receive 100% complete source code ownership, clean repository commits, deployment scripts, and architecture documentation.'
      }
    ],
    related_services: ['custom-software', 'python-projects', 'ai-integration']
  },
  {
    id: 6,
    slug: 'custom-software',
    aliases: [],
    name: 'Custom Software Development & Cloud Systems',
    category: 'Enterprise Software Engineering',
    videoFileName: 'CUSTOM SOFTWARE SYSTEMS & CLOUD ARCHITECTURE.mp4',
    metaTitle: 'Cognisys Custom Software Development & Enterprise Cloud Systems',
    metaDesc: 'Scalable custom software development company in India specializing in asynchronous Python microservices, distributed cloud architectures, and secure business APIs.',
    primaryKeyword: 'custom software development',
    secondaryKeywords: ['software development company', 'software development company in India', 'custom software development India', 'enterprise software development', 'cloud architecture solutions'],
    short_desc: 'Bespoke enterprise software, scalable microservices architectures, distributed databases, and automated business workflows.',
    full_desc: 'Cognisys architects and develops custom enterprise software solutions designed to solve complex business operations. From event-driven microservices platforms and automated transaction reconciliation to internal inventory tracking and cloud API integrations. Built with high-throughput Python backends, atomic database transactions, and resilient containerized deployments.',
    image: imgSoftware,
    icon: Server,
    color: '#0891B2',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'RabbitMQ', 'Celery'],
    metrics: [
      { label: 'Uptime Reliability', value: '99.99%' },
      { label: 'Throughput', value: 'High RPS Async' },
      { label: 'Containerization', value: 'Docker Compose' },
      { label: 'Architecture', value: 'Microservices' }
    ],
    features: [
      'Tailor-made enterprise software tailored precisely to operational business requirements',
      'Asynchronous microservices architecture ensuring zero single points of failure',
      'Real-time data synchronization with distributed Redis caching and pub/sub',
      'Robust relational and vector database engineering with PostgreSQL and SQLAlchemy',
      'Full Docker containerization with CI/CD deployment pipelines'
    ],
    workflow: [
      { step: '01', title: 'Business Logic Modeling', desc: 'Mapping database schemas, state machines, and business rules.' },
      { step: '02', title: 'API & Microservice Scaffolding', desc: 'Developing typed, test-driven REST APIs with comprehensive validation.' },
      { step: '03', title: 'Data Layer & Cache Optimization', desc: 'Structuring relational indices, transactional locking, and Redis caching.' },
      { step: '04', title: 'Load Testing & Docker Deployment', desc: 'Conducting stress testing and deploying containerized services.' }
    ],
    applications: [
      { title: 'Workflow Automation Engines', desc: 'Eliminating manual spreadsheet processing with automated digital workflows.' },
      { title: 'Inventory & Asset Management', desc: 'Tracking multi-location equipment, maintenance schedules, and utilization.' },
      { title: 'Billing & Invoice Reconciliation', desc: 'Automating financial transaction audits and compliance reports.' },
      { title: 'Third-Party API Integration', desc: 'Bridging payment gateways, CRMs, logistics APIs, and ERP systems.' }
    ],
    faqs: [
      {
        q: 'Why invest in custom software rather than off-the-shelf software?',
        a: 'Custom software is engineered specifically around your unique business workflows, eliminating expensive monthly subscription fees per user, rigid feature constraints, and unnecessary third-party dependencies.'
      },
      {
        q: 'How does Cognisys guarantee software stability and security?',
        a: 'We use typed Python architectures, comprehensive unit/integration test suites, role-based access control, cryptographic hashing, and automated Docker orchestration.'
      }
    ],
    related_services: ['web-development', 'python-projects', 'ai-integration']
  },
  {
    id: 7,
    slug: 'python-projects',
    aliases: [],
    name: 'Python Projects & Scalable Backend Engineering',
    category: 'Python & Automation Engineering',
    videoFileName: 'Python-Based Projects.mp4',
    metaTitle: 'Cognisys Python Projects & Scalable Backend Engineering',
    metaDesc: 'High-throughput Python projects, asynchronous FastAPI and Django backend architectures, automated web scrapers, ETL pipelines, and AI engineering by Cognisys.',
    primaryKeyword: 'Python projects',
    secondaryKeywords: ['Python based projects', 'Python AI projects', 'Python machine learning projects', 'Python computer vision projects', 'Python final year projects', 'Python development company India'],
    short_desc: 'High-throughput Python applications, FastAPI/Django backend architectures, data scrapers, automation bots, and desktop software.',
    full_desc: 'Cognisys develops robust Python-powered solutions built for scalability, automation, and speed. From high-performance asynchronous microservices (FastAPI, Django, Flask) and data extraction ETL scrapers to intelligent automation bots, desktop utilities, computer vision pipelines, and custom algorithmic scripts.',
    image: imgPythonProjects,
    icon: Terminal,
    color: '#0891B2',
    technologies: ['Python', 'FastAPI', 'Django', 'Flask', 'Pandas', 'NumPy', 'Celery', 'Docker'],
    metrics: [
      { label: 'API Throughput', value: 'High RPS Async' },
      { label: 'Backend Stack', value: 'FastAPI / Django' },
      { label: 'Deployment', value: 'Docker Compose' },
      { label: 'Automation', value: '24/7 Resilient' }
    ],
    features: [
      'High-performance asynchronous backend APIs using FastAPI and Django',
      'Intelligent web scraping, data extraction and automated ETL pipelines',
      'Custom business automation scripts, desktop GUIs and bot workflows',
      'Data analysis, scientific processing, and interactive dashboard tools',
      'Clean modular code architecture with full Docker containerization'
    ],
    workflow: [
      { step: '01', title: 'Data Flow & API Architecture', desc: 'Defining Pydantic schemas, asynchronous handlers, and database connections.' },
      { step: '02', title: 'Core Logic & Task Queue Implementation', desc: 'Writing asynchronous business algorithms with background task queues.' },
      { step: '03', title: 'Integration Testing & Profiling', desc: 'Executing automated pytest suites and optimizing CPU/memory bottlenecks.' },
      { step: '04', title: 'Packaging & Container Rollout', desc: 'Generating Docker images, environment manifests, and setup scripts.' }
    ],
    applications: [
      { title: 'Async REST API Gateways', desc: 'Powering web and mobile applications with low-latency JSON data feeds.' },
      { title: 'Automated Web Scraping & ETL', desc: 'Collecting market intelligence, competitor pricing, and research feeds.' },
      { title: 'Scientific Data Processing', desc: 'Processing numerical matrices, sensor logs, and statistical trends.' },
      { title: 'Desktop Software Utilities', desc: 'Building user-friendly cross-platform desktop applications with PyQt.' }
    ],
    faqs: [
      {
        q: 'Does Cognisys develop Python projects for both businesses and students?',
        a: 'Yes. We build commercial enterprise Python backends for businesses as well as verified academic Python projects and capstone prototypes for engineering students.'
      },
      {
        q: 'Why is FastAPI often preferred for modern Python web services?',
        a: 'FastAPI offers asynchronous concurrency natively on top of Starlette and Uvicorn, delivering throughput on par with NodeJS and Go while retaining Python simplicity and automatic Swagger/OpenAPI documentation.'
      },
      {
        q: 'Can Cognisys build automated Python scraping scripts?',
        a: 'Yes. We construct compliant, resilient web scrapers with automatic retry logic, proxy rotation, and structured JSON/database exports.'
      }
    ],
    related_services: ['ai-projects', 'custom-software', 'final-year-projects', 'computer-vision']
  },
  {
    id: 8,
    slug: 'ai-projects',
    aliases: [],
    name: 'AI/ML Projects & Data Science Solutions',
    category: 'Artificial Intelligence & Machine Learning',
    videoFileName: 'AI-Based Projects.mp4',
    metaTitle: 'Cognisys AI/ML Projects & Machine Learning Engineering',
    metaDesc: 'End-to-end artificial intelligence and machine learning projects: deep learning neural networks, NLP LLM pipelines, predictive models, and PyTorch deployments.',
    primaryKeyword: 'AI projects',
    secondaryKeywords: ['machine learning projects', 'AI/ML projects', 'data science projects', 'custom AI projects', 'deep learning projects', 'Python AI projects'],
    short_desc: 'End-to-end artificial intelligence systems including deep learning, NLP, computer vision, LLM integrations, and neural predictive pipelines.',
    full_desc: 'Cognisys designs and implements custom artificial intelligence and machine learning solutions engineered from theoretical architecture to production deployment. We build custom deep learning models, LLM-powered cognitive workflows, document intelligence pipelines, multi-label classifiers, and predictive forecasting algorithms.',
    image: imgAiProjects,
    icon: Cpu,
    color: '#7C3AED',
    technologies: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'HuggingFace', 'Pandas', 'OpenCV'],
    metrics: [
      { label: 'Neural Models', value: 'YOLOv11 & LLMs' },
      { label: 'Inference Speed', value: 'Real-Time Edge' },
      { label: 'Frameworks', value: 'PyTorch / TF' },
      { label: 'Code & Weights', value: '100% Ownership' }
    ],
    features: [
      'Custom Deep Learning & Neural Network model development and training',
      'Natural Language Processing (NLP) and Generative AI/LLM agent workflows',
      'Computer Vision, object detection, semantic segmentation, and tracking',
      'Predictive analytics, time-series forecasting, and automated decision algorithms',
      'Production-ready REST API deployment and cloud synchronization'
    ],
    workflow: [
      { step: '01', title: 'Problem Formulation & Dataset Curation', desc: 'Defining evaluation metrics (F1, precision, mAP) and preparing balanced datasets.' },
      { step: '02', title: 'Model Architecture Exploration', desc: 'Experimenting with transformer and CNN architectures with hyperparameter sweeps.' },
      { step: '03', title: 'Validation & Confusion Matrix Analysis', desc: 'Verifying generalization on test sets with cross-validation.' },
      { step: '04', title: 'Export & Deployment Serving', desc: 'Exporting optimized model weights with FastAPI inference endpoints.' }
    ],
    applications: [
      { title: 'Predictive Maintenance', desc: 'Forecasting equipment failures from time-series sensor telemetry.' },
      { title: 'Healthcare Image Analysis', desc: 'Computer-aided classification of medical scans and biological patterns.' },
      { title: 'Financial Risk Modeling', desc: 'Credit scoring, anomaly detection, and automated fraud prevention.' },
      { title: 'Smart Search & Semantic Retrieval', desc: 'Vector database search across technical manuals and enterprise documentation.' }
    ],
    faqs: [
      {
        q: 'What AI and Machine Learning frameworks does Cognisys specialize in?',
        a: 'We specialize in PyTorch, TensorFlow, Scikit-Learn, Hugging Face Transformers, OpenCV, and XGBoost.'
      },
      {
        q: 'Do you deliver complete model weights and training code?',
        a: 'Yes. Clients receive the complete Python training scripts, data preprocessing pipelines, trained model checkpoints/weights, and API serving files.'
      }
    ],
    related_services: ['computer-vision', 'python-projects', 'final-year-projects', 'ai-integration']
  },
  {
    id: 9,
    slug: 'final-year-projects',
    aliases: [],
    name: 'Final Year Projects & Engineering Capstone Development',
    category: 'Academic Engineering & Capstones',
    videoFileName: 'Final Year Projects.mp4',
    metaTitle: 'Cognisys Final Year Project Development | Engineering Capstones',
    metaDesc: 'Legitimate final year engineering project development and mentorship across CSE, AI/DS, and ECE. 100% verified source code, IEEE base papers, and viva preparation.',
    primaryKeyword: 'final year projects',
    secondaryKeywords: ['final year project development', 'final year project company', 'project dealer', 'project makers', 'final year project makers', 'engineering projects', 'college projects', 'student projects', 'AI final year projects', 'Python final year projects', 'computer vision final year projects', 'final year project support'],
    short_desc: 'Complete engineering final-year capstones with working source code, IEEE base papers, complete documentation, and viva guidance.',
    full_desc: 'Cognisys provides comprehensive technical mentorship and prototype development for engineering final-year students across Computer Science (CSE), Information Technology (IT), Artificial Intelligence & Data Science (AI/DS), and Electronics (ECE). We deliver 100% verified working source code, IEEE base paper implementations, clear architectural novelty, complete project documentation, system diagrams, and one-on-one technical viva preparation.',
    image: imgStudentProjects,
    icon: GraduationCap,
    color: '#F59E0B',
    technologies: ['Python', 'React', 'PyTorch', 'FastAPI', 'OpenCV', 'IoT / Raspberry Pi'],
    metrics: [
      { label: 'Source Code', value: '100% Verified' },
      { label: 'Academic Rigor', value: 'IEEE Base Paper' },
      { label: 'Documentation', value: 'Complete Report' },
      { label: 'Viva Preparation', value: '1-on-1 Guidance' }
    ],
    features: [
      '100% verified, fully working source code with step-by-step setup guide',
      'IEEE base paper implementation with clear novelty justification',
      'Comprehensive documentation, synopsis, and IEEE-standard project report',
      'System architecture diagrams, dataflow charts, and database schemas',
      'One-on-one project demo walkthrough and technical viva preparation'
    ],
    workflow: [
      { step: '01', title: 'Domain Selection & IEEE Base Paper', desc: 'Selecting cutting-edge IEEE papers with well-defined novelty for university approval.' },
      { step: '02', title: 'Hands-On Prototype Engineering', desc: 'Developing the complete frontend, backend, and neural model with clean modular code.' },
      { step: '03', title: 'Comprehensive Academic Documentation', desc: 'Drafting project synopsis, literature survey, architecture diagrams, and IEEE reports.' },
      { step: '04', title: '1-on-1 Viva Demonstration Coaching', desc: 'Conducting mock technical reviews and explaining algorithmic code line-by-line.' }
    ],
    applications: [
      { title: 'Computer Science & IT', desc: 'Cloud systems, cybersecurity, web applications, and distributed databases.' },
      { title: 'AI & Data Science (AI/DS)', desc: 'Deep learning models, NLP sentiment analysis, and computer vision classification.' },
      { title: 'Internet of Things & Robotics', desc: 'Raspberry Pi / Arduino microcontrollers with edge sensor telemetry.' },
      { title: 'Biometric & Vision Systems', desc: 'Facial recognition attendance, driver drowsiness detection, and object tracking.' }
    ],
    faqs: [
      {
        q: 'What types of final year projects does Cognisys support?',
        a: 'We support engineering capstones in Artificial Intelligence, Machine Learning, Computer Vision, Deep Learning, Python Web Applications, Edge IoT Systems, and Cloud Software across CSE, IT, AI/DS, and ECE disciplines.'
      },
      {
        q: 'Is the final year project source code guaranteed to work?',
        a: 'Yes. All project deliverables include 100% verified, executable code tested on clean environments, complete with a step-by-step installation guide, virtual environment configs, and sample test datasets.'
      },
      {
        q: 'Does Cognisys help students prepare for project viva presentations?',
        a: 'Yes. We conduct dedicated one-on-one code walkthrough sessions where our engineering leads explain the system architecture, mathematical formulas, algorithms, and anticipated examiner questions.'
      },
      {
        q: 'How does Cognisys uphold academic integrity?',
        a: 'We provide technical mentorship, source code education, and research guidance. Students actively learn the mechanics of their project so they can explain, modify, and defend their work with deep technical confidence.'
      }
    ],
    related_services: ['student-projects', 'python-projects', 'ai-projects', 'computer-vision']
  },
  {
    id: 10,
    slug: 'student-projects',
    aliases: [],
    name: 'College & Student Project Development Lab',
    category: 'Student Innovation & Research',
    videoFileName: 'Final Year Projects.mp4',
    metaTitle: 'Cognisys Student Project Development & College Capstone Mentorship',
    metaDesc: 'Hands-on student project development lab providing technical guidance, IEEE paper implementation, working hardware/software code, and viva coaching.',
    primaryKeyword: 'student projects',
    secondaryKeywords: ['college projects', 'college project development', 'student project development', 'engineering projects', 'project support', 'student innovation lab India'],
    short_desc: 'Hands-on mentorship, code reviews, and prototype development for college engineering students, mini-projects, and research hackathons.',
    full_desc: 'The Cognisys Student Innovation Lab supports undergraduate and postgraduate engineering students transforming conceptual ideas into fully functioning software and hardware prototypes. Whether you are building a semester mini-project, preparing for a competitive technical hackathon, or publishing a research paper, our team provides architectural guidance, verified codebases, and comprehensive technical coaching.',
    image: imgStudentProjects,
    icon: GraduationCap,
    color: '#F59E0B',
    technologies: ['Python', 'React', 'OpenCV', 'PyTorch', 'IoT Hardware', 'FastAPI'],
    metrics: [
      { label: 'Student Mentorship', value: '1-on-1 Sessions' },
      { label: 'Code Quality', value: 'Production Standards' },
      { label: 'Documentation', value: 'Full IEEE Format' },
      { label: 'Domain Scope', value: 'CSE / AI / ECE' }
    ],
    features: [
      'Comprehensive hands-on technical guidance across software and hardware domains',
      'Step-by-step code walkthroughs enabling students to understand every module',
      'Assistance with circuit schematics, sensor wiring, and IoT microcontroller code',
      'Literature review structuring and project presentation slide decks',
      'Mock viva evaluations with constructive technical feedback'
    ],
    workflow: [
      { step: '01', title: 'Idea Discovery & Feasibility', desc: 'Refining project scope within university guidelines and submission deadlines.' },
      { step: '02', title: 'Modular Architecture Development', desc: 'Writing clean, well-commented code modules that students can easily navigate.' },
      { step: '03', title: 'Testing & Verification', desc: 'Validating output metrics, error handling, and demo screen recordings.' },
      { step: '04', title: 'Presentation & Defense Mentorship', desc: 'Equipping students with presentation slide decks and confident viva answers.' }
    ],
    applications: [
      { title: 'Semester Mini-Projects', desc: 'Practical implementations demonstrating foundational programming and algorithmic skills.' },
      { title: 'Hackathon Prototypes', desc: 'Rapid prototype building for national and collegiate innovation hackathons.' },
      { title: 'Research Paper Implementations', desc: 'Replicating baseline algorithms and implementing novel comparative methods.' },
      { title: 'Interdisciplinary IoT Projects', desc: 'Integrating physical sensors, microcontrollers, and cloud dashboards.' }
    ],
    faqs: [
      {
        q: 'Who can enroll in the Cognisys student project mentoring program?',
        a: 'Undergraduate and postgraduate students in engineering (B.E., B.Tech, M.E., M.Tech, MCA, BCA) across CSE, IT, AI/DS, and ECE departments.'
      },
      {
        q: 'What domains can students build projects in?',
        a: 'Artificial Intelligence, Computer Vision, Python Web Systems, Contactless CCTV Biometrics, Natural Language Processing, Machine Learning, and IoT Edge Systems.'
      }
    ],
    related_services: ['final-year-projects', 'python-projects', 'ai-projects']
  }
];

export const getServiceBySlug = (slug) => {
  if (!slug) return null;
  const normalized = String(slug).trim().toLowerCase();
  return CORE_SERVICES.find(s => s.slug === normalized || (s.aliases && s.aliases.includes(normalized)));
};

export const getServiceVideoUrl = (identifier) => {
  if (!identifier) return '';
  let filename = '';
  if (typeof identifier === 'object') {
    filename = identifier.videoFileName || `${identifier.name}.mp4`;
  } else {
    const key = String(identifier).trim();
    const service = CORE_SERVICES.find(s => s.slug === key || s.name === key || (s.aliases && s.aliases.includes(key)));
    filename = service ? (service.videoFileName || `${service.name}.mp4`) : `${key}.mp4`;
  }
  return getAssetUrl(`/videos/${encodeURI(filename)}`);
};
