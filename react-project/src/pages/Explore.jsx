import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCultureItems } from '../services/api';
import { exploreData as localExploreData } from '../data/exploreData';
import { Reveal, Stagger } from '../components/Reveal';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import {
    Search, Filter, MapPin, ExternalLink,
    Sparkles, BookOpen, Music, Users,
    ArrowRight, Info, AlertTriangle, Loader2
} from 'lucide-react';

const CATEGORY_CONFIG = {
    festivals: {
        icon: '🎆',
        label: 'National Festivals',
        color: 'text-amber-500',
        bg: 'bg-amber-500/10'
    },
    'state-festivals': {
        icon: '🏛️',
        label: 'State Festivals',
        color: 'text-cyan-500',
        bg: 'bg-cyan-500/10'
    },
    arts: {
        icon: '🎭',
        label: 'Arts & Dances',
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10'
    },
    traditions: {
        icon: '🙏',
        label: 'Traditions',
        color: 'text-indigo-500',
        bg: 'bg-indigo-500/10'
    },
    scriptures: {
        icon: '📜',
        label: 'Scriptures',
        color: 'text-rose-500',
        bg: 'bg-rose-500/10'
    },
    temples: {
        icon: '🛕',
        label: 'Ancient Temples',
        color: 'text-orange-500',
        bg: 'bg-orange-500/10'
    },
    food: {
        icon: '🍛',
        label: 'Culinary Arts',
        color: 'text-amber-600',
        bg: 'bg-amber-600/10'
    },
    languages: {
        icon: '🗣️',
        label: 'Languages',
        color: 'text-blue-500',
        bg: 'bg-blue-500/10'
    },
};

const Explore = () => {
    const [exploreData, setExploreData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [imgErrors, setImgErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCultureItems();
                const data = Array.isArray(response.data) && response.data.length > 0
                    ? response.data
                    : localExploreData;
                setExploreData(data);
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

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6">
                <Loader2 className="w-12 h-12 text-heritage-gold animate-spin" />
                <p className="font-display text-xl text-[var(--muted)] animate-pulse">Consulting the archives...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                    <AlertTriangle className="w-10 h-10 text-red-500" />
                </div>
                <h2 className="font-display text-3xl font-bold text-[var(--fg)] mb-4">Discovery Interrupted</h2>
                <p className="text-[var(--muted)] max-w-md mx-auto text-lg mb-8">{error}. Please ensure our wisdom servers are active.</p>
                <Button onClick={() => window.location.reload()} variant="primary" size="lg">Retry Connection</Button>
            </div>
        );
    }

    return (
        <section id="page-explore" className="page active block opacity-100" aria-label="Cultural Discovery Engine">
            <SEO
                title="Explore Indian Culture"
                description="Discover Indian festivals, arts, traditions, and scriptures. A comprehensive guide to India's rich cultural heritage."
                keywords="Indian festivals, art forms, traditions, vedas, upanishads, culture"
            />
            <div className="py-12 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Breadcrumbs />

                    {/* Header */}
                    <Reveal className="text-center mb-20 mt-8">
                        <span className="inline-block px-4 py-1 rounded-full bg-heritage-gold/20 text-heritage-gold font-bold text-xs uppercase tracking-widest mb-6 border border-heritage-gold/20">Discovery Engine</span>
                        <h1 className="font-display text-4xl sm:text-6xl font-bold text-[var(--fg)] mb-6 tracking-tight">
                            The Treasury of Heritage
                        </h1>
                        <p className="text-[var(--muted)] max-w-3xl mx-auto text-xl leading-relaxed font-medium">
                            Explore the vibrant tapestry of India's cultural soul—from ancient scriptures to living traditions.
                        </p>
                    </Reveal>

                    {/* Category Quick Filters */}
                    <Stagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
                        {Object.entries(categoryMeta).map(([key, meta]) => (
                            <button
                                key={key}
                                onClick={() => setFilter(filter === key ? 'all' : key)}
                                className={`group relative p-6 rounded-[32px] border-2 transition-all duration-500 text-left overflow-hidden h-full ${filter === key
                                    ? 'bg-heritage-gold border-heritage-gold shadow-2xl shadow-heritage-gold/20 -translate-y-2'
                                    : 'bg-[var(--bg)] border-[var(--border)] hover:border-heritage-gold/30 hover:-translate-y-1'
                                    }`}
                            >
                                <div className={`text-4xl mb-6 transition-transform group-hover:scale-110 duration-500 ${filter === key ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`}>
                                    {meta.icon}
                                </div>
                                <h3 className={`font-display text-lg font-bold mb-2 ${filter === key ? 'text-white' : 'text-[var(--fg)]'}`}>
                                    {meta.label}
                                </h3>
                                <p className={`text-sm font-bold uppercase tracking-widest ${filter === key ? 'text-white/80' : 'text-[var(--muted)]'}`}>
                                    {meta.count} Wisdoms
                                </p>
                                {filter === key && (
                                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white/20 rounded-full blur-xl"></div>
                                )}
                            </button>
                        ))}
                    </Stagger>

                    {/* Search & Filter Bar */}
                    <Reveal className="mb-12">
                        <Card className="p-8 !rounded-[40px] shadow-2xl border-[var(--border)] overflow-visible">
                            <div className="flex flex-col lg:flex-row gap-8 items-end lg:items-center">
                                <div className="flex-1 w-full">
                                    <Input
                                        placeholder="Search festivals, arts, traditions, states..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        icon={Search}
                                        className="!py-4 !text-lg"
                                        containerClassName="!space-y-3"
                                        label="Search Wisdoms"
                                    />
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {categoryKeys.map(f => (
                                        <button
                                            key={f}
                                            className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center gap-2 border-2 ${filter === f
                                                ? 'bg-heritage-gold border-heritage-gold text-white shadow-lg'
                                                : 'bg-white border-[var(--border)] text-[var(--muted)] hover:border-heritage-gold/30'
                                                }`}
                                            onClick={() => setFilter(f)}
                                        >
                                            <span className={filter === f ? 'scale-110' : ''}>{f === 'all' ? '✨' : categoryMeta[f]?.icon}</span>
                                            {f === 'all' ? 'All Wisdoms' : categoryMeta[f]?.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </Reveal>

                    {/* Meta Info */}
                    {(filter !== 'all' || searchQuery) && (
                        <Reveal className="flex items-center justify-between mb-8 px-4">
                            <div className="flex items-center gap-3 text-lg font-medium text-[var(--muted)]">
                                <Filter className="w-5 h-5 text-heritage-gold" />
                                <span>
                                    Found <span className="text-[var(--fg)] font-bold">{filteredData.length}</span> artifacts
                                    {filter !== 'all' && <> in <span className="text-heritage-gold font-bold">{categoryMeta[filter]?.label}</span></>}
                                    {searchQuery && <> matching "<span className="text-heritage-gold font-bold">{searchQuery}</span>"</>}
                                </span>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => { setFilter('all'); setSearchQuery(''); }}
                            >
                                Clear Exploration
                            </Button>
                        </Reveal>
                    )}

                    {/* Culture Grid */}
                    {filteredData.length > 0 ? (
                        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            {filteredData.map((item) => (
                                <Card
                                    key={item.id}
                                    className="p-0 overflow-hidden !rounded-[40px] group shadow-xl hover:shadow-2xl h-full border-[var(--border)]"
                                    animate={false}
                                >
                                    {/* Media Area */}
                                    <div className="aspect-[4/3] relative overflow-hidden">
                                        {imgErrors[item.id] ? (
                                            <div className="absolute inset-0 bg-gradient-to-br from-heritage-teal/20 to-heritage-gold/20 flex flex-col items-center justify-center p-8 text-center">
                                                <span className="text-7xl mb-4 group-hover:scale-110 transition-transform duration-700">{categoryMeta[item.category]?.icon}</span>
                                                <p className="font-display font-medium text-lg text-heritage-brown/60">Illuminating {item.title}...</p>
                                            </div>
                                        ) : (
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                                loading="lazy"
                                                onError={() => handleImgError(item.id)}
                                            />
                                        )}

                                        {/* Overlays */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                                        {/* Badge */}
                                        <div className="absolute top-6 left-6 z-10">
                                            <span className="px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md text-heritage-brown text-xs font-bold uppercase tracking-widest shadow-2xl flex items-center gap-2 border border-white/50">
                                                <span>{categoryMeta[item.category]?.icon}</span>
                                                {categoryMeta[item.category]?.label}
                                            </span>
                                        </div>

                                        {/* Origin Pin */}
                                        {item.origin && (
                                            <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md text-white border border-white/10 group-hover:scale-105 transition-transform">
                                                <MapPin className="w-3.5 h-3.5 text-heritage-gold" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">{item.origin}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Interaction & Details */}
                                    <div className="p-8 flex flex-col flex-1 relative bg-gradient-to-b from-transparent to-[var(--bg)]/10">
                                        <div className="flex-1">
                                            <h3 className="font-display text-3xl font-bold text-[var(--fg)] mb-3 group-hover:text-heritage-gold transition-colors tracking-tight">
                                                {item.title}
                                            </h3>
                                            {item.subtitle && (
                                                <p className="text-sm font-bold text-heritage-gold uppercase tracking-[0.1em] mb-4 opacity-90">{item.subtitle}</p>
                                            )}
                                            <p className="text-[var(--muted)] leading-relaxed text-lg line-clamp-3 mb-8">{item.description}</p>
                                        </div>

                                        {item.significance && (
                                            <div className="mb-8 p-4 rounded-2xl bg-heritage-gold/5 border-l-4 border-heritage-gold italic text-sm text-[var(--muted)]/80 leading-relaxed font-medium">
                                                "{item.significance}"
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between pt-6 border-t border-[var(--border)] mt-auto">
                                            <a
                                                href={item.wikiUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm font-bold text-heritage-gold hover:text-heritage-goldLight flex items-center gap-2 transition-colors"
                                            >
                                                Detailed Registry <ArrowRight className="w-4 h-4" />
                                            </a>
                                            <div className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted)] group-hover:bg-heritage-gold group-hover:text-white group-hover:border-heritage-gold transition-all">
                                                <ExternalLink className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </Stagger>
                    ) : (
                        /* Empty State */
                        <Reveal className="text-center py-32 bg-[var(--bg)] border-2 border-dashed border-[var(--border)] rounded-[40px] shadow-inner">
                            <div className="w-24 h-24 bg-white shadow-xl rounded-[32px] flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                                <Info className="w-12 h-12 text-heritage-gold" />
                            </div>
                            <h3 className="font-display text-3xl font-bold text-[var(--fg)] mb-4">No artifacts found in this era</h3>
                            <p className="text-[var(--muted)] max-w-md mx-auto text-lg mb-12">
                                Try expanding your search parameters or explore all categories to find what you seek.
                            </p>
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => { setFilter('all'); setSearchQuery(''); }}
                                leftIcon={Sparkles}
                            >
                                Show All Treasury
                            </Button>
                        </Reveal>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Explore;
