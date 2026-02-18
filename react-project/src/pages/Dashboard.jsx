import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    Flame, Trophy, Star, BookOpen, Sparkles, Heart,
    ChevronRight, Award, Zap, Target, Calendar,
    TrendingUp, CheckCircle2, Lock
} from 'lucide-react';

// ── Interest Categories ──────────────────────────────────────────
const interestCategories = [
    {
        id: 'yoga',
        label: 'Yoga & Meditation',
        emoji: '🧘',
        color: 'from-emerald-500 to-teal-600',
        bgGlow: 'bg-emerald-500/20',
        description: 'Asanas, pranayama, mindfulness',
    },
    {
        id: 'heritage',
        label: 'Heritage & Culture',
        emoji: '🏛️',
        color: 'from-amber-500 to-orange-600',
        bgGlow: 'bg-amber-500/20',
        description: 'Temples, monuments, traditions',
    },
    {
        id: 'texts',
        label: 'Sacred Texts',
        emoji: '📜',
        color: 'from-purple-500 to-indigo-600',
        bgGlow: 'bg-purple-500/20',
        description: 'Vedas, Upanishads, Gita',
    },
    {
        id: 'wellness',
        label: 'Wellness & Ayurveda',
        emoji: '🌿',
        color: 'from-green-500 to-lime-600',
        bgGlow: 'bg-green-500/20',
        description: 'Holistic health, healing',
    },
];

// ── Recommendations Data (based on interests) ───────────────────
const recommendationsMap = {
    yoga: [
        { title: 'Surya Namaskar Guide', desc: 'Master the 12 poses of Sun Salutation', icon: '☀️', link: '/wellness', tag: 'Beginner' },
        { title: 'Pranayama Breathing', desc: 'Ancient techniques for mental clarity', icon: '🌬️', link: '/wellness', tag: 'Popular' },
        { title: 'Yoga Nidra Session', desc: 'Deep relaxation through yogic sleep', icon: '🌙', link: '/wellness', tag: 'New' },
        { title: 'Chakra Meditation', desc: 'Balance your energy centers', icon: '🔮', link: '/wellness', tag: 'Advanced' },
    ],
    heritage: [
        { title: 'Taj Mahal Virtual Tour', desc: 'Explore the wonder of the world', icon: '🕌', link: '/tours', tag: 'Featured' },
        { title: 'Varanasi Ghats', desc: 'Spiritual heart of India', icon: '🏞️', link: '/tours', tag: 'Popular' },
        { title: 'Hampi Ruins', desc: 'Vijayanagara Empire legacy', icon: '🏛️', link: '/tours', tag: 'UNESCO' },
        { title: 'Indian Festivals', desc: 'Diwali, Holi, Navaratri & more', icon: '🎆', link: '/explore', tag: 'Culture' },
    ],
    texts: [
        { title: 'Bhagavad Gita', desc: '700 verses of divine wisdom', icon: '📖', link: '/library', tag: 'Essential' },
        { title: 'Rigveda', desc: 'Oldest Vedic Sanskrit text', icon: '📜', link: '/library', tag: 'Ancient' },
        { title: 'Upanishads', desc: 'Philosophical foundations of Hinduism', icon: '🕉️', link: '/library', tag: 'Deep Dive' },
        { title: 'Yoga Sutras', desc: 'Patanjali\'s guide to yoga philosophy', icon: '📕', link: '/library', tag: 'Classic' },
    ],
    wellness: [
        { title: 'Ayurvedic Diet Guide', desc: 'Eat according to your dosha', icon: '🍵', link: '/wellness', tag: 'Health' },
        { title: 'Om Chanting', desc: 'Primordial sound for deep peace', icon: '🔔', link: '/wellness', tag: 'Beginner' },
        { title: 'Meditation Basics', desc: 'Start your mindfulness journey', icon: '🧠', link: '/wellness', tag: 'New' },
        { title: 'Herbal Remedies', desc: 'Traditional Indian healing', icon: '🌱', link: '/wellness', tag: 'Nature' },
    ],
};

// ── Badge Definitions ────────────────────────────────────────────
const allBadges = [
    { id: 'first_login', name: 'First Step', emoji: '👣', desc: 'Logged in for the first time', unlocked: true },
    { id: 'explorer', name: 'Explorer', emoji: '🧭', desc: 'Visited 3 different sections', unlocked: true },
    { id: 'streak_3', name: '3-Day Streak', emoji: '🔥', desc: 'Meditated for 3 days in a row', unlocked: true },
    { id: 'streak_7', name: 'Week Warrior', emoji: '⚡', desc: '7-day meditation streak', unlocked: false },
    { id: 'bookworm', name: 'Bookworm', emoji: '📚', desc: 'Read 5 sacred texts', unlocked: false },
    { id: 'culture_buff', name: 'Culture Buff', emoji: '🎭', desc: 'Explored all culture categories', unlocked: true },
    { id: 'zen_master', name: 'Zen Master', emoji: '🧘', desc: '30-day meditation streak', unlocked: false },
    { id: 'heritage_hero', name: 'Heritage Hero', emoji: '🏆', desc: 'Visited all heritage sites', unlocked: false },
    { id: 'wisdom_seeker', name: 'Wisdom Seeker', emoji: '💡', desc: 'Read 50 wisdom quotes', unlocked: true },
    { id: 'community_star', name: 'Community Star', emoji: '⭐', desc: 'Made 10 community posts', unlocked: false },
];

// ── Streak Calendar Helper ───────────────────────────────────────
const generateStreakData = () => {
    const days = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        // Simulate streak data: completed days in the last 2 weeks randomly
        const completed = i < 3 || (i >= 5 && i <= 8) || (i >= 12 && i <= 16) || (i >= 20 && i <= 23);
        days.push({
            date: d,
            day: d.toLocaleDateString('en', { weekday: 'short' }).charAt(0),
            dayNum: d.getDate(),
            completed,
        });
    }
    return days;
};


// ── Main Dashboard Component ─────────────────────────────────────
const Dashboard = () => {
    const { user } = useAuth();
    const [selectedInterests, setSelectedInterests] = useState(() => {
        const saved = localStorage.getItem('innerRootInterests');
        return saved ? JSON.parse(saved) : ['yoga'];
    });
    const [streakDays] = useState(generateStreakData);
    const [animateCards, setAnimateCards] = useState(false);

    useEffect(() => {
        setTimeout(() => setAnimateCards(true), 100);
    }, []);

    const toggleInterest = (id) => {
        setSelectedInterests(prev => {
            const next = prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id];
            // Ensure at least one is selected
            if (next.length === 0) return prev;
            localStorage.setItem('innerRootInterests', JSON.stringify(next));
            return next;
        });
    };

    // Build personalized recommendations
    const recommendations = selectedInterests
        .flatMap(interest => recommendationsMap[interest] || [])
        .slice(0, 8);

    const currentStreak = 3;
    const longestStreak = 8;
    const totalSessions = 42;
    const unlockedBadges = allBadges.filter(b => b.unlocked).length;

    // ── Culture Learning Progress ────────────────────────────────
    const learningProgress = [
        { category: 'Festivals', progress: 80, total: 5, completed: 4, color: 'from-amber-400 to-orange-500' },
        { category: 'Arts & Dance', progress: 60, total: 5, completed: 3, color: 'from-pink-400 to-rose-500' },
        { category: 'Traditions', progress: 40, total: 5, completed: 2, color: 'from-green-400 to-emerald-500' },
        { category: 'Scriptures', progress: 100, total: 5, completed: 5, color: 'from-purple-400 to-indigo-500' },
        { category: 'Heritage Sites', progress: 20, total: 5, completed: 1, color: 'from-blue-400 to-cyan-500' },
    ];

    return (
        <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

            {/* ── Header ── */}
            <div className={`text-center mb-12 transition-all duration-700 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h1 className="text-5xl md:text-6xl font-display font-bold text-[var(--fg)] mb-3">
                    {user ? `Welcome, ${user.name?.split(' ')[0]}` : 'Your Dashboard'} ✨
                </h1>
                <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
                    Your personalized journey through India's timeless wisdom
                </p>
            </div>

            {/* ── Quick Stats Row ── */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 transition-all duration-700 delay-100 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {[
                    { icon: <Flame className="w-6 h-6" />, value: currentStreak, label: 'Day Streak', color: 'text-orange-400', bg: 'bg-orange-500/10' },
                    { icon: <Zap className="w-6 h-6" />, value: longestStreak, label: 'Best Streak', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
                    { icon: <Target className="w-6 h-6" />, value: totalSessions, label: 'Sessions', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                    { icon: <Award className="w-6 h-6" />, value: `${unlockedBadges}/${allBadges.length}`, label: 'Badges', color: 'text-purple-400', bg: 'bg-purple-500/10' },
                ].map((stat, i) => (
                    <div key={i} className={`${stat.bg} backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center
                                           hover:scale-105 transition-all duration-300 hover:border-white/20 cursor-default`}>
                        <div className={`${stat.color} flex justify-center mb-2`}>{stat.icon}</div>
                        <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                        <div className="text-xs text-[var(--text-secondary)] mt-1">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* ── Personalization: Interest Selection ── */}
            <section className={`mb-12 transition-all duration-700 delay-200 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="w-6 h-6 text-heritage-gold" />
                    <h2 className="text-2xl font-display font-bold text-[var(--fg)]">Your Interests</h2>
                    <span className="text-sm text-[var(--text-secondary)]">— Select topics to personalize content</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {interestCategories.map((cat) => {
                        const isActive = selectedInterests.includes(cat.id);
                        return (
                            <button
                                key={cat.id}
                                onClick={() => toggleInterest(cat.id)}
                                className={`relative overflow-hidden rounded-2xl p-5 border-2 text-left transition-all duration-300
                                           hover:scale-[1.03] cursor-pointer group
                                           ${isActive
                                        ? 'border-heritage-gold bg-heritage-gold/10 shadow-lg shadow-heritage-gold/10'
                                        : 'border-white/10 bg-white/5 hover:border-white/25'
                                    }`}
                            >
                                {isActive && (
                                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-heritage-gold flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4 text-white" />
                                    </div>
                                )}
                                <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform duration-200">{cat.emoji}</span>
                                <h3 className="font-semibold text-[var(--fg)] text-sm">{cat.label}</h3>
                                <p className="text-xs text-[var(--text-secondary)] mt-1">{cat.description}</p>
                                {/* Glow effect */}
                                {isActive && (
                                    <div className={`absolute -bottom-4 -right-4 w-20 h-20 ${cat.bgGlow} rounded-full blur-2xl opacity-60`}></div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* ── Personalized Recommendations ── */}
            <section className={`mb-12 transition-all duration-700 delay-300 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="flex items-center gap-3 mb-6">
                    <Heart className="w-6 h-6 text-rose-400" />
                    <h2 className="text-2xl font-display font-bold text-[var(--fg)]">Recommended For You</h2>
                </div>
                {recommendations.length === 0 ? (
                    <div className="text-center py-12 text-[var(--text-secondary)]">
                        Select an interest above to get personalized recommendations
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {recommendations.map((rec, i) => (
                            <Link
                                key={i}
                                to={rec.link}
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm
                                         p-5 hover:border-heritage-gold/30 hover:bg-white/10 transition-all duration-300
                                         hover:scale-[1.02] hover:shadow-lg hover:shadow-heritage-gold/5"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{rec.icon}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full
                                                    bg-heritage-gold/10 text-heritage-gold border border-heritage-gold/20">
                                        {rec.tag}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-[var(--fg)] text-sm mb-1 group-hover:text-heritage-gold transition-colors">{rec.title}</h3>
                                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{rec.desc}</p>
                                <div className="mt-3 flex items-center text-heritage-gold text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                    Explore <ChevronRight className="w-3 h-3 ml-1" />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>

            {/* ── Meditation Streak Calendar ── */}
            <section className={`mb-12 transition-all duration-700 delay-[400ms] ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="flex items-center gap-3 mb-6">
                    <Flame className="w-6 h-6 text-orange-400" />
                    <h2 className="text-2xl font-display font-bold text-[var(--fg)]">Meditation Streak</h2>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                    {/* Streak info */}
                    <div className="flex items-center gap-6 mb-6 flex-wrap">
                        <div className="flex items-center gap-2">
                            <Flame className="w-5 h-5 text-orange-400" />
                            <span className="text-sm text-[var(--text-secondary)]">Current:</span>
                            <span className="text-lg font-bold text-orange-400">{currentStreak} days</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-yellow-400" />
                            <span className="text-sm text-[var(--text-secondary)]">Best:</span>
                            <span className="text-lg font-bold text-yellow-400">{longestStreak} days</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-emerald-400" />
                            <span className="text-sm text-[var(--text-secondary)]">Total Sessions:</span>
                            <span className="text-lg font-bold text-emerald-400">{totalSessions}</span>
                        </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="mb-4">
                        <p className="text-xs text-[var(--text-secondary)] mb-3">Last 30 days</p>
                        <div className="grid grid-cols-10 sm:grid-cols-15 md:grid-cols-30 gap-1.5"
                            style={{ gridTemplateColumns: `repeat(${Math.min(streakDays.length, 30)}, minmax(0, 1fr))` }}>
                            {streakDays.map((day, i) => (
                                <div
                                    key={i}
                                    className={`aspect-square rounded-md flex items-center justify-center text-[9px] font-bold
                                               transition-all duration-200 hover:scale-125 cursor-default relative group
                                               ${day.completed
                                            ? 'bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-sm shadow-orange-500/30'
                                            : 'bg-white/5 text-[var(--text-secondary)] border border-white/5'
                                        }`}
                                    title={day.date.toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                                >
                                    {day.dayNum}
                                    {day.completed && (
                                        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-white/20"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)]">
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-sm bg-gradient-to-br from-orange-400 to-amber-500"></div>
                            Completed
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-sm bg-white/5 border border-white/10"></div>
                            Missed
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Culture Learning Progress ── */}
            <section className={`mb-12 transition-all duration-700 delay-500 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="flex items-center gap-3 mb-6">
                    <BookOpen className="w-6 h-6 text-indigo-400" />
                    <h2 className="text-2xl font-display font-bold text-[var(--fg)]">Culture Learning Progress</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {learningProgress.map((item, i) => (
                        <div key={i} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5
                                              hover:border-white/20 transition-all duration-300 hover:scale-[1.02]">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold text-[var(--fg)] text-sm">{item.category}</h3>
                                <span className="text-xs text-[var(--text-secondary)]">{item.completed}/{item.total}</span>
                            </div>
                            {/* Progress bar */}
                            <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden mb-2">
                                <div
                                    className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out`}
                                    style={{ width: `${animateCards ? item.progress : 0}%` }}
                                ></div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-[var(--text-secondary)]">{item.progress}% complete</span>
                                {item.progress === 100 && (
                                    <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" /> Complete!
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Achievement Badges ── */}
            <section className={`mb-12 transition-all duration-700 delay-[600ms] ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="flex items-center gap-3 mb-6">
                    <Star className="w-6 h-6 text-yellow-400" />
                    <h2 className="text-2xl font-display font-bold text-[var(--fg)]">Achievement Badges</h2>
                    <span className="ml-auto text-sm text-[var(--text-secondary)]">{unlockedBadges} of {allBadges.length} unlocked</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {allBadges.map((badge) => (
                        <div
                            key={badge.id}
                            className={`relative rounded-2xl border p-5 text-center transition-all duration-300
                                       hover:scale-105 cursor-default group
                                       ${badge.unlocked
                                    ? 'border-heritage-gold/30 bg-heritage-gold/5 hover:border-heritage-gold/50 hover:shadow-lg hover:shadow-heritage-gold/10'
                                    : 'border-white/5 bg-white/[0.02] opacity-50 grayscale'
                                }`}
                        >
                            {!badge.unlocked && (
                                <div className="absolute top-2 right-2">
                                    <Lock className="w-3 h-3 text-gray-500" />
                                </div>
                            )}
                            <span className={`text-4xl block mb-2 ${badge.unlocked ? 'group-hover:scale-110' : ''} transition-transform duration-200`}>
                                {badge.emoji}
                            </span>
                            <h3 className={`font-semibold text-xs ${badge.unlocked ? 'text-[var(--fg)]' : 'text-gray-500'}`}>
                                {badge.name}
                            </h3>
                            <p className="text-[10px] text-[var(--text-secondary)] mt-1 leading-tight">{badge.desc}</p>
                            {badge.unlocked && (
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-heritage-gold/0 via-heritage-gold to-heritage-gold/0 rounded-full"></div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA: Meditation ── */}
            <section className={`transition-all duration-700 delay-700 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="rounded-2xl border border-heritage-gold/20 bg-gradient-to-br from-heritage-gold/10 to-orange-500/5
                              backdrop-blur-sm p-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <div className="absolute top-[20%] left-[10%] w-40 h-40 bg-heritage-gold/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-[10%] right-[20%] w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
                    </div>
                    <div className="relative z-10">
                        <span className="text-5xl block mb-4">🧘</span>
                        <h3 className="text-2xl font-display font-bold text-[var(--fg)] mb-2">Continue Your Journey</h3>
                        <p className="text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
                            Keep your streak alive! Start a meditation session to earn badges and unlock new achievements.
                        </p>
                        <Link
                            to="/wellness"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-heritage-gold to-amber-500
                                     text-white font-semibold text-sm hover:scale-105 transition-all duration-300 shadow-lg shadow-heritage-gold/20"
                        >
                            <Calendar className="w-4 h-4" />
                            Start Today's Session
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
