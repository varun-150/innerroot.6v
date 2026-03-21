import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
    Menu, X,
    MapPin, Heart, BookOpen,
    LogIn, LayoutDashboard, Compass, Info
} from 'lucide-react';

import logo from '../../assets/logo.webp';

const navItems = [
    { path: '/explore', label: 'Explore', icon: Compass },
    { path: '/heritage-map', label: 'Explore Map', icon: MapPin },
    { path: '/wellness', label: 'Spiritual Wellness', icon: Heart },
    { path: '/library', label: 'Ancient Library', icon: BookOpen },
    { path: '/about', label: 'About Us', icon: Info },
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
            setScrolled(curr > 50);
            setHidden(curr > lastScroll && curr > 150);
            setLastScroll(curr);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScroll]);

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: hidden ? -100 : 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-4 left-4 right-4 z-50 transition-all duration-700 rounded-[2rem] overflow-hidden`}
                style={{
                    background: scrolled ? 'rgba(10, 10, 10, 0.6)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(32px) saturate(200%)' : 'none',
                    WebkitBackdropFilter: scrolled ? 'blur(32px) saturate(200%)' : 'none',
                    border: scrolled ? '1px solid rgba(184, 115, 51, 0.2)' : '1px solid transparent',
                    boxShadow: scrolled ? 'var(--shadow-8k)' : 'none',
                }}
            >
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">

                        <Link to="/" className="flex items-center gap-4 group" aria-label="Inner Root — home">
                            <div className="relative w-14 h-14 flex items-center justify-center p-2 rounded-2xl transition-all duration-700 group-hover:scale-110">
                                <motion.div 
                                    className="absolute inset-0 rounded-2xl border border-accent/30"
                                    animate={{ rotate: [0, 90, 180, 270, 360] }}
                                    transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                                />
                                <div className="absolute inset-2 rounded-full bg-accent/5 blur-xl group-hover:bg-accent/20 transition-all duration-700" />
                                <img
                                    src={logo}
                                    alt="Inner Root Logo"
                                    className="w-full h-full object-contain relative z-10 filter drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-black tracking-tighter uppercase leading-none font-heading"
                                    style={{ color: 'var(--color-text)' }}>
                                    INNER ROOT
                                </span>
                                <span className="text-[9px] tracking-[0.5em] font-bold uppercase mt-1.5"
                                    style={{ color: 'var(--gold-500)', opacity: 0.8 }}>
                                    The Aura of Heritage
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Nav - Spaced & Sophisticated */}
                        <nav className="hidden lg:flex items-center gap-2" role="navigation">
                            {navItems.map(item => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="px-5 py-2.5 text-[13px] font-bold uppercase tracking-widest transition-all duration-500 relative group"
                                    style={{
                                        color: isActive(item.path) ? 'var(--color-text-accent)' : 'var(--color-text-subtle)',
                                    }}
                                >
                                    <span className="relative z-10">{item.label}</span>
                                    {isActive(item.path) && (
                                        <motion.div
                                            layoutId="nav-glow"
                                            className="absolute inset-0 bg-accent-soft rounded-full -z-10"
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-8" />
                                </Link>
                            ))}
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center gap-4">
                             {/* Theme toggle removed for permanent dark mode */}

                            {!isAuthenticated ? (
                                <Link
                                    to="/signup"
                                    className="px-8 py-3 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all duration-500 shadow-glow-copper"
                                    style={{ 
                                        background: 'var(--gradient-copper-ray)',
                                        color: 'white',
                                    }}
                                >
                                    INITIATE
                                </Link>
                            ) : (
                                <Link
                                    to="/dashboard"
                                    className="w-11 h-11 rounded-2xl flex items-center justify-center border border-accent/20 bg-accent-soft text-accent"
                                >
                                    <LayoutDashboard size={18} />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Nav Overhaul */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="fixed inset-0 z-[100] flex flex-col p-8"
                        style={{ background: 'var(--brand-obsidian)' }}
                    >
                        <div className="flex justify-between items-center mb-16">
                            <span className="text-2xl font-black tracking-tighter uppercase">INNER ROOT</span>
                            <button onClick={onToggleMobileMenu} className="w-14 h-14 rounded-full flex items-center justify-center bg-white/5 text-accent">
                                <X size={32} />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-8">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.path}
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        to={item.path}
                                        onClick={onToggleMobileMenu}
                                        className="text-4xl font-display italic text-white/40 hover:text-accent transition-colors block"
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <div className="mt-auto">
                            <Link to="/signup" onClick={onToggleMobileMenu} className="w-full py-6 rounded-3xl text-center font-bold uppercase tracking-widest bg-accent text-white block">
                                Get Started
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
