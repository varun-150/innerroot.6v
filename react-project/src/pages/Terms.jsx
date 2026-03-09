import React from 'react';
import { Reveal } from '../components/ui/Reveal';
import SEO from '../components/ui/SEO';
import Breadcrumbs from '../components/layout/Breadcrumbs';

const Terms = () => {
    return (
        <section className="page active block opacity-100 py-12 lg:py-20">
            <SEO title="Terms of Use" description="Terms of Use for Inner Root - Shaping our heritage community." />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Breadcrumbs />

                <Reveal className="mt-12 mb-16 text-center">
                    <h1 className="font-display text-5xl sm:text-7xl font-bold text-[var(--fg)] mb-6 tracking-tighter">Shared <span className="text-heritage-gold">Honor</span></h1>
                    <p className="text-[var(--muted)] max-w-2xl mx-auto text-xl leading-relaxed italic font-medium">Agreement for our community of heritage guardians.</p>
                </Reveal>

                <Reveal delay={0.2}>
                    <div className="prose prose-invert max-w-none text-[var(--muted)] space-y-6">
                        <div className="p-4 rounded-lg bg-heritage-gold/10 border border-heritage-gold/20 text-heritage-gold text-sm italic mb-8">
                            Last updated: October 26, 2024
                        </div>
                        <p className="text-lg leading-relaxed">
                            Welcome to Inner Root. By accessing our platform, you agree to honor the heritage we share and the community we build together.
                        </p>
                        <section className="space-y-4">
                            <h3 className="text-2xl font-display font-bold text-[var(--fg)]">1. Agreement to Terms</h3>
                            <p>These Terms of Use constitute a legally binding agreement between you and Inner Root. If you do not agree with these terms, please discontinue use of the site immediately.</p>
                        </section>

                        <section className="space-y-4">
                            <h3 className="text-2xl font-display font-bold text-[var(--fg)]">2. User Representations</h3>
                            <p>By using the site, you represent that you are of legal age and that the information you provide is accurate and truthful. You agree to use the site in a manner consistent with its mission of cultural exploration and community building.</p>
                        </section>

                        <section className="space-y-4">
                            <h3 className="text-2xl font-display font-bold text-[var(--fg)]">3. Content and Copyright</h3>
                            <p>All content on Inner Root, including text, graphics, and interactive elements, is protected by copyright. You may use the content for personal, non-commercial purposes only.</p>
                        </section>

                        <section className="space-y-4">
                            <h3 className="text-2xl font-display font-bold text-[var(--fg)]">4. Community Guidelines</h3>
                            <p>We encourage respectful and constructive dialogue. Harassment, hate speech, or the dissemination of false information is strictly prohibited.</p>
                        </section>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default Terms;
