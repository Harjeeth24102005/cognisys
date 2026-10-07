import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Eye, Globe, Code, GraduationCap, ArrowRight, CheckCircle2, 
  Sparkles, Layers, Cpu, ShieldCheck, ChevronRight 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ServiceCard3D } from '../components3d/ServiceCard3D';
import { api } from '../services/api';
import { CORE_SERVICES } from '../data/servicesData';
import { getAssetUrl } from '../utils/assets';
import { SEO } from '../components/SEO';

export const Services = () => {
  const [services, setServices] = useState(CORE_SERVICES);
  const location = useLocation();
  const [orderSuccessBanner, setOrderSuccessBanner] = useState(null);

  useEffect(() => {
    if (location.state?.orderSuccess) {
      setOrderSuccessBanner({
        orderNumber: location.state.orderNumber || 'COG-2026',
        serviceName: location.state.serviceName || 'Custom Engineering Solution'
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      try {
        confetti({
          particleCount: 130,
          spread: 85,
          origin: { y: 0.3 }
        });
      } catch (err) {}
    }
  }, [location.state]);

  useEffect(() => {
    api.getServices()
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const merged = CORE_SERVICES.map(core => {
            const remote = data.find(d => d.slug === core.slug);
            if (!remote) return core;
            let parsedTechs = core.technologies;
            let parsedFeatures = core.features;
            try {
              if (remote.technologies_json) parsedTechs = JSON.parse(remote.technologies_json);
              if (remote.features_json) parsedFeatures = JSON.parse(remote.features_json);
            } catch (e) {}
            return {
              ...core,
              ...remote,
              icon: core.icon,
              color: core.color,
              image: core.image,
              technologies: parsedTechs,
              features: parsedFeatures
            };
          });
          setServices(merged);
        }
      })
      .catch(err => console.log('Using default services:', err));
  }, []);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' }
  ];

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': 'Cognisys Engineering Solutions & Service Catalog',
    'description': 'Production-grade engineering solutions spanning edge computer vision, AI CCTV, modern web applications, scalable enterprise systems, and academic capstones.',
    'url': 'https://cognisys.org.in/services',
    'hasPart': services.map(svc => ({
      '@type': 'Service',
      'name': svc.name,
      'description': svc.short_desc,
      'url': `https://cognisys.org.in/services/${svc.slug}`
    }))
  };

  return (
    <div style={{ paddingTop: '72px' }}>
      <SEO
        title="Cognisys AI Service Catalog | AI, Computer Vision, Web & Software Solutions"
        description="Explore Cognisys engineering services: AI CCTV surveillance, face recognition attendance, modern web development, custom software, Python, and capstone project development in India."
        keywords="Cognisys services, AI CCTV surveillance, face recognition system, computer vision solutions, modern web development, Python projects, final year projects, custom software development"
        canonical="https://cognisys.org.in/services"
        breadcrumbs={breadcrumbs}
        schema={collectionSchema}
      />

      {/* Header */}
      <section style={{ padding: '60px 0 40px', textAlign: 'center', background: 'radial-gradient(circle at 50% 0%, rgba(0, 180, 216, 0.08) 0%, transparent 60%)' }}>
        <div className="container-custom">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Link to="/" style={{ color: '#64748B', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>Home</Link>
            <span style={{ color: '#94A3B8', fontSize: '0.85rem' }}>/</span>
            <span style={{ color: '#0284C7', fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>Services</span>
          </nav>

          {orderSuccessBanner && (
            <div style={{
              background: '#F0FDF4',
              border: '1px solid #86EFAC',
              borderRadius: '16px',
              padding: '18px 24px',
              maxWidth: '740px',
              margin: '0 auto 28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.12)',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: '#DCFCE7',
                  border: '1px solid #86EFAC',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#15803D',
                  flexShrink: 0
                }}>
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '2px' }}>
                    <span style={{ fontWeight: 800, color: '#166534', fontSize: '1.02rem' }}>
                      Project Details Submitted Successfully!
                    </span>
                    <span style={{
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: '#15803D',
                      fontSize: '0.76rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '8px',
                      fontFamily: 'var(--font-mono)'
                    }}>
                      #{orderSuccessBanner.orderNumber}
                    </span>
                  </div>
                  <div style={{ color: '#15803D', fontSize: '0.86rem', lineHeight: 1.4 }}>
                    Your specifications were delivered to <strong>contact.cognisys@gmail.com</strong>. Our engineering team will review and contact you shortly.
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOrderSuccessBanner(null)}
                style={{
                  background: '#DCFCE7',
                  border: 'none',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#15803D',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  flexShrink: 0
                }}
                title="Dismiss"
                aria-label="Dismiss banner"
              >
                ×
              </button>
            </div>
          )}

          <div className="badge badge-cyan" style={{ marginBottom: '14px' }}>
            <Sparkles size={13} color="#00B4D8" />
            <span>SOLUTIONS DIRECTORY</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: '#0B132B', marginBottom: '16px', fontWeight: 900 }}>
            COGNISYS SERVICE CATALOG
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#1E293B', maxWidth: '640px', margin: '0 auto', lineHeight: 1.65, fontWeight: 500 }}>
            Production-grade engineering solutions spanning edge computer vision, modern web applications, scalable enterprise systems, and academic capstones.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding" style={{ paddingTop: '20px' }}>
        <div className="container-custom">
          <div className="services-grid-3col">
            {services.map((svc) => {
              const cardImage = getAssetUrl(svc.image || '/images/card-software.jpg');
              let features = Array.isArray(svc.features) ? svc.features : [];
              let techs = Array.isArray(svc.technologies) ? svc.technologies : [];
              try {
                if (!features.length && svc.features_json) features = JSON.parse(svc.features_json);
                if (!techs.length && svc.technologies_json) techs = JSON.parse(svc.technologies_json);
              } catch (e) {}

              return (
                <div key={svc.slug || svc.id} className="glass-panel tilt-card service-card-container" style={{ padding: 0, display: 'flex', flexDirection: 'column', background: '#FFFFFF', overflow: 'hidden', borderRadius: 'var(--radius-lg)', border: '1px solid #E2E8F0', height: '100%' }}>
                  <div className="service-card-banner" style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                    <ServiceCard3D
                      slug={svc.slug}
                      name={svc.name}
                      poster={cardImage}
                      isThumbnail={true}
                    />
                    <div className="service-card-overlay" style={{ pointerEvents: 'none' }} />
                    <div style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '16px',
                      right: '16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      zIndex: 3,
                      pointerEvents: 'none'
                    }}>
                      <span className="badge badge-purple" style={{ margin: 0, background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)' }}>
                        {svc.category}
                      </span>
                    </div>
                  </div>

                  <div style={{ padding: '24px 28px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ fontSize: '1.3rem', color: '#0B132B', marginBottom: '12px', fontWeight: 800, minHeight: '3.2rem', lineHeight: 1.25 }}>
                      {svc.name}
                    </h2>

                    <p style={{ fontSize: '0.92rem', color: '#1E293B', lineHeight: 1.6, marginBottom: '20px', fontWeight: 500, minHeight: '4.2rem' }}>
                      {svc.short_desc}
                    </p>

                    {/* Features List */}
                    <div style={{ marginBottom: '24px', flex: 1 }}>
                      <h4 style={{ fontSize: '0.82rem', color: '#0284C7', fontFamily: 'var(--font-mono)', marginBottom: '12px', letterSpacing: '0.04em', fontWeight: 700 }}>
                        KEY CAPABILITIES:
                      </h4>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                        {features.slice(0, 3).map((f, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.86rem', color: '#0F172A', fontWeight: 500 }}>
                            <CheckCircle2 size={15} color="#00B4D8" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px', minHeight: '26px' }}>
                      {techs.slice(0, 5).map((t, idx) => (
                        <span key={idx} style={{
                          fontSize: '0.74rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 600,
                          background: 'rgba(0, 180, 216, 0.08)',
                          border: '1px solid rgba(0, 180, 216, 0.22)',
                          padding: '3px 9px',
                          borderRadius: '6px',
                          color: '#0284C7'
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action Row */}
                    <div style={{
                      marginTop: 'auto',
                      paddingTop: '20px',
                      borderTop: '1px solid #E2E8F0',
                      display: 'flex',
                      gap: '12px'
                    }}>
                      <Link
                        to={`/services/${svc.slug}`}
                        className="btn-secondary"
                        style={{ flex: 1, fontSize: '0.85rem', padding: '10px 14px', textAlign: 'center' }}
                      >
                        Learn More
                      </Link>
                      <Link
                        to={`/order?service=${svc.slug}`}
                        className="btn-primary"
                        style={{ flex: 1.3, fontSize: '0.82rem', padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', textDecoration: 'none' }}
                      >
                        <Sparkles size={14} />
                        <span>Customise Your Order</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
