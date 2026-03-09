import React, { useEffect, useState, useRef } from 'react';

/**
 * Particles — Ultra-premium ambient particle field
 * - Varies size (1–4px), opacity, speed, colour
 * - Uses CSS custom properties for GPU-composited animation
 * - Respects prefers-reduced-motion
 */
const COLOURS = [
    'var(--color-accent)',
    'rgba(217,119,6,0.6)',
    'rgba(245,190,78,0.5)',
    'rgba(20,83,45,0.4)',
    'rgba(134,239,172,0.35)',
];

const Particles = () => {
    const [particles, setParticles] = useState([]);
    const mounted = useRef(false);

    useEffect(() => {
        if (mounted.current) return;
        mounted.current = true;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) return;

        const COUNT = 28;
        const p = Array.from({ length: COUNT }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${20 + Math.random() * 70}%`,
            size: `${1 + Math.random() * 3}px`,
            colour: COLOURS[Math.floor(Math.random() * COLOURS.length)],
            delay: `${Math.random() * 12}s`,
            duration: `${7 + Math.random() * 10}s`,
            travel: `${60 + Math.random() * 100}px`,
        }));
        setParticles(p);
    }, []);

    if (particles.length === 0) return null;

    return (
        <div
            id="particles"
            aria-hidden="true"
            style={{
                position: 'fixed', inset: 0,
                pointerEvents: 'none',
                zIndex: 0,
                overflow: 'hidden',
            }}
        >
            {particles.map(p => (
                <div
                    key={p.id}
                    style={{
                        position: 'absolute',
                        left: p.left,
                        top: p.top,
                        width: p.size,
                        height: p.size,
                        borderRadius: '50%',
                        background: p.colour,
                        opacity: 0,
                        animationName: 'floatParticle',
                        animationDuration: p.duration,
                        animationDelay: p.delay,
                        animationTimingFunction: 'ease-in-out',
                        animationIterationCount: 'infinite',
                        willChange: 'transform, opacity',
                        /* blur falloff at edges */
                        filter: `blur(${Math.random() > 0.6 ? '1px' : '0'})`,
                    }}
                />
            ))}
        </div>
    );
};

export default Particles;
