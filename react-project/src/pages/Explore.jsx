import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
    MapPin, Search, Landmark, Sparkles, Heart, BookOpen, Coffee,
    ArrowRight, X, Info, Globe, Calendar, Users
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
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

    // ── GSAP Staggered Entrance ──
    useGSAP(() => {
        if (gridInView) {
            gsap.from(".heritage-card", {
                y: 60,
                opacity: 0,
                duration: 1.2,
                stagger: 0.08,
                ease: "expo.out",
                rotateX: -10,
                perspective: 1000
            });
        }
    }, { scope: gridRef, dependencies: [gridInView] });

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
        <div className="bg-obsidian-pure min-h-screen text-white/90 selection:bg-accent/30">
            <SEO title="Sacred Cartography — Inner Root" description="Navigate the high-frequency heritage of India through our interactive sacred cartography." />

            {/* ===== PREMIUM HERO ===== */}
            <section
                ref={heroRef}
                className="relative overflow-hidden pt-40 pb-24 lg:pt-56 lg:pb-32"
            >
                <div className="sacred-geometry opacity-[0.05]" />
                
                {/* Ancient Future Ambient BG */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] opacity-20 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent animate-pulse-slow" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center"
                    >
                        <span className="text-accent font-black uppercase text-[11px] tracking-[0.8em] mb-14 block">
                            Sacred Cartography of Civilization
                        </span>
                        
                        <h1 className="text-7xl md:text-[10rem] font-display font-black leading-[0.75] mb-20 tracking-tighter uppercase">
                            EXPLORE THE <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-accent/60">SACRED REALM</span>
                        </h1>

                        <div className="max-w-5xl mx-auto space-y-12">
                            {/* Premium Search Console */}
                            <div className="relative group card-8k shimmer-border p-3 overflow-hidden rounded-[3rem] bg-surface/40 backdrop-blur-3xl focus-within:ring-2 ring-accent/20 transition-all">
                                <div className="flex flex-col md:flex-row items-center gap-4">
                                    <div className="relative flex-1 w-full">
                                        <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-accent/40 group-focus-within:text-accent transition-colors" size={24} />
                                        <input 
                                            type="text"
                                            placeholder="Search by site, era, or tradition..."
                                            className="w-full bg-transparent border-none py-8 pl-20 pr-10 text-2xl text-white placeholder:text-white/10 outline-none font-heading"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    
                                    <div className="flex flex-wrap justify-center gap-3 p-2 border-t md:border-t-0 md:border-l border-white/5 w-full md:w-auto">
                                        {categories.map(cat => (
                                            <button
                                                key={cat.id}
                                                onClick={() => setActiveCategory(cat.id)}
                                                className={`px-10 py-6 rounded-2xl whitespace-nowrap font-heading font-black uppercase text-[10px] tracking-[0.2em] transition-all relative overflow-hidden group/btn ${
                                                    activeCategory === cat.id 
                                                    ? 'text-obsidian-pure' 
                                                    : 'text-white/40 hover:text-white'
                                                }`}
                                            >
                                                {activeCategory === cat.id && (
                                                    <motion.div 
                                                        layoutId="cat-active"
                                                        className="absolute inset-0 bg-accent shadow-amber-glow"
                                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                                    />
                                                )}
                                                <span className="relative z-10 flex items-center gap-3">
                                                    {cat.icon && <cat.icon size={14} strokeWidth={activeCategory === cat.id ? 2.5 : 1.5} />}
                                                    {cat.name}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Resonance Prompt */}
                            <p className="text-xl italic text-white/40 font-display">
                                "Navigate the high-frequency heritage of 5,000 years, encoded for the digital era."
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ===== PREMIUM HERITAGE GRID ===== */}
            <section ref={gridRef} className="pb-40 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                onClick={() => openItem(item)}
                                className="heritage-card group cursor-pointer rounded-[2.5rem] overflow-hidden transition-all duration-700 card-8k shimmer-border bg-surface/30 backdrop-blur-2xl hover:bg-surface/50 border border-white/5"
                            >
                                {/* Immersive Image Container */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-pure via-transparent to-transparent opacity-80" />
                                    
                                    <div className="absolute top-5 left-5">
                                        <div className="px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] backdrop-blur-xl bg-accent/20 text-accent border border-accent/30 shadow-amber-glow">
                                            {(item.category || 'heritage').replace('-', ' ')}
                                        </div>
                                    </div>
                                </div>

                                {/* Refined Metadata */}
                                <div className="p-8">
                                    <h3 className="text-2xl font-display font-black mb-2 text-white group-hover:text-accent transition-colors tracking-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-[11px] font-black uppercase tracking-[0.4em] text-accent/60 mb-6 italic">
                                        {item.subtitle}
                                    </p>
                                    <p className="text-sm leading-relaxed text-white/40 line-clamp-2 mb-8 font-light">
                                        {item.description}
                                    </p>

                                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/20">
                                            <MapPin size={14} className="text-accent/40" />
                                            <span>{item.origin}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-accent opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                            <span>Explore</span>
                                            <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filteredItems.length === 0 && (
                        <div className="text-center py-40 card-8k rounded-[4rem] bg-surface/10">
                            <Search size={80} className="mx-auto mb-8 opacity-10 text-accent" strokeWidth={1} />
                            <h3 className="text-4xl font-display font-black mb-4">Frequency Mismatch</h3>
                            <p className="text-white/30 font-black uppercase tracking-[0.4em] text-xs">No heritage logs found for this query</p>
                            <button
                                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                                className="mt-10 btn btn-primary px-12 py-5 text-[10px] font-black tracking-widest uppercase"
                            >
                                Recalibrate Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* ===== SACRED MODAL (CINEMATIC VIEW) ===== */}
            <AnimatePresence>
                {selectedItem && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10 overflow-hidden">
                        {/* High-Resolution Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-obsidian-pure/90 backdrop-blur-2xl"
                            onClick={() => setSelectedItem(null)}
                        />

                        {/* Immersive Scroll Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            className="relative z-[101] w-full max-w-6xl max-h-full overflow-y-auto no-scrollbar rounded-[4rem] bg-surface/30 border border-white/5 shadow-2xl flex flex-col glass-morphism backdrop-blur-3xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Cinematic Hero */}
                            <div className="relative h-[50vh] min-h-[400px] w-full shrink-0">
                                <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-pure via-obsidian-pure/40 to-transparent" />
                                
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="absolute top-10 right-10 w-16 h-16 rounded-[2rem] flex items-center justify-center backdrop-blur-3xl bg-white/5 text-white/40 border border-white/10 hover:text-white hover:bg-white/10 hover:rotate-90 transition-all duration-700 z-50"
                                >
                                    <X size={32} strokeWidth={1.5} />
                                </button>

                                <div className="absolute bottom-16 left-16 right-16">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <div className="px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.5em] backdrop-blur-3xl bg-accent/20 text-accent border border-accent/20 mb-8 inline-block shadow-amber-glow">
                                            {(selectedItem.category || 'sacred heritage').replace('-', ' ')}
                                        </div>
                                        <h2 className="text-6xl md:text-8xl font-display font-black text-white mb-4 tracking-tighter uppercase leading-[0.9]">
                                            {selectedItem.title}
                                        </h2>
                                        <p className="text-xl md:text-2xl text-accent font-display italic opacity-80">{selectedItem.subtitle}</p>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Artifact Details Area */}
                            <div className="p-10 lg:p-20">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
                                    {/* Primary Dossier */}
                                    <div className="lg:col-span-2 space-y-16">
                                        <section>
                                            <div className="flex items-center gap-6 mb-8">
                                                <div className="w-12 h-[1px] bg-accent" />
                                                <h4 className="text-[11px] uppercase tracking-[0.6em] font-black text-accent">Chronicle & Context</h4>
                                            </div>
                                            <p className="text-xl md:text-2xl leading-relaxed text-white/70 font-display">
                                                {selectedItem.description}
                                            </p>
                                        </section>

                                        <section className="card-8k p-10 md:p-14 rounded-[3rem] bg-accent/5 border border-accent/10 relative overflow-hidden group/sig">
                                            <Sparkles size={120} className="absolute -top-10 -right-10 opacity-[0.03] text-accent group-hover/sig:rotate-12 transition-transform duration-1000" />
                                            <h4 className="text-[10px] uppercase tracking-[0.5em] font-black mb-6 text-accent">Esoteric Significance</h4>
                                            <p className="text-lg leading-relaxed text-white/50 italic font-medium">
                                                {selectedItem.significance}
                                            </p>
                                        </section>
                                    </div>

                                    {/* Intelligence Panel */}
                                    <div className="space-y-10">
                                        <div className="card-8k p-10 rounded-[3rem] space-y-8 bg-surface/20 border border-white/5">
                                            <div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-3">Origin / Region</span>
                                                <span className="text-lg font-black flex items-center gap-4 text-white">
                                                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                                                        <MapPin size={20} />
                                                    </div>
                                                    {selectedItem.origin}
                                                </span>
                                            </div>

                                            <div className="h-[1px] bg-white/5 w-full" />

                                            {selectedItem.wikiUrl && (
                                                <a
                                                    href={selectedItem.wikiUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-between group/link"
                                                >
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Library Link</span>
                                                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover/link:border-accent group-hover/link:text-accent transition-all">
                                                        <BookOpen size={20} />
                                                    </div>
                                                </a>
                                            )}
                                        </div>

                                        <button
                                            className="w-full py-8 rounded-[2rem] text-obsidian-pure font-black text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-4 transition-all hover:scale-[1.03] active:scale-95 shadow-amber-glow bg-accent"
                                        >
                                            <Heart size={18} fill="currentColor" /> Harvest to Core
                                        </button>
                                        
                                        <p className="text-[9px] text-center text-white/10 font-black uppercase tracking-[0.3em]">
                                            Last Updated by Root protocols
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Explore;
