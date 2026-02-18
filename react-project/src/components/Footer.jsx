import React from 'react';

const Footer = () => {
    return (
        <footer className="relative z-10 bg-[var(--fg)] text-[var(--bg)] py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-[var(--bg)] flex items-center justify-center">
                                <svg className="w-5 h-5 text-[var(--fg)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2L12 22M12 2C12 2 8 6 8 12C8 18 12 22 12 22M12 2C12 2 16 6 16 12C16 18 12 22 12 22" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            </div>
                            <span className="font-display text-2xl font-bold">Inner Root</span>
                        </div>
                        <p className="text-[var(--bg)]/70 text-sm">Exploring India's Cultural Roots & Timeless Heritage through technology and ancient wisdom.</p>
                    </div>
                    {/* Quick Links */}
                    <div>
                        <h4 className="font-display text-lg font-bold mb-4">Explore</h4>
                        <ul className="space-y-2 text-sm text-[var(--bg)]/70">
                            <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Virtual Tours</a></li>
                            <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Cultural Learning</a></li>
                            <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Wellness</a></li>
                            <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Digital Library</a></li>
                        </ul>
                    </div>
                    {/* Resources */}
                    <div>
                        <h4 className="font-display text-lg font-bold mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm text-[var(--bg)]/70">
                            <li><a href="#" className="hover:text-[var(--accent)] transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Terms of Use</a></li>
                        </ul>
                    </div>
                    {/* Newsletter */}
                    <div>
                        <h4 className="font-display text-lg font-bold mb-4">Stay Connected</h4>
                        <p className="text-sm text-[var(--bg)]/70 mb-4">Get daily wisdom and heritage updates.</p>
                        <div className="flex gap-2">
                            <input type="email" placeholder="Your email" className="flex-1 px-4 py-2 rounded-full bg-[var(--bg)]/10 border border-[var(--bg)]/20 text-sm focus:outline-none focus:border-[var(--accent)]" />
                            <button className="px-4 py-2 rounded-full bg-[var(--accent)] text-[var(--fg)] text-sm font-medium hover:bg-[var(--accent)]/90 transition-colors">Subscribe</button>
                        </div>
                    </div>
                </div>
                <div className="pt-8 border-t border-[var(--bg)]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-[var(--bg)]/50">2024 Inner Root. Preserving heritage, inspiring futures.</p>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full border border-[var(--bg)]/20 flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors" aria-label="Twitter">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                            </svg>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full border border-[var(--bg)]/20 flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors" aria-label="Instagram">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full border border-[var(--bg)]/20 flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors" aria-label="YouTube">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
