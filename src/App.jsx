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
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { Blog, BlogPost } from './pages/Blog';
import { OrderWizard } from './pages/OrderWizard';
import { Legal } from './pages/Legal';

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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/projects" element={<Navigate to="/services" replace />} />
              <Route path="/projects/*" element={<Navigate to="/services" replace />} />
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
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          <MobileQuickBar />
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
