import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
    Menu, X, Sun, Moon,
    MapPin, Heart, Users, BookOpen,
    LogIn, LayoutDashboard, Compass, Sparkles
} from 'lucide-react';

import logo from '../../assets/logo.webp';

// Core nav — Home removed (logo serves that) to avoid overcrowding
// 5 items is the upper limit for comfortable desktop navigation
const navItems = [
    { path: '/explore', label: 'Explore', icon: Compass },
    { path: '/heritage-map', label: 'Heritage Map', icon: MapPin },
    { path: '/wellness', label: 'Wellness', icon: Heart },
    { path: '/community', label: 'Community', icon: Users },
    { path: '/library', label: 'Library', icon: BookOpen },
    { path: '/subscription', label: 'Plans', icon: Sparkles },
];

const Header = ({ theme, onToggleTheme, isMobileMenuOpen, onToggleMobileMenu }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [lastScroll, setLastScroll] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const curr = window.scrollY;
            setScrolled(curr > 20);
            setHidden(curr > lastScroll && curr > 100);
            setLastScroll(curr);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScroll]);

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: hidden ? -100 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-2' : 'py-4'}`}
                style={{
                    background: scrolled ? 'var(--bg-glass-strong)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
                    WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
                    borderBottom: scrolled ? '1px solid var(--border-secondary)' : '1px solid transparent',
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-12 lg:h-14">

                        {/* Logo — "Inner Root" spelled out so branding is clear */}
                        <Link to="/" className="flex items-center gap-3 group" aria-label="Inner Root — home">
                            <div className="relative w-10 h-10 flex items-center justify-center">
                                <div className="absolute inset-[-4px] rounded-xl animate-spin-slow"
                                    style={{ background: 'conic-gradient(from 0deg, var(--accent), var(--forest), var(--accent))', opacity: 0.12 }} />
                                <img
                                    src={logo}
                                    alt="Inner Root Logo"
                                    className="w-full h-full object-contain relative z-10 rounded-lg shadow-sm"
                                />
                            </div>
                            <div className="hidden sm:block">
                                <span className="text-base font-semibold tracking-tight leading-none block"
                                    style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                                    Inner Root
                                </span>
                                <span className="text-[9px] tracking-widest uppercase leading-none block mt-0.5"
                                    style={{ color: 'var(--text-tertiary)' }}>
                                    Heritage · Wellness · AI
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Nav — 5 items max, clearly labelled */}
                        <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
                            {navItems.map(item => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300"
                                    style={{
                                        color: isActive(item.path) ? 'var(--accent)' : 'var(--text-secondary)',
                                        background: isActive(item.path) ? 'var(--accent-soft)' : 'transparent',
                                    }}
                                    onMouseEnter={e => { if (!isActive(item.path)) e.currentTarget.style.background = 'var(--accent-soft)'; }}
                                    onMouseLeave={e => { if (!isActive(item.path)) e.currentTarget.style.background = 'transparent'; }}
                                >
                                    {item.label}
                                    {isActive(item.path) && (
                                        <motion.div
                                            layoutId="nav-indicator"
                                            className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                                            style={{ background: 'var(--accent)' }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            ))}
                        </nav>

                        {/* Right actions */}
                        <div className="flex items-center gap-2">
                            {/* Theme Toggle — labeled for accessibility */}
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={onToggleTheme}
                                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                                style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                            >
                                <AnimatePresence mode="wait">
                                    {theme === 'light' ? (
                                        <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                            <Moon size={16} />
                                        </motion.div>
                                    ) : (
                                        <motion.div key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                            <Sun size={16} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>

                            {!isAuthenticated ? (
                                <>
                                    {/* Sign In — secondary ghost style (converts visitors) */}
                                    <Link
                                        to="/login"
                                        className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                                        style={{ color: 'var(--text-secondary)', border: '1.5px solid var(--border-primary)' }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-primary)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                                    >
                                        <LogIn size={14} /> Sign In
                                    </Link>

                                    {/* Start Free — primary CTA for conversion */}
                                    <Link
                                        to="/signup"
                                        className="hidden sm:inline-flex btn btn-primary btn-sm"
                                    >
                                        Start Free
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/dashboard"
                                        className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                                        style={{ color: 'var(--text-primary)', background: 'var(--accent-soft)' }}
                                    >
                                        <LayoutDashboard size={14} /> Dashboard
                                    </Link>
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => { logout(); navigate('/'); }}
                                        className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                                        style={{ color: 'var(--text-secondary)', border: '1.5px solid var(--border-primary)' }}
                                    >
                                        Sign Out
                                    </motion.button>
                                </>
                            )}

                            {/* Mobile Menu Button */}
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={onToggleMobileMenu}
                                className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center"
                                style={{ color: 'var(--text-primary)', background: 'var(--accent-soft)' }}
                                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                            >
                                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40"
                            style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
                            onClick={onToggleMobileMenu}
                        />
                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] z-50 overflow-y-auto"
                            style={{ background: 'var(--bg-primary)', borderLeft: '1px solid var(--border-primary)' }}
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <span className="text-xl font-semibold block" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                                            Inner Root
                                        </span>
                                        <span className="text-[9px] tracking-widest uppercase" style={{ color: 'var(--text-tertiary)' }}>
                                            Heritage · Wellness · AI
                                        </span>
                                    </div>
                                    <button
                                        onClick={onToggleMobileMenu}
                                        className="w-9 h-9 rounded-full flex items-center justify-center"
                                        style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                                        aria-label="Close menu"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                <nav className="flex flex-col gap-1" role="navigation" aria-label="Mobile navigation">
                                    {/* Home in mobile only */}
                                    <Link
                                        to="/"
                                        onClick={onToggleMobileMenu}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200"
                                        style={{
                                            color: isActive('/') ? 'var(--accent)' : 'var(--text-secondary)',
                                            background: isActive('/') ? 'var(--accent-soft)' : 'transparent',
                                        }}
                                    >
                                        Home
                                    </Link>
                                    {navItems.map((item, i) => (
                                        <motion.div
                                            key={item.path}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                        >
                                            <Link
                                                to={item.path}
                                                onClick={onToggleMobileMenu}
                                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200"
                                                style={{
                                                    color: isActive(item.path) ? 'var(--accent)' : 'var(--text-secondary)',
                                                    background: isActive(item.path) ? 'var(--accent-soft)' : 'transparent',
                                                }}
                                            >
                                                {item.icon && <item.icon size={18} />}
                                                {item.label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>

                                <div className="divider my-6" />

                                {/* Mobile CTA — primary conversion action */}
                                <Link to="/signup" onClick={onToggleMobileMenu} className="btn btn-primary w-full justify-center">
                                    Start Free
                                </Link>
                                <Link to="/login" onClick={onToggleMobileMenu} className="btn btn-secondary w-full justify-center mt-3">
                                    <LogIn size={16} /> Sign In
                                </Link>
                                <Link to="/dashboard" onClick={onToggleMobileMenu}
                                    className="w-full flex items-center justify-center gap-2 mt-3 py-2.5 text-sm rounded-xl transition-colors"
                                    style={{ color: 'var(--text-tertiary)' }}>
                                    <LayoutDashboard size={15} /> Go to Dashboard
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
