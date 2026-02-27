import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Reveal, Stagger } from '../components/Reveal';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import {
    Users, Target, Sparkles, Send,
    User, Mail, MessageSquare, Info
} from 'lucide-react';

const About = () => {
    const formRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        if (formRef.current) formRef.current.reset();
    };

    return (
        <section id="page-about" className="page active block opacity-100" aria-label="About Us">
            <div className="py-12 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Breadcrumbs />

                    {/* Header */}
                    <Reveal className="text-center mb-24 mt-12 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-heritage-gold/5 blur-[100px] pointer-events-none"></div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-heritage-gold/10 backdrop-blur-md border border-heritage-gold/20 text-heritage-gold font-bold text-xs uppercase tracking-[0.2em] mb-10">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>The Vision of Bharat</span>
                        </div>
                        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold text-[var(--fg)] mb-8 tracking-tighter leading-[0.9]">
                            About <br />
                            <span className="text-heritage-gold">Inner Root</span>
                        </h1>
                        <p className="text-[var(--muted)] max-w-2xl mx-auto text-xl leading-relaxed italic font-medium">
                            "Connecting the roots of the past with the wings of the future."
                        </p>
                    </Reveal>

                    {/* Mission Section */}
                    <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
                        <Reveal>
                            <div className="flex items-center gap-3 mb-6">
                                <Target className="text-heritage-gold w-6 h-6" />
                                <h2 className="font-display text-3xl font-bold text-[var(--fg)]">Our Mission</h2>
                            </div>
                            <div className="space-y-6 text-[var(--muted)] text-lg leading-relaxed">
                                <p>
                                    Inner Root is dedicated to connecting modern seekers with India's ancient cultural and spiritual roots
                                    through technology, education, immersive experiences, and wellness guidance.
                                </p>
                                <p>
                                    We believe that understanding our heritage is essential for personal growth and cultural identity.
                                    Our platform makes thousands of years of wisdom accessible to everyone, anywhere in the world.
                                </p>
                                <p className="font-medium text-[var(--fg)]">
                                    By combining traditional knowledge with modern technology,
                                    we help individuals cultivate peace, self-awareness, and emotional balance.
                                </p>
                            </div>
                            <div className="mt-8">
                                <Button variant="secondary" onClick={() => window.scrollTo(0, document.body.scrollHeight)}>
                                    Contact Our Team
                                </Button>
                            </div>
                        </Reveal>
                        <Reveal>
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-heritage-gold/10 rounded-[40px] blur-3xl group-hover:bg-heritage-gold/20 transition-all duration-700"></div>
                                <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] shadow-2xl border border-white/10">
                                    <img
                                        src="https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=1000"
                                        alt="Indian Temple Architecture"
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--fg)]/40 to-transparent"></div>
                                </div>
                                <div className="absolute -bottom-6 -right-6 glass-card p-6 rounded-2xl shadow-xl animate-float">
                                    <div className="text-heritage-gold font-display text-3xl font-bold">5000+</div>
                                    <div className="text-[10px] uppercase font-bold tracking-widest text-[var(--muted)]">Years of History</div>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Team Section */}
                    <div className="mb-32">
                        <Reveal className="text-center mb-16">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <Users className="text-heritage-gold w-6 h-6" />
                                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--fg)]">Our Visionaries</h2>
                            </div>
                            <p className="text-[var(--muted)] max-w-xl mx-auto text-lg leading-relaxed">The passionate minds dedicated to preserving the cultural essence of Bharat.</p>
                        </Reveal>
                        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { name: 'A.V. Surya Varun', role: 'Founder & UI/UX Expert', color: 'bg-heritage-gold', initials: 'AV' },
                                { name: 'G. Hem Sathvik Reddy', role: 'Strategic Director', color: 'bg-heritage-teal', initials: 'HS' },
                                { name: 'Md. Ruhan', role: 'Technical Architect', color: 'bg-heritage-green', initials: 'RU' }
                            ].map((member, i) => (
                                <Card key={i} className="p-8 text-center group hover:border-heritage-gold !rounded-3xl transition-all duration-500 hover:shadow-2xl hover:shadow-heritage-gold/5" animate={true}>
                                    <div className={`w-24 h-24 rounded-full ${member.color} mx-auto mb-8 flex items-center justify-center text-white text-3xl font-bold font-display shadow-lg ring-4 ring-white/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                        {member.initials}
                                    </div>
                                    <h3 className="font-display text-2xl font-bold text-[var(--fg)] mb-2">{member.name}</h3>
                                    <p className="text-sm text-heritage-gold font-bold uppercase tracking-widest">{member.role}</p>
                                </Card>
                            ))}
                        </Stagger>
                    </div>

                    {/* Contact Form Section */}
                    <div id="contact" className="max-w-5xl mx-auto mb-20">
                        <Card variant="glass" className="p-0 overflow-hidden !rounded-[40px] shadow-2xl border-white/5" animate={false}>
                            <div className="grid lg:grid-cols-5">
                                {/* Form Sidebar */}
                                <div className="lg:col-span-2 bg-gradient-to-br from-heritage-green to-heritage-teal p-10 lg:p-12 text-white relative overflow-hidden">
                                    <div className="relative z-10">
                                        <h2 className="font-display text-3xl font-bold mb-6">Get in Touch</h2>
                                        <p className="text-white/80 mb-10 leading-relaxed">Have questions or want to collaborate? We'd love to hear from you and build the future of heritage together.</p>

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
                                                    <div className="font-medium">Mon - Fri: 9:00 AM - 6:00 PM</div>
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

export default About;
