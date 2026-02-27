import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp';

const Footer = () => {
    const [email, setEmail] = React.useState('');
    const [status, setStatus] = React.useState(null); // 'success' | 'error' | 'loading'

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email || !email.includes('@')) {
            setStatus('error');
            return;
        }

        setStatus('loading');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setEmail('');
            setTimeout(() => setStatus(null), 5000);
        }, 1500);
    };

    return (
        <footer className="relative z-10 bg-[var(--fg)] text-[var(--bg)] py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
                                <img src={logo} alt="Inner Root Logo" className="w-full h-full object-cover" />
                            </div>
                            <span className="font-display text-2xl font-bold">Inner Root</span>
                        </div>

                        <p className="text-[var(--bg)]/70 text-sm">Exploring India's Cultural Roots & Timeless Heritage through technology and ancient wisdom.</p>
                    </div>
                    {/* Quick Links */}
                    <div>
                        <h4 className="font-display text-lg font-bold mb-4">Explore</h4>
                        <ul className="space-y-2 text-sm text-[var(--bg)]/70">
                            <li><Link to="/tours" className="hover:text-[var(--accent)] transition-colors">Virtual Tours</Link></li>
                            <li><Link to="/explore" className="hover:text-[var(--accent)] transition-colors">Cultural Learning</Link></li>
                            <li><Link to="/wellness" className="hover:text-[var(--accent)] transition-colors">Wellness</Link></li>
                            <li><Link to="/library" className="hover:text-[var(--accent)] transition-colors">Digital Library</Link></li>
                        </ul>
                    </div>
                    {/* Resources */}
                    <div>
                        <h4 className="font-display text-lg font-bold mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm text-[var(--bg)]/70">
                            <li><Link to="/about" className="hover:text-[var(--accent)] transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-[var(--accent)] transition-colors">Contact</Link></li>
                            <li><Link to="/monetization" className="hover:text-[var(--accent)] transition-colors">Pricing & Plans</Link></li>
                            <li><Link to="/privacy" className="hover:text-[var(--accent)] transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-[var(--accent)] transition-colors">Terms of Use</Link></li>
                        </ul>
                    </div>
                    {/* Newsletter */}
                    <div>
                        <h4 className="font-display text-lg font-bold mb-4">Stay Connected</h4>
                        <p className="text-sm text-[var(--bg)]/70 mb-4">Get daily wisdom and heritage updates.</p>
                        <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-2 rounded-full bg-[var(--bg)]/10 border border-[var(--bg)]/20 text-[var(--bg)] text-sm focus:outline-none focus:border-[var(--accent)] placeholder:text-[var(--bg)]/40 min-w-0 transition-colors"
                                    required
                                />
                                <button
                                    disabled={status === 'loading'}
                                    className="whitespace-nowrap px-6 py-2 rounded-full bg-[var(--accent)] text-[var(--fg)] text-sm font-medium hover:bg-[var(--accent)]/90 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[var(--accent)]/20 disabled:opacity-50 disabled:scale-100"
                                >
                                    {status === 'loading' ? 'Processing...' : 'Subscribe'}
                                </button>
                            </div>
                            {status === 'success' && (
                                <p className="text-xs text-green-400 font-medium">✨ Subscribed successfully! Enlightenment awaits.</p>
                            )}
                            {status === 'error' && (
                                <p className="text-xs text-red-400 font-medium">Please enter a valid email address.</p>
                            )}
                        </form>
                    </div>
                </div>
                <div className="pt-8 border-t border-[var(--bg)]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-[var(--bg)]/50">© {new Date().getFullYear()} Inner Root. Preserving heritage, inspiring futures.</p>
                    <div className="flex gap-4">
                        {[
                            { id: 'twitter', icon: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z', label: 'Twitter', href: '#' },
                            { id: 'instagram', icon: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z', label: 'Instagram', href: '#', isInsta: true },
                            { id: 'youtube', icon: 'M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z', label: 'YouTube', href: '#', isYoutube: true }
                        ].map((social) => (
                            <a
                                key={social.id}
                                href={social.href}
                                className="w-10 h-10 rounded-full border border-[var(--bg)]/20 flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] hover:scale-110 active:scale-90 transition-all group"
                                aria-label={social.label}
                                onClick={(e) => social.href === '#' && e.preventDefault()}
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    {social.isInsta ? (
                                        <>
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                            <path d={social.icon} />
                                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                        </>
                                    ) : social.isYoutube ? (
                                        <>
                                            <path d={social.icon} />
                                            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                                        </>
                                    ) : (
                                        <path d={social.icon} />
                                    )}
                                </svg>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
