import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Eye, Globe, Code, GraduationCap, Server, 
  Sparkles, ArrowRight, Volume2, VolumeX, CheckCircle2, ChevronRight, Zap 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const CognisysNeuralTreeScroll = () => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const [activeDomain, setActiveDomain] = useState(null);
  const [soundActive, setSoundActive] = useState(false);
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);

  const domains = [
    {
      id: 'ai-cctv',
      title: 'AI CCTV & Computer Vision',
      position: 'left-top',
      path: '/services/ai-cctv',
      icon: Eye,
      color: '#F9BE4A',
      stack: ['PyTorch', 'YOLOv11', 'OpenCV', 'DeepSORT', 'WebRTC'],
      desc: 'Real-time multi-person intrusion detection, facial biometrics & automated perimeter defense with sub-50ms inference latency.'
    },
    {
      id: 'web-development',
      title: 'Modern Web Development',
      position: 'top',
      path: '/services/web-development',
      icon: Globe,
      color: '#FFE18F',
      stack: ['React', 'TypeScript', 'FastAPI', 'Vite', 'PostgreSQL'],
      desc: 'High-performance responsive web applications, enterprise portals, database systems & scalable SaaS platforms.'
    },
    {
      id: 'software-development',
      title: 'Enterprise Software & APIs',
      position: 'right-top',
      path: '/services/software-development',
      icon: Code,
      color: '#22d3ee',
      stack: ['FastAPI', 'Python', 'PostgreSQL', 'Docker', 'Redis'],
      desc: 'Scalable distributed backend services, asynchronous task queues, microservices, and secure relational database architectures.'
    },
    {
      id: 'student-projects',
      title: 'Student Innovation Lab',
      position: 'left',
      path: '/services/student-projects',
      icon: GraduationCap,
      color: '#34d399',
      stack: ['IEEE Standards', 'Deep Learning', 'IoT Hardware', 'Documentation'],
      desc: 'Full-stack engineering capstones, research prototypes, working models, and complete thesis documentation for university innovators.'
    },
    {
      id: 'cloud-edge',
      title: 'Edge AI & Cloud Gateways',
      position: 'right',
      path: '/services/ai-cctv',
      icon: Server,
      color: '#c084fc',
      stack: ['NVIDIA Jetson', 'CUDA', 'Linux Gateways', 'Kubernetes'],
      desc: 'Low-power on-premise edge hardware deployment with seamless telemetry synchronization and cloud dashboard integration.'
    }
  ];

  // Sound Synthesizer Effect (Web Audio API)
  const toggleSound = () => {
    if (soundActive) {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
        } catch (e) {}
      }
      setSoundActive(false);
    } else {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioContextRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(130.81, ctx.currentTime); // C3 ambient drone
        gain.gain.setValueAtTime(0.04, ctx.currentTime);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        oscillatorRef.current = osc;
        setSoundActive(true);
      } catch (e) {
        setSoundActive(false);
      }
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State
      gsap.set('.circuit-branch', { strokeDasharray: 1000, strokeDashoffset: 1000 });
      gsap.set('.neural-node', { scale: 0, opacity: 0 });
      gsap.set('.neural-core-center', { scale: 0.6, opacity: 0 });

      // 2. Master ScrollTrigger Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 85%',
          scrub: 1
        }
      });

      // Stage 1: Core Expansion
      tl.to('.neural-core-center', {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.7)'
      })
      // Stage 2: Drawing Neural Circuit Paths
      .to('.circuit-branch', {
        strokeDashoffset: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power1.inOut'
      }, '-=0.2')
      // Stage 3: Revealing Nodes
      .to('.neural-node', {
        scale: 1,
        opacity: 1,
        stagger: 0.12,
        duration: 0.6,
        ease: 'back.out(2)'
      }, '-=0.4');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        padding: '60px 0 100px',
        background: 'radial-gradient(circle at 50% 50%, rgba(14, 52, 62, 0.45) 0%, #07191E 80%)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        overflow: 'hidden'
      }}
    >
      {/* Background Ambience & Glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(249, 190, 74, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Sound Toggle Floating Button */}
      <button
        onClick={toggleSound}
        style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          zIndex: 10,
          background: soundActive ? 'rgba(249, 190, 74, 0.2)' : 'rgba(7, 25, 30, 0.9)',
          border: `1.5px solid ${soundActive ? '#F9BE4A' : 'rgba(255, 255, 255, 0.3)'}`,
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: soundActive ? '#FFE18F' : '#FFFFFF',
          cursor: 'pointer',
          boxShadow: soundActive ? '0 0 16px rgba(249, 190, 74, 0.4)' : '0 4px 12px rgba(0,0,0,0.3)',
          transition: 'all 0.25s ease'
        }}
        title={soundActive ? 'Mute Cybernetic Drone' : 'Enable Cybernetic Drone'}
      >
        {soundActive ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>

      <div className="container-custom">

        {/* Desktop Circuit Tree Visualizer */}
        <div style={{ position: 'relative', width: '100%', minHeight: '560px', display: 'none' }} className="desktop-tree-view">
          {/* SVG Neural Circuit Connections */}
          <svg
            ref={svgRef}
            viewBox="0 0 1000 560"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}
          >
            {/* Outer Cybernetic Ring */}
            <circle cx="500" cy="280" r="220" stroke="rgba(249, 190, 74, 0.15)" strokeWidth="1.5" strokeDasharray="6 6" />
            <circle cx="500" cy="280" r="120" stroke="rgba(14, 52, 62, 0.8)" strokeWidth="1.5" />

            {/* Branch 1: Top Center (Web Dev) */}
            <path
              className="circuit-branch"
              d="M500 280 L500 70"
              stroke="#FFE18F"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Branch 2: Top Left (AI CCTV) */}
            <path
              className="circuit-branch"
              d="M500 280 L180 120"
              stroke="#F9BE4A"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Branch 3: Top Right (Software Dev) */}
            <path
              className="circuit-branch"
              d="M500 280 L820 120"
              stroke="#22d3ee"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Branch 4: Bottom Left (Student Projects) */}
            <path
              className="circuit-branch"
              d="M500 280 L160 420"
              stroke="#34d399"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Branch 5: Bottom Right (Cloud Edge) */}
            <path
              className="circuit-branch"
              d="M500 280 L840 420"
              stroke="#c084fc"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Central AI Quantum Core Node */}
          <div
            className="neural-core-center"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 225, 143, 0.3) 0%, rgba(14, 52, 62, 0.95) 70%)',
              border: '2px solid var(--accent-gold)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              boxShadow: '0 0 36px rgba(249, 190, 74, 0.45)',
              zIndex: 5
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFE18F 0%, #F9BE4A 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#07191E',
              marginBottom: '4px',
              boxShadow: '0 0 16px rgba(249, 190, 74, 0.8)'
            }}>
              <Zap size={22} />
            </div>
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#fff' }}>
              COGNISYS
            </span>
            <span style={{ fontSize: '0.62rem', color: '#FFE18F', letterSpacing: '0.08em', fontWeight: 700 }}>
              CORE LAB
            </span>
          </div>

          {/* 5 Interactive Branch Cards Positioned along the Tree */}
          {/* 1. Top Center: Web Development */}
          <div
            className="neural-node"
            style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 6 }}
            onMouseEnter={() => setActiveDomain('web-development')}
            onMouseLeave={() => setActiveDomain(null)}
          >
            <Link
              to="/services/web-development"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 20px',
                background: 'rgba(7, 25, 30, 0.95)',
                border: '1.5px solid #FFE18F',
                borderRadius: '30px',
                color: '#fff',
                textDecoration: 'none',
                boxShadow: '0 0 24px rgba(255, 225, 143, 0.35)',
                transition: 'all 0.25s ease'
              }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255, 225, 143, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFE18F' }}>
                <Globe size={16} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Modern Web Development</div>
                <div style={{ fontSize: '0.72rem', color: '#FFE18F', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>React • TypeScript • FastAPI</div>
              </div>
              <ChevronRight size={16} color="#FFE18F" />
            </Link>
          </div>

          {/* 2. Top Left: AI CCTV */}
          <div
            className="neural-node"
            style={{ position: 'absolute', top: '70px', left: '60px', zIndex: 6 }}
            onMouseEnter={() => setActiveDomain('ai-cctv')}
            onMouseLeave={() => setActiveDomain(null)}
          >
            <Link
              to="/services/ai-cctv"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 20px',
                background: 'rgba(7, 25, 30, 0.95)',
                border: '1.5px solid #F9BE4A',
                borderRadius: '30px',
                color: '#fff',
                textDecoration: 'none',
                boxShadow: '0 0 24px rgba(249, 190, 74, 0.35)',
                transition: 'all 0.25s ease'
              }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(249, 190, 74, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F9BE4A' }}>
                <Eye size={16} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>AI CCTV Surveillance</div>
                <div style={{ fontSize: '0.72rem', color: '#F9BE4A', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>YOLOv11 • Real-Time RTSP</div>
              </div>
              <ChevronRight size={16} color="#F9BE4A" />
            </Link>
          </div>

          {/* 3. Top Right: Software Dev */}
          <div
            className="neural-node"
            style={{ position: 'absolute', top: '70px', right: '60px', zIndex: 6 }}
            onMouseEnter={() => setActiveDomain('software-development')}
            onMouseLeave={() => setActiveDomain(null)}
          >
            <Link
              to="/services/software-development"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 20px',
                background: 'rgba(7, 25, 30, 0.95)',
                border: '1.5px solid #22d3ee',
                borderRadius: '30px',
                color: '#fff',
                textDecoration: 'none',
                boxShadow: '0 0 24px rgba(34, 211, 238, 0.35)',
                transition: 'all 0.25s ease'
              }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(34, 211, 238, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22d3ee' }}>
                <Code size={16} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Enterprise Software & APIs</div>
                <div style={{ fontSize: '0.72rem', color: '#22d3ee', fontFamily: 'var(--font-mono)' }}>FastAPI • PostgreSQL • Microservices</div>
              </div>
              <ChevronRight size={16} color="#22d3ee" />
            </Link>
          </div>

          {/* 4. Bottom Left: Student Projects */}
          <div
            className="neural-node"
            style={{ position: 'absolute', bottom: '60px', left: '50px', zIndex: 6 }}
            onMouseEnter={() => setActiveDomain('student-projects')}
            onMouseLeave={() => setActiveDomain(null)}
          >
            <Link
              to="/services/student-projects"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 20px',
                background: 'rgba(7, 25, 30, 0.95)',
                border: '1.5px solid #34d399',
                borderRadius: '30px',
                color: '#fff',
                textDecoration: 'none',
                boxShadow: '0 0 24px rgba(52, 211, 153, 0.35)',
                transition: 'all 0.25s ease'
              }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(52, 211, 153, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399' }}>
                <GraduationCap size={16} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Student Capstone Lab</div>
                <div style={{ fontSize: '0.72rem', color: '#34d399', fontFamily: 'var(--font-mono)' }}>IEEE Prototypes • AI Mentorship</div>
              </div>
              <ChevronRight size={16} color="#34d399" />
            </Link>
          </div>

          {/* 5. Bottom Right: Cloud Edge */}
          <div
            className="neural-node"
            style={{ position: 'absolute', bottom: '60px', right: '50px', zIndex: 6 }}
            onMouseEnter={() => setActiveDomain('cloud-edge')}
            onMouseLeave={() => setActiveDomain(null)}
          >
            <Link
              to="/services/ai-cctv"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 20px',
                background: 'rgba(7, 25, 30, 0.95)',
                border: '1.5px solid #c084fc',
                borderRadius: '30px',
                color: '#fff',
                textDecoration: 'none',
                boxShadow: '0 0 24px rgba(192, 132, 252, 0.35)',
                transition: 'all 0.25s ease'
              }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(192, 132, 252, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc' }}>
                <Server size={16} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Edge AI & Cloud Gateways</div>
                <div style={{ fontSize: '0.72rem', color: '#c084fc', fontFamily: 'var(--font-mono)' }}>NVIDIA Jetson • CUDA Edge</div>
              </div>
              <ChevronRight size={16} color="#c084fc" />
            </Link>
          </div>
        </div>

        {/* Mobile Interactive Circuit Cards (Clean, Responsive & Collision-Free) */}
        <div style={{ display: 'none', flexDirection: 'column', gap: '14px' }} className="mobile-tree-view">
          {domains.map((dom) => {
            const Icon = dom.icon;
            return (
              <div
                key={dom.id}
                className="dark-panel"
                style={{
                  padding: '18px',
                  borderLeft: `4px solid ${dom.color}`,
                  background: 'rgba(7, 25, 30, 0.95)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: `${dom.color}22`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: dom.color
                    }}>
                      <Icon size={18} />
                    </div>
                    <h3 style={{ fontSize: '1.05rem', color: '#FFFFFF', fontWeight: 700 }}>{dom.title}</h3>
                  </div>
                  <Link to={dom.path} style={{ color: dom.color, textDecoration: 'none' }}>
                    <ChevronRight size={20} />
                  </Link>
                </div>

                <p style={{ fontSize: '0.86rem', color: '#F1F5F9', lineHeight: 1.5, marginBottom: '12px', opacity: 0.95 }}>
                  {dom.desc}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {dom.stack.map((s, i) => (
                    <span key={i} style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#FFFFFF',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      border: `1px solid ${dom.color}66`
                    }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .desktop-tree-view { display: block !important; }
          .mobile-tree-view { display: none !important; }
        }
        @media (max-width: 899px) {
          .desktop-tree-view { display: none !important; }
          .mobile-tree-view { display: flex !important; }
        }
      `}</style>
    </section>
  );
};
