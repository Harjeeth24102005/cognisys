import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Sparkles, ShoppingCart, Compass } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const MobileQuickBar = () => {
  const { totalItemCount, setIsCartOpen } = useCart();
  const location = useLocation();

  // Don't show inside admin console or login
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const isOrderActive = location.pathname === '/order';

  return (
    <nav
      className="mobile-quick-bar"
      aria-label="Mobile quick actions"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 990,
        background: 'rgba(255, 255, 255, 0.97)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid #E2E8F0',
        boxShadow: '0 -4px 20px rgba(15, 23, 42, 0.08), 0 -1px 3px rgba(0, 0, 0, 0.04)',
        padding: '5px 8px max(6px, env(safe-area-inset-bottom, 6px))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '64px',
        boxSizing: 'border-box'
      }}
    >
      {/* 1. Direct Call Action */}
      <a
        href="tel:8248349844"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3px',
          textDecoration: 'none',
          color: '#0F172A',
          padding: '2px 0',
          flex: 1,
          minWidth: 0
        }}
        className="mobile-tap-active"
        aria-label="Call Cognisys"
      >
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'rgba(0, 180, 216, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00B4D8',
          flexShrink: 0
        }}>
          <Phone size={15} />
        </div>
        <span style={{ 
          fontSize: '0.68rem', 
          fontWeight: 700, 
          fontFamily: 'var(--font-mono)',
          lineHeight: '1.2',
          whiteSpace: 'nowrap'
        }}>
          Call
        </span>
      </a>

      {/* 2. WhatsApp Inquire */}
      <a
        href="https://wa.me/918248349844?text=Hello%20Cognisys%2C%20I%20would%20like%20to%20inquire%20about%20your%20technology%20solutions."
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3px',
          textDecoration: 'none',
          color: '#0F172A',
          padding: '2px 0',
          flex: 1,
          minWidth: 0
        }}
        className="mobile-tap-active"
        aria-label="WhatsApp Cognisys"
      >
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'rgba(16, 185, 129, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#10B981',
          flexShrink: 0
        }}>
          <MessageCircle size={15} />
        </div>
        <span style={{ 
          fontSize: '0.68rem', 
          fontWeight: 700, 
          fontFamily: 'var(--font-mono)',
          lineHeight: '1.2',
          whiteSpace: 'nowrap'
        }}>
          WhatsApp
        </span>
      </a>

      {/* 3. Featured Build Order CTA - Symmetrically aligned with icon row and label baseline */}
      <Link
        to="/order"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3px',
          textDecoration: 'none',
          padding: '2px 0',
          flex: 1,
          minWidth: 0
        }}
        className="mobile-tap-active"
        aria-label="Build Order"
      >
        <div style={{
          width: '34px',
          height: '32px',
          borderRadius: '10px',
          background: isOrderActive
            ? 'linear-gradient(135deg, #0B132B 0%, #0284C7 100%)'
            : 'linear-gradient(135deg, #0284C7 0%, #00B4D8 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          boxShadow: isOrderActive
            ? '0 3px 10px rgba(11, 19, 43, 0.35)'
            : '0 3px 10px rgba(2, 132, 199, 0.35)',
          flexShrink: 0,
          transition: 'all 0.2s ease'
        }}>
          <Sparkles size={16} color="#FFFFFF" />
        </div>
        <span style={{ 
          fontSize: '0.68rem', 
          fontWeight: 800, 
          fontFamily: 'var(--font-mono)',
          color: isOrderActive ? '#0B132B' : '#0284C7',
          lineHeight: '1.2',
          whiteSpace: 'nowrap'
        }}>
          Build Order
        </span>
      </Link>

      {/* 4. Engineering Cart Drawer Trigger with Badge */}
      <button
        type="button"
        onClick={() => setIsCartOpen(true)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3px',
          background: 'transparent',
          border: 'none',
          color: '#0F172A',
          padding: '2px 0',
          cursor: 'pointer',
          flex: 1,
          minWidth: 0
        }}
        className="mobile-tap-active"
        aria-label="Open engineering cart"
      >
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'rgba(2, 132, 199, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#0284C7',
          position: 'relative',
          flexShrink: 0
        }}>
          <ShoppingCart size={15} />
          {totalItemCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-3px',
              right: '-4px',
              background: '#0284C7',
              color: '#FFFFFF',
              fontSize: '0.6rem',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #FFFFFF',
              boxShadow: '0 2px 5px rgba(2, 132, 199, 0.4)'
            }}>
              {totalItemCount}
            </span>
          )}
        </div>
        <span style={{ 
          fontSize: '0.68rem', 
          fontWeight: 700, 
          fontFamily: 'var(--font-mono)',
          lineHeight: '1.2',
          whiteSpace: 'nowrap'
        }}>
          Cart
        </span>
      </button>

      {/* 5. Services Directory */}
      <Link
        to="/services"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3px',
          textDecoration: 'none',
          color: location.pathname.startsWith('/services') ? '#7C3AED' : '#0F172A',
          padding: '2px 0',
          flex: 1,
          minWidth: 0
        }}
        className="mobile-tap-active"
        aria-label="Explore services"
      >
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: location.pathname.startsWith('/services') ? 'rgba(124, 58, 237, 0.14)' : '#F1F5F9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: location.pathname.startsWith('/services') ? '#7C3AED' : '#64748B',
          flexShrink: 0
        }}>
          <Compass size={15} />
        </div>
        <span style={{ 
          fontSize: '0.68rem', 
          fontWeight: 700, 
          fontFamily: 'var(--font-mono)',
          lineHeight: '1.2',
          whiteSpace: 'nowrap'
        }}>
          Explore
        </span>
      </Link>
    </nav>
  );
};
