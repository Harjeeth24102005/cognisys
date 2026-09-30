import { Eye, Globe, Cpu, Terminal, GraduationCap, UserCheck } from 'lucide-react';
import imgAiCctv from '../assets/images/card-ai-cctv.jpg';
import imgWebDev from '../assets/images/card-web-dev.jpg';
import imgAiProjects from '../assets/images/card-ai-projects.jpg';
import imgPythonProjects from '../assets/images/card-python-projects.jpg';
import imgStudentProjects from '../assets/images/card-student-projects.jpg';
import imgFaceRecog from '../assets/images/card-face-recognition.jpg';
import { getAssetUrl } from '../utils/assets';

export const CORE_SERVICES = [
  {
    id: 1,
    slug: 'ai-cctv-attendance',
    name: 'AI-Based CCTV Attendance Monitoring System',
    videoFileName: 'AI-Based CCTV Attendance Monitoring System.mp4',
    category: 'Computer Vision & Attendance',
    short_desc: 'Transform existing or new CCTV infrastructure into an autonomous, contactless biometric attendance and surveillance network powered by edge AI.',
    full_desc: 'Cognisys AI-Based CCTV Attendance Monitoring System integrates state-of-the-art computer vision (YOLOv11 & FaceNet/ArcFace) with real-time video streaming. Features contactless multi-person facial recognition attendance marking, anti-spoofing verification, entry/exit timestamp logging, automated shift rosters, and instant management reporting.',
    image: imgAiCctv,
    icon: Eye,
    color: '#00B4D8',
    technologies: ['PyTorch', 'OpenCV', 'YOLOv11', 'FaceNet', 'FastAPI'],
    metrics: [
      { label: 'Verification Latency', value: '< 50ms' },
      { label: 'Biometric Precision', value: '99.8%' },
      { label: 'Stream Support', value: 'Any IP / RTSP' },
      { label: 'Roster Automation', value: 'Real-time' }
    ],
    features: [
      'Contactless multi-face recognition attendance marking with sub-50ms latency',
      'Automated shift, overtime, and roster logging with exportable PDF/Excel reports',
      'Real-time intrusion alerts & webhook/SMS notifications for unauthorized personnel',
      'Heatmaps, occupancy analytics, and multi-camera live dashboard monitoring',
      'Seamless plug-and-play integration with standard IP and RTSP CCTV cameras'
    ]
  },
  {
    id: 2,
    slug: 'websites',
    name: 'Websites & Modern Web Development',
    videoFileName: 'Websites & Modern Web Development.mp4',
    category: 'Web Applications & Platforms',
    short_desc: 'High-performance, beautifully responsive business websites, interactive client portals, and cloud-native modern web applications.',
    full_desc: 'Cognisys delivers ultra-fast, modern websites and web applications built with modern frontend frameworks (React, Vite, Next.js), secure REST APIs, and scalable backend infrastructure. Engineered for speed, responsive aesthetics, high conversion, and seamless user experiences across all devices.',
    image: imgWebDev,
    icon: Globe,
    color: '#0284C7',
    technologies: ['React', 'Vite', 'JavaScript', 'HTML5/CSS3', 'FastAPI'],
    metrics: [
      { label: 'Lighthouse Performance', value: '98/100' },
      { label: 'Responsive Design', value: '100% Mobile' },
      { label: 'Stack Architecture', value: 'Modern React' },
      { label: 'SEO & Speed', value: 'Core Web Vitals' }
    ],
    features: [
      'Custom responsive UI/UX web design optimized for conversions and aesthetics',
      'Enterprise admin portals and real-time operational client dashboards',
      'Secure RESTful API integration & cloud database architecture',
      'Full SEO optimization, accessibility (a11y), and fast Core Web Vitals',
      'Mobile-first responsive layouts across phones, tablets, and desktops'
    ]
  },
  {
    id: 3,
    slug: 'ai-projects',
    name: 'AI-Based Projects',
    videoFileName: 'AI-Based Projects.mp4',
    category: 'Artificial Intelligence & Machine Learning',
    short_desc: 'End-to-end artificial intelligence systems including deep learning, NLP, computer vision, LLM integrations, and neural predictive pipelines.',
    full_desc: 'Custom artificial intelligence and machine learning solutions engineered from architecture to deployment. We design and implement custom deep learning models, LLM-powered applications, document intelligence, automated classification, and neural predictive models.',
    image: imgAiProjects,
    icon: Cpu,
    color: '#7C3AED',
    technologies: ['Python', 'PyTorch', 'TensorFlow', 'HuggingFace', 'OpenCV'],
    metrics: [
      { label: 'Neural Models', value: 'YOLOv11 & LLMs' },
      { label: 'Inference Speed', value: 'Real-Time Edge' },
      { label: 'Frameworks', value: 'PyTorch / TF' },
      { label: 'Code & Weights', value: '100% Ownership' }
    ],
    features: [
      'Custom Deep Learning & Neural Network model development and training',
      'Natural Language Processing (NLP) & Generative AI/LLM agent workflows',
      'Computer Vision, object detection, semantic segmentation, and tracking',
      'Predictive analytics and automated decision intelligence algorithms',
      'Production-ready REST API deployment and cloud synchronization'
    ]
  },
  {
    id: 4,
    slug: 'python-projects',
    name: 'Python-Based Projects',
    videoFileName: 'Python-Based Projects.mp4',
    category: 'Python & Automation Engineering',
    short_desc: 'High-throughput Python applications, FastAPI/Django backend architectures, data scrapers, automation bots, and desktop software.',
    full_desc: 'Robust Python-powered solutions built for scalability, automation, and speed. From high-performance asynchronous microservices and data engineering pipelines to intelligent automation bots, desktop utilities, and custom scripts.',
    image: imgPythonProjects,
    icon: Terminal,
    color: '#0891B2',
    technologies: ['Python', 'FastAPI', 'Django', 'Flask', 'Pandas'],
    metrics: [
      { label: 'API Throughput', value: 'High RPS Async' },
      { label: 'Backend Stack', value: 'FastAPI / Django' },
      { label: 'Deployment', value: 'Docker Compose' },
      { label: 'Automation', value: '24/7 Resilient' }
    ],
    features: [
      'High-performance asynchronous backend APIs using FastAPI and Django',
      'Intelligent web scraping, data extraction & automated ETL pipelines',
      'Custom business automation scripts, desktop GUIs & bot workflows',
      'Data analysis, processing, and interactive dashboard tools',
      'Clean modular code architecture with full Docker containerization'
    ]
  },
  {
    id: 5,
    slug: 'final-year-projects',
    name: 'Final Year Projects',
    videoFileName: 'Final Year Projects.mp4',
    category: 'Academic Engineering & Research',
    short_desc: 'Complete engineering final-year capstones with working source code, IEEE base papers, complete documentation, and viva guidance.',
    full_desc: 'Comprehensive guidance and prototype development for engineering final-year students across CSE, IT, AI/DS, and ECE domains. Includes verified working source code, complete documentation, IEEE base paper implementations, architecture diagrams, and one-on-one viva preparation support.',
    image: imgStudentProjects,
    icon: GraduationCap,
    color: '#F59E0B',
    technologies: ['Python', 'React', 'PyTorch', 'FastAPI', 'OpenCV'],
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
    ]
  },
  {
    id: 6,
    slug: 'face-recognition',
    name: 'Face Recognition System',
    videoFileName: 'Face Recognition System.mp4',
    category: 'Computer Vision & Biometrics',
    short_desc: 'Enterprise-grade facial recognition engine for secure access control, biometric identity verification, and anti-spoofing surveillance.',
    full_desc: 'State-of-the-art multi-face recognition architecture engineered for lightning-fast identity verification. Includes 3D depth anti-spoofing against physical photos and screen replays, multi-angle pose tolerance, instant door-lock/turnstile relay triggers, and comprehensive audit logs.',
    image: imgFaceRecog,
    icon: UserCheck,
    color: '#10B981',
    technologies: ['Python', 'ArcFace', 'OpenCV', 'InsightFace', 'FastAPI'],
    metrics: [
      { label: 'Biometric Precision', value: '> 99.4%' },
      { label: 'Anti-Spoofing', value: '3D Depth Liveness' },
      { label: 'Matching Latency', value: '< 40ms Edge' },
      { label: 'Relay Triggers', value: 'Turnstiles & Doors' }
    ],
    features: [
      'High-accuracy facial recognition with >99.4% biometric verification precision',
      'Advanced anti-spoofing liveness detection rejecting printed photos and video replays',
      'Multi-angle facial recognition supporting dynamic head tilts and masks',
      'Sub-40ms edge verification with secure local embedding vector database',
      'Hardware relay triggers for automated smart turnstiles and electronic access doors'
    ]
  }
];

export const getServiceBySlug = (slug) => {
  return CORE_SERVICES.find(s => s.slug === slug);
};

export const getServiceVideoUrl = (identifier) => {
  if (!identifier) return '';
  let filename = '';
  if (typeof identifier === 'object') {
    filename = identifier.videoFileName || `${identifier.name}.mp4`;
  } else {
    const key = String(identifier).trim();
    const service = CORE_SERVICES.find(s => s.slug === key || s.name === key);
    filename = service ? (service.videoFileName || `${service.name}.mp4`) : `${key}.mp4`;
  }
  return getAssetUrl(`/videos/${encodeURI(filename)}`);
};
