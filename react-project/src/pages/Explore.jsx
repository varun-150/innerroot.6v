import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
    MapPin, Search, Landmark, Sparkles, Heart, BookOpen, Coffee,
    ArrowRight, X, Info, Globe, Calendar, Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { exploreData } from '../data/exploreData';
import SEO from '../components/ui/SEO';
import { cultureAPI, heritageAPI } from '../services/api';

const categories = [
    { id: 'all', name: 'All', icon: Landmark },
    { id: 'temples', name: 'Temples', icon: Landmark },
    { id: 'festivals', name: 'Festivals', icon: Sparkles },
    { id: 'arts', name: 'Arts', icon: Heart },
    { id: 'traditions', name: 'Traditions', icon: BookOpen },
    { id: 'scriptures', name: 'Scriptures', icon: BookOpen },
    { id: 'food', name: 'Cuisine', icon: Coffee },
];

const stateNames = ['Delhi', 'Karnataka', 'Bihar', 'Maharashtra', 'Gujarat', 'Tamil Nadu', 'Rajasthan', 'Kerala'];

const Explore = () => {
    const [dynamicItems, setDynamicItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [cultureData, heritageData] = await Promise.all([
                    cultureAPI.getAll(),
                    heritageAPI.getAll()
                ]);

                const mappedHeritage = heritageData ? heritageData.map(h => ({
                    id: h.id,
                    title: h.name,
                    subtitle: h.location,
                    description: h.description,
                    category: h.category,
                    image: h.imageUrl,
                    origin: h.location,
                    significance: h.description
                })) : [];

                const mappedCulture = cultureData ? cultureData.map(c => ({
                    ...c,
                    image: c.image || 'https://via.placeholder.com/400x300'
                })) : [];

                setDynamicItems([...mappedCulture, ...mappedHeritage]);
            } catch (err) {
                console.error("Failed to fetch explore data:", err);
            }
        };
        fetchAll();
    }, []);

    // Scroll lock effect for modal
    useEffect(() => {
        if (selectedItem) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedItem]);    // Merge dynamic items with static items, avoiding duplicates by title
    const allItems = [...dynamicItems, ...exploreData.filter(staticItem =>
        !dynamicItems.some(dyn => dyn.title === staticItem.title)
    )];

    const heroRef = useRef(null);
    const gridRef = useRef(null);
    const heroInView = useInView(heroRef, { once: true });
    const gridInView = useInView(gridRef, { once: true, margin: '-80px' });

    const filteredItems = allItems.filter(item => {
        const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.origin && item.origin.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = activeCategory === 'all' || item.category === activeCategory || (activeCategory === 'festivals' && item.category === 'state-festivals');
        return matchesSearch && matchesCategory;
    });

    const openItem = (item) => {
        setSelectedItem(item);
    };

    return (
        <>
            <SEO title="Heritage Explorer — Inner Root" description="Explore India's cultural heritage through interactive maps and deep cultural insights." />

            {/* ===== HERO ===== */}
            <section
                ref={heroRef}
                className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24"
            >
                <div className="sacred-geometry" style={{ opacity: 0.03 }} />

                {/* Visual Map Backdrop (Simulated Interactive Map) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-full opacity-10 pointer-events-none">
                    <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <path d="M200 100 Q 250 50 400 80 T 600 150 T 700 300 T 550 500 T 300 550 T 150 400 T 200 100" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4 4" />
                        {stateNames.map((s, idx) => (
                            <circle key={s} cx={200 + idx * 60} cy={150 + (idx % 3) * 100} r="4" fill="var(--accent)" />
                        ))}
                    </svg>
                </div>

                <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7 }}
                    >
                        <Link
                            to="/heritage-map"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-semibold tracking-widest uppercase hover:scale-105 transition-transform cursor-pointer"
                            style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                        >
                            <MapPin size={14} /> Open Full Interactive Map
                        </Link>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5" style={{ fontFamily: 'var(--font-display)' }}>
                            Explore India's{' '}
                            <span className="text-gradient">Sacred Landmarks</span>
                        </h1>
                        <p className="text-base sm:text-lg max-w-2xl mx-auto mb-10" style={{ color: 'var(--text-secondary)' }}>
                            Navigate through 500+ monuments and temples. Our interactive state-grid provides deep context, audio guides, and mythological history for every site.
                        </p>

                        {/* Category Filters */}
                        <div className="flex flex-wrap justify-center gap-3 mt-12 mb-8">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
                                    style={{
                                        background: activeCategory === cat.id ? 'var(--accent)' : 'var(--bg-glass)',
                                        color: activeCategory === cat.id ? '#fff' : 'var(--text-secondary)',
                                        border: '1px solid var(--border-glass)',
                                        boxShadow: activeCategory === cat.id ? '0 8px 20px var(--accent-glow)' : 'var(--shadow-sm)'
                                    }}
                                >
                                    <cat.icon size={16} />
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        {/* Search + Info Bar */}
                        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-4 bg-card p-2 rounded-2xl border border-primary shadow-lg">
                            <div className="relative flex-1 w-full">
                                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }} />
                                <input
                                    type="text"
                                    placeholder="Search by name, state, or era..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-transparent pl-11 pr-4 py-3 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
                                    style={{ color: 'var(--text-primary)' }}
                                />
                            </div>
                            <div className="hidden sm:flex items-center gap-2 px-4 py-2 border-l border-primary text-xs whitespace-nowrap" style={{ color: 'var(--text-tertiary)' }}>
                                <Landmark size={14} className="text-accent" />
                                <span>{allItems.length} records documented</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ===== HERITAGE GRID ===== */}
            <section ref={gridRef} className="section-padding" style={{ paddingTop: 0 }}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredItems.map((item, i) => {
                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={gridInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: i * 0.02, duration: 0.5 }}
                                    onClick={() => openItem(item)}
                                    className="group cursor-pointer rounded-2xl overflow-hidden transition-all duration-500"
                                    style={{
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--border-primary)',
                                        boxShadow: 'var(--shadow-sm)',
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                                >
                                    {/* Image Container */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-3 left-3 flex items-center gap-2">
                                            <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-md bg-white/10 text-white border border-white/20">
                                                {(item.category || 'general').replace('-', ' ')}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                                            {item.title}
                                        </h3>
                                        <p className="text-[11px] font-medium mb-3" style={{ color: 'var(--accent)' }}>
                                            {item.subtitle}
                                        </p>
                                        <p className="text-xs line-clamp-2 mb-4" style={{ color: 'var(--text-tertiary)' }}>
                                            {item.description}
                                        </p>

                                        <div className="flex items-center justify-between pt-4 border-t border-primary">
                                            <div className="flex items-center gap-1.5 text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                                                <MapPin size={12} />
                                                <span>{item.origin}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-[10px] font-bold" style={{ color: 'var(--accent)' }}>
                                                <span>Explore</span>
                                                <ArrowRight size={12} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {filteredItems.length === 0 && (
                        <div className="text-center py-24" style={{ color: 'var(--text-tertiary)' }}>
                            <Search size={64} className="mx-auto mb-6 opacity-20" />
                            <h3 className="text-xl font-bold mb-2">No matching heritage found</h3>
                            <p className="text-sm">Try adjusting your search or category filters.</p>
                            <button
                                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                                className="mt-6 text-accent font-semibold underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* ===== ITEM DETAIL MODAL ===== */}
            <AnimatePresence>
                {selectedItem && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setSelectedItem(null)}
                        />

                        {/* Modal Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative z-[101] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] sm:rounded-[2.5rem] bg-[var(--bg-primary)] border border-[var(--border-primary)] shadow-2xl flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Hero Image in Modal */}
                            <div className="relative h-64 sm:h-80 w-full shrink-0">
                                <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md bg-black/40 text-white border border-white/20 hover:bg-black/60 transition-colors z-10"
                                >
                                    <X size={20} />
                                </button>

                                <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
                                    <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest backdrop-blur-md bg-accent/20 text-accent border border-accent/30 mb-3 sm:mb-4 inline-block">
                                        {(selectedItem.category || 'general').replace('-', ' ')}
                                    </span>
                                    <h2 className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                                        {selectedItem.title}
                                    </h2>
                                    <p className="text-white/80 text-xs sm:text-sm font-medium">{selectedItem.subtitle}</p>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-6 sm:p-10 shrink-0">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Main Content */}
                                    <div className="lg:col-span-2 space-y-8">
                                        <section>
                                            <h4 className="text-[10px] sm:text-xs uppercase tracking-widest font-bold mb-3 sm:mb-4 text-accent">Historical Context</h4>
                                            <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                                                {selectedItem.description}
                                            </p>
                                        </section>

                                        <section className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] shadow-inner">
                                            <h4 className="text-[10px] sm:text-xs uppercase tracking-widest font-bold mb-2 sm:mb-3 text-accent">Significance</h4>
                                            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                                {selectedItem.significance}
                                            </p>
                                        </section>
                                    </div>

                                    {/* Sidebar Info */}
                                    <div className="space-y-4 sm:space-y-6">
                                        <div className="p-4 sm:p-5 rounded-2xl space-y-4 bg-[var(--accent-soft)] border border-[var(--border-primary)] shadow-sm">
                                            <div>
                                                <span className="text-[9px] sm:text-[10px] uppercase tracking-tighter block opacity-60 mb-1">Origin / Region</span>
                                                <span className="text-xs sm:text-sm font-bold flex items-center gap-2">
                                                    <MapPin size={14} className="text-accent shrink-0" />
                                                    <span className="truncate">{selectedItem.origin}</span>
                                                </span>
                                            </div>
                                            {selectedItem.wikiUrl && (
                                                <a
                                                    href={selectedItem.wikiUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:underline mt-2 transition-all hover:gap-3"
                                                >
                                                    <BookOpen size={14} />
                                                    View on Wikipedia <ArrowRight size={12} />
                                                </a>
                                            )}
                                        </div>

                                        <button
                                            className="w-full py-3 sm:py-4 rounded-xl text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] shadow-[0_8px_20px_var(--accent-glow)] bg-[var(--accent)]"
                                        >
                                            <Heart size={16} /> Add to Favorites
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Explore;
