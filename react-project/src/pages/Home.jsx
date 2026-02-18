import React, { useState, useEffect } from 'react';
import { Reveal, Stagger } from '../components/Reveal';
import { wisdomAPI } from '../services/api';

// Fallback quotes if API or data file is missing
const fallbackQuotes = [
    { text: "Knowledge is the greatest wealth.", source: "Ancient Proverb" },
    { text: "Peace comes from within. Do not seek it without.", source: "Gautama Buddha" }
];

const Home = ({ onNavigate }) => {
    const [dailyQuote, setDailyQuote] = useState(fallbackQuotes[0]);

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const data = await wisdomAPI.getRandom();
                if (data && data.quote) {
                    setDailyQuote({ text: data.quote, source: data.source });
                }
            } catch (err) {
                console.error('Failed to fetch random quote:', err);
                // Fallback is already set in state
            }
        };
        fetchQuote();
    }, []);

    return (
        <section id="page-home" className="page active block opacity-100">
            {/* Hero Section */}
            <div className="relative min-h-[90vh] flex items-center">
                {/* Hero Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 hero-gradient"></div>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Hero Text */}
                        <Reveal>
                            <span className="inline-block px-4 py-2 rounded-full bg-heritage-gold/20 text-heritage-goldLight font-medium text-sm mb-6">Discover Your Heritage</span>
                            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-heritage-cream leading-tight mb-6">
                                Exploring India's<br />
                                <span className="text-heritage-goldLight">Cultural Roots</span><br />& Timeless Heritage
                            </h1>
                            <p className="text-lg text-heritage-cream/80 mb-8 max-w-lg">
                                Journey through ancient traditions, sacred monuments, and spiritual wisdom. Connect with thousands of years of cultural heritage through immersive experiences.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button
                                    className="btn-primary bg-heritage-cream text-heritage-green hover:bg-white"
                                    onClick={() => onNavigate('explore')}
                                >
                                    Explore Culture
                                </button>
                                <button
                                    className="btn-secondary border-heritage-cream/30 text-heritage-cream hover:border-heritage-gold hover:text-heritage-goldLight"
                                    onClick={() => onNavigate('wellness')}
                                >
                                    Start Your Journey
                                </button>
                            </div>
                        </Reveal>

                        {/* Hero Visual */}
                        <Reveal className="relative" style={{ animationDelay: '0.2s' }}>
                            <div className="relative aspect-square max-w-md mx-auto">
                                {/* Decorative circles */}
                                <div className="absolute inset-0 rounded-full border-2 border-heritage-gold/30 animate-pulse"></div>
                                <div className="absolute inset-8 rounded-full border border-heritage-cream/20"></div>
                                <div className="absolute inset-16 rounded-full border border-heritage-gold/20"></div>

                                {/* Center Image Container */}
                                <div className="absolute inset-12 rounded-full bg-gradient-to-br from-heritage-gold/40 to-heritage-teal/40 backdrop-blur-sm flex items-center justify-center overflow-hidden glow-accent">
                                    <svg className="w-32 h-32 text-heritage-cream" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                                        <path d="M12 2L8 8H4L6 12H2L4 16H8L12 22L16 16H20L22 12H18L20 8H16L12 2Z" fill="currentColor" opacity="0.3" />
                                        <path d="M12 6L10 10H8L9 12H7L8 14H10L12 18L14 14H16L17 12H15L16 10H14L12 6Z" fill="currentColor" />
                                        <circle cx="12" cy="12" r="2" fill="currentColor" />
                                    </svg>
                                </div>

                                {/* Floating elements */}
                                <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-heritage-gold/20 backdrop-blur-sm flex items-center justify-center animate-bounce" style={{ animationDuration: '3s' }}>
                                    <span className="font-display text-2xl font-bold text-heritage-goldLight">500+</span>
                                </div>
                                <div className="absolute bottom-8 left-0 px-4 py-2 rounded-full bg-heritage-cream/10 backdrop-blur-sm border border-heritage-cream/20">
                                    <span className="text-heritage-cream text-sm font-medium">Heritage Sites</span>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>

            {/* Daily Quote */}
            <div className="py-12 bg-gradient-to-r from-heritage-green/5 to-heritage-teal/5">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal className="quote-card">
                        <p className="font-display text-2xl sm:text-3xl italic text-[var(--fg)] mb-4">
                            "{dailyQuote.text}"
                        </p>
                        <cite className="text-[var(--muted)] font-medium">— {dailyQuote.source}</cite>
                    </Reveal>
                </div>
            </div>

            {/* Featured Sections */}
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal className="text-center mb-16">
                        <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--fg)] mb-4">Explore Your Heritage</h2>
                        <p className="text-[var(--muted)] max-w-2xl mx-auto">Discover the richness of Indian culture through interactive experiences, ancient wisdom, and immersive virtual tours.</p>
                    </Reveal>

                    <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Virtual Tours */}
                        <div className="heritage-card group cursor-pointer" onClick={() => onNavigate('tours')}>
                            <div className="aspect-[4/3] bg-gradient-to-br from-heritage-green to-heritage-teal relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23faf6f0%22%20stroke-width%3D%221%22%3E%3Cpath%20d%3D%22M3%2012h18M12%203v18M3%203l18%2018M21%203L3%2021%22%2F%3E%3C%2Fsvg%3E')] opacity-20"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className="w-16 h-16 text-heritage-cream" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                        <path d="M2 12h20" />
                                    </svg>
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="font-display text-xl font-bold text-[var(--fg)] mb-2 group-hover:text-heritage-gold transition-colors">Virtual Tours</h3>
                                <p className="text-sm text-[var(--muted)]">360° exploration of UNESCO heritage sites and ancient monuments.</p>
                            </div>
                        </div>
                        {/* Cultural Learning */}
                        <div className="heritage-card group cursor-pointer" onClick={() => onNavigate('explore')}>
                            <div className="aspect-[4/3] bg-gradient-to-br from-heritage-gold to-heritage-brownLight relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className="w-16 h-16 text-heritage-cream" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                                        <path d="M8 7h8M8 11h8M8 15h4" />
                                    </svg>
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="font-display text-xl font-bold text-[var(--fg)] mb-2 group-hover:text-heritage-gold transition-colors">Cultural Learning</h3>
                                <p className="text-sm text-[var(--muted)]">Traditions, festivals, arts, and scriptures explained.</p>
                            </div>
                        </div>
                        {/* Wellness */}
                        <div className="heritage-card group cursor-pointer" onClick={() => onNavigate('wellness')}>
                            <div className="aspect-[4/3] bg-gradient-to-br from-heritage-teal to-heritage-green relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className="w-16 h-16 text-heritage-cream" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M12 2L12 22" />
                                        <path d="M12 2C12 2 8 6 8 12C8 18 12 22 12 22" />
                                        <path d="M12 2C12 2 16 6 16 12C16 18 12 22 12 22" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="font-display text-xl font-bold text-[var(--fg)] mb-2 group-hover:text-heritage-gold transition-colors">Spiritual Wellness</h3>
                                <p className="text-sm text-[var(--muted)]">Meditation, chanting guides, and emotional balance tools.</p>
                            </div>
                        </div>
                        {/* Library */}
                        <div className="heritage-card group cursor-pointer" onClick={() => onNavigate('library')}>
                            <div className="aspect-[4/3] bg-gradient-to-br from-heritage-brown to-heritage-green relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className="w-16 h-16 text-heritage-cream" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="font-display text-xl font-bold text-[var(--fg)] mb-2 group-hover:text-heritage-gold transition-colors">Digital Library</h3>
                                <p className="text-sm text-[var(--muted)]">Scriptures, philosophy texts, and historical resources.</p>
                            </div>
                        </div>
                    </Stagger>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-20 bg-gradient-to-b from-transparent via-heritage-green/5 to-transparent">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="font-display text-4xl sm:text-5xl font-bold text-heritage-gold mb-2">500+</div>
                            <div className="text-[var(--muted)]">Heritage Sites</div>
                        </div>
                        <div className="text-center">
                            <div className="font-display text-4xl sm:text-5xl font-bold text-heritage-gold mb-2">40+</div>
                            <div className="text-[var(--muted)]">UNESCO Sites</div>
                        </div>
                        <div className="text-center">
                            <div className="font-display text-4xl sm:text-5xl font-bold text-heritage-gold mb-2">5000+</div>
                            <div className="text-[var(--muted)]">Years of History</div>
                        </div>
                        <div className="text-center">
                            <div className="font-display text-4xl sm:text-5xl font-bold text-heritage-gold mb-2">28</div>
                            <div className="text-[var(--muted)]">States Explored</div>
                        </div>
                    </Reveal>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal className="relative rounded-3xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-heritage-green via-heritage-teal to-heritage-green"></div>
                        <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
                            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-heritage-cream mb-6">Begin Your Cultural Journey</h2>
                            <p className="text-heritage-cream/80 max-w-2xl mx-auto mb-8">Connect with thousands of years of wisdom, explore sacred monuments, and discover the spiritual heritage that shaped civilization.</p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <button className="btn-primary bg-heritage-cream text-heritage-green" onClick={() => onNavigate('explore')}>Start Exploring</button>
                                <button className="btn-secondary border-heritage-cream/30 text-heritage-cream hover:bg-heritage-cream/10" onClick={() => onNavigate('about')}>Learn More</button>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>

        </section>
    );
};

export default Home;
