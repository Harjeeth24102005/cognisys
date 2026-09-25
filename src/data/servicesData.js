import { Eye, Globe, Cpu, Terminal, GraduationCap, UserCheck } from 'lucide-react';

export const CORE_SERVICES = [
  {
    id: 1,
    slug: 'ai-cctv-attendance',
    name: 'AI-Based CCTV Attendance Monitoring System',
    category: 'Computer Vision & Attendance',
    short_desc: 'Transform existing or new CCTV infrastructure into an autonomous, contactless biometric attendance and surveillance network powered by edge AI.',
    full_desc: 'Cognisys AI-Based CCTV Attendance Monitoring System integrates state-of-the-art computer vision (YOLOv11 & FaceNet/ArcFace) with real-time video streaming. Features contactless multi-person facial recognition attendance marking, anti-spoofing verification, entry/exit timestamp logging, automated shift rosters, and instant management reporting.',
    image: '/images/card-ai-cctv.jpg',
    icon: Eye,
    color: '#00B4D8',
    technologies: ['PyTorch', 'OpenCV', 'YOLOv11', 'FaceNet', 'FastAPI'],
    features: [
      'Contactless multi-face recognition attendance marking with sub-50ms latency',
      'Automated shift, overtime, and roster logging with exportable PDF/Excel reports',
      'Real-time intrusion alerts & webhook/SMS notifications for unauthorized personnel',
      'Heatmaps, occupancy analytics, and multi-camera live dashboard monitoring',
      'Seamless plug-and-play integration with standard IP and RTSP CCTV cameras'
    ],
    base_price: 25000.0
  },
  {
    id: 2,
    slug: 'websites',
    name: 'Websites & Modern Web Development',
    category: 'Web Applications & Platforms',
    short_desc: 'High-performance, beautifully responsive business websites, interactive client portals, and cloud-native modern web applications.',
    full_desc: 'Cognisys delivers ultra-fast, modern websites and web applications built with modern frontend frameworks (React, Vite, Next.js), secure REST APIs, and scalable backend infrastructure. Engineered for speed, responsive aesthetics, high conversion, and seamless user experiences across all devices.',
    image: '/images/card-web-dev.jpg',
    icon: Globe,
    color: '#0284C7',
    technologies: ['React', 'Vite', 'JavaScript', 'HTML5/CSS3', 'FastAPI'],
    features: [
      'Custom responsive UI/UX web design optimized for conversions and aesthetics',
      'Enterprise admin portals and real-time operational client dashboards',
      'Secure RESTful API integration & cloud database architecture',
      'Full SEO optimization, accessibility (a11y), and fast Core Web Vitals',
      'Mobile-first responsive layouts across phones, tablets, and desktops'
    ],
    base_price: 15000.0
  },
  {
    id: 3,
    slug: 'ai-projects',
    name: 'AI-Based Projects',
    category: 'Artificial Intelligence & Machine Learning',
    short_desc: 'End-to-end artificial intelligence systems including deep learning, NLP, computer vision, LLM integrations, and neural predictive pipelines.',
    full_desc: 'Custom artificial intelligence and machine learning solutions engineered from architecture to deployment. We design and implement custom deep learning models, LLM-powered applications, document intelligence, automated classification, and neural predictive models.',
    image: '/images/card-ai-projects.jpg',
    icon: Cpu,
    color: '#7C3AED',
    technologies: ['Python', 'PyTorch', 'TensorFlow', 'HuggingFace', 'OpenCV'],
    features: [
      'Custom Deep Learning & Neural Network model development and training',
      'Natural Language Processing (NLP) & Generative AI/LLM agent workflows',
      'Computer Vision, object detection, semantic segmentation, and tracking',
      'Predictive analytics and automated decision intelligence algorithms',
      'Production-ready REST API deployment and cloud synchronization'
    ],
    base_price: 28000.0
  },
  {
    id: 4,
    slug: 'python-projects',
    name: 'Python-Based Projects',
    category: 'Python & Automation Engineering',
    short_desc: 'High-throughput Python applications, FastAPI/Django backend architectures, data scrapers, automation bots, and desktop software.',
    full_desc: 'Robust Python-powered solutions built for scalability, automation, and speed. From high-performance asynchronous microservices and data engineering pipelines to intelligent automation bots, desktop utilities, and custom scripts.',
    image: '/images/card-python-projects.jpg',
    icon: Terminal,
    color: '#0891B2',
    technologies: ['Python', 'FastAPI', 'Django', 'Flask', 'Pandas'],
    features: [
      'High-performance asynchronous backend APIs using FastAPI and Django',
      'Intelligent web scraping, data extraction & automated ETL pipelines',
      'Custom business automation scripts, desktop GUIs & bot workflows',
      'Data analysis, processing, and interactive dashboard tools',
      'Clean modular code architecture with full Docker containerization'
    ],
    base_price: 20000.0
  },
  {
    id: 5,
    slug: 'final-year-projects',
    name: 'Final Year Projects',
    category: 'Academic Engineering & Research',
    short_desc: 'Complete engineering final-year capstones with working source code, IEEE base papers, complete documentation, and viva guidance.',
    full_desc: 'Comprehensive guidance and prototype development for engineering final-year students across CSE, IT, AI/DS, and ECE domains. Includes verified working source code, complete documentation, IEEE base paper implementations, architecture diagrams, and one-on-one viva preparation support.',
    image: '/images/card-student-projects.jpg',
    icon: GraduationCap,
    color: '#F59E0B',
    technologies: ['Python', 'React', 'PyTorch', 'FastAPI', 'OpenCV'],
    features: [
      '100% verified, fully working source code with step-by-step setup guide',
      'IEEE base paper implementation with clear novelty justification',
      'Comprehensive documentation, synopsis, and IEEE-standard project report',
      'System architecture diagrams, dataflow charts, and database schemas',
      'One-on-one project demo walkthrough and technical viva preparation'
    ],
    base_price: 8000.0
  },
  {
    id: 6,
    slug: 'face-recognition',
    name: 'Face Recognition System',
    category: 'Computer Vision & Biometrics',
    short_desc: 'Enterprise-grade facial recognition engine for secure access control, biometric identity verification, and anti-spoofing surveillance.',
    full_desc: 'State-of-the-art multi-face recognition architecture engineered for lightning-fast identity verification. Includes 3D depth anti-spoofing against physical photos and screen replays, multi-angle pose tolerance, instant door-lock/turnstile relay triggers, and comprehensive audit logs.',
    image: '/images/card-face-recognition.jpg',
    icon: UserCheck,
    color: '#10B981',
    technologies: ['Python', 'ArcFace', 'OpenCV', 'InsightFace', 'FastAPI'],
    features: [
      'High-accuracy facial recognition with >99.4% biometric verification precision',
      'Advanced anti-spoofing liveness detection rejecting printed photos and video replays',
      'Multi-angle facial recognition supporting dynamic head tilts and masks',
      'Sub-40ms edge verification with secure local embedding vector database',
      'Hardware relay triggers for automated smart turnstiles and electronic access doors'
    ],
    base_price: 22000.0
  }
];

export const getServiceBySlug = (slug) => {
  return CORE_SERVICES.find(s => s.slug === slug);
};
