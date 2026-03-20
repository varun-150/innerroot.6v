import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Compass, BrainCircuit, Users, Sparkles,
    ArrowRight, MapPin, Heart, BookOpen, Sun,
    Star, Shield, Lock, Zap, Check, Plus, Minus,
    Globe, MessageCircle, Activity
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SEO from '../components/ui/SEO';
import { wisdomAPI } from '../services/api';

const EASE = [0.16, 1, 0.3, 1];

const features = [
    { 
        id: 1, 
        title: 'Heritage Map', 
        desc: "India's first interactive repository of 5,000 years of chronicles, mapped in high-fidelity 3D landscapes.", 
        icon: <Globe size={48} />, 
        color: 'var(--gold-500)',
        grid: 'md:col-span-2 md:row-span-2'
    },
    { 
        id: 2, 
        title: 'Aura Chat', 
        desc: 'Direct communion with Vedic wisdom via our sentient AI heritage guide.', 
        icon: <MessageCircle size={32} />, 
        color: 'var(--gold-400)',
        grid: 'md:col-span-1 md:row-span-1'
    },
    { 
        id: 3, 
        title: 'Soul Mirror', 
        desc: 'Advanced mood analytics rooted in Ayurvedic emotional archetypes.', 
        icon: <Activity size={32} />, 
        color: 'var(--gold-600)',
        grid: 'md:col-span-1 md:row-span-1'
    },
    { 
        id: 4, 
        title: 'Virtual Yatra', 
        desc: 'Immersive spiritual journeys through India\'s most sacred temples from mortality to divinity.', 
        icon: <Zap size={32} />, 
        color: 'var(--gold-500)',
        grid: 'md:col-span-1 md:row-span-2'
    },
    { 
        id: 5, 
        title: 'Japa Studio', 
        desc: 'Precision mantra counting with sonic resonance feedback systems.', 
        icon: <Shield size={32} />, 
        color: 'var(--gold-400)',
        grid: 'md:col-span-2 md:row-span-1'
    }
];

const stats = [
    { number: '500+', label: 'Sacred Sites' },
    { number: '10K+', label: 'Global Seekers' },
    { number: '200+', label: 'Ancient Practices' }
];

const Home = () => {
    const heroRef = useRef(null);
    const manifestoRef = useRef(null);
    const statsRef = useRef(null);
    const [dailyQuote, setDailyQuote] = useState({
        quote: "The light which shines above this heaven, higher than all, is the same light which is within man.",
        source: "Chandogya Upanishad"
    });

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from(".hero-title-part", {
            y: 100,
            opacity: 0,
            stagger: 0.2,
            duration: 1.8,
            ease: "expo.out"
        }).from(".hero-sub", {
            y: 30,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out"
        }, "-=1.2")
        .from(".hero-cta", {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8");

        gsap.from(".manifesto-text", {
            scrollTrigger: {
                trigger: manifestoRef.current,
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out"
        });

        gsap.from(".stat-item", {
            scrollTrigger: {
                trigger: statsRef.current,
                start: "top 85%",
            },
            scale: 0.8,
            opacity: 0,
            stagger: 0.2,
            duration: 1.2,
            ease: "elastic.out(1, 0.75)"
        });
    }, { scope: heroRef });

    return (
        <div className="bg-obsidian-pure min-h-screen text-brand-silver selection:bg-accent selection:text-obsidian-pure">
            <SEO title="Inner Root | The Aura of Heritage" />
            
            {/* ── Cinematic Hero ── */}
            <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Zooming Layer */}
                <div className="absolute inset-0 z-0">
                    <motion.div 
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.2 }}
                        transition={{ duration: 15, ease: "linear" }}
                        className="w-full h-full"
                        style={{ 
                            backgroundImage: "url('https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=2072&auto=format&fit=crop')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian-pure/80 to-obsidian-pure" />
                    
                    {/* Animated Light Orbs */}
                    <div className="orb orb-1 !w-[800px] !h-[800px] opacity-20" />
                    <div className="orb orb-2 !w-[600px] !h-[600px] opacity-10" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: EASE }}
                        className="mb-12"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-[10px] font-black uppercase tracking-[0.6em] text-accent">
                            Ancient Wisdom · Sentient AI
                        </span>
                    </motion.div>
                    
                    <h1 className="font-display font-black text-[clamp(4.5rem,14vw,14rem)] leading-[0.8] mb-14 tracking-tighter uppercase preserve-3d">
                        <span className="hero-title-part block text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">INNER</span>
                        <span className="hero-title-part block text-gradient">ROOT</span>
                    </h1>

                    <p className="hero-sub text-lg md:text-2xl text-white/40 font-heading max-w-3xl mx-auto mb-20 leading-tight tracking-tight px-6">
                        Synchronizing <span className="text-white/80">5,000 years of Vedic chronicles</span> with the vanguard of emotional intelligence and generative neural networks.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link to="/explore" className="hero-cta group relative px-12 py-5 bg-accent text-obsidian-pure rounded-2xl font-bold uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-amber-glow">
                            <span className="relative z-10 flex items-center gap-2">Explore Chronicles <ArrowRight size={18} /></span>
                            <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </Link>
                        <Link to="/wellness" className="hero-cta group px-12 py-5 border border-white/10 rounded-2xl font-bold uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-2">
                            <span>Sattva Journey</span>
                            <Sparkles size={18} className="text-accent group-hover:animate-pulse" />
                        </Link>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
                    <span className="text-[10px] uppercase font-black tracking-[0.4em] text-white/20">Descent</span>
                    <motion.div 
                        animate={{ y: [0, 10, 0], opacity: [0.2, 0.5, 0.2] }}
                        transition={{ repeat: Infinity, duration: 2.5 }}
                        className="w-[1px] h-20 bg-gradient-to-b from-accent to-transparent"
                    />
                </div>
            </section>

            {/* ── The Manifesto ── */}
            <section ref={manifestoRef} className="py-64 px-6 bg-obsidian-pure relative overflow-hidden">
                <div className="sacred-geometry opacity-5" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-48 bg-gradient-to-b from-accent/50 to-transparent" />
                
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col items-center text-center">
                        <span className="text-accent font-black uppercase text-[10px] tracking-[0.5em] mb-16 block">The Manifesto</span>
                        <h2 className="manifesto-text text-4xl md:text-8xl font-display font-black leading-[1.05] mb-20 max-w-5xl tracking-tighter uppercase italic">
                            "Heritage is not a <span className="opacity-20">museum</span>. It is a living <span className="text-accent">architecture</span> of the soul."
                        </h2>
                        
                        <div className="flex items-center gap-8 manifesto-text">
                            <div className="w-16 h-[1px] bg-white/10" />
                            <p className="text-base text-white/30 font-display tracking-[0.3em] uppercase">The Inner Root Collective</p>
                            <div className="w-16 h-[1px] bg-white/10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Feature Grid ── */}
            <section className="py-32 px-6 bg-obsidian-pure/50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:grid-rows-3 auto-rows-fr">
                        {features.map((f, i) => (
                            <motion.div 
                                key={f.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: i * 0.1, duration: 1.2, ease: EASE }}
                                className={`group relative p-12 rounded-[2.5rem] card-8k shimmer-border hover-3d bg-surface overflow-hidden ${f.grid}`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000" />
                                
                                <div className="relative z-10 h-full flex flex-col items-start">
                                    <div className="mb-12 p-5 rounded-2xl bg-white/5 w-fit group-hover:bg-accent/20 transition-all duration-500 shadow-xl" style={{ color: f.color }}>
                                        {f.icon}
                                    </div>
                                    <h4 className="text-3xl font-display font-black mb-6 tracking-tighter uppercase group-hover:text-accent transition-colors">
                                        {f.title}
                                    </h4>
                                    <p className="text-base text-white/40 font-medium leading-relaxed group-hover:text-white/60 transition-colors max-w-sm">
                                        {f.desc}
                                    </p>
                                    
                                    <div className="mt-auto pt-10 w-full">
                                        <div className="w-full h-[1px] bg-white/5 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-1000" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Statistical Aura ── */}
            <section ref={statsRef} className="py-48 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
                        {stats.map((s, i) => (
                            <div key={i} className="stat-item text-center">
                                <span className="block text-6xl md:text-9xl font-display font-black text-gradient mb-4 drop-shadow-2xl">{s.number}</span>
                                <span className="text-xs font-black uppercase tracking-[0.5em] text-white/20">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── The Sattva Path ── */}
            <section className="py-48 px-6 relative overflow-hidden">
                <div className="orb orb-1 !w-[1000px] !h-[1000px] opacity-10 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="text-center mb-40">
                        <span className="text-accent font-black uppercase text-[10px] tracking-[0.6em] mb-6 block">The Protocol</span>
                        <h3 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter">Modern <br/><span className="text-transparent italic stroke-text">Legacy</span></h3>
                    </div>

                    <div className="space-y-48">
                        {[
                            { step: "Discovery", title: "Trace your lineage.", desc: "Utilize the sentient Heritage Map to locate sacred resonance points that align with your karmic signature or ancestry." },
                            { step: "Calibration", title: "Sense the vibration.", desc: "Our neural emotion engine maps your current frequency to precise Vedic protocols and Ayurvedic remedies." },
                            { step: "Immersion", title: "Sattva Communion.", desc: "Enter decentralized Sattva Circles—sacred digital nodes where ancient chanting protocols meet global resonance." }
                        ].map((item, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1.2, ease: EASE }}
                                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-20 md:gap-32`}
                            >
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
                                        <span className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center text-accent text-xs font-black">0{i+1}</span>
                                        <span className="text-accent font-black uppercase text-xs tracking-widest">{item.step}</span>
                                    </div>
                                    <h4 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter mb-8">{item.title}</h4>
                                    <p className="text-white/40 text-xl font-medium leading-relaxed max-w-xl">{item.desc}</p>
                                </div>
                                <div className="relative">
                                    <div className="w-72 h-72 rounded-[3rem] border border-accent/20 flex items-center justify-center rotate-45 group hover:rotate-90 transition-transform duration-1000">
                                        <div className="absolute inset-0 rounded-[3rem] border border-accent/10 scale-110 animate-pulse" />
                                        <span className="font-display text-6xl font-black text-accent -rotate-45 group-hover:-rotate-90 transition-transform duration-1000">0{i+1}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Wisdom Interlude ── */}
            <section className="py-72 bg-obsidian-pure relative overflow-hidden">
                <div className="sacred-geometry opacity-10 scale-150" />
                <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
                    <div className="w-20 h-[1px] bg-accent mx-auto mb-20 opacity-40 shadow-[0_0_20px_var(--accent)]" />
                    <motion.h3 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                        className="text-3xl md:text-6xl font-display font-medium italic leading-[1.2] mb-16 tracking-tight text-white/90"
                    >
                        "{dailyQuote.quote}"
                    </motion.h3>
                    <p className="text-accent font-black uppercase text-xs tracking-[0.5em]">
                        — {dailyQuote.source}
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;
