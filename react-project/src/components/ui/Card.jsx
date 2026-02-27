import React from 'react';

const Card = ({
    children,
    variant = 'standard',
    className = '',
    padding = '6',
    animate = true,
    ...props
}) => {
    const baseClass = variant === 'glass' ? 'glass-card' : 'heritage-card';
    const paddingClass = padding ? `p-${padding}` : 'p-6';
    const animationClass = animate ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg' : '';

    return (
        <article
            className={`${baseClass} ${paddingClass} ${animationClass} ${className}`}
            {...props}
        >
            {children}
        </article>
    );
};

export const CardHeader = ({ children, className = '' }) => (
    <header className={`mb-4 ${className}`}>{children}</header>
);

export const CardContent = ({ children, className = '' }) => (
    <div className={className}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
    <footer className={`mt-6 pt-4 border-t border-[var(--border)] ${className}`}>{children}</footer>
);

export default Card;
