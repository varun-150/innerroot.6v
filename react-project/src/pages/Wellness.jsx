import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
    Heart, Brain, Sparkles, BookOpen, Wind, Sun,
    ChevronRight, Clock, Star, Flower2, ArrowRight,
    PenLine, Smile, Frown, Meh, Zap, Coffee,
    Plus, Minus, RotateCcw, Volume2, VolumeX, Bell,
    X, Check
} from 'lucide-react';
import SEO from '../components/ui/SEO';
import { moodAPI } from '../services/api';

// ──────────── Data ────────────
const moods = [
    { emoji: '😌', label: 'Calm', color: '#22c55e' },
    { emoji: '😊', label: 'Happy', color: '#d97706' },
    { emoji: '😐', label: 'Neutral', color: '#94a3b8' },
    { emoji: '😟', label: 'Anxious', color: '#f59e0b' },
    { emoji: '😢', label: 'Sad', color: '#6366f1' },
    { emoji: '😴', label: 'Tired', color: '#8b5cf6' },
];

const practices = [
    { title: 'Morning Pranayama', duration: '10 min', category: 'Breathwork', desc: 'Alternate nostril breathing to balance your energy channels.', icon: Wind, color: '#14532d' },
    { title: 'Loving-Kindness Meditation', duration: '15 min', category: 'Meditation', desc: 'Cultivate compassion for yourself and others through metta practice.', icon: Heart, color: '#d97706' },
    { title: 'Gratitude Journaling', duration: '5 min', category: 'Reflection', desc: 'Write three things you are grateful for to shift your perspective.', icon: PenLine, color: '#7c3aed' },
    { title: 'Chakra Visualization', duration: '20 min', category: 'Deep Practice', desc: 'Guide your awareness through each energy center for alignment.', icon: Sparkles, color: '#c9a227' },
];

const recommendations = {
    0: { text: "You're in a great space. Try a gratitude meditation to deepen this calm.", practice: 'Gratitude Journaling' },
    1: { text: 'Wonderful energy! Channel this joy into a loving-kindness meditation.', practice: 'Loving-Kindness Meditation' },
    2: { text: 'A balanced state. Pranayama can help you find deeper clarity.', practice: 'Morning Pranayama' },
    3: { text: "Let's ground that energy. Try breathwork to calm your nervous system.", practice: 'Morning Pranayama' },
    4: { text: 'Be gentle with yourself. A guided visualization can help shift your energy.', practice: 'Chakra Visualization' },
    5: { text: 'Rest is wisdom. Try a short breathing exercise to restore energy.', practice: 'Morning Pranayama' },
};

// Mala presets (standard bead counts)
const malas = [
    { label: '108', value: 108 },
    { label: '54', value: 54 },
    { label: '27', value: 27 },
    { label: 'Custom', value: 0 },
];

// ──────────── Japa Counter Component ────────────
const JapaCounter = () => {
    const [count, setCount] = useState(0);
    const [target, setTarget] = useState(108);
    const [customTarget, setCustomTarget] = useState('');
    const [selectedMala, setSelectedMala] = useState(108);
    const [totalMalas, setTotalMalas] = useState(0);
    const [soundOn, setSoundOn] = useState(true);
    const [showCustom, setShowCustom] = useState(false);
    const [shake, setShake] = useState(false);
    const [celebrate, setCelebrate] = useState(false);

    // Audio beep on each count
    const playClick = useCallback(() => {
        if (!soundOn) return;
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(440, ctx.currentTime);
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.15);
        } catch (_) { }
    }, [soundOn]);

    const playBell = useCallback(() => {
        if (!soundOn) return;
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            [523, 659, 784].forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
                gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.12);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.5);
                osc.start(ctx.currentTime + i * 0.12);
                osc.stop(ctx.currentTime + i * 0.12 + 0.5);
            });
        } catch (_) { }
    }, [soundOn]);

    const increment = () => {
        playClick();
        setCount(prev => {
            const next = prev + 1;
            if (next >= target) {
                setTotalMalas(m => m + 1);
                setCelebrate(true);
                playBell();
                setTimeout(() => { setCelebrate(false); setCount(0); }, 1800);
                return prev; // freeze count until celebrate finishes
            }
            return next;
        });
    };

    const decrement = () => {
        if (count === 0) { setShake(true); setTimeout(() => setShake(false), 400); return; }
        setCount(c => c - 1);
    };

    const reset = () => { setCount(0); };

    const fullReset = () => { setCount(0); setTotalMalas(0); };

    const handleMalaSelect = (val) => {
        if (val === 0) { setShowCustom(true); return; }
        setSelectedMala(val);
        setTarget(val);
        setShowCustom(false);
        setCount(0);
    };

    const applyCustomTarget = () => {
        const n = parseInt(customTarget, 10);
        if (n > 0) { setTarget(n); setSelectedMala(0); setCount(0); }
        setShowCustom(false);
    };

    const progress = target > 0 ? (count / target) * 100 : 0;
    const RADIUS = 70;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
    const strokeDash = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-8 sm:p-10"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', boxShadow: 'var(--shadow-lg)' }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                        <Bell size={22} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                            Japa Counter
                        </h2>
                        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                            Mantra repetition tracker — माला गणना
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setSoundOn(s => !s)}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                    style={{ background: soundOn ? 'var(--accent-soft)' : 'var(--bg-secondary)', color: soundOn ? 'var(--accent)' : 'var(--text-tertiary)' }}
                    title={soundOn ? 'Mute' : 'Unmute'}
                >
                    {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
            </div>

            {/* Mala Preset Selector */}
            <div className="flex flex-wrap gap-2 mb-8">
                {malas.map(m => (
                    <button
                        key={m.label}
                        onClick={() => handleMalaSelect(m.value)}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                        style={
                            (m.value === 0 ? showCustom : selectedMala === m.value)
                                ? { background: 'var(--accent)', color: '#fff', boxShadow: '0 4px 12px var(--accent-glow)' }
                                : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }
                        }
                    >
                        {m.label}
                    </button>
                ))}
            </div>

            {/* Custom Target Input */}
            <AnimatePresence>
                {showCustom && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex gap-3 mb-6 overflow-hidden"
                    >
                        <input
                            type="number"
                            min="1"
                            value={customTarget}
                            onChange={e => setCustomTarget(e.target.value)}
                            placeholder="Enter count (e.g. 21)"
                            className="input flex-1"
                            style={{ borderRadius: 'var(--radius-md)' }}
                            onKeyDown={e => e.key === 'Enter' && applyCustomTarget()}
                        />
                        <button onClick={applyCustomTarget} className="btn btn-primary btn-sm px-5">Set</button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Circular Progress Ring */}
            <div className="flex flex-col items-center mb-8">
                <div className="relative" style={{ width: 180, height: 180 }}>
                    <svg width="180" height="180" style={{ transform: 'rotate(-90deg)' }}>
                        {/* Background track */}
                        <circle cx="90" cy="90" r={RADIUS} fill="none" stroke="var(--border-primary)" strokeWidth="8" />
                        {/* Progress arc */}
                        <motion.circle
                            cx="90" cy="90" r={RADIUS}
                            fill="none"
                            stroke="var(--accent)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={CIRCUMFERENCE}
                            animate={{ strokeDashoffset: strokeDash }}
                            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                        />
                    </svg>

                    {/* Center Display */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <AnimatePresence mode="popLayout">
                            {celebrate ? (
                                <motion.div key="celebrate" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="text-4xl">
                                    🙏
                                </motion.div>
                            ) : (
                                <motion.div key={count} initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
                                    <div className="text-4xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                                        {count}
                                    </div>
                                    <div className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>/ {target}</div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Total Malas */}
                <div className="flex items-center gap-2 mt-4">
                    {Array.from({ length: Math.min(totalMalas, 10) }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ background: 'var(--accent)' }}
                        />
                    ))}
                    {totalMalas > 10 && (
                        <span className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>+{totalMalas - 10}</span>
                    )}
                    {totalMalas > 0 && (
                        <span className="text-xs ml-1" style={{ color: 'var(--text-tertiary)' }}>
                            {totalMalas} mala{totalMalas > 1 ? 's' : ''} complete
                        </span>
                    )}
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
                {/* Decrement */}
                <motion.button
                    animate={shake ? { x: [-5, 5, -5, 5, 0] } : {}}
                    transition={{ duration: 0.3 }}
                    onClick={decrement}
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1.5px solid var(--border-primary)' }}
                >
                    <Minus size={18} />
                </motion.button>

                {/* Main Tap Button */}
                <motion.button
                    whileTap={{ scale: 0.93 }}
                    onClick={increment}
                    disabled={celebrate}
                    className="w-24 h-24 rounded-full flex items-center justify-center font-bold text-white text-lg relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))', boxShadow: '0 6px 24px var(--accent-glow)', fontFamily: 'var(--font-display)' }}
                >
                    <span className="relative z-10">OM</span>
                    {/* Ripple on celebrate */}
                    <AnimatePresence>
                        {celebrate && (
                            <motion.div
                                key="ripple"
                                className="absolute inset-0 rounded-full"
                                initial={{ scale: 1, opacity: 0.4 }}
                                animate={{ scale: 2.5, opacity: 0 }}
                                exit={{}}
                                transition={{ duration: 0.8 }}
                                style={{ background: 'white' }}
                            />
                        )}
                    </AnimatePresence>
                </motion.button>

                {/* Reset current mala */}
                <button
                    onClick={reset}
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1.5px solid var(--border-primary)' }}
                    title="Reset current mala"
                >
                    <RotateCcw size={18} />
                </button>
            </div>

            {/* Full Reset */}
            <div className="flex justify-center mt-5">
                <button onClick={fullReset} className="text-xs transition-colors" style={{ color: 'var(--text-tertiary)' }}>
                    Reset all ({totalMalas} mala{totalMalas !== 1 ? 's' : ''}, {count} beads)
                </button>
            </div>

            {/* Instruction */}
            <p className="text-center text-xs mt-4" style={{ color: 'var(--text-tertiary)' }}>
                Tap <strong style={{ color: 'var(--accent)' }}>OM</strong> for each mantra repetition. Bell rings when one mala is complete. 🕉️
            </p>
        </motion.div>
    );
};

// ──────────── Main Wellness Component ────────────
const Wellness = () => {
    const [selectedMood, setSelectedMood] = useState(null);
    const [journalText, setJournalText] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showRec, setShowRec] = useState(false);
    const [activePractice, setActivePractice] = useState(null);
    const [savingsStatus, setSavingStatus] = useState('idle'); // idle, saving, saved
    const [reflectionHistory, setReflectionHistory] = useState([]);

    useEffect(() => {
        moodAPI.getAll().then(data => {
            if (data) {
                const history = data.map(item => ({
                    date: new Date(item.createdAt).toLocaleDateString(),
                    text: item.notes,
                    mood: item.mood
                }));
                setReflectionHistory(history);
            }
        }).catch(err => console.error("Failed to fetch mood history:", err));
    }, []);
    const heroRef = useRef(null);
    const moodRef = useRef(null);
    const practiceRef = useRef(null);
    const journalRef = useRef(null);
    const heroInView = useInView(heroRef, { once: true });
    const moodInView = useInView(moodRef, { once: true, margin: '-80px' });
    const practiceInView = useInView(practiceRef, { once: true, margin: '-80px' });
    const journalInView = useInView(journalRef, { once: true, margin: '-80px' });

    const handleMoodSelect = (i) => {
        setSelectedMood(i);
        setIsAnalyzing(true);
        setShowRec(false);
        // Simulate AI analysis depth
        setTimeout(() => {
            setIsAnalyzing(false);
            setShowRec(true);
        }, 1500);
    };

    return (
        <>
            <SEO title="Wellness — Inner Root" description="Japa counter, mood tracking, AI-guided recommendations, and reflection journaling." />

            {/* ── HERO ── */}
            <section ref={heroRef} className="relative overflow-hidden section-padding" style={{ paddingBottom: 'var(--sp-12)' }}>
                <div className="sacred-geometry" style={{ opacity: 0.02 }} />
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-semibold tracking-widest uppercase"
                            style={{ background: 'var(--forest-soft)', color: 'var(--forest)' }}>
                            <Heart size={14} /> Wellness Center
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5" style={{ fontFamily: 'var(--font-display)' }}>
                            Nurture Your <span className="text-gradient">Inner Peace</span>
                        </h1>
                        <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                            Japa counter, mood tracking, AI-guided practices, and daily reflection — all in one sacred space.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── JAPA COUNTER ── */}
            <section className="pb-8 px-6">
                <div className="max-w-3xl mx-auto">
                    <JapaCounter />

                    {/* Narrative Bridge */}
                    <motion.div
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                        className="mt-8 p-6 text-center rounded-2xl border border-dashed border-primary"
                        style={{ background: 'var(--accent-soft)' }}
                    >
                        <p className="text-sm font-medium italic" style={{ color: 'var(--text-secondary)' }}>
                            "After centering yourself with Japa, how is your emotional state? <span className="text-accent underline cursor-pointer" onClick={() => moodRef.current?.scrollIntoView({ behavior: 'smooth' })}>Track your mood below</span> to receive your next personalized practice."
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── MOOD INPUT ── */}
            <section ref={moodRef} className="pb-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={moodInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
                        className="rounded-3xl p-8 sm:p-10"
                        style={{ background: 'var(--bg-glass-strong)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid var(--border-glass)', boxShadow: 'var(--shadow-lg)' }}
                    >
                        <div className="text-center mb-8">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>How are you feeling?</h2>
                            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Select your current emotional state</p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            {moods.map((mood, i) => (
                                <motion.button
                                    key={mood.label}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleMoodSelect(i)}
                                    className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300"
                                    style={{
                                        background: selectedMood === i ? `${mood.color}15` : 'var(--bg-secondary)',
                                        outline: selectedMood === i ? `2px solid ${mood.color}` : '2px solid transparent',
                                        minWidth: 80,
                                    }}
                                >
                                    <span className="text-3xl">{mood.emoji}</span>
                                    <span className="text-xs font-medium" style={{ color: selectedMood === i ? mood.color : 'var(--text-tertiary)' }}>
                                        {mood.label}
                                    </span>
                                </motion.button>
                            ))}
                        </div>

                        {isAnalyzing && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-8 gap-3"
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                    className="w-8 h-8 rounded-full border-2 border-primary border-t-accent"
                                />
                                <p className="text-xs font-medium italic animate-pulse" style={{ color: 'var(--text-tertiary)' }}>
                                    AI is analyzing your vibrational state...
                                </p>
                            </motion.div>
                        )}

                        <AnimatePresence>
                            {showRec && selectedMood !== null && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }}
                                    exit={{ opacity: 0, y: -10, height: 0 }} transition={{ duration: 0.4 }}
                                    className="overflow-hidden"
                                >
                                    <div className="rounded-2xl p-6 mt-2 relative overflow-hidden" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)' }}>
                                        {/* Abstract background glow */}
                                        <div className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20" style={{ background: moods[selectedMood].color }} />

                                        <div className="flex items-center gap-2 mb-3">
                                            <Brain size={18} style={{ color: 'var(--accent)' }} />
                                            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--accent)' }}>AI Guided Discovery</span>
                                        </div>
                                        <p className="text-sm leading-relaxed mb-5 italic" style={{ color: 'var(--text-primary)' }}>
                                            "{recommendations[selectedMood]?.text} This practice will help realign your energy with your natural state of peace."
                                        </p>
                                        <div className="flex flex-col sm:flex-row items-center gap-4">
                                            <button
                                                onClick={() => {
                                                    const practiceTitle = recommendations[selectedMood]?.practice;
                                                    const practiceObj = practices.find(p => p.title === practiceTitle);
                                                    setActivePractice(practiceObj || practices[0]);
                                                }}
                                                className="btn btn-primary w-full sm:w-auto"
                                            >
                                                <Sparkles size={14} /> Begin Recommended Practice
                                            </button>
                                            <span className="text-[10px] font-bold uppercase tracking-wider opacity-40">
                                                Based on your {moods[selectedMood].label} mood
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* ── GUIDED PRACTICES ── */}
            <section ref={practiceRef} className="section-padding" style={{ paddingTop: 'var(--sp-8)' }}>
                <div className="max-w-5xl mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={practiceInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-10">
                        <span className="text-xs font-semibold tracking-widest uppercase mb-3 block" style={{ color: 'var(--accent)' }}>Guided Practices</span>
                        <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Curated for Your Journey</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {practices.map((p, i) => (
                            <motion.div
                                key={p.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={practiceInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                onClick={() => setActivePractice(p)}
                                className={`group card p-6 cursor-pointer transition-all ${recommendations[selectedMood]?.practice === p.title ? 'ring-2 ring-accent ring-offset-4 ring-offset-bg-primary' : ''}`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                                        style={{ background: `${p.color}12`, color: p.color }}>
                                        <p.icon size={22} strokeWidth={1.5} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${p.color}12`, color: p.color }}>{p.category}</span>
                                            <span className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--text-tertiary)' }}><Clock size={10} /> {p.duration}</span>
                                        </div>
                                        <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>{p.title}</h3>
                                        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{p.desc}</p>
                                        <div className="mt-3 flex items-center gap-1 text-xs font-medium transition-all duration-300 group-hover:gap-2" style={{ color: p.color }}>
                                            <span>Begin</span><ArrowRight size={12} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── REFLECTION JOURNAL ── */}
            <section ref={journalRef} className="section-padding">
                <div className="max-w-3xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={journalInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
                        className="rounded-3xl p-8 sm:p-10"
                        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', boxShadow: 'var(--shadow-lg)' }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                                <PenLine size={22} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>Today's Reflection</h2>
                                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>What's on your mind and heart?</p>
                            </div>
                        </div>

                        <div className="rounded-xl p-4 mb-5" style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-glow)' }}>
                            <p className="text-sm italic leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-display)', fontSize: 'var(--fs-lg)' }}>
                                "What am I grateful for today? What challenged me, and what did it teach?"
                            </p>
                        </div>

                        <textarea
                            value={journalText}
                            onChange={e => setJournalText(e.target.value)}
                            placeholder="Begin writing your reflection..."
                            rows={6}
                            className="input resize-none mb-5"
                            style={{ borderRadius: 'var(--radius-lg)' }}
                        />

                        <div className="flex items-center justify-between">
                            <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{journalText.length} characters</span>
                            <div className="flex items-center gap-3">
                                {!journalText.trim() && (
                                    <span className="text-[10px] italic opacity-50" style={{ color: 'var(--text-tertiary)' }}>
                                        Write your thoughts to save
                                    </span>
                                )}
                                <button
                                    className="btn btn-primary btn-sm"
                                    disabled={!journalText.trim() || savingsStatus === 'saving'}
                                    title={!journalText.trim() ? "Please write your reflection before saving" : "Click to save your reflection"}
                                    onClick={() => {
                                        setSavingStatus('saving');
                                        const moodEmoji = selectedMood !== null ? moods[selectedMood].emoji : '📝';
                                        moodAPI.save({
                                            mood: moodEmoji,
                                            notes: journalText,
                                            intensity: 5
                                        }).then(res => {
                                            setReflectionHistory([{
                                                date: 'Today',
                                                text: journalText,
                                                mood: moodEmoji
                                            }, ...reflectionHistory]);
                                            setJournalText('');
                                            setSavingStatus('saved');
                                            setTimeout(() => setSavingStatus('idle'), 3000);
                                        }).catch(err => {
                                            console.error("Failed to save mood:", err);
                                            setSavingStatus('idle');
                                        });
                                    }}
                                >
                                    {savingsStatus === 'saving' ? 'Saving...' : savingsStatus === 'saved' ? <><Check size={14} /> Saved</> : <><BookOpen size={14} /> Commit to Journal</>}
                                </button>
                            </div>
                        </div>

                        {/* Reflection History */}
                        <div className="mt-10 pt-8 border-t border-primary">
                            <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-tertiary)' }}>Recent History</h4>
                            <div className="space-y-3">
                                {reflectionHistory.map((item, idx) => (
                                    <div key={idx} className="p-3 rounded-lg border border-primary bg-secondary/30 flex gap-3 items-center">
                                        <div className="text-xl">{item.mood}</div>
                                        <div className="flex-1">
                                            <div className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{item.date}</div>
                                            <div className="text-[11px] line-clamp-1" style={{ color: 'var(--text-secondary)' }}>{item.text}</div>
                                        </div>
                                        <ChevronRight size={14} className="opacity-20" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── PRACTICE PLAYER MODAL ── */}
            <AnimatePresence>
                {activePractice && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md"
                            onClick={() => setActivePractice(null)}
                        />
                        <motion.div
                            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed bottom-0 left-0 right-0 z-[70] max-w-2xl mx-auto rounded-t-[2.5rem] p-8 sm:p-12"
                            style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border-primary)' }}
                        >
                            <button onClick={() => setActivePractice(null)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-secondary">
                                <X size={24} />
                            </button>

                            <div className="text-center mb-10">
                                <div className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center mb-6 shadow-xl"
                                    style={{ background: `${activePractice.color}15`, color: activePractice.color }}>
                                    <activePractice.icon size={40} />
                                </div>
                                <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>{activePractice.title}</h2>
                                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{activePractice.category} · {activePractice.duration}</p>
                            </div>

                            {/* Simulated Audio Controls */}
                            <div className="mb-10 p-6 rounded-2xl bg-secondary/50 border border-primary">
                                <div className="h-1.5 w-full bg-border-primary rounded-full overflow-hidden mb-4">
                                    <motion.div
                                        className="h-full bg-accent"
                                        initial={{ width: 0 }} animate={{ width: '35%' }}
                                    />
                                </div>
                                <div className="flex items-center justify-between text-[10px] font-bold tracking-widest uppercase mb-8" style={{ color: 'var(--text-tertiary)' }}>
                                    <span>03:42</span>
                                    <span>{activePractice.duration}</span>
                                </div>
                                <div className="flex items-center justify-center gap-8">
                                    <button className="p-2 opacity-50 hover:opacity-100"><RotateCcw size={20} /></button>
                                    <button className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                                    </button>
                                    <button className="p-2 opacity-100 text-accent"><Volume2 size={24} /></button>
                                </div>
                            </div>

                            <div className="text-center">
                                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                                    {activePractice.desc}
                                </p>
                                <button onClick={() => setActivePractice(null)} className="btn btn-secondary w-full">Close Session</button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Wellness;
