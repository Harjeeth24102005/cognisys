import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ShieldCheck, Mail, Phone, MapPin, ArrowRight, Sparkles, Clock, Lock } from 'lucide-react';
import cognisysLogoFull from '../assets/cognisys-logo-full.png';
import { getAssetUrl } from '../utils/assets';

export const Footer = () => {
  return (
    <footer className="footer-dark" style={{
      background: 'linear-gradient(180deg, #070B16 0%, #0A0F1D 100%)',
      color: '#FFFFFF',
      borderTop: '1px solid rgba(255, 255, 255, 0.12)',
      paddingTop: '72px',
      paddingBottom: '40px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container-custom">
        {/* Evenly Spread 4-Column Responsive Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '44px',
          marginBottom: '56px',
          width: '100%'
        }}>
          {/* Col 1: Brand & Tagline */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.98)',
              padding: '10px 18px',
              borderRadius: '14px',
              display: 'inline-block',
              alignSelf: 'flex-start',
              marginBottom: '20px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.35)'
            }}>
              <Link to="/">
                <img
                  src={cognisysLogoFull}
                  alt="COGNISYS - Innovation ✦ Intelligence ✦ Impact"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = getAssetUrl('/cognisys-logo-full.png');
                  }}
                  style={{
                    height: '50px',
                    width: 'auto',
                    maxHeight: '56px',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
              </Link>
            </div>

            <p className="footer-text" style={{
              fontSize: '1.02rem',
              color: '#E2E8F0',
              lineHeight: 1.7,
              marginBottom: '22px'
            }}>
              Pioneering intelligent AI surveillance monitoring, high-performance web systems, custom enterprise software, and university engineering innovations.
            </p>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 16px',
              borderRadius: '24px',
              background: 'rgba(0, 180, 216, 0.14)',
              border: '1px solid rgba(0, 180, 216, 0.35)',
              fontSize: '0.88rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              color: '#38BDF8',
              alignSelf: 'flex-start'
            }}>
              <ShieldCheck size={17} color="#00B4D8" />
              <span>MSME / UDYAM VERIFIED TECH ENTITY</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="footer-heading" style={{
              fontSize: '1.18rem',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.6px'
            }}>
              Solutions &amp; Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <li>
                <Link to="/services/ai-cctv-attendance" className="footer-link" style={{ color: '#E2E8F0', fontSize: '1.02rem' }}>
                  <span>AI-Based CCTV Attendance Monitoring</span>
                </Link>
              </li>
              <li>
                <Link to="/services/websites" className="footer-link" style={{ color: '#E2E8F0', fontSize: '1.02rem' }}>
                  <span>Websites &amp; Modern Web Development</span>
                </Link>
              </li>
              <li>
                <Link to="/services/ai-projects" className="footer-link" style={{ color: '#E2E8F0', fontSize: '1.02rem' }}>
                  <span>AI-Based Projects</span>
                </Link>
              </li>
              <li>
                <Link to="/services/python-projects" className="footer-link" style={{ color: '#E2E8F0', fontSize: '1.02rem' }}>
                  <span>Python-Based Projects</span>
                </Link>
              </li>
              <li>
                <Link to="/services/final-year-projects" className="footer-link" style={{ color: '#E2E8F0', fontSize: '1.02rem' }}>
                  <span>Final Year Projects</span>
                </Link>
              </li>
              <li>
                <Link to="/services/face-recognition" className="footer-link" style={{ color: '#E2E8F0', fontSize: '1.02rem' }}>
                  <span>Face Recognition System</span>
                </Link>
              </li>
              <li style={{ paddingTop: '6px' }}>
                <Link to="/services" style={{
                  color: '#38BDF8',
                  textDecoration: 'none',
                  fontSize: '1.02rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span>Explore Full Service Catalog</span>
                  <ArrowRight size={15} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Exploration */}
          <div>
            <h4 className="footer-heading" style={{
              fontSize: '1.18rem',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.6px'
            }}>
              Explore Platform
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <li>
                <Link to="/about" className="footer-link" style={{ color: '#E2E8F0', fontSize: '1.02rem' }}>
                  <span>About Cognisys</span>
                </Link>
              </li>

              <li>
                <Link to="/faq" className="footer-link" style={{ color: '#E2E8F0', fontSize: '1.02rem' }}>
                  <span>Frequently Asked Questions</span>
                </Link>
              </li>
              <li>
                <Link to="/order" style={{
                  color: '#A78BFA',
                  textDecoration: 'none',
                  fontSize: '1.02rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span>Instant Project Configurator</span>
                  <ArrowRight size={15} />
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link" style={{ color: '#94A3B8', fontSize: '0.94rem' }}>
                  <Mail size={13} />
                  <span>Engineering Help Desk</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Direct Dispatch */}
          <div>
            <h4 className="footer-heading" style={{
              fontSize: '1.18rem',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.6px'
            }}>
              Direct Contact
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li>
                <a href="tel:8248349844" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '1.05rem',
                  fontWeight: 700
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'rgba(0, 180, 216, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Phone size={16} color="#00B4D8" />
                  </div>
                  <span>+91 82483 49844</span>
                </a>
              </li>
              <li>
                <a href="mailto:contact.cognisys@gmail.com" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#E2E8F0',
                  textDecoration: 'none',
                  fontSize: '1.02rem',
                  fontWeight: 600
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'rgba(124, 58, 237, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Mail size={16} color="#A78BFA" />
                  </div>
                  <span>contact.cognisys@gmail.com</span>
                </a>
              </li>
              <li>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  color: '#CBD5E1',
                  fontSize: '0.98rem',
                  lineHeight: 1.5
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'rgba(2, 132, 199, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    <MapPin size={16} color="#38BDF8" />
                  </div>
                  <span>Engineering Operations &bull; Global Digital Delivery &bull; MSME India</span>
                </div>
              </li>
              <li>
                <div style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '0.92rem',
                  color: '#E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                  <span>Support 24/7 &bull; Average response &lt; 2 hrs</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Full-Width Bottom Strip with Even Distribution */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          paddingTop: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.96rem',
          color: '#CBD5E1',
          fontWeight: 500
        }}>
          <div>
            &copy; {new Date().getFullYear()} Cognisys Technologies. All rights reserved. Recognized MSME Entity.
          </div>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <Link to="/privacy-policy" style={{ color: '#E2E8F0', textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: '#E2E8F0', textDecoration: 'none', fontWeight: 600 }}>Terms of Service</Link>
            <Link to="/refund-policy" style={{ color: '#E2E8F0', textDecoration: 'none', fontWeight: 600 }}>Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
