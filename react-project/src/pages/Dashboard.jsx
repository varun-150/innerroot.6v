import React, { useState, useEffect, useMemo } from 'react';
import divineSparkImg from '../assets/divine-spark.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { moodAPI } from '../services/api';
import { Reveal, Stagger } from '../components/Reveal';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import {
    Flame, Trophy, Star, BookOpen, Sparkles, Heart,
    ChevronRight, Award, Zap, Target, Calendar,
    TrendingUp, CheckCircle2, Lock, ArrowRight,
    Search, Compass, Play
} from 'lucide-react';

const interestCategories = [
    {
        id: 'yoga',
        label: 'Yoga & Meditation',
        emoji: '🧘',
        color: 'text-emerald-600',
        bgGlow: 'bg-emerald-500/10',
        description: 'Asanas, mindfulness',
    },
    {
        id: 'heritage',
        label: 'Heritage & Culture',
        emoji: '🏛️',
        color: 'text-amber-600',
        bgGlow: 'bg-amber-500/10',
        description: 'Temples, traditions',
    },
    {
        id: 'texts',
        label: 'Sacred Texts',
        emoji: '📜',
        color: 'text-indigo-600',
        bgGlow: 'bg-indigo-500/10',
        description: 'Vedas, Gita, scriptures',
    },
    {
        id: 'wellness',
        label: 'Holistic Wellness',
        emoji: '🌿',
        color: 'text-rose-600',
        bgGlow: 'bg-rose-500/10',
        description: 'Ayurveda, healing',
    },
];

const recommendationsMap = {
    yoga: [
        { title: 'Surya Namaskar', desc: 'Master the 12 sun salutation poses', icon: '☀️', link: '/wellness', tag: 'Beginner' },
        { title: 'Pranayama Master', desc: 'Ancient techniques for clarity', icon: '🌬️', link: '/wellness', tag: 'Popular' },
    ],
    heritage: [
        { title: 'Virtual Taj Mahal', desc: 'Explore the wonder of the world', icon: '🕌', link: '/tours', tag: 'Featured' },
        { title: 'Festivals of India', desc: 'Diwali, Holi, and more', icon: '🎆', link: '/explore', tag: 'Culture' },
    ],
    texts: [
        { title: 'Bhagavad Gita', desc: '700 verses of divine wisdom', icon: '📖', link: '/library', tag: 'Essential' },
        { title: 'Ancient Vedas', desc: 'Oldest Vedic Sanskrit texts', icon: '📜', link: '/library', tag: 'Deep Dive' },
    ],
    wellness: [
        { title: 'Ayurvedic Diet', desc: 'Eat according to your dosha', icon: '🍵', link: '/wellness', tag: 'Health' },
        { title: 'Om Chanting', desc: 'Primordial sound meditation', icon: '🔔', link: '/wellness', tag: 'New' },
    ],
};

const allBadges = [
    { id: 'first_login', name: 'First Step', emoji: '👣', desc: 'Logged in for the first time', unlocked: true },
    { id: 'explorer', name: 'Explorer', emoji: '🧭', desc: 'Visited 3 sections', unlocked: true },
    { id: 'streak_3', name: '3-Day Streak', emoji: '🔥', desc: '3-day streak', unlocked: true },
    { id: 'streak_7', name: 'Week Warrior', emoji: '⚡', desc: '7-day streak', unlocked: false },
    { id: 'bookworm', name: 'Bookworm', emoji: '📚', desc: 'Read 5 texts', unlocked: false },
    { id: 'culture_buff', name: 'Culture Buff', emoji: '🎭', desc: 'Explored culture', unlocked: true },
];

const generateStreakData = () => {
    const days = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const completed = i < 3 || (i >= 5 && i <= 8) || (i >= 12 && i <= 16) || (i >= 20 && i <= 23);
        days.push({
            date: d,
            dayNum: d.getDate(),
            completed,
        });
    }
    return days;
};

const Dashboard = () => {
    const { user, isAuthenticated } = useAuth();
    const [selectedInterests, setSelectedInterests] = useState(() => {
        const saved = localStorage.getItem('innerRootInterests');
        return saved ? JSON.parse(saved) : ['yoga'];
    });
    const [streakDays] = useState(generateStreakData);
    const [moodHistory, setMoodHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            fetchDashboardData();
        } else {
            setIsLoading(false);
        }
    }, [isAuthenticated]);

    const fetchDashboardData = async () => {
        try {
            const data = await moodAPI.getAll();
            setMoodHistory(data);
        } catch (err) {
            console.error('Failed to fetch dashboard data:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const currentStreakCount = useMemo(() => {
        if (!moodHistory.length) return 3; // Fallback for demo if no history
        return Math.min(moodHistory.length, 7);
    }, [moodHistory]);

    const toggleInterest = (id) => {
        setSelectedInterests(prev => {
            const next = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
            if (next.length === 0) return prev;
            localStorage.setItem('innerRootInterests', JSON.stringify(next));
            return next;
        });
    };

    const recommendations = selectedInterests
        .flatMap(interest => recommendationsMap[interest] || [])
        .slice(0, 8);

    const learningProgress = [
        { category: 'Festivals', progress: 80, completed: 4, total: 5, color: 'bg-heritage-gold' },
        { category: 'Arts & Dance', progress: 60, completed: 3, total: 5, color: 'bg-heritage-teal' },
        { category: 'Traditions', progress: 40, completed: 2, total: 5, color: 'bg-rose-500' },
        { category: 'Scriptures', progress: 100, completed: 5, total: 5, color: 'bg-emerald-500' },
    ];

    const currentStreak = 3;
    const bestStreak = 8;
    const totalSessions = 42;
    const unlockedBadgesCount = allBadges.filter(b => b.unlocked).length;

    return (
        <div className="min-h-screen py-12 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-[var(--bg)]/10">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <Reveal className="text-center mb-16">
                    <span className="inline-block px-4 py-1 rounded-full bg-heritage-gold/20 text-heritage-gold font-bold text-xs uppercase tracking-widest mb-6 border border-heritage-gold/20">Citizen of Inner Root</span>
                    <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--fg)] mb-6 tracking-tight">
                        Namaste, {user?.name ? user.name.split(' ')[0] : 'Seeker'} ✨
                    </h1>
                    <p className="text-[var(--muted)] max-w-2xl mx-auto text-xl leading-relaxed italic">
                        "The journey of a thousand miles begins with a single step towards clarity."
                    </p>
                </Reveal>

                {/* Quick Stats Grid */}
                <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 px-4">
                    {[
                        { icon: Flame, value: currentStreakCount, label: 'Day Streak', color: 'text-orange-500', bg: 'bg-orange-500/10' },
                        { icon: Trophy, value: bestStreak, label: 'Best Streak', color: 'text-heritage-gold', bg: 'bg-heritage-gold/10' },
                        { icon: Target, value: totalSessions, label: 'Sessions', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                        { icon: Award, value: `${unlockedBadgesCount}/${allBadges.length}`, label: 'Badges Earned', color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
                    ].map(({ icon: Icon, ...stat }, i) => (
                        <Card key={i} className={`!p-8 text-center !rounded-[32px] border-[var(--border)] shadow-xl hover:-translate-y-2 transition-transform h-full flex flex-col items-center justify-center`}>
                            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 shadow-inner`}>
                                <Icon className="w-8 h-8" />
                            </div>
                            <div className="text-4xl font-bold text-[var(--fg)] mb-1 tabular-nums">{stat.value}</div>
                            <div className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest">{stat.label}</div>
                        </Card>
                    ))}
                </Stagger>

                <div className="grid lg:grid-cols-3 gap-10 px-4">

                    {/* Left Column: Interests and Recommendations */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Personalized Interests */}
                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <Compass className="w-6 h-6 text-heritage-gold" />
                                <h2 className="font-display text-3xl font-bold text-[var(--fg)] tracking-tight">Personalize Your Path</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {interestCategories.map((cat) => {
                                    const isActive = selectedInterests.includes(cat.id);
                                    return (
                                        <button
                                            key={cat.id}
                                            onClick={() => toggleInterest(cat.id)}
                                            className={`group relative flex items-center p-6 rounded-[32px] border-2 transition-all duration-500 text-left overflow-hidden ${isActive
                                                ? 'bg-heritage-gold border-heritage-gold text-white shadow-2xl scale-[1.02]'
                                                : 'bg-white border-[var(--border)] hover:border-heritage-gold/30'
                                                }`}
                                        >
                                            <div className={`w-16 h-16 rounded-2xl ${isActive ? 'bg-white/20' : 'bg-heritage-teal/5'} flex items-center justify-center text-4xl mr-6 transition-transform group-hover:scale-110`}>
                                                {cat.emoji}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className={`font-bold text-lg ${isActive ? 'text-white' : 'text-[var(--fg)]'}`}>{cat.label}</h3>
                                                <p className={`text-sm ${isActive ? 'text-white/80' : 'text-[var(--muted)]'}`}>{cat.description}</p>
                                            </div>
                                            {isActive && (
                                                <div className="absolute right-6">
                                                    <CheckCircle2 className="w-6 h-6 text-white" />
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Personalized Recommendations */}
                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <Sparkles className="w-6 h-6 text-heritage-gold" />
                                <h2 className="font-display text-3xl font-bold text-[var(--fg)] tracking-tight">Chosen For You</h2>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {recommendations.map((rec, i) => (
                                    <Card key={i} className="p-8 group hover:border-heritage-gold/30 hover:shadow-2xl transition-all duration-500 !rounded-[40px] flex flex-col justify-between border-[var(--border)]">
                                        <div>
                                            <div className="flex justify-between items-start mb-6">
                                                <span className="text-5xl group-hover:scale-125 transition-transform duration-500">{rec.icon}</span>
                                                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-heritage-gold/10 text-heritage-gold rounded-full">
                                                    {rec.tag}
                                                </span>
                                            </div>
                                            <h3 className="font-display text-2xl font-bold text-[var(--fg)] mb-3 group-hover:text-heritage-gold transition-colors">{rec.title}</h3>
                                            <p className="text-[var(--muted)] leading-relaxed mb-8">{rec.desc}</p>
                                        </div>
                                        <Button
                                            as={Link}
                                            to={rec.link}
                                            variant="secondary"
                                            className="w-full !rounded-2xl"
                                            rightIcon={ArrowRight}
                                        >
                                            Explore Session
                                        </Button>
                                    </Card>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Streak, Progress and Badges */}
                    <div className="space-y-12">

                        {/* Streak Tracker */}
                        <Card className="p-8 !rounded-[40px] border-[var(--border)] bg-heritage-teal/5 ring-8 ring-heritage-teal/5">
                            <div className="flex items-center gap-3 mb-8">
                                <Flame className="w-6 h-6 text-orange-500" />
                                <h2 className="font-display text-2xl font-bold text-[var(--fg)]">Sacred Streak</h2>
                            </div>

                            <div className="grid grid-cols-7 gap-2 mb-8">
                                {streakDays.slice(-28).map((day, i) => (
                                    <div
                                        key={i}
                                        className={`aspect-square rounded-xl flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${day.completed
                                            ? 'bg-heritage-gold text-white shadow-lg shadow-heritage-gold/20 scale-105'
                                            : 'bg-white border border-[var(--border)] text-[var(--muted)]'
                                            }`}
                                        title={`Day ${day.dayNum}`}
                                    >
                                        {day.dayNum}
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm p-4 rounded-2xl bg-white border border-[var(--border)] shadow-sm">
                                    <span className="text-[var(--muted)] font-bold uppercase tracking-widest text-xs">Current Streak</span>
                                    <span className="font-bold text-orange-500 text-lg">{currentStreak} Days</span>
                                </div>
                                <div className="flex justify-between items-center text-sm p-4 rounded-2xl bg-white border border-[var(--border)] shadow-sm">
                                    <span className="text-[var(--muted)] font-bold uppercase tracking-widest text-xs">Best Effort</span>
                                    <span className="font-bold text-heritage-gold text-lg">{bestStreak} Days</span>
                                </div>
                            </div>
                        </Card>

                        {/* Achievement Progress */}
                        <Card className="p-8 !rounded-[40px] border-[var(--border)] shadow-xl">
                            <div className="flex items-center gap-3 mb-8">
                                <BookOpen className="w-6 h-6 text-heritage-teal" />
                                <h2 className="font-display text-2xl font-bold text-[var(--fg)]">Learning Path</h2>
                            </div>
                            <div className="space-y-8">
                                {learningProgress.map((item, i) => (
                                    <div key={i} className="space-y-3">
                                        <div className="flex justify-between items-end">
                                            <span className="text-sm font-bold text-[var(--fg)]">{item.category}</span>
                                            <span className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest">{item.completed}/{item.total} Level</span>
                                        </div>
                                        <div className="h-2 w-full bg-heritage-teal/5 rounded-full overflow-hidden border border-[var(--border)]">
                                            <div
                                                className={`h-full ${item.color} rounded-full transition-all duration-1000 shadow-sm`}
                                                style={{ width: `${item.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Badges Collection */}
                        <Card className="p-8 !rounded-[40px] border-[var(--border)] shadow-xl">
                            <div className="flex items-center gap-3 mb-8">
                                <Star className="w-6 h-6 text-heritage-gold" />
                                <h2 className="font-display text-2xl font-bold text-[var(--fg)]">Sacred Seals</h2>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {allBadges.map((badge) => (
                                    <div
                                        key={badge.id}
                                        className={`flex flex-col items-center justify-center aspect-square rounded-2xl border transition-all duration-500 ${badge.unlocked
                                            ? 'bg-heritage-gold/5 border-heritage-gold/20 shadow-sm'
                                            : 'bg-black/5 border-transparent opacity-30 grayscale'
                                            }`}
                                        title={badge.desc}
                                    >
                                        <span className={`text-3xl mb-1 ${badge.unlocked ? 'animate-pulse-slow' : ''}`}>{badge.emoji}</span>
                                        <span className="text-[8px] font-bold uppercase tracking-tighter text-center px-1">{badge.name}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Final CTA Portal */}
                <Reveal className="mt-20 px-4">
                    <Card className="relative p-12 lg:p-20 !rounded-[64px] border-none overflow-hidden text-center bg-black group">
                        <div className="absolute inset-0 opacity-40">
                            <img src={divineSparkImg} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[20s] linear" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20" />
                        </div>

                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full bg-heritage-gold/20 backdrop-blur-md flex items-center justify-center mb-10 shadow-2xl border border-heritage-gold/30">
                                <Play className="w-10 h-10 ml-1 text-heritage-gold fill-heritage-gold" />
                            </div>
                            <h2 className="font-display text-4xl lg:text-7xl font-bold text-white mb-8 tracking-tighter">
                                The Temple of Mind Awaits
                            </h2>
                            <p className="text-white/60 max-w-2xl mx-auto text-xl mb-12 italic leading-relaxed">
                                Join our live meditation circles today at 6:00 PM IST.
                                Connect with the collective energy of thousands of seekers.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <Button
                                    as={Link}
                                    to="/wellness"
                                    size="lg"
                                    className="!px-12 !py-6 !rounded-[24px] !bg-heritage-gold !border-heritage-gold text-white font-bold tracking-widest uppercase text-xs"
                                    leftIcon={Flame}
                                >
                                    Join Daily Sadhana
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="!px-12 !py-6 !rounded-[24px] !bg-white/10 !border-white/20 !text-white hover:!bg-white/20 font-bold tracking-widest uppercase text-xs"
                                >
                                    View Sangha Schedule
                                </Button>
                            </div>
                        </div>

                        {/* Decorative Glow */}
                        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-heritage-gold/10 rounded-full blur-[150px] pointer-events-none" />
                        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-heritage-teal/10 rounded-full blur-[150px] pointer-events-none" />
                    </Card>
                </Reveal>
            </div>
        </div >
    );
};

export default Dashboard;
