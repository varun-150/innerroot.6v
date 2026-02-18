import React, { useState } from 'react';
import { getLibraryItems } from '../services/api';
import { Reveal, Stagger } from '../components/Reveal';

// Safelist for Tailwind classes used dynamically
// from-heritage-gold/20 to-heritage-goldLight/20 text-heritage-gold
// from-heritage-teal/20 to-heritage-tealLight/20 text-heritage-teal
// from-heritage-green/20 to-heritage-greenLight/20 text-heritage-green
// from-heritage-brown/20 to-heritage-brownLight/20 text-heritage-brown

const Library = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [libraryData, setLibraryData] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const fetchLibrary = async () => {
            try {
                const response = await getLibraryItems();
                setLibraryData(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("Failed to fetch library items:", error);
                setLibraryData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchLibrary();
    }, []);

    // Filter logic
    const filteredData = (Array.isArray(libraryData) ? libraryData : []).filter(item =>
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section id="page-library" className="page active block opacity-100">
            <div className="py-12 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <Reveal className="text-center mb-12">
                        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[var(--fg)] mb-4">Digital Library</h1>
                        <p className="text-[var(--muted)] max-w-2xl mx-auto">
                            Scriptures, philosophy texts, and historical resources.
                        </p>
                    </Reveal>

                    {/* Search */}
                    <Reveal className="max-w-xl mx-auto mb-12">
                        <div className="relative">
                            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search scriptures, texts, articles..."
                                className="search-input"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </Reveal>

                    {/* Categories */}
                    <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[
                            { id: 'vedas', title: 'Vedas', desc: '4 sacred texts', color: 'heritage-gold', letter: 'V' },
                            { id: 'upanishads', title: 'Upanishads', desc: '108 principal texts', color: 'heritage-teal', letter: 'U' },
                            { id: 'gita', title: 'Bhagavad Gita', desc: '18 chapters', color: 'heritage-green', letter: 'G' },
                            { id: 'philosophy', title: 'Philosophy', desc: 'Darshanas & texts', color: 'heritage-brown', letter: 'P' }
                        ].map(cat => (
                            <div key={cat.id} className="heritage-card p-6 text-center cursor-pointer group" data-category={cat.id}>
                                <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-${cat.color}/20 to-${cat.color}Light/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                                    <span className={`font-display text-2xl font-bold text-${cat.color}`}>{cat.letter}</span>
                                </div>
                                <h3 className="font-display text-lg font-bold text-[var(--fg)] mb-1">{cat.title}</h3>
                                <p className="text-sm text-[var(--muted)]">{cat.desc}</p>
                            </div>
                        ))}
                    </Stagger>

                    {/* Library Items */}
                    <Reveal className="heritage-card">
                        <div className="p-6 border-b border-[var(--border)]">
                            <h3 className="font-display text-xl font-bold text-[var(--fg)]">Featured Texts ({filteredData.length})</h3>
                        </div>
                        <div className="divide-y divide-[var(--border)]">
                            {filteredData.map((item) => (
                                <div key={item.id} className="p-6 hover:bg-[var(--border)]/20 transition-colors group">
                                    <div className="flex flex-col sm:flex-row items-start gap-6">
                                        {/* Thumbnail */}
                                        <div className="w-20 h-24 sm:w-24 sm:h-32 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0 shadow-md">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <h4 className="font-display text-lg font-bold text-[var(--fg)]">{item.title}</h4>
                                                <span className="text-xs px-2 py-0.5 rounded-full bg-heritage-teal/10 text-heritage-teal border border-heritage-teal/20">{item.category}</span>
                                            </div>
                                            <p className="text-sm text-[var(--muted)] mb-3 line-clamp-2">{item.description}</p>

                                            <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--muted)] mb-4">
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                                    {item.author}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                                                    {item.chapters}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                                    ~{item.readTime} read
                                                </span>
                                            </div>

                                            <a
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm font-medium text-heritage-gold hover:text-heritage-goldLight transition-colors"
                                            >
                                                <span>Read Text</span>
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                    <polyline points="15 3 21 3 21 9" />
                                                    <line x1="10" y1="14" x2="21" y2="3" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {filteredData.length === 0 && (
                            <div className="p-8 text-center text-[var(--muted)]">No texts found matching your search.</div>
                        )}
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default Library;
