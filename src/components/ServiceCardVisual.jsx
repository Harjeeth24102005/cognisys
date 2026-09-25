import React, { useState } from 'react';
import { 
  Eye, Globe, Code2, GraduationCap, ShieldCheck, Zap, 
  Cpu, Activity, CheckCircle2, Server, Terminal, Lock
} from 'lucide-react';

export const ServiceCardVisual = ({ slug }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '100%',
        height: '190px',
        position: 'relative',
        background: '#0B132B',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: isHovered ? '1px solid rgba(0, 180, 216, 0.6)' : '1px solid rgba(0, 180, 216, 0.25)',
        boxShadow: isHovered 
          ? '0 12px 30px -4px rgba(0, 180, 216, 0.25), inset 0 0 20px rgba(0, 180, 216, 0.1)' 
          : '0 6px 18px -2px rgba(11, 19, 43, 0.15)',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '14px',
        userSelect: 'none'
      }}
    >
      {/* Background Matrix Grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(0, 180, 216, 0.12) 1px, transparent 1px)',
        backgroundSize: '16px 16px',
        pointerEvents: 'none',
        opacity: isHovered ? 0.9 : 0.6,
        transition: 'opacity 0.3s ease'
      }} />

      {/* 1. AI CCTV SURVEILLANCE VISUAL */}
      {slug === 'ai-cctv' && (
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Top Camera HUD Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="status-dot-pulse" style={{ background: '#10B981', width: '7px', height: '7px' }} />
              <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#38BDF8', fontWeight: 700 }}>
                CAM-01 • RTSP STREAM
              </span>
            </div>
            <span style={{
              fontSize: '0.64rem',
              fontFamily: 'var(--font-mono)',
              background: 'rgba(0, 180, 216, 0.15)',
              color: '#38BDF8',
              border: '1px solid rgba(0, 180, 216, 0.3)',
              padding: '2px 7px',
              borderRadius: '10px',
              fontWeight: 700
            }}>
              YOLOv8-AI
            </span>
          </div>

          {/* Sweeping Laser Scan Line */}
          <div style={{
            position: 'absolute',
            left: '8px',
            right: '8px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #00B4D8, #38BDF8, transparent)',
            boxShadow: '0 0 10px #00B4D8',
            animation: 'cctvScanLine 2.8s ease-in-out infinite',
            zIndex: 3
          }} />

          {/* Center Target Reticle & Bounding Box */}
          <div style={{
            margin: 'auto 0',
            alignSelf: 'center',
            width: '160px',
            height: '76px',
            position: 'relative',
            border: isHovered ? '1.5px solid #00B4D8' : '1px solid rgba(0, 180, 216, 0.5)',
            borderRadius: '6px',
            background: isHovered ? 'rgba(0, 180, 216, 0.12)' : 'rgba(0, 180, 216, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}>
            {/* Corner Bracket Accents */}
            <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '8px', height: '8px', borderTop: '2px solid #38BDF8', borderLeft: '2px solid #38BDF8' }} />
            <div style={{ position: 'absolute', top: '-1px', right: '-1px', width: '8px', height: '8px', borderTop: '2px solid #38BDF8', borderRight: '2px solid #38BDF8' }} />
            <div style={{ position: 'absolute', bottom: '-1px', left: '-1px', width: '8px', height: '8px', borderBottom: '2px solid #38BDF8', borderLeft: '2px solid #38BDF8' }} />
            <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '8px', height: '8px', borderBottom: '2px solid #38BDF8', borderRight: '2px solid #38BDF8' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FFFFFF' }}>
              <Eye size={18} color="#38BDF8" />
              <span style={{ fontSize: '0.74rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>TARGET ACQUIRED</span>
            </div>
            <span style={{ fontSize: '0.62rem', color: '#94A3B8', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
              ID: #9482 • CONF: 99.4%
            </span>
          </div>

          {/* Bottom Telemetry Strip */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.64rem',
            fontFamily: 'var(--font-mono)',
            color: '#94A3B8',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '6px'
          }}>
            <span>LATENCY: <strong style={{ color: '#10B981' }}>16ms</strong></span>
            <span>FPS: <strong style={{ color: '#38BDF8' }}>60.0</strong></span>
            <span style={{ color: '#10B981', fontWeight: 700 }}>PERIMETER SECURE</span>
          </div>
        </div>
      )}

      {/* 2. MODERN WEB DEVELOPMENT VISUAL */}
      {slug === 'web-development' && (
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Top Browser Tabs Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(2, 6, 23, 0.6)',
            padding: '4px 8px',
            borderRadius: '6px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#EF4444' }} />
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#F59E0B' }} />
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10B981' }} />
            </div>
            <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: '#94A3B8', marginLeft: '6px' }}>
              https://app.cognisys.in
            </span>
            <span style={{ marginLeft: 'auto', fontSize: '0.6rem', color: '#10B981', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              SSL 100%
            </span>
          </div>

          {/* Central Code & Platform Engine */}
          <div style={{
            margin: 'auto 0',
            background: 'rgba(15, 23, 42, 0.7)',
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid rgba(2, 132, 199, 0.3)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.66rem', fontFamily: 'var(--font-mono)', color: '#38BDF8' }}>
                &lt;<span style={{ color: '#A78BFA' }}>PlatformEngine</span> speed="99/100" /&gt;
              </div>
              <div style={{ fontSize: '0.62rem', color: '#94A3B8', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                React 18 • Python FastAPI • Next.js
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#10B981', fontFamily: 'var(--font-mono)' }}>
                99/100
              </div>
              <div style={{ fontSize: '0.58rem', color: '#94A3B8', textTransform: 'uppercase' }}>
                Score
              </div>
            </div>
          </div>

          {/* Bottom Framework Badges */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.64rem',
            fontFamily: 'var(--font-mono)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '6px'
          }}>
            <span style={{ color: '#38BDF8' }}>RESPONSIVE UI</span>
            <span style={{ color: '#A78BFA' }}>CLOUD-NATIVE</span>
            <span style={{ color: '#10B981' }}>SUB-50ms TTFB</span>
          </div>
        </div>
      )}

      {/* 3. ENTERPRISE SOFTWARE DEVELOPMENT VISUAL */}
      {slug === 'software-development' && (
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Top Architecture Console Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Server size={12} color="#7C3AED" />
              <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#C4B5FD', fontWeight: 700 }}>
                MICROSERVICE MESH
              </span>
            </div>
            <span style={{
              fontSize: '0.62rem',
              fontFamily: 'var(--font-mono)',
              background: 'rgba(124, 58, 237, 0.2)',
              color: '#C4B5FD',
              border: '1px solid rgba(124, 58, 237, 0.35)',
              padding: '2px 7px',
              borderRadius: '10px'
            }}>
              v2.4 ACTIVE
            </span>
          </div>

          {/* Central Architecture Pipeline Layers */}
          <div style={{
            margin: 'auto 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px'
          }}>
            <div style={{
              background: 'rgba(2, 6, 23, 0.7)',
              padding: '5px 10px',
              borderRadius: '6px',
              border: '1px solid rgba(124, 58, 237, 0.3)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.66rem',
              fontFamily: 'var(--font-mono)'
            }}>
              <span style={{ color: '#E2E8F0' }}>API Gateway & Auth</span>
              <span style={{ color: '#10B981', fontWeight: 700 }}>10k req/s</span>
            </div>

            <div style={{
              background: 'rgba(2, 6, 23, 0.7)',
              padding: '5px 10px',
              borderRadius: '6px',
              border: '1px solid rgba(0, 180, 216, 0.3)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.66rem',
              fontFamily: 'var(--font-mono)'
            }}>
              <span style={{ color: '#E2E8F0' }}>PostgreSQL Cluster</span>
              <span style={{ color: '#38BDF8', fontWeight: 700 }}>1.2ms Sync</span>
            </div>
          </div>

          {/* Bottom Security & Concurrency Strip */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.64rem',
            fontFamily: 'var(--font-mono)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '6px'
          }}>
            <span style={{ color: '#A78BFA' }}>AES-256 ENCRYPTED</span>
            <span style={{ color: '#10B981' }}>99.99% UPTIME</span>
          </div>
        </div>
      )}

      {/* 4. STUDENT CAPSTONE INNOVATION VISUAL */}
      {slug === 'student-projects' && (
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Top Academic Lab Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <GraduationCap size={14} color="#10B981" />
              <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#6EE7B7', fontWeight: 700 }}>
                RESEARCH & CAPSTONE LAB
              </span>
            </div>
            <span style={{
              fontSize: '0.62rem',
              fontFamily: 'var(--font-mono)',
              background: 'rgba(16, 185, 129, 0.18)',
              color: '#6EE7B7',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              padding: '2px 7px',
              borderRadius: '10px'
            }}>
              MSME VERIFIED
            </span>
          </div>

          {/* Central Capstone Highlights Card */}
          <div style={{
            margin: 'auto 0',
            background: 'rgba(6, 78, 59, 0.2)',
            padding: '8px 10px',
            borderRadius: '8px',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '6px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.64rem', color: '#E2E8F0' }}>
              <CheckCircle2 size={12} color="#10B981" /> Tested Source Code
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.64rem', color: '#E2E8F0' }}>
              <CheckCircle2 size={12} color="#10B981" /> IEEE Documentation
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.64rem', color: '#E2E8F0' }}>
              <CheckCircle2 size={12} color="#10B981" /> PPT & Viva Guidance
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.64rem', color: '#E2E8F0' }}>
              <CheckCircle2 size={12} color="#10B981" /> MSME Certificate
            </div>
          </div>

          {/* Bottom Academic Domains Strip */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.64rem',
            fontFamily: 'var(--font-mono)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '6px'
          }}>
            <span style={{ color: '#6EE7B7' }}>AI & DEEP LEARNING</span>
            <span style={{ color: '#38BDF8' }}>IOT & ROBOTICS</span>
            <span style={{ color: '#A78BFA' }}>FULL STACK</span>
          </div>
        </div>
      )}

      {/* Default / Fallback Visual */}
      {!['ai-cctv', 'web-development', 'software-development', 'student-projects'].includes(slug) && (
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#38BDF8', fontWeight: 700 }}>
              COGNISYS ENGINEERING
            </span>
            <span style={{ fontSize: '0.62rem', background: 'rgba(0, 180, 216, 0.15)', color: '#38BDF8', padding: '2px 7px', borderRadius: '10px' }}>
              ENTERPRISE
            </span>
          </div>
          <div style={{ margin: 'auto 0', textAlign: 'center', color: '#FFFFFF' }}>
            <Cpu size={24} color="#00B4D8" style={{ margin: '0 auto 6px' }} />
            <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>Autonomous Digital Systems</div>
          </div>
          <div style={{ fontSize: '0.64rem', fontFamily: 'var(--font-mono)', color: '#10B981', textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '6px' }}>
            HIGH-THROUGHPUT ARCHITECTURE
          </div>
        </div>
      )}
    </div>
  );
};
