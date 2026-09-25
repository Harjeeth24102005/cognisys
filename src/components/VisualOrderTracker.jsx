import React from 'react';
import { 
  FileText, Search, Calculator, CheckCircle, CreditCard, 
  Code2, TestTube2, Sparkles, AlertCircle 
} from 'lucide-react';

export const VisualOrderTracker = ({ status = "REQUESTED" }) => {
  const steps = [
    { key: "REQUESTED", label: "Requested", icon: FileText, desc: "Order submitted" },
    { key: "REVIEWED", label: "Reviewed", icon: Search, desc: "Scope evaluated" },
    { key: "QUOTATION", label: "Quotation", icon: Calculator, desc: "Cost & timeline ready" },
    { key: "APPROVED", label: "Approved", icon: CheckCircle, desc: "Quote accepted" },
    { key: "PAYMENT", label: "Payment", icon: CreditCard, desc: "Payment confirmed" },
    { key: "DEVELOPMENT", label: "Development", icon: Code2, desc: "Active engineering" },
    { key: "TESTING", label: "Testing", icon: TestTube2, desc: "QA & verification" },
    { key: "COMPLETED", label: "Completed", icon: Sparkles, desc: "Delivered & live" },
  ];

  const currentIdx = steps.findIndex(s => s.key === status.toUpperCase());
  const activeIndex = currentIdx === -1 ? 0 : currentIdx;

  return (
    <div style={{
      width: '100%',
      padding: '24px 16px',
      background: '#F8FAFC',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid rgba(15, 23, 42, 0.1)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        overflowX: 'auto',
        paddingBottom: '8px'
      }}>
        {steps.map((step, idx) => {
          const isCompleted = idx < activeIndex;
          const isCurrent = idx === activeIndex;
          const Icon = step.icon;

          return (
            <div
              key={step.key}
              className={`tracker-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'active' : ''}`}
              style={{ minWidth: '100px' }}
            >
              <div className="tracker-node" style={{
                background: isCompleted ? '#10B981' : isCurrent ? 'rgba(2, 132, 199, 0.15)' : '#FFFFFF',
                color: isCompleted ? '#FFFFFF' : isCurrent ? '#0284C7' : '#0F172A',
                borderColor: isCompleted ? '#10B981' : isCurrent ? '#0284C7' : '#CBD5E1',
                borderWidth: '2px',
                borderStyle: 'solid'
              }}>
                <Icon size={15} />
              </div>

              <div style={{
                marginTop: '10px',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: isCurrent ? '#0284C7' : isCompleted ? '#059669' : '#0F172A'
              }}>
                {step.label}
              </div>

              <div style={{
                fontSize: '0.74rem',
                color: '#1E293B',
                fontWeight: 500,
                marginTop: '2px',
                maxWidth: '90px'
              }}>
                {step.desc}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
