import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Compass, MapPin, Clock, Star, ArrowRight, Camera } from 'lucide-react';
import SEO from '../components/ui/SEO';

const tours = [
    { title: 'Golden Triangle Heritage', location: 'Delhi, Agra, Jaipur', duration: '7 days', rating: 4.9, desc: 'Experience the iconic Mughal and Rajput architectural marvels on this classic cultural journey.', color: '#d97706' },
    { title: 'Kerala Backwaters Wellness', location: 'Alleppey, Munnar, Kochi', duration: '5 days', rating: 4.8, desc: 'Houseboat cruises, Ayurvedic therapies, and spice plantation walks in God\'s Own Country.', color: '#14532d' },
    { title: 'Varanasi Spiritual Immersion', location: 'Varanasi, Sarnath', duration: '4 days', rating: 4.9, desc: 'Witness the Ganga Aarti, explore ancient ghats, and walk in the footsteps of the Buddha.', color: '#7c3aed' },
    { title: 'Hampi Ruins Expedition', location: 'Hampi, Badami, Aihole', duration: '4 days', rating: 4.7, desc: 'Step into the ruins of the Vijayanagara Empire — boulder-strewn landscapes and ancient temples.', color: '#c9a227' },
    { title: 'Ladakh Mountain Monasteries', location: 'Leh, Nubra, Pangong', duration: '6 days', rating: 4.9, desc: 'Buddhist monasteries set against the dramatic Himalayan landscape at the roof of the world.', color: '#0891b2' },
    { title: 'Odisha Temple Trail', location: 'Bhubaneswar, Puri, Konark', duration: '5 days', rating: 4.6, desc: 'From the Sun Temple of Konark to the Jagannath Temple of Puri — a pilgrimage through time.', color: '#e67e22' },
];

const Tours = () => {
    const heroRef = useRef(null);
    const gridRef = useRef(null);
    const heroInView = useInView(heroRef, { once: true });
    const gridInView = useInView(gridRef, { once: true, margin: '-80px' });

    return (
        <>
            <SEO title="Virtual Tours — Inner Root" description="Take immersive virtual tours of India's most sacred and culturally rich destinations." />

            <section ref={heroRef} className="relative overflow-hidden section-padding" style={{ paddingBottom: 'var(--sp-12)' }}>
                <div className="sacred-geometry" style={{ opacity: 0.02 }} />
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-semibold tracking-widest uppercase" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                            <Compass size={14} /> Virtual Tours
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5" style={{ fontFamily: 'var(--font-display)' }}>
                            Immersive <span className="text-gradient">Journeys</span>
                        </h1>
                        <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                            Walk through India's most sacred destinations from anywhere in the world.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section ref={gridRef} className="section-padding" style={{ paddingTop: 0 }}>
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tours.map((tour, i) => (
                            <motion.div
                                key={tour.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: i * 0.08, duration: 0.5 }}
                                className="card group cursor-pointer overflow-hidden"
                            >
                                {/* Color header */}
                                <div className="h-36 relative" style={{ background: `linear-gradient(135deg, ${tour.color}20, ${tour.color}08)` }}>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Camera size={40} style={{ color: tour.color, opacity: 0.3 }} />
                                    </div>
                                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold" style={{ background: 'var(--bg-glass-strong)', backdropFilter: 'blur(8px)', color: tour.color }}>
                                        <Star size={10} fill="currentColor" /> {tour.rating}
                                    </div>
                                </div>

                                <div className="p-5">
                                    <div className="flex items-center gap-2 mb-2 text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                                        <span className="flex items-center gap-1"><MapPin size={10} /> {tour.location}</span>
                                        <span className="flex items-center gap-1"><Clock size={10} /> {tour.duration}</span>
                                    </div>
                                    <h3 className="text-base font-semibold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                                        {tour.title}
                                    </h3>
                                    <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{tour.desc}</p>
                                    <div className="flex items-center gap-1 text-xs font-medium transition-all duration-300 group-hover:gap-2" style={{ color: tour.color }}>
                                        <span>Start Tour</span>
                                        <ArrowRight size={12} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Tours;
