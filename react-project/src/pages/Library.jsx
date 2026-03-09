import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    BookOpen, Search, Filter, Clock, Star,
    ArrowRight, Heart, Tag
} from 'lucide-react';
import SEO from '../components/ui/SEO';
import { libraryAPI } from '../services/api';

const categories = ['All', 'Vedas', 'Yoga', 'Meditation', 'Philosophy', 'History'];

const articles = [
    { title: 'The Four Vedas: A Beginner\'s Guide', category: 'Vedas', readTime: '8 min', stars: 4.8, desc: 'Explore the foundational scriptures of Hindu philosophy and their relevance today.' },
    { title: 'Patanjali\'s Yoga Sutras Explained', category: 'Yoga', readTime: '12 min', stars: 4.9, desc: 'A modern interpretation of the 196 sutras that form the backbone of yoga practice.' },
    { title: 'Vipassana: The Art of Seeing Clearly', category: 'Meditation', readTime: '6 min', stars: 4.7, desc: 'Ancient Buddhist meditation technique for insight and liberation from suffering.' },
    { title: 'Advaita Vedanta: The Philosophy of Oneness', category: 'Philosophy', readTime: '10 min', stars: 4.6, desc: 'Adi Shankaracharya\'s non-dual philosophy that sees everything as Brahman.' },
    { title: 'The Silk Road: India\'s Cultural Highways', category: 'History', readTime: '15 min', stars: 4.5, desc: 'How Indian traders, monks, and scholars spread culture across continents.' },
    { title: 'Pranayama: Science of Breath', category: 'Yoga', readTime: '7 min', stars: 4.8, desc: 'Breathwork techniques from ancient texts that modern science is now validating.' },
];

const Library = () => {
    const [dynamicArticles, setDynamicArticles] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const heroRef = useRef(null);
    const gridRef = useRef(null);
    const heroInView = useInView(heroRef, { once: true });
    const gridInView = useInView(gridRef, { once: true, margin: '-80px' });

    useEffect(() => {
        libraryAPI.getAll().then(data => {
            if (data) setDynamicArticles(data);
        }).catch(err => console.error("Failed to fetch library items:", err));
    }, []);

    const allArticles = [...dynamicArticles, ...articles.filter(staticArt =>
        !dynamicArticles.some(dyn => dyn.title === staticArt.title)
    )];

    const filtered = allArticles.filter(a =>
        (activeCategory === 'All' || a.category === activeCategory) &&
        (a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.desc.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <>
            <SEO title="Library — Inner Root" description="Explore articles on Vedas, yoga, meditation, philosophy, and Indian history." />

            {/* Hero */}
            <section ref={heroRef} className="relative overflow-hidden section-padding" style={{ paddingBottom: 'var(--sp-12)' }}>
                <div className="sacred-geometry" style={{ opacity: 0.02 }} />
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-semibold tracking-widest uppercase" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                            <BookOpen size={14} /> Library
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5" style={{ fontFamily: 'var(--font-display)' }}>
                            Timeless <span className="text-gradient">Knowledge</span>
                        </h1>
                        <p className="text-base sm:text-lg max-w-2xl mx-auto mb-8" style={{ color: 'var(--text-secondary)' }}>
                            Curated articles on Indian heritage, spirituality, and wellness practices.
                        </p>
                        <div className="max-w-md mx-auto relative">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }} />
                            <input type="text" placeholder="Search articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section ref={gridRef} className="section-padding" style={{ paddingTop: 0 }}>
                <div className="max-w-5xl mx-auto px-6">
                    {/* Category Tabs */}
                    <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
                        {categories.map(cat => (
                            <button key={cat} onClick={() => setActiveCategory(cat)} className="tab-btn" style={activeCategory === cat ? { background: 'var(--accent)', color: '#fff', boxShadow: '0 4px 12px var(--accent-glow)' } : {}}>
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Articles Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filtered.map((article, i) => (
                            <motion.div
                                key={article.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: i * 0.06, duration: 0.5 }}
                                className="card p-6 group cursor-pointer flex flex-col"
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                                        {article.category}
                                    </span>
                                    <span className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                                        <Clock size={10} /> {article.readTime}
                                    </span>
                                </div>
                                <h3 className="text-base font-semibold mb-2 flex-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                                    {article.title}
                                </h3>
                                <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{article.desc}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--accent)' }}>
                                        <Star size={12} fill="currentColor" /> {article.stars}
                                    </div>
                                    <span className="flex items-center gap-1 text-xs font-medium transition-all duration-300 group-hover:gap-2" style={{ color: 'var(--accent)' }}>
                                        Read <ArrowRight size={12} />
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <div className="text-center py-16" style={{ color: 'var(--text-tertiary)' }}>
                            <Search size={48} className="mx-auto mb-4 opacity-30" />
                            <p className="text-lg">No articles found</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Library;
