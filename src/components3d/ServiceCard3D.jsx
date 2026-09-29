import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

// Map of services to their video files named with the exact service names
const SERVICE_VIDEOS = {
  // 1. AI-Based CCTV Attendance Monitoring System
  'ai-cctv-attendance': {
    filename: 'AI-Based CCTV Attendance Monitoring System.mp4',
    altFilename: 'ai-cctv-attendance.mp4',
    name: 'AI-Based CCTV Attendance Monitoring System'
  },
  'ai-cctv': {
    filename: 'AI-Based CCTV Attendance Monitoring System.mp4',
    altFilename: 'ai-cctv-attendance.mp4',
    name: 'AI-Based CCTV Attendance Monitoring System'
  },
  'AI-Based CCTV Attendance Monitoring System': {
    filename: 'AI-Based CCTV Attendance Monitoring System.mp4',
    altFilename: 'ai-cctv-attendance.mp4',
    name: 'AI-Based CCTV Attendance Monitoring System'
  },

  // 2. Websites & Modern Web Development
  'websites': {
    filename: 'Websites & Modern Web Development.mp4',
    altFilename: 'websites.mp4',
    name: 'Websites & Modern Web Development'
  },
  'web-development': {
    filename: 'Websites & Modern Web Development.mp4',
    altFilename: 'websites.mp4',
    name: 'Websites & Modern Web Development'
  },
  'Websites & Modern Web Development': {
    filename: 'Websites & Modern Web Development.mp4',
    altFilename: 'websites.mp4',
    name: 'Websites & Modern Web Development'
  },

  // 3. AI-Based Projects
  'ai-projects': {
    filename: 'AI-Based Projects.mp4',
    altFilename: 'ai-projects.mp4',
    name: 'AI-Based Projects'
  },
  'AI-Based Projects': {
    filename: 'AI-Based Projects.mp4',
    altFilename: 'ai-projects.mp4',
    name: 'AI-Based Projects'
  },

  // 4. Python-Based Projects
  'python-projects': {
    filename: 'Python-Based Projects.mp4',
    altFilename: 'python-projects.mp4',
    name: 'Python-Based Projects'
  },
  'software-development': {
    filename: 'Python-Based Projects.mp4',
    altFilename: 'python-projects.mp4',
    name: 'Python-Based Projects'
  },
  'Python-Based Projects': {
    filename: 'Python-Based Projects.mp4',
    altFilename: 'python-projects.mp4',
    name: 'Python-Based Projects'
  },

  // 5. Final Year Projects
  'final-year-projects': {
    filename: 'Final Year Projects.mp4',
    altFilename: 'final-year-projects.mp4',
    name: 'Final Year Projects'
  },
  'student-projects': {
    filename: 'Final Year Projects.mp4',
    altFilename: 'final-year-projects.mp4',
    name: 'Final Year Projects'
  },
  'Final Year Projects': {
    filename: 'Final Year Projects.mp4',
    altFilename: 'final-year-projects.mp4',
    name: 'Final Year Projects'
  },

  // 6. Face Recognition System
  'face-recognition': {
    filename: 'Face Recognition System.mp4',
    altFilename: 'face-recognition.mp4',
    name: 'Face Recognition System'
  },
  'Face Recognition System': {
    filename: 'Face Recognition System.mp4',
    altFilename: 'face-recognition.mp4',
    name: 'Face Recognition System'
  }
};

/**
 * Resolve video file source for a given service slug or name
 */
export function getServiceVideoData(identifier) {
  if (!identifier) return null;
  const key = typeof identifier === 'string' ? identifier.trim() : '';
  const item = SERVICE_VIDEOS[key];
  if (item) {
    return {
      primaryUrl: getAssetUrl(`/videos/${encodeURIComponent(item.filename)}`),
      name: item.name
    };
  }
  // Generic fallback if not matched directly
  return {
    primaryUrl: getAssetUrl(`/videos/${encodeURIComponent(key)}.mp4`),
    name: key
  };
}

/**
 * ServiceCard3D Component
 * Replaces the Three.js 3D animation with the respective service video background
 */
export const ServiceCard3D = ({
  slug,
  name,
  poster,
  isThumbnail = false,
  className = '',
  style = {}
}) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const videoData = getServiceVideoData(name || slug);

  // Auto-play video on mount
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = isMuted;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay policy or low power mode
            setIsPlaying(false);
          });
      }
    }
  }, [slug, name, isMuted]);

  const togglePlay = (e) => {
    e.stopPropagation();
    e.preventDefault();
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
    e.stopPropagation();
    e.preventDefault();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen().catch(() => {});
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  // Thumbnail mode (used in service catalog card banners)
  if (isThumbnail) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#0F172A',
          ...style
        }}
        className={className}
      >
        {!hasError && videoData ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster={poster}
            onError={() => setHasError(true)}
            onLoadedData={() => setIsLoaded(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.4s ease, opacity 0.3s ease',
              opacity: isLoaded ? 1 : 0.85
            }}
          >
            <source src={videoData.primaryUrl} type="video/mp4" />
          </video>
        ) : (
          <img
            src={poster}
            alt={name || slug}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>
    );
  }

  // Showcase / Detail mode (replaces the interactive 3D visualizer in ServiceDetail)
  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '100%',
        height: '240px',
        position: 'relative',
        background: '#0B132B',
        borderRadius: 'var(--radius-lg, 16px)',
        overflow: 'hidden',
        border: '1px solid #E2E8F0',
        boxShadow: '0 12px 30px -4px rgba(15, 23, 42, 0.18)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
      className={`service-video-container ${className}`}
    >
      {!hasError && videoData ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster={poster}
          onError={() => setHasError(true)}
          onLoadedData={() => setIsLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.5s ease',
            transform: isHovered ? 'scale(1.02)' : 'scale(1)'
          }}
        >
          <source src={videoData.primaryUrl} type="video/mp4" />
        </video>
      ) : (
        <img
          src={poster}
          alt={name || slug}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}

      {/* Subtle Bottom Ambient Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(11, 19, 43, 0.75) 0%, rgba(11, 19, 43, 0.1) 40%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      {/* Live Badge Top Right */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(0, 180, 216, 0.35)',
          padding: '4px 10px',
          borderRadius: '9999px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.68rem',
          fontFamily: 'var(--font-mono, monospace)',
          fontWeight: 700,
          color: '#00B4D8',
          letterSpacing: '0.04em',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#10B981',
            boxShadow: '0 0 8px #10B981'
          }}
        />
        <span>PRODUCTION VIDEO</span>
      </div>

      {/* Video Interactive Controls Floating Bar (Appears on Hover or When Paused) */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          right: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          opacity: isHovered || !isPlaying ? 1 : 0.85,
          transition: 'opacity 0.25s ease',
          zIndex: 3
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Play / Pause Toggle Button */}
          <button
            onClick={togglePlay}
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              transition: 'transform 0.15s ease, background 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            title={isPlaying ? 'Pause Video' : 'Play Video'}
            aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} style={{ marginLeft: '2px' }} />}
          </button>

          {/* Mute / Unmute Toggle Button */}
          <button
            onClick={toggleMute}
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              transition: 'transform 0.15s ease, background 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} color="#00B4D8" />}
          </button>
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          style={{
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transition: 'transform 0.15s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          title="Fullscreen View"
          aria-label="Fullscreen View"
        >
          <Maximize2 size={15} />
        </button>
      </div>
    </div>
  );
};

export const ServiceVideo = ServiceCard3D;
