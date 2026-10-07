import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FolderGit2, ArrowRight, CheckCircle2, Sparkles, 
  ExternalLink, Layers, Cpu, ShieldCheck, ChevronDown, ChevronUp, Terminal 
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { COMPLETED_PROJECTS } from '../data/projectsData';

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'vision', label: 'Computer Vision & CCTV' },
    { key: 'biometrics', label: 'Biometrics & Access' },
    { key: 'web', label: 'Web Applications & SaaS' },
    { key: 'software', label: 'Custom Software & Microservices' },
    { key: 'student', label: 'Student Capstones & IoT' }
  ];

  const filteredProjects = activeFilter === 'all'
    ? COMPLETED_PROJECTS
    : COMPLETED_PROJECTS.filter(p => p.categoryKey === activeFilter);

  const faqs = [
    {
      q: "What types of engineering projects does Cognisys build?",
      a: "Cognisys develops end-to-end commercial solutions including AI CCTV multi-camera analytics, contactless face recognition attendance systems, high-speed modern React/Next.js web platforms, asynchronous Python microservices, and university engineering capstone prototypes across CSE, IT, AI/DS, and ECE."
    },
    {
      q: "Can I commission a custom project tailored to my specific requirements?",
      a: "Yes. Use our interactive Customise Your Order configurator to submit your system requirements, preferred tech stack, and timeline. Our engineering leads analyze the scope within 24 hours and provide an itemized architecture proposal and transparent quotation."
    },
    {
      q: "Does Cognisys provide complete source code ownership for completed projects?",
      a: "Yes. Every completed project includes 100% unencumbered source code ownership, complete API specifications, Docker container configurations, architectural dataflow diagrams, and setup walkthroughs."
    },
    {
      q: "How does Cognisys support final year engineering student projects?",
      a: "For university students, we provide verified working source code, IEEE base paper implementations, clear novelty statements, full project documentation, circuit schematics, and one-on-one technical viva coaching to ensure complete mastery during project defense."
    }
  ];

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Projects', url: '/projects' }
  ];

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Cognisys Engineering Projects & Case Studies',
    'description': 'Verified engineering implementations across AI CCTV, biometric verification, modern web systems, and student capstones.',
    'numberOfItems': COMPLETED_PROJECTS.length,
    'itemListElement': COMPLETED_PROJECTS.map((proj, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'name': proj.title,
      'description': proj.description,
      'url': `https://cognisys.org.in/projects#${proj.slug}`
    }))
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(f => ({
      '@type': 'Question',
      'name': f.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': f.a
      }
    }))
  };

  return (
    <div style={{ paddingTop: '72px' }}>
      <SEO
        title="Cognisys AI Engineering Projects | Case Studies & Capstone Innovations"
        description="Explore verified engineering projects developed by Cognisys: AI CCTV surveillance analytics, cloud telemetry dashboards, enterprise microservices, and student capstones in India."
        keywords="Cognisys projects, engineering projects, AI projects, computer vision projects, Python projects, web development projects, final year projects, college projects, project development company India"
        canonical="https://cognisys.org.in/projects"
        breadcrumbs={breadcrumbs}
        schema={[itemListSchema, faqSchema]}
      />

      {/* Header Banner */}
      <section style={{ 
        padding: '60px 0 36px', 
        textAlign: 'center', 
        background: 'radial-gradient(circle at 50% 0%, rgba(0, 180, 216, 0.08) 0%, transparent 65%)',
        borderBottom: '1px solid #E2E8F0'
      }}>
        <div className="container-custom">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Link to="/" style={{ color: '#64748B', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>Home</Link>
            <span style={{ color: '#94A3B8', fontSize: '0.85rem' }}>/</span>
            <span style={{ color: '#0284C7', fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>Projects</span>
          </nav>

          <div className="badge badge-cyan" style={{ marginBottom: '14px' }}>
            <FolderGit2 size={13} color="#00B4D8" />
            <span>PORTFOLIO &amp; CASE STUDIES</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: '#0B132B', marginBottom: '16px', fontWeight: 900 }}>
            COGNISYS ENGINEERING PROJECTS
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#1E293B', maxWidth: '680px', margin: '0 auto', lineHeight: 1.65, fontWeight: 500 }}>
            Verified case studies, production software deployments, and academic capstone engineering developed with modern artificial intelligence, high-performance web frameworks, and robust Python backends.
          </p>

          {/* Filter Pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '32px' }}>
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                style={{
                  background: activeFilter === cat.key ? 'linear-gradient(135deg, #0284C7 0%, #00B4D8 100%)' : '#FFFFFF',
                  color: activeFilter === cat.key ? '#FFFFFF' : '#0F172A',
                  border: activeFilter === cat.key ? '1px solid #0284C7' : '1px solid #CBD5E1',
                  borderRadius: '9999px',
                  padding: '8px 18px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeFilter === cat.key ? '0 4px 14px rgba(0, 180, 216, 0.3)' : 'none'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase Grid */}
      <section className="section-padding" style={{ background: '#F8FAFC' }}>
        <div className="container-custom">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            {filteredProjects.map((proj) => (
              <article
                key={proj.id}
                id={proj.slug}
                className="glass-panel"
                style={{
                  padding: 0,
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid #E2E8F0',
                  overflow: 'hidden',
                  boxShadow: '0 8px 30px rgba(15, 23, 42, 0.06)'
                }}
              >
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  alignItems: 'stretch'
                }}>
                  {/* Left: Image & Category Overlay */}
                  <div style={{ position: 'relative', minHeight: '260px', overflow: 'hidden', background: '#0F172A' }}>
                    <img
                      src={proj.image_url}
                      alt={`${proj.title} - Cognisys engineering project`}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(11, 19, 43, 0.85) 0%, rgba(11, 19, 43, 0.2) 60%, transparent 100%)'
                    }} />
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      display: 'flex',
                      gap: '8px',
                      flexWrap: 'wrap'
                    }}>
                      <span className="badge" style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', color: '#38BDF8', border: '1px solid rgba(56, 189, 248, 0.4)', fontSize: '0.74rem' }}>
                        {proj.category}
                      </span>
                      <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.2)', backdropFilter: 'blur(8px)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.4)', fontSize: '0.74rem' }}>
                        {proj.status}
                      </span>
                    </div>
                  </div>

                  {/* Right: Project Details */}
                  <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h2 style={{ fontSize: '1.5rem', color: '#0B132B', marginBottom: '12px', fontWeight: 800, lineHeight: 1.25 }}>
                        {proj.title}
                      </h2>
                      <p style={{ fontSize: '0.94rem', color: '#334155', lineHeight: 1.65, marginBottom: '20px', fontWeight: 500 }}>
                        {proj.description}
                      </p>

                      {/* Problem vs Solution Split */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '20px' }}>
                        <div style={{ background: '#FEF2F2', padding: '12px 14px', borderRadius: '10px', border: '1px solid #FECACA' }}>
                          <span style={{ fontSize: '0.72rem', color: '#DC2626', fontWeight: 800, fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '4px' }}>
                            CHALLENGE STATEMENT:
                          </span>
                          <p style={{ fontSize: '0.82rem', color: '#7F1D1D', margin: 0, lineHeight: 1.5 }}>
                            {proj.problem_statement}
                          </p>
                        </div>

                        <div style={{ background: '#F0FDF4', padding: '12px 14px', borderRadius: '10px', border: '1px solid #BBF7D0' }}>
                          <span style={{ fontSize: '0.72rem', color: '#16A34A', fontWeight: 800, fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '4px' }}>
                            ENGINEERING SOLUTION:
                          </span>
                          <p style={{ fontSize: '0.82rem', color: '#14532D', margin: 0, lineHeight: 1.5 }}>
                            {proj.solution_statement}
                          </p>
                        </div>
                      </div>

                      {/* Results Pills */}
                      <div style={{ marginBottom: '20px' }}>
                        <span style={{ fontSize: '0.74rem', color: '#0284C7', fontWeight: 800, fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '8px' }}>
                          VERIFIED BENCHMARKS &amp; OUTCOMES:
                        </span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {proj.results.map((r, i) => (
                            <span key={i} style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              background: '#F1F5F9',
                              border: '1px solid #CBD5E1',
                              borderRadius: '6px',
                              padding: '4px 10px',
                              fontSize: '0.8rem',
                              color: '#0F172A',
                              fontWeight: 600
                            }}>
                              <CheckCircle2 size={13} color="#00B4D8" />
                              <span>{r}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                        {proj.technologies.map((t, idx) => (
                          <span key={idx} style={{
                            fontSize: '0.74rem',
                            fontFamily: 'var(--font-mono)',
                            background: 'rgba(0, 180, 216, 0.08)',
                            border: '1px solid rgba(0, 180, 216, 0.22)',
                            borderRadius: '6px',
                            padding: '3px 9px',
                            color: '#0284C7',
                            fontWeight: 600
                          }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Row: Link to Service & Customise Order */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '12px',
                      paddingTop: '16px',
                      borderTop: '1px solid #E2E8F0'
                    }}>
                      <Link
                        to={`/services/${proj.serviceSlug}`}
                        style={{
                          color: '#0284C7',
                          textDecoration: 'none',
                          fontSize: '0.88rem',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>Explore Related Service Architecture</span>
                        <ArrowRight size={15} />
                      </Link>

                      <Link
                        to={`/order?service=${proj.serviceSlug}`}
                        className="btn-primary"
                        style={{ padding: '9px 18px', fontSize: '0.84rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        <Sparkles size={14} />
                        <span>Build Similar Project</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Process Roadmap */}
      <section className="section-padding" style={{ background: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 48px' }}>
            <div className="badge badge-purple" style={{ marginBottom: '12px' }}>PROJECT EXECUTION</div>
            <h2 style={{ fontSize: '2.2rem', color: '#0B132B', fontWeight: 800 }}>
              How Cognisys Executes Engineering Projects
            </h2>
            <p style={{ color: '#475569', fontSize: '0.98rem', marginTop: '8px' }}>
              From initial architectural specification to verified deployment, our systematic delivery model guarantees technical excellence.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {[
              { num: '01', title: 'Scope & Architecture Analysis', desc: 'Evaluating dataset feasibility, hardware requirements, latency limits, and API contracts.' },
              { num: '02', title: 'Modular Milestone Engineering', desc: 'Developing clean, decoupled modules with continuous testing and bi-weekly demonstration updates.' },
              { num: '03', title: 'Performance Benchmarking', desc: 'Testing edge inference speed, accuracy thresholds, concurrent loads, and security edge cases.' },
              { num: '04', title: 'Handover & Viva Coaching', desc: 'Delivering complete verified source code, IEEE reports, Docker setups, and 1-on-1 defense preparation.' }
            ].map((step, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '28px', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 800, color: '#00B4D8', marginBottom: '12px' }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: '1.05rem', color: '#0B132B', marginBottom: '8px', fontWeight: 700 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding" style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
        <div className="container-custom" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div className="badge badge-cyan" style={{ marginBottom: '12px' }}>PROJECT INQUIRIES</div>
            <h2 style={{ fontSize: '2rem', color: '#0B132B', fontWeight: 800 }}>
              Frequently Asked Questions About Cognisys Projects
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((f, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="glass-panel"
                  style={{
                    padding: '20px 24px',
                    cursor: 'pointer',
                    background: '#FFFFFF',
                    borderRadius: '14px',
                    border: '1px solid',
                    borderColor: isOpen ? '#00B4D8' : '#E2E8F0',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: isOpen ? '#0284C7' : '#0F172A', margin: 0 }}>
                      {f.q}
                    </h3>
                    {isOpen ? <ChevronUp size={18} color="#0284C7" /> : <ChevronDown size={18} color="#0F172A" />}
                  </div>
                  {isOpen && (
                    <p style={{ marginTop: '14px', fontSize: '0.92rem', color: '#334155', lineHeight: 1.7, borderTop: '1px solid #E2E8F0', paddingTop: '14px', marginBottom: 0 }}>
                      {f.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: '0 0 80px', background: '#F8FAFC' }}>
        <div className="container-custom">
          <div style={{
            padding: '48px 36px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #0B132B 0%, #0F172A 100%)',
            border: '1px solid rgba(0, 180, 216, 0.3)',
            borderRadius: '24px',
            color: '#FFFFFF'
          }}>
            <div className="badge badge-cyan" style={{ marginBottom: '14px' }}>COMMISSION AN ENGINEERING PROJECT</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: '#FFFFFF', marginBottom: '14px', fontWeight: 800 }}>
              Have a Project Idea to Build?
            </h2>
            <p style={{ fontSize: '1rem', color: '#94A3B8', maxWidth: '620px', margin: '0 auto 30px', lineHeight: 1.65 }}>
              Whether you need enterprise AI CCTV surveillance, high-performance web systems, or an engineering capstone with working source code, Cognisys brings your technical vision to life.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/order" className="btn-primary" style={{ padding: '12px 30px', textDecoration: 'none' }}>
                <Sparkles size={16} />
                <span>Customise Your Order</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-secondary" style={{ padding: '12px 26px', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)' }}>
                <span>Contact Engineering</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
