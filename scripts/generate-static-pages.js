import fs from 'fs';
import path from 'path';

/**
 * Post-build static HTML generator for Cognisys AI (GitHub Pages & Search Engine Optimization).
 * Generates physical HTML files for every indexable route with pre-populated unique:
 * - <title>
 * - <meta name="description">
 * - <meta name="keywords">
 * - <link rel="canonical">
 * - OpenGraph & Twitter Card tags
 * - JSON-LD Schema.org scripts
 * - Semantic crawlable HTML fallbacks for search engine spiders (Googlebot, Bingbot)
 */

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const TEMPLATE_PATH = path.resolve(DIST_DIR, 'index.html');

if (!fs.existsSync(TEMPLATE_PATH)) {
  console.error('Error: dist/index.html not found. Run vite build before generating static pages.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(TEMPLATE_PATH, 'utf8');

const PAGES = [
  {
    path: '',
    title: 'Cognisys AI | AI, Software, CCTV Surveillance & Project Development',
    description: 'Cognisys AI engineers autonomous AI CCTV surveillance, face recognition attendance systems, modern web platforms, custom software, Python solutions, and university final year projects in India.',
    keywords: 'Cognisys, Cognisys AI, Cognisys projects, AI CCTV surveillance, AI CCTV monitoring, face recognition attendance system, computer vision company, web development company, Python projects, final year projects India',
    canonical: 'https://cognisys.org.in/',
    h1: 'Cognisys AI — AI Solutions, Software Development, CCTV Surveillance & Engineering Projects',
    lead: 'Enterprise AI CCTV surveillance, edge biometric computer vision, high-performance web systems, and engineering capstone mentorship.'
  },
  {
    path: 'about',
    title: 'About Cognisys AI | Engineering Intelligence, Computer Vision & Innovation',
    description: 'Cognisys is an MSME-recognized engineering entity in India pioneering intelligent AI CCTV surveillance, edge computer vision, modern web applications, and capstone mentorship.',
    keywords: 'About Cognisys, Cognisys AI, AI company India, computer vision company India, software development company in India, MSME tech entity India',
    canonical: 'https://cognisys.org.in/about',
    h1: 'About Cognisys AI — Intelligence in Motion',
    lead: 'Where advanced artificial intelligence meets practical engineering for enterprises, startups, and academic researchers.'
  },
  {
    path: 'services',
    title: 'Cognisys AI Service Catalog | AI, Computer Vision, Web & Software Solutions',
    description: 'Explore Cognisys engineering services: AI CCTV surveillance, face recognition attendance, modern web development, custom software, Python, and capstone project development in India.',
    keywords: 'Cognisys services, AI CCTV surveillance, face recognition system, computer vision solutions, modern web development, Python projects, final year projects, custom software development',
    canonical: 'https://cognisys.org.in/services',
    h1: 'Cognisys Engineering Solutions & Service Catalog',
    lead: 'Production-grade engineering solutions spanning edge computer vision, modern web applications, scalable enterprise systems, and academic capstones.'
  },
  {
    path: 'services/ai-cctv-surveillance',
    title: 'Cognisys AI CCTV Surveillance & Attendance Monitoring System',
    description: 'Transform standard IP and RTSP cameras into autonomous AI CCTV surveillance and contactless biometric attendance networks with sub-50ms facial recognition by Cognisys.',
    keywords: 'AI CCTV surveillance, AI CCTV monitoring, CCTV attendance monitoring, AI attendance monitoring system, AI attendance system, AI surveillance system, CCTV AI integration, AI video analytics, face recognition attendance',
    canonical: 'https://cognisys.org.in/services/ai-cctv-surveillance',
    h1: 'AI CCTV Surveillance & Attendance Monitoring System',
    lead: 'Autonomous contactless biometric attendance marking with real-time multi-person facial recognition and IP/RTSP camera integration.'
  },
  {
    path: 'services/ai-cctv-attendance',
    title: 'Cognisys AI CCTV Attendance Monitoring System | Facial Recognition Biometrics',
    description: 'Autonomous contactless AI CCTV attendance monitoring system with sub-50ms facial recognition precision, RTSP IP camera support, and shift roster automation by Cognisys.',
    keywords: 'AI CCTV attendance, CCTV attendance monitoring system, face recognition attendance, AI attendance system',
    canonical: 'https://cognisys.org.in/services/ai-cctv-surveillance',
    h1: 'AI CCTV Attendance Monitoring System',
    lead: 'Contactless multi-person facial recognition attendance marking with sub-50ms latency.'
  },
  {
    path: 'services/face-recognition',
    title: 'Cognisys Face Recognition Systems | AI Biometric Access Control',
    description: 'Enterprise-grade facial recognition engine with 3D depth anti-spoofing, sub-40ms edge verification, and automated door/turnstile relays engineered by Cognisys.',
    keywords: 'face recognition system, face recognition attendance, AI face recognition, computer vision face recognition, face recognition surveillance, contactless biometric attendance',
    canonical: 'https://cognisys.org.in/services/face-recognition',
    h1: 'Face Recognition Systems & Biometric Verification',
    lead: 'Enterprise biometric access control with 3D depth anti-spoofing verification and instant turnstile triggers.'
  },
  {
    path: 'services/ai-integration',
    title: 'Cognisys AI Integration & Enterprise AI Solutions Company',
    description: 'Integrate custom AI, deep learning models, LLMs, and real-time computer vision into your existing business software, ERPs, and CCTV systems with Cognisys.',
    keywords: 'AI integration, AI integration company, AI solutions, AI implementation, AI software integration, AI CCTV integration, custom AI projects',
    canonical: 'https://cognisys.org.in/services/ai-integration',
    h1: 'AI Integration & Enterprise AI Solutions',
    lead: 'Custom deep learning models, LLM agents, and computer vision pipelines seamlessly embedded into your existing software.'
  },
  {
    path: 'services/computer-vision',
    title: 'Cognisys Computer Vision Solutions & Edge Video Analytics',
    description: 'Production-ready computer vision solutions: real-time YOLOv11 object tracking, anomaly detection, automated visual inspection, and video analytics by Cognisys.',
    keywords: 'computer vision solutions, computer vision, computer vision company, computer vision projects, Python computer vision, AI image processing, AI video analytics',
    canonical: 'https://cognisys.org.in/services/computer-vision',
    h1: 'Computer Vision Solutions & Edge Video Analytics',
    lead: 'Production-ready computer vision pipelines: real-time YOLOv11 tracking, anomaly alerts, and automated inspection.'
  },
  {
    path: 'services/web-development',
    title: 'Cognisys Web Design & High-Performance Web Development Company',
    description: 'Modern web development company building ultra-fast React, Vite & Next.js web applications, responsive business websites, and enterprise client portals.',
    keywords: 'web development company, web designer, web design, website development, custom website development, business website development, modern web development',
    canonical: 'https://cognisys.org.in/services/web-development',
    h1: 'Web Design & Modern Web Development',
    lead: 'High-performance responsive business websites, interactive client portals, and cloud-native modern web applications.'
  },
  {
    path: 'services/websites',
    title: 'Cognisys Web Development | High-Performance Websites & Web Apps',
    description: 'Ultra-fast responsive business websites, modern web applications, and enterprise dashboards built with React and modern APIs by Cognisys.',
    keywords: 'websites, modern web development, business websites, React websites, web design',
    canonical: 'https://cognisys.org.in/services/web-development',
    h1: 'Websites & Modern Web Development',
    lead: 'High-speed React web applications optimized for conversion and Core Web Vitals.'
  },
  {
    path: 'services/custom-software',
    title: 'Cognisys Custom Software Development & Enterprise Cloud Systems',
    description: 'Scalable custom software development company in India specializing in asynchronous Python microservices, distributed cloud architectures, and secure business APIs.',
    keywords: 'custom software development, software development company, software development company in India, enterprise software development, cloud architecture solutions',
    canonical: 'https://cognisys.org.in/services/custom-software',
    h1: 'Custom Software Development & Cloud Systems',
    lead: 'Bespoke enterprise software, scalable microservices architectures, distributed databases, and automated business workflows.'
  },
  {
    path: 'services/python-projects',
    title: 'Cognisys Python Projects & Scalable Backend Engineering',
    description: 'High-throughput Python projects, asynchronous FastAPI and Django backend architectures, automated web scrapers, ETL pipelines, and AI engineering by Cognisys.',
    keywords: 'Python projects, Python based projects, Python AI projects, Python machine learning projects, Python computer vision projects, Python final year projects',
    canonical: 'https://cognisys.org.in/services/python-projects',
    h1: 'Python Projects & Scalable Backend Engineering',
    lead: 'High-throughput Python applications, FastAPI/Django backend architectures, data scrapers, automation bots, and desktop software.'
  },
  {
    path: 'services/ai-projects',
    title: 'Cognisys AI/ML Projects & Machine Learning Engineering',
    description: 'End-to-end artificial intelligence and machine learning projects: deep learning neural networks, NLP LLM pipelines, predictive models, and PyTorch deployments.',
    keywords: 'AI projects, machine learning projects, AI/ML projects, data science projects, custom AI projects, deep learning projects',
    canonical: 'https://cognisys.org.in/services/ai-projects',
    h1: 'AI/ML Projects & Data Science Solutions',
    lead: 'End-to-end artificial intelligence systems including deep learning, NLP, computer vision, LLM integrations, and neural predictive pipelines.'
  },
  {
    path: 'services/final-year-projects',
    title: 'Cognisys Final Year Project Development | Engineering Capstones',
    description: 'Legitimate final year engineering project development and mentorship across CSE, AI/DS, and ECE. 100% verified source code, IEEE base papers, and viva preparation.',
    keywords: 'final year projects, final year project development, final year project company, project dealer, project makers, final year project makers, engineering projects, college projects, student projects, final year project support',
    canonical: 'https://cognisys.org.in/services/final-year-projects',
    h1: 'Final Year Projects & Engineering Capstone Development',
    lead: 'Complete engineering final-year capstones with working source code, IEEE base papers, complete documentation, and viva guidance.'
  },
  {
    path: 'services/student-projects',
    title: 'Cognisys Student Project Development & College Capstone Mentorship',
    description: 'Hands-on student project development lab providing technical guidance, IEEE paper implementation, working hardware/software code, and viva coaching.',
    keywords: 'student projects, college projects, college project development, student project development, engineering projects, project support',
    canonical: 'https://cognisys.org.in/services/student-projects',
    h1: 'College & Student Project Development Lab',
    lead: 'Hands-on mentorship, code reviews, and prototype development for college engineering students, mini-projects, and research hackathons.'
  },
  {
    path: 'projects',
    title: 'Cognisys AI Engineering Projects | Case Studies & Capstone Innovations',
    description: 'Explore verified engineering projects developed by Cognisys: AI CCTV surveillance analytics, cloud telemetry dashboards, enterprise microservices, and student capstones in India.',
    keywords: 'Cognisys projects, engineering projects, AI projects, computer vision projects, Python projects, web development projects, final year projects, college projects, project development company India',
    canonical: 'https://cognisys.org.in/projects',
    h1: 'Cognisys Engineering Projects & Production Case Studies',
    lead: 'Verified case studies, production software deployments, and academic capstone engineering developed with modern artificial intelligence.'
  },
  {
    path: 'contact',
    title: 'Contact Cognisys AI | Engineering Inquiries & Quotation Desk',
    description: 'Contact Cognisys Technologies for AI CCTV surveillance systems, face recognition solutions, modern web platforms, custom software, and engineering capstone development in India.',
    keywords: 'Contact Cognisys, Cognisys helpline, Cognisys email, project development company India contact, AI company Chennai India',
    canonical: 'https://cognisys.org.in/contact',
    h1: 'Connect with Cognisys AI Engineering',
    lead: 'Direct channels for enterprise consultations, technical demonstrations, custom quotations, and student mentorship.'
  },
  {
    path: 'faq',
    title: 'Frequently Asked Questions | Cognisys AI Knowledge Base',
    description: 'Find answers to frequently asked questions about Cognisys AI CCTV surveillance, face recognition systems, custom software, quotation process, and IEEE capstones.',
    keywords: 'Cognisys FAQ, AI CCTV questions, face recognition attendance FAQ, project development FAQ, student projects FAQ',
    canonical: 'https://cognisys.org.in/faq',
    h1: 'Frequently Asked Questions & Knowledge Base',
    lead: 'Everything you need to know about Cognisys engineering services, web platforms, quotations, and student mentorship.'
  },
  {
    path: 'order',
    title: 'Customise Your Order | Interactive Project Configurator | Cognisys AI',
    description: 'Configure and submit your project requirements for AI CCTV surveillance, web development, custom software, Python systems, or university engineering capstones.',
    keywords: 'order Cognisys project, project configurator, AI project quotation, software development quotation',
    canonical: 'https://cognisys.org.in/order',
    h1: 'Customise Your Project Order',
    lead: 'Configure system requirements, estimated timelines, and technology preferences for rapid technical quotation.'
  },
  {
    path: 'privacy-policy',
    title: 'Privacy Policy | Cognisys AI',
    description: 'Privacy policy and data governance practices of Cognisys Technologies.',
    keywords: 'Cognisys privacy policy, data privacy, terms',
    canonical: 'https://cognisys.org.in/privacy-policy',
    h1: 'Privacy Policy',
    lead: 'Data governance, protection protocols, and biometric privacy standards.'
  },
  {
    path: 'terms',
    title: 'Terms of Service | Cognisys AI',
    description: 'Terms of service and engineering engagement agreements with Cognisys Technologies.',
    keywords: 'Cognisys terms of service, engagement agreements',
    canonical: 'https://cognisys.org.in/terms',
    h1: 'Terms of Service',
    lead: 'Standard terms governing engineering services, source code ownership, and platform usage.'
  },
  {
    path: 'refund-policy',
    title: 'Refund Policy | Cognisys AI',
    description: 'Milestone delivery and refund policy of Cognisys Technologies.',
    keywords: 'Cognisys refund policy, milestone guarantee',
    canonical: 'https://cognisys.org.in/refund-policy',
    h1: 'Refund Policy',
    lead: 'Transparent milestone delivery standards and refund terms.'
  }
];

console.log(`Generating ${PAGES.length} static SEO HTML pages in ${DIST_DIR}...`);

let generatedCount = 0;

for (const page of PAGES) {
  let pageHtml = templateHtml;

  // Replace Title
  pageHtml = pageHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${page.title}</title>`);
  pageHtml = pageHtml.replace(/<meta name="title" content="[\s\S]*?" \/>/i, `<meta name="title" content="${page.title}" />`);

  // Replace Description
  pageHtml = pageHtml.replace(/<meta name="description" content="[\s\S]*?" \/>/i, `<meta name="description" content="${page.description}" />`);

  // Replace Keywords
  pageHtml = pageHtml.replace(/<meta name="keywords" content="[\s\S]*?" \/>/i, `<meta name="keywords" content="${page.keywords}" />`);

  // Replace Canonical Link
  pageHtml = pageHtml.replace(/<link rel="canonical" href="[\s\S]*?" \/>/i, `<link rel="canonical" href="${page.canonical}" />`);

  // Replace OpenGraph Title & Description & URL
  pageHtml = pageHtml.replace(/<meta property="og:title" content="[\s\S]*?" \/>/i, `<meta property="og:title" content="${page.title}" />`);
  pageHtml = pageHtml.replace(/<meta property="og:description" content="[\s\S]*?" \/>/i, `<meta property="og:description" content="${page.description}" />`);
  pageHtml = pageHtml.replace(/<meta property="og:url" content="[\s\S]*?" \/>/i, `<meta property="og:url" content="${page.canonical}" />`);

  // Replace Twitter Title & Description & URL
  pageHtml = pageHtml.replace(/<meta name="twitter:title" content="[\s\S]*?" \/>/i, `<meta name="twitter:title" content="${page.title}" />`);
  pageHtml = pageHtml.replace(/<meta name="twitter:description" content="[\s\S]*?" \/>/i, `<meta name="twitter:description" content="${page.description}" />`);
  pageHtml = pageHtml.replace(/<meta name="twitter:url" content="[\s\S]*?" \/>/i, `<meta name="twitter:url" content="${page.canonical}" />`);

  // Replace Noscript Fallback with Page-Specific Semantic Content
  const noscriptContent = `
    <noscript>
      <header>
        <h1>${page.h1}</h1>
        <p>${page.lead}</p>
        <nav>
          <a href="/">Home</a> |
          <a href="/about">About</a> |
          <a href="/services">Services</a> |
          <a href="/services/ai-cctv-surveillance">AI CCTV Surveillance</a> |
          <a href="/services/face-recognition">Face Recognition</a> |
          <a href="/services/ai-integration">AI Integration</a> |
          <a href="/services/computer-vision">Computer Vision</a> |
          <a href="/services/web-development">Web Development</a> |
          <a href="/services/python-projects">Python Projects</a> |
          <a href="/services/final-year-projects">Final Year Projects</a> |
          <a href="/projects">Projects</a> |
          <a href="/contact">Contact</a>
        </nav>
      </header>
      <main>
        <section>
          <h2>Overview &amp; Technical Capabilities</h2>
          <p>${page.description}</p>
        </section>
      </main>
      <footer>
        <p>Cognisys Technologies &bull; contact.cognisys@gmail.com &bull; +91 82483 49844 &bull; India</p>
      </footer>
    </noscript>
  `;

  pageHtml = pageHtml.replace(/<noscript>[\s\S]*?<\/noscript>/i, noscriptContent);

  if (page.path === '') {
    // Overwrite root dist/index.html with optimized homepage
    fs.writeFileSync(path.resolve(DIST_DIR, 'index.html'), pageHtml, 'utf8');
    generatedCount++;
  } else {
    // 1. Create nested route folder e.g. dist/services/ai-cctv-surveillance/index.html
    const targetDir = path.resolve(DIST_DIR, page.path);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.writeFileSync(path.resolve(targetDir, 'index.html'), pageHtml, 'utf8');

    // 2. Also write flat html file e.g. dist/services/ai-cctv-surveillance.html for static servers without directory indexing
    const parentDir = path.dirname(targetDir);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    fs.writeFileSync(path.resolve(DIST_DIR, `${page.path}.html`), pageHtml, 'utf8');

    generatedCount++;
  }
}

console.log(`Successfully generated ${generatedCount} static HTML pages for SEO.`);
