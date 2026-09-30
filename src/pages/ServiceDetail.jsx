import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, ArrowRight, ChevronDown, ChevronUp, Cpu, 
  ShieldCheck, Layers, Terminal, Sparkles, HelpCircle, 
  Play, Pause, Volume2, VolumeX, Maximize2, Eye, EyeOff, Activity, Clock
} from 'lucide-react';
import { api } from '../services/api';
import { getServiceVideoUrl } from '../data/servicesData';

export const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  // Video Background Control States
  const videoRef = useRef(null);
  const heroSectionRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.getServiceBySlug(slug || 'ai-cctv-attendance')
      .then(data => {
        setService(data);
        setIsCinemaMode(false);
        setIsPlaying(true);
        setIsMuted(true);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  // Ensure autoplay on mount or service change
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = isMuted;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [service, isMuted]);

  const togglePlay = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const elem = heroSectionRef.current;
    if (!elem) return;
    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(() => {});
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  const toggleCinemaMode = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setIsCinemaMode(prev => !prev);
  };

  if (loading) {
    return (
      <div style={{ paddingTop: '160px', textAlign: 'center', minHeight: '65vh' }}>
        <div className="badge badge-cyan" style={{ fontSize: '0.9rem', padding: '10px 24px' }}>
          <Activity size={16} className="spin-slow" />
          <span>INITIALIZING SERVICE PROFILE &amp; VIDEO ENGINE...</span>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div style={{ paddingTop: '140px', textAlign: 'center', minHeight: '60vh' }}>
        <h2 style={{ color: '#0B132B', fontSize: '1.8rem', fontWeight: 800 }}>Service Not Found</h2>
        <p style={{ color: '#64748B', marginTop: '10px', marginBottom: '24px' }}>
          The requested engineering solution could not be located.
        </p>
        <Link to="/services" className="btn-primary">Browse All Services</Link>
      </div>
    );
  }

  let features = Array.isArray(service.features) ? service.features : [];
  let techs = Array.isArray(service.technologies) ? service.technologies : [];
  let metrics = Array.isArray(service.metrics) ? service.metrics : [
    { label: 'Latency', value: '< 50ms' },
    { label: 'Precision', value: '99.8%' },
    { label: 'Architecture', value: 'Edge AI' },
    { label: 'Ownership', value: '100% Code' }
  ];

  try {
    if (service.features_json && features.length === 0) features = JSON.parse(service.features_json);
    if (service.technologies_json && techs.length === 0) techs = JSON.parse(service.technologies_json);
  } catch (e) {}

  const videoUrl = getServiceVideoUrl(service);

  // Service specific custom FAQs
  const faqs = [
    {
      q: `What is the typical deployment timeline for ${service.name}?`,
      a: "Depending on system scope and customization requirements, standard functional prototypes take 1 to 2 weeks, while full enterprise production deployments take 2 to 4 weeks with weekly sprint demonstrations."
    },
    {
      q: "Do you provide full source code ownership and technical documentation?",
      a: "Yes. Every client receives 100% unencumbered source code ownership, complete API specifications, Docker container configurations, and full architecture handover documentation."
    },
    {
      q: "Can this system integrate directly with our existing infrastructure?",
      a: "Absolutely. We build modular, cloud-native RESTful APIs and containerized microservices engineered to connect seamlessly with your existing IP camera networks, legacy databases, ERP systems, and cloud providers."
    },
    {
      q: "How does the quotation and engineering onboarding process work?",
      a: "Submit your requirements via our interactive Project Order form. Our engineering team reviews the scope within 24 hours, generates an official itemized quotation directly on your dashboard, and begins development upon authorization."
    }
  ];

  const processSteps = [
    { num: "01", title: "Discovery & System Architecture", desc: "Detailed requirements analysis, technical specification, and compute/camera infrastructure planning." },
    { num: "02", title: "Milestone Engineering & Sprints", desc: "Iterative development with bi-weekly demonstrations and real-time dashboard progress tracking." },
    { num: "03", title: "Benchmarking & Latency QA", desc: "Edge hardware optimization, biometric accuracy testing, security audit, and integration verification." },
    { num: "04", title: "Production Deployment & Handover", desc: "Zero-downtime production rollout, container orchestration, documentation handover, and ongoing support." }
  ];

  return (
    <div style={{ paddingTop: '72px' }}>
      {/* 1. CINEMATIC VIDEO BACKGROUND HERO LANDING SECTION */}
      <section 
        ref={heroSectionRef} 
        className="service-hero-video-section"
        style={{
          borderBottom: '1px solid #1E293B'
        }}
      >
        {/* Background Video Layer */}
        <div className="service-hero-video-bg">
          {!videoError && videoUrl ? (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              poster={service.image}
              key={videoUrl}
              className="service-hero-video-element"
              onError={() => setVideoError(true)}
              onLoadedData={() => setVideoLoaded(true)}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          ) : (
            <div 
              style={{ 
                position: 'absolute', 
                inset: 0, 
                backgroundImage: `url(${service.image})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center' 
              }} 
            />
          )}

          {/* Cinematic Dark Vignette & Readability Gradient */}
          <div className={`service-hero-overlay-dark ${isCinemaMode ? 'cinema-mode' : ''}`} />

          {/* Accent Color Radial Glow */}
          <div 
            className="service-hero-overlay-radial"
            style={{ '--service-glow': service.color ? `${service.color}40` : 'rgba(0, 180, 216, 0.3)' }}
          />

          {/* High-Tech Scanline Texture */}
          <div className="service-hero-overlay-scanline" />

          {/* Subtle Bottom Fade Transition */}
          <div className="service-hero-overlay-bottom" />
        </div>

        {/* Hero Foreground Content */}
        <div className="container-custom" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <div className={`service-hero-content ${isCinemaMode ? 'cinema-hidden' : ''}`}>
            {/* Top Breadcrumb Navigation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <Link 
                to="/services" 
                style={{ 
                  color: '#94A3B8', 
                  textDecoration: 'none', 
                  fontSize: '0.85rem', 
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>Services</span>
              </Link>
              <span style={{ color: '#64748B', fontSize: '0.85rem' }}>/</span>
              <span style={{ color: '#00B4D8', fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                {service.slug}
              </span>
            </div>

            {/* Badges Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
              <div 
                className="badge" 
                style={{ 
                  background: 'rgba(0, 180, 216, 0.15)', 
                  border: '1px solid rgba(0, 180, 216, 0.4)', 
                  color: '#00B4D8', 
                  fontWeight: 800,
                  padding: '5px 14px' 
                }}
              >
                {service.category}
              </div>

              <div 
                style={{
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  borderRadius: '9999px',
                  padding: '4px 12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.74rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  color: '#A7F3D0'
                }}
              >
                <span className="live-indicator-dot" />
                <span>OFFICIAL SYSTEM VIDEO BACKGROUND</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 
              style={{ 
                fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', 
                color: '#FFFFFF', 
                marginBottom: '18px', 
                lineHeight: 1.15, 
                fontWeight: 900,
                textShadow: '0 4px 24px rgba(0,0,0,0.6)',
                maxWidth: '900px'
              }}
            >
              {service.name}
            </h1>

            {/* Short Description */}
            <p 
              style={{ 
                fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', 
                color: '#E2E8F0', 
                lineHeight: 1.7, 
                marginBottom: '32px', 
                fontWeight: 500,
                maxWidth: '780px',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}
            >
              {service.short_desc}
            </p>

            {/* Action Buttons Row */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link 
                to={`/order?service=${service.slug}`} 
                className="btn-primary" 
                style={{ 
                  padding: '14px 30px', 
                  fontSize: '0.96rem', 
                  textDecoration: 'none',
                  boxShadow: '0 8px 30px rgba(0, 180, 216, 0.4)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Sparkles size={18} />
                <span>Customise Your Order</span>
                <ArrowRight size={18} />
              </Link>

              <Link 
                to="/contact" 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '14px 26px',
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)';
                  e.currentTarget.style.borderColor = '#00B4D8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                }}
              >
                <span>Consult Engineering</span>
              </Link>

              <a
                href="#system-overview"
                style={{
                  color: '#94A3B8',
                  fontSize: '0.88rem',
                  textDecoration: 'none',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 12px'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#00B4D8')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                <span>Explore Technical Specs</span>
                <ChevronDown size={16} />
              </a>
            </div>

            {/* Live Metrics Floating Bar */}
            <div className="service-hero-metrics-grid">
              {metrics.map((item, index) => (
                <div key={index} className="service-hero-metric-card">
                  <div style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '1.45rem', 
                    fontWeight: 800, 
                    color: index === 0 ? '#00B4D8' : index === 1 ? '#10B981' : '#F1F5F9',
                    marginBottom: '4px',
                    letterSpacing: '-0.02em'
                  }}>
                    {item.value}
                  </div>
                  <div style={{ 
                    fontSize: '0.8rem', 
                    color: '#94A3B8', 
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Video Control Capsule (Bottom Right) */}
        <div className="service-hero-controls-dock">
          {/* Status Label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginRight: '6px' }}>
            <span className="live-indicator-dot" />
            <span style={{ 
              fontSize: '0.72rem', 
              fontFamily: 'var(--font-mono)', 
              color: '#F1F5F9', 
              fontWeight: 700,
              whiteSpace: 'nowrap'
            }}>
              {isCinemaMode ? 'CINEMA VIEW' : 'BG VIDEO'}
            </span>
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="service-dock-btn"
            title={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
            aria-label={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} style={{ marginLeft: '2px' }} />}
          </button>

          {/* Audio Mute/Unmute Button */}
          <button
            onClick={toggleMute}
            className={`service-dock-btn ${!isMuted ? 'active' : ''}`}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          {/* Cinema Mode Toggle (Hide text to enjoy the video) */}
          <button
            onClick={toggleCinemaMode}
            className={`service-dock-btn ${isCinemaMode ? 'active' : ''}`}
            title={isCinemaMode ? 'Show Content Overlay' : 'Focus Video (Hide Overlays)'}
            aria-label={isCinemaMode ? 'Show Content Overlay' : 'Focus Video (Hide Overlays)'}
          >
            {isCinemaMode ? <Eye size={15} /> : <EyeOff size={15} />}
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="service-dock-btn"
            title="Fullscreen Video View"
            aria-label="Fullscreen Video View"
          >
            <Maximize2 size={15} />
          </button>
        </div>
      </section>

      {/* 2. DETAILED OVERVIEW & FEATURES */}
      <section id="system-overview" className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="container-custom">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'start'
          }}>
            {/* Overview Left Column */}
            <div>
              <div className="badge badge-purple" style={{ marginBottom: '12px' }}>SYSTEM ARCHITECTURE</div>
              <h2 style={{ fontSize: '2rem', color: '#0B132B', marginBottom: '16px', fontWeight: 800 }}>
                Comprehensive Technical Scope
              </h2>
              <p style={{ fontSize: '1.02rem', color: '#1E293B', lineHeight: 1.8, marginBottom: '28px', fontWeight: 500 }}>
                {service.full_desc}
              </p>

              {/* Technologies */}
              <h4 style={{ fontSize: '0.88rem', color: '#0284C7', fontFamily: 'var(--font-mono)', marginBottom: '14px', fontWeight: 700, letterSpacing: '0.04em' }}>
                TECHNOLOGY STACK &amp; FRAMEWORKS:
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
                {techs.map((t, i) => (
                  <span key={i} className="badge badge-cyan" style={{ fontSize: '0.82rem', padding: '7px 16px', fontWeight: 700 }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Quick Summary Box */}
              <div style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <ShieldCheck size={20} color="#00B4D8" />
                  <span style={{ fontWeight: 800, color: '#0B132B', fontSize: '0.95rem' }}>
                    Production-Ready Engineering Guarantee
                  </span>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                  Includes verified source code, end-to-end setup script, high-availability configurations, API documentation, and milestone demonstration calls.
                </p>
              </div>
            </div>

            {/* Features Checklist Right Column */}
            <div className="glass-panel" style={{ padding: '36px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '20px', boxShadow: '0 12px 36px rgba(15, 23, 42, 0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
                <h3 style={{ fontSize: '1.35rem', color: '#0B132B', fontWeight: 800, margin: 0 }}>
                  Core Features &amp; Capabilities
                </h3>
                <span className="badge badge-cyan" style={{ fontSize: '0.72rem', padding: '4px 10px' }}>
                  VERIFIED
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {features.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: 'rgba(0, 180, 216, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#00B4D8',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      <CheckCircle2 size={16} />
                    </div>
                    <span style={{ fontSize: '0.94rem', color: '#0F172A', lineHeight: 1.6, fontWeight: 500 }}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.76rem', color: '#64748B', display: 'block', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                    DEPLOYMENT MODEL
                  </span>
                  <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0B132B' }}>
                    Custom Engineered Architecture
                  </span>
                </div>
                <Link to={`/order?service=${service.slug}`} className="btn-primary" style={{ padding: '10px 22px', fontSize: '0.88rem', textDecoration: 'none' }}>
                  <span>Customise Your Order</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ENGINEERING PROCESS METHODOLOGY */}
      <section className="section-padding" style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
            <div className="badge badge-cyan" style={{ marginBottom: '12px' }}>DELIVERY ROADMAP</div>
            <h2 style={{ fontSize: '2.2rem', color: '#0B132B', marginBottom: '12px', fontWeight: 800 }}>
              How We Deliver Your System
            </h2>
            <p style={{ color: '#1E293B', fontSize: '0.98rem', fontWeight: 500 }}>
              A disciplined, high-transparency engineering pipeline ensuring zero bottlenecks and reliable deployment.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {processSteps.map((step, index) => (
              <div key={index} className="glass-panel" style={{ padding: '28px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: '#00B4D8',
                  marginBottom: '12px'
                }}>
                  {step.num}
                </div>
                <h4 style={{ fontSize: '1.1rem', color: '#0B132B', marginBottom: '8px', fontWeight: 700 }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FAQ ACCORDION */}
      <section className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="container-custom" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="badge badge-purple" style={{ marginBottom: '12px' }}>FREQUENTLY ASKED QUESTIONS</div>
            <h2 style={{ fontSize: '2rem', color: '#0B132B', fontWeight: 800 }}>Service Inquiries</h2>
            <p style={{ color: '#64748B', fontSize: '0.92rem', marginTop: '8px' }}>
              Common technical and delivery questions regarding {service.name}.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="glass-panel"
                  style={{
                    padding: '20px 24px',
                    cursor: 'pointer',
                    borderColor: isOpen ? '#00B4D8' : '#E2E8F0',
                    background: '#FFFFFF',
                    borderRadius: '14px',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 700, color: isOpen ? '#0284C7' : '#0F172A' }}>
                      {faq.q}
                    </span>
                    {isOpen ? <ChevronUp size={18} color="#0284C7" /> : <ChevronDown size={18} color="#0F172A" />}
                  </div>
                  {isOpen && (
                    <p style={{ marginTop: '14px', fontSize: '0.92rem', color: '#334155', lineHeight: 1.7, borderTop: '1px solid #E2E8F0', paddingTop: '14px' }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA BANNER */}
      <section style={{ padding: '0 0 80px', background: '#FFFFFF' }}>
        <div className="container-custom">
          <div 
            className="glass-panel-glow" 
            style={{ 
              padding: '52px 36px', 
              textAlign: 'center', 
              background: 'linear-gradient(135deg, #0B132B 0%, #0F172A 100%)', 
              border: '1px solid rgba(0, 180, 216, 0.3)',
              borderRadius: '24px',
              color: '#FFFFFF'
            }}
          >
            <div className="badge badge-cyan" style={{ marginBottom: '14px' }}>PROJECT INITIATION</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: '#FFFFFF', marginBottom: '14px', fontWeight: 800 }}>
              Ready to deploy {service.name}?
            </h2>
            <p style={{ fontSize: '1.02rem', color: '#94A3B8', maxWidth: '620px', margin: '0 auto 32px', lineHeight: 1.7 }}>
              Submit your system specifications to receive an official itemized quotation and architectural plan directly on your customer dashboard.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to={`/order?service=${service.slug}`} className="btn-primary" style={{ padding: '14px 34px', textDecoration: 'none' }}>
                <Sparkles size={16} />
                <span>Customise Your Order</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-secondary" style={{ padding: '14px 28px', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)' }}>
                <span>Contact Engineering</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
