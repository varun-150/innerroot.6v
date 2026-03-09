import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Send, MapPin, Phone, ArrowRight } from 'lucide-react';
import SEO from '../components/ui/SEO';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const heroRef = useRef(null);
    const heroInView = useInView(heroRef, { once: true });

    return (
        <>
            <SEO title="Contact — Inner Root" description="Get in touch with the Inner Root team." />
            <section ref={heroRef} className="relative overflow-hidden section-padding">
                <div className="sacred-geometry" style={{ opacity: 0.02 }} />
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-12">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-semibold tracking-widest uppercase" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                            <Mail size={14} /> Contact
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5" style={{ fontFamily: 'var(--font-display)' }}>
                            Get in <span className="text-gradient">Touch</span>
                        </h1>
                        <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                            Have questions, feedback, or partnership ideas? We'd love to hear from you.
                        </p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.6 }}
                        className="max-w-xl mx-auto rounded-3xl p-8 sm:p-10"
                        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', boxShadow: 'var(--shadow-lg)' }}
                    >
                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Name</label>
                                <input type="text" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Email</label>
                                <input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Message</label>
                                <textarea placeholder="Your message..." rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input resize-none" style={{ borderRadius: 'var(--radius-lg)' }} />
                            </div>
                            <button className="btn btn-primary w-full justify-center btn-lg">
                                <Send size={18} /> Send Message
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default Contact;
