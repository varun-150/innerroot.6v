import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
    Heart, Brain, Sparkles, BookOpen, Wind, Sun,
    ChevronRight, Clock, Star, Flower2, ArrowRight,
    PenLine, Smile, Frown, Meh, Zap, Coffee,
    Plus, Minus, RotateCcw, Volume2, VolumeX, Bell,
    X, Check, Activity, Quote
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SEO from '../components/ui/SEO';
import { useAuth } from '../context/AuthContext';
import { moodAPI, japaAPI, wellnessAPI } from '../services/api';

// ──────────── Data ────────────
const moods = [
    { emoji: '😌', label: 'Calm', color: '#10b981' },
    { emoji: '😊', label: 'Happy', color: '#fbbf24' },
    { emoji: '😐', label: 'Neutral', color: '#94a3b8' },
    { emoji: '😟', label: 'Anxious', color: '#f59e0b' },
    { emoji: '😢', label: 'Sad', color: '#6366f1' },
    { emoji: '😴', label: 'Tired', color: '#8b5cf6' },
];

const practices = [
    { title: 'Morning Pranayama', duration: '10 min', category: 'Breathwork', desc: 'Alternate nostril breathing to balance your energy channels.', icon: Wind, color: '#f59e0b' },
    { title: 'Loving-Kindness Meditation', duration: '15 min', category: 'Meditation', desc: 'Cultivate compassion for yourself and others through metta practice.', icon: Heart, color: '#fbbf24' },
    { title: 'Gratitude Journaling', duration: '5 min', category: 'Reflection', desc: 'Write three things you are grateful for to shift your perspective.', icon: PenLine, color: '#8b5cf6' },
    { title: 'Chakra Visualization', duration: '20 min', category: 'Deep Practice', desc: 'Guide your awareness through each energy center for alignment.', icon: Sparkles, color: '#6366f1' },
];


// ──────────── Japa Counter Component ────────────
const JapaCounter = () => {
    const [count, setCount] = useState(0);
    const [totalMalas, setTotalMalas] = useState(0);
    const [celebrate, setCelebrate] = useState(false);
    const target = 108;

    useEffect(() => {
        japaAPI.getHistory().then(data => {
            if (data && Array.isArray(data)) {
                // Sum up malas from history if the backend returns a list
                const malas = data.reduce((acc, log) => acc + (log.totalMalas || 1), 0);
                setTotalMalas(malas);
            }
        }).catch(err => console.log("Note: Backend japa history not available. Using local state."));
    }, []);

    // We can use a simple Audio object or stick to a custom beep logic. 
    // For "Premium" feel, let's keep the sleek custom beep or use a placeholder sound URL if available.
    const playClick = useCallback(() => {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(440, ctx.currentTime);
            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.1);
        } catch (_) { }
    }, []);

    const playBell = useCallback(() => {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            [523, 659, 784].forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
                gain.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.12);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.5);
                osc.start(ctx.currentTime + i * 0.12);
                osc.stop(ctx.currentTime + i * 0.12 + 0.5);
            });
        } catch (_) { }
    }, []);

    const increment = () => {
        playClick();
        setCount(prev => {
            const next = prev + 1;
            if (next >= target) {
                setTotalMalas(m => m + 1);
                
                // --- Store in MySQL via Backend ---
                try {
                    japaAPI.save({
                        beadsCount: target,
                        totalMalas: 1,
                        mantra: "OM"
                    }).catch(err => console.error("Japa save failed:", err));
                } catch (err) {}

                setCelebrate(true);
                playBell();
                setTimeout(() => { setCelebrate(false); setCount(0); }, 1800);
                return prev; 
            }
            return next;
        });
    };

    const reset = () => { if (window.confirm('Reset current mala?')) setCount(0); };
    const fullReset = () => { if (window.confirm('Clear all progress?')) { setCount(0); setTotalMalas(0); } };

    return (
        <div className="card-8k shimmer-border p-10 sm:p-14 text-center relative overflow-hidden bg-surface/50 backdrop-blur-3xl">
            {/* Sacred Background Ornament */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-[0.03] pointer-events-none rotate-12">
                <Flower2 size={600} strokeWidth={0.5} />
            </div>
            
            <div className="relative z-10 mb-10">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-4 block">Mantra Resonance</span>
                <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter uppercase">Japa Studio</h2>
            </div>

            {/* Mala Progress Ring */}
            <div className="relative w-64 h-64 mx-auto mb-12 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="1" fill="transparent" className="text-white/5" />
                    <motion.circle
                        cx="128" cy="128" r="120" stroke="var(--accent)" strokeWidth="6" fill="transparent"
                        strokeDasharray={2 * Math.PI * 120}
                        animate={{ strokeDashoffset: (2 * Math.PI * 120) * (1 - count / target) }}
                        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                        strokeLinecap="round"
                        style={{ filter: 'drop-shadow(0 0 15px var(--accent))' }}
                    />
                </svg>

                <div className="text-center relative z-10">
                    <motion.div 
                        key={count} 
                        initial={{ scale: 0.8, opacity: 0 }} 
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-8xl font-display font-black text-white drop-shadow-2xl"
                    >
                        {count}
                    </motion.div>
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mt-2">of {target} beads</div>
                </div>
            </div>

            {/* Stats Row */}
            <div className="flex justify-center gap-12 mb-12 relative z-10">
                <div className="text-center">
                    <div className="text-2xl font-display font-black text-accent">{totalMalas}</div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-white/30">Total Malas</div>
                </div>
                <div className="w-[1px] h-10 bg-white/10 self-center" />
                <div className="text-center">
                    <div className="text-2xl font-display font-black text-white">{(totalMalas * target + count).toLocaleString()}</div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-white/30">Total Chants</div>
                </div>
            </div>

            {/* Control Group */}
            <div className="flex items-center justify-center gap-8 relative z-10">
                {/* Reset current mala */}
                <motion.button
                    whileHover={{ scale: 1.1, rotate: -10 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={reset}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all opacity-60 hover:opacity-100"
                    title="Reset current mala"
                >
                    <RotateCcw size={20} />
                </motion.button>

                {/* Main Tap Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={increment}
                    disabled={celebrate}
                    className="w-32 h-32 rounded-[2.5rem] flex items-center justify-center font-display font-black text-obsidian-pure text-2xl relative overflow-hidden shadow-amber-glow"
                    style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))' }}
                >
                    <span className="relative z-10">OM</span>
                    <AnimatePresence>
                        {celebrate && (
                            <motion.div
                                key="ripple"
                                className="absolute inset-0 bg-white"
                                initial={{ scale: 0, opacity: 0.8 }}
                                animate={{ scale: 3, opacity: 0 }}
                                transition={{ duration: 0.8 }}
                            />
                        )}
                    </AnimatePresence>
                </motion.button>

                {/* Info / Reset All */}
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={fullReset}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all opacity-60 hover:opacity-100"
                    title="Clear all progress"
                >
                    <Activity size={20} />
                </motion.button>
            </div>

            {/* Instruction */}
            <div className="mt-12 flex items-center justify-center gap-3 text-[10px] font-bold tracking-widest uppercase text-white/20">
                <div className="w-8 h-[1px] bg-white/10" />
                <span>Tap OM for each repetition</span>
                <div className="w-8 h-[1px] bg-white/10" />
            </div>
        </div>
    );
};

// ... (Wellness component continues below)


// ──────────── Main Wellness Component ────────────
const Wellness = () => {
    const [selectedMood, setSelectedMood] = useState(null);
    const [journalText, setJournalText] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showRec, setShowRec] = useState(false);
    const [aiRec, setAiRec] = useState({ text: '', practice: '' });
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

    // ── GSAP Staggered Entrance ──
    useGSAP(() => {
        if (practiceInView) {
            gsap.from(".practice-card", {
                y: 60,
                opacity: 0,
                duration: 1.5,
                stagger: 0.15,
                ease: "expo.out",
                rotateX: -15,
                perspective: 1000
            });
        }
    }, { scope: practiceRef, dependencies: [practiceInView] });

    const handleMoodSelect = async (i) => {
        const mood = moods[i];
        setSelectedMood(i);
        setIsAnalyzing(true);
        setShowRec(false);

        try {
            const data = await wellnessAPI.getRecommendation(mood.label, 5);
            setAiRec(data);
        } catch (error) {
            console.error("AI Recommendation failed:", error);
            setAiRec({ 
                text: "Your frequency is noted. Align yourself with traditional wisdom.", 
                practice: 'Morning Pranayama' 
            });
        } finally {
            setIsAnalyzing(false);
            setShowRec(true);
        }
    };

    return (
        <div className="bg-obsidian-pure min-h-screen">
            <SEO title="Wellness Sanctuary — Inner Root" description="Digital sanctuary for Japa, emotional frequency tracking, and sentient practice guidance." />

            {/* ── HERO ── */}
            <section ref={heroRef} className="relative overflow-hidden pt-36 pb-20">
                <div className="sacred-geometry opacity-5 scale-150 rotate-45" />
                <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
                        <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full mb-10 text-[10px] font-black tracking-[0.4em] uppercase border border-accent/20 bg-accent/10 text-accent">
                            <Heart size={14} className="fill-accent" /> Sanctuary Core
                        </span>
                        <h1 className="text-6xl sm:text-8xl md:text-9xl font-display font-black mb-10 tracking-tighter uppercase whitespace-pre-line leading-[0.9]">
                            Digital <span className="text-gradient">Zen</span>
                        </h1>
                        <p className="text-xl max-w-2xl mx-auto text-white/40 leading-relaxed font-heading">
                            Protocols for modern stillness. Synchronize your resonance through Japa and emotional mapping.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── JAPA COUNTER SECTION ── */}
            <section className="pb-32 px-6">
                <div className="max-w-4xl mx-auto">
                    <JapaCounter />

                    {/* Bridge Quote */}
                    <div className="mt-16 text-center">
                        <p className="text-2xl font-display italic text-white/50 max-w-2xl mx-auto leading-relaxed">
                            "When the mind is centered, the heart reflects the <span className="text-accent underline decoration-accent/30 underline-offset-8">emotional frequency</span> of the universe."
                        </p>
                    </div>
                </div>
            </section>

            {/* ── EMOTIONAL MAPPING ── */}
            <section ref={moodRef} className="pb-40 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="card-8k shimmer-border p-12 sm:p-24 bg-surface/50 backdrop-blur-3xl rounded-[4rem]">
                        <div className="text-center mb-24">
                            <span className="text-accent font-black uppercase text-[10px] tracking-[0.6em] mb-6 block">Soul Calibration</span>
                            <h2 className="text-5xl md:text-6xl font-display font-black tracking-tighter uppercase mb-6">Current State?</h2>
                            <div className="w-12 h-1 bg-accent/20 mx-auto" />
                        </div>

                        <div className="flex flex-wrap justify-center gap-8 mb-24">
                            {moods.map((mood, i) => (
                                <motion.button
                                    key={mood.label}
                                    whileHover={{ y: -10, scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleMoodSelect(i)}
                                    className="flex flex-col items-center gap-6 p-8 rounded-[2.5rem] transition-all duration-700 min-w-[140px] bg-white/5 border border-white/5 relative overflow-hidden group"
                                    style={{
                                        borderColor: selectedMood === i ? mood.color : 'rgba(255,255,255,0.05)',
                                        boxShadow: selectedMood === i ? `0 25px 50px ${mood.color}25` : 'none'
                                    }}
                                >
                                    {selectedMood === i && <div className="absolute inset-0 bg-current opacity-5 animate-pulse" style={{ color: mood.color }} />}
                                    <span className="text-6xl drop-shadow-2xl group-hover:rotate-12 transition-transform duration-700">{mood.emoji}</span>
                                    <span className="text-[11px] font-black uppercase tracking-[0.25em]" style={{ color: selectedMood === i ? mood.color : 'rgba(255,255,255,0.3)' }}>
                                        {mood.label}
                                    </span>
                                </motion.button>
                            ))}
                        </div>

                        {isAnalyzing && (
                            <div className="flex flex-col items-center justify-center py-16 gap-8">
                                <div className="relative w-20 h-20">
                                    <div className="absolute inset-0 border-t-2 border-accent rounded-full animate-spin" />
                                    <div className="absolute inset-2 border-r-2 border-white/10 rounded-full animate-spin-slow" />
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-[0.5em] italic text-accent animate-pulse">
                                    Scanning Emotional Resonance...
                                </p>
                            </div>
                        )}

                        <AnimatePresence>
                            {showRec && selectedMood !== null && (
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 40 }} transition={{ duration: 0.8, ease: "expo.out" }}
                                >
                                    <div className="rounded-[3rem] p-12 mt-10 relative overflow-hidden border border-accent/20 bg-accent/5 backdrop-blur-3xl">
                                        <div className="absolute -top-32 -right-32 w-80 h-80 blur-[120px] opacity-20 animate-pulse" style={{ background: moods[selectedMood].color }} />
                                        
                                        <div className="flex items-center gap-4 mb-10">
                                            <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent shadow-amber-glow">
                                                <Brain size={24} />
                                            </div>
                                            <span className="text-[11px] font-black tracking-[0.6em] uppercase text-accent">Sentient Re-Alignment</span>
                                        </div>
                                        <p className="text-3xl leading-[1.3] mb-12 italic font-display text-white/90">
                                            "{aiRec.text}"
                                        </p>
                                        <div className="flex flex-col sm:flex-row items-center gap-8">
                                            <button
                                                onClick={() => {
                                                    const practiceTitle = aiRec.practice;
                                                    const practiceObj = practices.find(p => p.title === practiceTitle);
                                                    setActivePractice(practiceObj || practices[0]);
                                                }}
                                                className="btn btn-primary px-14 py-6 w-full sm:w-auto text-[11px] font-black tracking-widest uppercase hover:scale-105 transition-transform"
                                            >
                                                Start {aiRec.practice}
                                            </button>
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full" style={{ background: moods[selectedMood].color }} />
                                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
                                                    Analysis Complete
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* ── PRACTICE GRID ── */}
            <section ref={practiceRef} className="pb-56 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-12">
                        <div className="max-w-2xl">
                            <span className="text-accent font-black uppercase text-[10px] tracking-[0.7em] mb-6 block">Available Protocols</span>
                            <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase leading-[0.9]">Sacred <span className="text-gradient">Immersion</span></h2>
                        </div>
                        <p className="text-xl text-white/30 font-heading max-w-sm text-right leading-relaxed">
                            Engineered sessions for absolute neuro-spiritual alignment.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        {practices.map((p, i) => (
                            <div
                                key={p.title}
                                onClick={() => setActivePractice(p)}
                                className={`practice-card group card-8k shimmer-border p-10 cursor-pointer transition-all hover-3d bg-surface/40 rounded-[3rem] ${aiRec?.practice === p.title ? 'ring-2 ring-accent shadow-amber-glow' : ''}`}
                            >
                                <div className="flex items-start gap-8">
                                    <div className="w-24 h-24 rounded-[2rem] bg-white/5 flex items-center justify-center flex-shrink-0 transition-all duration-700 group-hover:bg-accent/20 group-hover:scale-110 shadow-3xl"
                                        style={{ color: p.color }}>
                                        <p.icon size={44} strokeWidth={1} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-6">
                                            <span className="text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full bg-white/5 border border-white/10" style={{ color: p.color }}>{p.category}</span>
                                            <span className="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-widest"><Clock size={12} /> {p.duration}</span>
                                        </div>
                                        <h3 className="text-3xl font-display font-black tracking-tight mb-4 uppercase group-hover:text-accent transition-colors">{p.title}</h3>
                                        <p className="text-sm text-white/40 leading-relaxed font-medium mb-8 line-clamp-2">{p.desc}</p>
                                        <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] text-accent group-hover:gap-6 transition-all duration-700">
                                            <span>Initialize</span><ArrowRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── DAILY CHRONICLE ── */}
            <section ref={journalRef} className="pb-56 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="card-8k shimmer-border p-12 sm:p-24 bg-surface/50 backdrop-blur-3xl rounded-[4rem]">
                        <div className="flex flex-col md:flex-row items-center gap-10 mb-20 text-center md:text-left">
                            <div className="w-24 h-24 rounded-[2.5rem] bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shadow-amber-glow">
                                <PenLine size={44} strokeWidth={1.2} />
                            </div>
                            <div>
                                <h2 className="text-5xl font-display font-black uppercase tracking-tighter">Daily Chronicle</h2>
                                <p className="text-sm text-white/20 font-black uppercase tracking-[0.6em] mt-3">Mirror of the Digital Soul</p>
                            </div>
                        </div>

                        <div className="rounded-[2.5rem] p-12 mb-12 border border-accent/20 bg-accent/5 backdrop-blur-3xl relative overflow-hidden group">
                            <Quote size={80} className="absolute -top-6 -left-6 opacity-[0.03] text-accent group-hover:rotate-12 transition-transform duration-1000" />
                            <p className="text-2xl italic leading-relaxed text-white/80 font-display text-center px-10">
                                "What shadows were brought to light? What gratitude persists in your core frequency?"
                            </p>
                        </div>

                        <div className="relative group bg-obsidian-pure/60 border-2 border-white/5 rounded-[3rem] focus-within:border-accent/40 transition-all mb-10 overflow-hidden">
                            <textarea
                                value={journalText}
                                onChange={e => setJournalText(e.target.value)}
                                placeholder="Chronicle your frequency here..."
                                rows={8}
                                className="w-full bg-transparent p-12 text-xl text-white focus:outline-none placeholder:text-white/10 font-heading resize-none block"
                            />
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-10">
                            <div className="flex items-center gap-6">
                                <div className="h-2 w-48 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div className="h-full bg-accent" style={{ width: `${Math.min(journalText.length / 5, 100)}%` }} />
                                </div>
                                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">{journalText.length} Resonance Points</span>
                            </div>
                            
                            <button
                                className="btn btn-primary px-16 py-7 text-[11px] font-black tracking-[0.4em] uppercase disabled:opacity-30 transition-all hover:scale-105 active:scale-95"
                                disabled={!journalText.trim() || savingsStatus === 'saving'}
                                onClick={() => {
                                    setSavingStatus('saving');
                                    const moodEmoji = selectedMood !== null ? moods[selectedMood].emoji : '📝';
                                    moodAPI.save({ mood: moodEmoji, notes: journalText, intensity: 5 }).then(() => {
                                        setReflectionHistory([{ date: 'Present', text: journalText, mood: moodEmoji }, ...reflectionHistory]);
                                        setJournalText('');
                                        setSavingStatus('saved');
                                        setTimeout(() => setSavingStatus('idle'), 3000);
                                    }).catch(() => setSavingStatus('idle'));
                                }}
                            >
                                {savingsStatus === 'saving' ? 'Archiving...' : savingsStatus === 'saved' ? <><Check size={18} /> Committed</> : <><BookOpen size={18} /> Commit to Chronicle</>}
                            </button>
                        </div>

                        {/* History Archives */}
                        <div className="mt-24 pt-16 border-t border-white/5">
                            <span className="text-[10px] font-black uppercase tracking-[0.7em] text-white/10 mb-12 block">Resonance Archives</span>
                            <div className="space-y-6">
                                {reflectionHistory.map((item, idx) => (
                                    <motion.div 
                                        key={idx} 
                                        initial={{ opacity: 0, x: -30 }} 
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="p-8 rounded-[2rem] bg-white/5 border border-white/5 flex gap-10 items-center group hover:bg-white/10 transition-all cursor-pointer"
                                    >
                                        <div className="text-5xl filter drop-shadow-3xl group-hover:scale-110 transition-transform duration-700">{item.mood}</div>
                                        <div className="flex-1">
                                            <div className="text-[10px] font-black text-accent uppercase tracking-[0.5em] mb-2">{item.date}</div>
                                            <div className="text-lg font-medium text-white/30 group-hover:text-white/70 transition-colors line-clamp-1">{item.text}</div>
                                        </div>
                                        <ArrowRight size={24} className="text-white/5 group-hover:text-accent group-hover:translate-x-3 transition-all duration-500" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── PRACTICE PLAYER MODAL ── */}
            <AnimatePresence>
                {activePractice && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-obsidian-pure/90 backdrop-blur-3xl" onClick={() => setActivePractice(null)} />
                        <motion.div
                            initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '100%', opacity: 0 }}
                            transition={{ type: 'spring', damping: 35, stiffness: 200 }}
                            className="fixed bottom-0 left-0 right-0 z-[110] max-w-5xl mx-auto rounded-t-[5rem] p-16 sm:p-28 bg-surface border-t border-white/10"
                        >
                            <button onClick={() => setActivePractice(null)} className="absolute top-12 right-12 p-6 rounded-3xl bg-white/5 hover:bg-white/10 text-white/20 hover:text-white transition-all">
                                <X size={32} />
                            </button>

                            <div className="text-center mb-20">
                                <div className="w-32 h-32 rounded-[3.5rem] mx-auto flex items-center justify-center mb-12 shadow-amber-glow scale-125 transition-all" style={{ background: `${activePractice.color}15`, color: activePractice.color }}>
                                    <activePractice.icon size={64} strokeWidth={1} />
                                </div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.8em] text-accent mb-6">Neural Protocol Active</h4>
                                <h2 className="text-6xl font-display font-black uppercase tracking-tighter mb-6">{activePractice.title}</h2>
                                <p className="text-[11px] font-black uppercase tracking-[0.6em] text-white/10">{activePractice.category} · {activePractice.duration}</p>
                            </div>

                            <div className="mb-20 p-12 rounded-[4rem] bg-obsidian-pure/60 border border-white/5 shadow-inner relative overflow-hidden">
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-10">
                                    <motion.div className="h-full bg-accent shadow-[0_0_30px_var(--accent)]" initial={{ width: 0 }} animate={{ width: '42%' }} transition={{ duration: 5, ease: "linear" }} />
                                </div>
                                <div className="flex items-center justify-between text-[11px] font-black tracking-[0.6em] uppercase text-white/10 mb-16">
                                    <span>04:18.02</span>
                                    <span>{activePractice.duration}.00</span>
                                </div>
                                <div className="flex items-center justify-center gap-16">
                                    <button className="text-white/10 hover:text-white transition-all hover:rotate-[-30deg]"><RotateCcw size={40} /></button>
                                    <button className="w-32 h-32 rounded-[4rem] bg-accent text-obsidian-pure flex items-center justify-center shadow-amber-glow hover:scale-110 active:scale-95 transition-all group">
                                        <div className="w-0 h-0 border-t-[18px] border-t-transparent border-l-[30px] border-l-obsidian-pure border-b-[18px] border-b-transparent ml-3" />
                                    </button>
                                    <button className="text-accent hover:text-white transition-all"><Volume2 size={44} /></button>
                                </div>
                            </div>

                            <div className="text-center">
                                <p className="text-2xl text-white/30 font-heading leading-relaxed mb-16 italic px-20">
                                    "{activePractice.desc}"
                                </p>
                                <button onClick={() => setActivePractice(null)} className="btn btn-secondary px-20 py-8 rounded-3xl uppercase tracking-[0.6em] text-[10px] font-black hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all">Terminate Logic Session</button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Wellness;
