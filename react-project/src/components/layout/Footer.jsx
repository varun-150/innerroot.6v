import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, ArrowUpRight } from 'lucide-react';
import logo from '../../assets/logo.webp';

const footerLinks = {
    Discover: [
        { label: 'Heritage Map', to: '/explore' },
        { label: 'Virtual Tours', to: '/tours' },
        { label: 'Cultural Library', to: '/library' },
    ],
    Wellness: [
        { label: 'Mood Tracker', to: '/wellness' },
        { label: 'Japa Counter', to: '/wellness' },
        { label: 'Daily Reflections', to: '/wellness' },
        { label: 'Meditation Guide', to: '/wellness' },
    ],
    Company: [
        { label: 'About Inner Root', to: '/about' },
        { label: 'Contact Us', to: '/contact' },
    ],
};

const FooterLink = ({ to, children }) => (
    <Link
        to={to}
        style={{
            fontSize: 'clamp(0.8125rem,1vw,0.9375rem)',
            color: 'var(--color-text-subtle)',
            transition: 'color 0.2s',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-subtle)'}
    >
        {children}
    </Link>
);

const Footer = () => (
    <footer
        style={{
            position: 'relative',
            overflow: 'hidden',
            background: 'var(--color-bg-subtle)',
            borderTop: '1px solid var(--color-border)',
        }}
    >
        {/* Gradient top rule */}
        <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent 0%, var(--color-accent) 40%, rgba(245,190,78,0.6) 60%, transparent 100%)',
        }} />

        {/* Decorative orb */}
        <div style={{
            position: 'absolute', bottom: '-30%', right: '-5%',
            width: 'clamp(200px,30vw,500px)', height: 'clamp(200px,30vw,500px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(217,119,6,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
        }} />

        <div style={{
            maxWidth: 'var(--container-8k)',
            margin: '0 auto',
            padding: 'clamp(3rem,6vw,6rem) clamp(1rem,5vw,4rem)',
        }}>
            {/* Main grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px,100%),1fr))',
                gap: 'clamp(2.5rem,4vw,4rem)',
                marginBottom: 'clamp(2.5rem,4vw,4rem)',
            }}>
                {/* Brand */}
                <div style={{ gridColumn: 'span 2', minWidth: 'min(100%,280px)' }}>
                    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.875rem', marginBottom: 'clamp(1rem,2vw,1.5rem)' }}>
                        <div style={{
                            width: 'clamp(2.25rem,3vw,2.75rem)', height: 'clamp(2.25rem,3vw,2.75rem)',
                            borderRadius: 'var(--radius-md)',
                            background: 'var(--color-surface)',
                            border: '1px solid var(--color-border)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            overflow: 'hidden',
                        }}>
                            <img src={logo} alt="Inner Root" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <div>
                            <span style={{
                                display: 'block',
                                fontSize: '1.25rem',
                                fontFamily: 'var(--font-display)',
                                fontWeight: 900,
                                color: 'var(--color-text)',
                                lineHeight: 1,
                                letterSpacing: '-0.02em',
                                textTransform: 'uppercase'
                            }}>Inner Root</span>
                            <span style={{
                                display: 'block',
                                fontSize: '8px',
                                letterSpacing: '0.4em',
                                textTransform: 'uppercase',
                                color: 'var(--gold-500)',
                                marginTop: '0.4rem',
                                fontWeight: 800
                            }}>The Aura of Heritage</span>
                        </div>
                    </Link>

                    <p style={{
                        fontSize: 'clamp(0.8125rem,1vw,0.9375rem)',
                        lineHeight: 1.7,
                        color: 'var(--color-text-subtle)',
                        marginBottom: 'clamp(1rem,2vw,1.5rem)',
                        maxWidth: 340,
                    }}>
                        India's first platform blending 5,000 years of Vedic wisdom with
                        modern AI - explore cultural heritage and nurture your inner wellbeing.
                    </p>

                    <a
                        href="mailto:hello@innerroot.in"
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            fontSize: 'clamp(0.8125rem,1vw,0.9375rem)',
                            color: 'var(--color-text-faint)',
                            transition: 'color 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-faint)'}
                    >
                        <Mail size={14} /> hello@innerroot.in
                    </a>
                </div>

                {/* Link columns */}
                {Object.entries(footerLinks).map(([title, links]) => (
                    <div key={title}>
                        <h4 style={{
                            fontSize: '0.625rem',
                            fontWeight: 900,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'var(--color-text-faint)',
                            marginBottom: '1.5rem',
                            fontFamily: 'var(--font-heading)'
                        }}>
                            {title}
                        </h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem,1vw,0.75rem)' }}>
                            {links.map(link => (
                                <li key={link.label}>
                                    <FooterLink to={link.to}>{link.label}</FooterLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Divider */}
            <div className="divider-8k" style={{ marginBlock: 0, marginBottom: 'clamp(1.5rem,3vw,2.5rem)' }} />

            {/* Bottom bar */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
            }}>
                <p style={{
                    fontSize: 'clamp(0.6875rem,0.9vw,0.8125rem)',
                    color: 'var(--color-text-faint)',
                    display: 'flex', alignItems: 'center', gap: '0.375rem',
                    flexWrap: 'wrap',
                }}>
                    © {new Date().getFullYear()} Inner Root. Crafted with
                    <Heart size={11} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                    to preserve Indian heritage for the next generation.
                </p>

                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 'clamp(1rem,2vw,2rem)',
                    fontSize: 'clamp(0.6875rem,0.9vw,0.8125rem)',
                }}>
                    {[
                        { label: 'Privacy Policy', to: '/privacy' },
                        { label: 'Terms of Use', to: '/terms' },
                    ].map(({ label, to }) => (
                        <Link
                            key={label}
                            to={to}
                            style={{ color: 'var(--color-text-faint)', transition: 'color 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-faint)'}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;

