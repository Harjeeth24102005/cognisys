import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, Globe, Code, GraduationCap, ShieldCheck, Cpu, 
  ArrowRight, CheckCircle2, Zap, Layers, Server, Terminal, Lock 
} from 'lucide-react';
import { AboutStoryExperience } from '../components3d/AboutStoryExperience';

export const About = () => {
  return (
    <div style={{ paddingTop: '72px' }}>
      {/* 1. INTRO & 3D STORYTELLING EXPERIENCE */}
      <section style={{ padding: '40px 0 20px', textAlign: 'center' }}>
        <div className="container-custom">
          <div className="badge" style={{ marginBottom: '14px' }}>INTERACTIVE ECOSYSTEM</div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', marginBottom: '14px', fontWeight: 900 }}>
            COGNISYS<br />
            <span className="text-gradient">INTELLIGENCE IN MOTION</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto 28px' }}>
            "Scroll to explore what we build." Journey through our computer vision surveillance systems, modern web applications, scalable software architectures, and student innovation lab.
          </p>
        </div>
      </section>

      {/* 2. THE MASTER 3D STORYTELLING CANVAS COMPONENT */}
      <AboutStoryExperience />

      {/* 3. DETAILED HTML CONTENT BREAKDOWN SECTIONS */}
      
      {/* SECTION 1: AI CCTV MONITORING */}
      <section id="cctv-details" className="section-padding" style={{ borderBottom: '1px solid #E2E8F0', background: '#FFFFFF' }}>
        <div className="container-custom">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center'
          }}>
            <div>
              <div className="badge badge-cyan" style={{ marginBottom: '14px' }}>COMPUTER VISION & SURVEILLANCE</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#0B132B', marginBottom: '18px', fontWeight: 900 }}>
                AI CCTV Monitoring & Intelligent Surveillance
              </h2>
              <p style={{ fontSize: '1rem', color: '#1E293B', lineHeight: 1.7, marginBottom: '24px', fontWeight: 500 }}>
                We convert standard IP camera streams into autonomous intelligence engines. By leveraging optimized TensorRT models and multi-object tracking algorithms, Cognisys detects anomalies and generates actionable real-time alerts.
              </p>

              <h4 style={{ fontSize: '0.95rem', color: '#0284C7', fontFamily: 'var(--font-mono)', marginBottom: '14px', fontWeight: 700 }}>
                WHAT WE PROVIDE:
              </h4>

              <div className="about-checklist-grid" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '32px'
              }}>
                {[
                  "Real-time monitoring", "Person detection",
                  "Face recognition", "Multi-person tracking",
                  "Attendance monitoring", "Intelligent alerts",
                  "Surveillance analytics", "Custom AI integration"
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#0F172A', fontWeight: 600 }}>
                    <CheckCircle2 size={16} color="#00B4D8" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/services/ai-cctv" className="btn-primary">
                <span>Request AI CCTV Solution</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Visual Specs Card */}
            <div className="glass-panel tilt-card" style={{ padding: '32px', position: 'relative', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: '#0284C7', marginBottom: '16px', fontWeight: 700 }}>
                [ SURVEILLANCE PIPELINE ARCHITECTURE ]
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0B132B' }}>Stage 1: Multi-Stream RTSP Ingestion</div>
                  <div style={{ fontSize: '0.78rem', color: '#1E293B', marginTop: '2px', fontWeight: 500 }}>GPU-accelerated hardware decoding across up to 32 concurrent channels.</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0284C7' }}>Stage 2: YOLOv11 & DeepSORT Inference</div>
                  <div style={{ fontSize: '0.78rem', color: '#1E293B', marginTop: '2px', fontWeight: 500 }}>Sub-50ms bounding box prediction and persistent trajectory association.</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#7C3AED' }}>Stage 3: ArcFace Biometrics & Verification</div>
                  <div style={{ fontSize: '0.78rem', color: '#1E293B', marginTop: '2px', fontWeight: 500 }}>Automated staff attendance logging and unauthorized intruder detection.</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#059669' }}>Stage 4: Real-time Cloud Telemetry & Alert Dispatch</div>
                  <div style={{ fontSize: '0.78rem', color: '#1E293B', marginTop: '2px', fontWeight: 500 }}>Instant multi-channel push alerts, SMS notifications and live dashboard sync.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WEB DEVELOPMENT */}
      <section id="web-details" className="section-padding" style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container-custom">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center'
          }}>
            <div className="glass-panel tilt-card" style={{ padding: '32px', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: '#0284C7', marginBottom: '16px', fontWeight: 700 }}>
                [ DIGITAL PRODUCT LIFECYCLE ]
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#0284C7', fontWeight: 800 }}>01.</span>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0B132B' }}>Idea & User Experience Wireframing</div>
                    <div style={{ fontSize: '0.75rem', color: '#1E293B', fontWeight: 500 }}>Figma prototypes, interaction design & user flows.</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#0284C7', fontWeight: 800 }}>02.</span>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0B132B' }}>Interactive High-Performance Modern Frontend</div>
                    <div style={{ fontSize: '0.75rem', color: '#1E293B', fontWeight: 500 }}>React, modern components, smooth animations, optimized bundle.</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#0284C7', fontWeight: 800 }}>03.</span>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0B132B' }}>Python REST API & Database Architecture</div>
                    <div style={{ fontSize: '0.75rem', color: '#1E293B', fontWeight: 500 }}>FastAPI, SQLAlchemy, PostgreSQL, Redis caching.</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#0284C7', fontWeight: 800 }}>04.</span>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0B132B' }}>Cloud Deployment & Live Production</div>
                    <div style={{ fontSize: '0.75rem', color: '#1E293B', fontWeight: 500 }}>Docker, CI/CD automated test pipelines, SSL security.</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="badge badge-purple" style={{ marginBottom: '14px' }}>WEB & PLATFORM ENGINEERING</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#0B132B', marginBottom: '18px', fontWeight: 900 }}>
                Web & Software Development
              </h2>
              <p style={{ fontSize: '1rem', color: '#1E293B', lineHeight: 1.7, marginBottom: '24px', fontWeight: 500 }}>
                "We build modern digital products designed around your requirements." From sleek responsive web platforms to mission-critical SaaS platforms, we combine aesthetics with high computational performance.
              </p>

              <div className="about-checklist-grid" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '32px'
              }}>
                {[
                  "Business websites", "Web applications",
                  "E-commerce", "Admin dashboards",
                  "Database systems", "REST APIs",
                  "Custom software", "Automation systems"
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#0F172A', fontWeight: 600 }}>
                    <CheckCircle2 size={16} color="#7C3AED" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/services/web-development" className="btn-primary">
                <span>Start Your Website</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: STUDENT INNOVATION LAB */}
      <section id="student-details" className="section-padding" style={{ borderBottom: '1px solid #E2E8F0', background: '#FFFFFF' }}>
        <div className="container-custom">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center'
          }}>
            <div>
              <div className="badge badge-emerald" style={{ marginBottom: '14px' }}>ACADEMIC & RESEARCH LAB</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#0B132B', marginBottom: '18px', fontWeight: 900 }}>
                Student Projects & Capstones
              </h2>
              <p style={{ fontSize: '1rem', color: '#1E293B', lineHeight: 1.7, marginBottom: '24px', fontWeight: 500 }}>
                "Turn your idea into a working project." Cognisys empowers engineering and computer science students with full source code, IEEE-format reports, architecture diagrams, and comprehensive demonstration guidance.
              </p>

              <div className="about-checklist-grid" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '32px'
              }}>
                {[
                  "AI/ML projects", "Computer Vision",
                  "Data Science", "Web Development",
                  "Python projects", "IoT & Embedded",
                  "Database projects", "Final-year Capstones"
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#0F172A', fontWeight: 600 }}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/services/student-projects" className="btn-primary">
                <span>Discuss Your Project</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="glass-panel tilt-card" style={{ padding: '32px', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: '#059669', marginBottom: '16px', fontWeight: 700 }}>
                [ 6-STAGE STUDENT INCUBATION PIPELINE ]
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { step: "01", title: "IDEA SCOPING", desc: "Refine concept into an IEEE-standard problem statement." },
                  { step: "02", title: "PROJECT PLAN", desc: "Select optimal tech stack, datasets and system hardware." },
                  { step: "03", title: "DEVELOPMENT", desc: "Write clean, modular code with detailed documentation." },
                  { step: "04", title: "TESTING & METRICS", desc: "Verify accuracy, run benchmarks and latency profiling." },
                  { step: "05", title: "IEEE DOCUMENTATION", desc: "Generate report synopsis, block diagrams and presentation." },
                  { step: "06", title: "LIVE DEMO & VIVA", desc: "Conduct 1-on-1 walkthrough and viva question preparation." }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', color: '#059669', fontWeight: 800, fontSize: '0.85rem' }}>{item.step}</span>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0B132B' }}>{item.title}</div>
                      <div style={{ fontSize: '0.74rem', color: '#1E293B', fontWeight: 500 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: MSME REGISTRATION */}
      <section style={{ padding: '48px 0', background: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
        <div className="container-custom" style={{ maxWidth: '960px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #F8FAFC 0%, #F0F9FF 100%)',
            border: '1px solid #BAE6FD',
            borderRadius: '16px',
            padding: '36px',
            boxShadow: '0 8px 24px -6px rgba(0, 180, 216, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '14px',
              background: 'rgba(0, 180, 216, 0.12)',
              border: '1px solid rgba(0, 180, 216, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0284C7',
              flexShrink: 0
            }}>
              <ShieldCheck size={32} />
            </div>
            <div style={{ flex: 1, minWidth: '260px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(2, 132, 199, 0.1)', color: '#0284C7', fontSize: '0.72rem', fontWeight: 800, padding: '3px 10px', borderRadius: '20px', marginBottom: '8px', letterSpacing: '0.05em' }}>
                GOVERNMENT OF INDIA RECOGNIZED
              </div>
              <h3 style={{ fontSize: '1.3rem', color: '#0B132B', fontWeight: 800, marginBottom: '6px' }}>
                MSME Registered Technology Enterprise
              </h3>
              <p style={{ fontSize: '0.94rem', color: '#334155', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                Cognisys is an officially registered enterprise under the Ministry of Micro, Small and Medium Enterprises (MSME), Government of India. We adhere strictly to national engineering standards, corporate compliance, and verified technological practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY COGNISYS SUMMARY & FINAL CTA */}
      <section className="section-padding" style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
        <div className="container-custom" style={{ textAlign: 'center' }}>
          <div className="badge badge-cyan" style={{ marginBottom: '14px' }}>THE COGNISYS PROMISE</div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#0B132B', marginBottom: '18px', fontWeight: 900 }}>
            WHY COGNISYS?
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#1E293B', maxWidth: '680px', margin: '0 auto 40px', lineHeight: 1.7, fontWeight: 500 }}>
            "From idea to implementation, Cognisys helps turn technology into real solutions."
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            maxWidth: '1000px',
            margin: '0 auto 48px'
          }}>
            {[
              { title: "AI-Driven", desc: "Neural intelligence in every build" },
              { title: "Innovative", desc: "Award-winning UI & UX design" },
              { title: "Custom Solutions", desc: "Tailored to your exact workflow" },
              { title: "Modern Tech", desc: "React, Python FastAPI, PyTorch" },
              { title: "Practical Engineering", desc: "Robust, tested, zero fluff" },
              { title: "End-to-End Support", desc: "Long term updates & mentoring" }
            ].map((item, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '20px', textAlign: 'center', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
                <h4 style={{ fontSize: '1.05rem', color: '#0284C7', marginBottom: '6px', fontWeight: 800 }}>{item.title}</h4>
                <p style={{ fontSize: '0.85rem', color: '#1E293B', fontWeight: 500 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <Link to="/order" className="btn-primary" style={{ padding: '14px 32px', fontSize: '1rem' }}>
            <span>Start Your Project With Cognisys</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};
