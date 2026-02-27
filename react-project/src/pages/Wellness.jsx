import React, { useState, useEffect } from 'react';
import { getWisdomQuotes, moodAPI } from '../services/api';
import { wisdomData as localWisdom } from '../data';
import { moodMessages } from '../data/wellnessData';
import { useAuth } from '../context/AuthContext';
import { Reveal, Stagger } from '../components/Reveal';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import {
    Smile, Frown, Sparkles, Coffee, Heart,
    Play, Pause, RotateCcw, Volume2,
    Clock, Award, Flame, Star, Quote,
    ChevronRight, Music
} from 'lucide-react';

const MANTRAS = [
    { name: 'Om Namah Shivaya', meaning: 'I bow to the divinity within myself.' },
    { name: 'Om Mani Padme Hum', meaning: 'The jewel is in the lotus.' },
    { name: 'Gayatri Mantra', meaning: 'Divine light that enlightens the intellect.' },
    { name: 'Hare Krishna', meaning: 'Ultimate peace and divine love.' },
    { name: 'Custom', meaning: 'Your personal focal point or affirmation.' },
];

const TOTAL_BEADS = 108;

const Wellness = () => {
    const [mood, setMood] = useState(null);
    const [moodMessage, setMoodMessage] = useState('');
    const [wisdomData, setWisdomData] = useState([]);
    const [timerSeconds, setTimerSeconds] = useState(600);
    const [timerRunning, setTimerRunning] = useState(false);
    const [beadCount, setBeadCount] = useState(0);
    const [rounds, setRounds] = useState(0);
    const [selectedMantra, setSelectedMantra] = useState(0);
    const [showCelebration, setShowCelebration] = useState(false);
    const [pulsing, setPulsing] = useState(false);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchWisdom = async () => {
            try {
                const response = await getWisdomQuotes();
                const data = Array.isArray(response.data) && response.data.length > 0
                    ? response.data
                    : localWisdom;
                setWisdomData(data);
            } catch (err) {
                console.error('Failed to fetch wisdom data:', err);
                setWisdomData(localWisdom);
            }
        };
        fetchWisdom();
    }, []);

    useEffect(() => {
        let interval = null;
        if (timerRunning && timerSeconds > 0) {
            interval = setInterval(() => {
                setTimerSeconds(s => s - 1);
            }, 1000);
        } else if (timerSeconds === 0) {
            setTimerRunning(false);
        }
        return () => clearInterval(interval);
    }, [timerRunning, timerSeconds]);

    const handleMoodClick = async (selectedMood) => {
        setMood(selectedMood);
        setMoodMessage(moodMessages[selectedMood]);
        
        if (isAuthenticated) {
            try {
                await moodAPI.save({ 
                    mood: selectedMood, 
                    intensity: 5, // Default intensity
                    note: `Feeling ${selectedMood} during wellness session.`
                });
            } catch (err) {
                console.error('Failed to save mood:', err);
            }
        }
    };

    const toggleTimer = () => setTimerRunning(!timerRunning);
    const resetTimer = () => {
        setTimerRunning(false);
        setTimerSeconds(600);
    };

    const setPreset = (mins) => {
        setTimerRunning(false);
        setTimerSeconds(mins * 60);
    };

    const timeDisplay = `${Math.floor(timerSeconds / 60)}:${(timerSeconds % 60).toString().padStart(2, '0')}`;
    const offset = 565.48 - (timerSeconds / 600) * 565.48;

    const handleBeadClick = () => {
        setPulsing(true);
        setTimeout(() => setPulsing(false), 150);

        if (beadCount + 1 >= TOTAL_BEADS) {
            setBeadCount(0);
            setRounds(r => r + 1);
            setShowCelebration(true);
            setTimeout(() => setShowCelebration(false), 3000);
        } else {
            setBeadCount(b => b + 1);
        }
    };

    const beadProgress = beadCount / TOTAL_BEADS;
    const beadCircumference = 2 * Math.PI * 110;
    const beadOffset = beadCircumference - beadProgress * beadCircumference;

    return (
        <section id="page-wellness" className="page active block opacity-100" aria-label="Spiritual Wellness">
            <div className="py-12 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Breadcrumbs />

                    {/* Header */}
                    <Reveal className="text-center mb-24 mt-12 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-heritage-teal/5 blur-[120px] pointer-events-none"></div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-heritage-teal/10 backdrop-blur-md border border-heritage-teal/20 text-heritage-teal font-bold text-xs uppercase tracking-[0.2em] mb-10">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Sanctuary of Peace</span>
                        </div>
                        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold text-[var(--fg)] mb-8 tracking-tighter leading-[0.9]">
                            Heal Your <br />
                            <span className="text-heritage-teal">Inner Temple</span>
                        </h1>
                        <p className="text-[var(--muted)] max-w-2xl mx-auto text-xl leading-relaxed italic font-medium">
                            "When the mind is still, the entire universe surrenders." — Lao Tzu
                        </p>
                    </Reveal>

                    {/* Mood Tracker */}
                    <Reveal className="mb-16">
                        <Card className="p-8 sm:p-12 !rounded-[40px] border-[var(--border)] shadow-2xl relative overflow-hidden bg-gradient-to-br from-[var(--bg)] to-transparent">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-heritage-teal/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                            <h2 className="font-display text-3xl font-bold text-[var(--fg)] mb-8 flex items-center gap-3">
                                <Heart className="text-red-500 w-8 h-8" />
                                How is your spirit today?
                            </h2>
                            <div className="flex flex-wrap gap-6 mb-10">
                                {[
                                    { k: 'peaceful', icon: Smile, color: 'bg-heritage-teal/10 text-heritage-teal' },
                                    { k: 'anxious', icon: Frown, color: 'bg-yellow-500/10 text-yellow-600' },
                                    { k: 'joyful', icon: Star, color: 'bg-heritage-gold/10 text-heritage-gold' },
                                    { k: 'tired', icon: Coffee, color: 'bg-blue-500/10 text-blue-600' },
                                    { k: 'inspired', icon: Sparkles, color: 'bg-purple-500/10 text-purple-600' }
                                ].map(({ icon: Icon, ...m }) => (
                                    <button
                                        key={m.k}
                                        onClick={() => handleMoodClick(m.k)}
                                        className={`group flex flex-col items-center gap-4 transition-all duration-300 ${mood === m.k ? 'scale-110' : 'hover:scale-105 opacity-60 hover:opacity-100'}`}
                                    >
                                        <div className={`w-20 h-20 rounded-[28px] ${m.color} flex items-center justify-center border-2 ${mood === m.k ? 'border-current' : 'border-transparent shadow-lg'} transition-all`}>
                                            <Icon className="w-10 h-10" />
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">{m.k}</span>
                                    </button>
                                ))}
                            </div>
                            {moodMessage && (
                                <div className="bg-heritage-teal/5 border border-heritage-teal/20 p-6 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <p className="text-lg text-[var(--fg)] leading-relaxed italic flex items-start gap-4">
                                        <Quote className="w-6 h-6 text-heritage-teal flex-shrink-0" />
                                        {moodMessage}
                                    </p>
                                </div>
                            )}
                        </Card>
                    </Reveal>

                    {/* Meditation Tools */}
                    <div className="grid lg:grid-cols-2 gap-12 mb-16">
                        {/* Audio Chanting */}
                        <Reveal>
                            <Card className="p-0 overflow-hidden !rounded-[40px] group shadow-xl h-full" animate={false}>
                                <div className="aspect-[16/10] relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-heritage-teal to-heritage-green"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Button
                                            variant="unstyled"
                                            className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110 shadow-2xl"
                                        >
                                            <Play className="w-10 h-10 text-white fill-white ml-2" />
                                        </Button>
                                    </div>
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-5 border border-white/10 flex items-center justify-between">
                                            <div>
                                                <div className="text-white font-display text-xl font-bold mb-1">Om Namah Shivaya</div>
                                                <div className="text-white/70 text-sm font-medium tracking-wide uppercase">Traditional Chanting</div>
                                            </div>
                                            <Volume2 className="text-white/60 w-6 h-6" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="font-display text-2xl font-bold text-[var(--fg)] mb-4">Sacred Soundscapes</h3>
                                    <p className="text-[var(--muted)] text-lg mb-8 leading-relaxed">Experience the transformative vibrations of ancient Sanskrit mantras. Let the rhythm guide you into deep stillness.</p>
                                    <div className="flex items-center gap-6 text-sm font-bold text-heritage-teal uppercase tracking-widest">
                                        <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 15 MIN</span>
                                        <span className="flex items-center gap-2"><Music className="w-4 h-4" /> BINAURAL</span>
                                    </div>
                                </div>
                            </Card>
                        </Reveal>

                        {/* Meditation Timer */}
                        <Reveal>
                            <Card className="p-10 !rounded-[40px] shadow-xl h-full flex flex-col items-center justify-center border-[var(--border)]" animate={true}>
                                <h3 className="font-display text-2xl font-bold text-[var(--fg)] mb-10">Mindfulness Timer</h3>
                                <div className="relative mb-12">
                                    <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 200 200">
                                        <circle cx="100" cy="100" r="90" fill="none" stroke="var(--border)" strokeWidth="4" opacity="0.1" />
                                        <circle
                                            cx="100" cy="100" r="90" fill="none"
                                            stroke="var(--accent)" strokeWidth="6"
                                            strokeDasharray="565.48"
                                            strokeDashoffset={offset}
                                            strokeLinecap="round"
                                            className="transition-all duration-1000 ease-linear shadow-accent shadow-2xl"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                        <span className="font-display text-6xl font-bold text-[var(--fg)] tabular-nums mb-1">{timeDisplay}</span>
                                        <span className="text-[var(--muted)] text-xs font-bold uppercase tracking-widest">Remaining</span>
                                    </div>
                                </div>

                                <div className="flex gap-2 mb-8">
                                    {[5, 10, 20].map(m => (
                                        <button
                                            key={m}
                                            onClick={() => setPreset(m)}
                                            className={`px-4 py-2 rounded-xl border-2 font-bold text-xs transition-all ${timerSeconds === m * 60 ? 'bg-heritage-teal border-heritage-teal text-white' : 'border-[var(--border)] text-[var(--muted)] hover:border-heritage-teal/30'}`}
                                        >
                                            {m}m
                                        </button>
                                    ))}
                                </div>

                                <div className="flex gap-4 w-full max-w-sm">
                                    <Button
                                        className="flex-1 text-lg py-6"
                                        onClick={toggleTimer}
                                        leftIcon={timerRunning ? Pause : Play}
                                    >
                                        {timerRunning ? 'Pause' : 'Start Session'}
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        className="px-6 py-6"
                                        onClick={resetTimer}
                                        leftIcon={RotateCcw}
                                    />
                                </div>
                            </Card>
                        </Reveal>
                    </div>

                    {/* Japa Mala Counter */}
                    <Reveal className="mb-16">
                        <Card className="p-8 sm:p-12 !rounded-[40px] border-[var(--border)] shadow-2xl overflow-hidden relative" animate={false}>
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-heritage-gold via-heritage-goldLight to-heritage-gold"></div>
                            <div className="flex flex-col lg:flex-row gap-16 items-center">
                                {/* Mala Ring Visual */}
                                <div className="relative group">
                                    {showCelebration && (
                                        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                            <div className="text-center animate-bounce-slow">
                                                <Award className="w-16 h-16 text-heritage-gold mb-2 drop-shadow-2xl" />
                                                <div className="text-heritage-gold font-display font-bold text-xl bg-white/90 backdrop-blur-md px-6 py-2 rounded-2xl shadow-2xl border border-heritage-gold/20">
                                                    Round {rounds} Complete!
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <svg className="w-72 h-72 sm:w-96 sm:h-96" viewBox="0 0 240 240">
                                        <circle cx="120" cy="120" r="110" fill="none" stroke="var(--border)" strokeWidth="2" opacity="0.1" />
                                        <circle
                                            cx="120" cy="120" r="110" fill="none"
                                            stroke="url(#malaGradient)" strokeWidth="8"
                                            strokeDasharray={beadCircumference}
                                            strokeDashoffset={beadOffset}
                                            strokeLinecap="round"
                                            transform="rotate(-90 120 120)"
                                            className="transition-all duration-300 ease-out"
                                        />
                                        <defs>
                                            <linearGradient id="malaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#c9a227" />
                                                <stop offset="50%" stopColor="#efd47a" />
                                                <stop offset="100%" stopColor="#c9a227" />
                                            </linearGradient>
                                            <filter id="glow">
                                                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                                                <feMerge>
                                                    <feMergeNode in="coloredBlur" />
                                                    <feMergeNode in="SourceGraphic" />
                                                </feMerge>
                                            </filter>
                                        </defs>

                                        {/* Current Bead Ghost */}
                                        {(() => {
                                            const angle = (beadCount / TOTAL_BEADS) * 360 - 90;
                                            const rad = (angle * Math.PI) / 180;
                                            const x = 120 + 110 * Math.cos(rad);
                                            const y = 120 + 110 * Math.sin(rad);
                                            return (
                                                <circle cx={x} cy={y} r="10" fill="#efd47a" filter="url(#glow)" className="animate-pulse" />
                                            );
                                        })()}
                                        {/* Quarter Markers */}
                                        {[0, 27, 54, 81].map((pos, i) => {
                                            const angle = (pos / TOTAL_BEADS) * 360 - 90;
                                            const rad = (angle * Math.PI) / 180;
                                            const x = 120 + 110 * Math.cos(rad);
                                            const y = 120 + 110 * Math.sin(rad);
                                            return (
                                                <circle key={i} cx={x} cy={y} r="4" fill={beadCount > pos ? '#c9a227' : 'var(--border)'} opacity={beadCount > pos ? 1 : 0.3} className="transition-all duration-500" />
                                            );
                                        })}
                                    </svg>

                                    <button
                                        onClick={handleBeadClick}
                                        className={`absolute inset-0 m-auto w-48 h-48 sm:w-64 sm:h-64 rounded-full
                                            bg-gradient-to-br from-white/90 to-heritage-gold/5
                                            border-4 border-heritage-gold/30 backdrop-blur-sm
                                            flex flex-col items-center justify-center shadow-[0_20px_50px_rgba(201,162,39,0.15)]
                                            hover:border-heritage-gold/50 active:scale-95 transition-all duration-200
                                            ${pulsing ? 'scale-[0.97] border-heritage-gold/80 bg-heritage-gold/10' : ''}`}
                                    >
                                        <span className="font-display text-7xl sm:text-9xl font-bold text-heritage-gold tabular-nums leading-none mb-2">
                                            {beadCount}
                                        </span>
                                        <div className="flex flex-col items-center gap-1">
                                            <span className="text-xs font-bold text-[var(--muted)] uppercase tracking-[0.2em]">Bead Counter</span>
                                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-heritage-gold/10 text-heritage-gold text-[10px] font-bold uppercase">
                                                <Flame className="w-3 h-3" /> Round {rounds + 1}
                                            </div>
                                        </div>
                                    </button>
                                </div>

                                {/* Counter Controls & Info */}
                                <div className="flex-1 w-full lg:max-w-md">
                                    <div className="mb-10 text-center lg:text-left">
                                        <h3 className="font-display text-4xl font-bold text-[var(--fg)] mb-4 flex lg:justify-start justify-center items-center gap-3">
                                            📿 Japa Mala
                                        </h3>
                                        <p className="text-[var(--muted)] text-lg leading-relaxed">
                                            Focus your intention. Tap the central bead with each sacred chant to complete your spiritual cycle.
                                        </p>
                                    </div>

                                    {/* Mantra Cards */}
                                    <div className="mb-10">
                                        <label className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest mb-4 block">Selected Mantra</label>
                                        <div className="grid grid-cols-1 gap-3">
                                            {MANTRAS.map((m, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setSelectedMantra(i)}
                                                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 ${selectedMantra === i
                                                        ? 'bg-heritage-gold/5 border-heritage-gold shadow-lg shadow-heritage-gold/5'
                                                        : 'border-[var(--border)] hover:border-heritage-gold/30 hover:bg-heritage-gold/5 opacity-60'
                                                        }`}
                                                >
                                                    <div className="text-left">
                                                        <div className={`font-bold transition-all ${selectedMantra === i ? 'text-heritage-gold scale-105' : 'text-[var(--fg)]'}`}>{m.name}</div>
                                                        {selectedMantra === i && <div className="text-xs text-heritage-gold/70 mt-1 italic leading-tight">{m.meaning}</div>}
                                                    </div>
                                                    {selectedMantra === i && <ChevronRight className="w-5 h-5 text-heritage-gold" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-10">
                                        <div className="p-6 rounded-3xl bg-[var(--bg)] border border-[var(--border)] shadow-sm">
                                            <div className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest mb-2">Total Chants</div>
                                            <div className="text-3xl font-display font-bold text-[var(--fg)]">{rounds * 108 + beadCount}</div>
                                        </div>
                                        <div className="p-6 rounded-3xl bg-[var(--bg)] border border-[var(--border)] shadow-sm">
                                            <div className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest mb-2">Completion</div>
                                            <div className="text-3xl font-display font-bold text-heritage-teal">{Math.round((beadProgress + rounds) * 100)}%</div>
                                        </div>
                                    </div>

                                    <Button
                                        variant="secondary"
                                        className="w-full py-5 text-lg !border-red-500/10 hover:!bg-red-500/5 !text-red-500"
                                        onClick={() => { setBeadCount(0); setRounds(0); }}
                                        leftIcon={RotateCcw}
                                    >
                                        Reset Spiritual Progress
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </Reveal>

                    {/* Daily Wisdom Stagger */}
                    <Reveal>
                        <h3 className="font-display text-4xl font-bold text-[var(--fg)] mb-12 flex items-center gap-4">
                            <Quote className="text-heritage-gold w-10 h-10" />
                            Ancient Wisdom for Modern Spirits
                        </h3>
                        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {wisdomData.map((w) => (
                                <Card key={w.id} variant="glass" className="p-8 !rounded-[32px] hover:scale-105 transition-transform duration-500 h-full flex flex-col justify-between border-[var(--border)]">
                                    <div className="space-y-6">
                                        <Quote className="w-8 h-8 text-heritage-teal/30" />
                                        <p className="text-[var(--fg)] text-xl font-medium leading-relaxed italic">"{w.quote}"</p>
                                    </div>
                                    <div className="mt-10 pt-6 border-t border-[var(--border)] flex justify-between items-center">
                                        <span className="text-sm font-bold text-[var(--muted)]">{w.source}</span>
                                        <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-heritage-teal/10 text-heritage-teal uppercase tracking-widest border border-heritage-teal/10">{w.theme}</span>
                                    </div>
                                </Card>
                            ))}
                        </Stagger>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default Wellness;
