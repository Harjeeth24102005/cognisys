import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingCart, FolderGit2, Calculator, CreditCard, 
  MessageSquare, FileCode, User, PlusCircle, ArrowRight, CheckCircle2, 
  Clock, AlertCircle, Download, Send, ExternalLink 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { VisualOrderTracker } from '../components/VisualOrderTracker';
import { QuotationModal } from '../components/QuotationModal';
import { PaymentModal } from '../components/PaymentModal';

export const Dashboard = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'orders');
  const [orders, setOrders] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [payments, setPayments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Modals
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [selectedOrderForPayment, setSelectedOrderForPayment] = useState(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login?redirect=/dashboard');
    }
  }, [authLoading, isAuthenticated, navigate]);

  const loadData = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const [ordersData, quotesData, projData, payData, msgData] = await Promise.all([
        api.getOrders(),
        api.getQuotations(),
        api.getMyProjects(),
        api.getPayments(),
        api.getMessages()
      ]);
      setOrders(ordersData);
      setQuotations(quotesData);
      setProjects(projData);
      setPayments(payData);
      setMessages(msgData);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [isAuthenticated]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    setSearchParams({ tab: tabKey });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    try {
      const msg = await api.sendMessage({ content: newMessage });
      setMessages(prev => [...prev, msg]);
      setNewMessage('');
    } catch (err) {
      alert('Failed to send message: ' + err.message);
    }
  };

  if (authLoading || (!user && loading)) {
    return (
      <div style={{ paddingTop: '140px', textAlign: 'center', minHeight: '60vh' }}>
        <div className="badge">INITIALIZING CUSTOMER PORTAL...</div>
      </div>
    );
  }

  // Calculate stats
  const activeProjectsCount = projects.filter(p => p.status !== 'COMPLETED').length;
  const pendingOrdersCount = orders.filter(o => !['COMPLETED', 'CANCELLED'].includes(o.status)).length;
  const completedProjectsCount = projects.filter(p => p.status === 'COMPLETED').length;
  const pendingQuotesCount = quotations.filter(q => q.status === 'PENDING').length;

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh', background: '#F8FAFC' }}>
      {/* Top Banner */}
      <section style={{
        padding: '36px 0 24px',
        borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
        background: '#FFFFFF'
      }}>
        <div className="container-custom">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div className="badge" style={{ marginBottom: '8px' }}>CUSTOMER COMMAND CENTER</div>
              <h1 style={{ fontSize: '1.8rem', color: '#0B132B', fontWeight: 800 }}>
                Welcome, {user?.full_name}
              </h1>
              <p style={{ fontSize: '0.92rem', color: '#1E293B', fontWeight: 500 }}>
                Track active engineering milestones, review itemized quotations, and communicate with Cognisys engineers.
              </p>
            </div>

            <Link to="/order" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.88rem' }}>
              <PlusCircle size={16} />
              <span>New Project Request</span>
            </Link>
          </div>

          {/* Quick Stat Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            marginTop: '28px'
          }}>
            <div className="glass-panel" style={{ padding: '18px', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#0F172A', fontWeight: 700 }}>ACTIVE PROJECTS</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0284C7', marginTop: '4px' }}>{activeProjectsCount}</div>
            </div>
            <div className="glass-panel" style={{ padding: '18px', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#0F172A', fontWeight: 700 }}>PENDING ORDERS</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#7C3AED', marginTop: '4px' }}>{pendingOrdersCount}</div>
            </div>
            <div className="glass-panel" style={{ padding: '18px', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#0F172A', fontWeight: 700 }}>PENDING QUOTATIONS</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#D97706', marginTop: '4px' }}>{pendingQuotesCount}</div>
            </div>
            <div className="glass-panel" style={{ padding: '18px', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#0F172A', fontWeight: 700 }}>COMPLETED BUILDS</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#059669', marginTop: '4px' }}>{completedProjectsCount}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Workspace */}
      <section style={{ padding: '32px 0 80px' }}>
        <div className="container-custom">
          {/* Navigation Tabs */}
          <div className="touch-scroll-x" style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderBottom: '1px solid rgba(15, 23, 42, 0.12)',
            paddingBottom: '12px',
            marginBottom: '32px'
          }}>
            {[
              { key: 'orders', label: 'My Orders', icon: ShoppingCart, count: orders.length },
              { key: 'quotations', label: 'Quotations', icon: Calculator, count: quotations.length },
              { key: 'projects', label: 'Live Projects', icon: FolderGit2, count: projects.length },
              { key: 'payments', label: 'Payments', icon: CreditCard, count: payments.length },
              { key: 'messages', label: 'Engineering Chat', icon: MessageSquare, count: messages.length },
              { key: 'profile', label: 'Account Profile', icon: User }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  style={{
                    background: isActive ? '#0284C7' : '#FFFFFF',
                    border: isActive ? '1px solid #0284C7' : '1px solid rgba(15, 23, 42, 0.15)',
                    color: isActive ? '#FFFFFF' : '#0F172A',
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    whiteSpace: 'nowrap',
                    boxShadow: isActive ? '0 4px 12px rgba(2, 132, 199, 0.25)' : '0 1px 3px rgba(0,0,0,0.03)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      background: isActive ? 'rgba(255,255,255,0.25)' : '#F1F5F9',
                      color: isActive ? '#FFFFFF' : '#0B132B',
                      padding: '1px 6px',
                      borderRadius: '10px'
                    }}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* TAB 1: MY ORDERS */}
          {activeTab === 'orders' && (
            <div>
              {orders.length === 0 ? (
                <div className="glass-panel" style={{ padding: '48px', textAlign: 'center', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)' }}>
                  <ShoppingCart size={40} color="#0284C7" style={{ margin: '0 auto 16px' }} />
                  <h3 style={{ color: '#0B132B', fontWeight: 800, marginBottom: '8px' }}>No Orders Found</h3>
                  <p style={{ color: '#1E293B', marginBottom: '24px', fontSize: '0.95rem' }}>
                    You haven't requested any custom engineering projects yet.
                  </p>
                  <Link to="/order" className="btn-primary">
                    <span>Create Your First Order Request</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {orders.map((order) => (
                    <div key={order.id} className="glass-panel" style={{ padding: '28px', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)', boxShadow: '0 10px 25px -10px rgba(0,0,0,0.05)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span className="badge">ORDER #{order.order_number}</span>
                            <span style={{ fontSize: '0.82rem', color: '#0F172A', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                              {new Date(order.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 style={{ fontSize: '1.3rem', color: '#0B132B', fontWeight: 700, marginBottom: '4px' }}>
                            {order.title}
                          </h3>
                          <div style={{ fontSize: '0.85rem', color: '#0284C7', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                            Domain: {order.service_name}
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                          {order.status === 'QUOTATION' && (
                            <button
                              onClick={() => {
                                const q = quotations.find(qt => qt.order_id === order.id);
                                if (q) setSelectedQuote(q);
                                else handleTabChange('quotations');
                              }}
                              className="btn-primary"
                              style={{ fontSize: '0.85rem', padding: '8px 16px' }}
                            >
                              Review Quotation
                            </button>
                          )}

                          {order.status === 'APPROVED' && (
                            <button
                              onClick={() => {
                                const q = quotations.find(qt => qt.order_id === order.id);
                                setSelectedOrderForPayment({ order, quotation: q });
                              }}
                              className="btn-primary"
                              style={{ fontSize: '0.85rem', padding: '8px 16px' }}
                            >
                              Make Payment
                            </button>
                          )}
                        </div>
                      </div>

                      {/* 8-Stage Progress Tracker */}
                      <div style={{ margin: '20px 0' }}>
                        <VisualOrderTracker status={order.status} />
                      </div>

                      <p style={{ fontSize: '0.92rem', color: '#0F172A', lineHeight: 1.6, background: '#F8FAFC', padding: '14px 18px', borderRadius: '8px', border: '1px solid rgba(15, 23, 42, 0.12)' }}>
                        <strong style={{ color: '#0B132B' }}>Requirements:</strong> {order.description}
                      </p>

                      {order.admin_notes && (
                        <div style={{ marginTop: '12px', fontSize: '0.88rem', color: '#0369A1', background: 'rgba(2, 132, 199, 0.08)', padding: '12px 16px', borderRadius: '6px', borderLeft: '4px solid #0284C7' }}>
                          <strong style={{ color: '#0B132B' }}>Engineering Note:</strong> {order.admin_notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: QUOTATIONS */}
          {activeTab === 'quotations' && (
            <div>
              {quotations.length === 0 ? (
                <div className="glass-panel" style={{ padding: '48px', textAlign: 'center', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)' }}>
                  <Calculator size={40} color="#0284C7" style={{ margin: '0 auto 16px' }} />
                  <h3 style={{ color: '#0B132B', fontWeight: 800, marginBottom: '8px' }}>No Quotations Generated Yet</h3>
                  <p style={{ color: '#1E293B', fontSize: '0.95rem' }}>
                    Once our engineering team reviews your order, official itemized quotations will appear here.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                  {quotations.map((quote) => (
                    <div key={quote.id} className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)', boxShadow: '0 10px 25px -10px rgba(0,0,0,0.05)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                        <div className="badge">QUOTATION #{quote.id}</div>
                        <div className={`badge ${quote.status === 'ACCEPTED' ? 'badge-emerald' : quote.status === 'REJECTED' ? 'badge-amber' : ''}`}>
                          {quote.status}
                        </div>
                      </div>

                      <div style={{ fontSize: '0.82rem', color: '#0F172A', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '6px' }}>
                        ORDER #{quote.order_id}
                      </div>

                      <div style={{
                        fontSize: '1.8rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 800,
                        color: '#0284C7',
                        marginBottom: '8px'
                      }}>
                        ₹{quote.total_amount.toLocaleString()}
                      </div>

                      <div style={{ fontSize: '0.9rem', color: '#1E293B', marginBottom: '20px' }}>
                        Timeline: <strong style={{ color: '#0B132B' }}>{quote.estimated_delivery}</strong>
                      </div>

                      <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(15, 23, 42, 0.08)' }}>
                        <button
                          onClick={() => setSelectedQuote(quote)}
                          className="btn-primary"
                          style={{ width: '100%', fontSize: '0.85rem' }}
                        >
                          Inspect Breakdown & Decide
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: LIVE PROJECTS */}
          {activeTab === 'projects' && (
            <div>
              {projects.length === 0 ? (
                <div className="glass-panel" style={{ padding: '48px', textAlign: 'center', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)' }}>
                  <FolderGit2 size={40} color="#7C3AED" style={{ margin: '0 auto 16px' }} />
                  <h3 style={{ color: '#0B132B', fontWeight: 800, marginBottom: '8px' }}>No Active Project Pipelines</h3>
                  <p style={{ color: '#1E293B', fontSize: '0.95rem' }}>
                    Accepted and funded orders will instantiate live project tracking with real-time percentage completion.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {projects.map((proj) => (
                    <div key={proj.id} className="glass-panel" style={{ padding: '28px', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)', boxShadow: '0 10px 25px -10px rgba(0,0,0,0.05)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                        <div>
                          <div className="badge badge-emerald" style={{ marginBottom: '6px' }}>{proj.status}</div>
                          <h3 style={{ fontSize: '1.3rem', color: '#0B132B', fontWeight: 700 }}>{proj.title}</h3>
                          <div style={{ fontSize: '0.85rem', color: '#0F172A', fontWeight: 600 }}>{proj.category}</div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.6rem', fontWeight: 800, color: '#0284C7' }}>
                            {proj.progress_pct}%
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#0F172A', fontWeight: 700 }}>COMPLETION</div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div style={{ width: '100%', height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden', marginBottom: '20px' }}>
                        <div style={{ width: `${proj.progress_pct}%`, height: '100%', background: 'linear-gradient(90deg, #0284C7, #10B981)', transition: 'width 0.5s ease' }} />
                      </div>

                      <p style={{ fontSize: '0.92rem', color: '#1E293B', marginBottom: '20px', lineHeight: 1.6 }}>
                        {proj.description}
                      </p>

                      {/* Deliverables / Files attached to project */}
                      {proj.files && proj.files.length > 0 && (
                        <div style={{ borderTop: '1px solid rgba(15, 23, 42, 0.08)', paddingTop: '16px' }}>
                          <h4 style={{ fontSize: '0.85rem', color: '#0284C7', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '10px' }}>
                            PROJECT ARTIFACTS & DELIVERABLES:
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {proj.files.map((f) => (
                              <div key={f.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8FAFC', border: '1px solid rgba(15, 23, 42, 0.12)', padding: '10px 14px', borderRadius: '6px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#0B132B', fontWeight: 600 }}>
                                  <FileCode size={16} color="#0284C7" />
                                  <span>{f.filename}</span>
                                  <span style={{ fontSize: '0.75rem', color: '#0F172A' }}>({f.file_size})</span>
                                </div>
                                <a href={f.file_url} target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                                  <Download size={13} />
                                  <span>Download</span>
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PAYMENTS */}
          {activeTab === 'payments' && (
            <div>
              {payments.length === 0 ? (
                <div className="glass-panel" style={{ padding: '48px', textAlign: 'center', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)' }}>
                  <CreditCard size={40} color="#059669" style={{ margin: '0 auto 16px' }} />
                  <h3 style={{ color: '#0B132B', fontWeight: 800, marginBottom: '8px' }}>No Payment Transactions</h3>
                  <p style={{ color: '#1E293B', fontSize: '0.95rem' }}>
                    Processed transactions and tax invoices will be cataloged here.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {payments.map((p) => (
                    <div key={p.id} className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span className="badge badge-emerald">PAID</span>
                          <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: '#0B132B', fontWeight: 600 }}>{p.transaction_id}</span>
                        </div>
                        <div style={{ fontSize: '0.82rem', color: '#0F172A', fontWeight: 500 }}>
                          Method: {p.payment_method} | Date: {new Date(p.paid_at).toLocaleString()}
                        </div>
                      </div>
                      <div style={{ fontSize: '1.4rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#059669' }}>
                        ₹{p.amount.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', height: '600px', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)', boxShadow: '0 10px 25px -10px rgba(0,0,0,0.05)' }}>
              <div style={{ borderBottom: '1px solid rgba(15, 23, 42, 0.08)', paddingBottom: '14px', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.15rem', color: '#0B132B', fontWeight: 800 }}>Cognisys Direct Engineering Desk</h3>
                <div style={{ fontSize: '0.84rem', color: '#0F172A', fontWeight: 500 }}>Direct encrypted channel with assigned project engineers.</div>
              </div>

              {/* Message Thread */}
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '6px', marginBottom: '16px' }}>
                {messages.length === 0 ? (
                  <div style={{ textAlign: 'center', color: '#1E293B', margin: 'auto 0', fontSize: '0.92rem' }}>
                    No messages yet. Send a message to get direct updates from your assigned architect.
                  </div>
                ) : (
                  messages.map((m) => {
                    const isMe = m.sender_id === user?.id;
                    return (
                      <div
                        key={m.id}
                        style={{
                          alignSelf: isMe ? 'flex-end' : 'flex-start',
                          maxWidth: '75%',
                          background: isMe ? 'linear-gradient(135deg, rgba(2, 132, 199, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)' : '#F8FAFC',
                          border: isMe ? '1px solid rgba(2, 132, 199, 0.3)' : '1px solid rgba(15, 23, 42, 0.1)',
                          borderRadius: '12px',
                          padding: '12px 16px'
                        }}
                      >
                        <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: isMe ? '#0284C7' : '#7C3AED', fontWeight: 700, marginBottom: '4px' }}>
                          {isMe ? 'You' : `${m.sender_name || 'Cognisys Support'} [Architect]`}
                        </div>
                        <div style={{ fontSize: '0.92rem', color: '#0B132B', lineHeight: 1.5 }}>
                          {m.content}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#0F172A', textAlign: 'right', marginTop: '4px', fontWeight: 500 }}>
                          {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Input Bar */}
              <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Type your question or update for the engineering desk..."
                  className="input-futuristic"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit" className="btn-primary" style={{ padding: '0 20px' }}>
                  <Send size={16} />
                </button>
              </form>
            </div>
          )}

          {/* TAB 6: PROFILE */}
          {activeTab === 'profile' && (
            <div className="glass-panel" style={{ padding: '36px', maxWidth: '640px', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)', boxShadow: '0 10px 25px -10px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#0B132B', fontWeight: 800, marginBottom: '20px' }}>
                Account Information
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#0F172A', fontWeight: 700 }}>FULL NAME</div>
                  <div style={{ fontSize: '1.05rem', color: '#0B132B', fontWeight: 700 }}>{user?.full_name}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#0F172A', fontWeight: 700 }}>EMAIL ADDRESS</div>
                  <div style={{ fontSize: '1rem', color: '#0B132B', fontWeight: 600 }}>{user?.email}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#0F172A', fontWeight: 700 }}>CONTACT NUMBER</div>
                  <div style={{ fontSize: '1rem', color: '#0B132B', fontWeight: 600 }}>{user?.phone || 'Not configured'}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#0F172A', fontWeight: 700 }}>ACCOUNT ROLE</div>
                  <div className="badge">{user?.role?.toUpperCase()}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Modals */}
      {selectedQuote && (
        <QuotationModal
          quotation={selectedQuote}
          onClose={() => setSelectedQuote(null)}
          onActionComplete={() => {
            loadData();
          }}
        />
      )}

      {selectedOrderForPayment && (
        <PaymentModal
          order={selectedOrderForPayment.order}
          quotation={selectedOrderForPayment.quotation}
          onClose={() => setSelectedOrderForPayment(null)}
          onPaymentSuccess={() => {
            setSelectedOrderForPayment(null);
            loadData();
          }}
        />
      )}
    </div>
  );
};
