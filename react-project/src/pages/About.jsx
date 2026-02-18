import React, { useRef } from 'react';
import { Reveal } from '../components/Reveal';

// Safelist
// from-heritage-gold to-heritage-goldLight
// from-heritage-teal to-heritage-tealLight
// from-heritage-green to-heritage-greenLight
// from-heritage-brown to-heritage-brownLight

const About = () => {
    const formRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        if (formRef.current) formRef.current.reset();
    };

    return (
        <section id="page-about" className="page active block opacity-100">
            <div className="py-12 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <Reveal className="text-center mb-16">
                        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[var(--fg)] mb-4">About Inner Root</h1>
                        <p className="text-[var(--muted)] max-w-2xl mx-auto">
                            Bridging ancient wisdom with modern technology to preserve and share India's cultural heritage.
                        </p>
                    </Reveal>

                    {/* Mission */}
                    <div className="grid lg:grid-cols-2 gap-12 mb-16">
                        <Reveal>
                            <h2 className="font-display text-3xl font-bold text-[var(--fg)] mb-6">Our Mission</h2>
                            <p className="text-[var(--muted)] mb-4">
                                Inner Root is dedicated to connecting modern users with India's ancient cultural and spiritual roots
                                through technology, education, immersive experiences, and wellness guidance.
                            </p>
                            <p className="text-[var(--muted)] mb-4">
                                We believe that understanding our heritage is essential for personal growth and cultural identity.
                                Our platform makes thousands of years of wisdom accessible to everyone, anywhere in the world.
                            </p>
                            <p className="text-[var(--muted)]">
                                By combining traditional knowledge with modern psychological approaches,
                                we help individuals cultivate peace, self-awareness, and emotional balance in their daily lives.
                            </p>
                        </Reveal>
                        <Reveal>
                            <div className="heritage-card aspect-video bg-gradient-to-br from-heritage-green/10 to-heritage-teal/10 flex items-center justify-center">
                                <svg className="w-32 h-32 text-heritage-green/30" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L8 8H4L6 12H2L4 16H8L12 22L16 16H20L22 12H18L20 8H16L12 2Z" />
                                </svg>
                            </div>
                        </Reveal>
                    </div>

                    {/* Team */}
                    <Reveal className="mb-16">
                        <h2 className="font-display text-3xl font-bold text-[var(--fg)] mb-8 text-center">Our Team</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { name: 'Arjun Sharma', role: 'Founder & Cultural Director', color: 'heritage-gold' },
                                { name: 'Priya Venkatesh', role: 'Head of Research', color: 'heritage-teal' },
                                { name: 'Rahul Mehta', role: 'Technology Lead', color: 'heritage-green' },
                                { name: 'Ananya Iyer', role: 'Wellness Curator', color: 'heritage-brown' }
                            ].map((member, i) => (
                                <div key={i} className="heritage-card p-6 text-center">
                                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-${member.color} to-${member.color}Light mx-auto mb-4`}></div>
                                    <h3 className="font-display text-lg font-bold text-[var(--fg)]">{member.name}</h3>
                                    <p className="text-sm text-[var(--muted)]">{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    {/* Contact Form */}
                    <Reveal className="heritage-card p-6 sm:p-8">
                        <h2 className="font-display text-2xl font-bold text-[var(--fg)] mb-6">Get in Touch</h2>
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--fg)] mb-2">Name</label>
                                    <input type="text" className="search-input rounded-xl" placeholder="Your name" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--fg)] mb-2">Email</label>
                                    <input type="email" className="search-input rounded-xl" placeholder="your@email.com" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--fg)] mb-2">Subject</label>
                                <select className="search-input rounded-xl">
                                    <option>General Inquiry</option>
                                    <option>Partnership</option>
                                    <option>Content Suggestion</option>
                                    <option>Technical Support</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--fg)] mb-2">Message</label>
                                <textarea className="search-input rounded-xl min-h-[120px] resize-y" placeholder="Your message..." required></textarea>
                            </div>
                            <button type="submit" className="btn-primary">Send Message</button>
                        </form>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default About;
