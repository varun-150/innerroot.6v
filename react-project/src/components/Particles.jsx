import React, { useEffect, useState } from 'react';

const Particles = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const p = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            delay: Math.random() * 8 + 's',
            duration: (6 + Math.random() * 4) + 's'
        }));
        setParticles(p);
    }, []);

    return (
        <div id="particles" className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
            {particles.map(p => (
                <div
                    key={p.id}
                    className="particle"
                    style={{
                        left: p.left,
                        top: p.top,
                        animationDelay: p.delay,
                        animationDuration: p.duration
                    }}
                />
            ))}
        </div>
    );
};

export default Particles;
