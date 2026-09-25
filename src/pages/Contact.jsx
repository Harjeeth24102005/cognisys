import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Send, CheckCircle2, 
  Sparkles, ArrowRight, Clock, ShieldCheck, MessageCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { api } from '../services/api';
import { smtpService } from '../services/smtpService';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [honeypot, setHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [smtpStatus, setSmtpStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Dispatch securely via free encrypted API to contact.cognisys@gmail.com
      const smtpRes = await smtpService.sendContactInquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || 'Not provided',
        subject: formData.subject.trim() || `Inquiry from ${formData.name.trim()}`,
        message: formData.message.trim(),
        _honey: honeypot
      });
      setSmtpStatus(smtpRes);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    } catch (err) {
      console.warn('Inquiry dispatch note:', err);
      setError(err.message || 'Transmission encountered an issue. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: '72px' }}>
      {/* Header */}
      <section style={{
        padding: '60px 0 30px',
        textAlign: 'center',
        background: 'radial-gradient(circle at 50% 0%, rgba(249, 190, 74, 0.08) 0%, transparent 65%)',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div className="container-custom">
          <div className="badge" style={{ marginBottom: '14px' }}>
            <Sparkles size={13} />
            <span>DIRECT CHANNELS</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: '#0B132B', marginBottom: '16px', fontWeight: 900 }}>
            CONNECT WITH COGNISYS
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#1E293B', maxWidth: '640px', margin: '0 auto', fontWeight: 500 }}>
            Have a project in mind, require an enterprise AI CCTV demonstration, or need student project technical mentorship? We're ready to engineer your solution.
          </p>
        </div>
      </section>

      {/* Main Form & Contact Info */}
      <section className="section-padding">
        <div className="container-custom">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'flex-start'
          }}>
            {/* Left: Contact Info & Support Channels */}
            <div>
              <div className="badge" style={{ marginBottom: '16px' }}>DIRECT CONTACT</div>
              <h2 style={{ fontSize: '1.8rem', color: '#0B132B', marginBottom: '16px', fontWeight: 800 }}>
                Engineering & Business Inquiries
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#1E293B', lineHeight: 1.7, marginBottom: '32px', fontWeight: 500 }}>
                Reach our technical architects directly. All inquiries are routed straight to our engineering desk at <strong>contact.cognisys@gmail.com</strong>.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '36px' }}>
                {/* Official Phone */}
                <a
                  href="tel:8248349844"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                    textDecoration: 'none',
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    background: '#FFFFFF',
                    border: '1px solid rgba(15, 23, 42, 0.1)',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#0284C7';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(15, 23, 42, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '10px',
                    background: 'rgba(2, 132, 199, 0.1)',
                    border: '1px solid rgba(2, 132, 199, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0284C7',
                    flexShrink: 0
                  }}>
                    <Phone size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#0284C7', fontWeight: 700 }}>DIRECT CALL & WHATSAPP</div>
                    <div style={{ fontSize: '1.1rem', color: '#0B132B', fontWeight: 800, marginTop: '2px' }}>+91 82483 49844</div>
                    <div style={{ fontSize: '0.8rem', color: '#1E293B', marginTop: '2px', fontWeight: 600 }}>Tap to Call Now (24/7 Available)</div>
                  </div>
                </a>

                {/* Official Email */}
                <a
                  href="mailto:contact.cognisys@gmail.com"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                    textDecoration: 'none',
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    background: '#FFFFFF',
                    border: '1px solid rgba(15, 23, 42, 0.1)',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#7C3AED';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(15, 23, 42, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '10px',
                    background: 'rgba(124, 58, 237, 0.1)',
                    border: '1px solid rgba(124, 58, 237, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#7C3AED',
                    flexShrink: 0
                  }}>
                    <Mail size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#7C3AED', fontWeight: 700 }}>OFFICIAL ENGINEERING EMAIL</div>
                    <div style={{ fontSize: '1.1rem', color: '#0B132B', fontWeight: 800, marginTop: '2px' }}>contact.cognisys@gmail.com</div>
                    <div style={{ fontSize: '0.8rem', color: '#1E293B', marginTop: '2px', fontWeight: 600 }}>Direct Specification Transmission</div>
                  </div>
                </a>

                {/* Facility */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: '#FFFFFF',
                  border: '1px solid rgba(15, 23, 42, 0.1)',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.04)'
                }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '10px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10B981',
                    flexShrink: 0
                  }}>
                    <MapPin size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#10B981', fontWeight: 700 }}>FACILITY / INNOVATION HUB</div>
                    <div style={{ fontSize: '1.05rem', color: '#0B132B', fontWeight: 800, marginTop: '2px' }}>Cognisys</div>
                    <div style={{ fontSize: '0.8rem', color: '#1E293B', marginTop: '2px', fontWeight: 600 }}>MSME / UDYAM Certified Tech Entity</div>
                  </div>
                </div>
              </div>

              {/* Start Project CTA Box */}
              <div className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)', border: '1px solid rgba(2, 132, 199, 0.2)' }}>
                <h4 style={{ fontSize: '1.05rem', color: '#0B132B', fontWeight: 700, marginBottom: '8px' }}>
                  Ready to configure an engineering project?
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#334155', marginBottom: '16px' }}>
                  Use our step-by-step project ordering wizard to submit your specifications directly.
                </p>
                <Link to="/order" className="btn-primary" style={{ fontSize: '0.85rem', padding: '10px 18px' }}>
                  <span>Launch Order Wizard</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right: Interactive Contact Form */}
            <div className="glass-panel" style={{ padding: 'clamp(24px, 5vw, 40px)', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.1)', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.06)' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '36px 0' }}>
                  <div style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.12)',
                    border: '2px solid #10B981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10B981',
                    margin: '0 auto 20px',
                    boxShadow: '0 0 28px rgba(16, 185, 129, 0.25)'
                  }}>
                    <CheckCircle2 size={38} />
                  </div>
                  <h3 style={{ fontSize: '1.4rem', color: '#0B132B', fontWeight: 800, marginBottom: '8px' }}>
                    Formal Inquiry Transmitted Successfully!
                  </h3>
                  <div style={{ display: 'inline-block', background: 'rgba(16, 185, 129, 0.1)', color: '#059669', fontSize: '0.78rem', fontWeight: 700, padding: '4px 14px', borderRadius: '20px', marginBottom: '16px' }}>
                    ✓ DELIVERED TO CONTACT.COGNISYS@GMAIL.COM &amp; AUTO-CONFIRMED TO SENDER
                  </div>

                  {/* Formal Transmission Status Box */}
                  <div style={{
                    background: '#F0FDF4',
                    border: '1px solid #BBF7D0',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px 20px',
                    textAlign: 'left',
                    marginBottom: '20px',
                    fontSize: '0.9rem',
                    color: '#166534',
                    lineHeight: 1.6
                  }}>
                    <p style={{ margin: '0 0 8px 0', fontWeight: 700 }}>
                      The mail is sent to <span style={{ textDecoration: 'underline' }}>contact.cognisys@gmail.com</span> with all your filled details.
                    </p>
                    <p style={{ margin: '0 0 10px 0' }}>
                      A confirmation has also been dispatched to your email address (<strong>{formData.email}</strong>). The Cognisys technical team will review your requirements and contact you soon.
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

                  {/* Summary of Transmitted Fields */}
                  <div style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px',
                    textAlign: 'left',
                    fontSize: '0.84rem',
                    marginBottom: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748B', fontWeight: 600 }}>Sender:</span>
                      <span style={{ color: '#0B132B', fontWeight: 700 }}>{formData.name} &lt;{formData.email}&gt;</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748B', fontWeight: 600 }}>Phone:</span>
                      <span style={{ color: '#0B132B', fontWeight: 600 }}>{formData.phone || 'Not provided'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748B', fontWeight: 600 }}>Subject:</span>
                      <span style={{ color: '#0284C7', fontWeight: 700 }}>{formData.subject || 'General Inquiry'}</span>
                    </div>
                    <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '8px', marginTop: '4px' }}>
                      <span style={{ color: '#64748B', fontWeight: 600, display: 'block', marginBottom: '2px' }}>Message Details:</span>
                      <span style={{ color: '#334155', whiteSpace: 'pre-line' }}>{formData.message}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=contact.cognisys@gmail.com&cc=${encodeURIComponent(formData.email)}&su=${encodeURIComponent(`[COGNISYS INQUIRY] ${formData.subject || 'Website Message'} from ${formData.name}`)}&body=${encodeURIComponent(`Dear Cognisys Engineering Team,\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nSubject: ${formData.subject}\n\nMessage Details:\n${formData.message}\n\nEmergency Helpline: +91 82483 49844`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{ textDecoration: 'none', padding: '12px 22px', fontSize: '0.88rem' }}
                    >
                      <span>Send via Gmail Web</span>
                    </a>
                    <a
                      href={`mailto:contact.cognisys@gmail.com?cc=${encodeURIComponent(formData.email)}&subject=${encodeURIComponent(`[COGNISYS] ${formData.subject || `Inquiry from ${formData.name}`}`)}&body=${encodeURIComponent(`Dear Cognisys Team,\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage Details:\n${formData.message}\n\nEmergency Helpline: 8248349844`)}`}
                      className="btn-secondary"
                      style={{ textDecoration: 'none', padding: '12px 20px', fontSize: '0.88rem' }}
                    >
                      <span>Open in Mail App</span>
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                      }}
                      className="btn-secondary"
                      style={{ padding: '12px 20px', fontSize: '0.88rem' }}
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ fontSize: '1.35rem', color: '#0B132B', fontWeight: 800, marginBottom: '6px' }}>
                    Send a Direct Message
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#1E293B', marginBottom: '24px', fontWeight: 500 }}>
                    All messages are routed directly to <strong style={{ color: '#0B132B' }}>contact.cognisys@gmail.com</strong>.
                  </p>

                  {error && (
                    <div style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background: 'rgba(239, 68, 68, 0.08)',
                      border: '1px solid rgba(239, 68, 68, 0.25)',
                      color: '#DC2626',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      marginBottom: '18px'
                    }}>
                      {error}
                    </div>
                  )}

                  {/* Honeypot anti-spam trap (invisible to human users) */}
                  <div style={{ display: 'none' }} aria-hidden="true">
                    <input
                      type="text"
                      name="_honey"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex="-1"
                      autoComplete="off"
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#0F172A', fontWeight: 700, marginBottom: '6px' }}>
                        YOUR FULL NAME *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Harjeeth S"
                        className="input-futuristic"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#0F172A', fontWeight: 700, marginBottom: '6px' }}>
                          EMAIL ADDRESS *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@company.com"
                          className="input-futuristic"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#0F172A', fontWeight: 700, marginBottom: '6px' }}>
                          PHONE NUMBER
                        </label>
                        <input
                          type="tel"
                          placeholder="8248349844"
                          className="input-futuristic"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#0F172A', fontWeight: 700, marginBottom: '6px' }}>
                        SUBJECT *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. AI CCTV Integration for 12 Cameras / Web App Inquiry"
                        className="input-futuristic"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#0F172A', fontWeight: 700, marginBottom: '6px' }}>
                        PROJECT REQUIREMENTS / MESSAGE *
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Describe your technical requirements, architecture goals, or questions..."
                        className="input-futuristic"
                        style={{ resize: 'vertical' }}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary"
                      style={{ padding: '14px', marginTop: '8px' }}
                    >
                      <Send size={16} />
                      <span>{loading ? 'Transmitting Inquiries...' : 'Send Message to contact.cognisys@gmail.com'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
