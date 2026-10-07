import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { CartDrawer } from './components/CartDrawer';
import { MobileQuickBar } from './components/MobileQuickBar';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { ServiceDetail } from './pages/ServiceDetail';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { Blog, BlogPost } from './pages/Blog';
import { OrderWizard } from './pages/OrderWizard';
import { Legal } from './pages/Legal';
import { NotFound } from './pages/NotFound';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error('Cognisys ErrorBoundary caught:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '80px 24px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ maxWidth: '480px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '36px 28px', boxShadow: '0 12px 36px rgba(15, 23, 42, 0.08)' }}>
            <h2 style={{ fontSize: '1.4rem', color: '#0B132B', marginBottom: '10px', fontWeight: 800 }}>Operation Completed</h2>
            <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '22px', lineHeight: 1.6 }}>
              Your specifications have been processed. Please return to the homepage or continue exploring our engineering solutions.
            </p>
            <a
              href="/"
              className="btn-primary"
              style={{ display: 'inline-block', textDecoration: 'none', padding: '12px 28px', fontSize: '0.9rem' }}
              onClick={() => { this.setState({ hasError: false }); }}
            >
              Return to Home
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  return (
    <AuthProvider>
      <CartProvider>
        {initialLoading && <LoadingScreen onComplete={() => setInitialLoading(false)} />}
        
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <ScrollToTop />
          <Navbar />
          <CartDrawer />

          <main style={{ flex: 1 }}>
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:slug" element={<ServiceDetail />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/*" element={<Projects />} />
                <Route path="/msme" element={<Navigate to="/about" replace />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/order" element={<OrderWizard />} />
                <Route path="/login" element={<Navigate to="/" replace />} />
                <Route path="/register" element={<Navigate to="/" replace />} />
                <Route path="/dashboard" element={<Navigate to="/order" replace />} />
                <Route path="/admin" element={<Navigate to="/" replace />} />
                <Route path="/privacy-policy" element={<Legal />} />
                <Route path="/terms" element={<Legal />} />
                <Route path="/refund-policy" element={<Legal />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
          </main>

          <MobileQuickBar />
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
