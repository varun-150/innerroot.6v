import React from 'react';
import { Reveal, Stagger } from '../components/ui/Reveal';
import SEO from '../components/ui/SEO';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import {
    Check, Star, Users, Briefcase, Globe, GraduationCap,
    Heart, Shield, Zap, Gift, Crown, Rocket
} from 'lucide-react';

const PricingCard = ({ title, price, period, description, features, buttonText, highlighted, icon: Icon, color }) => (
    <div className={`relative p-10 flex flex-col h-full transition-all duration-500 rounded-[48px] border-2 group ${highlighted
        ? 'bg-heritage-gold border-heritage-gold text-white shadow-2xl shadow-heritage-gold/20 -translate-y-4'
        : 'bg-white border-[var(--border)] hover:border-heritage-gold/30 hover:-translate-y-2'}`}>

        {highlighted && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-heritage-gold px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl border border-heritage-gold/10 z-10">
                Most Popular Portal
            </div>
        )}

        <div className={`w-16 h-16 rounded-[24px] ${highlighted ? 'bg-white/20' : 'bg-heritage-gold/10'} flex items-center justify-center mb-8 shadow-xl transition-transform group-hover:scale-110 group-hover:rotate-6`}>
            <Icon className={`w-8 h-8 ${highlighted ? 'text-white' : 'text-heritage-gold'}`} />
        </div>

        <h3 className={`font-display text-3xl font-bold mb-3 tracking-tight ${highlighted ? 'text-white' : 'text-[var(--fg)]'}`}>{title}</h3>

        <div className="mb-6 flex items-baseline gap-1">
            <span className={`text-5xl font-bold tracking-tighter ${highlighted ? 'text-white' : 'text-[var(--fg)]'}`}>{price}</span>
            {period && <span className={`text-sm font-bold uppercase tracking-widest ${highlighted ? 'text-white/60' : 'text-[var(--muted)]'}`}> / {period}</span>}
        </div>

        <p className={`text-lg mb-10 leading-relaxed font-medium italic ${highlighted ? 'text-white/80' : 'text-[var(--muted)]'}`}>{description}</p>

        <ul className="space-y-5 mb-12 flex-grow">
            {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-4">
                    <div className={`mt-1 p-0.5 rounded-full ${highlighted ? 'bg-white/20' : 'bg-heritage-gold/10'}`}>
                        <Check className={`w-4 h-4 ${highlighted ? 'text-white' : 'text-heritage-gold'}`} />
                    </div>
                    <span className={`text-sm font-medium ${highlighted ? 'text-white/90' : 'text-[var(--muted)]'}`}>{feature}</span>
                </li>
            ))}
        </ul>

        <button className={`w-full py-5 rounded-[24px] font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 ${highlighted
            ? 'bg-white text-heritage-gold hover:bg-neutral-100 shadow-2xl'
            : 'bg-heritage-gold text-white hover:bg-heritage-goldLight shadow-lg shadow-heritage-gold/20'
            }`}>
            {buttonText}
        </button>
    </div>
);

const Monetization = () => {
    return (
        <section className="page active block opacity-100 py-12 lg:py-20">
            <SEO
                title="Monetization & Plans"
                description="Explore Inner Root's sustainable growth models and pricing plans designed for the Indian cultural landscape."
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Breadcrumbs />

                {/* Hero Section */}
                <Reveal className="text-center mt-12 mb-20 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-heritage-gold/5 blur-[120px] pointer-events-none"></div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-heritage-gold/10 backdrop-blur-md border border-heritage-gold/20 text-heritage-gold font-bold text-xs uppercase tracking-[0.2em] mb-10">
                        <Rocket className="w-3.5 h-3.5" />
                        <span>Sustainable Future</span>
                    </div>
                    <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold text-[var(--fg)] mb-8 tracking-tighter leading-[0.9]">
                        Authentic Spirit,<br />
                        <span className="text-heritage-gold">Sustainable Growth</span>
                    </h1>
                    <p className="text-[var(--muted)] max-w-3xl mx-auto text-xl leading-relaxed italic font-medium">
                        Empowering cultural guardians through a "By Indians, For Indians" ecosystem that honors traditions while scaling through modern technology.
                    </p>
                </Reveal>

                {/* Main Models Grid */}
                <div className="space-y-32">

                    {/* Option A: Freemium */}
                    <div id="freemium">
                        <Reveal className="mb-12">
                            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--fg)] mb-4">The Freemium Model</h2>
                            <p className="text-[var(--muted)]">Balanced access for explorers and dedicated practitioners.</p>
                        </Reveal>
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <PricingCard
                                title="Free Explorer"
                                price="₹0"
                                description="Basic culture exploration and essential meditation tools."
                                icon={Heart}
                                color="bg-heritage-teal"
                                features={[
                                    "Basic culture exploration",
                                    "Limited meditations (3 per week)",
                                    "Community access",
                                    "Daily wisdom quotes"
                                ]}
                                buttonText="Get Started"
                            />
                            <PricingCard
                                title="Premium Sadhaka"
                                price="₹399"
                                period="month"
                                description="Unlimited access and deep-dive heritage experiences."
                                icon={Crown}
                                color="bg-heritage-gold"
                                highlighted={true}
                                features={[
                                    "Unlimited meditation access",
                                    "Offline downloads for sanctuary",
                                    "Live interactive sessions",
                                    "Exclusive heritage documentaries",
                                    "Ad-free experience"
                                ]}
                                buttonText="Go Premium"
                            />
                        </div>
                    </div>

                    {/* Option B: Subscription Tiers */}
                    <div id="creator-economy">
                        <Reveal className="mb-12 text-center">
                            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--fg)] mb-4">Creator Economy & Tiers</h2>
                            <p className="text-[var(--muted)] max-w-xl mx-auto">Empowering the next generation of cultural storytellers and institutions.</p>
                        </Reveal>
                        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="heritage-card p-6 bg-white/5 border-dashed">
                                <Users className="w-8 h-8 text-heritage-teal mb-4" />
                                <h3 className="font-bold mb-2 text-[var(--fg)]">Free</h3>
                                <p className="text-xs text-[var(--muted)] mb-4">Browse and learn from curated archives.</p>
                                <span className="text-xl font-bold">Browse Only</span>
                            </div>
                            <div className="heritage-card p-6 border-heritage-teal/30 bg-heritage-teal/5">
                                <Rocket className="w-8 h-8 text-heritage-teal mb-4" />
                                <h3 className="font-bold mb-2 text-[var(--fg)]">Creator</h3>
                                <p className="text-xs text-[var(--muted)] mb-4">Share your wisdom and monetize your content.</p>
                                <span className="text-xl font-bold">₹249 /mo</span>
                            </div>
                            <div className="heritage-card p-6 border-heritage-gold/30 bg-heritage-gold/5">
                                <Crown className="w-8 h-8 text-heritage-gold mb-4" />
                                <h3 className="font-bold mb-2 text-[var(--fg)]">Pro</h3>
                                <p className="text-xs text-[var(--muted)] mb-4">Advanced learning tools and premium content.</p>
                                <span className="text-xl font-bold">₹799 /mo</span>
                            </div>
                            <div className="heritage-card p-6 bg-[var(--fg)] text-white">
                                <Briefcase className="w-8 h-8 text-heritage-gold mb-4" />
                                <h3 className="font-bold mb-2">Enterprise</h3>
                                <p className="text-xs text-white/70 mb-4">Dedicated solutions for schools and institutions.</p>
                                <span className="text-sm font-bold uppercase">Contact Us</span>
                            </div>
                        </Stagger>
                    </div>

                    {/* Option C & D: B2B2C and Ad-Supported */}
                    <div className="grid lg:grid-cols-2 gap-12">
                        <Reveal className="heritage-card p-8 bg-gradient-to-br from-heritage-brown/10 to-transparent">
                            <GraduationCap className="w-12 h-12 text-heritage-brown mb-6" />
                            <h2 className="font-display text-3xl font-bold text-[var(--fg)] mb-4">B2B2C & Partnerships</h2>
                            <ul className="space-y-4 text-[var(--muted)]">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-heritage-brown/20 flex items-center justify-center shrink-0">1</div>
                                    <p><strong>Educational Curriculums:</strong> partnering with schools to bring Vedic values and history to the modern classroom.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-heritage-brown/20 flex items-center justify-center shrink-0">2</div>
                                    <p><strong>White-label Solutions:</strong> specialized platforms for cultural organizations to manage their archives.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-heritage-brown/20 flex items-center justify-center shrink-0">3</div>
                                    <p><strong>Content Licensing:</strong> providing authentic Indian heritage content to global educational platforms.</p>
                                </li>
                            </ul>
                        </Reveal>

                        <Reveal className="heritage-card p-8 bg-gradient-to-br from-heritage-teal/10 to-transparent">
                            <Shield className="w-12 h-12 text-heritage-teal mb-6" />
                            <h2 className="font-display text-3xl font-bold text-[var(--fg)] mb-4">Hybrid Model</h2>
                            <p className="text-[var(--muted)] mb-6">Our Ad-Supported + Premium approach ensures accessibility without compromising on quality.</p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-4 rounded-xl border border-dashed border-heritage-teal/30">
                                    <span className="font-bold block mb-1">Free Tier</span>
                                    <p className="text-xs text-[var(--muted)]">Supported by culturally aligned, low-intrusion ads.</p>
                                </div>
                                <div className="p-4 rounded-xl bg-heritage-gold/10 border border-heritage-gold/20">
                                    <span className="font-bold block mb-1">Premium</span>
                                    <p className="text-xs text-[var(--muted)]">Ad-free, faster streaming, and enhanced features.</p>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Strategic Advantages */}
                    <div className="py-20 bg-heritage-gold/5 rounded-[40px] px-8 sm:px-12">
                        <Reveal className="mb-12 text-center">
                            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--fg)] mb-4">Strategic Competitive Advantages</h2>
                        </Reveal>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { title: "Regional Focus", desc: "Starting in India, leveraging local knowledge and deep network effects.", icon: Globe },
                                { title: "Creator Economy", desc: "Rev-share models that turn historians and teachers into entrepreneurs.", icon: Zap },
                                { title: "Authentic Positioning", desc: "A platform built by Indians, for Indians, ensuring deep cultural resonance.", icon: Shield },
                                { title: "Cultural Partnerships", desc: "Direct alignment with temples, ashrams, and prestigious cultural orgs.", icon: Heart },
                                { title: "Educational Angle", desc: "B2B revenue streams from schools, building brand credibility early.", icon: GraduationCap },
                                { title: "Community First", desc: "Allowing users to create and curate content, driving organic growth.", icon: Users }
                            ].map(({ icon: Icon, ...item }, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-heritage-gold/10 flex items-center justify-center shrink-0">
                                        <Icon className="w-5 h-5 text-heritage-gold" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[var(--fg)] mb-1">{item.title}</h3>
                                        <p className="text-sm text-[var(--muted)]">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <Reveal className="mt-32 text-center">
                    <h2 className="font-display text-3xl font-bold text-[var(--fg)] mb-6">Ready to scale Indian Heritage?</h2>
                    <button className="btn-primary min-w-[200px]">Partner With Us</button>
                    <p className="mt-4 text-sm text-[var(--muted)]">Contact us at partnerships@innerroot.in</p>
                </Reveal>
            </div>
        </section>
    );
};

export default Monetization;
