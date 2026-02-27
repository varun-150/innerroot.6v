import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLibraryItems } from '../services/api';
import { libraryData as localLibraryData } from '../data/libraryData';
import { Reveal, Stagger } from '../components/Reveal';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import {
    Search, BookOpen, Clock, User,
    FileText, Loader2, ArrowRight, ExternalLink,
    Book, Bookmark, Sparkles, Info
} from 'lucide-react';

const Library = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [libraryData, setLibraryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const fetchLibrary = async () => {
            try {
                const response = await getLibraryItems();
                const data = Array.isArray(response.data) && response.data.length > 0
                    ? response.data
                    : localLibraryData;
                setLibraryData(data);
            } catch (error) {
                console.error("Failed to fetch library items:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLibrary();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        setIsSearching(true);
        const timer = setTimeout(() => setIsSearching(false), 500);
        return () => clearTimeout(timer);
    };

    const filteredData = (Array.isArray(libraryData) ? libraryData : []).filter(item =>
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6">
                <Loader2 className="w-12 h-12 text-heritage-gold animate-spin" />
                <p className="font-display text-xl text-[var(--muted)] animate-pulse">Consulting the archives...</p>
            </div>
        );
    }

    return (
        <section id="page-library" className="page active block opacity-100" aria-label="Digital Repository">
            <div className="py-12 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Breadcrumbs />

                    {/* Header */}
                    <Reveal className="text-center mb-16 mt-8 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-heritage-gold/5 blur-[100px] pointer-events-none"></div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-heritage-gold/10 backdrop-blur-md border border-heritage-gold/20 text-heritage-gold font-bold text-xs uppercase tracking-[0.2em] mb-8">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>The Digital Akasha</span>
                        </div>
                        <h1 className="font-display text-5xl sm:text-7xl font-bold text-[var(--fg)] mb-8 tracking-tighter leading-none">
                            Ancient Wisdom,<br />
                            <span className="text-heritage-gold">Digitized</span>
                        </h1>
                        <p className="text-[var(--muted)] max-w-2xl mx-auto text-xl leading-relaxed italic font-medium">
                            "Knowledge is the only wealth that grows as it is shared, and the only treasure that can't be stolen."
                            <span className="block text-sm mt-3 font-bold uppercase tracking-widest text-heritage-gold/60">— Bhartṛhari, Nitiśataka</span>
                        </p>
                    </Reveal>

                    {/* Search Bar */}
                    <Reveal className="max-w-2xl mx-auto mb-16">
                        <Card className="p-6 !rounded-[32px] shadow-2xl border-[var(--border)] overflow-visible ring-4 ring-heritage-gold/5">
                            <Input
                                placeholder="Search scriptures, texts, articles..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                icon={Search}
                                className="!py-4 !text-lg !border-none !bg-transparent"
                                autoFocus
                            />
                        </Card>
                    </Reveal>

                    {/* Categories Quick Filter */}
                    <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 px-4">
                        {[
                            { id: 'vedas', title: 'Vedas', desc: '4 Core Texts', icon: Book, color: 'text-amber-600', bg: 'bg-amber-600/10' },
                            { id: 'upanishads', title: 'Upanishads', desc: '108 Upanishads', icon: BookOpen, color: 'text-teal-600', bg: 'bg-teal-600/10' },
                            { id: 'gita', title: 'The Gita', desc: 'Divine Song', icon: Bookmark, color: 'text-emerald-600', bg: 'bg-emerald-600/10' },
                            { id: 'philosophy', title: 'Darshanas', desc: '6 Schools', icon: FileText, color: 'text-rose-600', bg: 'bg-rose-600/10' }
                        ].map(({ icon: Icon, ...cat }) => (
                            <button
                                key={cat.id}
                                className={`group flex flex-col items-center p-8 rounded-[40px] border-2 transition-all duration-500 ${searchQuery.toLowerCase() === cat.title.toLowerCase()
                                    ? 'bg-heritage-gold border-heritage-gold text-white shadow-2xl -translate-y-2'
                                    : 'bg-[var(--bg)] border-[var(--border)] hover:border-heritage-gold/30 hover:-translate-y-1'
                                    }`}
                                onClick={() => handleSearch(cat.title)}
                            >
                                <div className={`w-20 h-20 rounded-3xl ${searchQuery.toLowerCase() === cat.title.toLowerCase() ? 'bg-white/20' : cat.bg} flex items-center justify-center mb-6 transition-all group-hover:scale-110 shadow-inner`}>
                                    <Icon className={`w-10 h-10 ${searchQuery.toLowerCase() === cat.title.toLowerCase() ? 'text-white' : cat.color}`} />
                                </div>
                                <h3 className="font-display text-xl font-bold mb-1 tracking-tight">{cat.title}</h3>
                                <p className={`text-xs font-bold uppercase tracking-widest ${searchQuery.toLowerCase() === cat.title.toLowerCase() ? 'text-white/70' : 'text-[var(--muted)]'}`}>
                                    {cat.desc}
                                </p>
                            </button>
                        ))}
                    </Stagger>

                    {/* Library Collection */}
                    <Reveal>
                        <div className="flex items-center justify-between mb-8 px-4">
                            <h2 className="font-display text-3xl font-bold text-[var(--fg)] flex items-center gap-3">
                                <Sparkles className="text-heritage-gold h-8 w-8" />
                                Sacred Collection
                            </h2>
                            <div className="text-sm font-bold text-[var(--muted)] uppercase tracking-widest">
                                {filteredData.length} Texts Revealed
                            </div>
                        </div>

                        <div className="space-y-8">
                            {filteredData.length > 0 ? filteredData.map((item) => (
                                <Card
                                    key={item.id}
                                    className="p-0 overflow-hidden !rounded-[40px] group border-[var(--border)] hover:border-heritage-gold/20 shadow-xl hover:shadow-2xl transition-all duration-500"
                                    animate={false}
                                >
                                    <div className="flex flex-col md:flex-row gap-0">
                                        {/* Book Spine/Cover Overlay */}
                                        <div className="md:w-64 aspect-[3/4] md:aspect-auto relative overflow-hidden bg-heritage-teal/5 flex-shrink-0">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent opacity-60"></div>
                                            <div className="absolute top-6 left-6 z-10">
                                                <span className="px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md text-heritage-brown text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xl border border-white/50">
                                                    {item.category}
                                                </span>
                                            </div>
                                            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                                                <div className="flex items-center gap-3 text-white text-[10px] font-bold uppercase tracking-widest">
                                                    <Clock className="w-3.5 h-3.5 text-heritage-gold" />
                                                    {item.readTime || '5 min'} Read
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Area */}
                                        <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-6">
                                                    <h3 className="font-display text-3xl md:text-4xl font-bold text-[var(--fg)] group-hover:text-heritage-gold transition-colors tracking-tight leading-none">
                                                        {item.title}
                                                    </h3>
                                                    <div className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted)] group-hover:bg-heritage-gold group-hover:text-white group-hover:border-heritage-gold transition-all">
                                                        <ExternalLink className="w-5 h-5" />
                                                    </div>
                                                </div>

                                                <p className="text-lg text-[var(--muted)] mb-6 leading-relaxed max-w-3xl line-clamp-3">
                                                    {item.description}
                                                </p>

                                                {/* Excerpt Preview */}
                                                <div className="mb-8 p-6 bg-heritage-gold/5 rounded-2xl border-l-4 border-heritage-gold/40 italic text-[var(--fg)]/80 text-sm leading-relaxed">
                                                    <Sparkles className="w-4 h-4 text-heritage-gold mb-2" />
                                                    "This is a sacred fragment of the eternal wisdom preserved within these verses. Explore the profound depth of human consciousness through these ancient lines..."
                                                </div>

                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-[var(--border)]">
                                                    <div className="space-y-1">
                                                        <div className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest">Scribe / Author</div>
                                                        <div className="font-bold text-[var(--fg)] flex items-center gap-2">
                                                            <User className="w-4 h-4 text-heritage-teal" />
                                                            {item.author}
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest">Chapters / Sections</div>
                                                        <div className="font-bold text-[var(--fg)] flex items-center gap-2">
                                                            <FileText className="w-4 h-4 text-heritage-teal" />
                                                            {item.chapters}
                                                        </div>
                                                    </div>
                                                    <div className="hidden md:block space-y-1">
                                                        <div className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest">Language</div>
                                                        <div className="font-bold text-[var(--fg)]">Sanskrit / English</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-10 flex items-center gap-4">
                                                <Button
                                                    variant="primary"
                                                    rightIcon={ArrowRight}
                                                    className="px-8 py-4 rounded-2xl flex-shrink-0"
                                                    onClick={() => {
                                                        if (item.link && item.link !== '#') {
                                                            window.open(item.link, '_blank');
                                                        } else {
                                                            alert(`The full digital edition of "${item.title}" is being meticulously preserved and will be available shortly.`);
                                                        }
                                                    }}
                                                >
                                                    Open Digital Scripture
                                                </Button>
                                                <Button variant="secondary" className="px-5 py-4 rounded-2xl">
                                                    <Bookmark className="w-5 h-5" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            )) : (
                                <div className="text-center py-20 bg-[var(--bg)] border-2 border-dashed border-[var(--border)] rounded-[40px]">
                                    <div className="w-20 h-20 bg-white shadow-xl rounded-3xl flex items-center justify-center mx-auto mb-6">
                                        <Info className="w-10 h-10 text-heritage-gold" />
                                    </div>
                                    <h3 className="font-display text-2xl font-bold text-[var(--fg)] mb-2">The files are elusive</h3>
                                    <p className="text-[var(--muted)] mb-8">Try searching for a different sacred text or category.</p>
                                    <Button variant="secondary" onClick={() => handleSearch('')}>Restore Collection</Button>
                                </div>
                            )}
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default Library;
