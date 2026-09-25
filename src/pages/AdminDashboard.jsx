import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Shield, Users, ShoppingCart, FolderGit2, Calculator, CreditCard, 
  MessageSquare, Newspaper, Settings, Plus, CheckCircle2, AlertTriangle, 
  ExternalLink, Edit, Trash2, Send, ArrowRight, TrendingUp, DollarSign 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('orders');
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [authLogs, setAuthLogs] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Status & Quotation Modal Form States
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [quoteForm, setQuoteForm] = useState({
    development_cost: '',
    additional_cost: 0,
    discount: 0,
    estimated_delivery: '',
    deliverables_json: '["Full Source Code", "Deployment Documentation"]',
    notes: ''
  });
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Blog Create Form State
  const [newBlog, setNewBlog] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    category: 'Computer Vision & AI',
    read_time: '5 min read'
  });
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

  // Project Edit State
  const [selectedProject, setSelectedProject] = useState(null);
  const [projProgress, setProjProgress] = useState(50);
  const [projStatus, setProjStatus] = useState('IN_PROGRESS');

  useEffect(() => {
    if (!authLoading) {
      if (!user || !isAdmin) {
        navigate('/login?redirect=/admin');
      }
    }
  }, [authLoading, user, isAdmin, navigate]);

  const loadAllAdminData = async () => {
    if (!isAdmin) return;
    setLoading(true);
    try {
      const [statsData, ordersData, quotesData, projData, usersData, blogData, msgData, logsData] = await Promise.all([
        api.getAdminStats(),
        api.getOrders(),
        api.getQuotations(),
        api.getMyProjects(),
        api.getAdminUsers(),
        api.getBlogPosts('all'),
        api.getMessages(),
        api.getAuthLogs()
      ]);
      setStats(statsData);
      setOrders(ordersData);
      setQuotations(quotesData);
      setProjects(projData);
      setUsersList(usersData);
      setBlogPosts(blogData);
      setMessages(msgData);
      setAuthLogs(logsData || []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllAdminData();
  }, [isAdmin]);

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.updateOrderStatus(orderId, { status: newStatus });
      loadAllAdminData();
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const handleDeleteOrder = async (orderId, orderNum) => {
    if (window.confirm(`Are you sure you want to permanently delete Order #${orderNum}? This action cannot be undone.`)) {
      try {
        await api.deleteOrder(orderId);
        loadAllAdminData();
        alert(`Order #${orderNum} deleted successfully.`);
      } catch (err) {
        alert('Failed to delete order: ' + err.message);
      }
    }
  };

  const handleCreateQuotation = async (e) => {
    e.preventDefault();
    if (!selectedOrder) return;
    try {
      await api.createQuotation({
        order_id: selectedOrder.id,
        development_cost: parseFloat(quoteForm.development_cost),
        additional_cost: parseFloat(quoteForm.additional_cost || 0),
        discount: parseFloat(quoteForm.discount || 0),
        estimated_delivery: quoteForm.estimated_delivery,
        deliverables_json: quoteForm.deliverables_json,
        notes: quoteForm.notes
      });
      setIsQuoteModalOpen(false);
      setSelectedOrder(null);
      loadAllAdminData();
      alert('Quotation generated and dispatched to customer dashboard!');
    } catch (err) {
      alert('Failed to create quotation: ' + err.message);
    }
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    if (!selectedProject) return;
    try {
      await api.updateProject(selectedProject.id, {
        progress_pct: parseInt(projProgress),
        status: projStatus
      });
      setSelectedProject(null);
      loadAllAdminData();
      alert('Project progress updated!');
    } catch (err) {
      alert('Failed to update project: ' + err.message);
    }
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      await api.createBlogPost(newBlog);
      setIsBlogModalOpen(false);
      setNewBlog({ title: '', slug: '', summary: '', content: '', category: 'Computer Vision & AI', read_time: '5 min read' });
      loadAllAdminData();
      alert('Blog post published!');
    } catch (err) {
      alert('Failed to publish post: ' + err.message);
    }
  };

  if (authLoading || (loading && !stats)) {
    return (
      <div style={{ paddingTop: '140px', textAlign: 'center', minHeight: '60vh' }}>
        <div className="badge badge-violet">INITIALIZING ADMIN COMMAND CENTER...</div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh', background: '#F8FAFC' }}>
      {/* Top Admin Header */}
      <section style={{
        padding: '36px 0 24px',
        borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
        background: '#FFFFFF'
      }}>
        <div className="container-custom">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div className="badge badge-violet" style={{ marginBottom: '8px' }}>
                <Shield size={14} />
                <span>COGNISYS PRINCIPAL ADMIN</span>
              </div>
              <h1 style={{ fontSize: '1.8rem', color: '#0B132B', fontWeight: 800 }}>
                Operations Command Center
              </h1>
              <div style={{ fontSize: '0.92rem', color: '#1E293B', fontWeight: 500 }}>
                System governance, customer order processing, quotations, live project tracking & CMS.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setIsBlogModalOpen(true)}
                className="btn-primary"
                style={{ fontSize: '0.85rem', padding: '8px 16px' }}
              >
                <Plus size={15} />
                <span>Write Blog Post</span>
              </button>
            </div>
          </div>

          {/* Metric KPI Widgets */}
          {stats && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '16px',
              marginTop: '28px'
            }}>
              <div className="glass-panel" style={{ padding: '18px', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <div style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: '#0F172A', fontWeight: 700 }}>TOTAL USERS</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0B132B', marginTop: '4px' }}>{stats.total_users}</div>
              </div>
              <div className="glass-panel" style={{ padding: '18px', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <div style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: '#0F172A', fontWeight: 700 }}>VERIFIED ORDERS</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0284C7', marginTop: '4px' }}>{stats.total_orders}</div>
              </div>
              <div className="glass-panel" style={{ padding: '18px', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <div style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: '#0F172A', fontWeight: 700 }}>ACTIVE PROJECTS</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#7C3AED', marginTop: '4px' }}>{stats.active_projects}</div>
              </div>
              <div className="glass-panel" style={{ padding: '18px', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <div style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: '#0F172A', fontWeight: 700 }}>PENDING QUOTES</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#D97706', marginTop: '4px' }}>{stats.pending_quotations}</div>
              </div>
              <div className="glass-panel" style={{ padding: '18px', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <div style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: '#0F172A', fontWeight: 700 }}>TOTAL REVENUE</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#059669', marginTop: '4px' }}>₹{stats.total_revenue.toLocaleString()}</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Admin Tabs */}
      <section style={{ padding: '32px 0 80px' }}>
        <div className="container-custom">
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
              { key: 'orders', label: 'Orders Management', icon: ShoppingCart, count: orders.length },
              { key: 'quotations', label: 'Quotations', icon: Calculator, count: quotations.length },
              { key: 'projects', label: 'Live Projects', icon: FolderGit2, count: projects.length },
              { key: 'users', label: 'Users Directory', icon: Users, count: usersList.length },
              { key: 'blog', label: 'Blog CMS', icon: Newspaper, count: blogPosts.length },
              { key: 'messages', label: 'Customer Inquiries', icon: MessageSquare, count: messages.length }
            ].map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  style={{
                    background: isActive ? '#7C3AED' : '#FFFFFF',
                    border: isActive ? '1px solid #7C3AED' : '1px solid rgba(15, 23, 42, 0.15)',
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
                    boxShadow: isActive ? '0 4px 12px rgba(124, 58, 237, 0.25)' : '0 1px 3px rgba(0,0,0,0.03)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Icon size={16} />
                  <span>{t.label}</span>
                  {t.count !== undefined && (
                    <span style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      background: isActive ? 'rgba(255,255,255,0.25)' : '#F1F5F9',
                      color: isActive ? '#FFFFFF' : '#0B132B',
                      padding: '1px 6px',
                      borderRadius: '10px'
                    }}>
                      {t.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* TAB 1: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div>
              {orders.length === 0 ? (
                <div className="glass-panel" style={{ padding: '56px 24px', textAlign: 'center', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)' }}>
                  <ShoppingCart size={44} color="#0284C7" style={{ margin: '0 auto 16px' }} />
                  <h3 style={{ fontSize: '1.4rem', color: '#0B132B', fontWeight: 800, marginBottom: '8px' }}>No Live Orders Found</h3>
                  <p style={{ fontSize: '0.95rem', color: '#1E293B', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
                    Incoming orders whose specifications are confirmed and dispatched via email to <strong>contact.cognisys@gmail.com</strong> will appear here automatically.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {orders.map((ord) => {
                    let cartItems = [];
                    try {
                      if (ord.cart_items_json) {
                        cartItems = JSON.parse(ord.cart_items_json);
                      }
                    } catch (e) {}

                    return (
                      <div key={ord.id} className="glass-panel" style={{ padding: '24px', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)', boxShadow: '0 10px 25px -10px rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
                              <span className="badge">ORDER #{ord.order_number}</span>
                              <span className="badge badge-violet">{ord.status}</span>
                              <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <CheckCircle2 size={12} />
                                <span>EMAIL DISPATCHED TO ENGINEERING</span>
                              </span>
                              <span style={{ fontSize: '0.8rem', color: '#0F172A', fontWeight: 600 }}>
                                {new Date(ord.created_at).toLocaleString()}
                              </span>
                            </div>
                            <h3 style={{ fontSize: '1.35rem', color: '#0B132B', fontWeight: 800, marginBottom: '4px' }}>{ord.title}</h3>
                          </div>

                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                            <button
                              onClick={() => {
                                setSelectedOrder(ord);
                                setIsQuoteModalOpen(true);
                              }}
                              className="btn-primary"
                              style={{ fontSize: '0.82rem', padding: '7px 16px' }}
                            >
                              <Calculator size={14} />
                              <span>Generate Quotation</span>
                            </button>

                            {/* Quick Status Changers */}
                            <select
                              value={ord.status}
                              onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                              style={{
                                background: '#FFFFFF',
                                border: '1px solid rgba(15, 23, 42, 0.2)',
                                borderRadius: '6px',
                                color: '#0B132B',
                                padding: '7px 12px',
                                fontSize: '0.82rem',
                                fontWeight: 700
                              }}
                            >
                              <option value="REQUESTED">REQUESTED</option>
                              <option value="REVIEWED">REVIEWED</option>
                              <option value="QUOTATION">QUOTATION</option>
                              <option value="APPROVED">APPROVED</option>
                              <option value="DEVELOPMENT">DEVELOPMENT</option>
                              <option value="TESTING">TESTING</option>
                              <option value="COMPLETED">COMPLETED</option>
                            </select>

                            <button
                              onClick={() => handleDeleteOrder(ord.id, ord.order_number)}
                              className="btn-secondary"
                              style={{
                                fontSize: '0.82rem',
                                padding: '7px 14px',
                                color: '#E11D48',
                                borderColor: 'rgba(225, 29, 72, 0.3)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px'
                              }}
                              title="Permanently remove this order"
                            >
                              <Trash2 size={14} color="#E11D48" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>

                        {/* Customer & Technical Specification Details */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                          gap: '12px',
                          padding: '14px 18px',
                          background: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          borderRadius: '8px',
                          marginBottom: '14px',
                          fontSize: '0.86rem'
                        }}>
                          <div>
                            <div style={{ fontSize: '0.72rem', color: '#0F172A', fontWeight: 700, textTransform: 'uppercase' }}>CLIENT NAME</div>
                            <div style={{ color: '#0B132B', fontWeight: 700, marginTop: '2px' }}>{ord.customer_name || 'Guest User'}</div>
                          </div>
                          <div>
                            <div style={{ fontSize: '0.72rem', color: '#0F172A', fontWeight: 700, textTransform: 'uppercase' }}>EMAIL ADDRESS</div>
                            <a href={`mailto:${ord.customer_email}`} style={{ color: '#0284C7', fontWeight: 600, textDecoration: 'none', marginTop: '2px', display: 'block' }}>
                              {ord.customer_email || 'Not provided'}
                            </a>
                          </div>
                          <div>
                            <div style={{ fontSize: '0.72rem', color: '#0F172A', fontWeight: 700, textTransform: 'uppercase' }}>PHONE NUMBER</div>
                            <a href={`tel:${ord.customer_phone}`} style={{ color: '#0F172A', fontWeight: 600, textDecoration: 'none', marginTop: '2px', display: 'block' }}>
                              {ord.customer_phone || 'Not provided'}
                            </a>
                          </div>
                          <div>
                            <div style={{ fontSize: '0.72rem', color: '#0F172A', fontWeight: 700, textTransform: 'uppercase' }}>DOMAIN / SERVICE</div>
                            <div style={{ color: '#7C3AED', fontWeight: 700, marginTop: '2px' }}>{ord.service_name}</div>
                          </div>
                          <div>
                            <div style={{ fontSize: '0.72rem', color: '#0F172A', fontWeight: 700, textTransform: 'uppercase' }}>BUDGET</div>
                            <div style={{ color: '#059669', fontWeight: 700, marginTop: '2px' }}>{ord.budget || 'Standard Estimate'}</div>
                          </div>
                          <div>
                            <div style={{ fontSize: '0.72rem', color: '#0F172A', fontWeight: 700, textTransform: 'uppercase' }}>TIMELINE</div>
                            <div style={{ color: '#D97706', fontWeight: 700, marginTop: '2px' }}>{ord.timeline || 'Standard Delivery'}</div>
                          </div>
                        </div>

                        {/* Cart Items if present */}
                        {Array.isArray(cartItems) && cartItems.length > 0 && (
                          <div style={{ marginBottom: '12px', padding: '12px 16px', background: '#F1F5F9', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', marginBottom: '6px' }}>
                              Order Add-ons / Package Services ({cartItems.length})
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                              {cartItems.map((item, idx) => (
                                <span key={idx} style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', color: '#0F172A', fontWeight: 600 }}>
                                  {item.name || item} {item.price ? `(₹${item.price})` : ''}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div style={{ fontSize: '0.92rem', color: '#0F172A', background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '14px 18px', borderRadius: '8px', lineHeight: 1.65 }}>
                          <strong style={{ color: '#0B132B' }}>Client Requirement Specifications:</strong>
                          <div style={{ marginTop: '6px', whiteSpace: 'pre-line', color: '#1E293B' }}>{ord.description}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: QUOTATIONS */}
          {activeTab === 'quotations' && (
            <div>
              {quotations.length === 0 ? (
                <div className="glass-panel" style={{ padding: '56px 24px', textAlign: 'center', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)' }}>
                  <Calculator size={44} color="#0284C7" style={{ margin: '0 auto 16px' }} />
                  <h3 style={{ fontSize: '1.4rem', color: '#0B132B', fontWeight: 800, marginBottom: '8px' }}>No Active Quotations</h3>
                  <p style={{ fontSize: '0.95rem', color: '#1E293B', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
                    Generate itemized quotations for incoming client orders from the Orders Management tab.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                  {quotations.map((q) => (
                    <div key={q.id} className="glass-panel" style={{ padding: '24px', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)', boxShadow: '0 10px 25px -10px rgba(0,0,0,0.05)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <span className="badge">QUOTATION #{q.id}</span>
                        <span className={`badge ${q.status === 'ACCEPTED' ? 'badge-emerald' : q.status === 'REJECTED' ? 'badge-amber' : ''}`}>
                          {q.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#0F172A', fontWeight: 600, marginBottom: '4px' }}>ORDER #{q.order_id}</div>
                      <div style={{ fontSize: '1.6rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#0284C7', marginBottom: '6px' }}>
                        ₹{q.total_amount.toLocaleString()}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#1E293B' }}>
                        Estimated Delivery: <strong style={{ color: '#0B132B' }}>{q.estimated_delivery}</strong>
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
                <div className="glass-panel" style={{ padding: '56px 24px', textAlign: 'center', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)' }}>
                  <FolderGit2 size={44} color="#7C3AED" style={{ margin: '0 auto 16px' }} />
                  <h3 style={{ fontSize: '1.4rem', color: '#0B132B', fontWeight: 800, marginBottom: '8px' }}>No Live Projects in Engineering Pipeline</h3>
                  <p style={{ fontSize: '0.95rem', color: '#1E293B', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
                    When a client's order is approved or put into active development, its real-time development pipeline will be managed here.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {projects.map((proj) => (
                    <div key={proj.id} className="glass-panel" style={{ padding: '24px', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)', boxShadow: '0 10px 25px -10px rgba(0,0,0,0.05)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                        <div>
                          <div className="badge badge-emerald" style={{ marginBottom: '4px' }}>{proj.status}</div>
                          <h3 style={{ fontSize: '1.25rem', color: '#0B132B', fontWeight: 800 }}>{proj.title}</h3>
                          <div style={{ fontSize: '0.84rem', color: '#0F172A', fontWeight: 600 }}>Order #{proj.order_id} | Client #{proj.user_id}</div>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedProject(proj);
                            setProjProgress(proj.progress_pct);
                            setProjStatus(proj.status);
                          }}
                          className="btn-secondary"
                          style={{ fontSize: '0.8rem', padding: '6px 14px' }}
                        >
                          <Edit size={14} />
                          <span>Update Progress ({proj.progress_pct}%)</span>
                        </button>
                      </div>

                      <div style={{ width: '100%', height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${proj.progress_pct}%`, height: '100%', background: 'linear-gradient(90deg, #0284C7, #10B981)' }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: USERS & AUTH ACTIVITY LOGS */}
          {activeTab === 'users' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {/* Table 1: Registered Accounts */}
              <div className="glass-panel" style={{ padding: '24px', overflowX: 'auto', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: '#0B132B', fontWeight: 800 }}>Registered Accounts Directory</h3>
                    <div style={{ fontSize: '0.84rem', color: '#64748B' }}>
                      All registered clients and administrators stored in the database.
                    </div>
                  </div>
                  <span className="badge badge-cyan">{usersList.length} Verified Accounts</span>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(15, 23, 42, 0.15)', color: '#0F172A', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                      <th style={{ padding: '12px 10px' }}>ID</th>
                      <th style={{ padding: '12px 10px' }}>NAME</th>
                      <th style={{ padding: '12px 10px' }}>EMAIL</th>
                      <th style={{ padding: '12px 10px' }}>AUTH METHOD</th>
                      <th style={{ padding: '12px 10px' }}>ROLE</th>
                      <th style={{ padding: '12px 10px' }}>JOINED</th>
                      <th style={{ padding: '12px 10px' }}>LAST SIGN-IN</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.map((u) => (
                      <tr key={u.id} style={{ borderBottom: '1px solid rgba(15, 23, 42, 0.08)' }}>
                        <td style={{ padding: '14px 10px', color: '#0284C7', fontWeight: 700 }}>#{u.id}</td>
                        <td style={{ padding: '14px 10px', fontWeight: 700, color: '#0B132B' }}>{u.full_name}</td>
                        <td style={{ padding: '14px 10px', color: '#1E293B', fontWeight: 600 }}>{u.email}</td>
                        <td style={{ padding: '14px 10px' }}>
                          {u.google_id ? (
                            <span className="badge" style={{ background: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE' }}>Google OAuth</span>
                          ) : (
                            <span className="badge" style={{ background: '#F0FDF4', color: '#15803D', border: '1px solid #BBF7D0' }}>Email & Password</span>
                          )}
                        </td>
                        <td style={{ padding: '14px 10px' }}>
                          <span className={`badge ${u.role === 'admin' ? 'badge-violet' : ''}`}>{u.role}</span>
                        </td>
                        <td style={{ padding: '14px 10px', color: '#0F172A', fontWeight: 600 }}>
                          {new Date(u.created_at).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '14px 10px', color: u.last_login ? '#0284C7' : '#94A3B8', fontWeight: 600 }}>
                          {u.last_login ? new Date(u.last_login).toLocaleString() : 'Never logged in'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table 2: Persistent Authentication & Sign-in Activity Logs */}
              <div className="glass-panel" style={{ padding: '24px', overflowX: 'auto', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: '#0B132B', fontWeight: 800 }}>Authentication &amp; Sign-In Activity Logs</h3>
                    <div style={{ fontSize: '0.84rem', color: '#64748B' }}>
                      Real-time database records of all user registration and sign-in events.
                    </div>
                  </div>
                  <span className="badge badge-emerald">{authLogs.length} Total Auth Events</span>
                </div>

                {authLogs.length === 0 ? (
                  <div style={{ padding: '32px 16px', textAlign: 'center', color: '#64748B' }}>
                    No authentication events logged yet. New sign-up and sign-in activities will appear here in real-time.
                  </div>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(15, 23, 42, 0.15)', color: '#0F172A', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                        <th style={{ padding: '12px 10px' }}>LOG ID</th>
                        <th style={{ padding: '12px 10px' }}>USER EMAIL</th>
                        <th style={{ padding: '12px 10px' }}>ACTION EVENT</th>
                        <th style={{ padding: '12px 10px' }}>PROVIDER</th>
                        <th style={{ padding: '12px 10px' }}>STATUS</th>
                        <th style={{ padding: '12px 10px' }}>TIMESTAMP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {authLogs.map((log) => (
                        <tr key={log.id} style={{ borderBottom: '1px solid rgba(15, 23, 42, 0.06)' }}>
                          <td style={{ padding: '12px 10px', color: '#64748B', fontFamily: 'var(--font-mono)' }}>#{log.id}</td>
                          <td style={{ padding: '12px 10px', fontWeight: 700, color: '#0B132B' }}>{log.email}</td>
                          <td style={{ padding: '12px 10px' }}>
                            <span className="badge" style={{
                              background: log.event_type === 'SIGN_UP' ? '#ECFDF5' : '#EFF6FF',
                              color: log.event_type === 'SIGN_UP' ? '#059669' : '#0284C7',
                              borderColor: log.event_type === 'SIGN_UP' ? '#A7F3D0' : '#BFDBFE'
                            }}>
                              {log.event_type === 'SIGN_UP' ? 'ACCOUNT SIGN UP' : 'ACCOUNT SIGN IN'}
                            </span>
                          </td>
                          <td style={{ padding: '12px 10px', color: '#475569', fontWeight: 600 }}>
                            {log.auth_provider === 'GOOGLE' ? 'Google OAuth 2.0' : 'Email & Password'}
                          </td>
                          <td style={{ padding: '12px 10px' }}>
                            <span className="badge" style={{
                              background: log.status === 'SUCCESS' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                              color: log.status === 'SUCCESS' ? '#059669' : '#DC2626'
                            }}>
                              {log.status}
                            </span>
                          </td>
                          <td style={{ padding: '12px 10px', color: '#0F172A', fontWeight: 600 }}>
                            {new Date(log.created_at).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: BLOG CMS */}
          {activeTab === 'blog' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#0B132B', fontWeight: 800 }}>Published Articles & Research</h3>
                <button onClick={() => setIsBlogModalOpen(true)} className="btn-primary" style={{ fontSize: '0.85rem' }}>
                  <Plus size={15} />
                  <span>Create Article</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {blogPosts.map((post) => (
                  <div key={post.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.1)', boxShadow: '0 10px 25px -10px rgba(0,0,0,0.05)' }}>
                    <div className="badge" style={{ alignSelf: 'flex-start', marginBottom: '10px' }}>{post.category}</div>
                    <h4 style={{ fontSize: '1.1rem', color: '#0B132B', fontWeight: 700, marginBottom: '8px' }}>{post.title}</h4>
                    <p style={{ fontSize: '0.88rem', color: '#1E293B', lineHeight: 1.6, flex: 1, marginBottom: '16px' }}>
                      {post.summary}
                    </p>
                    <div style={{ borderTop: '1px solid rgba(15, 23, 42, 0.08)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.78rem', color: '#0F172A', fontWeight: 600 }}>{post.read_time}</span>
                      <button
                        onClick={async () => {
                          if (confirm('Delete post?')) {
                            await api.deleteBlogPost(post.id);
                            loadAllAdminData();
                          }
                        }}
                        style={{ background: 'none', border: 'none', color: '#E11D48', cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="glass-panel" style={{ padding: '24px', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#0B132B', fontWeight: 800, marginBottom: '16px' }}>Customer Inquiry Logs</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {messages.map((m) => (
                  <div key={m.id} style={{ background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid rgba(15, 23, 42, 0.12)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0284C7' }}>{m.sender_name} (#{m.sender_id})</span>
                      <span style={{ fontSize: '0.75rem', color: '#0F172A', fontWeight: 600 }}>{new Date(m.created_at).toLocaleString()}</span>
                    </div>
                    <div style={{ fontSize: '0.92rem', color: '#0F172A', fontWeight: 500 }}>{m.content}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CREATE QUOTATION MODAL */}
      {isQuoteModalOpen && selectedOrder && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '560px', padding: '32px', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
            <h3 style={{ fontSize: '1.35rem', color: '#0B132B', fontWeight: 800, marginBottom: '4px' }}>
              Generate Official Quotation
            </h3>
            <div style={{ fontSize: '0.88rem', color: '#0284C7', fontWeight: 600, marginBottom: '20px' }}>
              Order #{selectedOrder.order_number}: {selectedOrder.title}
            </div>

            <form onSubmit={handleCreateQuotation} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', color: '#0F172A', fontWeight: 600 }}>Development Cost (₹) *</label>
                <input
                  type="number"
                  required
                  className="input-futuristic"
                  value={quoteForm.development_cost}
                  onChange={(e) => setQuoteForm({ ...quoteForm, development_cost: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', color: '#0F172A', fontWeight: 600 }}>Additional Hardware Cost (₹)</label>
                  <input
                    type="number"
                    className="input-futuristic"
                    value={quoteForm.additional_cost}
                    onChange={(e) => setQuoteForm({ ...quoteForm, additional_cost: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', color: '#0F172A', fontWeight: 600 }}>Discount (₹)</label>
                  <input
                    type="number"
                    className="input-futuristic"
                    value={quoteForm.discount}
                    onChange={(e) => setQuoteForm({ ...quoteForm, discount: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: '#0F172A', fontWeight: 600 }}>Estimated Delivery Timeline *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 21 Business Days"
                  className="input-futuristic"
                  value={quoteForm.estimated_delivery}
                  onChange={(e) => setQuoteForm({ ...quoteForm, estimated_delivery: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: '#0F172A', fontWeight: 600 }}>Deliverables (JSON array)</label>
                <input
                  type="text"
                  className="input-futuristic"
                  value={quoteForm.deliverables_json}
                  onChange={(e) => setQuoteForm({ ...quoteForm, deliverables_json: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: '#0F172A', fontWeight: 600 }}>Notes</label>
                <textarea
                  rows={2}
                  className="input-futuristic"
                  value={quoteForm.notes}
                  onChange={(e) => setQuoteForm({ ...quoteForm, notes: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                  Issue Quotation
                </button>
                <button type="button" onClick={() => setIsQuoteModalOpen(false)} className="btn-secondary" style={{ flex: 1 }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UPDATE PROJECT MODAL */}
      {selectedProject && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '480px', padding: '32px', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
            <h3 style={{ fontSize: '1.35rem', color: '#0B132B', fontWeight: 800, marginBottom: '8px' }}>
              Update Project Progress
            </h3>
            <div style={{ fontSize: '0.88rem', color: '#0284C7', fontWeight: 600, marginBottom: '20px' }}>
              {selectedProject.title}
            </div>

            <form onSubmit={handleUpdateProject} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', color: '#0F172A', fontWeight: 600 }}>
                  Progress Percentage ({projProgress}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={projProgress}
                  onChange={(e) => setProjProgress(e.target.value)}
                  style={{ width: '100%', marginTop: '8px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: '#0F172A', fontWeight: 600 }}>Project Status</label>
                <select
                  value={projStatus}
                  onChange={(e) => setProjStatus(e.target.value)}
                  className="input-futuristic"
                >
                  <option value="PLANNING">PLANNING</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="TESTING">TESTING</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Save Updates</button>
                <button type="button" onClick={() => setSelectedProject(null)} className="btn-secondary" style={{ flex: 1 }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE BLOG POST MODAL */}
      {isBlogModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '640px', padding: '32px', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.12)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '1.35rem', color: '#0B132B', fontWeight: 800, marginBottom: '16px' }}>Publish Research / Tech Article</h3>
            <form onSubmit={handleCreateBlog} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', color: '#0F172A', fontWeight: 600 }}>Article Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advancements in Edge YOLOv11 Inference"
                  className="input-futuristic"
                  value={newBlog.title}
                  onChange={(e) => {
                    const t = e.target.value;
                    const slug = t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    setNewBlog({ ...newBlog, title: t, slug });
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: '#0F172A', fontWeight: 600 }}>Slug *</label>
                <input
                  type="text"
                  required
                  className="input-futuristic"
                  value={newBlog.slug}
                  onChange={(e) => setNewBlog({ ...newBlog, slug: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', color: '#0F172A', fontWeight: 600 }}>Category</label>
                  <input
                    type="text"
                    className="input-futuristic"
                    value={newBlog.category}
                    onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', color: '#0F172A', fontWeight: 600 }}>Read Time</label>
                  <input
                    type="text"
                    className="input-futuristic"
                    value={newBlog.read_time}
                    onChange={(e) => setNewBlog({ ...newBlog, read_time: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: '#0F172A', fontWeight: 600 }}>Summary *</label>
                <textarea
                  rows={2}
                  required
                  className="input-futuristic"
                  value={newBlog.summary}
                  onChange={(e) => setNewBlog({ ...newBlog, summary: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: '#0F172A', fontWeight: 600 }}>Full Article Content (Markdown) *</label>
                <textarea
                  rows={6}
                  required
                  className="input-futuristic"
                  value={newBlog.content}
                  onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Publish Article</button>
                <button type="button" onClick={() => setIsBlogModalOpen(false)} className="btn-secondary" style={{ flex: 1 }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
