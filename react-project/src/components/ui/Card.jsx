import React from 'react';

/**
 * Card – Elevation-aware surface card
 *
 * Usage:
 *   <Card>…content…</Card>
 *   <Card variant="glass" padding="lg">…</Card>
 *   <Card variant="glow" hover onClick={…}>…</Card>
 *
 * Props:
 *   variant – 'default' | 'glass' | 'glow' | 'stat' | 'heritage'
 *   padding – 'none' | 'sm' | 'md' | 'lg' | 'xl'
 *   hover   – boolean (enable hover lift)
 *   as      – element tag
 */
const paddings = {
    none: '0',
    sm: 'var(--sp-4)',
    md: 'var(--sp-6)',
    lg: 'var(--sp-8)',
    xl: 'var(--sp-10)',
};

const variantClass = {
    default: 'card',
    glass: 'glass-card',
    glow: 'card-glow',
    stat: 'stat-card',
    heritage: 'heritage-card',
};

export function Card({
    variant = 'default',
    padding = 'md',
    hover = true,
    as: Tag = 'div',
    children,
    className = '',
    style = {},
    ...rest
}) {
    const cls = [
        variantClass[variant] || 'card',
        !hover ? 'no-hover' : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <Tag
            className={cls}
            style={{
                padding: paddings[padding],
                ...(variant === 'heritage' ? { padding: 0 } : {}),
                ...style,
            }}
            {...rest}
        >
            {children}
        </Tag>
    );
}

export function CardHeader({ children, style = {}, className = '' }) {
    return (
        <div
            className={className}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 'var(--sp-4)',
                ...style,
            }}
        >
            {children}
        </div>
    );
}

export function CardTitle({ children, style = {}, className = '' }) {
    return (
        <h3
            className={className}
            style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-base)',
                fontWeight: 600,
                color: 'var(--color-text)',
                letterSpacing: '-0.01em',
                ...style,
            }}
        >
            {children}
        </h3>
    );
}

export function CardBody({ children, style = {}, className = '' }) {
    return (
        <div className={className} style={style}>
            {children}
        </div>
    );
}

export function CardFooter({ children, style = {}, className = '' }) {
    return (
        <div
            className={className}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--sp-3)',
                marginTop: 'var(--sp-4)',
                paddingTop: 'var(--sp-4)',
                borderTop: '1px solid var(--color-border)',
                ...style,
            }}
        >
            {children}
        </div>
    );
}

export default Card;
