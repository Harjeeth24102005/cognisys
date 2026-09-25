import React, { useState } from 'react';
import { 
  X, ShoppingCart, Trash2, CheckCircle2, ArrowRight, 
  Sparkles, Mail, Phone, User, Calendar, ShieldCheck, Zap 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { smtpService } from '../services/smtpService';

export const CartDrawer = () => {
  const { cartItems, removeFromCart, clearCart, isCartOpen, setIsCartOpen } = useCart();

  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    timeline: '2 - 3 Weeks',
    budget: 'Custom Engineering Quotation',
    special_requirements: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [dispatchStatus, setDispatchStatus] = useState(null);

  if (!isCartOpen) return null;

  const handlePurchase = async (e) => {
    e.preventDefault();
    if (!customer.name.trim() || !customer.email.trim() || !customer.phone.trim()) {
      setError('Please provide your name, email, and phone number so our engineers can review your specifications.');
      return;
    }

    if (cartItems.length === 0) {
      setError('Your cart is currently empty. Please select a service or project.');
      return;
    }

    setLoading(true);
    setError(null);

    const itemsSummary = cartItems.map(i => `${i.name || i.title} (Domain: ${i.category || 'Engineering'})`).join('; ');
    const combinedDescription = `[CART ORDER SPECIFICATIONS]\nSelected Systems: ${itemsSummary}\n\nClient Custom Specifications:\n${customer.special_requirements || 'Standard production specification deployment as per catalog.'}\n\nTarget Delivery: ${customer.timeline}`;

    try {
      const orderPayload = {
        customer_name: customer.name.trim(),
        customer_email: customer.email.trim(),
        customer_phone: customer.phone.trim(),
        service_name: cartItems[0]?.name || 'Custom Multi-Domain Solution',
        title: `Project Order: ${cartItems.map(i => i.name || i.title).join(' + ')}`,
        description: combinedDescription,
        budget: customer.budget,
        timeline: customer.timeline,
        tech_preferences: 'FastAPI, React 3D, YOLOv11, PyTorch, PostgreSQL, Docker',
        cart_items_json: JSON.stringify(cartItems)
      };

      const orderResult = await smtpService.sendOrderSpecifications(orderPayload);
      const res = orderResult.order;
      setCompletedOrder(res);
      setDispatchStatus(orderResult);
      setPurchaseSuccess(true);
      clearCart();

      // Celebratory confetti animation
      if (orderResult.delivered) {
        try {
          confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.5 }
          });
        } catch (err) {}
      }

      // Order successfully submitted and dispatched via direct mail relay
    } catch (err) {
      setError(err.message || 'Failed to transmit specifications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 999,
      background: 'rgba(15, 23, 42, 0.45)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      display: 'flex',
      justifyContent: 'flex-end',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '520px',
        height: '100%',
        background: '#FFFFFF',
        borderLeft: '1px solid #E2E8F0',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-10px 0 40px rgba(15, 23, 42, 0.15)',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#F8FAFC'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(0, 180, 216, 0.1)',
              border: '1px solid rgba(0, 180, 216, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0284C7'
            }}>
              <ShoppingCart size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#0B132B', fontWeight: 800 }}>Engineering Cart</h3>
              <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#0284C7', fontWeight: 700 }}>
                {cartItems.length} {cartItems.length === 1 ? 'SERVICE CONFIGURED' : 'SERVICES CONFIGURED'}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setIsCartOpen(false);
              setPurchaseSuccess(false);
            }}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748B',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {purchaseSuccess && completedOrder ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              {dispatchStatus?.delivered ? (
                <>
                  <div style={{
                    width: '76px',
                    height: '76px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '2px solid #10B981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10B981',
                    margin: '0 auto 20px',
                    boxShadow: '0 0 32px rgba(16, 185, 129, 0.3)'
                  }}>
                    <CheckCircle2 size={38} />
                  </div>
                  <h3 style={{ fontSize: '1.4rem', color: '#0B132B', marginBottom: '8px', fontWeight: 800 }}>
                    Order Delivered via Resend API!
                  </h3>
                  <div style={{ display: 'inline-block', background: 'rgba(16, 185, 129, 0.1)', color: '#059669', fontSize: '0.75rem', fontWeight: 700, padding: '4px 14px', borderRadius: '20px', marginBottom: '14px' }}>
                    ✓ DELIVERED TO CONTACT.COGNISYS@GMAIL.COM
                  </div>

                  <div style={{
                    background: '#F0FDF4',
                    border: '1px solid #BBF7D0',
                    borderRadius: 'var(--radius-md)',
                    padding: '14px 18px',
                    textAlign: 'left',
                    marginBottom: '16px',
                    fontSize: '0.86rem',
                    color: '#166534',
                    lineHeight: 1.5
                  }}>
                    <p style={{ margin: '0 0 6px 0', fontWeight: 700 }}>
                      The order specifications have been dispatched to <span style={{ textDecoration: 'underline' }}>contact.cognisys@gmail.com</span> with all your configured details.
                    </p>
                    <p style={{ margin: '0 0 10px 0' }}>
                      Client email set as reply-to: <strong>{completedOrder.customer_email}</strong>. Cognisys engineers will review and respond promptly.
                    </p>
                    <div style={{
                      background: '#FFFFFF',
                      border: '1px solid #86EFAC',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontWeight: 700,
                      color: '#0F172A',
                      fontSize: '0.82rem'
                    }}>
                      <Phone size={15} color="#059669" />
                      <span>Immediate Hotline: <a href="tel:8248349844" style={{ color: '#0284C7', textDecoration: 'none' }}>+91 82483 49844</a></span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div style={{
                    width: '76px',
                    height: '76px',
                    borderRadius: '50%',
                    background: 'rgba(2, 132, 199, 0.1)',
                    border: '2px solid #0284C7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0284C7',
                    margin: '0 auto 20px',
                    boxShadow: '0 0 32px rgba(2, 132, 199, 0.25)'
                  }}>
                    <ShoppingCart size={38} />
                  </div>
                  <h3 style={{ fontSize: '1.4rem', color: '#0B132B', marginBottom: '8px', fontWeight: 800 }}>
                    Order Configured Ready
                  </h3>
                  <div style={{ display: 'inline-block', background: 'rgba(234, 88, 12, 0.1)', color: '#C2410C', fontSize: '0.75rem', fontWeight: 700, padding: '4px 14px', borderRadius: '20px', marginBottom: '14px' }}>
                    READY FOR DISPATCH TO CONTACT.COGNISYS@GMAIL.COM
                  </div>

                  <div style={{
                    background: '#FFF7ED',
                    border: '1px solid #FED7AA',
                    borderRadius: 'var(--radius-md)',
                    padding: '14px 18px',
                    textAlign: 'left',
                    marginBottom: '16px',
                    fontSize: '0.86rem',
                    color: '#9A3412',
                    lineHeight: 1.5
                  }}>
                    <p style={{ margin: '0 0 6px 0', fontWeight: 700 }}>
                      Automatic email dispatch requires a Resend API key ({dispatchStatus?.error || 'VITE_RESEND_API_KEY missing in .env'}).
                    </p>
                    <p style={{ margin: '0 0 10px 0' }}>
                      Click <strong>"Send via Gmail Web"</strong> below to send all specifications directly to <span style={{ textDecoration: 'underline' }}>contact.cognisys@gmail.com</span>:
                    </p>
                    <div style={{
                      background: '#FFFFFF',
                      border: '1px solid #FDBA74',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontWeight: 700,
                      color: '#0F172A',
                      fontSize: '0.82rem'
                    }}>
                      <Phone size={15} color="#EA580C" />
                      <span>Helpline: <a href="tel:8248349844" style={{ color: '#0284C7', textDecoration: 'none' }}>+91 82483 49844</a></span>
                    </div>
                  </div>
                </>
              )}

              <div style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                textAlign: 'left',
                fontSize: '0.84rem',
                marginBottom: '18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B', fontWeight: 600 }}>Order ID:</span>
                  <span style={{ color: '#0284C7', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>#{completedOrder.order_number}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B', fontWeight: 600 }}>Client Name:</span>
                  <span style={{ color: '#0F172A', fontWeight: 700 }}>{completedOrder.customer_name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B', fontWeight: 600 }}>Contact Email:</span>
                  <span style={{ color: '#0284C7', fontWeight: 600 }}>{completedOrder.customer_email}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B', fontWeight: 600 }}>Phone:</span>
                  <span style={{ color: '#0F172A', fontWeight: 600 }}>{completedOrder.customer_phone}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '10px' }}>
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=contact.cognisys@gmail.com&cc=${encodeURIComponent(completedOrder.customer_email)}&su=${encodeURIComponent(`[COGNISYS ORDER #${completedOrder.order_number}] - ${completedOrder.title || 'Service Purchase'}`)}&body=${encodeURIComponent(`Dear Cognisys Engineering Team,\n\nOrder Ref: #${completedOrder.order_number}\nClient: ${completedOrder.customer_name}\nEmail: ${completedOrder.customer_email}\nPhone: ${completedOrder.customer_phone}\n\nRequirements:\n${completedOrder.description || 'Project Order'}\n\nEmergency Helpline: +91 82483 49844`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ width: '100%', padding: '12px', textAlign: 'center', textDecoration: 'none', display: 'block', fontSize: '0.86rem' }}
                >
                  <span>Send via Gmail Web</span>
                </a>
                <a
                  href={`mailto:contact.cognisys@gmail.com?cc=${encodeURIComponent(completedOrder.customer_email)}&subject=${encodeURIComponent(`[COGNISYS ORDER #${completedOrder.order_number}] - ${completedOrder.title || 'Service Purchase'}`)}&body=${encodeURIComponent(`Order #${completedOrder.order_number}\nClient: ${completedOrder.customer_name} (${completedOrder.customer_email} | ${completedOrder.customer_phone})\n\nRequirements:\n${completedOrder.description || 'Project Order'}\n\nEmergency Helpline: 8248349844`)}`}
                  className="btn-secondary"
                  style={{ width: '100%', padding: '12px', textAlign: 'center', textDecoration: 'none', display: 'block', fontSize: '0.86rem' }}
                >
                  <span>Open in Mail App</span>
                </a>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setPurchaseSuccess(false);
                  }}
                  className="btn-primary"
                  style={{ width: '100%', padding: '14px' }}
                >
                  <span>Done / Continue Browsing</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ) : cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748B' }}>
              <ShoppingCart size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
              <h4 style={{ color: '#0B132B', marginBottom: '6px' }}>Your Cart is Empty</h4>
              <p style={{ fontSize: '0.85rem', marginBottom: '20px' }}>
                Browse our AI CCTV, Web Development, Software or Student solutions to configure a project.
              </p>
              <button onClick={() => setIsCartOpen(false)} className="btn-secondary" style={{ fontSize: '0.85rem' }}>
                Explore Service Catalog
              </button>
            </div>
          ) : (
            <form onSubmit={handlePurchase} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Selected Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: '#0284C7', fontWeight: 700 }}>
                  SELECTED SERVICES ({cartItems.length})
                </div>
                {cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '10px',
                      padding: '12px 14px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0F172A' }}>
                        {item.name || item.title}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: '#0284C7', fontFamily: 'var(--font-mono)' }}>
                        {item.category || 'Custom Engineering'}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id || item.slug)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#EF4444',
                        cursor: 'pointer',
                        padding: '6px'
                      }}
                      title="Remove Item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {error && (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 14px',
                  color: '#DC2626',
                  fontSize: '0.85rem'
                }}>
                  {error}
                </div>
              )}

              {/* Customer Contact & Requirements */}
              <div style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: 'var(--radius-md)',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}>
                <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: '#0284C7', fontWeight: 700 }}>
                  CLIENT CONTACT &amp; SPECIFICATIONS
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#0F172A', marginBottom: '4px', fontWeight: 700 }}>
                    YOUR FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Harjeeth S / Organization"
                    className="input-futuristic"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#0F172A', marginBottom: '4px', fontWeight: 700 }}>
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      className="input-futuristic"
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#0F172A', marginBottom: '4px', fontWeight: 700 }}>
                      PHONE NUMBER *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="8248349844"
                      className="input-futuristic"
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#0F172A', marginBottom: '4px', fontWeight: 700 }}>
                    TARGET TIMELINE
                  </label>
                  <select
                    className="input-futuristic"
                    value={customer.timeline}
                    onChange={(e) => setCustomer({ ...customer, timeline: e.target.value })}
                  >
                    <option value="1 - 2 Weeks">1 - 2 Weeks (Fast Track)</option>
                    <option value="2 - 3 Weeks">2 - 3 Weeks (Standard)</option>
                    <option value="1 - 2 Months">1 - 2 Months (Enterprise)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#0F172A', marginBottom: '4px', fontWeight: 700 }}>
                    SPECIAL TECHNICAL REQUIREMENTS (OPTIONAL)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Specific algorithms, number of CCTV cameras, database preference, or IEEE prototype details..."
                    className="input-futuristic"
                    value={customer.special_requirements}
                    onChange={(e) => setCustomer({ ...customer, special_requirements: e.target.value })}
                  />
                </div>
              </div>

              {/* Notice */}
              <div style={{
                fontSize: '0.76rem',
                color: '#0284C7',
                background: 'rgba(0, 180, 216, 0.08)',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(0, 180, 216, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <ShieldCheck size={16} color="#00B4D8" style={{ flexShrink: 0 }} />
                <span>All specifications are transmitted automatically to <strong>contact.cognisys@gmail.com</strong>.</span>
              </div>

              {error && (
                <div style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  color: '#DC2626',
                  fontSize: '0.82rem',
                  fontWeight: 600
                }}>
                  {error}
                </div>
              )}

              {/* Purchase Action Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{
                  padding: '14px',
                  width: '100%',
                  fontSize: '0.92rem'
                }}
              >
                {loading ? (
                  <span>Transmitting Specifications to contact.cognisys@gmail.com...</span>
                ) : (
                  <>
                    <span>SUBMIT SPECIFICATIONS &amp; DISPATCH</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
