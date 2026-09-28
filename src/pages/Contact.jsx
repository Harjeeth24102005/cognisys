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
  const [submittedData, setSubmittedData] = useState(null);
  const [honeypot, setHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [smtpStatus, setSmtpStatus] = useState(null);

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields (Name, Email, and Message).');
      return;
    }

    if (loading) return; // Prevent multiple clicks

    setLoading(true);
    setError(null);

    try {
      // Dispatch securely via static form-to-email service directly to company email
      const smtpRes = await smtpService.sendContactInquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || 'Not provided',
        subject: formData.subject.trim() || `Inquiry from ${formData.name.trim()}`,
        message: formData.message.trim(),
        _honey: honeypot
      });

      if (smtpRes && (smtpRes.delivered || smtpRes.success)) {
        // Save submitted data for the confirmation summary card
        setSubmittedData({ ...formData });
        // Clear the form only after the email has been successfully sent
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setSmtpStatus(smtpRes);
        setSubmitted(true);
        setError(null);

        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (err) {}
      } else {
        // Submission failed: keep visitor's entered data intact and display error
        setSubmitted(false);
        setError(smtpRes?.error || 'Email dispatch failed. Please check your network connection or try again.');
      }
    } catch (err) {
      console.warn('Inquiry dispatch error:', err);
      setSubmitted(false);
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
              <form id="contact-form" name="contact-form" onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '1.35rem', color: '#0B132B', fontWeight: 800, marginBottom: '6px' }}>
                  Send a Direct Message
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#1E293B', marginBottom: '24px', fontWeight: 500 }}>
                  All messages are routed directly to <strong style={{ color: '#0B132B' }}>contact.cognisys@gmail.com</strong>.
                </p>

                {submitted && (
                  <div style={{
                    padding: '20px 24px',
                    borderRadius: '12px',
                    background: '#F0FDF4',
                    border: '1.5px solid #22C55E',
                    marginBottom: '24px',
                    boxShadow: '0 6px 20px rgba(34, 197, 94, 0.12)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: '#22C55E',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#14532D' }}>
                          Message Sent Successfully!
                        </div>
                        <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#16A34A', letterSpacing: '0.4px' }}>
                          DELIVERED TO CONTACT.COGNISYS@GMAIL.COM
                        </div>
                      </div>
                    </div>
                    <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#166534', lineHeight: 1.6 }}>
                      Thank you{submittedData?.name ? `, ${submittedData.name}` : ''}! Your message has been delivered. Our technical architects will review your specifications and reply to <strong>{submittedData?.email || 'your email'}</strong> shortly.
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#15803D', fontWeight: 600 }}>
                      <Phone size={14} color="#16A34A" />
                      <span>Direct 24/7 hotline: <a href="tel:8248349844" style={{ color: '#0284C7', textDecoration: 'none' }}>+91 82483 49844</a></span>
                    </div>
                  </div>
                )}

                  {error && (
                    <div style={{
                      padding: '16px 20px',
                      borderRadius: '12px',
                      background: '#FFF7ED',
                      border: '1px solid #FED7AA',
                      color: '#9A3412',
                      fontSize: '0.88rem',
                      marginBottom: '24px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, color: '#C2410C', marginBottom: '6px' }}>
                        <span>⚠️ Submission Notice</span>
                      </div>
                      <div style={{ lineHeight: 1.55 }}>
                        {error}
                      </div>
                    </div>
                  )}

                  {/* Honeypot anti-spam trap (invisible to human users) */}
                  <div style={{ display: 'none' }} aria-hidden="true">
                    <input
                      type="text"
                      name="_honey"
                      id="_honey"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex="-1"
                      autoComplete="off"
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <div>
                      <label htmlFor="name" style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#0F172A', fontWeight: 700, marginBottom: '6px' }}>
                        YOUR FULL NAME *
                      </label>
                      <input
                        id="name"
                        name="name"
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
                        <label htmlFor="email" style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#0F172A', fontWeight: 700, marginBottom: '6px' }}>
                          EMAIL ADDRESS *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="name@company.com"
                          className="input-futuristic"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#0F172A', fontWeight: 700, marginBottom: '6px' }}>
                          PHONE NUMBER
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="8248349844"
                          className="input-futuristic"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#0F172A', fontWeight: 700, marginBottom: '6px' }}>
                        SUBJECT *
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        placeholder="e.g. AI CCTV Integration for 12 Cameras / Web App Inquiry"
                        className="input-futuristic"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                    </div>

                    <div>
                      <label htmlFor="message" style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#0F172A', fontWeight: 700, marginBottom: '6px' }}>
                        PROJECT REQUIREMENTS / MESSAGE *
                      </label>
                      <textarea
                        id="message"
                        name="message"
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
                      id="contact-submit-btn"
                      type="submit"
                      disabled={loading}
                      className="btn-primary"
                      style={{ padding: '14px', marginTop: '8px' }}
                    >
                      <Send size={16} />
                      <span>{loading ? 'Transmitting Inquiries...' : submitted ? '✓ Message Sent! Send Another' : 'Send Message to contact.cognisys@gmail.com'}</span>
                    </button>
                  </div>
                </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
