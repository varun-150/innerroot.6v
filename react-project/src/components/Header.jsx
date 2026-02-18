import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.webp';

const Header = ({ theme, onToggleTheme, isMobileMenuOpen, onToggleMobileMenu }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();

    // Helper to determine active class
    const getLinkClass = ({ isActive }) =>
        `nav-link ${isActive ? 'active' : ''} px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-heritage-gold`;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)] transition-colors duration-300">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group" aria-label="Inner Root Home">
                        <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300">
                            <img src={logo} alt="Inner Root Logo" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-display text-2xl font-bold text-[var(--fg)] group-hover:text-heritage-gold transition-colors">Inner Root</span>
                    </Link>


                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        <NavLink to="/" className={getLinkClass} title="Home Page">Home</NavLink>

                        <NavLink
                            to="/tours"
                            className={getLinkClass}
                            title="360° exploration of UNESCO heritage sites and ancient monuments."
                        >
                            Tours
                        </NavLink>

                        <NavLink
                            to="/explore"
                            className={getLinkClass}
                            title="Traditions, festivals, arts, and scriptures explained."
                        >
                            Culture
                        </NavLink>

                        <NavLink
                            to="/wellness"
                            className={getLinkClass}
                            title="Meditation, chanting guides, and emotional balance tools."
                        >
                            Wellness
                        </NavLink>

                        <NavLink
                            to="/library"
                            className={getLinkClass}
                            title="Scriptures, philosophy texts, and historical resources."
                        >
                            Library
                        </NavLink>

                        <NavLink
                            to="/community"
                            className={getLinkClass}
                            title="Connect with fellow culture enthusiasts."
                        >
                            Community
                        </NavLink>

                        <NavLink to="/about" className={getLinkClass}>About</NavLink>
                        {isAuthenticated && (
                            <NavLink to="/dashboard" className={getLinkClass}>Dashboard</NavLink>
                        )}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={onToggleTheme}
                            className="w-10 h-10 rounded-full border-2 border-[var(--border)] flex items-center justify-center hover:border-heritage-gold hover:text-heritage-gold transition-all duration-300"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? (
                                <svg className="w-5 h-5 sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
                            ) : (
                                <svg className="w-5 h-5 moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                            )}
                        </button>

                        {/* Auth Buttons */}
                        <div className="hidden sm:flex items-center gap-3">
                            {isAuthenticated ? (
                                <>
                                    <Link to="/dashboard" className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] hover:border-heritage-gold transition-all duration-300 group">
                                        {user.profilePicture ? (
                                            <img src={user.profilePicture} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
                                        ) : (
                                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-heritage-gold to-heritage-orange flex items-center justify-center text-white text-xs font-bold">
                                                {user.name?.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        <span className="text-sm font-medium text-[var(--fg)] max-w-[100px] truncate group-hover:text-heritage-gold transition-colors">{user.name}</span>
                                    </Link>
                                    <button onClick={() => { logout(); navigate('/'); }}
                                        className="px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 transition-colors">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="px-4 py-2 text-sm font-medium text-[var(--fg)] hover:text-heritage-gold transition-colors">
                                        Log in
                                    </Link>
                                    <Link to="/signup" className="px-5 py-2.5 text-sm font-medium rounded-full text-white bg-gradient-to-r from-heritage-gold to-heritage-orange hover:from-heritage-goldLight hover:to-heritage-gold shadow-lg shadow-heritage-gold/20 transform hover:-translate-y-0.5 transition-all duration-300">
                                        Sign up
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden w-10 h-10 flex items-center justify-center text-[var(--fg)]"
                            aria-label="Open menu"
                            onClick={onToggleMobileMenu}
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 12h18M3 6h18M3 18h18" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-50 bg-[var(--bg)] transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full p-6">
                    <div className="flex justify-between items-center mb-8">
                        <span className="font-display text-2xl font-bold text-[var(--fg)]">Menu</span>
                        <button
                            className="w-10 h-10 flex items-center justify-center text-[var(--fg)] hover:text-heritage-gold transition-colors"
                            aria-label="Close menu"
                            onClick={onToggleMobileMenu}
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-col gap-2">
                        {[
                            { path: '/', label: 'Home' },
                            { path: '/tours', label: 'Virtual Tours' },
                            { path: '/explore', label: 'Culture' },
                            { path: '/wellness', label: 'Wellness' },
                            { path: '/library', label: 'Library' },
                            { path: '/community', label: 'Community' },
                            { path: '/about', label: 'About' },
                            ...(isAuthenticated ? [{ path: '/dashboard', label: '📊 Dashboard' }] : [])
                        ].map(({ path, label }) => (
                            <NavLink
                                key={path}
                                to={path}
                                className={({ isActive }) =>
                                    `text-left py-4 text-lg font-medium border-b border-[var(--border)] transition-colors ${isActive ? 'text-heritage-gold' : 'text-[var(--fg)] hover:text-heritage-gold'}`
                                }
                                onClick={onToggleMobileMenu}
                            >
                                {label}
                            </NavLink>
                        ))}
                        <div className="flex flex-col gap-4 mt-8">
                            <Link to="/login" onClick={onToggleMobileMenu} className="w-full text-center py-3 border border-[var(--border)] rounded-lg font-medium text-[var(--fg)] hover:border-heritage-gold hover:text-heritage-gold transition-colors">
                                Log in
                            </Link>
                            <Link to="/signup" onClick={onToggleMobileMenu} className="w-full text-center py-3 bg-gradient-to-r from-heritage-gold to-heritage-orange text-white rounded-lg font-medium shadow-lg hover:shadow-heritage-gold/20 transition-all">
                                Create Account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
