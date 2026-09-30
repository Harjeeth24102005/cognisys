import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Play, Pause, Volume2, VolumeX, Maximize2, 
  Eye, EyeOff, ShieldCheck, CheckCircle2, Sparkles, Cpu, Layers 
} from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export const AboutStoryExperience = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const [cctvSubStep, setCctvSubStep] = useState(2);
  const [studentDomain, setStudentDomain] = useState(0);

  const videoRef = useRef(null);
  const viewportRef = useRef(null);

  const stages = [
    {
      id: 0,
      title: "COGNISYS AI CORE",
      subtitle: "INTELLIGENCE IN MOTION",
      videoFile: "COGNISYS AI.mp4",
      category: "ARTIFICIAL INTELLIGENCE & NEURAL SYSTEMS",
      desc: "Explore how Cognisys bridges state-of-the-art artificial intelligence, computer vision, and modern software architectures into practical, production-ready enterprise systems.",
      cta: "Explore AI Solutions",
      link: "/services/ai-projects",
      color: "#00B4D8"
    },
    {
      id: 1,
      title: "AI CCTV MONITORING & INTELLIGENT SURVEILLANCE",
      subtitle: "REAL-TIME FACE TRACKING & BIOMETRICS",
      videoFile: "AI-Based CCTV Attendance Monitoring System.mp4",
      category: "COMPUTER VISION & SURVEILLANCE",
      desc: "Watch as incoming camera feeds are processed with sub-50ms latency. Detect human presence, track facial landmarks in real time, verify identity against secure databases, and automate attendance while triggering instant security alarms.",
      cta: "Explore AI CCTV Solution",
      link: "/services/ai-cctv-attendance",
      color: "#00B4D8"
    },
    {
      id: 2,
      title: "HIGH-PERFORMANCE WEB DEVELOPMENT",
      subtitle: "MODERN WEB PLATFORMS & CLOUD APPLICATIONS",
      videoFile: "Websites & Modern Web Development.mp4",
      category: "WEB APPLICATIONS & PLATFORMS",
      desc: "Modern digital products designed for speed, security, and visual excellence. From responsive React frontends to scalable Python FastAPI REST backends and cloud database architectures.",
      cta: "Explore Web Development",
      link: "/services/websites",
      color: "#0284C7"
    },
    {
      id: 3,
      title: "CUSTOM SOFTWARE SYSTEMS & CLOUD ARCHITECTURE",
      subtitle: "DISTRIBUTED MICROSERVICES & AUTOMATION",
      videoFile: "CUSTOM SOFTWARE SYSTEMS & CLOUD ARCHITECTURE.mp4",
      category: "PYTHON & AUTOMATION ENGINEERING",
      desc: "End-to-end software engineering for mission-critical operations. Asynchronous queues, containerized microservices, automated CI/CD pipelines, and high-concurrency database architectures.",
      cta: "Explore Software Systems",
      link: "/services/python-projects",
      color: "#7C3AED"
    },
    {
      id: 4,
      title: "STUDENT INNOVATION LAB & CAPSTONES",
      subtitle: "FROM IDEA TO WORKING IEEE PROTOTYPE",
      videoFile: "Final Year Projects.mp4",
      category: "ACADEMIC & RESEARCH LAB",
      desc: "Complete hands-on development, mentoring, and source code for university final-year engineering projects in AI/ML, Computer Vision, Data Science, IoT, Robotics, and Full-Stack Engineering.",
      cta: "Discuss Your Project",
      link: "/services/final-year-projects",
      color: "#F59E0B"
    }
  ];

  const currentStage = stages[activeStage];
  const videoUrl = getAssetUrl(`/videos/${encodeURI(currentStage.videoFile)}`);

  // Auto-play video on stage switch or mount
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
  }, [activeStage, isMuted]);

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
    const elem = viewportRef.current;
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

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      {/* Interactive Stage Scrub Navigation Bar */}
      <div style={{
        position: 'sticky',
        top: '72px',
        zIndex: 30,
        background: 'rgba(11, 19, 43, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '12px 0'
      }}>
        <div className="container-custom" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          overflowX: 'auto',
          gap: '10px',
          paddingBottom: '4px'
        }}>
          {stages.map((stage) => {
            const isActive = activeStage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                style={{
                  background: isActive ? 'rgba(0, 180, 216, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                  border: isActive ? '1.5px solid #00B4D8' : '1px solid rgba(255, 255, 255, 0.18)',
                  color: isActive ? '#38BDF8' : '#FFFFFF',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span style={{ color: isActive ? '#38BDF8' : '#00B4D8' }}>0{stage.id + 1}.</span>
                <span>{stage.title.split(' ')[0]} {stage.title.split(' ')[1] || ''}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Stage Viewport with Video Background */}
      <div 
        ref={viewportRef}
        className="about-experience-viewport"
      >
        {/* Dynamic Video Element */}
        <video
          ref={videoRef}
          key={videoUrl}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '100%',
            minHeight: '100%',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            filter: 'brightness(0.9) contrast(1.05)'
          }}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>

        {/* Ambient Dark Overlays for Readability & High-Tech Contrast */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: isCinemaMode 
              ? 'linear-gradient(180deg, rgba(11, 19, 43, 0.3) 0%, rgba(11, 19, 43, 0.6) 100%)'
              : 'linear-gradient(135deg, rgba(11, 19, 43, 0.88) 0%, rgba(15, 23, 42, 0.68) 50%, rgba(11, 19, 43, 0.88) 100%)',
            transition: 'background 0.35s ease',
            pointerEvents: 'none'
          }}
        />

        {/* Brand Accent Radial Lighting */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at 75% 35%, ${currentStage.color}35 0%, transparent 65%)`,
            mixBlendMode: 'screen',
            pointerEvents: 'none'
          }}
        />

        {/* Scanline Cyber Grid */}
        <div className="service-hero-overlay-scanline" />

        {/* HUD Details Overlay Card */}
        <div 
          className="story-hud-card hud-card"
          style={{
            position: 'absolute',
            bottom: '28px',
            left: '28px',
            maxWidth: '480px',
            background: 'rgba(11, 19, 43, 0.94)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(0, 180, 216, 0.4)',
            borderRadius: 'var(--radius-lg, 18px)',
            padding: '24px',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.85)',
            zIndex: 20,
            opacity: isCinemaMode ? 0 : 1,
            pointerEvents: isCinemaMode ? 'none' : 'auto',
            transform: isCinemaMode ? 'translateY(16px)' : 'translateY(0)',
            transition: 'all 0.3s ease'
          }}
        >
          {/* Top Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
            <div 
              className="badge" 
              style={{ 
                margin: 0, 
                background: 'rgba(0, 180, 216, 0.2)', 
                color: '#38BDF8', 
                borderColor: 'rgba(0, 180, 216, 0.4)',
                fontSize: '0.72rem'
              }}
            >
              STAGE 0{currentStage.id + 1} OF 05
            </div>

            <div 
              style={{
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(0, 180, 216, 0.35)',
                borderRadius: '9999px',
                padding: '3px 10px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.68rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: '#A5F3FC'
              }}
            >
              <span className="live-indicator-dot" />
              <span>FILE: {currentStage.videoFile}</span>
            </div>
          </div>

          <h2 style={{ fontSize: '1.45rem', color: '#FFFFFF', marginBottom: '4px', fontWeight: 800, lineHeight: 1.25 }}>
            {currentStage.title}
          </h2>

          <div style={{
            fontSize: '0.85rem',
            color: '#38BDF8',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            marginBottom: '14px'
          }}>
            {currentStage.subtitle}
          </div>

          <p style={{ fontSize: '0.92rem', color: '#E2E8F0', lineHeight: 1.6, marginBottom: '20px' }}>
            {currentStage.desc}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            {currentStage.link && (
              <Link to={currentStage.link} className="btn-primary" style={{ fontSize: '0.86rem', padding: '9px 20px', textDecoration: 'none' }}>
                <Sparkles size={15} />
                <span>{currentStage.cta}</span>
                <ArrowRight size={14} />
              </Link>
            )}

            <button
              onClick={() => setActiveStage(prev => (prev + 1) % stages.length)}
              className="btn-secondary"
              style={{ fontSize: '0.82rem', padding: '9px 16px', color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.25)' }}
            >
              <span>Next Stage</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Video Control Dock Floating at Bottom Right */}
        <div 
          className="service-hero-controls-dock"
          style={{ bottom: '28px', right: '28px' }}
        >
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
              {isCinemaMode ? 'CINEMA' : 'STORY VIDEO'}
            </span>
          </div>

          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="service-dock-btn"
            title={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
            aria-label={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} style={{ marginLeft: '2px' }} />}
          </button>

          {/* Mute/Unmute */}
          <button
            onClick={toggleMute}
            className={`service-dock-btn ${!isMuted ? 'active' : ''}`}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          {/* Cinema Mode Toggle */}
          <button
            onClick={() => setIsCinemaMode(prev => !prev)}
            className={`service-dock-btn ${isCinemaMode ? 'active' : ''}`}
            title={isCinemaMode ? 'Show Information Card' : 'Focus Video (Hide Card)'}
            aria-label={isCinemaMode ? 'Show Information Card' : 'Focus Video (Hide Card)'}
          >
            {isCinemaMode ? <Eye size={15} /> : <EyeOff size={15} />}
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="service-dock-btn"
            title="Fullscreen Video View"
            aria-label="Fullscreen Video View"
          >
            <Maximize2 size={15} />
          </button>
        </div>

        {/* Previous / Next Arrow Controls */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '28px',
          display: 'flex',
          gap: '8px',
          zIndex: 25
        }}>
          <button
            onClick={() => setActiveStage(prev => Math.max(0, prev - 1))}
            disabled={activeStage === 0}
            style={{
              background: 'rgba(11, 19, 43, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: activeStage === 0 ? 'not-allowed' : 'pointer',
              opacity: activeStage === 0 ? 0.35 : 1,
              transition: 'all 0.2s ease'
            }}
            title="Previous Stage"
          >
            ←
          </button>
          <button
            onClick={() => setActiveStage(prev => Math.min(stages.length - 1, prev + 1))}
            disabled={activeStage === stages.length - 1}
            style={{
              background: 'rgba(11, 19, 43, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: activeStage === stages.length - 1 ? 'not-allowed' : 'pointer',
              opacity: activeStage === stages.length - 1 ? 0.35 : 1,
              transition: 'all 0.2s ease'
            }}
            title="Next Stage"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};
