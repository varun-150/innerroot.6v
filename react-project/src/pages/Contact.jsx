import React, { useRef } from 'react';
import { Reveal } from '../components/Reveal';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import { Send, User, Mail, MessageSquare, Info, Sparkles } from 'lucide-react';

const Contact = () => {
    const formRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        if (formRef.current) formRef.current.reset();
    };

    return (
        <section id="page-contact" className="page active block opacity-100" aria-label="Contact Us">
            <div className="py-12 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Breadcrumbs />

                    <Reveal className="text-center mb-16 mt-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-heritage-gold/10 backdrop-blur-md border border-heritage-gold/20 text-heritage-gold font-bold text-xs uppercase tracking-[0.2em] mb-6">
                            <Send className="w-3.5 h-3.5" />
                            <span>Connect With Us</span>
                        </div>
                        <h1 className="font-display text-5xl sm:text-6xl font-bold text-[var(--fg)] mb-6 tracking-tight">
                            Get in <span className="text-heritage-gold">Touch</span>
                        </h1>
                        <p className="text-[var(--muted)] max-w-2xl mx-auto text-lg">
                            Have questions, suggestions, or want to collaborate? Our team is here to help you on your journey.
                        </p>
                    </Reveal>

                    <div className="max-w-5xl mx-auto">
                        <Card variant="glass" className="p-0 overflow-hidden !rounded-[40px] shadow-2xl border-white/5" animate={false}>
                            <div className="grid lg:grid-cols-5">
                                {/* Form Sidebar */}
                                <div className="lg:col-span-2 bg-gradient-to-br from-heritage-green to-heritage-teal p-10 lg:p-12 text-white relative overflow-hidden">
                                    <div className="relative z-10">
                                        <h2 className="font-display text-3xl font-bold mb-6">Contact Info</h2>
                                        <p className="text-white/80 mb-10 leading-relaxed">We'd love to hear from you and build the future of heritage together.</p>

                                        <div className="space-y-8">
                                            <div className="flex gap-4 items-start">
                                                <div className="p-3 bg-white/10 rounded-xl"><Mail className="w-5 h-5" /></div>
                                                <div>
                                                    <div className="text-xs font-bold uppercase tracking-widest opacity-60">Email Us</div>
                                                    <div className="font-medium">contact@innerroot.com</div>
                                                </div>
                                            </div>
                                            <div className="flex gap-4 items-start">
                                                <div className="p-3 bg-white/10 rounded-xl"><Info className="w-5 h-5" /></div>
                                                <div>
                                                    <div className="text-xs font-bold uppercase tracking-widest opacity-60">Working Hours</div>
                                                    <div className="font-medium">Mon - Fri: 9:00 AM - 6:00 PM (IST)</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Sparkles className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 rotate-12" strokeWidth={0.5} />
                                </div>

                                {/* Form Content */}
                                <div className="lg:col-span-3 p-10 lg:p-12 bg-white/40">
                                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <Input
                                                label="Name"
                                                id="contact-name"
                                                placeholder="Your name"
                                                icon={User}
                                                required
                                            />
                                            <Input
                                                label="Email Address"
                                                id="contact-email"
                                                type="email"
                                                placeholder="your@email.com"
                                                icon={Mail}
                                                required
                                            />
                                        </div>
                                        <Input
                                            label="Subject"
                                            id="contact-subject"
                                            as="select"
                                            icon={Info}
                                        >
                                            <option value="general">General Inquiry</option>
                                            <option value="partnership">Partnership</option>
                                            <option value="suggestion">Content Suggestion</option>
                                            <option value="support">Technical Support</option>
                                        </Input>
                                        <Input
                                            label="Message"
                                            id="contact-message"
                                            as="textarea"
                                            placeholder="How can we help you?"
                                            icon={MessageSquare}
                                            required
                                            rows={5}
                                        />
                                        <Button type="submit" size="lg" className="w-full sm:w-auto !px-12" rightIcon={Send}>
                                            Send Message
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
