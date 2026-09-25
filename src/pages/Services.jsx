import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, Globe, Code, GraduationCap, ArrowRight, CheckCircle2, 
  Sparkles, Layers, Cpu, ShieldCheck, ChevronRight 
} from 'lucide-react';
import { ServiceCard3D } from '../components3d/ServiceCard3D';
import { api } from '../services/api';
import { CORE_SERVICES } from '../data/servicesData';

export const Services = () => {
  const [services, setServices] = useState(CORE_SERVICES);

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

  return (
    <div style={{ paddingTop: '72px' }}>
      {/* Header */}
      <section style={{ padding: '60px 0 40px', textAlign: 'center', background: 'radial-gradient(circle at 50% 0%, rgba(0, 180, 216, 0.08) 0%, transparent 60%)' }}>
        <div className="container-custom">
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
              const cardImage = svc.image || '/images/card-software.jpg';
              let features = Array.isArray(svc.features) ? svc.features : [];
              let techs = Array.isArray(svc.technologies) ? svc.technologies : [];
              try {
                if (!features.length && svc.features_json) features = JSON.parse(svc.features_json);
                if (!techs.length && svc.technologies_json) techs = JSON.parse(svc.technologies_json);
              } catch (e) {}

              return (
                <div key={svc.slug || svc.id} className="glass-panel tilt-card service-card-container" style={{ padding: 0, display: 'flex', flexDirection: 'column', background: '#FFFFFF', overflow: 'hidden', borderRadius: 'var(--radius-lg)', border: '1px solid #E2E8F0', height: '100%' }}>
                  <div className="service-card-banner" style={{ height: '180px' }}>
                    <img
                      src={cardImage}
                      alt={svc.name}
                      loading="lazy"
                    />
                    <div className="service-card-overlay" />
                    <div style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '16px',
                      right: '16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
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
                        style={{ flex: 1, fontSize: '0.85rem', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                      >
                        <span>Request</span>
                        <ArrowRight size={14} />
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
