import React from 'react';

/**
 * Button – Production-ready button component
 *
 * Usage:
 *   <Button>Click</Button>
 *   <Button variant="secondary" size="lg">Explore</Button>
 *   <Button variant="ghost" icon={<ArrowRight size={16}/>} iconRight>Read more</Button>
 *   <Button loading>Saving…</Button>
 *   <Button as="a" href="/signup">Sign Up Free</Button>
 *
 * Props:
 *   variant  – 'primary' | 'secondary' | 'ghost' | 'danger'
 *   size     – 'sm' | 'md' | 'lg' | 'xl'
 *   icon     – ReactNode (left icon)
 *   iconRight– boolean (move icon to right)
 *   loading  – boolean
 *   full     – boolean (width: 100%)
 *   as       – element type or component (default 'button')
 */
export function Button({
    variant = 'primary',
    size = 'md',
    icon,
    iconRight = false,
    loading = false,
    full = false,
    disabled = false,
    as: Tag = 'button',
    children,
    className = '',
    style = {},
    ...rest
}) {
    const cls = [
        'btn',
        `btn-${variant}`,
        size !== 'md' ? `btn-${size}` : '',
        full ? 'w-full justify-center' : '',
        loading ? 'pointer-events-none' : '',
        className,
    ].filter(Boolean).join(' ');

    const Spinner = () => (
        <svg
            width="14" height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ animation: 'spinSlow 0.7s linear infinite', flexShrink: 0 }}
            aria-hidden="true"
        >
            <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" />
        </svg>
    );

    return (
        <Tag
            className={cls}
            disabled={Tag === 'button' ? (disabled || loading) : undefined}
            aria-disabled={disabled || loading || undefined}
            style={{ ...(full ? { width: '100%' } : {}), ...style }}
            {...rest}
        >
            {loading && <Spinner />}
            {!loading && icon && !iconRight && <span style={{ display: 'flex' }}>{icon}</span>}
            {children}
            {!loading && icon && iconRight && <span style={{ display: 'flex' }}>{icon}</span>}
        </Tag>
    );
}

export default Button;
