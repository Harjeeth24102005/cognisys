import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Eye, Globe, Code, GraduationCap, ShieldCheck, 
  Sparkles, CheckCircle, ChevronRight, Layers, Zap, Users, Terminal, 
  ShoppingCart, Phone, Mail, Award, Cpu, Search, FolderGit2, HelpCircle, BookOpen, UserCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import { CORE_SERVICES } from '../data/servicesData';
import introVideo from '../assets/intro-video.mp4';
import { getAssetUrl } from '../utils/assets';

export const Home = () => {
  const [services, setServices] = useState(CORE_SERVICES);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    api.getServices()
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // Strictly preserve the 6 core services and their order
          const merged = CORE_SERVICES.map(core => {
            const remote = data.find(d => d.slug === core.slug);
            if (!remote) return core;
            let parsedTechs = core.technologies;
            try {
              if (remote.technologies_json) parsedTechs = JSON.parse(remote.technologies_json);
            } catch (e) {}
            return {
              ...core,
              ...remote,
              icon: core.icon,
              color: core.color,
              image: core.image,
              technologies: parsedTechs
            };
          });
          setServices(merged);
        }
      })
      .catch(err => console.log('Using default services:', err));
  }, []);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) {
      navigate('/services');
      return;
    }
    navigate(`/services?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  // Only real, active navigable services & pages available across the Cognisys platform
  const heroCategoryPills = [
    { label: "AI-Based CCTV Attendance", icon: Eye, path: "/services/ai-cctv-attendance" },
    { label: "Websites & Web Dev", icon: Globe, path: "/services/websites" },
    { label: "AI-Based Projects", icon: Cpu, path: "/services/ai-projects" },
    { label: "Python Projects", icon: Terminal, path: "/services/python-projects" },
    { label: "Final Year Projects", icon: GraduationCap, path: "/services/final-year-projects" },
    { label: "Face Recognition System", icon: UserCheck, path: "/services/face-recognition" },
    { label: "MSME Registered Entity", icon: ShieldCheck, path: "/about" },
    { label: "Configure Order", icon: ShoppingCart, path: "/order" },
    { label: "About Cognisys", icon: Users, path: "/about" },
    { label: "FAQ & Support", icon: HelpCircle, path: "/faq" },
    { label: "Engineering Blog", icon: BookOpen, path: "/blog" },
    { label: "Contact Us", icon: Phone, path: "/contact" }
  ];

  const whyPoints = [
    {
      icon: Zap,
      title: "AI-Powered Solutions",
      desc: "Cutting-edge computer vision, neural tracking and intelligent automation integrated directly into your digital systems.",
      color: "#00B4D8"
    },
    {
      icon: Terminal,
      title: "Modern Technology Stack",
      desc: "Engineered with React, Python FastAPI, PyTorch, and cloud-native microservices for uncompromising speed and scalability.",
      color: "#0284C7"
    },
    {
      icon: GraduationCap,
      title: "Student-Friendly Mentorship",
      desc: "Dedicated engineering mentorship, IEEE-grade research prototypes, and working code for final-year innovators.",
      color: "#7C3AED"
    },
    {
      icon: Users,
      title: "End-to-End Delivery",
      desc: "From concept ideation, API design to continuous deployment, hosting, and long-term technical support.",
      color: "#0891B2"
    }
  ];

  return (
    <div style={{ paddingTop: '0' }}>
      {/* 1. HERO SECTION - Full Screen Video Background with Search & Looping Navigation Buttons */}
      <section className="hero-section">
        {/* Background Intro Video - 100% Full Screen Clarity, Completely Unobscured */}
        <div className="hero-video-container">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero-video"
          >
            <source src={introVideo} type="video/mp4" />
            <source src={getAssetUrl('/intro-video.mp4')} type="video/mp4" />
            <source src={getAssetUrl('/intro video.mp4')} type="video/mp4" />
          </video>
          {/* Subtle soft gradient at bottom so controls blend seamlessly into content on desktop */}
          <div className="hero-video-overlay" />
        </div>

        {/* Control Area: Search Bar positioned right above the Looping Buttons */}
        <div className="hero-controls-wrapper">
          {/* Centered Pill Search Capsule - Right Above the Buttons */}
          <form
            onSubmit={handleSearch}
            className="hero-search-form"
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1.5px solid #E2E8F0',
              borderRadius: '9999px',
              padding: '7px 8px 7px 24px',
              maxWidth: '560px',
              width: '92%',
              margin: '0 auto',
              boxShadow: '0 12px 36px rgba(15, 23, 42, 0.18), 0 2px 8px rgba(0, 0, 0, 0.06)',
              transition: 'all 0.25s ease'
            }}
          >
            <Search size={19} color="#E52E2E" style={{ flexShrink: 0, marginRight: '12px' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tell us what you're looking to build / explore..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '0.96rem',
                color: '#0F172A',
                fontWeight: 500,
                fontFamily: 'var(--font-sans)'
              }}
            />
            <button
              type="submit"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: '#E52E2E',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#FFFFFF',
                boxShadow: '0 3px 10px rgba(229, 46, 46, 0.4)',
                transition: 'transform 0.2s ease, background 0.2s ease',
                flexShrink: 0
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              title="Search or Explore"
            >
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Infinite Horizontal Looping Buttons Track */}
          <div className="hero-pill-track touch-scroll-x" style={{
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
            maskImage: 'linear-gradient(to right, transparent, black 4%, black 96%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 4%, black 96%, transparent)',
            padding: '4px 0'
          }}>
            <div
              style={{
                display: 'flex',
                width: 'max-content',
                gap: '14px',
                animation: 'infiniteHorizontalScroll 35s linear infinite'
              }}
              onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
              onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
            >
              {/* Duplicated array for seamless infinite looping */}
              {[...heroCategoryPills, ...heroCategoryPills].map((pill, idx) => {
                const Icon = pill.icon;
                return (
                  <Link
                    key={idx}
                    to={pill.path}
                    style={{
                      background: '#FFFFFF',
                      border: '1.5px solid #FCA5A5',
                      borderRadius: '9999px',
                      padding: '9px 20px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#0F172A',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.25s ease',
                      flexShrink: 0
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#E52E2E';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(229, 46, 46, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#FCA5A5';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.08)';
                    }}
                  >
                    <Icon size={16} color="#E52E2E" />
                    <span>{pill.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMPANY INTRODUCTION & MSME BADGE */}
      <section className="section-padding" style={{
        background: '#F8FAFC',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Ambient Scroll Parallax Glow Spheres */}
        <div 
          className="parallax-orb parallax-orb-cyan" 
          style={{ 
            top: '-60px', 
            left: '-60px', 
            width: '320px', 
            height: '320px', 
            transform: `translate3d(0, ${scrollY * 0.05}px, 0)` 
          }} 
        />
        <div 
          className="parallax-orb parallax-orb-blue" 
          style={{ 
            bottom: '-60px', 
            right: '-60px', 
            width: '300px', 
            height: '300px', 
            transform: `translate3d(0, ${scrollY * -0.04}px, 0)` 
          }} 
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <div className="badge badge-cyan" style={{ marginBottom: '14px' }}>ABOUT COGNISYS</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', marginBottom: '18px', color: '#0B132B' }}>
              Where Advanced Artificial Intelligence Meets Practical Engineering
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#1E293B', lineHeight: 1.7, marginBottom: '32px' }}>
              At Cognisys, we develop custom intelligent surveillance networks, high-performance modern web platforms, and enterprise software systems designed for reliability and measurable impact. Furthermore, our academic lab helps university students and researchers transform ambitious engineering ideas into working prototypes with complete documentation.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/about" className="btn-primary" style={{ padding: '10px 24px' }}>
                <span>Explore Cognisys Platform</span>
                <ArrowRight size={15} />
              </Link>
              <Link to="/about" className="btn-secondary" style={{ padding: '10px 24px' }}>
                <ShieldCheck size={16} color="#00B4D8" />
                <span>MSME Registered Enterprise</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR SERVICES CATALOG CARDS WITH INTERACTIVE VISUALS */}
      <section className="section-padding" style={{ background: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
        {/* Ambient Scroll Parallax Glow Spheres */}
        <div 
          className="parallax-orb parallax-orb-purple" 
          style={{ 
            top: '40px', 
            right: '-80px', 
            width: '360px', 
            height: '360px', 
            transform: `translate3d(0, ${scrollY * 0.04}px, 0)` 
          }} 
        />
        <div 
          className="parallax-orb parallax-orb-cyan" 
          style={{ 
            bottom: '60px', 
            left: '-80px', 
            width: '340px', 
            height: '340px', 
            transform: `translate3d(0, ${scrollY * -0.03}px, 0)` 
          }} 
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
          <div className="adaptive-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '18px' }}>
            <div className="adaptive-text">
              <div className="badge badge-purple" style={{ marginBottom: '12px' }}>CORE OFFERINGS</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#0B132B' }}>
                Engineered for Scale &amp; Precision
              </h2>
            </div>
            <Link to="/services" style={{ color: '#0284C7', textDecoration: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>View Full Service Catalog</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="services-grid-3col">
            {services.map((svc) => {
              const IconComp = svc.icon || Eye;
              const svcColor = svc.color || '#00B4D8';
              const cardImage = getAssetUrl(svc.image || '/images/card-software.jpg');
              let techs = [];
              if (Array.isArray(svc.technologies)) {
                techs = svc.technologies;
              } else {
                try {
                  if (svc.technologies_json) techs = JSON.parse(svc.technologies_json);
                } catch (e) {}
              }

              return (
                <div
                  key={svc.slug || svc.id}
                  className="glass-panel card-hover-elevation service-card-container"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.06)',
                    height: '100%'
                  }}
                >
                  {/* Topic Image Banner */}
                  <div className="service-card-banner">
                    <img
                      src={cardImage}
                      alt={svc.name}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = getAssetUrl('/images/card-software.jpg');
                      }}
                    />
                    <div className="service-card-overlay" />

                    {/* Floating Squircle & Category Pill */}
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      right: '12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      zIndex: 2
                    }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '11px',
                        background: 'rgba(15, 23, 42, 0.82)',
                        backdropFilter: 'blur(8px)',
                        border: `1.5px solid ${svcColor}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: svcColor,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                      }}>
                        <IconComp size={20} />
                      </div>

                      <span style={{
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        background: 'rgba(15, 23, 42, 0.85)',
                        backdropFilter: 'blur(8px)',
                        color: '#FFFFFF',
                        border: `1px solid ${svcColor}60`,
                        letterSpacing: '0.5px'
                      }}>
                        {svc.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div style={{ padding: '22px 24px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginBottom: '10px', fontWeight: 800, minHeight: '2.8rem', lineHeight: 1.25 }}>
                      {svc.name}
                    </h3>

                    <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.6, marginBottom: '18px', flex: 1, minHeight: '4.2rem' }}>
                      {svc.short_desc}
                    </p>

                    {/* Tech stack chips */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px', minHeight: '26px' }}>
                      {techs.slice(0, 4).map((t, idx) => (
                        <span key={idx} style={{
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-mono)',
                          background: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          color: '#334155',
                          fontWeight: 600
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>

                    <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                      <Link to={`/services/${svc.slug}`} style={{ color: '#0F172A', textDecoration: 'none', fontSize: '0.86rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span>Learn More</span>
                        <ChevronRight size={14} color="#00B4D8" />
                      </Link>
                      <button
                        onClick={() => addToCart(svc)}
                        className="btn-primary"
                        style={{ padding: '8px 16px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        <ShoppingCart size={14} />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* 5. WHY COGNISYS ADVANTAGE */}
      <section className="section-padding" style={{ background: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
        {/* Ambient Scroll Parallax Glow Spheres */}
        <div 
          className="parallax-orb parallax-orb-indigo" 
          style={{ 
            top: '25%', 
            right: '-100px', 
            width: '360px', 
            height: '360px', 
            transform: `translate3d(0, ${scrollY * 0.03}px, 0)` 
          }} 
        />
        <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px' }}>
            <div className="badge badge-purple" style={{ marginBottom: '12px' }}>THE COGNISYS ADVANTAGE</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', color: '#0B132B', marginBottom: '16px' }}>
              Why Leading Teams &amp; Innovators Choose Cognisys
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#1E293B' }}>
              From idea to production deployment, we deliver high-velocity software engineering with continuous transparency.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {whyPoints.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="glass-panel card-hover-elevation" style={{ padding: '30px', background: '#FFFFFF' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: 'rgba(0, 180, 216, 0.08)',
                    border: '1px solid rgba(0, 180, 216, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.color,
                    marginBottom: '18px'
                  }}>
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', color: '#0F172A', marginBottom: '10px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#1E293B', lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION (CTA) WITH BRAND GRADIENT */}
      <section style={{ padding: '60px 0 90px', background: '#FFFFFF' }}>
        <div className="container-custom">
          <div className="cta-dark-banner bg-dark" style={{
            padding: 'clamp(40px, 6vw, 64px)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #0B132B 0%, #0F172A 60%, #1E1B4B 100%)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: '0 20px 40px -10px rgba(11, 19, 43, 0.25), 0 0 30px rgba(0, 180, 216, 0.15)'
          }}>
            {/* Ambient Cyan/Violet decorative glow */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              right: '-20%',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(0, 180, 216, 0.25) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-50%',
              left: '-20%',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />

            <div style={{ maxWidth: '640px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
              <div className="badge" style={{ marginBottom: '16px', background: 'rgba(0, 180, 216, 0.15)', color: '#38BDF8', borderColor: 'rgba(0, 180, 216, 0.35)' }}>
                START YOUR JOURNEY
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFFFFF', marginBottom: '16px' }}>
                "Have an idea? Let's build it."
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#E2E8F0', lineHeight: 1.6, marginBottom: '32px' }}>
                Whether you require enterprise AI CCTV surveillance, a responsive web platform, or a student capstone prototype, Cognisys turns technology into real solutions.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/order" className="btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
                  <span>Configure Project Specifications</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="btn-secondary-light" style={{ padding: '14px 28px', fontSize: '1rem' }}>
                  <span>Contact Cognisys</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
