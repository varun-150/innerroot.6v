import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, Star, Shield, Rocket, Globe, Heart } from 'lucide-react';
import SEO from '../components/ui/SEO';

const Subscription = () => {
    const plans = [
        {
            name: 'Vedic Explorer',
            price: '₹0',
            description: 'Begin your journey into Indian heritage and wellness.',
            features: [
                'Daily Wisdom Nuggets',
                'Basic Meditation Tracks',
                'Community Forum Access',
                'Heritage Map Explorer',
                'Limited ChatBot Queries (5/day)'
            ],
            cta: 'Start for Free',
            highlighted: false,
            icon: Rocket,
            color: 'var(--brand-500)'
        },
        {
            name: 'Heritage Pro',
            price: '₹499',
            period: '/ month',
            description: 'The definitive experience for cultural practitioners.',
            features: [
                'Unlimited Heritage ChatBot',
                'Advanced Wellness Routines',
                'Exclusive Cultural Workshops',
                'High-Resolution Map Layers',
                'Downloadable Wellness Guides',
                'Ad-free Experience'
            ],
            cta: 'Go Pro Now',
            highlighted: true,
            icon: Crown,
            color: 'var(--accent)'
        },
        {
            name: 'Sanatana Elite',
            price: '₹1,999',
            period: '/ year',
            description: 'Full devotion to preserving and learning our roots.',
            features: [
                'Everything in Pro Plan',
                '1-on-1 Expert Consultations',
                'Beta Access to New Research',
                'Family Plan (Up to 4 members)',
                'Priority Support',
                'Limited Edition Physical Merch'
            ],
            cta: 'Join the Elite',
            highlighted: false,
            icon: Star,
            color: 'var(--forest-500)'
        }
    ];

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 relative overflow-hidden bg-primary">
            <SEO title="Membership Plans — Inner Root" description="Join Inner Root's premium membership and unlock the full potential of heritage and wellness." />

            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-50">
                <div className="orb orb-1" />
                <div className="orb orb-2" />
            </div>

            <div className="container-8k relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="section-label mb-6 justify-center"
                    >
                        Membership Plans
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="display-2 mb-6"
                    >
                        Choose Your <span className="text-gradient">Path to Wisdom</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lead"
                    >
                        Unlock personalized heritage insights, advanced wellness modules, and a community of truth-seekers.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 lg:px-12">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index + 0.3 }}
                            className={`card-8k p-8 flex flex-col ${plan.highlighted ? 'shimmer-border' : ''}`}
                            style={plan.highlighted ? { borderColor: 'var(--accent)', boxShadow: 'var(--shadow-amber-glow)' } : {}}
                        >
                            {plan.highlighted && (
                                <div className="absolute -top-px left-1/2 -translate-x-1/2 px-4 py-1 rounded-b-xl bg-accent text-white text-[10px] font-bold uppercase tracking-widest">
                                    Recommended
                                </div>
                            )}

                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${plan.color}20`, color: plan.color }}>
                                    <plan.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold font-sans">{plan.name}</h3>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-baseline gap-1">
                                    <span className="display-3 font-sans font-bold">{plan.price}</span>
                                    {plan.period && <span className="text-tertiary text-sm">{plan.period}</span>}
                                </div>
                                <p className="text-secondary text-sm mt-2 italic">{plan.description}</p>
                            </div>

                            <div className="divider-8k !my-6 opacity-30" />

                            <ul className="space-y-4 mb-10 flex-grow">
                                {plan.features.map(feature => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-forest-soft flex items-center justify-center shrink-0">
                                            <Check size={12} className="text-forest" />
                                        </div>
                                        <span className="text-sm text-secondary">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 ${plan.highlighted
                                        ? 'bg-accent text-white shadow-lg shadow-accent/20 hover:scale-[1.02] hover:shadow-xl'
                                        : 'bg-glass border border-primary text-primary hover:bg-accent-soft hover:border-accent'
                                    }`}
                            >
                                {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Trust Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-secondary border-dashed"
                >
                    {[
                        { icon: Shield, label: 'Secure Payments', desc: 'PCI Compliance' },
                        { icon: Heart, label: 'Indian Roots', desc: 'Crafted with Love' },
                        { icon: Globe, label: 'Cultural Impact', desc: 'Supporting Artists' },
                        { icon: Zap, label: 'Instant Access', desc: 'Zero Wait Time' }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-accent-soft flex items-center justify-center text-accent">
                                <item.icon size={18} />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold font-sans">{item.label}</h4>
                                <p className="text-[10px] text-tertiary uppercase tracking-tighter">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Subscription;
