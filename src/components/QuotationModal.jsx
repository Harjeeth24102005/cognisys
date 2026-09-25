import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle, FileText, Calendar, IndianRupee, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';

export const QuotationModal = ({ quotation, onClose, onActionComplete }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!quotation) return null;

  let deliverables = [];
  try {
    if (quotation.deliverables_json) {
      deliverables = JSON.parse(quotation.deliverables_json);
    }
  } catch (e) {
    deliverables = [quotation.deliverables_json];
  }

  const handleAction = async (action) => {
    setLoading(true);
    setError(null);
    try {
      await api.respondToQuotation(quotation.id, action);
      onActionComplete && onActionComplete(action);
      onClose();
    } catch (err) {
      setError(err.message || 'Action failed');
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
        maxWidth: '560px',
        maxHeight: '90vh',
        overflowY: 'auto',
        background: '#FFFFFF',
        border: '1px solid rgba(15, 23, 42, 0.12)',
        borderRadius: 'var(--radius-xl)',
        padding: '32px',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
        position: 'relative'
      }}>
        {/* Close Button */}
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

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div className="badge">OFFICIAL QUOTATION #{quotation.id}</div>
          <div className={`badge ${quotation.status === 'ACCEPTED' ? 'badge-emerald' : quotation.status === 'REJECTED' ? 'badge-amber' : ''}`}>
            {quotation.status}
          </div>
        </div>

        <h2 style={{ fontSize: '1.45rem', color: '#0B132B', fontWeight: 800, marginBottom: '4px' }}>
          Cognisys Project Quotation
        </h2>
        <p style={{ fontSize: '0.88rem', color: '#0F172A', marginBottom: '24px', fontWeight: 500 }}>
          Itemized cost breakdown, timeline, and deliverables for your requested engineering scope.
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

        {/* Cost Breakdown Card */}
        <div style={{
          background: '#F8FAFC',
          borderRadius: 'var(--radius-md)',
          padding: '18px',
          border: '1px solid rgba(15, 23, 42, 0.08)',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', color: '#0F172A', fontWeight: 600 }}>
            <span>Core Development & Architecture:</span>
            <span style={{ color: '#0B132B', fontWeight: 700 }}>₹{quotation.development_cost.toLocaleString()}</span>
          </div>

          {quotation.additional_cost > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', color: '#0F172A', fontWeight: 600 }}>
              <span>Additional Hardware / Cloud Provisioning:</span>
              <span style={{ color: '#0B132B', fontWeight: 700 }}>₹{quotation.additional_cost.toLocaleString()}</span>
            </div>
          )}

          {quotation.discount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', color: '#059669', fontWeight: 600 }}>
              <span>Promotional / Student Discount:</span>
              <span>-₹{quotation.discount.toLocaleString()}</span>
            </div>
          )}

          <div style={{
            borderTop: '1px solid rgba(15, 23, 42, 0.1)',
            marginTop: '12px',
            paddingTop: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontWeight: 700, color: '#0B132B', fontSize: '1.05rem' }}>Total Project Value:</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              fontSize: '1.35rem',
              color: '#0284C7'
            }}>
              ₹{quotation.total_amount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Delivery Timeline */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '18px',
          fontSize: '0.9rem',
          color: '#0F172A',
          fontWeight: 600
        }}>
          <Calendar size={18} color="#0284C7" />
          <span>Estimated Delivery Timeline: <strong style={{ color: '#0B132B' }}>{quotation.estimated_delivery}</strong></span>
        </div>

        {/* Deliverables List */}
        {deliverables.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '0.9rem', color: '#0B132B', fontWeight: 700, marginBottom: '10px' }}>
              Included Deliverables:
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {deliverables.map((item, idx) => (
                <li key={idx} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  fontSize: '0.85rem',
                  color: '#0F172A',
                  fontWeight: 500
                }}>
                  <CheckCircle size={15} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Notes */}
        {quotation.notes && (
          <div style={{
            fontSize: '0.82rem',
            color: '#0F172A',
            fontStyle: 'italic',
            fontWeight: 500,
            marginBottom: '24px',
            background: '#F8FAFC',
            padding: '10px 14px',
            borderRadius: '6px',
            border: '1px solid rgba(15, 23, 42, 0.06)'
          }}>
            "{quotation.notes}"
          </div>
        )}

        {/* Action Buttons */}
        {quotation.status === 'PENDING' ? (
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => handleAction('ACCEPT')}
              disabled={loading}
              className="btn-primary"
              style={{ flex: 2 }}
            >
              {loading ? 'Processing...' : 'Accept Quotation & Proceed'}
            </button>
            <button
              onClick={() => handleAction('REJECT')}
              disabled={loading}
              className="btn-secondary"
              style={{ flex: 1, color: '#E11D48', borderColor: '#FDA4AF' }}
            >
              Decline
            </button>
          </div>
        ) : (
          <button onClick={onClose} className="btn-secondary" style={{ width: '100%' }}>
            Close Review
          </button>
        )}
      </div>
    </div>
  );
};
