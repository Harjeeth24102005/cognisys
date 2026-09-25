import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, FileText, RefreshCcw } from 'lucide-react';

export const Legal = () => {
  const location = useLocation();
  const path = location.pathname;

  let title = "Privacy Policy";
  let icon = ShieldCheck;
  let subtitle = "Official data privacy, security and telemetry policies of Cognisys.";

  if (path.includes('terms')) {
    title = "Terms of Service";
    icon = FileText;
    subtitle = "Standard terms, intellectual property ownership, and service delivery conditions.";
  } else if (path.includes('refund')) {
    title = "Refund & Cancellation Policy";
    icon = RefreshCcw;
    subtitle = "Transparent policies regarding milestone cancellations, quotations, and payments.";
  }

  const Icon = icon;

  return (
    <div style={{ paddingTop: '72px' }}>
      <section style={{ padding: '60px 0 30px', textAlign: 'center', background: 'radial-gradient(circle at 50% 0%, rgba(0, 240, 255, 0.08) 0%, transparent 60%)' }}>
        <div className="container-custom">
          <div className="badge" style={{ marginBottom: '14px' }}>
            <Icon size={14} />
            <span>LEGAL & COMPLIANCE [REVIEW PLACEHOLDER]</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: '#0B132B', marginBottom: '16px', fontWeight: 900 }}>
            {title.toUpperCase()}
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#1E293B', maxWidth: '640px', margin: '0 auto', fontWeight: 500 }}>
            {subtitle}
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ paddingTop: '20px' }}>
        <div className="container-custom" style={{ maxWidth: '820px' }}>
          <div className="glass-panel" style={{ padding: 'clamp(24px, 5vw, 44px)', lineHeight: 1.8, color: '#0F172A', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.06)' }}>
            <div style={{
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '8px',
              padding: '14px 18px',
              marginBottom: '28px',
              fontSize: '0.85rem',
              color: '#92400e',
              fontWeight: 600
            }}>
              <strong>Notice:</strong> This document contains professional placeholder legal terms prepared for cognisys and is subject to final legal review and corporate jurisdiction updates.
            </div>

            {path.includes('privacy') && (
              <div>
                <h3 style={{ color: '#0B132B', fontSize: '1.25rem', marginBottom: '10px', fontWeight: 700 }}>1. Data Collection & Surveillance Feeds</h3>
                <p style={{ marginBottom: '20px', color: '#0F172A' }}>
                  Cognisys prioritizes zero-knowledge edge processing. For AI CCTV surveillance deployments, camera video streams are decoded on local edge appliances and are not stored in unencrypted third-party clouds unless explicitly configured by the customer.
                </p>

                <h3 style={{ color: '#0B132B', fontSize: '1.25rem', marginBottom: '10px', fontWeight: 700 }}>2. Account & Ordering Information</h3>
                <p style={{ marginBottom: '20px', color: '#0F172A' }}>
                  When submitting project requests or creating customer portal credentials, we collect names, verified email addresses, phone coordinates, and project specifications strictly for engineering communication, billing, and progress notifications.
                </p>

                <h3 style={{ color: '#0B132B', fontSize: '1.25rem', marginBottom: '10px', fontWeight: 700 }}>3. Data Security</h3>
                <p style={{ marginBottom: '20px', color: '#0F172A' }}>
                  All authentication sessions utilize standard 256-bit JWT encryption. Passwords and credentials are cryptographically hashed using salted bcrypt algorithms and are never stored in plain text.
                </p>
              </div>
            )}

            {path.includes('terms') && (
              <div>
                <h3 style={{ color: '#0B132B', fontSize: '1.25rem', marginBottom: '10px', fontWeight: 700 }}>1. Scope of Work & Quotation Acceptance</h3>
                <p style={{ marginBottom: '20px', color: '#0F172A' }}>
                  All engineering projects begin with an official itemized quotation issued through the Cognisys portal. Work commences only upon explicit customer acceptance and verified milestone payment.
                </p>

                <h3 style={{ color: '#0B132B', fontSize: '1.25rem', marginBottom: '10px', fontWeight: 700 }}>2. Intellectual Property & Code Ownership</h3>
                <p style={{ marginBottom: '20px', color: '#0F172A' }}>
                  Upon 100% completion and final payment, all custom source code, documentation, machine learning models, and architectural designs created for the client are transferred irrevocably to the client.
                </p>

                <h3 style={{ color: '#0B132B', fontSize: '1.25rem', marginBottom: '10px', fontWeight: 700 }}>3. Service Level & Support</h3>
                <p style={{ marginBottom: '20px', color: '#0F172A' }}>
                  Cognisys guarantees high-standard software engineering conforming to documented specifications. Standard projects include post-deployment bug fixing and technical walkthroughs as defined in the quotation.
                </p>
              </div>
            )}

            {path.includes('refund') && (
              <div>
                <h3 style={{ color: '#0B132B', fontSize: '1.25rem', marginBottom: '10px', fontWeight: 700 }}>1. Quotation Phase</h3>
                <p style={{ marginBottom: '20px', color: '#0F172A' }}>
                  Requesting a project scope and receiving an itemized quotation carries zero financial obligation. Customers may decline or modify quotations at any time without fees.
                </p>

                <h3 style={{ color: '#0B132B', fontSize: '1.25rem', marginBottom: '10px', fontWeight: 700 }}>2. Project Cancellation & Milestone Refunds</h3>
                <p style={{ marginBottom: '20px', color: '#0F172A' }}>
                  If a project is cancelled during active development before initial prototype delivery, unspent milestone funds are eligible for refund based on pro-rata work logged by engineering.
                </p>

                <h3 style={{ color: '#0B132B', fontSize: '1.25rem', marginBottom: '10px', fontWeight: 700 }}>3. Student Capstones & Completed Deliverables</h3>
                <p style={{ marginBottom: '20px', color: '#0F172A' }}>
                  Once final source code, IEEE reports, and demonstration files have been fully downloaded and approved by the customer, payments for completed milestones are non-refundable.
                </p>
              </div>
            )}

            <div style={{ marginTop: '36px', borderTop: '1px solid var(--border-subtle)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#0F172A', fontWeight: 600 }}>Last updated: September 2026</span>
              <Link to="/contact" style={{ color: '#0284C7', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700 }}>
                Contact Legal Inquiries →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
