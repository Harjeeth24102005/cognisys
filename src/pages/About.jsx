import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, Globe, Code, GraduationCap, ShieldCheck, Cpu, 
  ArrowRight, CheckCircle2, Zap, Layers, Server, Terminal, Lock,
  Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Activity
} from 'lucide-react';
import { AboutStoryExperience } from '../components3d/AboutStoryExperience';
import { getAssetUrl } from '../utils/assets';
import { SEO } from '../components/SEO';

// Reusable Video Player Card for About Sections
const AboutSectionVideoCard = ({ videoFile, badge, stages = [], poster }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const videoUrl = getAssetUrl(`/videos/${encodeURI(videoFile)}`);

  const togglePlay = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const elem = containerRef.current;
    if (!elem) return;
    if (!document.fullscreenElement) {
      elem.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="about-section-video-card"
      style={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        background: '#0B132B',
        border: '1px solid #CBD5E1',
        boxShadow: '0 16px 40px -10px rgba(15, 23, 42, 0.16)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Video Viewport */}
      <div style={{ position: 'relative', height: '280px', overflow: 'hidden', background: '#07191E' }}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster={poster}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.5s ease',
            transform: isHovered ? 'scale(1.03)' : 'scale(1)'
          }}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>

        {/* Ambient Dark Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(11, 19, 43, 0.92) 0%, rgba(11, 19, 43, 0.2) 50%, rgba(11, 19, 43, 0.6) 100%)',
          pointerEvents: 'none'
        }} />

        {/* File Name Pill Badge (Top Left) */}
        <div style={{
          position: 'absolute',
          top: '14px',
          left: '14px',
          zIndex: 5
        }}>
          <div className="about-video-filename-tag">
            <span className="live-indicator-dot" />
            <span>FILE: {videoFile}</span>
          </div>
        </div>

        {/* Controls Overlay (Bottom of Video Viewport) */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '14px',
          right: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 5
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={togglePlay}
              className="service-dock-btn"
              style={{ width: '32px', height: '32px' }}
              title={isPlaying ? "Pause" : "Play"}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: '1px' }} />}
            </button>
            <button
              onClick={toggleMute}
              className={`service-dock-btn ${!isMuted ? 'active' : ''}`}
              style={{ width: '32px', height: '32px' }}
              title={isMuted ? "Unmute Audio" : "Mute Audio"}
              aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
          </div>

          <button
            onClick={toggleFullscreen}
            className="service-dock-btn"
            style={{ width: '32px', height: '32px' }}
            title="Fullscreen Video View"
            aria-label="Fullscreen Video View"
          >
            <Maximize2 size={14} />
          </button>
        </div>
      </div>

      {/* Card Content & Architecture Specs below the video */}
      <div style={{ padding: '24px', background: '#FFFFFF', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: '#0284C7', marginBottom: '14px', fontWeight: 700, letterSpacing: '0.04em' }}>
          [ {badge || 'SYSTEM ARCHITECTURE & CAPABILITIES'} ]
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {stages.map((stg, i) => (
            <div key={i} style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              {stg.num && <span style={{ fontFamily: 'var(--font-mono)', color: '#0284C7', fontWeight: 800, fontSize: '0.82rem', marginTop: '2px' }}>{stg.num}</span>}
              <div>
                <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0B132B' }}>{stg.title}</div>
                <div style={{ fontSize: '0.76rem', color: '#475569', marginTop: '2px', fontWeight: 500, lineHeight: 1.4 }}>{stg.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const About = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'About Cognisys', url: '/about' }
  ];

  return (
    <div style={{ paddingTop: '72px' }}>
      <SEO
        title="About Cognisys AI | Engineering Intelligence, Computer Vision & Innovation"
        description="Cognisys is an MSME-recognized engineering entity in India pioneering intelligent AI CCTV surveillance, edge computer vision, modern web applications, and capstone mentorship."
        keywords="About Cognisys, Cognisys AI, AI company India, computer vision company India, software development company in India, MSME tech entity India"
        canonical="https://cognisys.org.in/about"
        breadcrumbs={breadcrumbs}
      />

      {/* 1. INTRO HERO SECTION */}
      <section style={{ 
        padding: '50px 0 28px', 
        textAlign: 'center', 
        background: 'radial-gradient(circle at 50% 0%, rgba(0, 180, 216, 0.08) 0%, transparent 65%)' 
      }}>
        <div className="container-custom">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Link to="/" style={{ color: '#64748B', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>Home</Link>
            <span style={{ color: '#94A3B8', fontSize: '0.85rem' }}>/</span>
            <span style={{ color: '#0284C7', fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>About</span>
          </nav>

          <div className="badge badge-cyan" style={{ marginBottom: '14px' }}>
            <Sparkles size={13} color="#00B4D8" />
            <span>INTERACTIVE ECOSYSTEM</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: '#0B132B', marginBottom: '16px', fontWeight: 900, lineHeight: 1.15 }}>
            COGNISYS<br />
            <span className="text-gradient">INTELLIGENCE IN MOTION</span>
          </h1>

          <p style={{ fontSize: '1.1rem', color: '#1E293B', maxWidth: '720px', margin: '0 auto 24px', lineHeight: 1.7, fontWeight: 500 }}>
            "Scroll to explore what we build." Journey through our computer vision surveillance systems, modern web platforms, distributed cloud microservices, and student engineering innovation lab.
          </p>
        </div>
      </section>

      {/* 2. THE MASTER VIDEO STORYTELLING EXPERIENCE */}
      <AboutStoryExperience />

      {/* 3. DETAILED CONTENT BREAKDOWN SECTIONS WITH VIDEO CARDS */}
      
      {/* SECTION 1: AI CCTV MONITORING */}
      <section id="cctv-details" className="section-padding" style={{ borderBottom: '1px solid #E2E8F0', background: '#FFFFFF' }}>
        <div className="container-custom">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center'
          }}>
            <div>
              <div className="badge badge-cyan" style={{ marginBottom: '14px' }}>COMPUTER VISION &amp; SURVEILLANCE</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#0B132B', marginBottom: '18px', fontWeight: 900 }}>
                AI CCTV Monitoring &amp; Intelligent Surveillance
              </h2>
              <p style={{ fontSize: '1rem', color: '#1E293B', lineHeight: 1.7, marginBottom: '24px', fontWeight: 500 }}>
                We convert standard IP camera streams into autonomous intelligence engines. By leveraging optimized TensorRT models and multi-object tracking algorithms, Cognisys detects anomalies and generates actionable real-time alerts.
              </p>

              <h4 style={{ fontSize: '0.95rem', color: '#0284C7', fontFamily: 'var(--font-mono)', marginBottom: '14px', fontWeight: 700 }}>
                WHAT WE PROVIDE:
              </h4>

              <div className="about-checklist-grid" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '32px'
              }}>
                {[
                  "Real-time monitoring", "Person detection",
                  "Face recognition", "Multi-person tracking",
                  "Attendance monitoring", "Intelligent alerts",
                  "Surveillance analytics", "Custom AI integration"
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#0F172A', fontWeight: 600 }}>
                    <CheckCircle2 size={16} color="#00B4D8" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/services/ai-cctv-attendance" className="btn-primary" style={{ textDecoration: 'none' }}>
                <span>Request AI CCTV Solution</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Video Showcase Card */}
            <AboutSectionVideoCard
              videoFile="AI-Based CCTV Attendance Monitoring System.mp4"
              badge="SURVEILLANCE PIPELINE ARCHITECTURE"
              stages={[
                { num: "01.", title: "Multi-Stream RTSP Ingestion", desc: "GPU-accelerated hardware decoding across up to 32 concurrent channels." },
                { num: "02.", title: "YOLOv11 & DeepSORT Inference", desc: "Sub-50ms bounding box prediction and persistent trajectory association." },
                { num: "03.", title: "ArcFace Biometrics & Verification", desc: "Automated staff attendance logging and unauthorized intruder detection." },
                { num: "04.", title: "Real-time Telemetry & Alert Dispatch", desc: "Instant multi-channel push alerts, SMS notifications and live dashboard sync." }
              ]}
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: WEB DEVELOPMENT */}
      <section id="web-details" className="section-padding" style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container-custom">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center'
          }}>
            {/* Video Showcase Card on Left */}
            <AboutSectionVideoCard
              videoFile="Websites & Modern Web Development.mp4"
              badge="DIGITAL PRODUCT LIFECYCLE"
              stages={[
                { num: "01.", title: "Idea & UX Wireframing", desc: "Figma prototypes, interaction design & responsive user flows." },
                { num: "02.", title: "High-Performance Modern Frontend", desc: "React, modern component architecture, smooth micro-interactions." },
                { num: "03.", title: "Python REST API & Database", desc: "FastAPI, SQLAlchemy, PostgreSQL, and Redis caching layers." },
                { num: "04.", title: "Cloud Deployment & Production", desc: "Docker, automated testing pipelines, and SSL edge security." }
              ]}
            />

            <div>
              <div className="badge badge-purple" style={{ marginBottom: '14px' }}>WEB &amp; PLATFORM ENGINEERING</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#0B132B', marginBottom: '18px', fontWeight: 900 }}>
                Web &amp; Software Development
              </h2>
              <p style={{ fontSize: '1rem', color: '#1E293B', lineHeight: 1.7, marginBottom: '24px', fontWeight: 500 }}>
                "We build modern digital products designed around your requirements." From sleek responsive web platforms to mission-critical SaaS portals, we combine aesthetics with high computational performance.
              </p>

              <div className="about-checklist-grid" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '32px'
              }}>
                {[
                  "Business websites", "Web applications",
                  "E-commerce", "Admin dashboards",
                  "Database systems", "REST APIs",
                  "Custom software", "Automation systems"
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#0F172A', fontWeight: 600 }}>
                    <CheckCircle2 size={16} color="#7C3AED" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/services/websites" className="btn-primary" style={{ textDecoration: 'none' }}>
                <span>Start Your Website</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CUSTOM SOFTWARE SYSTEMS & CLOUD ARCHITECTURE */}
      <section id="software-details" className="section-padding" style={{ borderBottom: '1px solid #E2E8F0', background: '#FFFFFF' }}>
        <div className="container-custom">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center'
          }}>
            <div>
              <div className="badge badge-cyan" style={{ marginBottom: '14px' }}>ENTERPRISE &amp; CLOUD SYSTEMS</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#0B132B', marginBottom: '18px', fontWeight: 900 }}>
                Custom Software Systems &amp; Cloud Architecture
              </h2>
              <p style={{ fontSize: '1rem', color: '#1E293B', lineHeight: 1.7, marginBottom: '24px', fontWeight: 500 }}>
                Mission-critical enterprise software engineered for uptime, horizontal scalability, and distributed throughput. We build modular microservices, asynchronous message queues, and automated cloud deployments.
              </p>

              <h4 style={{ fontSize: '0.95rem', color: '#0284C7', fontFamily: 'var(--font-mono)', marginBottom: '14px', fontWeight: 700 }}>
                SYSTEM HIGHLIGHTS:
              </h4>

              <div className="about-checklist-grid" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '32px'
              }}>
                {[
                  "Microservices architecture", "Async background queues",
                  "FastAPI & Django APIs", "High-concurrency PostgreSQL",
                  "Docker orchestration", "Automated CI/CD pipelines",
                  "Real-time WebSocket sync", "24/7 Resilient monitoring"
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#0F172A', fontWeight: 600 }}>
                    <CheckCircle2 size={16} color="#00B4D8" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/services/python-projects" className="btn-primary" style={{ textDecoration: 'none' }}>
                <span>Explore Custom Software</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Video Showcase Card */}
            <AboutSectionVideoCard
              videoFile="CUSTOM SOFTWARE SYSTEMS & CLOUD ARCHITECTURE.mp4"
              badge="DISTRIBUTED MICROSERVICES ARCHITECTURE"
              stages={[
                { num: "01.", title: "Microservices & API Gateway", desc: "Decoupled high-availability services with zero-downtime routing." },
                { num: "02.", title: "Asynchronous Event Queues", desc: "Redis & Celery background tasks processing high-throughput events." },
                { num: "03.", title: "Containerized Orchestration", desc: "Docker Compose and automated scaling with live telemetry." },
                { num: "04.", title: "99.9% Production SLA", desc: "Continuous monitoring, automated backups & disaster recovery." }
              ]}
            />
          </div>
        </div>
      </section>

      {/* SECTION 4: STUDENT INNOVATION LAB */}
      <section id="student-details" className="section-padding" style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container-custom">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center'
          }}>
            {/* Video Showcase Card on Left */}
            <AboutSectionVideoCard
              videoFile="Final Year Projects.mp4"
              badge="6-STAGE STUDENT INCUBATION PIPELINE"
              stages={[
                { num: "01.", title: "IDEA SCOPING", desc: "Refine concept into an IEEE-standard problem statement." },
                { num: "02.", title: "PROJECT PLAN", desc: "Select optimal tech stack, datasets and system hardware." },
                { num: "03.", title: "DEVELOPMENT", desc: "Write clean, modular code with detailed documentation." },
                { num: "04.", title: "LIVE DEMO & VIVA", desc: "Conduct 1-on-1 walkthrough and technical viva preparation." }
              ]}
            />

            <div>
              <div className="badge badge-emerald" style={{ marginBottom: '14px' }}>ACADEMIC &amp; RESEARCH LAB</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#0B132B', marginBottom: '18px', fontWeight: 900 }}>
                Student Projects &amp; Capstones
              </h2>
              <p style={{ fontSize: '1rem', color: '#1E293B', lineHeight: 1.7, marginBottom: '24px', fontWeight: 500 }}>
                "Turn your idea into a working project." Cognisys empowers engineering and computer science students with full verified source code, IEEE-format reports, architecture diagrams, and comprehensive demonstration guidance.
              </p>

              <div className="about-checklist-grid" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '32px'
              }}>
                {[
                  "AI/ML projects", "Computer Vision",
                  "Data Science", "Web Development",
                  "Python projects", "IoT & Embedded",
                  "Database projects", "Final-year Capstones"
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#0F172A', fontWeight: 600 }}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/services/final-year-projects" className="btn-primary" style={{ textDecoration: 'none' }}>
                <span>Discuss Your Project</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: MSME REGISTRATION */}
      <section style={{ padding: '48px 0', background: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
        <div className="container-custom" style={{ maxWidth: '960px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #F8FAFC 0%, #F0F9FF 100%)',
            border: '1px solid #BAE6FD',
            borderRadius: '16px',
            padding: '36px',
            boxShadow: '0 8px 24px -6px rgba(0, 180, 216, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '14px',
              background: 'rgba(0, 180, 216, 0.12)',
              border: '1px solid rgba(0, 180, 216, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0284C7',
              flexShrink: 0
            }}>
              <ShieldCheck size={32} />
            </div>
            <div style={{ flex: 1, minWidth: '260px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(2, 132, 199, 0.1)', color: '#0284C7', fontSize: '0.72rem', fontWeight: 800, padding: '3px 10px', borderRadius: '20px', marginBottom: '8px', letterSpacing: '0.05em' }}>
                GOVERNMENT OF INDIA RECOGNIZED
              </div>
              <h3 style={{ fontSize: '1.3rem', color: '#0B132B', fontWeight: 800, marginBottom: '6px' }}>
                MSME Registered Technology Enterprise
              </h3>
              <p style={{ fontSize: '0.94rem', color: '#334155', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                Cognisys is an officially registered enterprise under the Ministry of Micro, Small and Medium Enterprises (MSME), Government of India. We adhere strictly to national engineering standards, corporate compliance, and verified technological practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: WHY COGNISYS SUMMARY & FINAL CTA */}
      <section className="section-padding" style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
        <div className="container-custom" style={{ textAlign: 'center' }}>
          <div className="badge badge-cyan" style={{ marginBottom: '14px' }}>THE COGNISYS PROMISE</div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#0B132B', marginBottom: '18px', fontWeight: 900 }}>
            WHY COGNISYS?
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#1E293B', maxWidth: '680px', margin: '0 auto 40px', lineHeight: 1.7, fontWeight: 500 }}>
            "From idea to implementation, Cognisys helps turn technology into real solutions."
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            maxWidth: '1000px',
            margin: '0 auto 48px'
          }}>
            {[
              { title: "AI-Driven", desc: "Neural intelligence in every build" },
              { title: "Innovative", desc: "Award-winning UI & UX design" },
              { title: "Custom Solutions", desc: "Tailored to your exact workflow" },
              { title: "Modern Tech", desc: "React, Python FastAPI, PyTorch" },
              { title: "Practical Engineering", desc: "Robust, tested, zero fluff" },
              { title: "End-to-End Support", desc: "Long term updates & mentoring" }
            ].map((item, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '20px', textAlign: 'center', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
                <h4 style={{ fontSize: '1.05rem', color: '#0284C7', marginBottom: '6px', fontWeight: 800 }}>{item.title}</h4>
                <p style={{ fontSize: '0.85rem', color: '#1E293B', fontWeight: 500 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <Link to="/order" className="btn-primary" style={{ padding: '14px 32px', fontSize: '1rem', textDecoration: 'none' }}>
            <span>Start Your Project With Cognisys</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};
