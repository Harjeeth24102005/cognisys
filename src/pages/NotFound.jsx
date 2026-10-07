import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Layers, FolderGit2, Mail } from 'lucide-react';
import { SEO } from '../components/SEO';

export const NotFound = () => {
  return (
    <div style={{ paddingTop: '120px', paddingBottom: '90px', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <SEO
        title="404 — Page Not Found | Cognisys AI"
        description="The requested page could not be located on Cognisys AI. Explore our AI CCTV surveillance, web development, custom software, and project engineering solutions."
        canonical="https://cognisys.org.in/404"
      />

      <div className="container-custom" style={{ maxWidth: '680px', textAlign: 'center' }}>
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '24px',
          padding: '48px 36px',
          boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(0, 180, 216, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0284C7',
            margin: '0 auto 20px'
          }}>
            <Compass size={32} />
          </div>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: '#0284C7', fontWeight: 800, marginBottom: '8px' }}>
            STATUS CODE 404
          </div>

          <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', color: '#0B132B', marginBottom: '14px', fontWeight: 900 }}>
            Page Not Found
          </h1>

          <p style={{ fontSize: '1rem', color: '#64748B', lineHeight: 1.6, marginBottom: '32px' }}>
            The page you are looking for may have moved, had its URL updated, or is temporarily unavailable. Discover our verified engineering solutions below:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '32px' }}>
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                background: '#F8FAFC',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                color: '#0B132B',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.92rem'
              }}
            >
              <Home size={18} color="#00B4D8" />
              <span>Return to Homepage</span>
            </Link>

            <Link
              to="/services"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                background: '#F8FAFC',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                color: '#0B132B',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.92rem'
              }}
            >
              <Layers size={18} color="#7C3AED" />
              <span>Explore Services</span>
            </Link>

            <Link
              to="/projects"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                background: '#F8FAFC',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                color: '#0B132B',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.92rem'
              }}
            >
              <FolderGit2 size={18} color="#F59E0B" />
              <span>View Projects</span>
            </Link>

            <Link
              to="/contact"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                background: '#F8FAFC',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                color: '#0B132B',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.92rem'
              }}
            >
              <Mail size={18} color="#10B981" />
              <span>Contact Support</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
