import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen, Search, Filter, Clock, Star,
    ArrowRight, Heart, Tag, Sparkles, Book,
    Download, Share2, Bookmark, Eye
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SEO from '../components/ui/SEO';
import { libraryAPI } from '../services/api';

const categories = ['All', 'Vedas', 'Yoga', 'Meditation', 'Philosophy', 'History', 'Ayurveda'];

const fallbackArticles = [
    { 
        id: 'v1',
        title: 'The Four Vedas: A Beginner\'s Guide', 
        category: 'Vedas', 
        readTime: '8 min', 
        stars: 4.8, 
        views: '12k',
        desc: 'Explore the foundational scriptures of Hindu philosophy and their relevance in the modern world.',
        image: 'https://images.unsplash.com/photo-1544924222-35a3df55dc46?auto=format&fit=crop&q=80&w=800'
    },
    { 
        id: 'y1',
        title: 'Patanjali\'s Yoga Sutras Explained', 
        category: 'Yoga', 
        readTime: '12 min', 
        stars: 4.9, 
        views: '24k',
        desc: 'A modern interpretation of the 196 sutras that form the backbone of pathanjali yoga practice.',
        image: 'https://images.unsplash.com/photo-1545208393-596371ba1eb1?auto=format&fit=crop&q=80&w=800'
    },
    { 
        id: 'm1',
        title: 'Vipassana: The Art of Seeing Clearly', 
        category: 'Meditation', 
        readTime: '6 min', 
        stars: 4.7, 
        views: '8k',
        desc: 'Ancient Buddhist meditation technique for insight and liberation from mental suffering.',
        image: 'https://images.unsplash.com/photo-1528319725582-ddc0a61afd51?auto=format&fit=crop&q=80&w=800'
    },
    { 
        id: 'p1',
        title: 'Advaita Vedanta: The Philosophy of Oneness', 
        category: 'Philosophy', 
        readTime: '10 min', 
        stars: 4.6, 
        views: '15k',
        desc: 'Adi Shankaracharya\'s non-dual philosophy that sees the self and Brahman as one.',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800'
    },
    { 
        id: 'h1',
        title: 'The Silk Road: Cultural Highways', 
        category: 'History', 
        readTime: '15 min', 
        stars: 4.5, 
        views: '32k',
        desc: 'How Indian cultural and spiritual wealth spread across the ancient global trade routes.',
        image: 'https://images.unsplash.com/photo-1532375811400-d754977463c0?auto=format&fit=crop&q=80&w=800'
    },
    { 
        id: 'a1',
        title: 'Ayurveda: The Science of Life', 
        category: 'Ayurveda', 
        readTime: '9 min', 
        stars: 4.8, 
        views: '19k',
        desc: 'Traditional Indian medicine system that balances the five elements within our bodies.',
        image: 'https://images.unsplash.com/photo-1512413316925-fd4b93f31521?auto=format&fit=crop&q=80&w=800'
    },
];

const Library = () => {
    const [dbArticles, setDbArticles] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    
    const containerRef = useRef(null);
    const gridRef = useRef(null);

    useGSAP(() => {
        gsap.from(".library-hero-text", {
            y: 40,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power4.out"
        });
        
        gsap.from(".filter-pill", {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "back.out(1.7)",
            delay: 0.5
        });
    }, { scope: containerRef });

    useEffect(() => {
        setIsLoading(true);
        libraryAPI.getAll()
            .then(data => {
                if (data && data.length > 0) setDbArticles(data);
            })
            .catch(err => console.error("Failed to fetch library items:", err))
            .finally(() => setIsLoading(false));
    }, []);

    const allArticles = [...dbArticles, ...fallbackArticles.filter(art => 
        !dbArticles.some(db => db.title === art.title)
    )];

    const filtered = allArticles.filter(a =>
        (activeCategory === 'All' || a.category === activeCategory) &&
        (a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
         a.desc.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div ref={containerRef} className="min-h-screen relative overflow-hidden bg-obsidian-pure">
            <SEO title="Ancient Library — Inner Root" description="The digital repository of Indian wisdom, scriptures, and cultural history." />

            {/* Cinematic Background */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="orb orb-1 opacity-80 scale-125" />
                <div className="orb orb-2 !bg-indigo-600/30 opacity-60 translate-x-1/4" />
                <div className="orb orb-3 !bg-amber-400/20 opacity-50 -translate-y-1/4" />
                <div className="sacred-geometry opacity-10" />
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6">
                <div className="container-8k">
                    <div className="max-w-4xl">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <span className="w-12 h-[1px] bg-accent" />
                            <span className="text-accent uppercase font-black text-[11px] tracking-[0.5em] brightness-125">The Eternal Repository</span>
                        </motion.div>
                        
                        <h1 className="display-1 library-hero-text mb-8 text-white">
                            ANCIENT <br/> <span className="text-gradient brightness-125">CHRONICLES</span>
                        </h1>
                        
                        <p className="lead library-hero-text mb-12 max-w-2xl text-white/80 font-medium">
                            Unlock thousands of years of human consciousness. From the early Vedic era to the philosophical depths of the Upanishads, curated for the modern seeker.
                        </p>

                        <div className="flex flex-col md:flex-row gap-6 library-hero-text">
                            <div className="relative flex-1 group">
                                <Search size={22} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-accent transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search the akashic records..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white/[0.05] border border-white/10 rounded-2xl pl-16 pr-8 py-6 text-lg focus:outline-none focus:border-accent/40 transition-all font-heading backdrop-blur-2xl text-white placeholder:text-white/20"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="sticky top-20 z-40 py-4 px-6 border-y border-white/5 bg-obsidian-pure/80 backdrop-blur-2xl">
                <div className="container-8k flex gap-3 overflow-x-auto no-scrollbar py-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`filter-pill px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                                activeCategory === cat 
                                ? 'bg-accent text-obsidian-pure shadow-glow-accent' 
                                : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border border-white/5'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Main Content */}
            <section className="section-8k" ref={gridRef}>
                <div className="container-8k">
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center py-40"
                            >
                                <div className="spinner-lg mb-8" />
                                <p className="text-accent uppercase font-black text-[10px] tracking-widest">Consulting the Sages...</p>
                            </motion.div>
                        ) : filtered.length > 0 ? (
                            <motion.div 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                            >
                                {filtered.map((article, i) => (
                                    <motion.div
                                        key={article.id || article.title}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="card-8k group cursor-pointer h-full flex flex-col"
                                    >
                                        <div className="relative h-64 overflow-hidden border-b border-white/5">
                                            <img 
                                                src={article.image || 'https://images.unsplash.com/photo-1505667774739-fa6f47296bba?auto=format&fit=crop&q=80&w=800'} 
                                                alt={article.title}
                                                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                                            <div className="absolute top-6 left-6 flex gap-2">
                                                <span className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-accent text-[8px] font-black uppercase tracking-widest border border-accent/20">
                                                    {article.category}
                                                </span>
                                            </div>
                                            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all">
                                                <button className="p-3 rounded-full bg-accent/20 text-accent hover:bg-accent hover:text-white transition-colors">
                                                    <Bookmark size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="p-10 flex-grow flex flex-col">
                                            <div className="flex items-center gap-6 mb-6 text-white/60 text-[11px] font-black uppercase tracking-widest">
                                                <span className="flex items-center gap-2"><Clock size={13} className="text-accent brightness-125" /> {article.readTime}</span>
                                                <span className="flex items-center gap-2"><Eye size={13} className="text-accent brightness-125" /> {article.views || '1k'} views</span>
                                            </div>

                                            <h3 className="text-2xl font-display font-black mb-6 tracking-tight uppercase group-hover:text-accent transition-colors leading-[1.1] text-white">
                                                {article.title}
                                            </h3>

                                            <p className="text-white/80 text-sm leading-relaxed mb-10 line-clamp-3 font-semibold">
                                                {article.desc}
                                            </p>

                                            <div className="mt-auto pt-8 border-t border-white/20 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex text-accent">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} size={14} fill={i < Math.floor(article.stars) ? 'currentColor' : 'none'} className="opacity-100 drop-shadow-glow" />
                                                        ))}
                                                    </div>
                                                    <span className="text-[11px] font-black text-white/80">{article.stars}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-accent text-[11px] font-black uppercase tracking-widest group-hover:gap-6 transition-all brightness-110">
                                                    ENTER <ArrowRight size={16} />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }}
                                className="text-center py-32 border border-dashed border-white/10 rounded-[3rem]"
                            >
                                <BookOpen size={64} className="mx-auto mb-8 text-white/10" />
                                <h3 className="text-2xl font-display uppercase mb-4">Chronicle Not Found</h3>
                                <p className="text-white/40 mb-10">The specific wisdom you seek might be lost in time, or requires a different search term.</p>
                                <button 
                                    onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
                                    className="px-10 py-5 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all"
                                >
                                    Reset Discovery
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* CTA Section */}
            <section className="pb-32 px-6">
                <div className="container-8k">
                    <div className="cta-block p-20 rounded-[4rem] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518399946624-9a008398197c?auto=format&fit=crop&q=80&w=2000')] opacity-5 grayscale scale-150 group-hover:scale-100 transition-all duration-[3s]" />
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="display-3 mb-8">WISDOM BEYOND WORDS</h2>
                            <p className="lead mb-12 opacity-80">Join our Heritage Pro membership to unlock full scripts, original translations, and deep-dive video lectures by vedic scholars.</p>
                            <button className="btn btn-primary btn-lg rounded-2xl px-12 group">
                                <Sparkles size={18} /> UNLOCK FULL ARCHIVE
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Library;
