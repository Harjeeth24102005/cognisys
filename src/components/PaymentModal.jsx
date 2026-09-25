import React, { useState } from 'react';
import { X, CreditCard, QrCode, ShieldCheck, CheckCircle2, Lock, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';

export const PaymentModal = ({ order, quotation, onClose, onPaymentSuccess }) => {
  const [method, setMethod] = useState('upi');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paidSuccess, setPaidSuccess] = useState(false);
  const [txnId, setTxnId] = useState('');

  if (!order) return null;
  const amount = quotation ? quotation.total_amount : 15000;

  const handleProcessPayment = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.makePayment({
        order_id: order.id,
        quotation_id: quotation?.id,
        payment_method: method === 'upi' ? 'UPI / QR Code' : method === 'card' ? 'Credit/Debit Card' : 'NetBanking Gateway'
      });
      setTxnId(res.transaction_id);
      setPaidSuccess(true);
      
      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      setTimeout(() => {
        onPaymentSuccess && onPaymentSuccess();
      }, 2500);
    } catch (err) {
      setError(err.message || 'Payment processing failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(3, 5, 10, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '520px',
        background: '#FFFFFF',
        border: '1px solid rgba(15, 23, 42, 0.12)',
        borderRadius: 'var(--radius-xl)',
        padding: '32px',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(15, 23, 42, 0.06)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0B132B',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {paidSuccess ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '2px solid #10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#10B981',
              margin: '0 auto 20px',
              boxShadow: '0 0 30px rgba(16, 185, 129, 0.25)'
            }}>
              <CheckCircle2 size={40} />
            </div>
            <h3 style={{ fontSize: '1.45rem', color: '#0B132B', fontWeight: 800, marginBottom: '8px' }}>
              Payment Verified & Initiated!
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#1E293B', marginBottom: '16px', lineHeight: 1.6, fontWeight: 500 }}>
              Your transaction has been processed securely. Order #{order.order_number} has moved directly into Active Development.
            </p>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#0284C7',
              background: 'rgba(2, 132, 199, 0.1)',
              padding: '8px 16px',
              borderRadius: '6px',
              display: 'inline-block'
            }}>
              TXN ID: {txnId}
            </div>
          </div>
        ) : (
          <div>
            <div className="badge badge-emerald" style={{ marginBottom: '12px' }}>
              <Lock size={12} />
              <span>256-BIT ENCRYPTED GATEWAY</span>
            </div>

            <h2 style={{ fontSize: '1.45rem', color: '#0B132B', fontWeight: 800, marginBottom: '4px' }}>
              Complete Order Payment
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#1E293B', marginBottom: '20px', fontWeight: 500 }}>
              Order: <strong style={{ color: '#0B132B' }}>{order.title}</strong> (#{order.order_number})
            </p>

            {error && (
              <div style={{
                background: 'rgba(244, 63, 94, 0.1)',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                borderRadius: 'var(--radius-md)',
                padding: '12px',
                color: '#E11D48',
                fontSize: '0.85rem',
                marginBottom: '16px'
              }}>
                {error}
              </div>
            )}

            {/* Total Display */}
            <div style={{
              background: '#F8FAFC',
              padding: '18px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(15, 23, 42, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <span style={{ fontSize: '0.92rem', color: '#0F172A', fontWeight: 700 }}>Payable Amount:</span>
              <span style={{
                fontSize: '1.45rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                color: '#0284C7'
              }}>
                ₹{amount.toLocaleString()}
              </span>
            </div>

            {/* Payment Method Selector */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '24px' }}>
              <button
                onClick={() => setMethod('upi')}
                style={{
                  background: method === 'upi' ? '#0284C7' : '#F8FAFC',
                  border: method === 'upi' ? '1px solid #0284C7' : '1px solid rgba(15, 23, 42, 0.15)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 8px',
                  color: method === 'upi' ? '#FFFFFF' : '#0F172A',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: method === 'upi' ? '0 4px 12px rgba(2, 132, 199, 0.25)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <QrCode size={20} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>UPI / QR</span>
              </button>

              <button
                onClick={() => setMethod('card')}
                style={{
                  background: method === 'card' ? '#0284C7' : '#F8FAFC',
                  border: method === 'card' ? '1px solid #0284C7' : '1px solid rgba(15, 23, 42, 0.15)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 8px',
                  color: method === 'card' ? '#FFFFFF' : '#0F172A',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: method === 'card' ? '0 4px 12px rgba(2, 132, 199, 0.25)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <CreditCard size={20} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Cards</span>
              </button>

              <button
                onClick={() => setMethod('netbanking')}
                style={{
                  background: method === 'netbanking' ? '#0284C7' : '#F8FAFC',
                  border: method === 'netbanking' ? '1px solid #0284C7' : '1px solid rgba(15, 23, 42, 0.15)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 8px',
                  color: method === 'netbanking' ? '#FFFFFF' : '#0F172A',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: method === 'netbanking' ? '0 4px 12px rgba(2, 132, 199, 0.25)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <ShieldCheck size={20} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>NetBanking</span>
              </button>
            </div>

            {/* Simulated Method UI */}
            {method === 'upi' ? (
              <div style={{
                background: '#F8FAFC',
                padding: '16px',
                borderRadius: '8px',
                textAlign: 'center',
                marginBottom: '24px',
                border: '1px dashed rgba(15, 23, 42, 0.15)'
              }}>
                <div style={{ fontSize: '0.84rem', color: '#0F172A', marginBottom: '8px', fontWeight: 600 }}>
                  Scan UPI QR or enter VPA ID:
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: '#0284C7',
                  marginBottom: '6px'
                }}>
                  cognisys@upi [Official VPA Placeholder]
                </div>
                <div style={{ fontSize: '0.75rem', color: '#1E293B', fontWeight: 500 }}>
                  Accepts Google Pay, PhonePe, Paytm, BHIM & all major UPI apps
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                <input
                  type="text"
                  placeholder="Card Number (4000 1234 5678 9010)"
                  className="input-futuristic"
                  defaultValue="4000 1234 5678 9010"
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <input type="text" placeholder="MM/YY" className="input-futuristic" defaultValue="12/28" />
                  <input type="password" placeholder="CVV" className="input-futuristic" defaultValue="888" />
                </div>
              </div>
            )}

            <button
              onClick={handleProcessPayment}
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', padding: '14px' }}
            >
              {loading ? 'Authorizing Secure Payment...' : `Pay ₹${amount.toLocaleString()} & Launch Project`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
