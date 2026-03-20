import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
    Heart, Target, Globe, Users, Sparkles,
    ArrowRight, Award, BookOpen, Linkedin, Twitter, Github
} from 'lucide-react';
import SEO from '../components/ui/SEO';

const values = [
    { icon: Heart, title: 'Compassion', desc: 'Rooted in the ancient Indian philosophy of Ahimsa — non-violence and deep empathy.', color: '#d97706' },
    { icon: Target, title: 'Purpose', desc: 'Every feature serves a higher purpose — self-discovery, cultural preservation, and inner peace.', color: '#14532d' },
    { icon: Globe, title: 'Inclusivity', desc: 'Open to all seekers regardless of background, caste, or creed.', color: '#7c3aed' },
    { icon: Sparkles, title: 'Innovation', desc: 'Blending AI intelligence with spiritual wisdom for modern seekers.', color: '#c9a227' },
];

const teamMembers = [
    {
        name: 'AKURI VENKATA SURYA VARUN',
        role: 'Founder & Lead Developer',
        bio: 'Visionary architect blending Indian heritage with next-gen technology.',
        initials: 'AV',
        social: { linkedin: '#', twitter: '#', github: '#' }
    },
    {
        name: 'GANGI REDDY GARI HEM SATHVIK REDDY',
        role: 'Co-Founder',
        bio: 'Strategic lead focused on cultural preservation and community impact.',
        initials: 'GR',
        social: { linkedin: '#', twitter: '#' }
    },
    {
        name: 'MD. ROOHAN',
        role: 'Backend Engineer',
        bio: 'Systems specialist ensuring robust and scalable infrastructure.',
        initials: 'MR',
        social: { github: '#', linkedin: '#' }
    },
];

const timeline = [
    { year: '2024', event: 'The Vision', desc: 'Concept born from a deep curiosity about the intersection of technology and dharma.' },
    { year: '2025', event: 'V1 Launch', desc: 'Released the first iteration of the Heritage Map documentation for 100+ sites.' },
    { year: '2026', event: 'AI Integration', desc: 'Introduced the Spiritual synthesis engine and personalized wellness tracking.' },
];

const About = () => {
    const heroRef = useRef(null);
    const valuesRef = useRef(null);
    const teamRef = useRef(null);
    const heroInView = useInView(heroRef, { once: true });
    const valuesInView = useInView(valuesRef, { once: true, margin: '-80px' });
    const teamInView = useInView(teamRef, { once: true, margin: '-80px' });

    return (
        <>
            <SEO title="About — Inner Root" description="Learn about Inner Root's mission to bridge Indian heritage with AI-driven wellness." />

            {/* Hero */}
            <section ref={heroRef} className="relative overflow-hidden section-padding">
                <div className="sacred-geometry" style={{ opacity: 0.02 }} />
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-semibold tracking-widest uppercase" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                            <Award size={14} /> Our Story
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5" style={{ fontFamily: 'var(--font-display)' }}>
                            Built With <span className="text-gradient">Heart & Heritage</span>
                        </h1>
                        <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                            Inner Root is a labor of love — a platform born from a desire to make India's extraordinary cultural heritage accessible, and to blend ancient wisdom with modern technology for inner well-being.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission */}
            <section className="pb-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="rounded-3xl p-8 sm:p-12 text-center"
                        style={{ background: 'var(--bg-glass-strong)', backdropFilter: 'blur(24px)', border: '1px solid var(--border-glass)', boxShadow: 'var(--shadow-lg)' }}
                    >
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Our Mission</h2>
                        <p className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-display)' }}>
                            "To bridge the timeless heritage of India with AI-powered self-awareness, creating a space where every seeker can explore their roots, nurture their spirit, and grow as a conscious being."
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Values */}
            <section ref={valuesRef} className="pb-24" style={{ paddingTop: 'var(--sp-8)' }}>
                <div className="max-w-5xl mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={valuesInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
                        <span className="text-xs font-semibold tracking-widest uppercase mb-3 block" style={{ color: 'var(--accent)' }}>Our Values</span>
                        <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>What Guides Us</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {values.map((v, i) => (
                            <motion.div
                                key={v.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="card p-6 sm:p-8"
                            >
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${v.color}12`, color: v.color }}>
                                    <v.icon size={24} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{v.title}</h3>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Journey Timeline */}
            <section className="pb-24 px-6 overflow-hidden">
                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        {/* Line */}
                        <div className="absolute top-1/2 left-0 w-full h-px bg-primary -translate-y-1/2 hidden md:block" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                            {timeline.map((item, i) => (
                                <motion.div
                                    key={item.year}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="w-12 h-12 rounded-full border border-accent bg-primary mx-auto mb-4 flex items-center justify-center font-bold text-accent">
                                        {item.year}
                                    </div>
                                    <h4 className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{item.event}</h4>
                                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section ref={teamRef} className="pb-24">
                <div className="max-w-5xl mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={teamInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
                        <span className="text-xs font-semibold tracking-widest uppercase mb-3 block" style={{ color: 'var(--accent)' }}>The Collective</span>
                        <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Our Team</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamMembers.map((member, i) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 relative transition-transform duration-500 group-hover:scale-105"
                                    style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))', boxShadow: '0 10px 25px -5px var(--accent-glow)' }}>
                                    <span className="text-white text-3xl font-bold tracking-tighter">{member.initials}</span>
                                    {/* Subtle decorative ring */}
                                    <div className="absolute inset-[-4px] rounded-full border border-dashed opacity-20 animate-spin-slow"
                                        style={{ borderColor: 'var(--accent)' }} />
                                </div>
                                <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{member.name}</h3>
                                <p className="text-sm font-medium mb-3" style={{ color: 'var(--accent)' }}>{member.role}</p>
                                <p className="text-xs leading-relaxed mb-4 max-w-[240px]" style={{ color: 'var(--text-secondary)' }}>{member.bio}</p>

                                <div className="flex items-center gap-3">
                                    {member.social.linkedin && <a href={member.social.linkedin} className="text-tertiary hover:text-accent transition-colors"><Linkedin size={16} /></a>}
                                    {member.social.twitter && <a href={member.social.twitter} className="text-tertiary hover:text-accent transition-colors"><Twitter size={16} /></a>}
                                    {member.social.github && <a href={member.social.github} className="text-tertiary hover:text-accent transition-colors"><Github size={16} /></a>}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="pb-24">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                            Join the Journey
                        </h2>
                        <p className="text-base mb-8" style={{ color: 'var(--text-secondary)' }}>
                            Whether you're seeking cultural knowledge or inner peace, Inner Root welcomes you.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/explore" className="btn btn-primary btn-lg">
                                Explore Heritage <ArrowRight size={18} />
                            </Link>
                            <Link to="/wellness" className="btn btn-secondary btn-lg">
                                Start Wellness <Heart size={18} />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default About;
