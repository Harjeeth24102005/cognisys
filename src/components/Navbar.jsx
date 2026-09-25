import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Cpu, ChevronDown, Menu, X, ShoppingCart, 
  Shield, Eye, Globe, Code, GraduationCap, ArrowRight, Phone, Mail, Sparkles, Terminal 
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const { totalItemCount, setIsCartOpen } = useCart();
  const headerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Exclusive dropdown state machine: only ONE dropdown can be open at any time
  const [activeDropdown, setActiveDropdown] = useState(null); // 'services' | 'mobile' | null
  const [isScrolled, setIsScrolled] = useState(false);

  const isServicesOpen = activeDropdown === 'services';
  const isMobileMenuOpen = activeDropdown === 'mobile';

  const toggleDropdown = (name) => {
    setActiveDropdown(prev => prev === name ? null : name);
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close any open dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
  }, [location.pathname]);

  // Click outside to close any open dropdown across all interfaces
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);


  const servicesList = [
    { title: "AI-Based CCTV Attendance", path: "/services/ai-cctv-attendance", icon: Eye, desc: "Autonomous facial recognition & surveillance", color: "#00B4D8" },
    { title: "Websites & Modern Web Dev", path: "/services/websites", icon: Globe, desc: "High-performance responsive web platforms", color: "#0284C7" },
    { title: "AI-Based Projects", path: "/services/ai-projects", icon: Cpu, desc: "Deep learning, NLP & predictive neural pipelines", color: "#7C3AED" },
    { title: "Python-Based Projects", path: "/services/python-projects", icon: Terminal, desc: "FastAPI/Django APIs, scrapers & automation", color: "#0891B2" },
    { title: "Final Year Projects", path: "/services/final-year-projects", icon: GraduationCap, desc: "Verified code, IEEE papers & viva guidance", color: "#F59E0B" },
    { title: "Face Recognition System", path: "/services/face-recognition", icon: Shield, desc: "Enterprise biometric verification & anti-spoofing", color: "#10B981" }
  ];

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "FAQ", path: "/faq" },
    { title: "Contact", path: "/contact" }
  ];

  return (
    <header 
      ref={headerRef}
      style={{
        position: 'fixed',
        top: '12px',
        left: 0,
      right: 0,
      zIndex: 100,
      padding: '0 16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      pointerEvents: 'none',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      {/* Floating Pill Navbar Container */}
      <div className="navbar-pill-container" style={{
        pointerEvents: 'auto',
        width: '100%',
        maxWidth: '1280px',
        background: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderRadius: '9999px',
        border: '1px solid rgba(226, 232, 240, 0.95)',
        boxShadow: isScrolled
          ? '0 12px 36px -4px rgba(15, 23, 42, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06)'
          : '0 8px 26px -2px rgba(15, 23, 42, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
        padding: '5px 20px 5px 22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '62px',
        transition: 'all 0.3s ease',
        position: 'relative'
      }}>
        {/* Brand Logo - Seamless Multiply Blend, Full Aspect Ratio, Zero Clipping */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          padding: '4px 0',
          position: 'relative',
          overflow: 'visible'
        }}>
          <img
            src="/cognisys-logo-full.png"
            alt="COGNISYS - Innovation ✦ Intelligence ✦ Impact"
            className="logo-blend navbar-logo"
            style={{
              height: '56px',
              width: 'auto',
              maxHeight: '62px',
              objectFit: 'contain',
              display: 'block',
              mixBlendMode: 'multiply'
            }}
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{ alignItems: 'center', gap: '6px' }} className="desktop-nav">
          <Link
            to="/"
            style={{
              color: location.pathname === '/' ? '#0284C7' : '#0F172A',
              textDecoration: 'none',
              fontSize: '0.92rem',
              fontWeight: location.pathname === '/' ? 700 : 600,
              padding: '7px 15px',
              borderRadius: '20px',
              background: location.pathname === '/' ? 'rgba(0, 180, 216, 0.08)' : 'transparent',
              border: location.pathname === '/' ? '1px solid rgba(0, 180, 216, 0.25)' : '1px solid transparent',
              transition: 'all 0.2s ease'
            }}
          >
            Home
          </Link>

          <Link
            to="/about"
            style={{
              color: location.pathname === '/about' ? '#0284C7' : '#0F172A',
              textDecoration: 'none',
              fontSize: '0.92rem',
              fontWeight: location.pathname === '/about' ? 700 : 600,
              padding: '7px 15px',
              borderRadius: '20px',
              background: location.pathname === '/about' ? 'rgba(0, 180, 216, 0.08)' : 'transparent',
              border: location.pathname === '/about' ? '1px solid rgba(0, 180, 216, 0.25)' : '1px solid transparent',
              transition: 'all 0.2s ease'
            }}
          >
            About
          </Link>

          {/* Services Dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setActiveDropdown('services')}
            onMouseLeave={() => setActiveDropdown(prev => prev === 'services' ? null : prev)}
          >
            <button
              type="button"
              onClick={() => toggleDropdown('services')}
              style={{
                background: location.pathname.startsWith('/services') ? 'rgba(0, 180, 216, 0.08)' : 'transparent',
                border: location.pathname.startsWith('/services') ? '1px solid rgba(0, 180, 216, 0.25)' : '1px solid transparent',
                borderRadius: '20px',
                color: location.pathname.startsWith('/services') ? '#0284C7' : '#0F172A',
                fontSize: '0.92rem',
                fontWeight: location.pathname.startsWith('/services') ? 700 : 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '7px 15px',
                transition: 'all 0.2s ease'
              }}
            >
              <span>Services</span>
              <ChevronDown size={14} style={{ transform: isServicesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: '#0284C7' }} />
            </button>

            {isServicesOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '-60px',
                width: '340px',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                padding: '14px',
                boxShadow: '0 20px 40px -8px rgba(15, 23, 42, 0.12), 0 4px 12px rgba(0, 180, 216, 0.08)',
                zIndex: 50
              }}>
                <div style={{ padding: '6px 10px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#0F172A', fontWeight: 800, letterSpacing: '0.08em' }}>
                  OUR SOLUTIONS CATALOG
                </div>
                {servicesList.map((svc, i) => {
                  const Icon = svc.icon;
                  return (
                    <Link
                      key={i}
                      to={svc.path}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        padding: '10px',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        color: '#0F172A',
                        transition: 'background 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <div style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '8px',
                        background: 'rgba(0, 180, 216, 0.08)',
                        border: '1px solid rgba(0, 180, 216, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: svc.color,
                        flexShrink: 0
                      }}>
                        <Icon size={17} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0F172A' }}>{svc.title}</div>
                        <div style={{ fontSize: '0.75rem', color: '#1E293B', marginTop: '2px', fontWeight: 500 }}>{svc.desc}</div>
                      </div>
                    </Link>
                  );
                })}
                <div style={{ borderTop: '1px solid #F1F5F9', marginTop: '8px', paddingTop: '8px' }}>
                  <Link
                    to="/about#services"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      color: '#0284C7',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      textDecoration: 'none'
                    }}
                  >
                    <span>View Full Catalog</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            )}
          </div>




          <Link
            to="/faq"
            style={{
              color: location.pathname === '/faq' ? '#0284C7' : '#0F172A',
              textDecoration: 'none',
              fontSize: '0.92rem',
              fontWeight: location.pathname === '/faq' ? 700 : 600,
              padding: '7px 15px',
              borderRadius: '20px',
              background: location.pathname === '/faq' ? 'rgba(0, 180, 216, 0.08)' : 'transparent',
              border: location.pathname === '/faq' ? '1px solid rgba(0, 180, 216, 0.25)' : '1px solid transparent',
              transition: 'all 0.2s ease'
            }}
          >
            FAQ
          </Link>

          <Link
            to="/contact"
            style={{
              color: location.pathname === '/contact' ? '#0284C7' : '#0F172A',
              textDecoration: 'none',
              fontSize: '0.92rem',
              fontWeight: location.pathname === '/contact' ? 700 : 600,
              padding: '7px 15px',
              borderRadius: '20px',
              background: location.pathname === '/contact' ? 'rgba(0, 180, 216, 0.08)' : 'transparent',
              border: location.pathname === '/contact' ? '1px solid rgba(0, 180, 216, 0.25)' : '1px solid transparent',
              transition: 'all 0.2s ease'
            }}
          >
            Contact
          </Link>
        </nav>

        {/* Right Side Actions: Cart, Order CTA & Mobile Menu Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Engineering Cart Drawer Trigger */}
          <button
            onClick={() => {
              closeAllDropdowns();
              setIsCartOpen(true);
            }}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: 'var(--radius-full)',
              padding: '7px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              color: '#0F172A',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#00B4D8';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 180, 216, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#E2E8F0';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
          >
            <ShoppingCart size={16} color="#0284C7" />
            <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>Cart</span>
            {totalItemCount > 0 && (
              <span style={{
                background: 'linear-gradient(135deg, #0284C7 0%, #00B4D8 100%)',
                color: '#FFFFFF',
                borderRadius: '10px',
                padding: '1px 6px',
                fontSize: '0.7rem',
                fontWeight: 800
              }}>
                {totalItemCount}
              </span>
            )}
          </button>

          {/* Action CTA Button */}
          <Link
            to="/order"
            className="navbar-order-btn"
            style={{
              background: 'linear-gradient(135deg, #0284C7 0%, #00B4D8 100%)',
              color: '#FFFFFF',
              borderRadius: '9999px',
              padding: '9px 20px',
              fontSize: '0.84rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(0, 180, 216, 0.35)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 180, 216, 0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 180, 216, 0.35)';
            }}
          >
            <Sparkles size={14} />
            <span>Configure Project</span>
          </Link>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => toggleDropdown('mobile')}
            className="mobile-menu-btn"
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              width: '38px',
              height: '38px',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0F172A',
              cursor: 'pointer'
            }}
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div style={{
          pointerEvents: 'auto',
          position: 'fixed',
          top: '78px',
          left: '16px',
          right: '16px',
          maxWidth: '1280px',
          margin: '0 auto',
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: '20px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 20px 40px rgba(15, 23, 42, 0.15)',
          padding: '20px 24px 30px',
          maxHeight: 'calc(100vh - 100px)',
          overflowY: 'auto'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                onClick={closeAllDropdowns}
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  color: location.pathname === link.path ? '#0284C7' : '#0F172A',
                  fontWeight: location.pathname === link.path ? 700 : 600,
                  fontSize: '1rem',
                  background: location.pathname === link.path ? 'rgba(0, 180, 216, 0.08)' : '#F8FAFC',
                  border: '1px solid',
                  borderColor: location.pathname === link.path ? 'rgba(0, 180, 216, 0.25)' : '#F1F5F9',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>{link.title}</span>
                <ArrowRight size={15} color="#00B4D8" />
              </Link>
            ))}

            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>
                Solutions & Services
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {servicesList.map((svc, i) => (
                  <Link
                    key={i}
                    to={svc.path}
                    onClick={closeAllDropdowns}
                    style={{
                      padding: '10px',
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      color: '#0F172A',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <span style={{ color: svc.color }}>{svc.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link
                to="/order"
                onClick={closeAllDropdowns}
                className="btn-primary"
                style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <Sparkles size={15} />
                <span>Configure Project</span>
                <ArrowRight size={15} />
              </Link>
              <Link
                to="/contact"
                onClick={closeAllDropdowns}
                className="btn-secondary"
                style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <Mail size={15} color="#0284C7" />
                <span>Contact Engineering</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Global Responsive Style Overrides for Navbar */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .desktop-contact-tag { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 899px) {
          .desktop-nav { display: none !important; }
          .desktop-contact-tag { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (max-width: 640px) {
          .navbar-pill-container {
            padding: 5px 12px 5px 14px !important;
            min-height: 52px !important;
          }
          .navbar-logo {
            height: 38px !important;
            max-height: 42px !important;
          }
          .navbar-order-btn {
            display: none !important;
          }
        }
        @media (max-width: 360px) {
          .navbar-pill-container {
            padding: 4px 8px 4px 10px !important;
          }
          .navbar-logo {
            height: 32px !important;
            max-height: 36px !important;
          }
        }
      `}</style>
    </header>
  );
};
