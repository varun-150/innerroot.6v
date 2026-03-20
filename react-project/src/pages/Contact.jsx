import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Mail, Send, MapPin, Phone, ArrowRight, CheckCircle2, AlertCircle, User, MessageSquare, Sparkles, Globe, Clock } from 'lucide-react';
import SEO from '../components/ui/SEO';
import { contactAPI } from '../services/api';

/* ─── Contact Info Sidebar ─── */
const contactDetails = [
    {
        icon: Mail,
        label: 'Email Us',
        value: 'hello@innerroot.app',
        sub: 'We respond within 24 hours',
        color: '#D4AF37',
    },
    {
        icon: Globe,
        label: 'Cultural Heritage',
        value: 'India & Beyond',
        sub: 'Rooted in ancient wisdom',
        color: '#22c55e',
    },
    {
        icon: Clock,
        label: 'Support Hours',
        value: 'Mon - Fri · 9-6 IST',
        sub: 'Community moderated 24/7',
        color: '#8b5cf6',
    },
];

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [errorMsg, setErrorMsg] = useState('');
    const heroRef = useRef(null);
    const heroInView = useInView(heroRef, { once: true });

    const updateField = (field, value) => setForm(f => ({ ...f, [field]: value }));

    const isValid = form.name.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && form.message.trim().length > 10;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        if (!isValid) {
            setErrorMsg('Please fill out all fields correctly.');
            return;
        }

        setStatus('sending');
        try {
            await contactAPI.submit({
                name: form.name.trim(),
                email: form.email.trim(),
                message: form.message.trim(),
            });
            setStatus('success');
            setForm({ name: '', email: '', message: '' });
        } catch (err) {
            console.error('Contact submit failed:', err);
            setErrorMsg(err?.response?.data?.error || 'Something went wrong. Please try again.');
            setStatus('error');
        }
    };

    return (
        <>
            <SEO title="Contact — Inner Root" description="Get in touch with the Inner Root team." />

            <section ref={heroRef} className="relative overflow-hidden section-padding">
                {/* Background Orbs */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute w-[600px] h-[600px] rounded-full"
                        style={{ top: '-10%', right: '-15%', background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 65%)' }} />
                    <div className="absolute w-[400px] h-[400px] rounded-full"
                        style={{ bottom: '5%', left: '-10%', background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 65%)' }} />
                    <div className="absolute w-[300px] h-[300px] rounded-full"
                        style={{ top: '40%', left: '45%', background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 65%)' }} />
                </div>

                <div className="sacred-geometry" style={{ opacity: 0.015 }} />

                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center mb-14"
                    >
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 text-xs font-bold tracking-[0.2em] uppercase"
                            style={{ background: 'var(--color-accent-soft)', color: 'var(--color-accent)', border: '1px solid rgba(212,175,55,0.2)' }}>
                            <Sparkles size={13} />
                            <span>Sacred Connection</span>
                        </span>
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-5" style={{ fontFamily: 'var(--font-display)' }}>
                            Get in{' '}
                            <span style={{
                                background: 'linear-gradient(135deg, #D4AF37 0%, #f5d04e 40%, #B8860B 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}>Touch</span>
                        </h1>
                        <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: 'var(--color-text-subtle)' }}>
                            Have questions, feedback, or partnership ideas? We'd love to hear from you. Every message is stored and personally reviewed.
                        </p>
                    </motion.div>

                    {/* Two-column layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                        {/* === LEFT: Contact Info === */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={heroInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="lg:col-span-2 flex flex-col gap-5"
                        >
                            {/* Intro card */}
                            <div className="rounded-3xl p-7 relative overflow-hidden"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.04) 100%)',
                                    border: '1px solid rgba(212,175,55,0.2)',
                                }}>
                                <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
                                    style={{ background: '#D4AF37', transform: 'translate(30%,-30%)' }} />
                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                                        style={{ background: 'rgba(212,175,55,0.15)', color: '#D4AF37' }}>
                                        <Mail size={24} />
                                    </div>
                                    <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
                                        Let's Connect
                                    </h2>
                                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-subtle)' }}>
                                        Your message is saved directly to our database. We personally read every inquiry and respond thoughtfully.
                                    </p>
                                    <div className="mt-4 flex items-center gap-2 text-xs font-semibold"
                                        style={{ color: '#D4AF37' }}>
                                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                        Replies within 24 hours
                                    </div>
                                </div>
                            </div>

                            {/* Info cards */}
                            {contactDetails.map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={heroInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                                    className="rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 group"
                                    style={{
                                        background: 'var(--color-surface)',
                                        border: '1px solid var(--color-border)',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.borderColor = item.color + '40'}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
                                >
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                                        style={{ background: item.color + '15', color: item.color }}>
                                        <item.icon size={18} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
                                            style={{ color: item.color }}>
                                            {item.label}
                                        </div>
                                        <div className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                                            {item.value}
                                        </div>
                                        <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-faint)' }}>
                                            {item.sub}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* === RIGHT: Contact Form === */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={heroInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            className="lg:col-span-3"
                        >
                            <div className="rounded-3xl p-8 sm:p-10 h-full relative overflow-hidden"
                                style={{
                                    background: 'var(--color-surface)',
                                    border: '1px solid var(--color-border)',
                                    boxShadow: '0 32px 64px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.04)',
                                }}>
                                {/* Top gradient line */}
                                <div className="absolute top-0 left-8 right-8 h-px"
                                    style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)' }} />

                                <AnimatePresence mode="wait">
                                    {status === 'success' ? (
                                        /* ── Success State ── */
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex flex-col items-center justify-center text-center py-16"
                                        >
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
                                                className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                                                style={{ background: 'rgba(34,197,94,0.12)', color: '#22c55e' }}
                                            >
                                                <CheckCircle2 size={40} />
                                            </motion.div>
                                            <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
                                                Message Received! 🙏
                                            </h2>
                                            <p className="text-sm mb-8 max-w-xs" style={{ color: 'var(--color-text-subtle)' }}>
                                                Your message has been stored in our database. We'll review it and get back to you soon.
                                            </p>
                                            <button
                                                onClick={() => setStatus('idle')}
                                                className="btn btn-secondary btn-sm"
                                            >
                                                Send Another Message
                                            </button>
                                        </motion.div>
                                    ) : (
                                        /* ── Form State ── */
                                        <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            <div className="mb-8">
                                                <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
                                                    Send a Message
                                                </h2>
                                                <p className="text-sm" style={{ color: 'var(--color-text-faint)' }}>
                                                    All inputs are saved directly to our MySQL database.
                                                </p>
                                            </div>

                                            {/* Error banner */}
                                            <AnimatePresence>
                                                {status === 'error' && errorMsg && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="flex items-center gap-2.5 rounded-xl p-3.5 mb-6 text-sm overflow-hidden"
                                                        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }}
                                                    >
                                                        <AlertCircle size={16} />
                                                        <span>{errorMsg}</span>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            <form onSubmit={handleSubmit} className="space-y-5">
                                                {/* Name */}
                                                <div>
                                                    <label className="block text-xs font-semibold mb-2 uppercase tracking-widest"
                                                        style={{ color: 'var(--color-text-faint)' }}>
                                                        Full Name
                                                    </label>
                                                    <div className="relative">
                                                        <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2"
                                                            style={{ color: 'var(--color-text-faint)' }} />
                                                        <input
                                                            type="text"
                                                            placeholder="Your name"
                                                            value={form.name}
                                                            onChange={e => updateField('name', e.target.value)}
                                                            className="input"
                                                            style={{ paddingLeft: '2.75rem' }}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                {/* Email/Phone */}
                                                <div>
                                                    <label className="block text-xs font-semibold mb-2 uppercase tracking-widest"
                                                        style={{ color: 'var(--color-text-faint)' }}>
                                                        Contact Details (Email or Phone)
                                                    </label>
                                                    <div className="relative">
                                                        <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2"
                                                            style={{ color: 'var(--color-text-faint)' }} />
                                                        <input
                                                            type="text"
                                                            placeholder="you@example.com or +91..."
                                                            value={form.email}
                                                            onChange={e => updateField('email', e.target.value)}
                                                            className="input"
                                                            style={{ paddingLeft: '2.75rem' }}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                {/* Message */}
                                                <div>
                                                    <label className="block text-xs font-semibold mb-2 uppercase tracking-widest"
                                                        style={{ color: 'var(--color-text-faint)' }}>
                                                        Message
                                                    </label>
                                                    <div className="relative">
                                                        <MessageSquare size={15} className="absolute left-4 top-4"
                                                            style={{ color: 'var(--color-text-faint)' }} />
                                                        <textarea
                                                            placeholder="Your message..."
                                                            rows={5}
                                                            value={form.message}
                                                            onChange={e => updateField('message', e.target.value)}
                                                            className="input resize-none"
                                                            style={{ paddingLeft: '2.75rem', paddingTop: '0.875rem', borderRadius: 'var(--radius-md)' }}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                {/* Submit */}
                                                <button
                                                    type="submit"
                                                    disabled={status === 'sending' || !isValid}
                                                    className="w-full py-4 rounded-2xl font-black uppercase text-sm tracking-[0.15em] transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden"
                                                    style={{
                                                        background: isValid
                                                            ? 'linear-gradient(135deg, #D4AF37 0%, #f5d04e 50%, #B8860B 100%)'
                                                            : 'var(--color-surface)',
                                                        color: isValid ? '#050505' : 'var(--color-text-faint)',
                                                        border: isValid ? 'none' : '1px solid var(--color-border)',
                                                        boxShadow: isValid ? '0 20px 40px rgba(212,175,55,0.3), 0 4px 12px rgba(212,175,55,0.2)' : 'none',
                                                        cursor: isValid ? 'pointer' : 'not-allowed',
                                                        transform: 'translateY(0)',
                                                    }}
                                                    onMouseEnter={e => { if (isValid) e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                                                >
                                                    {status === 'sending' ? (
                                                        <>
                                                            <div className="w-5 h-5 rounded-full border-2 border-primary-900 border-t-transparent animate-spin" />
                                                            <span>Saving to MySQL...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Send size={18} />
                                                            <span>Send Message</span>
                                                        </>
                                                    )}
                                                </button>

                                                <p className="text-center text-xs" style={{ color: 'var(--color-text-faint)' }}>
                                                    🔒 Your data is stored securely in MySQL and never shared.
                                                </p>
                                            </form>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
