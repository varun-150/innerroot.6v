import React, { useState, useEffect } from 'react';
import { getWisdomQuotes } from '../services/api';
import { moodMessages } from '../data/wellnessData';
import { Reveal } from '../components/Reveal';

const MANTRAS = [
    { name: 'Om Namah Shivaya', meaning: 'Om Namah Shivaya' },
    { name: 'Om Mani Padme Hum', meaning: 'The jewel is in the lotus' },
    { name: 'Hare Krishna', meaning: 'Praise to Lord Krishna' },
    { name: 'Om Namo Bhagavate Vasudevaya', meaning: 'Om Namo Bhagavate Vasudevaya' },
    { name: 'Gayatri Mantra', meaning: 'Enlighten our intellect' },
    { name: 'Custom', meaning: 'Your personal mantra' },
];

const TOTAL_BEADS = 108;

const Wellness = () => {
    const [mood, setMood] = useState(null);
    const [moodMessage, setMoodMessage] = useState('');
    const [wisdomData, setWisdomData] = useState([]);

    // Timer State
    const [timerSeconds, setTimerSeconds] = useState(600);
    const [timerRunning, setTimerRunning] = useState(false);

    // Chanting Counter State
    const [beadCount, setBeadCount] = useState(0);
    const [rounds, setRounds] = useState(0);
    const [selectedMantra, setSelectedMantra] = useState(0);
    const [showCelebration, setShowCelebration] = useState(false);
    const [lastClickTime, setLastClickTime] = useState(null);
    const [pulsing, setPulsing] = useState(false);

    useEffect(() => {
        const fetchWisdom = async () => {
            try {
                const data = await wisdomAPI.getAll();
                setWisdomData(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Failed to fetch wisdom data:', err);
                setWisdomData([]);
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
            setTimerSeconds(600); // Reset or stop
        }
        return () => clearInterval(interval);
    }, [timerRunning, timerSeconds]);

    const handleMoodClick = (selectedMood) => {
        setMood(selectedMood);
        setMoodMessage(moodMessages[selectedMood]);
    };

    const toggleTimer = () => {
        if (timerRunning) {
            setTimerRunning(false);
        } else {
            setTimerRunning(true);
        }
    };

    const resetTimer = () => {
        setTimerRunning(false);
        setTimerSeconds(600);
    };

    // Format time
    const mins = Math.floor(timerSeconds / 60);
    const secs = timerSeconds % 60;
    const timeDisplay = `${mins}:${secs.toString().padStart(2, '0')}`;

    // Progress Ring
    const circumference = 565.48;
    const offset = circumference - (timerSeconds / 600) * circumference;

    // Chanting Counter
    const handleBeadClick = () => {
        setPulsing(true);
        setTimeout(() => setPulsing(false), 200);
        setLastClickTime(Date.now());

        if (beadCount + 1 >= TOTAL_BEADS) {
            // Completed a round!
            setBeadCount(0);
            setRounds(r => r + 1);
            setShowCelebration(true);
            setTimeout(() => setShowCelebration(false), 3000);
        } else {
            setBeadCount(b => b + 1);
        }
    };

    const resetCounter = () => {
        setBeadCount(0);
        setRounds(0);
        setShowCelebration(false);
    };

    const beadProgress = beadCount / TOTAL_BEADS;
    const beadCircumference = 2 * Math.PI * 110;
    const beadOffset = beadCircumference - beadProgress * beadCircumference;

    return (
        <section id="page-wellness" className="page active block opacity-100">
            <div className="py-12 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <Reveal className="text-center mb-12">
                        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[var(--fg)] mb-4">Spiritual Wellness</h1>
                        <p className="text-[var(--muted)] max-w-2xl mx-auto">
                            Meditation, chanting guides, and emotional balance tools.
                        </p>
                    </Reveal>

                    {/* Mood Tracker */}
                    <Reveal className="heritage-card p-6 sm:p-8 mb-12">
                        <h2 className="font-display text-2xl font-bold text-[var(--fg)] mb-6">How are you feeling today?</h2>
                        <div className="flex flex-wrap gap-4 mb-6" id="moodTracker">
                            {[
                                { k: 'peaceful', i: '&#9775;' },
                                { k: 'anxious', i: '&#9888;' },
                                { k: 'joyful', i: '&#9786;' },
                                { k: 'tired', i: '&#9764;' },
                                { k: 'inspired', i: '&#10024;' }
                            ].map(m => (
                                <button
                                    key={m.k}
                                    className={`mood-btn ${mood === m.k ? 'selected' : ''}`}
                                    onClick={() => handleMoodClick(m.k)}
                                    aria-label={m.k.charAt(0).toUpperCase() + m.k.slice(1)}
                                >
                                    <span className="text-2xl" dangerouslySetInnerHTML={{ __html: m.i }}></span>
                                </button>
                            ))}
                        </div>
                        <div id="moodMessage" className="text-[var(--muted)] italic">{moodMessage}</div>
                    </Reveal>

                    {/* Meditation Guides */}
                    <div className="grid lg:grid-cols-2 gap-8 mb-12">
                        {/* Chanting Guide */}
                        <Reveal className="heritage-card">
                            <div className="aspect-video bg-gradient-to-br from-heritage-green to-heritage-teal relative rounded-t-2xl">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <button className="w-20 h-20 rounded-full bg-heritage-cream/20 backdrop-blur-sm flex items-center justify-center hover:bg-heritage-cream/30 transition-colors group" aria-label="Play chanting audio">
                                        <svg className="w-10 h-10 text-heritage-cream group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="bg-heritage-cream/10 backdrop-blur-sm rounded-lg p-4">
                                        <div className="text-heritage-cream font-display text-lg font-bold">Om Namah Shivaya</div>
                                        <div className="text-heritage-cream/70 text-sm">Traditional Chanting</div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="font-display text-xl font-bold text-[var(--fg)] mb-2">Sacred Chanting</h3>
                                <p className="text-[var(--muted)] text-sm mb-4">Experience the calming power of ancient Sanskrit mantras. Let the vibrations bring peace to your mind.</p>
                                <div className="flex items-center gap-4 text-sm text-[var(--muted)]">
                                    <span>Duration: 15 min</span>
                                    <span>&#8226;</span>
                                    <span>Beginner friendly</span>
                                </div>
                            </div>
                        </Reveal>

                        {/* Meditation Timer */}
                        <Reveal className="heritage-card p-6">
                            <h3 className="font-display text-xl font-bold text-[var(--fg)] mb-6">Meditation Timer</h3>
                            <div className="flex flex-col items-center">
                                <div className="relative mb-6">
                                    <svg className="progress-ring w-48 h-48" viewBox="0 0 200 200">
                                        <circle cx="100" cy="100" r="90" fill="none" stroke="var(--border)" strokeWidth="8" />
                                        <circle
                                            cx="100" cy="100" r="90" fill="none" stroke="var(--accent)" strokeWidth="8"
                                            strokeDasharray="565.48"
                                            strokeDashoffset={offset}
                                            strokeLinecap="round"
                                            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="font-display text-4xl font-bold text-[var(--fg)]">{timeDisplay}</span>
                                        <span className="text-[var(--muted)] text-sm">minutes</span>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button className="btn-primary" onClick={toggleTimer}>
                                        {timerRunning ? 'Pause' : 'Start Session'}
                                    </button>
                                    <button className="btn-secondary" onClick={resetTimer}>Reset</button>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Japa Mala - Chanting Counter */}
                    <Reveal className="heritage-card p-6 sm:p-8 mb-12">
                        <div className="flex flex-col lg:flex-row gap-8 items-center">
                            {/* Counter Visual */}
                            <div className="flex-shrink-0">
                                <div className="relative">
                                    {/* Celebration effect */}
                                    {showCelebration && (
                                        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                            <div className="text-center animate-bounce">
                                                <div className="text-4xl mb-1">🎉</div>
                                                <div className="text-heritage-gold font-display font-bold text-lg bg-[var(--card)]/90 backdrop-blur-sm px-4 py-1 rounded-full shadow-lg">
                                                    Round {rounds} Complete!
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Mala Ring */}
                                    <svg className="w-64 h-64 sm:w-72 sm:h-72" viewBox="0 0 240 240">
                                        {/* Background ring */}
                                        <circle
                                            cx="120" cy="120" r="110"
                                            fill="none"
                                            stroke="var(--border)"
                                            strokeWidth="6"
                                            opacity="0.3"
                                        />
                                        {/* Progress ring */}
                                        <circle
                                            cx="120" cy="120" r="110"
                                            fill="none"
                                            stroke="url(#malaGradient)"
                                            strokeWidth="6"
                                            strokeDasharray={beadCircumference}
                                            strokeDashoffset={beadOffset}
                                            strokeLinecap="round"
                                            transform="rotate(-90 120 120)"
                                            style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                                        />
                                        {/* Gradient definition */}
                                        <defs>
                                            <linearGradient id="malaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#c9a227" />
                                                <stop offset="50%" stopColor="#e8c547" />
                                                <stop offset="100%" stopColor="#c9a227" />
                                            </linearGradient>
                                        </defs>
                                        {/* Bead markers (show every 27th bead = quarter marks) */}
                                        {[0, 27, 54, 81].map((pos, i) => {
                                            const angle = (pos / TOTAL_BEADS) * 360 - 90;
                                            const rad = (angle * Math.PI) / 180;
                                            const x = 120 + 110 * Math.cos(rad);
                                            const y = 120 + 110 * Math.sin(rad);
                                            const filled = beadCount > pos;
                                            return (
                                                <circle
                                                    key={i}
                                                    cx={x} cy={y} r="5"
                                                    fill={filled ? '#c9a227' : 'var(--border)'}
                                                    stroke={filled ? '#e8c547' : 'none'}
                                                    strokeWidth="1"
                                                    style={{ transition: 'fill 0.3s ease' }}
                                                />
                                            );
                                        })}
                                    </svg>

                                    {/* Center button */}
                                    <button
                                        onClick={handleBeadClick}
                                        className={`absolute inset-0 m-auto w-40 h-40 sm:w-44 sm:h-44 rounded-full
                                            bg-gradient-to-br from-heritage-gold/20 to-heritage-gold/5
                                            border-2 border-heritage-gold/40 backdrop-blur-sm
                                            flex flex-col items-center justify-center
                                            hover:from-heritage-gold/30 hover:to-heritage-gold/10 hover:border-heritage-gold/60
                                            active:scale-95 transition-all duration-150 cursor-pointer
                                            ${pulsing ? 'scale-95 shadow-lg shadow-heritage-gold/30' : ''}
                                            ${showCelebration ? 'ring-4 ring-heritage-gold/50 ring-offset-2 ring-offset-[var(--card)]' : ''}`}
                                        aria-label="Count bead"
                                    >
                                        <span className="font-display text-5xl sm:text-6xl font-bold text-heritage-gold leading-none">
                                            {beadCount}
                                        </span>
                                        <span className="text-xs text-[var(--muted)] mt-1">of {TOTAL_BEADS}</span>
                                        <span className="text-[10px] text-heritage-gold/60 mt-1 uppercase tracking-widest">tap to chant</span>
                                    </button>
                                </div>
                            </div>

                            {/* Counter Info */}
                            <div className="flex-1 text-center lg:text-left">
                                <h3 className="font-display text-2xl font-bold text-[var(--fg)] mb-2">
                                    📿 Japa Mala Counter
                                </h3>
                                <p className="text-[var(--muted)] text-sm mb-6">
                                    Tap the center bead with each chant. 108 counts = 1 round.
                                    The sacred number 108 represents the wholeness of the universe.
                                </p>

                                {/* Mantra selector */}
                                <div className="mb-6">
                                    <label className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-2 block">Select Mantra</label>
                                    <div className="flex flex-wrap gap-2">
                                        {MANTRAS.map((m, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setSelectedMantra(i)}
                                                className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${selectedMantra === i
                                                    ? 'bg-heritage-gold/20 border-heritage-gold text-heritage-gold font-semibold'
                                                    : 'border-[var(--border)] text-[var(--muted)] hover:border-heritage-gold/50'
                                                    }`}
                                            >
                                                {m.name}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-heritage-gold/70 italic mt-2">
                                        "{MANTRAS[selectedMantra].meaning}"
                                    </p>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="p-3 rounded-xl bg-gradient-to-br from-heritage-gold/10 to-transparent border border-heritage-gold/20 text-center">
                                        <div className="font-display text-2xl font-bold text-heritage-gold">{rounds}</div>
                                        <div className="text-xs text-[var(--muted)]">Rounds</div>
                                    </div>
                                    <div className="p-3 rounded-xl bg-gradient-to-br from-heritage-teal/10 to-transparent border border-heritage-teal/20 text-center">
                                        <div className="font-display text-2xl font-bold text-heritage-teal">{rounds * 108 + beadCount}</div>
                                        <div className="text-xs text-[var(--muted)]">Total Chants</div>
                                    </div>
                                    <div className="p-3 rounded-xl bg-gradient-to-br from-heritage-green/10 to-transparent border border-heritage-green/20 text-center">
                                        <div className="font-display text-2xl font-bold text-heritage-green">
                                            {TOTAL_BEADS - beadCount}
                                        </div>
                                        <div className="text-xs text-[var(--muted)]">Remaining</div>
                                    </div>
                                </div>

                                {/* Progress bar */}
                                <div className="mb-4">
                                    <div className="flex justify-between text-xs text-[var(--muted)] mb-1">
                                        <span>Current Round Progress</span>
                                        <span>{Math.round(beadProgress * 100)}%</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-[var(--border)]/30 overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-heritage-gold to-heritage-goldLight transition-all duration-300"
                                            style={{ width: `${beadProgress * 100}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Reset */}
                                <button
                                    onClick={resetCounter}
                                    className="btn-secondary text-sm py-2 px-6"
                                >
                                    Reset Counter
                                </button>
                            </div>
                        </div>
                    </Reveal>

                    {/* Daily Wisdom */}
                    <Reveal className="heritage-card p-6 sm:p-8">
                        <h3 className="font-display text-2xl font-bold text-[var(--fg)] mb-6">Daily Wisdom</h3>
                        {wisdomData.length === 0 ? (
                            <div className="flex justify-center py-8">
                                <div className="w-8 h-8 border-4 border-heritage-gold/30 border-t-heritage-gold rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {(Array.isArray(wisdomData) ? wisdomData : []).map((w) => (
                                    <div key={w.id} className="p-4 rounded-xl bg-gradient-to-br from-[var(--border)]/10 to-transparent border border-[var(--border)]/30">
                                        <p className="text-[var(--fg)] italic mb-3">"{w.quote}"</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-[var(--muted)]">{w.source}</span>
                                            <span className="text-xs px-2 py-1 rounded-full bg-heritage-gold/10 text-heritage-gold">{w.theme}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default Wellness;
