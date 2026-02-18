import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import MandalaBg from './components/MandalaBg';
import Particles from './components/Particles';

import Home from './pages/Home';
import Explore from './pages/Explore';
import Tours from './pages/Tours';
import Wellness from './pages/Wellness';
import Library from './pages/Library';
import Community from './pages/Community';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

// Wrapper to get current location for Header
const AppContent = () => {
  const [theme, setTheme] = useState('light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('innerRootTheme') || 'light';
    setTheme(savedTheme);
    document.body.dataset.theme = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('innerRootTheme', newTheme);
    document.body.dataset.theme = newTheme;
  };

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
      <main className="relative z-10 pt-16 lg:pt-20">
        <div className="page active" style={{ display: 'block', opacity: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/wellness" element={<Wellness />} />
            <Route path="/library" element={<Library />} />
            <Route path="/community" element={<Community />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Fallback to Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
