import React from 'react';
import { Cpu, Eye, Globe, Code, GraduationCap } from 'lucide-react';

export const CanvasFallback = ({ title = "COGNISYS AI Core", icon = "cpu" }) => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '380px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(circle at center, rgba(249, 190, 74, 0.08) 0%, rgba(7, 25, 30, 0.95) 75%)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-subtle)'
    }}>
      {/* Animated Glowing Orbital Rings */}
      <div style={{
        position: 'relative',
        width: '200px',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '2px dashed rgba(249, 190, 74, 0.4)',
          animation: 'spin 20s linear infinite'
        }} />
        <div style={{
          position: 'absolute',
          inset: '20px',
          borderRadius: '50%',
          border: '1px solid rgba(255, 225, 143, 0.5)',
          transform: 'rotateX(60deg)',
          animation: 'spin 12s linear infinite reverse'
        }} />
        <div style={{
          position: 'absolute',
          inset: '45px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249, 190, 74, 0.3) 0%, rgba(14, 52, 62, 0.4) 60%, transparent 100%)',
          filter: 'blur(10px)'
        }} />

        {/* Central Icon */}
        <div style={{
          position: 'relative',
          zIndex: 5,
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(255, 225, 143, 0.2) 0%, rgba(249, 190, 74, 0.2) 100%)',
          border: '1px solid var(--accent-gold)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent-gold)',
          boxShadow: '0 0 25px rgba(249, 190, 74, 0.4)'
        }}>
          {icon === 'eye' ? <Eye size={30} /> :
           icon === 'globe' ? <Globe size={30} /> :
           icon === 'code' ? <Code size={30} /> :
           icon === 'student' ? <GraduationCap size={30} /> :
           <Cpu size={30} />}
        </div>
      </div>

      <div style={{
        marginTop: '20px',
        textAlign: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
        color: '#F9BE4A',
        fontWeight: 600,
        letterSpacing: '0.1em'
      }}>
        [ {title.toUpperCase()} ]
      </div>
      <div style={{
        fontSize: '0.75rem',
        color: '#FFFFFF',
        opacity: 0.9,
        marginTop: '4px'
      }}>
        Interactive Neural Engine Active
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
