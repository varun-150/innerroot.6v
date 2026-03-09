import React from 'react';

/**
 * Badge – Status / label chip
 *
 * Usage:
 *   <Badge>Default</Badge>
 *   <Badge variant="brand">New</Badge>
 *   <Badge variant="success" dot>Live</Badge>
 *   <Badge variant="error" outline>Critical</Badge>
 */
const variants = {
    default: 'badge-default',
    brand: 'badge-brand',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
    info: 'badge-info',
};

export function Badge({
    variant = 'default',
    outline = false,
    dot = false,
    children,
    className = '',
    style = {},
}) {
    const cls = [
        'badge',
        variants[variant] || variants.default,
        outline ? 'badge-outline' : '',
        dot ? 'badge-dot' : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <span className={cls} style={style}>
            {children}
        </span>
    );
}

export default Badge;
