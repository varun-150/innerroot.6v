import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
    LayoutDashboard, Compass, Heart, BookOpen,
    Bell, Settings, LogOut, ChevronDown, Calendar,
    TrendingUp, Brain, Flame, Target, ArrowRight,
    Sun, Moon, Filter, MapPin, Sparkles,
    Activity, BarChart3, ChevronLeft, ChevronRight, Database,
    Clock, Star, User, Camera, Mail, Shield, Trash2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/ui/SEO';
import { authAPI, moodAPI } from '../services/api';

// ===== Sidebar Nav Items =====
const sidebarItems = [
    { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
    { icon: Compass, label: 'Heritage', id: 'heritage' },
    { icon: Heart, label: 'Wellness', id: 'wellness' },
    { icon: BookOpen, label: 'Library', id: 'library' },
    { icon: User, label: 'Profile', id: 'profile' },
    { icon: Settings, label: 'Settings', id: 'settings' },
];

/* ─── Helper ──────────────────────────────────────────────── */
const getInitials = (name) => {
    if (!name) return 'U';
    return name.trim().split(/\s+/).map(w => w[0]).join('').toUpperCase().slice(0, 2);
};

// ===== KPI Data =====
const kpiData = [
    {
        label: 'Emotional Stability',
        value: 82,
        change: '+5%',
        icon: Brain,
        color: '#d97706',
        gradient: 'linear-gradient(135deg, #fef7ec, #fde8c8)',
        darkGradient: 'linear-gradient(135deg, rgba(217,119,6,0.12), rgba(217,119,6,0.05))',
    },
    {
        label: 'Meditation Streak',
        value: 14,
        unit: 'days',
        change: '+2',
        icon: Flame,
        color: '#22c55e',
        gradient: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
        darkGradient: 'linear-gradient(135deg, rgba(34,197,94,0.12), rgba(34,197,94,0.05))',
    },
    {
        label: 'Reflections Done',
        value: 87,
        unit: '%',
        change: '+12%',
        icon: Target,
        color: '#7c3aed',
        gradient: 'linear-gradient(135deg, #f5f3ff, #ede9fe)',
        darkGradient: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(124,58,237,0.05))',
    },
    {
        label: 'Cultural Journeys',
        value: 24,
        change: '+3',
        icon: MapPin,
        color: '#c9a227',
        gradient: 'linear-gradient(135deg, #fefce8, #fef9c3)',
        darkGradient: 'linear-gradient(135deg, rgba(201,162,39,0.12), rgba(201,162,39,0.05))',
    },
];

// ===== Mood Trend (last 7 days) =====
const moodData = [
    { day: 'Mon', value: 65, label: 'Calm' },
    { day: 'Tue', value: 72, label: 'Centered' },
    { day: 'Wed', value: 58, label: 'Anxious' },
    { day: 'Thu', value: 80, label: 'Peaceful' },
    { day: 'Fri', value: 75, label: 'Focused' },
    { day: 'Sat', value: 88, label: 'Joyful' },
    { day: 'Sun', value: 85, label: 'Grateful' },
];

// ===== Weekly Activity =====
const weeklyActivity = [
    { day: 'Mon', meditation: 20, reflection: 15, heritage: 10 },
    { day: 'Tue', meditation: 30, reflection: 10, heritage: 25 },
    { day: 'Wed', meditation: 15, reflection: 20, heritage: 5 },
    { day: 'Thu', meditation: 25, reflection: 25, heritage: 20 },
    { day: 'Fri', meditation: 35, reflection: 10, heritage: 15 },
    { day: 'Sat', meditation: 40, reflection: 30, heritage: 35 },
    { day: 'Sun', meditation: 30, reflection: 25, heritage: 30 },
];

// ===== Mini Line Chart =====
const MiniLineChart = ({ data, color }) => {
    const maxVal = Math.max(...data.map(d => d.value));
    const minVal = Math.min(...data.map(d => d.value));
    const range = maxVal - minVal || 1;
    const width = 100;
    const height = 50;
    const padding = 4;
    // Generate a safe ID from color (strip non-alphanumeric chars)
    const gradId = 'grad' + color.replace(/[^a-zA-Z0-9]/g, '');

    const points = data.map((d, i) => ({
        x: padding + (i / (data.length - 1)) * (width - padding * 2),
        y: padding + (1 - (d.value - minVal) / range) * (height - padding * 2),
    }));

    const pathD = points.map((p, i) => {
        if (i === 0) return `M ${p.x} ${p.y}`;
        const prev = points[i - 1];
        const cpX = (prev.x + p.x) / 2;
        return `C ${cpX} ${prev.y} ${cpX} ${p.y} ${p.x} ${p.y}`;
    }).join(' ');

    const areaD = pathD + ` L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height: '100%' }}>
            <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d={areaD} fill={`url(#${gradId})`} />
            <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="3" fill={color} />
        </svg>
    );
};

// ===== Bar Chart =====
const BarChart = ({ data }) => {
    const maxTotal = Math.max(...data.map(d => d.meditation + d.reflection + d.heritage));
    return (
        <div className="flex items-end gap-3 h-44">
            {data.map((d, i) => {
                const total = d.meditation + d.reflection + d.heritage;
                const pct = (total / maxTotal) * 100;
                return (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full relative rounded-t-md overflow-hidden" style={{ height: `${pct}%`, minHeight: 8 }}>
                            <div className="absolute bottom-0 w-full" style={{ height: `${(d.meditation / total) * 100}%`, background: 'var(--accent)', borderRadius: '4px 4px 0 0' }} />
                            <div className="absolute w-full" style={{ bottom: `${(d.meditation / total) * 100}%`, height: `${(d.reflection / total) * 100}%`, background: 'var(--forest)', opacity: 0.7 }} />
                            <div className="absolute w-full" style={{ bottom: `${((d.meditation + d.reflection) / total) * 100}%`, height: `${(d.heritage / total) * 100}%`, background: '#7c3aed', opacity: 0.5 }} />
                        </div>
                        <span className="text-[10px] font-medium" style={{ color: 'var(--text-tertiary)' }}>{d.day}</span>
                    </div>
                );
            })}
        </div>
    );
};

// ===== Dashboard Component =====
const Dashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [reflectionCount, setReflectionCount] = useState(0);
    const [activeSection, setActiveSection] = useState('overview');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [dateRange, setDateRange] = useState('7days');
    const [isDark, setIsDark] = useState(false);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Seeker';
    const [profileName, setProfileName] = useState(displayName);
    const [profileEmail, setProfileEmail] = useState(user?.email || '');
    const [profileSaved, setProfileSaved] = useState(false);

    useEffect(() => {
        if (user) {
            setProfileName(user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Seeker');
            setProfileEmail(user.email || '');
        }
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        try {
            await authAPI.updateProfile({
                name: profileName,
                // Add any other fields you want to update
            });
            setProfileSaved(true);
            setTimeout(() => setProfileSaved(false), 2500);
        } catch (err) {
            console.error('Failed to update profile:', err);
        }
    };

    /* displayInitials helper */
    const displayInitials = getInitials(displayName);

    useEffect(() => {
        moodAPI.getAll().then(data => {
            if (data) setReflectionCount(data.length);
        }).catch(err => console.error('Failed to fetch reflection count:', err));

        setIsDark(document.body.dataset.theme === 'dark');
        const observer = new MutationObserver(() => {
            setIsDark(document.body.dataset.theme === 'dark');
        });
        observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    // ── GSAP Staggered Entrance ──
    const dashboardRef = useRef(null);
    useGSAP(() => {
        if (inView) {
            gsap.from(".kpi-card", {
                y: 60,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "expo.out",
                rotateX: -15,
                perspective: 1000
            });
            gsap.from(".chart-card", {
                y: 40,
                opacity: 0,
                duration: 1.5,
                delay: 0.4,
                stagger: 0.2,
                ease: "power4.out"
            });
        }
    }, { scope: dashboardRef, dependencies: [inView] });

    return (
        <>
            <SEO title="Dashboard — Inner Root" description="Your personal wellness and heritage dashboard." />

            <div className="flex min-h-screen relative overflow-hidden" style={{ background: 'var(--bg-primary)', paddingTop: 0, marginTop: '-1rem' }}>
                {/* Background Decor */}
                <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden">
                    <div className="orb orb-1 !w-[600px] !h-[600px] top-[-10%] left-[-10%]" />
                    <div className="orb orb-2 !w-[500px] !h-[500px] bottom-[-5%] right-[-5%]" />
                </div>

                {/* ===== LEFT SIDEBAR ===== */}
                <aside
                    className={`hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-30 transition-all duration-300 glass-morphism ${sidebarOpen ? 'w-[260px]' : 'w-[72px]'
                        }`}
                    style={{
                        borderRight: '1px solid var(--border-primary)',
                    }}
                >
                    {/* Sidebar Header */}
                    <div className="flex items-center gap-3 px-5 h-16 border-b" style={{ borderColor: 'var(--border-primary)' }}>
                        <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))' }}
                        >
                            <span className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>IR</span>
                        </div>
                        {sidebarOpen && (
                            <span className="text-base font-semibold truncate" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                                Inner Root
                            </span>
                        )}
                    </div>

                    {/* Sidebar Nav */}
                    <nav className="flex-1 py-4 px-3 overflow-y-auto">
                        <div className="space-y-1">
                            {sidebarItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${sidebarOpen ? '' : 'justify-center'
                                        }`}
                                    style={{
                                        color: activeSection === item.id ? 'var(--accent)' : 'var(--text-secondary)',
                                        background: activeSection === item.id ? 'var(--accent-soft)' : 'transparent',
                                    }}
                                    title={item.label}
                                >
                                    <item.icon size={20} strokeWidth={activeSection === item.id ? 2 : 1.5} />
                                    {sidebarOpen && <span>{item.label}</span>}
                                </button>
                            ))}
                        </div>
                    </nav>

                    {/* Sidebar Toggle */}
                    <div className="px-3 py-4 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium transition-all duration-200"
                            style={{ color: 'var(--text-tertiary)', background: 'var(--accent-soft)' }}
                        >
                            {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                            {sidebarOpen && 'Collapse'}
                        </button>
                    </div>
                </aside>

                {/* ===== MAIN CONTENT ===== */}
                <div
                    className={`flex-1 transition-all duration-300 relative z-10 ${sidebarOpen ? 'lg:ml-[260px]' : 'lg:ml-[72px]'}`}
                >
                    {/* Top Bar */}
                    <div
                        className="sticky top-16 lg:top-0 z-20 flex items-center justify-between px-6 lg:px-8 h-18 glass-morphism"
                        style={{
                            borderBottom: '1px solid var(--border-secondary)',
                        }}
                    >
                        <div className="flex items-center justify-between mb-16">
                            <div>
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-accent font-black uppercase text-[10px] tracking-[0.4em] mb-4 block"
                                >
                                    Executive Overview
                                </motion.span>
                                <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase">
                                    YOUR <span className="text-accent underline decoration-accent/20 underline-offset-8">SANCTUARY</span>
                                </h1>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="hidden md:flex flex-col items-end">
                                    <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Aura Resonance</span>
                                    <span className="text-xl font-display font-black text-accent">89.4%</span>
                                </div>
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-accent transition-all cursor-pointer relative">
                                    <Bell size={24} />
                                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-accent animate-ping" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                to="/tools/sql-seed-generator"
                                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
                                style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                            >
                                <Database size={14} />
                                <span>SQL Seed Tool</span>
                            </Link>

                            {/* Date Range Filter */}
                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="hidden sm:block text-xs px-3 py-2 rounded-lg border-none appearance-none cursor-pointer"
                                style={{
                                    background: 'var(--accent-soft)',
                                    color: 'var(--text-secondary)',
                                    fontFamily: 'var(--font-body)',
                                }}
                            >
                                <option value="7days">Last 7 Days</option>
                                <option value="30days">Last 30 Days</option>
                                <option value="90days">Last 90 Days</option>
                            </select>

                            {/* Notifications */}
                            <button
                                className="relative w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                                style={{ color: 'var(--text-secondary)', background: 'var(--accent-soft)' }}
                            >
                                <Bell size={18} />
                                <span className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
                            </button>

                            {/* Profile avatar — click to open Profile section */}
                            <button
                                onClick={() => setActiveSection('profile')}
                                title={`${displayName} — View Profile`}
                                style={{
                                    width: 40, height: 40,
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))',
                                    color: '#fff',
                                    fontWeight: 700,
                                    fontSize: '0.8125rem',
                                    border: '2px solid transparent',
                                    cursor: 'pointer',
                                    transition: 'box-shadow 0.2s, border-color 0.2s',
                                    flexShrink: 0,
                                }}
                                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-glow)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                                onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = 'transparent'; }}
                            >
                                {user?.profilePicture
                                    ? <img src={user.profilePicture} alt={displayName} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                                    : displayInitials
                                }
                            </button>
                        </div>
                    </div>

                    {/* Dashboard Content */}
                    <div ref={dashboardRef} className="p-6 lg:p-8 space-y-8 perspective-1000">

                        {/* ══ PROFILE SECTION ══ */}
                        {activeSection === 'profile' && (
                            <motion.div
                                key="profile-section"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                className="space-y-6"
                            >
                                <div>
                                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>My Profile</h2>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>Manage your account information and preferences</p>
                                </div>

                                {/* Avatar + name card */}
                                <div className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6"
                                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', boxShadow: 'var(--shadow-sm)' }}>
                                    <div style={{ position: 'relative', flexShrink: 0 }}>
                                        <div style={{
                                            width: 88, height: 88, borderRadius: '50%',
                                            background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '2rem', fontWeight: 700, color: '#fff',
                                            boxShadow: '0 4px 20px var(--accent-glow)',
                                            overflow: 'hidden',
                                        }}>
                                            {user?.profilePicture
                                                ? <img src={user.profilePicture} alt={displayName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                : displayInitials
                                            }
                                        </div>
                                        <button style={{
                                            position: 'absolute', bottom: 0, right: 0,
                                            width: 28, height: 28, borderRadius: '50%',
                                            background: 'var(--accent)', color: '#fff', border: '2px solid var(--bg-card)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                        }} title="Change photo">
                                            <Camera size={12} />
                                        </button>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)' }}>{displayName}</div>
                                        <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>{user?.email || 'Not signed in'}</div>
                                        <div style={{ marginTop: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.25em 0.75em', background: 'var(--accent-soft)', color: 'var(--accent)', borderRadius: '9999px', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                                            {user?.role || 'Seeker'}
                                        </div>
                                    </div>
                                </div>

                                {/* Edit form */}
                                <form onSubmit={handleSaveProfile} className="rounded-2xl p-6 sm:p-8 space-y-5"
                                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', boxShadow: 'var(--shadow-sm)' }}>
                                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Account Details</h3>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(220px,100%),1fr))', gap: '1rem' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Display Name</label>
                                            <div style={{ position: 'relative' }}>
                                                <User size={14} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                                                <input
                                                    value={profileName}
                                                    onChange={e => setProfileName(e.target.value)}
                                                    className="input"
                                                    style={{ paddingLeft: '2.5rem', width: '100%' }}
                                                    placeholder="Your full name"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email Address</label>
                                            <div style={{ position: 'relative' }}>
                                                <Mail size={14} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                                                <input
                                                    type="email"
                                                    value={profileEmail}
                                                    onChange={e => setProfileEmail(e.target.value)}
                                                    className="input"
                                                    style={{ paddingLeft: '2.5rem', width: '100%' }}
                                                    placeholder="you@example.com"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', paddingTop: '0.5rem', flexWrap: 'wrap' }}>
                                        <button type="submit" className="btn btn-primary btn-sm">
                                            {profileSaved ? '✓ Saved!' : 'Save Changes'}
                                        </button>
                                        {profileSaved && (
                                            <span style={{ fontSize: '0.8125rem', color: 'var(--success)' }}>Profile updated successfully.</span>
                                        )}
                                    </div>
                                </form>

                                {/* Security & Danger zone */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(280px,100%),1fr))', gap: '1rem' }}>
                                    {/* Change password */}
                                    <div className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.875rem' }}>
                                            <Shield size={16} style={{ color: 'var(--accent)' }} />
                                            <span style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>Security</span>
                                        </div>
                                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', marginBottom: '1rem', lineHeight: 1.6 }}>
                                            Manage your password and two-factor authentication settings.
                                        </p>
                                        <button className="btn btn-secondary btn-sm">Change Password</button>
                                    </div>

                                    {/* Danger zone / Logout */}
                                    <div className="rounded-2xl p-6" style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.18)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.875rem' }}>
                                            <LogOut size={16} style={{ color: '#ef4444' }} />
                                            <span style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#ef4444' }}>Sign Out</span>
                                        </div>
                                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', marginBottom: '1rem', lineHeight: 1.6 }}>
                                            You'll be returned to the sign-in page. Your data is preserved.
                                        </p>
                                        <button
                                            onClick={handleLogout}
                                            className="btn btn-sm"
                                            style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.25)' }}
                                        >
                                            <LogOut size={14} /> Sign Out Now
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ══ ALL OTHER SECTIONS ══ */}
                        {activeSection !== 'profile' && (
                            <>
                                {/* === KPI Cards === */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 preserve-3d">
                                    {kpiData.map((kpi, i) => (
                                        <div
                                            key={kpi.label}
                                            className="kpi-card hover-3d group rounded-2xl p-5 transition-all duration-300 card-8k shimmer-border"
                                            style={{
                                                background: isDark ? kpi.darkGradient : kpi.gradient,
                                            }}
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div
                                                    className="w-11 h-11 rounded-xl flex items-center justify-center shadow-sm"
                                                    style={{ background: `${kpi.color}15`, color: kpi.color }}
                                                >
                                                    <kpi.icon size={22} strokeWidth={1.5} />
                                                </div>
                                                <span
                                                    className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                                                    style={{ color: kpi.color, background: `${kpi.color}15`, border: `1px solid ${kpi.color}30` }}
                                                >
                                                    {kpi.change}
                                                </span>
                                            </div>
                                            <div className="text-4xl font-bold mb-1 tracking-tighter" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                                                {kpi.label === 'Reflections Done' ? reflectionCount : kpi.value}{kpi.unit || ''}
                                            </div>
                                            <div className="text-[10px] font-bold uppercase tracking-widest opacity-60" style={{ color: 'var(--text-primary)' }}>
                                                {kpi.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* === Charts Row === */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 preserve-3d">
                                    {/* Mood Trend Chart */}
                                    <div className="chart-card card-8k shimmer-border p-6 hover-3d bg-surface">
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <h3 className="text-base font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Mood Trend</h3>
                                                <p className="text-[10px] uppercase tracking-widest mt-1" style={{ color: 'var(--text-tertiary)' }}>Weekly emotional journey</p>
                                            </div>
                                            <div className="flex items-center gap-1 text-[10px] font-bold px-3 py-1 rounded-full" style={{ background: 'var(--accent-soft)', color: 'var(--accent)', border: '1px solid var(--accent-faint)' }}>
                                                <TrendingUp size={12} />
                                                <span>+12%</span>
                                            </div>
                                        </div>
                                        <div className="h-40 mb-4 opacity-80 hover:opacity-100 transition-opacity">
                                            <MiniLineChart data={moodData} color="var(--accent)" />
                                        </div>
                                        <div className="flex justify-between px-1">
                                            {moodData.map((d) => (
                                                <div key={d.day} className="text-center group/day">
                                                    <div className="text-[10px] font-bold transition-colors group-hover/day:text-accent" style={{ color: 'var(--text-tertiary)' }}>{d.day}</div>
                                                    <div className="text-[9px] mt-0.5 opacity-60" style={{ color: 'var(--text-secondary)' }}>{d.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Weekly Activity Chart */}
                                    <div className="chart-card card-8k shimmer-border p-6 hover-3d bg-surface">
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <h3 className="text-base font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Weekly Activity</h3>
                                                <p className="text-[10px] uppercase tracking-widest mt-1" style={{ color: 'var(--text-tertiary)' }}>Meditation & Heritage</p>
                                            </div>
                                            <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-tighter opacity-70">
                                                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} /> Zen</span>
                                                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--forest)', opacity: 0.7 }} /> Soul</span>
                                                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full" style={{ background: '#7c3aed', opacity: 0.5 }} /> Root</span>
                                            </div>
                                        </div>
                                        <div className="opacity-80 hover:opacity-100 transition-opacity">
                                            <BarChart data={weeklyActivity} />
                                        </div>
                                    </div>
                                </div>

                                {/* === Bottom Cards === */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Suggested Ritual */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={inView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.5, duration: 0.5 }}
                                        className="relative overflow-hidden rounded-2xl p-6 sm:p-8"
                                        style={{
                                            background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))',
                                            boxShadow: '0 12px 40px var(--accent-glow)',
                                        }}
                                    >
                                        <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10" style={{ background: '#fff', transform: 'translate(30%, -30%)' }} />
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Sparkles size={18} className="text-white/80" />
                                                <span className="text-xs font-semibold text-white/70 tracking-widest uppercase">Today's Ritual</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                                                Surya Namaskar
                                            </h3>
                                            <p className="text-sm text-white/80 mb-5 leading-relaxed">
                                                Start your day with 12 rounds of Sun Salutation. Honor the solar energy that sustains all life — a practice rooted in Vedic tradition.
                                            </p>
                                            <button className="btn btn-sm" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}>
                                                Begin Practice
                                                <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    </motion.div>

                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div >
        </>
    );
};

export default Dashboard;
