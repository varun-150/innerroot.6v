import React from 'react';
import { Reveal } from '../components/ui/Reveal';
import SEO from '../components/ui/SEO';
import Breadcrumbs from '../components/layout/Breadcrumbs';

const Privacy = () => {
    return (
        <section className="page active block opacity-100 py-12 lg:py-20">
            <SEO title="Privacy Policy" description="Privacy Policy for Inner Root - Protecting your cultural journey." />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Breadcrumbs />
                <Reveal className="mt-12 mb-16 text-center">
                    <h1 className="font-display text-5xl sm:text-7xl font-bold text-[var(--fg)] mb-6 tracking-tighter">Sacred <span className="text-heritage-gold">Privacy</span></h1>
                    <p className="text-[var(--muted)] max-w-2xl mx-auto text-xl leading-relaxed italic font-medium">Protecting your digital footprint as you explore your cultural roots.</p>
                </Reveal>

                <Reveal delay={0.2}>
                    <div className="prose prose-invert max-w-none text-[var(--muted)] space-y-6">
                        <div className="p-4 rounded-lg bg-heritage-gold/10 border border-heritage-gold/20 text-heritage-gold text-sm italic mb-8">
                            Last updated: March 22, 2026
                        </div>

                        <p className="text-lg leading-relaxed">
                            At Inner Root, we take your privacy seriously. Your journey through India's heritage is personal, and we are committed to protecting the data you share with us.
                        </p>

                        <section className="space-y-4">
                            <h3 className="text-2xl font-display font-bold text-[var(--fg)]">1. Information Collection</h3>
                            <p>We collect information that you voluntarily provide to us when you register on the website, such as your name, email address, interests, and cultural preferences. This helps us personalize your experience.</p>
                        </section>

                        <section className="space-y-4">
                            <h3 className="text-2xl font-display font-bold text-[var(--fg)]">2. How We Use Your Data</h3>
                            <p>Your data is used to provide you with tailored cultural content, community discussions, and updates on heritage events. We do not sell your personal information to third parties.</p>
                        </section>

                        <section className="space-y-4">
                            <h3 className="text-2xl font-display font-bold text-[var(--fg)]">3. Security</h3>
                            <p>We implement industry-standard security measures to protect your data from unauthorized access or disclosure.</p>
                        </section>

                        <section className="space-y-4">
                            <h3 className="text-2xl font-display font-bold text-[var(--fg)]">4. Contact Us</h3>
                            <p>If you have questions or concerns about this policy, please reach out to our team at <a href="mailto:akurivarun@gmail.com" className="text-heritage-gold hover:underline">support@innerroot.in</a></p>
                        </section>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default Privacy;
