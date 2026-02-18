import React, { useState, useMemo, useEffect } from 'react';
import { getCultureItems } from '../services/api';
import { Reveal, Stagger } from '../components/Reveal';
import SEO from '../components/SEO';

// Static configuration for categories (icons, labels, gradients)
const CATEGORY_CONFIG = {
    festivals: {
        icon: '🎆',
        label: 'National Festivals',
        gradient: 'from-amber-500/20 to-orange-500/20',
    },
    'state-festivals': {
        icon: '🏛️',
        label: 'State Festivals',
        gradient: 'from-cyan-500/20 to-blue-500/20',
    },
    arts: {
        icon: '🎭',
        label: 'Arts & Dances',
        gradient: 'from-emerald-500/20 to-teal-500/20',
    },
    traditions: {
        icon: '🙏',
        label: 'Traditions',
        gradient: 'from-indigo-500/20 to-purple-500/20',
    },
    scriptures: {
        icon: '📜',
        label: 'Scriptures',
        gradient: 'from-rose-500/20 to-pink-500/20',
    },
};

const Explore = () => {
    const [exploreData, setExploreData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [imgErrors, setImgErrors] = useState({});

    // Fetch data from Backend API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCultureItems();
                setExploreData(Array.isArray(response.data) ? response.data : []);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching culture data:", err);
                setError(err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredData = useMemo(() => {
        return (Array.isArray(exploreData) ? exploreData : []).filter(item => {
            const matchesFilter = filter === 'all' || item.category === filter;
            const q = searchQuery.toLowerCase();
            const matchesSearch =
                item.title.toLowerCase().includes(q) ||
                (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
                (item.description && item.description.toLowerCase().includes(q)) ||
                (item.origin && item.origin.toLowerCase().includes(q)) ||
                (item.significance && item.significance.toLowerCase().includes(q));
            return matchesFilter && matchesSearch;
        });
    }, [filter, searchQuery, exploreData]);

    const handleImgError = (id) => {
        setImgErrors(prev => ({ ...prev, [id]: true }));
    };

    // Calculate dynamic counts
    const categoryMeta = useMemo(() => {
        const meta = {};
        Object.keys(CATEGORY_CONFIG).forEach(key => {
            meta[key] = {
                ...CATEGORY_CONFIG[key],
                count: (Array.isArray(exploreData) ? exploreData : []).filter(d => d.category === key).length
            };
        });
        return meta;
    }, [exploreData]);

    const categoryKeys = ['all', ...Object.keys(CATEGORY_CONFIG)];

    // Gradient fallbacks for broken images
    const fallbackGradients = {
        'heritage-gold': 'from-amber-600 to-yellow-600',
        'heritage-teal': 'from-teal-600 to-cyan-600',
        'heritage-green': 'from-emerald-700 to-green-600',
        'heritage-brown': 'from-amber-800 to-orange-700',
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-heritage-gold"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
                <div className="text-4xl mb-4">⚠️</div>
                <h2 className="text-2xl font-bold mb-2">Unable to load content</h2>
                <p className="text-[var(--muted)] mb-4">{error}. Is the backend running?</p>
                <p className="text-sm text-[var(--muted)]">Try ensuring MySQL is connected and Backend is started.</p>
            </div>
        );
    }

    return (
        <section id="page-explore" className="page active block opacity-100">
            <SEO
                title="Explore Indian Culture"
                description="Discover Indian festivals, arts, traditions, and scriptures. A comprehensive guide to India's rich cultural heritage."
                keywords="Indian festivals, art forms, traditions, vedas, upanishads, culture"
            />
            <div className="py-12 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <Reveal className="text-center mb-12">
                        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[var(--fg)] mb-4">
                            Cultural Learning
                        </h1>
                        <p className="text-[var(--muted)] max-w-2xl mx-auto text-lg">
                            Traditions, festivals, arts, and scriptures explained.
                        </p>
                        <div className="mt-4 text-sm text-[var(--muted)]">
                            <span className="text-heritage-gold font-semibold">{exploreData.length}</span> items across {Object.keys(CATEGORY_CONFIG).length} categories
                        </div>
                    </Reveal>

                    {/* Category Stats Cards */}
                    <Stagger className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
                        {Object.entries(categoryMeta).map(([key, meta]) => (
                            <button
                                key={key}
                                onClick={() => setFilter(filter === key ? 'all' : key)}
                                className={`heritage-card p-5 text-center cursor-pointer group transition-all duration-300 ${filter === key ? 'ring-2 ring-heritage-gold shadow-lg shadow-heritage-gold/10 scale-[1.02]' : 'hover:scale-[1.02]'
                                    }`}
                            >
                                <div className={`text-3xl mb-2 group-hover:scale-110 transition-transform`}>
                                    {meta.icon}
                                </div>
                                <h3 className="font-display text-sm lg:text-base font-bold text-[var(--fg)]">{meta.label}</h3>
                                <p className="text-sm text-[var(--muted)]">{meta.count} items</p>
                            </button>
                        ))}
                    </Stagger>

                    {/* Search & Filter */}
                    <Reveal className="flex flex-col sm:flex-row gap-4 mb-10">
                        <div className="relative flex-1">
                            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search festivals, arts, traditions, scriptures, states..."
                                className="search-input"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                            {categoryKeys.map(f => (
                                <button
                                    key={f}
                                    className={`tab-btn whitespace-nowrap ${filter === f ? 'active' : ''}`}
                                    onClick={() => setFilter(f)}
                                >
                                    {f === 'all' ? '✨ All' : `${categoryMeta[f]?.icon || ''} ${categoryMeta[f]?.label || f}`}
                                </button>
                            ))}
                        </div>
                    </Reveal>

                    {/* Results count */}
                    <Reveal>
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-sm text-[var(--muted)]">
                                Showing <span className="font-semibold text-[var(--fg)]">{filteredData.length}</span> items
                                {filter !== 'all' && (
                                    <span> in <span className="text-heritage-gold capitalize">{categoryMeta[filter]?.label || filter}</span></span>
                                )}
                                {searchQuery && (
                                    <span> matching "<span className="text-heritage-gold">{searchQuery}</span>"</span>
                                )}
                            </p>
                            {(filter !== 'all' || searchQuery) && (
                                <button
                                    className="text-sm text-heritage-gold hover:underline"
                                    onClick={() => { setFilter('all'); setSearchQuery(''); }}
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    </Reveal>

                    {/* Culture Grid */}
                    <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(Array.isArray(filteredData) ? filteredData : []).map(item => (
                            <a
                                key={item.id}
                                href={item.wikiUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="heritage-card group cursor-pointer block no-underline transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-heritage-gold/5"
                                tabIndex="0"
                                aria-label={`Learn about ${item.title} on Wikipedia`}
                            >
                                {/* Image */}
                                <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl">
                                    {imgErrors[item.id] ? (
                                        <div className={`absolute inset-0 bg-gradient-to-br ${fallbackGradients['heritage-gold'] || 'from-heritage-green to-heritage-teal'} flex items-center justify-center`}>
                                            <span className="text-6xl opacity-60">{categoryMeta[item.category]?.icon}</span>
                                        </div>
                                    ) : (
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            loading="lazy"
                                            onError={() => handleImgError(item.id)}
                                        />
                                    )}
                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    {/* Category badge */}
                                    <div className="absolute top-3 left-3">
                                        <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white border border-white/10">
                                            {categoryMeta[item.category]?.icon} {categoryMeta[item.category]?.label || item.category}
                                        </span>
                                    </div>
                                    {/* Wikipedia link indicator */}
                                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                                            <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                <polyline points="15 3 21 3 21 9" />
                                                <line x1="10" y1="14" x2="21" y2="3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="font-display text-xl font-bold text-[var(--fg)] mb-1 group-hover:text-heritage-gold transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm font-medium text-heritage-gold/80 mb-2">{item.subtitle}</p>

                                    {/* Origin badge */}
                                    {item.origin && (
                                        <div className="flex items-center gap-1.5 mb-3">
                                            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-[var(--muted)] border border-white/10">
                                                📍 {item.origin}
                                            </span>
                                        </div>
                                    )}

                                    <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-3 mb-3">{item.description}</p>

                                    {/* Significance */}
                                    {item.significance && (
                                        <p className="text-xs text-heritage-gold/70 italic line-clamp-1">
                                            ✦ {item.significance}
                                        </p>
                                    )}

                                    {/* Read more tag */}
                                    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-heritage-gold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                                        <span>Read on Wikipedia</span>
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </Stagger>

                    {/* Empty state */}
                    {filteredData.length === 0 && (
                        <Reveal className="text-center py-20">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="font-display text-2xl font-bold text-[var(--fg)] mb-2">No items found</h3>
                            <p className="text-[var(--muted)] mb-6">
                                Try adjusting your search or filter to explore more cultural heritage.
                            </p>
                            <button
                                className="btn-primary"
                                onClick={() => { setFilter('all'); setSearchQuery(''); }}
                            >
                                Show All Items
                            </button>
                        </Reveal>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Explore;
