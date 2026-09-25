import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, ArrowRight, ChevronDown, ChevronUp, Cpu, 
  ShieldCheck, Layers, Terminal, Sparkles, HelpCircle 
} from 'lucide-react';
import { ServiceCard3D } from '../components3d/ServiceCard3D';
import { api } from '../services/api';

export const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.getServiceBySlug(slug || 'ai-cctv-attendance')
      .then(data => setService(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div style={{ paddingTop: '140px', textAlign: 'center', minHeight: '60vh' }}>
        <div className="badge">LOADING SERVICE PROFILE...</div>
      </div>
    );
  }

  if (!service) {
    return (
      <div style={{ paddingTop: '120px', textAlign: 'center', minHeight: '60vh' }}>
        <h2 style={{ color: '#0B132B', fontSize: '1.8rem', fontWeight: 800 }}>Service Not Found</h2>
        <Link to="/services" className="btn-primary" style={{ marginTop: '20px' }}>Back to Services</Link>
      </div>
    );
  }

  let features = Array.isArray(service.features) ? service.features : [];
  let techs = Array.isArray(service.technologies) ? service.technologies : [];
  try {
    if (service.features_json && features.length === 0) features = JSON.parse(service.features_json);
    if (service.technologies_json && techs.length === 0) techs = JSON.parse(service.technologies_json);
  } catch (e) {}

  // Service specific custom FAQs and Use Cases
  const faqs = [
    {
      q: `What is the typical delivery timeline for ${service.name}?`,
      a: "Depending on scope complexity, typical prototypes and standard deployments take 2 to 4 weeks. Large enterprise pipelines or hardware integrations are structured across agile milestone sprints."
    },
    {
      q: "Do you provide full source code and documentation?",
      a: "Yes. Every client receives 100% full source code ownership, complete API documentation, deployment configurations (Docker Compose), and hands-on walkthroughs."
    },
    {
      q: "Can this solution integrate with our existing infrastructure?",
      a: "Absolutely. We build modular RESTful APIs and containerized microservices engineered to connect seamlessly with existing databases, camera networks, ERPs, and cloud providers."
    },
    {
      q: "How does the quotation and ordering process work?",
      a: "Submit your requirements via our interactive Project Order form. Our engineering team reviews the scope within 24 hours, generates an official itemized quotation on your dashboard, and development begins immediately upon acceptance."
    }
  ];

  const processSteps = [
    { num: "01", title: "Discovery & Architecture", desc: "Detailed requirements analysis, technical specification, and system architecture design." },
    { num: "02", title: "Milestone Engineering", desc: "Iterative development with bi-weekly demonstrations and real-time dashboard progress tracking." },
    { num: "03", title: "Rigorous QA & Benchmark", desc: "Latency optimization, edge hardware testing, security audit, and unit/integration tests." },
    { num: "04", title: "Deployment & Handover", desc: "Production rollout, container setup, documentation handover, and ongoing support." }
  ];

  return (
    <div style={{ paddingTop: '72px' }}>
      {/* 1. HERO SECTION */}
      <section style={{
        padding: '60px 0',
        background: 'radial-gradient(circle at 50% 0%, rgba(0, 240, 255, 0.08) 0%, transparent 60%)',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div className="container-custom">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'center'
          }}>
            <div>
              <div className="badge badge-cyan" style={{ marginBottom: '14px' }}>{service.category}</div>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#0B132B', marginBottom: '16px', lineHeight: 1.15, fontWeight: 900 }}>
                {service.name}
              </h1>
              <p style={{ fontSize: '1.05rem', color: '#1E293B', lineHeight: 1.7, marginBottom: '28px', fontWeight: 500 }}>
                {service.short_desc}
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link to={`/order?service=${service.slug}`} className="btn-primary" style={{ padding: '12px 24px' }}>
                  <span>Request This Service</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="btn-secondary" style={{ padding: '12px 24px' }}>
                  <span>Consult Engineering</span>
                </Link>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', background: '#FFFFFF' }}>
              <ServiceCard3D slug={service.slug} />
              <div style={{
                marginTop: '16px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: '#0284C7',
                fontWeight: 700
              }}>
                [ INTERACTIVE VISUALIZER ACTIVE ]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DETAILED OVERVIEW & FEATURES */}
      <section className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="container-custom">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px'
          }}>
            {/* Overview */}
            <div>
              <div className="badge badge-purple" style={{ marginBottom: '12px' }}>SYSTEM OVERVIEW</div>
              <h2 style={{ fontSize: '1.8rem', color: '#0B132B', marginBottom: '16px', fontWeight: 800 }}>
                Comprehensive Technical Scope
              </h2>
              <p style={{ fontSize: '0.98rem', color: '#1E293B', lineHeight: 1.8, marginBottom: '24px', fontWeight: 500 }}>
                {service.full_desc}
              </p>

              {/* Technologies */}
              <h4 style={{ fontSize: '0.88rem', color: '#0284C7', fontFamily: 'var(--font-mono)', marginBottom: '12px', fontWeight: 700 }}>
                STACK & FRAMEWORKS:
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {techs.map((t, i) => (
                  <span key={i} className="badge badge-cyan" style={{ fontSize: '0.78rem', padding: '6px 14px' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Features Checklist */}
            <div className="glass-panel" style={{ padding: '32px', background: '#FFFFFF' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#0B132B', marginBottom: '18px', fontWeight: 800 }}>
                Core Features & Capabilities
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {features.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'rgba(0, 180, 216, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#00B4D8',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      <CheckCircle2 size={15} />
                    </div>
                    <span style={{ fontSize: '0.92rem', color: '#0F172A', lineHeight: 1.5, fontWeight: 500 }}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ENGINEERING PROCESS */}
      <section className="section-padding" style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
            <div className="badge badge-cyan" style={{ marginBottom: '12px' }}>METHODOLOGY</div>
            <h2 style={{ fontSize: '2.2rem', color: '#0B132B', marginBottom: '12px', fontWeight: 800 }}>
              How We Deliver Your System
            </h2>
            <p style={{ color: '#1E293B', fontSize: '0.95rem', fontWeight: 500 }}>
              A disciplined, high-transparency engineering pipeline ensuring zero bottlenecks.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {processSteps.map((step, index) => (
              <div key={index} className="glass-panel" style={{ padding: '28px', background: '#FFFFFF' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: '#00B4D8',
                  marginBottom: '12px'
                }}>
                  {step.num}
                </div>
                <h4 style={{ fontSize: '1.1rem', color: '#0B132B', marginBottom: '8px', fontWeight: 700 }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#1E293B', lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FAQ ACCORDION */}
      <section className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="container-custom" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="badge badge-purple" style={{ marginBottom: '12px' }}>FREQUENTLY ASKED QUESTIONS</div>
            <h2 style={{ fontSize: '2rem', color: '#0B132B', fontWeight: 800 }}>Service Inquiries</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="glass-panel"
                  style={{
                    padding: '18px 24px',
                    cursor: 'pointer',
                    borderColor: isOpen ? '#00B4D8' : '#E2E8F0',
                    background: '#FFFFFF'
                  }}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.98rem', fontWeight: 700, color: isOpen ? '#0284C7' : '#0F172A' }}>
                      {faq.q}
                    </span>
                    {isOpen ? <ChevronUp size={18} color="#0284C7" /> : <ChevronDown size={18} color="#0F172A" />}
                  </div>
                  {isOpen && (
                    <p style={{ marginTop: '12px', fontSize: '0.9rem', color: '#1E293B', lineHeight: 1.6, borderTop: '1px solid #E2E8F0', paddingTop: '12px' }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CTA BAR */}
      <section style={{ padding: '0 0 80px', background: '#FFFFFF' }}>
        <div className="container-custom">
          <div className="glass-panel-glow" style={{ padding: '48px', textAlign: 'center', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <h2 style={{ fontSize: '2rem', color: '#0B132B', marginBottom: '12px', fontWeight: 800 }}>
              Ready to deploy {service.name}?
            </h2>
            <p style={{ fontSize: '1rem', color: '#1E293B', maxWidth: '580px', margin: '0 auto 28px', lineHeight: 1.6 }}>
              Submit your project specifications and receive an official quotation and architecture plan directly on your customer dashboard.
            </p>
            <Link to={`/order?service=${service.slug}`} className="btn-primary" style={{ padding: '14px 32px' }}>
              <span>Request This Service Now</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
