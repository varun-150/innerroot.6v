import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import { WebSocketProvider } from './context/WebSocketContext';
import { HelmetProvider } from 'react-helmet-async';
import { useTheme } from './hooks/useTheme';
import { routes } from './config/routes';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MandalaBg from './components/layout/MandalaBg';
import Particles from './components/layout/Particles';
import ChatBot from './components/features/ChatBot';

const AppContent = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <>
      <MandalaBg />
      <Particles />
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <main className="relative pt-16 lg:pt-20">
        <div className="page active">
          <React.Suspense fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="w-8 h-8 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />
            </div>
          }>
            <Routes>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Routes>
          </React.Suspense>
        </div>
      </main>
      {/* Standard Footer removed as requested */}
      {/* <Footer /> */}
      <ChatBot />
    </>
  );
};

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <HelmetProvider>
      <Router>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <WebSocketProvider>
              <AppContent />
            </WebSocketProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
