import React, { useRef, useEffect, useState } from 'react';

export const Reveal = ({ children, className = '', style = {} }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);

        const fallback = setTimeout(() => setIsVisible(true), 2000);

        return () => {
            observer.disconnect();
            clearTimeout(fallback);
        };
    }, []);

    return (
        <div ref={ref} className={`reveal ${isVisible ? 'active' : ''} ${className}`} style={style}>
            {children}
        </div>
    );
};

export const Stagger = ({ children, className = '', id = '' }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.01 }
        );
        if (ref.current) observer.observe(ref.current);

        const fallback = setTimeout(() => setIsVisible(true), 2000);

        return () => {
            observer.disconnect();
            clearTimeout(fallback);
        };
    }, []);

    return (
        <div ref={ref} id={id} className={`stagger-children ${isVisible ? 'active' : ''} ${className}`}>
            {children}
        </div>
    );
};
