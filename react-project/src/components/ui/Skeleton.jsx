import React from 'react';

/**
 * Skeleton – Loading placeholder with shimmer animation
 *
 * Usage:
 *   <Skeleton />                   → text line (100%)
 *   <Skeleton width="60%" />       → custom width
 *   <Skeleton variant="title" />   → taller
 *   <Skeleton variant="avatar" />  → circle
 *   <Skeleton variant="thumb" />   → image block
 *   <Skeleton count={3} gap={8} /> → multiple lines
 */
const variantStyles = {
    text: { height: '1em', width: '100%', borderRadius: 'var(--radius-sm)' },
    title: { height: '1.5em', width: '65%', borderRadius: 'var(--radius-sm)' },
    body: { height: '0.875em', width: '100%', borderRadius: 'var(--radius-sm)' },
    thumb: { height: '200px', width: '100%', borderRadius: 'var(--radius-lg)' },
    avatar: { height: '40px', width: '40px', borderRadius: '50%' },
    circle: { height: '48px', width: '48px', borderRadius: '50%' },
    btn: { height: '36px', width: '100px', borderRadius: 'var(--radius-full)' },
    badge: { height: '22px', width: '64px', borderRadius: 'var(--radius-full)' },
};

export function Skeleton({
    variant = 'text',
    width,
    height,
    className = '',
    style = {},
}) {
    const base = variantStyles[variant] || variantStyles.text;
    return (
        <div
            className={`skeleton ${className}`}
            style={{ ...base, ...(width ? { width } : {}), ...(height ? { height } : {}), ...style }}
            aria-hidden="true"
        />
    );
}

export function SkeletonCard({ className = '' }) {
    return (
        <div
            className={`card ${className}`}
            style={{ padding: 'var(--sp-6)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}
            aria-hidden="true"
        >
            <Skeleton variant="thumb" style={{ height: '160px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
                <Skeleton variant="title" />
                <Skeleton variant="body" />
                <Skeleton variant="body" width="80%" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
                <Skeleton variant="avatar" />
                <Skeleton width="120px" />
            </div>
        </div>
    );
}

export function SkeletonText({ lines = 3, className = '' }) {
    const widths = ['100%', '90%', '75%', '85%', '60%'];
    return (
        <div
            className={className}
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}
            aria-hidden="true"
        >
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton key={i} width={widths[i % widths.length]} />
            ))}
        </div>
    );
}

export default Skeleton;
