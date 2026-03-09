import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WebSocketProvider } from './context/WebSocketContext';
import { useTheme } from './hooks/useTheme';
import { routes } from './config/routes';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MandalaBg from './components/layout/MandalaBg';
import Particles from './components/layout/Particles';
import ChatBot from './components/features/ChatBot';

// Wrapper to get current location for Header
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
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </div>
      </main>
      <Footer />
      <ChatBot />
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <WebSocketProvider>
          <AppContent />
        </WebSocketProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
