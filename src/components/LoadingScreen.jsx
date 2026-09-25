import React, { useState, useEffect } from 'react';

export const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState("INITIALIZING NEURAL SUBSYSTEMS...");

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete && onComplete(), 250);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 20) + 12;
        if (next > 40 && next < 70) setStatusText("LOADING 3D CRYSTALLINE ASSETS & COMPUTER VISION...");
        else if (next >= 70 && next < 95) setStatusText("CONNECTING FASTAPI INTELLIGENCE ENGINE...");
        else if (next >= 95) setStatusText("SYSTEM READY. WELCOME TO COGNISYS.");
        return Math.min(next, 100);
      });
    }, 90);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{ marginBottom: '28px', textAlign: 'center' }}>
        <img
          src="/cognisys-logo.png"
          alt="COGNISYS Logo"
          className="logo-blend"
          style={{
            height: '70px',
            width: 'auto',
            objectFit: 'contain',
            display: 'block',
            margin: '0 auto',
            mixBlendMode: 'multiply'
          }}
        />
      </div>

      {/* Progress Bar Container */}
      <div style={{
        width: '100%',
        maxWidth: '340px',
        height: '4px',
        background: '#E2E8F0',
        borderRadius: '4px',
        overflow: 'hidden',
        marginBottom: '14px',
        position: 'relative'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #0B132B 0%, #00B4D8 50%, #7C3AED 100%)',
          boxShadow: '0 0 12px rgba(0, 180, 216, 0.6)',
          transition: 'width 0.12s ease-out'
        }} />
      </div>

      {/* Dynamic Status Text */}
      <div style={{
        fontSize: '0.74rem',
        fontFamily: 'var(--font-mono)',
        color: '#0F172A',
        letterSpacing: '0.06em',
        textAlign: 'center',
        fontWeight: 700
      }}>
        [{progress}%] {statusText}
      </div>
    </div>
  );
};
