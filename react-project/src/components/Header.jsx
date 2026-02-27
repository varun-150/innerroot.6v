import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';
import {
    ChevronDown, Menu, X, Sun, Moon,
    Map, Book, Library, Users, Sparkles, LogOut
} from 'lucide-react';
import logo from '../assets/logo.webp';

const Header = ({ theme, onToggleTheme, isMobileMenuOpen, onToggleMobileMenu }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();
    const [isHeritageOpen, setIsHeritageOpen] = useState(false);

    const getLinkClass = ({ isActive }) =>
        `nav-link ${isActive ? 'active text-heritage-gold' : 'text-[var(--muted)]'} px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-heritage-gold`;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)] transition-colors duration-300">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group" aria-label="Inner Root Home">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                            <img src={logo} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-display text-xl lg:text-2xl font-bold text-[var(--fg)] group-hover:text-heritage-gold transition-colors">Inner Root</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6">
                        <NavLink to="/" className={getLinkClass}>Home</NavLink>

                        {/* Heritage Mega Menu */}
                        <div
                            className="relative group"
                            onMouseEnter={() => setIsHeritageOpen(true)}
                            onMouseLeave={() => setIsHeritageOpen(false)}
                        >
                            <button
                                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors hover:text-heritage-gold ${isHeritageOpen ? 'text-heritage-gold' : 'text-[var(--muted)]'}`}
                                aria-expanded={isHeritageOpen}
                                aria-haspopup="true"
                            >
                                Heritage <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isHeritageOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <div className={`absolute top-full left-1/2 -translate-x-1/2 w-64 pt-2 transition-all duration-300 ${isHeritageOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                                <div className="glass-card rounded-2xl p-4 shadow-xl border border-[var(--border)]">
                                    <div className="grid gap-2">
                                        <Link to="/tours" className="flex items-center gap-3 p-3 rounded-xl hover:bg-heritage-gold/10 transition-colors group">
                                            <Map className="w-5 h-5 text-heritage-teal group-hover:scale-110 transition-transform" />
                                            <div className="text-left">
                                                <p className="text-sm font-bold text-[var(--fg)]">Virtual Tours</p>
                                                <p className="text-[10px] text-[var(--muted)]">Explore 360° sites</p>
                                            </div>
                                        </Link>
                                        <Link to="/explore" className="flex items-center gap-3 p-3 rounded-xl hover:bg-heritage-gold/10 transition-colors group">
                                            <Book className="w-5 h-5 text-heritage-teal group-hover:scale-110 transition-transform" />
                                            <div className="text-left">
                                                <p className="text-sm font-bold text-[var(--fg)]">Cultural Learning</p>
                                                <p className="text-[10px] text-[var(--muted)]">Traditions & Arts</p>
                                            </div>
                                        </Link>
                                        <Link to="/library" className="flex items-center gap-3 p-3 rounded-xl hover:bg-heritage-gold/10 transition-colors group">
                                            <Library className="w-5 h-5 text-heritage-teal group-hover:scale-110 transition-transform" />
                                            <div className="text-left">
                                                <p className="text-sm font-bold text-[var(--fg)]">Digital Library</p>
                                                <p className="text-[10px] text-[var(--muted)]">Sacred Scriptures</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <NavLink to="/wellness" className={getLinkClass}>Wellness</NavLink>
                        <NavLink to="/community" className={getLinkClass}>Community</NavLink>
                        <NavLink to="/monetization" className={getLinkClass}>Pricing & Plans</NavLink>
                        <NavLink to="/about" className={getLinkClass}>About</NavLink>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onToggleTheme}
                            className="group flex items-center gap-2 h-10 px-3 rounded-full border border-[var(--border)] hover:border-heritage-gold transition-all"
                            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        >
                            {theme === 'light' ? (
                                <>
                                    <Sun className="w-5 h-5 text-heritage-gold animate-pulse-slow" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider hidden xl:block">Dark Mode</span>
                                </>
                            ) : (
                                <>
                                    <Moon className="w-5 h-5 text-heritage-gold" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider hidden xl:block">Light Mode</span>
                                </>
                            )}
                        </button>

                        <div className="hidden sm:flex items-center gap-3">
                            {isAuthenticated ? (
                                <div className="flex items-center gap-2">
                                    <Link to="/dashboard" className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] hover:border-heritage-gold transition-all group">
                                        {user.profilePicture ? (
                                            <img src={user.profilePicture} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
                                        ) : (
                                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-heritage-gold to-heritage-orange flex items-center justify-center text-white text-xs font-bold font-display">
                                                {user?.name?.charAt(0).toUpperCase() || 'S'}
                                            </div>
                                        )}
                                        <span className="text-xs font-bold text-[var(--fg)] group-hover:text-heritage-gold transition-colors">{user?.name?.split(' ')[0] || 'Seeker'}</span>
                                    </Link>
                                    <button
                                        onClick={() => { logout(); navigate('/'); }}
                                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-full transition-colors"
                                        title="Logout"
                                    >
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Button variant="tertiary" onClick={() => navigate('/login')}>Log in</Button>
                                    <Button size="sm" onClick={() => navigate('/signup')}>Sign up</Button>
                                </>
                            )}
                        </div>

                        <button
                            className="lg:hidden w-10 h-10 flex items-center justify-center text-[var(--fg)]"
                            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                            onClick={onToggleMobileMenu}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-50 bg-[var(--bg)] transition-transform duration-500 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full p-6">
                    <div className="flex justify-between items-center mb-8">
                        <span className="font-display text-2xl font-bold text-[var(--fg)]">Menu</span>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={onToggleTheme}
                                className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] text-sm font-bold text-[var(--fg)]"
                            >
                                {theme === 'light' ? <><Sun className="w-4 h-4" /> Dark</> : <><Moon className="w-4 h-4" /> Light</>}
                            </button>
                            <button onClick={onToggleMobileMenu} className="w-10 h-10 flex items-center justify-center text-[var(--fg)]"><X className="w-6 h-6" /></button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <div className="flex flex-col gap-1">
                            {[
                                { path: '/', label: 'Home' },
                                { path: '/tours', label: 'Virtual Tours' },
                                { path: '/explore', label: 'Cultural Learning' },
                                { path: '/library', label: 'Digital Library' },
                                { path: '/wellness', label: 'Wellness' },
                                { path: '/community', label: 'Community' },
                                { path: '/monetization', label: 'Pricing & Plans' },
                                { path: '/about', label: 'About' },
                                ...(isAuthenticated ? [{ path: '/dashboard', label: 'Dashboard' }] : [])
                            ].map(({ path, label }) => (
                                <NavLink
                                    key={path}
                                    to={path}
                                    className={({ isActive }) =>
                                        `text-left py-4 text-xl font-bold border-b border-[var(--border)] transition-colors ${isActive ? 'text-heritage-gold translate-x-2' : 'text-[var(--fg)]'} transform duration-300`
                                    }
                                    onClick={onToggleMobileMenu}
                                >
                                    {label}
                                </NavLink>
                            ))}
                        </div>

                        {!isAuthenticated && (
                            <div className="mt-12 flex flex-col gap-4">
                                <Button className="w-full py-4 text-lg" onClick={() => { onToggleMobileMenu(); navigate('/signup'); }}>Get Started</Button>
                                <Button variant="secondary" className="w-full py-4 text-lg" onClick={() => { onToggleMobileMenu(); navigate('/login'); }}>Log In</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

