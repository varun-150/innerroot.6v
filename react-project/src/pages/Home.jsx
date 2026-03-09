import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
    Compass, BrainCircuit, Users, Sparkles,
    ArrowRight, MapPin, Heart, BookOpen, Sun,
    Star, Shield, Lock, Zap, Check, Plus, Minus
} from 'lucide-react';
import SEO from '../components/ui/SEO';
import { wisdomAPI } from '../services/api';

/* ─── Easing ─────────────────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1];
const fadeUp = {
    initial: { opacity: 0, y: 36 },
    animate: { opacity: 1, y: 0 },
};

/* ─── Data ───────────────────────────────────────────────── */
const features = [
    {
        icon: Compass, title: 'Heritage Map', tag: 'Interactive',
        desc: 'Navigate 500+ sacred sites across India with our interactive map featuring rich histories, photos, and audio guides.',
        cta: 'Open Heritage Map', link: '/explore',
        color: '#d97706', bg: 'var(--bento-1)',
        accent: 'rgba(217,119,6,0.12)',
    },
    {
        icon: BrainCircuit, title: 'AI Wellness Guide', tag: 'AI-Powered',
        desc: 'Log your mood in 10 seconds. Our AI recommends specific breathing exercises or meditations to match exactly how you feel.',
        cta: 'Check Real-Time Wellness', link: '/wellness',
        color: '#15803d', bg: 'var(--bento-2)',
        accent: 'rgba(20,83,45,0.12)',
    },
    {
        icon: Users, title: 'Community Circles', tag: 'Expert-led',
        desc: 'Weekly live sessions with certified yoga teachers, Ayurvedic experts, and heritage scholars. Moderated, intimate, and transformative.',
        cta: 'Browse Circles', link: '/community',
        color: '#7c3aed', bg: 'var(--bento-3)',
        accent: 'rgba(124,58,237,0.12)',
    },
    {
        icon: Sparkles, title: 'Daily Reflections', tag: 'Daily Practice',
        desc: 'Receive simple, ancient wisdom prompts. Spend 5 minutes journaling and use our AI to track your emotional journey week over week.',
        cta: 'Try Reflections', link: '/wellness',
        color: '#c9a227', bg: 'var(--bento-4)',
        accent: 'rgba(201,162,39,0.12)',
    },
];

const stats = [
    { number: '500+', label: 'Heritage Sites', note: 'temples, forts & monuments', icon: MapPin },
    { number: '10K+', label: 'Seekers', note: 'India & global diaspora', icon: Heart },
    { number: '200+', label: 'Practices', note: 'meditation, pranayama, japa', icon: BookOpen },
    { number: '50+', label: 'Expert Guides', note: 'certified teachers & scholars', icon: Users },
];

const testimonials = [
    {
        quote: 'The Heritage Map helped me plan a pilgrimage for my parents. The stories behind each temple are extraordinary.',
        name: 'Priya Sharma', role: 'Architect, Mumbai', avatar: 'https://i.pravatar.cc/150?u=priya', color: '#d97706',
    },
    {
        quote: "I was sceptical about 'AI wellness'. But logging my mood and getting a specific breathing exercise that actually matched how I felt? It works.",
        name: 'Arjun Menon', role: 'Software Engineer, Bangalore', avatar: 'https://i.pravatar.cc/150?u=arjun', color: '#15803d',
    },
    {
        quote: 'The community circle changed my mornings. An expert-guided 20-minute session every Monday — the most grounding thing I do all week.',
        name: 'Deepa Rao', role: 'Teacher, Pune', avatar: 'https://i.pravatar.cc/150?u=deepa', color: '#7c3aed',
    },
];

const faqs = [
    { q: 'Is Inner Root free?', a: 'Yes. The Heritage Map, Mood Tracker, Daily Reflections, and basic Community access are fully free. Premium unlocks unlimited AI insights and private community sessions.' },
    { q: 'How does the AI personalise my wellness?', a: 'You log your mood in 10 seconds. Our AI maps your state against our library of practices — considering time of day and your preferred style — to recommend the best fit.' },
    { q: "What makes this different from Calm or Headspace?", a: "Inner Root is dedicated to traditional Indian heritage. We pair wellness practices with a live cultural encyclopedia and interactive map, offering a journey rooted in history." },
    { q: 'Is the Heritage Map like Google Maps?', a: 'No. Where Google Maps helps you navigate roads, we help you navigate history. We provide the mythological stories, architecture history, and audio narration tied to each site.' },
    { q: 'Is my wellness data private?', a: 'Completely. Your data is encrypted. We never sell or share it. Export or delete it anytime from your profile.' },
    { q: 'Who leads the Community Circles?', a: 'All circles are led by verified expert practitioners or heritage scholars. Every facilitator is vetted for experience and authenticity.' },
];

const trustPills = [
    'Free forever on core features',
    'No ads · No tracking',
    'Data encrypted & private',
];

/* ─── Noise overlay ──────────────────────────────────────── */
const NoiseOverlay = () => (
    <div className="noise-overlay" aria-hidden="true" />
);

/* ─── Feature card (8K bento) ────────────────────────────── */
const FeatureCard = ({ feature, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 48 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.10, ease: EASE }}
            className={`card-8k shimmer-border group flex flex-col h-full bg-surface relative overflow-hidden`}
            style={{ padding: '0', background: 'var(--color-surface)', display: 'flex' }}
        >
            {/* Visual Header representing feature (Mockup wrapper) */}
            <div style={{
                height: '180px',
                width: '100%',
                background: `linear-gradient(to bottom, ${feature.accent}, transparent)`,
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                borderBottom: '1px solid var(--color-border)',
                overflow: 'hidden'
            }}>
                {/* Abstract UI Mockup */}
                <div style={{
                    width: '80%',
                    height: '140px',
                    backgroundColor: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    borderTopLeftRadius: '12px',
                    borderTopRightRadius: '12px',
                    borderBottom: 'none',
                    boxShadow: '0 -10px 30px rgba(0,0,0,0.1)',
                    transform: 'translateY(20px)',
                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '16px'
                }} className="group-hover:translate-y-2">
                    {/* Mockup Top row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <div style={{ width: '40px', height: '12px', borderRadius: '4px', background: 'var(--color-text-faint)' }}></div>
                        <feature.icon size={16} color={feature.color} />
                    </div>
                    {/* Mockup content lines */}
                    <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: 'var(--color-border)', marginBottom: '12px' }}></div>
                    <div style={{ width: '70%', height: '8px', borderRadius: '4px', background: 'var(--color-border)', marginBottom: '12px' }}></div>
                    <div style={{ width: '85%', height: '8px', borderRadius: '4px', background: 'var(--color-border)' }}></div>
                </div>

                {/* Floating Tag */}
                <span style={{
                    position: 'absolute',
                    top: '20px', left: '24px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.3em 0.8em',
                    borderRadius: '9999px',
                    background: 'var(--color-bg)',
                    color: feature.color,
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    border: `1px solid ${feature.color}30`
                }}>
                    {feature.tag}
                </span>
            </div>

            {/* Content Body */}
            <div style={{ padding: 'clamp(1.5rem,3vw,2rem)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.25rem,2.5vw,1.5rem)',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    lineHeight: 1.2,
                    marginBottom: '0.875rem',
                    letterSpacing: '-0.02em',
                }}>
                    {feature.title}
                </h3>

                <p style={{
                    fontSize: 'clamp(0.8125rem,1.2vw,0.9375rem)',
                    lineHeight: 1.6,
                    color: 'var(--color-text-subtle)',
                    flex: 1,
                    marginBottom: '1.75rem',
                }}>
                    {feature.desc}
                </p>

                {/* CTA */}
                <Link to={feature.link}
                    style={{
                        display: 'inline-flex', alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: 'clamp(0.8125rem,1vw,0.9375rem)',
                        fontWeight: 600,
                        color: feature.color,
                        transition: 'gap 0.3s',
                        marginTop: 'auto'
                    }}
                    className="group-hover:[gap:0.75rem]"
                >
                    {feature.cta}
                    <ArrowRight size={16} />
                </Link>
            </div>
        </motion.div>
    );
};

/* ─── Stat card ──────────────────────────────────────────── */
const StatCard = ({ stat, index, inView }) => (
    <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.15 + index * 0.1, duration: 0.6, ease: EASE }}
        className="stat-8k"
    >
        <div style={{ color: 'var(--color-accent)', marginBottom: '0.25rem' }}>
            <stat.icon size="clamp(1rem,1.5vw,1.5rem)" strokeWidth={1.5} />
        </div>
        <div className="stat-8k-number">{stat.number}</div>
        <div style={{
            fontSize: 'clamp(0.75rem,1vw,0.9375rem)',
            fontWeight: 600,
            color: 'var(--color-text)',
            marginTop: '0.25rem',
        }}>{stat.label}</div>
        <div style={{
            fontSize: 'clamp(0.6rem,0.9vw,0.75rem)',
            color: 'var(--color-text-faint)',
        }}>{stat.note}</div>
    </motion.div>
);

/* ─── Testimonial card ───────────────────────────────────── */
const TestimonialCard = ({ t, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: index * 0.12, ease: EASE }}
            className="testimonial-8k"
        >
            {/* Stars */}
            <div style={{ display: 'flex', gap: '0.25rem' }}>
                {[0, 1, 2, 3, 4].map(i => <Star key={i} size={14} fill="#d97706" color="#d97706" />)}
            </div>

            {/* Quote */}
            <p style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(1rem,1.5vw,1.25rem)',
                lineHeight: 1.65,
                color: 'var(--color-text)',
                flex: 1,
            }}>
                "{t.quote}"
            </p>

            {/* Author */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginTop: 'auto' }}>
                <div style={{
                    width: 'clamp(2.5rem,3.5vw,3.5rem)',
                    height: 'clamp(2.5rem,3.5vw,3.5rem)',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}99)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff',
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '2px solid var(--color-surface)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}>
                    {t.avatar.startsWith('http') ? (
                        <img src={t.avatar} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <span style={{ fontSize: 'clamp(0.625rem,1vw,0.75rem)', fontWeight: 700 }}>{t.avatar}</span>
                    )}
                </div>
                <div>
                    <div style={{ fontWeight: 600, fontSize: 'clamp(0.8125rem,1vw,0.9375rem)', color: 'var(--color-text)' }}>
                        {t.name}
                    </div>
                    <div style={{ fontSize: 'clamp(0.6875rem,0.85vw,0.8125rem)', color: 'var(--color-text-faint)' }}>
                        {t.role}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

/* ─── FAQ item ───────────────────────────────────────────── */
const FaqItem = ({ faq, index }) => {
    const [open, setOpen] = useState(false);
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.07, duration: 0.45, ease: EASE }}
            className={`faq-8k ${open ? 'open' : ''}`}
        >
            <button className="faq-8k-btn" onClick={() => setOpen(o => !o)} aria-expanded={open}>
                <span>{faq.q}</span>
                <span className="faq-8k-icon">
                    {open ? <Minus size={14} /> : <Plus size={14} />}
                </span>
            </button>
            <div className="faq-8k-body">
                <p className="faq-8k-answer">{faq.a}</p>
            </div>
        </motion.div>
    );
};

/* ─── MAIN COMPONENT ─────────────────────────────────────── */
const Home = () => {
    const heroRef = useRef(null);
    const statsRef = useRef(null);
    const heroInView = useInView(heroRef, { once: true });
    const statsInView = useInView(statsRef, { once: true, margin: '-80px' });

    const [dailyQuote, setDailyQuote] = useState({
        quote: "When you know yourself, you know the universe.",
        source: "Upanishads"
    });

    useEffect(() => {
        wisdomAPI.getRandom().then(data => {
            if (data) setDailyQuote(data);
        }).catch(() => { });
    }, []);

    return (
        <>
            <SEO
                title="Inner Root — India's Heritage & AI Wellness Platform"
                description="Explore 500+ heritage sites on an interactive map, get AI-personalised meditation based on your mood, join expert-led spiritual Circles, and build a daily reflection practice — all in one app."
            />

            <NoiseOverlay />

            {/* ══════════════════════════════════════════════════════════
                HERO
            ══════════════════════════════════════════════════════════ */}
            <section
                ref={heroRef}
                style={{
                    position: 'relative',
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    isolation: 'isolate',
                }}
            >
                {/* Mesh background */}
                <div className="hero-mesh" />

                {/* Sacred geometry */}
                <div className="sacred-geometry" style={{ opacity: 0.03 }} />

                {/* Animated orbs */}
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />

                {/* Vignette */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
                    background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, var(--color-bg) 90%)',
                }} />

                {/* Hero content */}
                <motion.div
                    style={{
                        position: 'relative', zIndex: 3,
                        textAlign: 'center',
                        width: '100%',
                        maxWidth: 'min(90vw, 1100px)',
                        margin: '0 auto',
                        padding: 'clamp(6rem,12vh,10rem) clamp(1rem,5vw,4rem)',
                    }}
                    initial="initial"
                    animate={heroInView ? 'animate' : 'initial'}
                    variants={{ animate: { transition: { staggerChildren: 0.12 } } }}
                >
                    {/* Trust badge */}
                    <motion.div variants={fadeUp} transition={{ duration: 0.7, ease: EASE }}
                        style={{ marginBottom: 'clamp(2rem,4vw,3rem)', display: 'flex', justifyContent: 'center' }}>
                        <span className="hero-badge">
                            <Sun size={14} strokeWidth={2} />
                            Trusted by 10,000+ seekers across India & the diaspora
                        </span>
                    </motion.div>

                    {/* H1 */}
                    <motion.h1
                        variants={fadeUp} transition={{ duration: 0.8, ease: EASE }}
                        className="display-1"
                        style={{ marginBottom: 'clamp(1.5rem,3vw,2.5rem)' }}
                    >
                        India's Heritage.{' '}
                        <span className="text-gradient">Your Inner Peace.</span>
                    </motion.h1>

                    {/* Lead */}
                    <motion.p
                        variants={fadeUp} transition={{ duration: 0.7, ease: EASE }}
                        className="lead"
                        style={{
                            maxWidth: 'min(90%, 700px)',
                            margin: '0 auto',
                            marginBottom: 'clamp(0.75rem,1.5vw,1.25rem)',
                        }}
                    >
                        Explore an interactive map of 500+ heritage sites. Get an
                        instant mood-based meditation. Join expert-led wellness circles.
                    </motion.p>

                    <motion.p
                        variants={fadeUp} transition={{ duration: 0.6, ease: EASE }}
                        style={{
                            fontSize: 'clamp(0.8125rem,1.1vw,1rem)',
                            color: 'var(--color-text-faint)',
                            maxWidth: 'min(90%, 580px)',
                            margin: '0 auto clamp(2.5rem,5vw,4rem)',
                            lineHeight: 1.6,
                        }}
                    >
                        Rooted in ancient tradition — guided by intelligent technology.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        variants={fadeUp} transition={{ duration: 0.65, ease: EASE }}
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 'clamp(0.75rem,2vw,1.25rem)',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Link to="/signup" className="btn btn-primary"
                            style={{
                                padding: 'clamp(0.875rem,1.5vw,1.125rem) clamp(1.75rem,3vw,2.5rem)',
                                fontSize: 'clamp(0.875rem,1.2vw,1.0625rem)',
                                fontWeight: 700,
                                boxShadow: '0 8px 32px rgba(217,119,6,0.35)',
                                letterSpacing: '-0.01em',
                            }}
                        >
                            Start Exploring for Free
                            <ArrowRight size={18} style={{ marginLeft: 4 }} />
                        </Link>
                        <Link to="/explore" className="btn btn-secondary"
                            style={{
                                padding: 'clamp(0.875rem,1.5vw,1.125rem) clamp(1.5rem,2.5vw,2rem)',
                                fontSize: 'clamp(0.875rem,1.2vw,1.0625rem)',
                            }}
                        >
                            <Compass size={18} />
                            Explore Heritage Map
                        </Link>
                    </motion.div>

                    {/* Trust pills */}
                    <motion.div
                        variants={fadeUp} transition={{ duration: 0.5, ease: EASE }}
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 'clamp(1rem,2vw,2rem)',
                            justifyContent: 'center',
                            marginTop: 'clamp(1.5rem,3vw,2.5rem)',
                        }}
                    >
                        {trustPills.map(p => (
                            <span key={p} className="trust-pill">
                                <Check size={12} />
                                {p}
                            </span>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Bottom fade */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', zIndex: 4, pointerEvents: 'none',
                    background: 'linear-gradient(to bottom, transparent, var(--color-bg))',
                }} />
            </section>

            {/* ══════════════════════════════════════════════════════════
                STATS
            ══════════════════════════════════════════════════════════ */}
            <section ref={statsRef} style={{ padding: '0 clamp(1rem,5vw,4rem) clamp(4rem,7vw,7rem)', position: 'relative', zIndex: 5 }}>
                <div style={{ maxWidth: 'var(--container-8k)', margin: '0 auto' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px,100%),1fr))',
                        gap: 'clamp(0.75rem,1.5vw,1.25rem)',
                    }}>
                        {stats.map((s, i) => (
                            <StatCard key={s.label} stat={s} index={i} inView={statsInView} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                DAILY WISDOM
            ══════════════════════════════════════════════════════════ */}
            <section style={{ padding: '0 clamp(1rem,5vw,4rem) clamp(4rem,7vw,7rem)' }}>
                <div style={{ maxWidth: 'min(90vw,860px)', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: EASE }}
                        style={{
                            position: 'relative',
                            padding: 'clamp(2.5rem,5vw,5rem)',
                            borderRadius: 'var(--radius-3xl)',
                            background: 'linear-gradient(135deg, var(--color-accent-soft) 0%, var(--color-bg-subtle) 100%)',
                            border: '1px solid var(--color-border)',
                            overflow: 'hidden',
                            textAlign: 'center',
                        }}
                    >
                        {/* Decorative circles */}
                        <div style={{
                            position: 'absolute', top: '-30%', right: '-10%',
                            width: '40vw', height: '40vw', maxWidth: 400, maxHeight: 400,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(217,119,6,0.08) 0%, transparent 70%)',
                            pointerEvents: 'none',
                        }} />

                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            marginBottom: 'clamp(1rem,2vw,1.75rem)',
                        }}>
                            {[0, 1, 2].map(i => (
                                <Star key={i} size={14} fill="var(--color-accent)" color="var(--color-accent)" />
                            ))}
                        </div>

                        <p style={{
                            fontFamily: 'var(--font-display)',
                            fontStyle: 'italic',
                            fontWeight: 400,
                            fontSize: 'clamp(1.25rem,2.5vw,2rem)',
                            lineHeight: 1.5,
                            color: 'var(--color-text)',
                            marginBottom: 'clamp(1rem,2vw,1.5rem)',
                        }}>
                            "{dailyQuote.quote}"
                        </p>
                        <p style={{
                            fontSize: 'clamp(0.7rem,0.9vw,0.875rem)',
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: 'var(--color-accent)',
                        }}>
                            — {dailyQuote.source}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                FEATURES — 2×2 Bento
            ══════════════════════════════════════════════════════════ */}
            <section className="section-8k" style={{ paddingInline: 'clamp(1rem,5vw,4rem)' }}>
                <div style={{ maxWidth: 'var(--container-8k)', margin: '0 auto' }}>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: EASE }}
                        style={{ textAlign: 'center', marginBottom: 'clamp(3rem,5vw,5rem)' }}
                    >
                        <span className="section-label" style={{ justifyContent: 'center', marginBottom: 'clamp(1rem,2vw,1.5rem)' }}>
                            What You'll Actually Do
                        </span>
                        <h2 className="display-2" style={{ marginBottom: 'clamp(1rem,2vw,1.5rem)' }}>
                            Four Experiences.{' '}
                            <span className="text-gradient">One Platform.</span>
                        </h2>
                        <p className="lead" style={{ maxWidth: 'min(90%,680px)', margin: '0 auto' }}>
                            Start with one. Each is standalone yet interconnected — your Heritage
                            exploration can surface meditations that match where you are.
                        </p>
                    </motion.div>

                    {/* 2×2 grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px,100%),1fr))',
                        gap: 'clamp(0.75rem,1.5vw,1.5rem)',
                    }}>
                        {features.map((f, i) => <FeatureCard key={f.title} feature={f} index={i} />)}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                AI EXPLAINER
            ══════════════════════════════════════════════════════════ */}
            <section style={{ padding: '0 clamp(1rem,5vw,4rem) clamp(5rem,9vw,9rem)' }}>
                <div style={{ maxWidth: 'min(90vw,960px)', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.75, ease: EASE }}
                        style={{
                            borderRadius: 'var(--radius-3xl)',
                            padding: 'clamp(2.5rem,5vw,5rem)',
                            background: 'linear-gradient(135deg, rgba(217,119,6,0.05) 0%, rgba(20,83,45,0.05) 100%)',
                            border: '1px solid var(--color-border)',
                        }}
                    >
                        {/* Header */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: 'clamp(1.5rem,3vw,2.5rem)' }}>
                            <div style={{
                                width: 'clamp(2.5rem,4vw,3.25rem)',
                                height: 'clamp(2.5rem,4vw,3.25rem)',
                                borderRadius: 'var(--radius-lg)',
                                background: 'var(--color-accent-soft)',
                                color: 'var(--color-accent)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0,
                            }}>
                                <BrainCircuit size="clamp(1.25rem,2vw,1.625rem)" />
                            </div>
                            <span className="section-label">How the AI Works</span>
                        </div>

                        <h3 className="display-3" style={{ marginBottom: 'clamp(1.5rem,3vw,3rem)' }}>
                            Not generic content.<br />Personalised to this moment.
                        </h3>

                        {/* 3-step grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px,100%),1fr))',
                            gap: 'clamp(1.5rem,3vw,3rem)',
                        }}>
                            {[
                                { step: '01', title: 'Emotional Intelligence', desc: "Log your state with emojis and micro-journals. Our AI understands nuanced feelings like 'vikalpa' (agitation) vs plain stress." },
                                { step: '02', title: 'Contextual Synthesis', desc: "We map your mood against 5,000 years of Vedic wisdom, your circadian rhythm, and your unique practitioner profile." },
                                { step: '03', title: 'Curated Sankalpa', desc: "Receive a hyper-specific intention and practice — from Japa to Yoga Nidra — that aligns your energy for the next hour." },
                            ].map(s => (
                                <div key={s.step} style={{
                                    position: 'relative',
                                    padding: 'clamp(1rem,2vw,1.5rem)',
                                    borderRadius: 'var(--radius-xl)',
                                    transition: 'background 0.3s',
                                }}
                                    className="hover:bg-white/5"
                                >
                                    <span className="step-number">{s.step}</span>
                                    <div style={{
                                        fontWeight: 600,
                                        fontSize: 'clamp(0.9375rem,1.3vw,1.125rem)',
                                        color: 'var(--color-text)',
                                        marginBottom: '0.75rem',
                                        paddingTop: '1rem',
                                    }}>
                                        {s.title}
                                    </div>
                                    <div style={{
                                        fontSize: 'clamp(0.8125rem,1.1vw,0.9375rem)',
                                        lineHeight: 1.7,
                                        color: 'var(--color-text-subtle)',
                                    }}>
                                        {s.desc}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: 'clamp(2rem,3vw,3rem)' }}>
                            <Link to="/wellness" className="btn btn-primary">
                                <Zap size={16} />
                                Try AI Wellness Now
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                TESTIMONIALS
            ══════════════════════════════════════════════════════════ */}
            <section style={{ padding: '0 clamp(1rem,5vw,4rem) clamp(5rem,9vw,9rem)' }}>
                <div style={{ maxWidth: 'var(--container-8k)', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: EASE }}
                        style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem,4vw,4rem)' }}
                    >
                        <span className="section-label" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
                            From the Community
                        </span>
                        <h2 className="display-2" style={{ maxWidth: 'min(90%,640px)', margin: '0 auto' }}>
                            Real journeys.<br />
                            <span className="text-gradient">Real transformation.</span>
                        </h2>
                    </motion.div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px,100%),1fr))',
                        gap: 'clamp(0.75rem,1.5vw,1.5rem)',
                    }}>
                        {testimonials.map((t, i) => <TestimonialCard key={t.name} t={t} index={i} />)}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                TRUST & PRIVACY
            ══════════════════════════════════════════════════════════ */}
            <section style={{ padding: '0 clamp(1rem,5vw,4rem) clamp(5rem,9vw,9rem)' }}>
                <div style={{ maxWidth: 'min(90vw,960px)', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: EASE }}
                        style={{
                            borderRadius: 'var(--radius-3xl)',
                            padding: 'clamp(2.5rem,5vw,4rem)',
                            background: 'var(--color-surface)',
                            border: '1px solid var(--color-border)',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: 'clamp(1.5rem,3vw,2.5rem)' }}>
                            <Lock size="clamp(1.125rem,1.5vw,1.375rem)" style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                            <h3 className="display-3">Your data is yours. Always.</h3>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px,100%),1fr))',
                            gap: 'clamp(1.5rem,3vw,2.5rem)',
                        }}>
                            {[
                                { icon: Shield, title: 'End-to-end encrypted', desc: 'Your mood logs and journal entries are encrypted in transit and at rest. We cannot read them.' },
                                { icon: Heart, title: 'No ads, ever', desc: "We don't sell your data or serve ads. Revenue comes from optional premium features — not your attention." },
                                { icon: Users, title: 'Full data control', desc: 'Export or permanently delete your data anytime from your profile settings. No questions asked.' },
                            ].map(item => (
                                <div key={item.title}>
                                    <div style={{
                                        width: 40, height: 40,
                                        borderRadius: 'var(--radius-md)',
                                        background: 'var(--color-accent-soft)',
                                        color: 'var(--color-accent)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        marginBottom: '1rem',
                                    }}>
                                        <item.icon size={20} strokeWidth={1.5} />
                                    </div>
                                    <div style={{ fontWeight: 600, fontSize: 'clamp(0.875rem,1.2vw,1rem)', color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                                        {item.title}
                                    </div>
                                    <div style={{ fontSize: 'clamp(0.8125rem,1vw,0.9375rem)', lineHeight: 1.65, color: 'var(--color-text-subtle)' }}>
                                        {item.desc}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                FAQ
            ══════════════════════════════════════════════════════════ */}
            <section style={{ padding: '0 clamp(1rem,5vw,4rem) clamp(5rem,9vw,9rem)' }}>
                <div style={{ maxWidth: 'min(90vw,780px)', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, ease: EASE }}
                        style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem,4vw,4rem)' }}
                    >
                        <span className="section-label" style={{ justifyContent: 'center', marginBottom: '1rem' }}>FAQ</span>
                        <h2 className="display-2">Questions you probably have</h2>
                    </motion.div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem,1vw,0.875rem)' }}>
                        {faqs.map((faq, i) => <FaqItem key={faq.q} faq={faq} index={i} />)}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                FINAL CTA
            ══════════════════════════════════════════════════════════ */}
            <section style={{ padding: '0 clamp(1rem,5vw,4rem) clamp(6rem,10vw,10rem)' }}>
                <div style={{ maxWidth: 'min(90vw,960px)', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="cta-block"
                    >
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h2 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 'clamp(2rem,5vw,4rem)',
                                fontWeight: 700,
                                color: '#fff',
                                lineHeight: 1.05,
                                letterSpacing: '-0.03em',
                                marginBottom: 'clamp(0.75rem,1.5vw,1.25rem)',
                            }}>
                                Begin today. Free.
                            </h2>
                            <p style={{
                                fontSize: 'clamp(0.9375rem,1.3vw,1.125rem)',
                                color: 'rgba(255,255,255,0.78)',
                                marginBottom: 'clamp(2rem,4vw,3.5rem)',
                                maxWidth: 500,
                                margin: '0 auto clamp(2rem,4vw,3.5rem)',
                                lineHeight: 1.65,
                            }}>
                                Open the Heritage Map. Log your mood. Get your first guided meditation.
                                Your roots are waiting.
                            </p>
                            <Link
                                to="/signup"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.625rem',
                                    padding: 'clamp(0.875rem,1.5vw,1.25rem) clamp(2rem,3.5vw,3rem)',
                                    borderRadius: '9999px',
                                    background: '#fff',
                                    color: 'var(--brand-600)',
                                    fontWeight: 700,
                                    fontSize: 'clamp(0.9375rem,1.3vw,1.125rem)',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                                    transition: 'transform 0.3s var(--ease-spring), box-shadow 0.3s',
                                    letterSpacing: '-0.01em',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.22)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.18)'; }}
                            >
                                Create Free Account
                                <ArrowRight size={18} />
                            </Link>
                            <p style={{
                                marginTop: 'clamp(1rem,2vw,1.5rem)',
                                color: 'rgba(255,255,255,0.50)',
                                fontSize: 'clamp(0.6875rem,0.9vw,0.8125rem)',
                            }}>
                                No credit card · Cancel anytime · Free forever on core features
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default Home;
