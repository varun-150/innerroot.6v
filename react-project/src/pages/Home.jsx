import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Reveal, Stagger } from '../components/Reveal';
import { wisdomAPI, getCultureItems, getWisdomQuotes } from '../services/api';
import { wisdomData as localWisdom } from '../data';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import {
    Compass, Heart, BookOpen, Library as LibraryIcon,
    ArrowRight, Sparkles, Globe, Map, Play, Users,
    ShieldCheck, Star, ChevronRight, Zap, Flame, Clock,
    ChevronDown
} from 'lucide-react';
import divineSparkImg from '../assets/divine-spark.png';

// Fallback quotes if API or data file is missing
const fallbackQuotes = [
    { text: "Knowledge is the greatest wealth.", source: "Ancient Proverb" },
    { text: "Peace comes from within. Do not seek it without.", source: "Gautama Buddha" }
];

const Home = () => {
    const navigate = useNavigate();
    const [dailyQuote, setDailyQuote] = useState(fallbackQuotes[0]);
    const [featuredItems, setFeaturedItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch culture data in parallel
                const cultureDataPromise = getCultureItems();

                // Fetch wisdom quotes with fallback logic
                let currentQuote = null;
                try {
                    const response = await getWisdomQuotes();
                    if (response && Array.isArray(response.data) && response.data.length > 0) {
                        currentQuote = response.data[Math.floor(Math.random() * response.data.length)];
                    } else {
                        // Try the single random quote endpoint if array is empty
                        const randomRes = await wisdomAPI.getRandom();
                        if (randomRes && randomRes.quote) {
                            currentQuote = randomRes;
                        }
                    }
                } catch (apiError) {
                    console.warn('API error, using local wisdom:', apiError);
                }

                if (!currentQuote) {
                    currentQuote = localWisdom[Math.floor(Math.random() * localWisdom.length)];
                }

                if (currentQuote) {
                    setDailyQuote({
                        text: currentQuote.quote || currentQuote.text,
                        source: currentQuote.source
                    });
                }

                const cultureData = await cultureDataPromise;
                if (cultureData && Array.isArray(cultureData.data)) {
                    setFeaturedItems(cultureData.data.slice(0, 3));
                }
            } catch (err) {
                console.error('Failed to fetch home data:', err);
            }
        };
        fetchData();
    }, []);

    return (
        <section id="page-home" className="min-h-screen overflow-x-hidden">

            {/* Hero Section - Simple & Elegant */}
            <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Immersive Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover opacity-60"
                        alt="Sacred Architecture"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black" />
                </div>

                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10 text-center">
                    <Reveal>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-heritage-gold/20 backdrop-blur-md border border-heritage-gold/30 text-heritage-gold font-bold text-xs uppercase tracking-[0.2em] mb-8">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>The Cradle of Wisdom</span>
                        </div>

                        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold text-white leading-tight mb-8 tracking-tighter">
                            Journey to <span className="text-heritage-gold">Your Inner</span> Root
                        </h1>

                        <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                            Rediscover India's timeless spiritual heritage. From sacred architecture to ancient psychological wisdom, embark on a digital pilgrimage through thousands of years of human consciousness.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Button
                                size="lg"
                                onClick={() => navigate('explore')}
                                rightIcon={Compass}
                                className="!py-6 !px-12 !text-lg !rounded-full shadow-2xl shadow-heritage-gold/20"
                            >
                                Explore Heritage
                            </Button>
                            <Button
                                variant="secondary"
                                size="lg"
                                className="!py-6 !px-12 !text-lg !rounded-full !border-white/20 !text-white hover:!bg-white/10 backdrop-blur-sm"
                                onClick={() => navigate('wellness')}
                                leftIcon={Play}
                            >
                                Start Sadhana
                            </Button>
                        </div>
                    </Reveal>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                    <div className="w-px h-12 bg-gradient-to-t from-heritage-gold to-transparent" />
                    <ChevronDown className="w-4 h-4 text-heritage-gold animate-bounce" />
                </div>
            </div>

            {/* Daily Wisdom Banner */}
            <div className="relative py-24 overflow-hidden border-b border-[var(--border)] group bg-heritage-gold/5 backdrop-blur-sm">
                <div className="absolute inset-0 mandala-bg opacity-[0.05] group-hover:scale-110 transition-transform duration-[30s]" />
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <Reveal>
                        <Star className="w-10 h-10 text-heritage-gold mx-auto mb-10 animate-pulse-slow" fill="currentColor" />
                        <blockquote className="font-display text-3xl sm:text-5xl lg:text-6xl text-[var(--fg)] mb-10 leading-tight tracking-tight px-4">
                            "{dailyQuote.text}"
                        </blockquote>
                        <div className="flex items-center justify-center gap-4">
                            <div className="h-px w-12 bg-heritage-gold/30" />
                            <cite className="text-[var(--muted)] font-bold text-sm tracking-[0.3em] uppercase">{dailyQuote.source}</cite>
                            <div className="h-px w-12 bg-heritage-gold/30" />
                        </div>
                    </Reveal>
                </div>
            </div>

            {/* Core Pillars */}
            <section className="py-32 bg-[var(--bg)]" aria-labelledby="explore-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal className="text-center mb-24">
                        <span className="text-heritage-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">The Four Foundations</span>
                        <h2 id="explore-heading" className="font-display text-4xl sm:text-6xl font-bold text-[var(--fg)] mb-6 tracking-tight">Dimensions of Discovery</h2>
                        <p className="text-[var(--muted)] max-w-2xl mx-auto text-xl font-light">Choose your threshold into the eternal landscape of Bharat.</p>
                    </Reveal>

                    <Stagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { id: 'tours', title: 'Immersive Tours', desc: 'Step inside 360° virtual sanctuaries of history.', icon: Map, color: 'bg-heritage-teal', detail: '40+ Monuments' },
                            { id: 'explore', title: 'Traditions', desc: 'Decipher the symbolism behind rites and arts.', icon: BookOpen, color: 'bg-heritage-gold', detail: 'State Highlights' },
                            { id: 'wellness', title: 'Inner Sanctuary', desc: 'Ancient protocols for psychological balance.', icon: Heart, color: 'bg-rose-500', detail: 'Guided Sadhana' },
                            { id: 'library', title: 'Digital Archive', desc: 'Consult the original sources of human wisdom.', icon: LibraryIcon, color: 'bg-indigo-600', detail: 'Sacred Texts' }
                        ].map(({ icon: Icon, ...section }) => (
                            <Card
                                key={section.id}
                                className="group cursor-pointer p-0 !rounded-[48px] overflow-hidden border-[var(--border)] shadow-xl hover:-translate-y-4 transition-all duration-700"
                                onClick={() => navigate(section.id)}
                            >
                                <div className={`h-64 ${section.color} relative overflow-hidden transition-all duration-700 group-hover:brightness-110`}>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-20 transform scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-[1.5s]">
                                        <Icon className="w-48 h-48 text-white" strokeWidth={0.5} />
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-20 h-20 rounded-[24px] bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                                            <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
                                        </div>
                                    </div>
                                    <div className="absolute top-6 right-6">
                                        <span className="px-4 py-1.5 rounded-full bg-black/20 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-widest">{section.detail}</span>
                                    </div>
                                </div>
                                <div className="p-10 relative">
                                    <h3 className="font-display text-3xl font-bold text-[var(--fg)] mb-4 flex items-center justify-between group-hover:text-heritage-gold transition-colors">
                                        {section.title}
                                        <ChevronRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                                    </h3>
                                    <p className="text-lg text-[var(--muted)] leading-relaxed font-light">{section.desc}</p>
                                </div>
                            </Card>
                        ))}
                    </Stagger>
                </div>
            </section>

            {/* Featured Highlights */}
            {
                featuredItems.length > 0 && (
                    <section className="py-32 bg-black text-white relative overflow-hidden" aria-labelledby="highlights-heading">
                        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-heritage-gold/5 rounded-full blur-[200px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <Reveal className="mb-20">
                                <h2 id="highlights-heading" className="font-display text-4xl sm:text-7xl font-bold mb-8 tracking-tighter">Current Highlights</h2>
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                    <p className="text-white/60 text-2xl font-light max-w-2xl leading-relaxed">Curated experiences from the deepest corners of Bharat’s timeline.</p>
                                    <Button
                                        variant="secondary"
                                        className="!text-white !border-white/20 hover:!bg-white/10 !py-6 !px-8"
                                        onClick={() => navigate('explore')}
                                        rightIcon={ArrowRight}
                                    >
                                        View Collection
                                    </Button>
                                </div>
                            </Reveal>

                            <div className="grid lg:grid-cols-3 gap-10">
                                {featuredItems.map((item, idx) => (
                                    <Card key={item.id} className="p-0 border-none !rounded-[40px] overflow-hidden group bg-white/5 ring-1 ring-white/10" animate={true}>
                                        <div className="aspect-[16/10] overflow-hidden relative">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                                            <div className="absolute top-6 left-6 z-10">
                                                <span className="px-4 py-2 rounded-2xl bg-heritage-gold text-white text-[10px] font-bold uppercase tracking-widest shadow-2xl">
                                                    {item.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-10 relative">
                                            <h3 className="font-display text-3xl font-bold mb-4 tracking-tight group-hover:text-heritage-gold transition-colors">{item.title}</h3>
                                            <p className="text-sm text-heritage-gold font-bold uppercase tracking-[0.2em] mb-6 opacity-70">{item.subtitle}</p>
                                            <p className="text-lg text-white/50 line-clamp-2 leading-relaxed font-light mb-8">{item.description}</p>
                                            <Link to={`/explore/${item.id}`} className="inline-flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest group/link">
                                                Explore Details
                                                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
                                            </Link>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>
                )
            }

            {/* Impact Stats */}
            <section className="py-32 relative group bg-white/50 backdrop-blur-sm" aria-label="Statistics">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal className="grid grid-cols-2 lg:grid-cols-4 gap-16">
                        {[
                            { val: '500+', label: 'Monuments in India', icon: Map },
                            { val: '42', label: 'UNESCO Sites', icon: Star },
                            { val: '5k+', label: 'Years of History', icon: Clock },
                            { val: '28', label: 'States Mapped', icon: Globe }
                        ].map(({ icon: Icon, ...stat }, i) => (
                            <div key={i} className="text-center group/stat">
                                <div className="mb-6 inline-flex p-4 rounded-3xl bg-heritage-gold/5 text-heritage-gold group-hover/stat:bg-heritage-gold group-hover/stat:text-white transition-all duration-500 ring-1 ring-heritage-gold/20">
                                    <Icon className="w-8 h-8" />
                                </div>
                                <div className="font-display text-5xl sm:text-7xl font-bold text-[var(--fg)] mb-4 tracking-tighter">{stat.val}</div>
                                <div className="text-xs font-bold uppercase tracking-[0.4em] text-[var(--muted)] opacity-60">{stat.label}</div>
                            </div>
                        ))}
                    </Reveal>
                </div>
            </section>

            {/* Community CTA Portal - Simplified */}
            <section className="py-24 px-4 sm:px-6 lg:px-8" aria-label="Join Community">
                <div className="max-w-5xl mx-auto">
                    <Reveal>
                        <div className="relative rounded-[40px] overflow-hidden bg-heritage-teal p-12 sm:p-20 text-center shadow-2xl">
                            {/* Simple Background Pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <img src="https://images.unsplash.com/photo-1518005020250-eccad5f300f4?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" />
                            </div>

                            <div className="relative z-10">
                                <Users className="w-16 h-16 text-white/30 mx-auto mb-8" strokeWidth={1} />
                                <h2 className="font-display text-4xl sm:text-6xl font-bold text-white mb-6 tracking-tight">
                                    Be Part of The Modern <span className="text-heritage-gold">Sangha</span>
                                </h2>
                                <p className="text-white/80 max-w-xl mx-auto mb-10 text-xl font-light">
                                    Join a community of seekers and practitioners. Preservation is a collective act of mindfulness.
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <Button
                                        size="lg"
                                        className="!bg-white !text-heritage-teal hover:!bg-white/90 !px-12 !py-6 !rounded-full !text-lg font-bold"
                                        onClick={() => navigate('signup')}
                                    >
                                        Join Now
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="lg"
                                        className="!text-white !border-white/30 hover:!bg-white/10 !px-12 !py-6 !rounded-full !text-lg"
                                        onClick={() => navigate('about')}
                                    >
                                        Learn More
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </section>
    );
};

export default Home;

