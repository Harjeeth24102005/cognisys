import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, Globe, Code2, GraduationCap, ShieldCheck, CheckCircle, 
  ArrowRight, Activity, Smartphone, Monitor, Sparkles, Cpu, 
  Layers, Terminal, RefreshCw, Zap, Server, ChevronRight, Check
} from 'lucide-react';

export const HeroSolutionsShowcase = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cctvAlert, setCctvAlert] = useState(false);
  const [deviceMode, setDeviceMode] = useState('desktop');
  const [activeDomain, setActiveDomain] = useState(0);
  const [currentTime, setCurrentTime] = useState('');

  // Live real-time clock for the surveillance/system console
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toTimeString().split(' ')[0] + ' UTC+5:30');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-switch tabs every 7 seconds unless user interacts or hovers
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 4);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const tabs = [
    {
      id: 0,
      label: 'AI CCTV Surveillance',
      shortLabel: 'AI CCTV',
      icon: Eye,
      tag: 'Real-Time Vision',
      color: '#00B4D8'
    },
    {
      id: 1,
      label: 'Web Applications',
      shortLabel: 'Web Dev',
      icon: Globe,
      tag: 'Cloud-Native SaaS',
      color: '#0284C7'
    },
    {
      id: 2,
      label: 'Software Systems',
      shortLabel: 'Software',
      icon: Code2,
      tag: 'Enterprise APIs',
      color: '#7C3AED'
    },
    {
      id: 3,
      label: 'Student Projects',
      shortLabel: 'Projects',
      icon: GraduationCap,
      tag: 'MSME & IEEE',
      color: '#10B981'
    }
  ];

  const studentDomains = [
    {
      name: 'AI & Deep Learning',
      count: '18+ Titles',
      featured: 'Computer Vision Defect Detection with YOLOv8 & PyTorch'
    },
    {
      name: 'Web & Cloud Platforms',
      count: '15+ Titles',
      featured: 'Decentralized Healthcare Record Management with Next.js'
    },
    {
      name: 'IoT & Edge Hardware',
      count: '12+ Titles',
      featured: 'Smart Industrial Monitoring with ESP32 & MQTT Protocol'
    },
    {
      name: 'Cyber & Blockchain',
      count: '10+ Titles',
      featured: 'Zero-Knowledge Cryptographic Authentication Engine'
    }
  ];

  const triggerCctvSimulation = () => {
    setCctvAlert(true);
    setTimeout(() => setCctvAlert(false), 2400);
  };

  return (
    <div
      className="hero-solutions-showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        width: '100%',
        maxWidth: '580px',
        margin: '0 auto',
        borderRadius: '24px',
        background: '#0B132B',
        border: '1px solid rgba(0, 180, 216, 0.35)',
        boxShadow: '0 24px 60px -12px rgba(11, 19, 43, 0.4), 0 0 35px rgba(0, 180, 216, 0.15)',
        overflow: 'hidden',
        color: '#FFFFFF',
        fontFamily: 'var(--font-sans)',
        position: 'relative'
      }}
    >
      {/* 1. TOP HEADER & SEGMENTED TABS */}
      <div style={{
        padding: '16px 18px 12px',
        background: 'rgba(15, 23, 42, 0.85)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(12px)'
      }}>
        {/* Top telemetry status bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '14px',
          fontSize: '0.74rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="status-dot-pulse" style={{ background: '#10B981' }} />
            <span style={{ fontWeight: 700, letterSpacing: '0.04em', color: '#F8FAFC' }}>
              COGNISYS LIVE CONSOLE
            </span>
            <span style={{
              background: 'rgba(0, 180, 216, 0.15)',
              color: '#38BDF8',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '0.68rem',
              fontWeight: 700
            }}>
              ONLINE
            </span>
          </div>

          <div style={{
            fontFamily: 'var(--font-mono)',
            color: '#94A3B8',
            fontSize: '0.72rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Activity size={12} color="#00B4D8" />
            <span>{currentTime || '12:00:00 UTC+5:30'}</span>
          </div>
        </div>

        {/* 4 Interactive Service Switcher Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '6px',
          background: 'rgba(2, 6, 23, 0.65)',
          padding: '4px',
          borderRadius: '14px',
          border: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsPaused(true);
                }}
                className="mobile-tap-active"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  padding: '8px 4px',
                  borderRadius: '10px',
                  border: 'none',
                  background: isActive ? 'rgba(0, 180, 216, 0.2)' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#94A3B8',
                  boxShadow: isActive ? '0 2px 10px rgba(0, 180, 216, 0.25), inset 0 0 0 1px rgba(0, 180, 216, 0.5)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <Icon size={16} color={isActive ? '#38BDF8' : '#94A3B8'} />
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: isActive ? 700 : 500,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%'
                }}>
                  {tab.shortLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. DYNAMIC PREVIEW WORKSPACE */}
      <div style={{ padding: '20px 22px' }}>

        {/* ========================================================
            TAB 0: AI CCTV SURVEILLANCE LIVE DEMO
            ======================================================== */}
        {activeTab === 0 && (
          <div className="animate-fade-in-scale">
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#00B4D8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Smart Computer Vision
                </span>
                <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', fontWeight: 800, margin: '2px 0 0' }}>
                  AI CCTV Analytics Feed
                </h3>
              </div>
              <button
                onClick={triggerCctvSimulation}
                className="mobile-tap-active"
                style={{
                  background: cctvAlert ? '#EF4444' : 'rgba(0, 180, 216, 0.15)',
                  border: cctvAlert ? '1px solid #EF4444' : '1px solid rgba(0, 180, 216, 0.4)',
                  color: '#FFFFFF',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
              >
                <Zap size={13} color={cctvAlert ? '#FFFFFF' : '#38BDF8'} />
                <span>{cctvAlert ? 'Detecting Anomaly!' : 'Simulate Scan'}</span>
              </button>
            </div>

            {/* Simulated Live Camera HUD Frame */}
            <div style={{
              position: 'relative',
              height: '210px',
              borderRadius: '16px',
              background: 'radial-gradient(ellipse at center, #0F2744 0%, #060F1E 100%)',
              border: cctvAlert ? '1.5px solid #EF4444' : '1.5px solid rgba(0, 180, 216, 0.3)',
              boxShadow: cctvAlert ? '0 0 20px rgba(239, 68, 68, 0.35)' : 'inset 0 0 30px rgba(0, 0, 0, 0.6)',
              overflow: 'hidden',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.3s ease'
            }}>
              {/* Surveillance Grid Lines */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'linear-gradient(rgba(0, 180, 216, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 180, 216, 0.05) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                pointerEvents: 'none'
              }} />

              {/* Animated Laser Scanning Line */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: cctvAlert ? '#EF4444' : '#00B4D8',
                boxShadow: cctvAlert ? '0 0 12px #EF4444' : '0 0 12px #00B4D8',
                animation: 'cctvScanLine 3.2s ease-in-out infinite',
                opacity: 0.75
              }} />

              {/* Top HUD Overlay */}
              <div style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981', fontWeight: 700 }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', animation: 'statusPulse 1.5s infinite' }} />
                  <span>CAM-04 • ENTRY GATE • 60 FPS</span>
                </div>
                <div style={{ color: '#38BDF8', fontWeight: 600 }}>
                  YOLOv8-EDGE INFERENCE
                </div>
              </div>

              {/* Middle Detection Bounding Boxes */}
              <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                {/* Bounding Box 1: Person */}
                <div style={{
                  border: cctvAlert ? '1.5px solid #EF4444' : '1.5px solid #00B4D8',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  background: cctvAlert ? 'rgba(239, 68, 68, 0.15)' : 'rgba(0, 180, 216, 0.12)',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transform: cctvAlert ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.2s ease'
                }}>
                  <span style={{
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-mono)',
                    color: cctvAlert ? '#FCA5A5' : '#38BDF8',
                    fontWeight: 700
                  }}>
                    {cctvAlert ? '⚠ ANOMALY: MOTION (99.1%)' : 'PERSON: AUTHORIZED (99.4%)'}
                  </span>
                  <div style={{
                    width: '38px',
                    height: '52px',
                    border: '1px dashed rgba(255, 255, 255, 0.3)',
                    borderRadius: '4px',
                    margin: '6px 0 2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Eye size={18} color={cctvAlert ? '#EF4444' : '#00B4D8'} />
                  </div>
                </div>

                {/* Bounding Box 2: Vehicle */}
                <div style={{
                  border: '1.5px solid #10B981',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  background: 'rgba(16, 185, 129, 0.12)',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: '#6EE7B7', fontWeight: 700 }}>
                    VEHICLE: TN-07-XX (98.7%)
                  </span>
                  <div style={{
                    width: '60px',
                    height: '42px',
                    border: '1px dashed rgba(255, 255, 255, 0.3)',
                    borderRadius: '4px',
                    margin: '6px 0 2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <ShieldCheck size={18} color="#10B981" />
                  </div>
                </div>
              </div>

              {/* Bottom Telemetry Bar */}
              <div style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(0, 0, 0, 0.5)',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '0.68rem',
                fontFamily: 'var(--font-mono)'
              }}>
                <span style={{ color: '#94A3B8' }}>Latency: <strong style={{ color: '#38BDF8' }}>16ms</strong></span>
                <span style={{ color: '#94A3B8' }}>Target Loss: <strong style={{ color: '#10B981' }}>0.00%</strong></span>
                <span style={{ color: cctvAlert ? '#EF4444' : '#10B981', fontWeight: 700 }}>
                  {cctvAlert ? '⚠ ALERT DISPATCHED' : 'PERIMETER SECURED'}
                </span>
              </div>
            </div>

            {/* Feature Badges & CTA */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.72rem', background: 'rgba(255, 255, 255, 0.08)', padding: '3px 8px', borderRadius: '6px', color: '#E2E8F0' }}>
                  Face &amp; Plate Recognition
                </span>
                <span style={{ fontSize: '0.72rem', background: 'rgba(255, 255, 255, 0.08)', padding: '3px 8px', borderRadius: '6px', color: '#E2E8F0' }}>
                  Intruder Alerts
                </span>
              </div>

              <Link
                to="/services/ai-cctv"
                className="btn-primary"
                style={{ fontSize: '0.8rem', padding: '6px 14px' }}
              >
                <span>Explore AI CCTV</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 1: WEB APPLICATIONS & SAAS PLATFORMS
            ======================================================== */}
        {activeTab === 1 && (
          <div className="animate-fade-in-scale">
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#0284C7', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Cloud-Native SaaS &amp; Web
                </span>
                <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', fontWeight: 800, margin: '2px 0 0' }}>
                  High-Performance Web Apps
                </h3>
              </div>
              {/* Device Preview Toggle */}
              <div style={{
                display: 'flex',
                background: 'rgba(2, 6, 23, 0.8)',
                borderRadius: '8px',
                padding: '2px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <button
                  onClick={() => setDeviceMode('desktop')}
                  style={{
                    background: deviceMode === 'desktop' ? 'rgba(0, 180, 216, 0.3)' : 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    color: '#FFFFFF',
                    cursor: 'pointer'
                  }}
                  title="Desktop Viewport"
                >
                  <Monitor size={14} />
                </button>
                <button
                  onClick={() => setDeviceMode('mobile')}
                  style={{
                    background: deviceMode === 'mobile' ? 'rgba(0, 180, 216, 0.3)' : 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    color: '#FFFFFF',
                    cursor: 'pointer'
                  }}
                  title="Mobile Viewport"
                >
                  <Smartphone size={14} />
                </button>
              </div>
            </div>

            {/* Browser Preview Window */}
            <div style={{
              height: '210px',
              borderRadius: '16px',
              background: '#0F172A',
              border: '1.5px solid rgba(0, 180, 216, 0.3)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Browser Address Bar */}
              <div style={{
                padding: '6px 12px',
                background: '#0A0F1D',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} />
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} />
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
                </div>
                <div style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.06)',
                  borderRadius: '6px',
                  padding: '2px 10px',
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#94A3B8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span>https://app.cognisys.in/client-portal</span>
                  <span style={{ color: '#10B981', fontSize: '0.65rem' }}>SSL SECURE</span>
                </div>
              </div>

              {/* Inside Web Preview Content */}
              <div style={{
                flex: 1,
                padding: '12px',
                display: 'grid',
                gridTemplateColumns: deviceMode === 'desktop' ? '1fr 1fr' : '1fr',
                gap: '10px',
                alignItems: 'center'
              }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.04)', borderRadius: '10px', padding: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '0.68rem', color: '#94A3B8', marginBottom: '2px' }}>Lighthouse Speed Score</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10B981', fontFamily: 'var(--font-mono)' }}>
                    99 / 100
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#38BDF8', marginTop: '2px' }}>
                    Zero Render Lag • 38ms TTFB
                  </div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.04)', borderRadius: '10px', padding: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '0.68rem', color: '#94A3B8', marginBottom: '2px' }}>Production Architecture</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF' }}>
                    React 18 &bull; Python FastAPI
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#A78BFA', marginTop: '2px' }}>
                    Docker &bull; PostgreSQL &bull; AWS
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Badges & CTA */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.72rem', background: 'rgba(255, 255, 255, 0.08)', padding: '3px 8px', borderRadius: '6px', color: '#E2E8F0' }}>
                  100% Mobile Responsive
                </span>
                <span style={{ fontSize: '0.72rem', background: 'rgba(255, 255, 255, 0.08)', padding: '3px 8px', borderRadius: '6px', color: '#E2E8F0' }}>
                  SEO Optimized
                </span>
              </div>

              <Link
                to="/services/web-development"
                className="btn-primary"
                style={{ fontSize: '0.8rem', padding: '6px 14px' }}
              >
                <span>Build Web Platform</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: ENTERPRISE SOFTWARE SYSTEMS & APIS
            ======================================================== */}
        {activeTab === 2 && (
          <div className="animate-fade-in-scale">
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#7C3AED', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Backend Architecture &amp; APIs
                </span>
                <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', fontWeight: 800, margin: '2px 0 0' }}>
                  Software Engineering Console
                </h3>
              </div>
              <span style={{
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                background: 'rgba(124, 58, 237, 0.18)',
                color: '#C4B5FD',
                padding: '3px 10px',
                borderRadius: '20px',
                border: '1px solid rgba(124, 58, 237, 0.3)'
              }}>
                v2.4-STABLE
              </span>
            </div>

            {/* Developer Console Box */}
            <div style={{
              height: '210px',
              borderRadius: '16px',
              background: '#060B18',
              border: '1.5px solid rgba(124, 58, 237, 0.3)',
              overflow: 'hidden',
              padding: '12px 14px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              lineHeight: 1.6,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div style={{ color: '#94A3B8' }}>
                <div><span style={{ color: '#A78BFA' }}>cognisys@cloud:~$</span> systemctl status backend-mesh</div>
                <div style={{ color: '#10B981', marginTop: '4px' }}>● active (running) since Wed 2026-09-16 UTC</div>
                <div style={{ color: '#E2E8F0', marginTop: '6px' }}>&gt; Postgres Cluster: <strong>Operational (1.2ms)</strong></div>
                <div style={{ color: '#E2E8F0' }}>&gt; API Authentication: <strong>JWT + OAuth 2.0 Active</strong></div>
                <div style={{ color: '#E2E8F0' }}>&gt; Redis Cache Layer: <strong>99.4% Hit Rate</strong></div>
              </div>

              {/* Bottom Microservice Health Strip */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                paddingTop: '8px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <div style={{ textAlign: 'center', background: 'rgba(255, 255, 255, 0.04)', padding: '4px', borderRadius: '6px' }}>
                  <div style={{ color: '#94A3B8', fontSize: '0.64rem' }}>SERVICES</div>
                  <div style={{ color: '#38BDF8', fontWeight: 700 }}>12 / 12 UP</div>
                </div>
                <div style={{ textAlign: 'center', background: 'rgba(255, 255, 255, 0.04)', padding: '4px', borderRadius: '6px' }}>
                  <div style={{ color: '#94A3B8', fontSize: '0.64rem' }}>ENCRYPTION</div>
                  <div style={{ color: '#10B981', fontWeight: 700 }}>AES-256</div>
                </div>
                <div style={{ textAlign: 'center', background: 'rgba(255, 255, 255, 0.04)', padding: '4px', borderRadius: '6px' }}>
                  <div style={{ color: '#94A3B8', fontSize: '0.64rem' }}>CONCURRENCY</div>
                  <div style={{ color: '#A78BFA', fontWeight: 700 }}>10k req/s</div>
                </div>
              </div>
            </div>

            {/* Feature Badges & CTA */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.72rem', background: 'rgba(255, 255, 255, 0.08)', padding: '3px 8px', borderRadius: '6px', color: '#E2E8F0' }}>
                  Custom Business Logic
                </span>
                <span style={{ fontSize: '0.72rem', background: 'rgba(255, 255, 255, 0.08)', padding: '3px 8px', borderRadius: '6px', color: '#E2E8F0' }}>
                  Automated Cloud Backups
                </span>
              </div>

              <Link
                to="/services/software-development"
                className="btn-primary"
                style={{ fontSize: '0.8rem', padding: '6px 14px' }}
              >
                <span>Explore Software Dev</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: STUDENT CAPSTONE PROJECTS & IEEE LAB
            ======================================================== */}
        {activeTab === 3 && (
          <div className="animate-fade-in-scale">
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Final Year Engineering &amp; Research
                </span>
                <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', fontWeight: 800, margin: '2px 0 0' }}>
                  IEEE Student Capstone Hub
                </h3>
              </div>
              <span style={{
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                background: 'rgba(16, 185, 129, 0.18)',
                color: '#6EE7B7',
                padding: '3px 10px',
                borderRadius: '20px',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <ShieldCheck size={12} />
                <span>MSME VERIFIED</span>
              </span>
            </div>

            {/* Student Project Interactive Selector */}
            <div style={{
              height: '210px',
              borderRadius: '16px',
              background: '#0B1B1F',
              border: '1.5px solid rgba(16, 185, 129, 0.3)',
              overflow: 'hidden',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              {/* Domain Chips */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
                {studentDomains.map((domain, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveDomain(idx)}
                    className="mobile-tap-active"
                    style={{
                      padding: '6px 8px',
                      borderRadius: '8px',
                      border: activeDomain === idx ? '1px solid #10B981' : '1px solid rgba(255, 255, 255, 0.08)',
                      background: activeDomain === idx ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                      color: activeDomain === idx ? '#FFFFFF' : '#94A3B8',
                      fontSize: '0.72rem',
                      fontWeight: activeDomain === idx ? 700 : 500,
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span>{domain.name}</span>
                    <span style={{ fontSize: '0.65rem', color: '#10B981', fontWeight: 700 }}>{domain.count}</span>
                  </button>
                ))}
              </div>

              {/* Active Project Inclusions Box */}
              <div style={{
                background: 'rgba(0, 0, 0, 0.45)',
                borderRadius: '10px',
                padding: '10px 12px',
                border: '1px solid rgba(16, 185, 129, 0.15)'
              }}>
                <div style={{ fontSize: '0.72rem', color: '#6EE7B7', fontWeight: 700, marginBottom: '4px' }}>
                  FEATURED: {studentDomains[activeDomain].featured}
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '4px',
                  fontSize: '0.68rem',
                  color: '#E2E8F0',
                  marginTop: '6px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Check size={11} color="#10B981" /> 100% Tested Source Code
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Check size={11} color="#10B981" /> IEEE Format Synopsis &amp; Paper
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Check size={11} color="#10B981" /> PPT &amp; Viva Voce Mentorship
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Check size={11} color="#10B981" /> MSME Completion Certificate
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Badges & CTA */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.72rem', background: 'rgba(255, 255, 255, 0.08)', padding: '3px 8px', borderRadius: '6px', color: '#E2E8F0' }}>
                  B.E / B.Tech / M.Tech / MCA
                </span>
                <span style={{ fontSize: '0.72rem', background: 'rgba(255, 255, 255, 0.08)', padding: '3px 8px', borderRadius: '6px', color: '#E2E8F0' }}>
                  1-on-1 Guidance
                </span>
              </div>

              <Link
                to="/services/student-projects"
                className="btn-primary"
                style={{ fontSize: '0.8rem', padding: '6px 14px' }}
              >
                <span>Browse Student Projects</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* 3. BOTTOM PROGRESS INDICATOR */}
      <div style={{
        height: '3px',
        background: 'rgba(255, 255, 255, 0.06)',
        width: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          left: `${activeTab * 25}%`,
          width: '25%',
          height: '100%',
          background: 'linear-gradient(90deg, #00B4D8, #7C3AED)',
          transition: 'left 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }} />
      </div>

      {/* Embedded CSS for Scanning Line Animation */}
      <style>{`
        @keyframes cctvScanLine {
          0% { top: 0%; opacity: 0.8; }
          50% { top: 96%; opacity: 0.8; }
          100% { top: 0%; opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};
