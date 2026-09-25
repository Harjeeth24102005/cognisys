import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, ArrowRight, ArrowLeft, Eye, Globe, Code, 
  GraduationCap, Cpu, IndianRupee, Calendar, FileText, Layers, ShieldCheck, Sparkles, Terminal 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';
import { smtpService } from '../services/smtpService';

export const OrderWizard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submittedOrder, setSubmittedOrder] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    service_id: null,
    service_name: 'AI-Based CCTV Attendance Monitoring System',
    service_slug: searchParams.get('service') || 'ai-cctv-attendance',
    title: '',
    description: '',
    budget: 'Custom Engineering Quotation',
    timeline: '2 - 3 Weeks',
    tech_preferences: 'Python, React, FastAPI, Docker, PyTorch',
    attachment_filename: ''
  });

  const services = [
    {
      slug: 'ai-cctv-attendance',
      name: 'AI-Based CCTV Attendance Monitoring System',
      icon: Eye,
      desc: 'Autonomous contactless biometric attendance, facial recognition & smart surveillance.'
    },
    {
      slug: 'websites',
      name: 'Websites & Modern Web Development',
      icon: Globe,
      desc: 'High-performance React web applications, portals & cloud APIs.'
    },
    {
      slug: 'ai-projects',
      name: 'AI-Based Projects',
      icon: Cpu,
      desc: 'Deep learning, NLP, computer vision & generative neural pipelines.'
    },
    {
      slug: 'python-projects',
      name: 'Python-Based Projects',
      icon: Terminal,
      desc: 'High-throughput FastAPI/Django backends, data scrapers & automation bots.'
    },
    {
      slug: 'final-year-projects',
      name: 'Final Year Projects',
      icon: GraduationCap,
      desc: 'Complete IEEE capstones with working source code, documentation & viva prep.'
    },
    {
      slug: 'face-recognition',
      name: 'Face Recognition System',
      icon: ShieldCheck,
      desc: 'Enterprise facial biometrics, 3D anti-spoofing & access control relays.'
    }
  ];

  // Auto-set service from query param if available
  useEffect(() => {
    const qService = searchParams.get('service');
    if (qService) {
      const match = services.find(s => s.slug === qService);
      if (match) {
        setFormData(prev => ({
          ...prev,
          service_slug: match.slug,
          service_name: match.name
        }));
      }
    }
  }, [searchParams]);

  const handleSelectService = (svc) => {
    setFormData({
      ...formData,
      service_slug: svc.slug,
      service_name: svc.name
    });
  };

  const handleNext = () => {
    setError(null);
    if (step === 2) {
      if (!formData.title.trim()) {
        setError('Please enter a project title.');
        return;
      }
      if (!formData.description.trim()) {
        setError('Please provide a brief description of your requirements.');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setError(null);
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmitOrder = async (e) => {
    if (e) e.preventDefault();
    if (!formData.customer_name.trim() || !formData.customer_email.trim() || !formData.customer_phone.trim()) {
      setError('Please provide your name, email, and phone number so we can transmit your specifications.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await smtpService.sendOrderSpecifications({
        customer_name: formData.customer_name.trim(),
        customer_email: formData.customer_email.trim(),
        customer_phone: formData.customer_phone.trim(),
        service_name: formData.service_name,
        title: formData.title,
        description: formData.description,
        budget: formData.budget,
        timeline: formData.timeline,
        tech_preferences: formData.tech_preferences,
        attachment_filename: formData.attachment_filename || null
      });

      const newOrder = res.order;
      setSubmittedOrder(newOrder);
      try {
        confetti({
          particleCount: 140,
          spread: 80,
          origin: { y: 0.55 }
        });
      } catch (err) {}

      // Order successfully submitted and dispatched via direct mail relay
    } catch (err) {
      setError(err.message || 'Failed to submit order specifications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: '72px', minHeight: '90vh', background: '#FFFFFF' }}>
      <section style={{ padding: '40px 0 20px', textAlign: 'center' }}>
        <div className="container-custom">
          <div className="badge badge-purple" style={{ marginBottom: '12px' }}>
            <Sparkles size={13} color="#7C3AED" />
            <span>PROJECT SPECIFICATION ENGINE</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#0B132B', fontWeight: 900, marginBottom: '10px' }}>
            CONFIGURE YOUR COGNISYS PROJECT
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#1E293B', maxWidth: '640px', margin: '0 auto', fontWeight: 500 }}>
            Submit your requirements in 5 guided steps. Specifications will be directly transmitted to <strong>contact.cognisys@gmail.com</strong> for rapid engineering assessment.
          </p>
        </div>
      </section>

      {/* Wizard Card */}
      <section style={{ padding: '20px 0 80px' }}>
        <div className="container-custom" style={{ maxWidth: '840px' }}>
          <div className="glass-panel" style={{ padding: 'clamp(24px, 5vw, 44px)', position: 'relative', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            {submittedOrder ? (
              <div style={{ textAlign: 'center', padding: '36px 12px' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '2px solid #10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10B981',
                  margin: '0 auto 24px',
                  boxShadow: '0 0 32px rgba(16, 185, 129, 0.35)'
                }}>
                  <CheckCircle2 size={44} />
                </div>

                <h2 style={{ fontSize: '1.8rem', color: '#0B132B', marginBottom: '8px', fontWeight: 900 }}>
                  Formal Specifications Transmitted Successfully!
                </h2>
                <div style={{ display: 'inline-block', background: 'rgba(16, 185, 129, 0.1)', color: '#059669', fontSize: '0.78rem', fontWeight: 700, padding: '4px 14px', borderRadius: '20px', marginBottom: '18px' }}>
                  ✓ DELIVERED TO CONTACT.COGNISYS@GMAIL.COM &amp; AUTO-CONFIRMED TO SENDER
                </div>

                {/* Formal Transmission Status Box */}
                <div style={{
                  background: '#F0FDF4',
                  border: '1px solid #BBF7D0',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px 22px',
                  maxWidth: '560px',
                  margin: '0 auto 24px',
                  textAlign: 'left',
                  fontSize: '0.9rem',
                  color: '#166534',
                  lineHeight: 1.6
                }}>
                  <p style={{ margin: '0 0 8px 0', fontWeight: 700 }}>
                    The mail is sent to <span style={{ textDecoration: 'underline' }}>contact.cognisys@gmail.com</span> with all your filled details for <strong>{submittedOrder.title}</strong>.
                  </p>
                  <p style={{ margin: '0 0 12px 0' }}>
                    A confirmation has also been dispatched to your email address (<strong>{submittedOrder.customer_email}</strong>). The Cognisys technical team will review your specifications and contact you soon.
                  </p>
                  <div style={{
                    background: '#FFFFFF',
                    border: '1px solid #86EFAC',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontWeight: 700,
                    color: '#0F172A'
                  }}>
                    <Phone size={18} color="#059669" />
                    <span>If you need immediate assistance now, call: <a href="tel:8248349844" style={{ color: '#0284C7', textDecoration: 'none' }}>+91 82483 49844</a></span>
                  </div>
                </div>

                <div style={{
                  background: '#F8FAFC',
                  border: '1px solid #CBD5E1',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px',
                  maxWidth: '560px',
                  margin: '0 auto 28px',
                  textAlign: 'left',
                  fontSize: '0.85rem',
                  color: '#0B132B',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '6px' }}>
                    <span style={{ color: '#64748B', fontWeight: 700 }}>Reference Code:</span>
                    <span style={{ color: '#0284C7', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>#{submittedOrder.order_number}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B', fontWeight: 600 }}>Client Name:</span>
                    <span style={{ color: '#0B132B', fontWeight: 700 }}>{submittedOrder.customer_name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B', fontWeight: 600 }}>Client Email:</span>
                    <span style={{ color: '#0284C7', fontWeight: 600 }}>{submittedOrder.customer_email}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B', fontWeight: 600 }}>Client Phone:</span>
                    <span style={{ color: '#0B132B', fontWeight: 600 }}>{submittedOrder.customer_phone}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B', fontWeight: 600 }}>Service Domain:</span>
                    <span style={{ color: '#0284C7', fontWeight: 700 }}>{submittedOrder.service_name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B', fontWeight: 600 }}>Project Title:</span>
                    <span style={{ color: '#0B132B', fontWeight: 700 }}>{submittedOrder.title}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B', fontWeight: 600 }}>Timeline &amp; Budget:</span>
                    <span style={{ color: '#059669', fontWeight: 700 }}>{submittedOrder.timeline} ({submittedOrder.budget})</span>
                  </div>
                  <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '6px' }}>
                    <span style={{ color: '#64748B', fontWeight: 600, display: 'block', marginBottom: '2px' }}>Specifications:</span>
                    <span style={{ color: '#334155', whiteSpace: 'pre-line' }}>{submittedOrder.description}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a
                    href={`mailto:contact.cognisys@gmail.com?cc=${encodeURIComponent(submittedOrder.customer_email)}&subject=${encodeURIComponent(`[COGNISYS ORDER #${submittedOrder.order_number}] - ${submittedOrder.title}`)}&body=${encodeURIComponent(`Order #${submittedOrder.order_number}\nClient: ${submittedOrder.customer_name}\nEmail: ${submittedOrder.customer_email}\nPhone: ${submittedOrder.customer_phone}\nService: ${submittedOrder.service_name}\nTimeline: ${submittedOrder.timeline}\nBudget: ${submittedOrder.budget}\n\nSpecifications:\n${submittedOrder.description}\n\nEmergency Helpline: 8248349844`)}`}
                    className="btn-primary"
                    style={{ textDecoration: 'none', padding: '12px 24px', fontSize: '0.9rem' }}
                  >
                    <span>Open in Mail App (CC to you)</span>
                  </a>
                  <button
                    onClick={() => {
                      setSubmittedOrder(null);
                      setStep(1);
                      setFormData({
                        service_slug: '',
                        service_name: '',
                        title: '',
                        description: '',
                        timeline: '2 - 3 Weeks',
                        tech_preferences: '',
                        attachment_filename: '',
                        customer_name: '',
                        customer_email: '',
                        customer_phone: ''
                      });
                    }}
                    className="btn-secondary"
                  >
                    Configure Another Project
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Step Progress Indicators */}
                <div className="touch-scroll-x" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '36px',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '20px',
                  overflowX: 'auto',
                  WebkitOverflowScrolling: 'touch',
                  gap: '8px'
                }}>
                  {[
                    { num: 1, label: "Service" },
                    { num: 2, label: "Scope" },
                    { num: 3, label: "Timeline" },
                    { num: 4, label: "Tech Specs" },
                    { num: 5, label: "Review & Submit" }
                  ].map((s) => {
                    const isActive = step === s.num;
                    const isPassed = step > s.num;
                    return (
                      <div key={s.num} style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '85px' }}>
                        <div style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          background: isPassed ? '#00B4D8' : isActive ? 'rgba(0, 180, 216, 0.12)' : '#F1F5F9',
                          border: `1.5px solid ${isActive || isPassed ? '#00B4D8' : '#CBD5E1'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isPassed ? '#FFFFFF' : isActive ? '#0284C7' : '#0F172A',
                          fontSize: '0.8rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700
                        }}>
                          {isPassed ? <CheckCircle2 size={16} /> : s.num}
                        </div>
                        <span style={{
                          fontSize: '0.78rem',
                          fontFamily: 'var(--font-mono)',
                          color: isActive ? '#0284C7' : '#0F172A',
                          fontWeight: isActive ? 700 : 600
                        }}>
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Form Errors */}
                {error && (
                  <div style={{
                    padding: '12px 16px',
                    background: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#DC2626',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    marginBottom: '20px'
                  }}>
                    {error}
                  </div>
                )}

                {/* STEP 1: SELECT SERVICE */}
                {step === 1 && (
                  <div>
                    <h3 style={{ fontSize: '1.3rem', color: '#0B132B', marginBottom: '8px', fontWeight: 800 }}>
                      Step 1: Choose Your Project Domain
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: '#1E293B', marginBottom: '24px', fontWeight: 500 }}>
                      Select the core service domain that best aligns with your system requirements:
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                      {services.map((svc) => {
                        const Icon = svc.icon;
                        const isSelected = formData.service_slug === svc.slug;
                        return (
                          <div
                            key={svc.slug}
                            onClick={() => handleSelectService(svc)}
                            style={{
                              background: isSelected ? 'rgba(0, 180, 216, 0.08)' : '#FFFFFF',
                              border: isSelected ? '2px solid #00B4D8' : '1px solid #CBD5E1',
                              borderRadius: 'var(--radius-md)',
                              padding: '20px',
                              cursor: 'pointer',
                              boxShadow: isSelected ? '0 4px 16px rgba(0, 180, 216, 0.2)' : 'var(--shadow-sm)',
                              transition: 'all 0.2s ease',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '10px'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '8px',
                                background: isSelected ? 'rgba(0, 180, 216, 0.2)' : '#F1F5F9',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: isSelected ? '#0284C7' : '#0B132B'
                              }}>
                                <Icon size={20} />
                              </div>
                              {isSelected && <CheckCircle2 size={18} color="#00B4D8" />}
                            </div>
                            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0B132B' }}>{svc.name}</div>
                            <div style={{ fontSize: '0.82rem', color: '#334155', lineHeight: 1.4 }}>{svc.desc}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 2: PROJECT TITLE & DETAILED REQUIREMENTS */}
                {step === 2 && (
                  <div>
                    <h3 style={{ fontSize: '1.3rem', color: '#0B132B', marginBottom: '8px', fontWeight: 800 }}>
                      Step 2: Project Scope & Specifications
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: '#1E293B', marginBottom: '24px', fontWeight: 500 }}>
                      Provide a clear title and describe what functionality, features, or algorithms you require:
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#0284C7', marginBottom: '6px', fontWeight: 700 }}>
                          PROJECT TITLE *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. AI Perimeter Surveillance for Industrial Plant / Cloud SaaS Platform"
                          className="input-futuristic"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#0284C7', marginBottom: '6px', fontWeight: 700 }}>
                          DETAILED REQUIREMENTS & ARCHITECTURAL SPECS *
                        </label>
                        <textarea
                          rows={6}
                          required
                          placeholder="Describe target users, camera counts, computer vision models, API integrations, database preference, performance metrics..."
                          className="input-futuristic"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: TIMELINE */}
                {step === 3 && (
                  <div>
                    <h3 style={{ fontSize: '1.3rem', color: '#0B132B', marginBottom: '8px', fontWeight: 800 }}>
                      Step 3: Target Delivery Timeline
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: '#1E293B', marginBottom: '24px', fontWeight: 500 }}>
                      Choose your preferred implementation duration:
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '32px' }}>
                      {[
                        { label: '1 - 2 Weeks', desc: 'Fast-Track / Urgent Demo' },
                        { label: '2 - 3 Weeks', desc: 'Standard Production Sprint' },
                        { label: '1 Month', desc: 'Complex Multi-Feature System' },
                        { label: '2+ Months', desc: 'Comprehensive Cloud Deployment' }
                      ].map((t, i) => {
                        const isSelected = formData.timeline === t.label;
                        return (
                          <div
                            key={i}
                            onClick={() => setFormData({ ...formData, timeline: t.label })}
                            style={{
                              background: isSelected ? 'rgba(0, 180, 216, 0.1)' : '#FFFFFF',
                              border: isSelected ? '2px solid #00B4D8' : '1px solid #CBD5E1',
                              borderRadius: 'var(--radius-md)',
                              padding: '18px',
                              cursor: 'pointer',
                              boxShadow: isSelected ? '0 4px 14px rgba(0, 180, 216, 0.2)' : 'var(--shadow-sm)',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: isSelected ? '#0284C7' : '#0B132B', marginBottom: '4px' }}>
                              {t.label}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#334155' }}>{t.desc}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 4: TECH PREFERENCES */}
                {step === 4 && (
                  <div>
                    <h3 style={{ fontSize: '1.3rem', color: '#0B132B', marginBottom: '8px', fontWeight: 800 }}>
                      Step 4: Technology Stack & Preferences
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: '#1E293B', marginBottom: '24px', fontWeight: 500 }}>
                      Specify preferred frameworks, hardware targets, or leave as default recommendations:
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#0284C7', marginBottom: '6px', fontWeight: 700 }}>
                          TECH STACK / TOOLS
                        </label>
                        <input
                          type="text"
                          className="input-futuristic"
                          value={formData.tech_preferences}
                          onChange={(e) => setFormData({ ...formData, tech_preferences: e.target.value })}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#0284C7', marginBottom: '6px', fontWeight: 700 }}>
                          REFERENCE ATTACHMENT / SPEC SHEET NAME (OPTIONAL)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. campus_cctv_layout.pdf or dataset_specs.docx"
                          className="input-futuristic"
                          value={formData.attachment_filename}
                          onChange={(e) => setFormData({ ...formData, attachment_filename: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 5: CONTACT DETAILS & REVIEW */}
                {step === 5 && (
                  <div>
                    <h3 style={{ fontSize: '1.3rem', color: '#0B132B', marginBottom: '8px', fontWeight: 800 }}>
                      Step 5: Client Contact & Transmission Review
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: '#1E293B', marginBottom: '24px', fontWeight: 500 }}>
                      Enter your contact information to receive your direct engineering response. All specifications are emailed to <strong>contact.cognisys@gmail.com</strong>.
                    </p>

                    {/* Contact Inputs */}
                    <div style={{
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: 'var(--radius-md)',
                      padding: '20px',
                      marginBottom: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px'
                    }}>
                      <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#0284C7', fontWeight: 700 }}>
                        YOUR CONTACT DETAILS *
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', color: '#1E293B', marginBottom: '4px', fontWeight: 600 }}>
                          FULL NAME *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Harjeeth S / Tech Lead"
                          className="input-futuristic"
                          value={formData.customer_name}
                          onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                        />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.82rem', color: '#1E293B', marginBottom: '4px', fontWeight: 600 }}>
                            EMAIL ADDRESS *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="yourname@domain.com"
                            className="input-futuristic"
                            value={formData.customer_email}
                            onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.82rem', color: '#1E293B', marginBottom: '4px', fontWeight: 600 }}>
                            PHONE NUMBER *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            className="input-futuristic"
                            value={formData.customer_phone}
                            onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Order Review Card */}
                    <div style={{
                      background: '#F8FAFC',
                      borderRadius: 'var(--radius-md)',
                      padding: '20px',
                      border: '1px solid #E2E8F0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      marginBottom: '24px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
                        <span style={{ fontSize: '0.85rem', color: '#0F172A', fontWeight: 700 }}>Selected Service:</span>
                        <span style={{ fontSize: '0.9rem', color: '#0284C7', fontWeight: 700 }}>{formData.service_name}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
                        <span style={{ fontSize: '0.85rem', color: '#0F172A', fontWeight: 700 }}>Project Title:</span>
                        <span style={{ fontSize: '0.9rem', color: '#0B132B', fontWeight: 700 }}>{formData.title || 'Untitled Project'}</span>
                      </div>
                      <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
                        <div style={{ fontSize: '0.85rem', color: '#0F172A', marginBottom: '4px', fontWeight: 700 }}>Technical Scope:</div>
                        <div style={{ fontSize: '0.88rem', color: '#1E293B', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{formData.description || 'No requirements specified'}</div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.85rem', color: '#0F172A', fontWeight: 700 }}>Timeline:</span>
                        <span style={{ fontSize: '0.9rem', color: '#0B132B', fontWeight: 700 }}>{formData.timeline}</span>
                      </div>
                    </div>

                    <div style={{
                      fontSize: '0.82rem',
                      color: '#0284C7',
                      background: 'rgba(0, 180, 216, 0.08)',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid rgba(0, 180, 216, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '28px',
                      fontWeight: 500
                    }}>
                      <ShieldCheck size={18} color="#00B4D8" style={{ flexShrink: 0 }} />
                      <span>Specifications are transmitted in real-time to <strong>contact.cognisys@gmail.com</strong>. No account login required.</span>
                    </div>
                  </div>
                )}

                {/* Error Banner */}
                {error && (
                  <div style={{
                    padding: '12px 18px',
                    borderRadius: '8px',
                    background: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    color: '#DC2626',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    marginBottom: '20px'
                  }}>
                    {error}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {step > 1 ? (
                    <button onClick={handlePrev} className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
                      <ArrowLeft size={16} />
                      <span>Previous</span>
                    </button>
                  ) : <div />}

                  {step < 5 ? (
                    <button onClick={handleNext} className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.85rem' }}>
                      <span>Next Step</span>
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitOrder}
                      disabled={loading}
                      className="btn-primary"
                      style={{ padding: '12px 28px', fontSize: '0.95rem' }}
                    >
                      <span>{loading ? 'Transmitting Specifications...' : 'SUBMIT REQUIREMENTS TO CONTACT.COGNISYS@GMAIL.COM'}</span>
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
