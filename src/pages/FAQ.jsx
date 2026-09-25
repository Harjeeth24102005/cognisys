import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "What types of AI CCTV & Computer Vision solutions does Cognisys build?",
      a: "We engineer customized edge and cloud vision pipelines that support multi-camera RTSP ingestion, real-time YOLOv11 person detection, multi-object tracking (DeepSORT/ByteTrack), facial recognition biometric attendance, perimeter intrusion alarms, and custom surveillance analytics dashboards."
    },
    {
      q: "How does the customer ordering and quotation system operate?",
      a: "When you submit a project through our 6-step Order Wizard, our technical solutions desk analyzes your specifications, estimated budget, and timeline. Within 24 hours, an itemized quotation appears on your Customer Dashboard detailing development costs, deliverables, and estimated delivery dates. You can accept or decline with a single click."
    },
    {
      q: "What is included in the Student Project & Innovation Lab tier?",
      a: "Our student capstone tier provides 100% complete source code with modular architecture, IEEE-format project documentation/synopsis, circuit diagrams (for IoT/robotics), benchmark testing results, and step-by-step 1-on-1 technical walkthroughs to prepare you thoroughly for viva presentations."
    },
    {
      q: "Can Cognisys build custom web applications and SaaS platforms?",
      a: "Yes. We engineer high-performance modern web applications with React, Next.js, and modern frontend tools, backed by secure asynchronous FastAPI Python backends, PostgreSQL databases, and Docker containerization."
    },
    {
      q: "Do I get full ownership and source code after project completion?",
      a: "Yes. All intellectual property, source code repositories, deployment scripts, and Docker images are transferred 100% to you upon project sign-off and completion."
    },
    {
      q: "How do payments and project development milestones work?",
      a: "After you accept an official quotation, you can complete the secure payment through our platform. The project is immediately marked as ACTIVE and assigned to engineering leads with real-time percentage progress updates and direct chat on your dashboard."
    }
  ];

  return (
    <div style={{ paddingTop: '72px' }}>
      <section style={{ padding: '60px 0 30px', textAlign: 'center', background: 'radial-gradient(circle at 50% 0%, rgba(0, 240, 255, 0.08) 0%, transparent 60%)' }}>
        <div className="container-custom">
          <div className="badge" style={{ marginBottom: '14px' }}>
            <HelpCircle size={14} />
            <span>KNOWLEDGE BASE</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: '#0B132B', marginBottom: '16px', fontWeight: 900 }}>
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#1E293B', maxWidth: '640px', margin: '0 auto', fontWeight: 500 }}>
            Everything you need to know about Cognisys engineering services, web platforms, quotations, and student mentorship.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ paddingTop: '20px' }}>
        <div className="container-custom" style={{ maxWidth: '840px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="glass-panel"
                  style={{
                    padding: '22px 28px',
                    cursor: 'pointer',
                    background: isOpen ? '#F8FAFC' : '#FFFFFF',
                    borderColor: isOpen ? 'rgba(2, 132, 199, 0.4)' : 'rgba(15, 23, 42, 0.1)',
                    boxShadow: isOpen ? '0 10px 25px -5px rgba(2, 132, 199, 0.12)' : '0 4px 12px rgba(0,0,0,0.03)',
                    transition: 'all 0.25s ease'
                  }}
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.08rem', color: isOpen ? '#0284C7' : '#0B132B', fontWeight: 700 }}>
                      {faq.q}
                    </h3>
                    {isOpen ? <ChevronUp size={20} color="#0284C7" /> : <ChevronDown size={20} color="#0F172A" />}
                  </div>

                  {isOpen && (
                    <p style={{ marginTop: '14px', fontSize: '0.94rem', color: '#0F172A', lineHeight: 1.75, borderTop: '1px solid rgba(15, 23, 42, 0.08)', paddingTop: '14px', fontWeight: 500 }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <p style={{ color: '#0F172A', marginBottom: '16px', fontWeight: 700 }}>Still have specific questions?</p>
            <Link to="/contact" className="btn-primary">
              <span>Contact Engineering Desk</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
