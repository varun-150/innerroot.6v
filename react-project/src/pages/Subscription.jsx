import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    BookOpen,
    Check,
    Clock,
    Crown,
    Gift,
    Globe,
    Infinity,
    Minus,
    Plus,
    Rocket,
    ShieldCheck,
    Sparkles,
    Users,
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SEO from '../components/ui/SEO';

gsap.registerPlugin(useGSAP);

const heroStats = [
    { value: '3', label: 'Clear membership tiers' },
    { value: '50+', label: 'Countries in the community' },
    { value: '5%', label: 'Reinvested into local artists' },
];

const plans = [
    {
        id: 'free',
        name: 'Vedic Explorer',
        eyebrow: 'Best for first-time seekers',
        price: '₹0',
        period: 'Free forever',
        description:
            'A calm starting point for exploring heritage content, community conversations, and a lighter wellness rhythm.',
        note: 'No payment setup needed',
        ctaLabel: 'Start free',
        ctaTo: '/signup',
        secondaryLabel: 'Browse the library',
        secondaryTo: '/library',
        icon: Rocket,
        accent: '#f3f4f6',
        surface:
            'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(10,10,11,0.94) 100%)',
        border: 'rgba(255,255,255,0.12)',
        iconSurface: 'rgba(255,255,255,0.08)',
        buttonSurface: 'rgba(255,255,255,0.07)',
        buttonColor: '#ffffff',
        shadow: '0 24px 80px rgba(0, 0, 0, 0.35)',
        features: [
            'Daily wisdom nuggets and starter meditation tracks',
            'Community access and guided exploration prompts',
            'Heritage map browsing and curated discoveries',
            'Five AI questions per day for light guidance',
        ],
    },
    {
        id: 'pro',
        name: 'Heritage Pro',
        eyebrow: 'Best for active weekly practice',
        price: '₹499',
        period: 'Per month',
        description:
            'The core Inner Root experience for members who want deeper study, richer wellness routines, and stronger guidance.',
        note: 'Most members choose this path',
        badge: 'Most popular',
        ctaLabel: 'Unlock Pro',
        ctaTo: '/signup',
        secondaryLabel: 'See wellness experience',
        secondaryTo: '/wellness',
        icon: Crown,
        accent: 'var(--color-accent)',
        surface:
            'linear-gradient(180deg, rgba(212,175,55,0.16) 0%, rgba(17,13,7,0.96) 100%)',
        border: 'rgba(212,175,55,0.45)',
        iconSurface: 'rgba(212,175,55,0.16)',
        buttonSurface: 'linear-gradient(135deg, #f5d154 0%, #d4af37 100%)',
        buttonColor: '#111111',
        shadow: '0 35px 120px rgba(0, 0, 0, 0.5), 0 0 40px rgba(212, 175, 55, 0.12)',
        features: [
            'Unlimited heritage chatbot access and deeper context',
            'Advanced wellness routines with curated weekly paths',
            'Scholar workshops, downloadable guides, and early feature access',
            'Higher-fidelity map layers and richer library unlocks',
        ],
    },
    {
        id: 'elite',
        name: 'Sanatana Elite',
        eyebrow: 'Best for families and long-term devotion',
        price: '₹1,999',
        period: 'Per year',
        description:
            'A high-touch plan for households and committed learners who want more human support around their journey.',
        note: 'Built for deeper commitment',
        ctaLabel: 'Talk to the team',
        ctaTo: '/contact',
        secondaryLabel: 'Explore community',
        secondaryTo: '/community',
        icon: Infinity,
        accent: '#c7d2fe',
        surface:
            'linear-gradient(180deg, rgba(99,102,241,0.16) 0%, rgba(10,10,18,0.95) 100%)',
        border: 'rgba(99,102,241,0.32)',
        iconSurface: 'rgba(99,102,241,0.16)',
        buttonSurface: 'rgba(199,210,254,0.12)',
        buttonColor: '#eef2ff',
        shadow: '0 24px 90px rgba(0, 0, 0, 0.45), 0 0 30px rgba(99, 102, 241, 0.12)',
        features: [
            'Everything in Pro plus expert consultations',
            'Family access for up to four members in one household',
            'Priority support and a physical heritage welcome kit',
            'Long-range access designed for sustained learning',
        ],
    },
];

const valueCards = [
    {
        title: 'Designed for deeper practice',
        description:
            'Paid plans are structured around habit-building, not just feature unlocks. The content feels more guided, less noisy, and easier to return to.',
        icon: Sparkles,
    },
    {
        title: 'Premium access without confusion',
        description:
            'The pricing model is intentionally simple: free to begin, Pro for active use, Elite for families and higher-touch support.',
        icon: ShieldCheck,
    },
    {
        title: 'Membership with cultural impact',
        description:
            'A portion of paid revenue supports local artists, preservation work, and community storytelling across the Inner Root ecosystem.',
        icon: Gift,
    },
];

const panelHighlights = [
    {
        title: 'Curated weekly rhythm',
        description: 'Fresh library picks, guided routines, and prompts that make the product easier to come back to.',
        icon: BookOpen,
    },
    {
        title: 'A real learning community',
        description: 'Move from solo browsing into scholar sessions, discussions, and shared community momentum.',
        icon: Users,
    },
    {
        title: 'India-first trust model',
        description: 'The experience is built to honor culture, protect access, and reinvest in the ecosystem around it.',
        icon: Globe,
    },
];

const faqs = [
    {
        question: 'How should I decide between Pro and Elite?',
        answer:
            'Choose Pro if you want the full individual experience with richer content, stronger AI guidance, and wellness depth. Choose Elite if you want family access, expert-led support, and a longer-term membership feel.',
    },
    {
        question: 'Is the free plan still useful, or is it just a teaser?',
        answer:
            'The free plan is intentionally valuable. It gives new members enough access to understand the product, explore the heritage library, and join the community before deciding whether deeper access makes sense.',
    },
    {
        question: 'What changes immediately when I move to a paid plan?',
        answer:
            'The main shift is depth. You get more guidance, broader access to premium content, stronger wellness support, and a more complete version of the Inner Root experience.',
    },
    {
        question: 'Who is the Elite plan actually for?',
        answer:
            'Elite is best for households, committed learners, and members who want more human support around their journey. It is positioned as a higher-touch path rather than just a bigger feature bundle.',
    },
];

const getSubscriptionTheme = (isDarkTheme) => ({
    textStrong: isDarkTheme ? '#ffffff' : 'var(--color-text)',
    textBody: isDarkTheme ? 'rgba(255,255,255,0.72)' : 'rgba(28,25,23,0.72)',
    textMuted: isDarkTheme ? 'rgba(255,255,255,0.64)' : 'rgba(28,25,23,0.64)',
    textSoft: isDarkTheme ? 'rgba(255,255,255,0.46)' : 'rgba(28,25,23,0.5)',
    panelBody: isDarkTheme ? 'rgba(255,255,255,0.68)' : 'rgba(28,25,23,0.7)',
    statSurface: isDarkTheme ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.72)',
    statBorder: isDarkTheme ? 'rgba(255,255,255,0.08)' : 'rgba(28,25,23,0.08)',
    softSurface: isDarkTheme ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.82)',
    softBorder: isDarkTheme ? 'rgba(255,255,255,0.08)' : 'rgba(28,25,23,0.08)',
    panelSurface: isDarkTheme
        ? 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(11,11,12,0.94) 100%)'
        : 'linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(245,242,234,0.98) 100%)',
    panelBorder: isDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(28,25,23,0.08)',
    panelShadow: isDarkTheme ? '0 28px 90px rgba(0, 0, 0, 0.45)' : '0 28px 90px rgba(28, 25, 23, 0.1)',
    valueSurface: isDarkTheme ? 'rgba(255,255,255,0.035)' : 'rgba(255,255,255,0.84)',
    valueBorder: isDarkTheme ? 'rgba(255,255,255,0.08)' : 'rgba(28,25,23,0.08)',
    valueShadow: isDarkTheme ? '0 18px 60px rgba(0, 0, 0, 0.2)' : '0 18px 60px rgba(28, 25, 23, 0.08)',
    closingSurface: isDarkTheme
        ? 'linear-gradient(135deg, rgba(212,175,55,0.14) 0%, rgba(18,18,18,0.96) 60%)'
        : 'linear-gradient(135deg, rgba(245,209,84,0.18) 0%, rgba(255,255,255,0.96) 62%)',
    closingBorder: isDarkTheme ? 'rgba(212,175,55,0.2)' : 'rgba(212,175,55,0.24)',
    closingShadow: isDarkTheme ? '0 30px 100px rgba(0, 0, 0, 0.35)' : '0 26px 80px rgba(28, 25, 23, 0.1)',
    secondaryButtonSurface: isDarkTheme ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.82)',
    secondaryButtonBorder: isDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(28,25,23,0.1)',
});

const getPlanVisuals = (planId, isDarkTheme) => {
    if (planId === 'free') {
        return isDarkTheme
            ? {
                accent: '#f3f4f6',
                surface: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(10,10,11,0.94) 100%)',
                border: 'rgba(255,255,255,0.12)',
                iconSurface: 'rgba(255,255,255,0.08)',
                buttonSurface: 'rgba(255,255,255,0.07)',
                buttonColor: '#ffffff',
                shadow: '0 24px 80px rgba(0, 0, 0, 0.35)',
            }
            : {
                accent: '#57534e',
                surface: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(244,244,245,0.94) 100%)',
                border: 'rgba(28,25,23,0.08)',
                iconSurface: 'rgba(28,25,23,0.05)',
                buttonSurface: 'rgba(28,25,23,0.06)',
                buttonColor: '#1c1917',
                shadow: '0 24px 80px rgba(28, 25, 23, 0.08)',
            };
    }

    if (planId === 'pro') {
        return isDarkTheme
            ? {
                accent: 'var(--color-accent)',
                surface: 'linear-gradient(180deg, rgba(212,175,55,0.16) 0%, rgba(17,13,7,0.96) 100%)',
                border: 'rgba(212,175,55,0.45)',
                iconSurface: 'rgba(212,175,55,0.16)',
                buttonSurface: 'linear-gradient(135deg, #f5d154 0%, #d4af37 100%)',
                buttonColor: '#111111',
                shadow: '0 35px 120px rgba(0, 0, 0, 0.5), 0 0 40px rgba(212, 175, 55, 0.12)',
            }
            : {
                accent: 'var(--color-accent)',
                surface: 'linear-gradient(180deg, rgba(245,209,84,0.24) 0%, rgba(255,250,235,0.98) 100%)',
                border: 'rgba(212,175,55,0.32)',
                iconSurface: 'rgba(212,175,55,0.16)',
                buttonSurface: 'linear-gradient(135deg, #f5d154 0%, #d4af37 100%)',
                buttonColor: '#111111',
                shadow: '0 28px 90px rgba(184, 134, 11, 0.14)',
            };
    }

    return isDarkTheme
        ? {
            accent: '#c7d2fe',
            surface: 'linear-gradient(180deg, rgba(99,102,241,0.16) 0%, rgba(10,10,18,0.95) 100%)',
            border: 'rgba(99,102,241,0.32)',
            iconSurface: 'rgba(99,102,241,0.16)',
            buttonSurface: 'rgba(199,210,254,0.12)',
            buttonColor: '#eef2ff',
            shadow: '0 24px 90px rgba(0, 0, 0, 0.45), 0 0 30px rgba(99, 102, 241, 0.12)',
        }
        : {
            accent: '#4338ca',
            surface: 'linear-gradient(180deg, rgba(199,210,254,0.3) 0%, rgba(248,250,252,0.98) 100%)',
            border: 'rgba(99,102,241,0.22)',
            iconSurface: 'rgba(99,102,241,0.12)',
            buttonSurface: 'rgba(99,102,241,0.1)',
            buttonColor: '#4338ca',
            shadow: '0 24px 80px rgba(99, 102, 241, 0.12)',
        };
};

const PlanCard = ({ plan, isDarkTheme, themeStyles }) => {
    const Icon = plan.icon;
    const isFeatured = Boolean(plan.badge);
    const visuals = getPlanVisuals(plan.id, isDarkTheme);

    return (
        <article
            className="subscription-plan-card group relative flex h-full flex-col overflow-hidden rounded-[2.25rem] border p-8 lg:p-10 hover-3d"
            style={{
                background: visuals.surface,
                borderColor: visuals.border,
                boxShadow: visuals.shadow,
            }}
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-24"
                style={{
                    background: isFeatured
                        ? 'linear-gradient(180deg, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0) 100%)'
                        : isDarkTheme
                            ? 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%)'
                            : 'linear-gradient(180deg, rgba(28,25,23,0.05) 0%, rgba(28,25,23,0) 100%)',
                }}
            />

            <div className="relative z-10 flex h-full flex-col">
                <div className="mb-8 flex items-start justify-between gap-6">
                    <div
                        className="flex h-16 w-16 items-center justify-center rounded-[1.35rem] border"
                        style={{
                            background: visuals.iconSurface,
                            borderColor: visuals.border,
                            color: visuals.accent,
                        }}
                    >
                        <Icon size={30} strokeWidth={1.7} />
                    </div>

                    {plan.badge ? (
                        <span
                            className="rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em]"
                            style={{
                                background: 'rgba(212,175,55,0.14)',
                                color: 'var(--color-accent)',
                                border: '1px solid rgba(212,175,55,0.28)',
                            }}
                        >
                            {plan.badge}
                        </span>
                    ) : null}
                </div>

                <div className="mb-8">
                    <p
                        className="mb-3 text-[11px] font-black uppercase tracking-[0.28em]"
                        style={{ color: isFeatured ? 'var(--color-accent)' : themeStyles.textSoft }}
                    >
                        {plan.eyebrow}
                    </p>

                    <h2
                        className="mb-4 text-3xl font-black uppercase tracking-tight text-white"
                        style={{ color: themeStyles.textStrong, fontFamily: 'var(--font-display)' }}
                    >
                        {plan.name}
                    </h2>

                    <div className="mb-4 flex items-end gap-3">
                        <span className="text-5xl font-black tracking-tight sm:text-6xl" style={{ color: themeStyles.textStrong }}>
                            {plan.price}
                        </span>
                        <span className="pb-1 text-sm uppercase tracking-[0.18em]" style={{ color: themeStyles.textSoft }}>
                            {plan.period}
                        </span>
                    </div>

                    <p className="max-w-none text-sm leading-relaxed" style={{ color: themeStyles.textBody }}>{plan.description}</p>
                </div>

                <div
                    className="mb-8 rounded-[1.5rem] border px-4 py-4"
                    style={{
                        background: themeStyles.softSurface,
                        borderColor: themeStyles.softBorder,
                    }}
                >
                    <div className="flex items-center gap-3 text-sm" style={{ color: themeStyles.textStrong }}>
                        <Clock size={16} style={{ color: visuals.accent }} />
                        <span>{plan.note}</span>
                    </div>
                </div>

                <ul className="mb-10 flex-grow space-y-4">
                    {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: themeStyles.textBody }}>
                            <span
                                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                                style={{
                                    background: themeStyles.softBorder,
                                    color: visuals.accent,
                                }}
                            >
                                <Check size={14} strokeWidth={2.7} />
                            </span>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-auto space-y-4">
                    <Link
                        to={plan.ctaTo}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-[1.35rem] px-6 py-4 text-center text-xs font-black uppercase tracking-[0.24em] transition duration-300 hover:-translate-y-0.5"
                        style={{
                            background: visuals.buttonSurface,
                            color: visuals.buttonColor,
                            boxShadow: isFeatured
                                ? '0 18px 40px rgba(212, 175, 55, 0.16)'
                                : visuals.shadow,
                        }}
                    >
                        {plan.ctaLabel}
                        <ArrowRight size={16} />
                    </Link>

                    <Link
                        to={plan.secondaryTo}
                        className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                        style={{ color: themeStyles.textMuted }}
                    >
                        {plan.secondaryLabel}
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </article>
    );
};

const Subscription = () => {
    const containerRef = useRef(null);
    const [openFaq, setOpenFaq] = useState(0);
    const [isDarkTheme, setIsDarkTheme] = useState(() =>
        typeof document !== 'undefined' ? document.body.dataset.theme === 'dark' : false
    );
    const themeStyles = getSubscriptionTheme(isDarkTheme);

    useEffect(() => {
        const syncTheme = () => {
            setIsDarkTheme(document.body.dataset.theme === 'dark');
        };

        syncTheme();
        const observer = new MutationObserver(syncTheme);
        observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });

        return () => observer.disconnect();
    }, []);

    useGSAP(
        () => {
            const media = gsap.matchMedia();

            media.add('(prefers-reduced-motion: no-preference)', () => {
                gsap.from('.subscription-hero-copy', {
                    y: 32,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.14,
                    ease: 'power3.out',
                });

                gsap.from('.subscription-panel', {
                    y: 40,
                    opacity: 0,
                    duration: 1.1,
                    stagger: 0.12,
                    ease: 'power3.out',
                    delay: 0.1,
                });

                gsap.from('.subscription-plan-card', {
                    y: 52,
                    opacity: 0,
                    duration: 1.1,
                    stagger: 0.12,
                    ease: 'power3.out',
                    delay: 0.2,
                });

                gsap.from('.subscription-faq', {
                    y: 24,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.08,
                    ease: 'power2.out',
                    delay: 0.25,
                });
            });

            return () => media.revert();
        },
        { scope: containerRef }
    );

    return (
        <div ref={containerRef} className="relative min-h-screen overflow-hidden" style={{ background: 'var(--color-bg)' }}>
            <SEO
                title="Membership Plans - Inner Root"
                description="Choose the Inner Root membership tier that matches your heritage, wellness, and community journey."
            />

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="orb orb-1 opacity-70" />
                <div className="orb orb-2 opacity-50" />
                <div className="orb orb-3 opacity-40" />
                <div className="sacred-geometry" style={{ opacity: 0.05 }} />
            </div>

            <div className="container-8k relative z-10 pt-32 pb-24">
                <section className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:gap-10">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="hero-badge subscription-hero-copy mb-8"
                        >
                            <Sparkles size={14} />
                            Membership designed for modern seekers
                        </motion.div>

                        <p
                            className="subscription-hero-copy mb-4 text-[11px] font-black uppercase tracking-[0.45em]"
                            style={{ color: themeStyles.textSoft }}
                        >
                            Pricing that feels intentional
                        </p>

                        <h1 className="display-1 subscription-hero-copy mb-8" style={{ color: themeStyles.textStrong }}>
                            Choose the <span className="text-gradient">Inner Root</span> path that matches your pace.
                        </h1>

                        <p className="lead subscription-hero-copy mb-10 max-w-3xl" style={{ color: themeStyles.textBody }}>
                            The subscription page needed more than prettier cards. It needed clearer decision-making,
                            stronger hierarchy, and a membership story that actually helps someone choose with confidence.
                        </p>

                        <div className="subscription-hero-copy mb-12 flex flex-col gap-4 sm:flex-row">
                            <Link
                                to="/signup"
                                className="inline-flex items-center justify-center gap-2 rounded-[1.35rem] px-7 py-4 text-xs font-black uppercase tracking-[0.24em] text-black transition duration-300 hover:-translate-y-0.5"
                                style={{
                                    background: 'linear-gradient(135deg, #f5d154 0%, #d4af37 100%)',
                                    boxShadow: '0 18px 44px rgba(212, 175, 55, 0.18)',
                                }}
                            >
                                Start free
                                <ArrowRight size={16} />
                            </Link>

                            <a
                                href="#plans"
                                className="inline-flex items-center justify-center gap-2 rounded-[1.35rem] border px-7 py-4 text-xs font-black uppercase tracking-[0.24em] transition duration-300 hover:-translate-y-0.5"
                                style={{
                                    background: themeStyles.secondaryButtonSurface,
                                    borderColor: themeStyles.secondaryButtonBorder,
                                    color: themeStyles.textStrong,
                                }}
                            >
                                Compare plans
                            </a>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="subscription-hero-copy grid gap-4 sm:grid-cols-3"
                        >
                            {heroStats.map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-[1.5rem] border px-5 py-5 backdrop-blur-xl"
                                    style={{
                                        background: themeStyles.statSurface,
                                        borderColor: themeStyles.statBorder,
                                    }}
                                >
                                    <div className="mb-1 text-3xl font-black" style={{ color: themeStyles.textStrong }}>{item.value}</div>
                                    <p className="max-w-none text-xs uppercase tracking-[0.18em]" style={{ color: themeStyles.textSoft }}>{item.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <div
                        className="subscription-panel overflow-hidden rounded-[2.5rem] border p-6 sm:p-8"
                        style={{
                            background: themeStyles.panelSurface,
                            borderColor: themeStyles.panelBorder,
                            boxShadow: themeStyles.panelShadow,
                        }}
                    >
                        <div className="mb-8 flex items-center justify-between gap-4">
                            <div>
                                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: themeStyles.textSoft }}>
                                    What changes with membership
                                </p>
                                <h2
                                    className="text-3xl font-black tracking-tight"
                                    style={{ color: themeStyles.textStrong, fontFamily: 'var(--font-display)' }}
                                >
                                    More depth, less noise.
                                </h2>
                            </div>

                            <div
                                className="flex h-14 w-14 items-center justify-center rounded-[1.25rem]"
                                style={{ background: 'rgba(212,175,55,0.12)', color: 'var(--color-accent)' }}
                            >
                                <Crown size={28} />
                            </div>
                        </div>

                        <p className="mb-8 max-w-none text-sm leading-relaxed" style={{ color: themeStyles.panelBody }}>
                            Instead of stacking random perks, the page now explains what paid access actually feels like:
                            stronger guidance, a cleaner experience, richer content, and a clearer next step.
                        </p>

                        <div className="space-y-4">
                            {panelHighlights.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.title}
                                        className="subscription-panel rounded-[1.5rem] border p-5"
                                        style={{
                                            background: themeStyles.softSurface,
                                            borderColor: themeStyles.softBorder,
                                        }}
                                    >
                                        <div className="mb-3 flex items-center gap-3">
                                            <div
                                                className="flex h-11 w-11 items-center justify-center rounded-[1rem]"
                                                style={{ background: 'rgba(212,175,55,0.12)', color: 'var(--color-accent)' }}
                                            >
                                                <Icon size={20} />
                                            </div>
                                            <h3 className="text-base font-semibold" style={{ color: themeStyles.textStrong }}>{item.title}</h3>
                                        </div>

                                        <p className="max-w-none text-sm leading-relaxed" style={{ color: themeStyles.textMuted }}>{item.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <div className="divider-8k" />

                <section id="plans" className="mb-24 scroll-mt-32">
                    <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl">
                            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: themeStyles.textSoft }}>
                                Compare tiers
                            </p>
                            <h2
                                className="mb-4 text-4xl font-black tracking-tight sm:text-5xl"
                                style={{ color: themeStyles.textStrong, fontFamily: 'var(--font-display)' }}
                            >
                                Three plans, one clearer decision.
                            </h2>
                            <p className="max-w-none text-sm leading-relaxed" style={{ color: themeStyles.textMuted }}>
                                Each tier now has a stronger story: who it is for, what changes when you upgrade, and
                                where the next action should go.
                            </p>
                        </div>

                        <div
                            className="rounded-[1.5rem] border px-5 py-4 text-sm leading-relaxed"
                            style={{
                                background: themeStyles.softSurface,
                                borderColor: themeStyles.softBorder,
                                color: themeStyles.textMuted,
                            }}
                        >
                            <span className="font-semibold" style={{ color: themeStyles.textStrong }}>Pricing shown in INR.</span> The page is now
                            structured for readability first, so the premium feel comes from hierarchy and clarity, not
                            just louder effects.
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
                        {plans.map((plan) => (
                            <PlanCard key={plan.id} plan={plan} isDarkTheme={isDarkTheme} themeStyles={themeStyles} />
                        ))}
                    </div>
                </section>

                <section className="mb-24 grid gap-6 lg:grid-cols-3">
                    {valueCards.map((card) => {
                        const Icon = card.icon;

                        return (
                            <article
                                key={card.title}
                                className="subscription-panel rounded-[2rem] border p-7"
                                style={{
                                    background: themeStyles.valueSurface,
                                    borderColor: themeStyles.valueBorder,
                                    boxShadow: themeStyles.valueShadow,
                                }}
                            >
                                <div
                                    className="mb-5 flex h-14 w-14 items-center justify-center rounded-[1.15rem]"
                                    style={{ background: 'rgba(212,175,55,0.12)', color: 'var(--color-accent)' }}
                                >
                                    <Icon size={24} />
                                </div>
                                <h3 className="mb-3 text-xl font-semibold" style={{ color: themeStyles.textStrong }}>{card.title}</h3>
                                <p className="max-w-none text-sm leading-relaxed" style={{ color: themeStyles.textMuted }}>{card.description}</p>
                            </article>
                        );
                    })}
                </section>

                <section className="mb-24">
                    <div className="mb-8 max-w-2xl">
                        <p className="mb-3 text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: themeStyles.textSoft }}>
                            Common questions
                        </p>
                        <h2
                            className="mb-4 text-4xl font-black tracking-tight sm:text-5xl"
                            style={{ color: themeStyles.textStrong, fontFamily: 'var(--font-display)' }}
                        >
                            The questions people ask before they commit.
                        </h2>
                        <p className="max-w-none text-sm leading-relaxed" style={{ color: themeStyles.textMuted }}>
                            The previous page looked premium but left too much unresolved. This FAQ closes that gap and
                            supports the decision without adding clutter.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        {faqs.map((faq, index) => {
                            const isOpen = openFaq === index;

                            return (
                                <div
                                    key={faq.question}
                                    className={`faq-8k subscription-faq ${isOpen ? 'open' : ''}`}
                                >
                                    <button
                                        type="button"
                                        className="faq-8k-btn"
                                        aria-expanded={isOpen}
                                        aria-controls={`subscription-faq-${index}`}
                                        onClick={() => setOpenFaq(isOpen ? -1 : index)}
                                    >
                                        <span>{faq.question}</span>
                                        <span className="faq-8k-icon" aria-hidden="true">
                                            {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                                        </span>
                                    </button>

                                    <div id={`subscription-faq-${index}`} className="faq-8k-body">
                                        <div className="faq-8k-answer">{faq.answer}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section
                    className="subscription-panel rounded-[2.5rem] border px-6 py-8 sm:px-8 sm:py-10 lg:px-12"
                    style={{
                        background: themeStyles.closingSurface,
                        borderColor: themeStyles.closingBorder,
                        boxShadow: themeStyles.closingShadow,
                    }}
                >
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl">
                            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: themeStyles.textSoft }}>
                                Ready when you are
                            </p>
                            <h2
                                className="mb-4 text-4xl font-black tracking-tight sm:text-5xl"
                                style={{ color: themeStyles.textStrong, fontFamily: 'var(--font-display)' }}
                            >
                                Start with free access or move straight into the full experience.
                            </h2>
                            <p className="max-w-none text-sm leading-relaxed" style={{ color: themeStyles.textBody }}>
                                The page now gives people a clearer runway: free for exploration, Pro for active
                                practice, Elite for higher-touch guidance. No dead-end buttons, no vague premium claims.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Link
                                to="/signup"
                                className="inline-flex items-center justify-center gap-2 rounded-[1.3rem] px-6 py-4 text-center text-xs font-black uppercase tracking-[0.24em] text-black transition duration-300 hover:-translate-y-0.5"
                                style={{
                                    background: 'linear-gradient(135deg, #f5d154 0%, #d4af37 100%)',
                                    boxShadow: '0 18px 44px rgba(212, 175, 55, 0.18)',
                                }}
                            >
                                Join Inner Root
                                <ArrowRight size={16} />
                            </Link>

                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center rounded-[1.3rem] border px-6 py-4 text-center text-xs font-black uppercase tracking-[0.24em] transition duration-300 hover:-translate-y-0.5"
                                style={{
                                    background: themeStyles.secondaryButtonSurface,
                                    borderColor: themeStyles.secondaryButtonBorder,
                                    color: themeStyles.textStrong,
                                }}
                            >
                                Contact the team
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Subscription;
