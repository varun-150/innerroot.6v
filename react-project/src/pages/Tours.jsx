import React, { useState, useEffect } from 'react';
import { getHeritageSites } from '../services/api';
import { toursData as localToursData } from '../data/toursData';
import { Reveal, Stagger } from '../components/Reveal';
import HeritageMap from '../components/HeritageMap';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import {
    MapPin, Star, Play, X, Loader2,
    Map as MapIcon, Compass, Sparkles,
    ArrowRight, Info, Eye, Clock
} from 'lucide-react';

const Tours = () => {
    const [activeTour, setActiveTour] = useState(null);
    const [toursData, setToursData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await getHeritageSites();
                const data = Array.isArray(response.data) && response.data.length > 0
                    ? response.data
                    : localToursData.map(t => ({
                        ...t,
                        name: t.title,
                        imageUrl: t.image
                    }));
                setToursData(data);
            } catch (error) {
                console.error("Failed to fetch tours:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTours();
    }, []);

    const handleTourClick = (tour) => {
        setActiveTour(tour);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6">
                <Loader2 className="w-12 h-12 text-heritage-gold animate-spin" />
                <p className="font-display text-xl text-[var(--muted)] animate-pulse">Charting your pilgrimage...</p>
            </div>
        );
    }

    return (
        <section id="page-tours" className="page active block opacity-100" aria-label="Virtual Heritage Pilgrimage">
            <div className="py-12 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Breadcrumbs />

                    {/* Header */}
                    <Reveal className="text-center mb-16 mt-8">
                        <span className="inline-block px-4 py-1 rounded-full bg-heritage-teal/10 text-heritage-teal font-bold text-xs uppercase tracking-widest mb-6 border border-heritage-teal/20">Digital Pilgrimage</span>
                        <h1 className="font-display text-4xl sm:text-6xl font-bold text-[var(--fg)] mb-6 tracking-tight">Gateways to Immortality</h1>
                        <p className="text-[var(--muted)] max-w-2xl mx-auto text-xl leading-relaxed">
                            Embark on an immersive journey across India's most iconic heritage sites. Experience the grandeur of ancient architecture in breathtaking 360°.
                        </p>
                    </Reveal>

                    {/* Map Overview */}
                    <Reveal className="mb-20">
                        <Card className="p-4 !rounded-[40px] shadow-2xl border-[var(--border)] overflow-hidden bg-heritage-teal/5 ring-8 ring-heritage-teal/5">
                            <div className="flex items-center gap-4 mb-4 px-4 pt-4">
                                <MapIcon className="w-6 h-6 text-heritage-teal" />
                                <h2 className="font-display text-2xl font-bold text-[var(--fg)] tracking-tight">Interactive Sacred Map</h2>
                            </div>
                            <div className="w-full relative rounded-[32px] overflow-hidden border border-[var(--border)] shadow-inner">
                                <HeritageMap tours={toursData} />
                            </div>
                        </Card>
                    </Reveal>

                    {/* Tour Collection Header */}
                    <div className="flex items-center justify-between mb-12 px-2">
                        <div className="flex items-center gap-3">
                            <Compass className="w-8 h-8 text-heritage-gold" />
                            <h2 className="font-display text-3xl font-bold text-[var(--fg)] tracking-tight">Guided Expeditions</h2>
                        </div>
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white shadow-sm border border-[var(--border)]">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest">{toursData.length} Live Gateways</span>
                        </div>
                    </div>

                    {/* Tour Cards */}
                    <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {toursData.map((tour) => (
                            <Card
                                key={tour.id}
                                className="p-0 group cursor-pointer relative overflow-hidden !rounded-[48px] h-[550px] border-[var(--border)] shadow-xl hover:shadow-2xl transition-all duration-700"
                                onClick={() => handleTourClick(tour)}
                                animate={false}
                            >
                                {/* Media Layer */}
                                <div className="absolute inset-0">
                                    <img src={tour.imageUrl} alt={tour.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                                </div>

                                {/* Status Badges */}
                                <div className="absolute top-8 left-8 z-20 flex gap-3">
                                    <div className="px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md text-heritage-brown text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xl border border-white/50 flex items-center gap-2">
                                        <Star className="w-3 h-3 text-heritage-gold fill-heritage-gold" />
                                        {tour.rating}
                                    </div>
                                </div>

                                {/* Big Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white scale-90 group-hover:scale-110 transition-all duration-700 shadow-2xl opacity-100 group-hover:opacity-0 group-hover:blur-xl">
                                        <Play className="w-10 h-10 ml-1 fill-white" />
                                    </div>
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute inset-0 flex flex-col justify-end p-10 z-20 text-white">
                                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 ease-out">
                                        <div className="flex items-center gap-2 mb-4 text-heritage-gold text-xs font-bold uppercase tracking-[0.2em]">
                                            <MapPin className="w-4 h-4" />
                                            {tour.location}
                                        </div>

                                        <h3 className="font-display text-4xl font-bold mb-4 tracking-tight group-hover:text-heritage-gold transition-colors leading-none">
                                            {tour.name}
                                        </h3>

                                        <p className="text-white/70 text-lg line-clamp-2 mb-8 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 italic leading-relaxed font-medium">
                                            "{tour.description}"
                                        </p>

                                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                                            <Button
                                                variant="primary"
                                                className="w-full !py-5 !rounded-[24px] !bg-heritage-gold !border-heritage-gold text-white font-bold tracking-widest text-xs uppercase"
                                                rightIcon={Eye}
                                            >
                                                Step Into The Portal
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Interactive Glow */}
                                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-heritage-gold/20 rounded-full blur-[100px] group-hover:opacity-100 opacity-0 transition-opacity duration-1000"></div>
                            </Card>
                        ))}
                    </Stagger>
                </div>
            </div>

            {/* Immersive Video Modal */}
            {activeTour && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8 animate-in fade-in duration-500">
                    <div className="absolute inset-0" onClick={() => setActiveTour(null)}></div>

                    <Card className="relative w-full max-w-6xl !bg-black !rounded-[48px] overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.2)] border-heritage-gold/20 animate-in zoom-in-95 duration-500">
                        {/* Modal Header */}
                        <div className="absolute top-0 inset-x-0 z-50 flex items-center justify-between p-8 bg-gradient-to-b from-black/80 to-transparent">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-heritage-gold/10 border border-heritage-gold/20 flex items-center justify-center">
                                    <Sparkles className="w-8 h-8 text-heritage-gold" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-display font-bold text-white tracking-tight">{activeTour.name}</h3>
                                    <div className="flex items-center gap-3 text-white/50 text-xs font-bold uppercase tracking-widest mt-1">
                                        <MapPin className="w-3.5 h-3.5 text-heritage-gold" />
                                        {activeTour.location}
                                        <span className="mx-2 text-white/20">|</span>
                                        <Clock className="w-3.5 h-3.5 text-heritage-gold" />
                                        Immersive Experience
                                    </div>
                                </div>
                            </div>
                            <Button
                                onClick={() => setActiveTour(null)}
                                variant="secondary"
                                className="!rounded-2xl !p-4 !bg-white/10 !border-white/20 !text-white hover:!bg-white/20 translate-y-[-10px]"
                                icon={X}
                            />
                        </div>

                        {/* Video Aspect Ratio Buffer */}
                        <div className="aspect-video w-full bg-black relative">
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${activeTour.videoUrl?.split('/').pop().replace('watch?v=', '')}?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0`}
                                title={activeTour.name}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* Modal Footer / Progress */}
                        <div className="p-8 bg-black/40 backdrop-blur-md flex items-center justify-between border-t border-white/5">
                            <p className="text-white/60 text-sm max-w-2xl italic">
                                You are now witnessing {activeTour.name} in high-fidelity 360°. Use your cursor to explore the sacred surroundings.
                            </p>
                            <div className="flex gap-4">
                                <Button variant="secondary" className="!rounded-xl !bg-white/5 !border-white/10 !text-white px-6">Save Portal</Button>
                                <Button variant="primary" className="!rounded-xl !bg-heritage-gold !border-heritage-gold text-white px-8">Share Wisdom</Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </section>
    );
};

export default Tours;

