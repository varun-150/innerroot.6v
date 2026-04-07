import React, { useRef, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
    Compass, BrainCircuit, Activity, Zap, Sparkles, 
    ArrowRight, Map as MapIcon, MessageSquare, 
    Box, Cpu, Database, Eye, Cloud
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import { Card } from '../components/ui/Card';

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
    const heroRef = useRef(null);
    const containerRef = useRef(null);
    
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax elements
            gsap.to(".parallax-bg", {
                y: -100,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Float animation for background orbs
            gsap.to(".bg-orb", {
                y: "random(-40, 40)",
                x: "random(-40, 40)",
                duration: "random(4, 8)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-[#050604] min-h-screen text-[#F0EEE8] selection:bg-[#D4AF37] selection:text-black font-sans overflow-x-hidden">
            <SEO title="Inner Root | Spiritual Intelligence" />
            
            {/* ── Background Layer ── */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                {/* Dark Green Gradient Bottom Left */}
                <div className="bg-orb absolute -bottom-[10%] -left-[5%] w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(26,38,20,0.4)_0%,transparent_70%)] blur-[100px]" />
                
                {/* Gold Accent Top Right */}
                <div className="bg-orb absolute -top-[10%] -right-[5%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,transparent_70%)] blur-[120px]" />
                
                {/* Subtle Glow Trail */}
                <div className="parallax-bg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-20" 
                    style={{ background: 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.03) 0%, transparent 60%)' }} />

                {/* Grain Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none" 
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
                />
            </div>

            {/* ── Hero Section ── */}
            <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center pt-24 px-6 z-10 overflow-hidden">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center relative"
                >
                    {/* Glowing aura behind text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(212,175,55,0.1)_0%,transparent_80%)] blur-3xl -z-10" />

                    <div className="mb-10 inline-flex items-center gap-3 px-6 py-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 text-[10px] font-black uppercase tracking-[0.8em] text-[#D4AF37]">
                        <Sparkles size={14} className="animate-pulse" />
                        Heritage Protocol Alpha
                    </div>

                    <h1 className="font-black text-[clamp(4.5rem,15vw,14rem)] leading-[0.75] mb-12 tracking-tighter uppercase font-serif drop-shadow-[0_10px_60px_rgba(0,0,0,0.8)]">
                        <span className="text-white">INNER</span>
                        <br />
                        <span className="text-[#D4AF37] relative">
                            ROOT
                            <span className="absolute -inset-0.5 bg-[#D4AF37] blur-[60px] opacity-20 pointer-events-none" />
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-xl md:text-2xl text-[#8E8C84] font-medium leading-relaxed mb-16 tracking-tight font-sans">
                        Fusing <span className="text-white/90">ancient intelligence</span> with predictive heritage protocols to <span className="text-[#D4AF37]/90 italic">reclaim the spirit's domain</span>.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                        <Link to="/explore" className="group relative px-12 py-5 bg-[#D4AF37] text-black rounded-3xl font-black uppercase tracking-widest text-[11px] transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(212,175,55,0.3)] overflow-hidden">
                            <span className="relative z-10">Initiate Communion</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </Link>
                        <Link to="/about" className="group px-12 py-5 border border-white/10 rounded-3xl font-black uppercase tracking-widest text-[11px] hover:bg-white/5 transition-all flex items-center gap-3">
                            The Protocol <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>

                {/* Floating UI Elements (Minimalist) */}
                <div className="absolute top-1/4 left-10 w-24 h-24 border border-white/5 rounded-full blur-[1px] opacity-20 animate-float" />
                <div className="absolute bottom-1/4 right-20 w-40 h-40 border border-[#D4AF37]/5 rounded-full blur-[2px] opacity-10 animate-float-delayed" />
                
                {/* Scroll Indicator */}
                <motion.div 
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-40 group cursor-pointer"
                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] group-hover:text-[#D4AF37] transition-colors">Invoke</span>
                    <div className="w-[1.5px] h-12 bg-gradient-to-b from-[#D4AF37] to-transparent" />
                </motion.div>
            </section>

            {/* ── Quote Section ── */}
            <section className="py-72 px-10 relative z-10">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h2 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2 }}
                        className="text-4xl md:text-8xl font-serif italic font-light leading-[1.1] tracking-tight text-[#f2f2f2]/90"
                    >
                        "Heritage is not a <span className="text-white/20 font-sans uppercase text-3xl md:text-5xl not-italic font-bold tracking-widest ml-4 align-middle">museum</span>. <br className="hidden md:block" />
                        It is a living <span className="text-[#D4AF37] font-black uppercase tracking-tighter relative mx-2">
                            ARCHITECTURE
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D4AF37]/30 blur-[4px]" />
                        </span> of the soul."
                    </motion.h2>
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: 120 }}
                        transition={{ duration: 1.5, delay: 0.8 }}
                        className="h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent mx-auto mt-24"
                    />
                </div>
            </section>

            {/* ── Feature Grid Section ── */}
            <section className="py-48 px-10 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-32 text-center flex flex-col items-center">
                        <span className="text-[#D4AF37] font-black uppercase text-[11px] tracking-[0.8em] mb-6 block">Sentient Modules</span>
                        <h3 className="text-6xl md:text-9xl font-heading font-black uppercase tracking-tighter mb-8 italic text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">The Interface</h3>
                        <div className="w-20 h-1 bg-[#D4AF37]/20 rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 auto-rows-[340px]">
                        {/* 1. Heritage Map (Expansion Card) */}
                        <Card variant="glass" className="lg:col-span-8 flex flex-col group relative overflow-hidden backdrop-blur-2xl bg-white/[0.01] border-white/5 p-0">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.08)_0%,transparent_50%)]" />
                            <div className="relative z-10 p-12 h-full flex flex-col justify-between">
                                <div className="space-y-6">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#D4AF37]/30 transition-colors">
                                        <MapIcon size={28} className="text-[#D4AF37]" />
                                    </div>
                                    <h4 className="text-4xl font-heading font-black uppercase tracking-tight">Heritage Map</h4>
                                    <p className="max-w-md text-[#8E8C84] text-lg leading-relaxed">Mapping five millennia of civilization into a high-fidelity geospatial cloud accessible via neural interface.</p>
                                </div>
                                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] group-hover:gap-6 transition-all duration-500">
                                    Expand Protocol <ArrowRight size={16} />
                                </div>
                            </div>
                            {/* Decorative Grid Overlay partial */}
                            <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                        </Card>

                        {/* 2. Aura Chat */}
                        <Card variant="glass" className="lg:col-span-4 p-10 flex flex-col justify-between group bg-white/[0.015] border-white/5 hover:border-emerald-500/20">
                            <div className="space-y-6">
                                <MessageSquare size={32} className="text-emerald-400 opacity-60" />
                                <h4 className="text-2xl font-heading font-black uppercase tracking-tight">Aura Chat</h4>
                                <p className="text-[#8E8C84] text-sm leading-relaxed">Direct communion with the collective Vedic consciousness through sentient resonance engines.</p>
                            </div>
                            <div className="w-full h-[1px] bg-emerald-500/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                        </Card>

                        {/* 3. Soul Mirror */}
                        <Card variant="glass" className="lg:col-span-4 p-10 flex flex-col justify-between group bg-white/[0.015] border-white/5 hover:border-rose-500/20">
                            <div className="space-y-6">
                                <Activity size={32} className="text-rose-400 opacity-60" />
                                <h4 className="text-2xl font-heading font-black uppercase tracking-tight">Soul Mirror</h4>
                                <p className="text-[#8E8C84] text-sm leading-relaxed">Biometric frequency mapping calibrated to archaic Ayurvedic archetypes for inner alignment.</p>
                            </div>
                            <div className="w-full h-[1px] bg-rose-500/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                        </Card>

                        {/* 4. Virtual Yatra */}
                        <Card variant="glass" className="lg:col-span-4 p-10 flex flex-col justify-between group bg-white/[0.015] border-white/5 hover:border-[#D4AF37]/20">
                            <div className="space-y-6">
                                <Box size={32} className="text-[#D4AF37] opacity-60" />
                                <h4 className="text-2xl font-heading font-black uppercase tracking-tight">Virtual Yatra</h4>
                                <p className="text-[#8E8C84] text-sm leading-relaxed">Spatial-audio pilgrimages through the sacred geometry of the Indian subcontinent's holiest sites.</p>
                            </div>
                            <div className="w-full h-[1px] bg-[#D4AF37]/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                        </Card>

                        {/* 5. AI Studio */}
                        <Card variant="glass" className="lg:col-span-4 p-10 flex flex-col justify-between group bg-white/[0.015] border-white/5 hover:border-blue-500/20">
                            <div className="space-y-6">
                                <Cpu size={32} className="text-blue-400 opacity-60" />
                                <h4 className="text-2xl font-heading font-black uppercase tracking-tight">AI Studio</h4>
                                <p className="text-[#8E8C84] text-sm leading-relaxed">Generative sanctuary for the manifestation of sacred art and algorithmic mandala generation.</p>
                            </div>
                            <div className="w-full h-[1px] bg-blue-500/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                        </Card>
                    </div>
                </div>
            </section>

            {/* ── Stats Section ── */}
            <section className="py-64 px-10 relative overflow-hidden bg-[#0A0C08]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_100%)] pointer-events-none" />
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-32">
                        {[
                            { value: '500+', label: 'Ancient Sites Mapped' },
                            { value: '10K+', label: 'Communion Nodes' },
                            { value: '200+', label: 'Vedic Lineages' }
                        ].map((stat, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, delay: i * 0.2 }}
                                viewport={{ once: true }}
                                className="text-center group"
                            >
                                <div className="text-8xl md:text-[10rem] font-heading font-black text-[#D4AF37] mb-8 tracking-tighter leading-none transition-transform duration-700 group-hover:scale-110">
                                    {stat.value}
                                </div>
                                <div className="text-[12px] font-black uppercase tracking-[0.8em] text-[#8E8C84]/60 group-hover:text-[#D4AF37] transition-colors">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Process Section ── */}
            <section className="py-64 px-10 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-52">
                        <span className="text-[#D4AF37] font-black uppercase text-[12px] tracking-[0.8em] mb-8 block">The Workflow</span>
                        <h3 className="text-6xl md:text-9xl font-heading font-black uppercase tracking-tight opacity-10">Modern</h3>
                    </div>

                    <div className="relative space-y-72">
                        {/* Connecting Line (Vertical) */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#D4AF37]/40 via-[#D4AF37]/5 to-transparent hidden md:block" />

                        {[
                            { id: '01', title: 'Trace Your Lineage', body: 'Discover the resonance of your ancestry through high-fidelity data mapping and generative sacred geometry.', align: 'right' },
                            { id: '02', title: 'Sense the Vibration', body: 'Calibrate your inner frequency using sentient bio-sonic protocols and proprietary neural feedback loops.', align: 'left' },
                            { id: '03', title: 'Sattva Communion', body: 'Join decentralized meditation networks where collective intent is amplified through ancestral intelligence.', align: 'right' }
                        ].map((step, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: step.align === 'right' ? 60 : -60 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true, margin: "-100px" }}
                                className={`flex flex-col md:flex-row items-center gap-20 md:gap-40 ${step.align === 'left' ? 'md:flex-row-reverse' : ''}`}
                            >
                                <div className={`flex-1 text-center ${step.align === 'right' ? 'md:text-left' : 'md:text-right'}`}>
                                    <div className={`flex items-center gap-6 mb-8 justify-center ${step.align === 'right' ? 'md:justify-start' : 'md:justify-end'}`}>
                                        <span className="text-[#D4AF37] font-black text-xs tracking-widest">{step.id} — PROTOCOL</span>
                                    </div>
                                    <h4 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter mb-8 leading-none">{step.title}</h4>
                                    <p className="text-[#8E8C84] text-xl font-medium leading-relaxed max-w-lg mx-auto md:mx-0 opacity-80">{step.body}</p>
                                </div>

                                {/* Diamond Outlines */}
                                <div className="relative z-10 flex-shrink-0 group">
                                    <div className="w-32 h-32 rotate-45 border-2 border-[#D4AF37]/20 group-hover:border-[#D4AF37] flex items-center justify-center bg-[#050604] transition-all duration-1000">
                                        <div className="relative -rotate-45">
                                            <span className="text-[#D4AF37] font-heading text-4xl font-black">{step.id}</span>
                                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#D4AF37] rounded-full group-hover:scale-150 transition-transform" />
                                        </div>
                                    </div>
                                    {/* Outer Diamond Layer */}
                                    <div className="absolute inset-[-20px] border border-[#D4AF37]/5 rotate-45 group-hover:scale-125 transition-all duration-1000 -z-10" />
                                </div>
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="py-52 px-10 border-t border-white/5 relative z-10 bg-[#020202]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-24 mb-40">
                        <div className="md:col-span-5 space-y-12">
                            <h2 className="text-6xl font-heading font-black tracking-tighter text-white">INNER ROOT</h2>
                            <p className="text-[#8E8C84] max-w-sm text-lg leading-relaxed font-medium">
                                Preserving five thousand years of sentient heritage for the age of silicon and spirit.
                                The definitive high-fidelity platform for ancestral intelligence.
                            </p>
                            <div className="flex gap-8">
                                {['IG', 'TW', 'LI', 'MT'].map(s => (
                                    <a key={s} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-black hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all">{s}</a>
                                ))}
                            </div>
                        </div>

                        <div className="md:col-span-3 space-y-10">
                            <h5 className="text-[11px] font-black uppercase tracking-[0.8em] text-[#D4AF37]">Explore</h5>
                            <ul className="space-y-6">
                                {['Heritage Map', 'Library', 'Virtual Tours', 'Vedas'].map(link => (
                                    <li key={link}>
                                        <Link to="#" className="text-[#8E8C84] hover:text-white transition-colors text-lg font-bold tracking-tight">{link}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="md:col-span-2 space-y-10">
                            <h5 className="text-[11px] font-black uppercase tracking-[0.8em] text-[#D4AF37]">Wellness</h5>
                            <ul className="space-y-6">
                                {['Soul Mirror', 'Communion', 'Meditation'].map(link => (
                                    <li key={link}>
                                        <Link to="#" className="text-[#8E8C84] hover:text-white transition-colors text-lg font-bold tracking-tight">{link}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="md:col-span-2 space-y-10">
                            <h5 className="text-[11px] font-black uppercase tracking-[0.8em] text-[#D4AF37]">Inner Root</h5>
                            <ul className="space-y-6">
                                {['About', 'Features', 'Contact', 'Legal'].map(link => (
                                    <li key={link}>
                                        <Link to="#" className="text-[#8E8C84] hover:text-white transition-colors text-lg font-bold tracking-tight">{link}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 pt-16 border-t border-white/5 opacity-40">
                        <p className="text-[10px] font-black uppercase tracking-[1em]">SENTIENT DATA PROTOCOL v1.0.4</p>
                        <p className="text-[10px] font-black uppercase tracking-[0.5em]">© 2026 INNER ROOT ARCHIVE • BENGALURU • HARIDWAR</p>
                    </div>
                </div>
            </footer>

            {/* Custom Styles for animations */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                .animate-float { animation: float 10s ease-in-out infinite; }
                .animate-float-delayed { animation: float 14s ease-in-out infinite reverse; }
                
                .font-serif { font-family: 'Cinzel', serif; }
                .font-heading { font-family: 'Cinzel', serif; }
                .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
            `}} />
        </div>
    );
};

export default LandingPage;
