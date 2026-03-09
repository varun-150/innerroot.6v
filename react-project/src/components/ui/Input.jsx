import React, { forwardRef } from 'react';

/**
 * Input – Accessible text input with icon support
 *
 * Usage:
 *   <Input placeholder="Search…" />
 *   <Input leftIcon={<Search size={15}/>} />
 *   <Input size="lg" error="Required" />
 *   <Input as="textarea" rows={4} />
 */
export const Input = forwardRef(function Input(
    {
        as: Tag = 'input',
        size: inputSize = 'md',
        leftIcon,
        rightIcon,
        error,
        hint,
        label,
        id,
        full = true,
        className = '',
        style = {},
        ...rest
    },
    ref
) {
    const sizeClass = inputSize === 'sm' ? 'input-sm' : inputSize === 'lg' ? 'input-lg' : '';
    const hasLeft = Boolean(leftIcon);
    const hasRight = Boolean(rightIcon);
    const uid = id || React.useId?.() || undefined;

    return (
        <div style={{ display: full ? 'block' : 'inline-block', width: full ? '100%' : undefined }}>
            {label && (
                <label
                    htmlFor={uid}
                    style={{
                        display: 'block',
                        marginBottom: 'var(--sp-2)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 500,
                        color: 'var(--color-text-subtle)',
                    }}
                >
                    {label}
                </label>
            )}

            <div className="input-group" style={{ width: full ? '100%' : undefined }}>
                {hasLeft && (
                    <span className="input-icon" style={{ left: 'var(--sp-3)' }}>
                        {leftIcon}
                    </span>
                )}

                <Tag
                    id={uid}
                    ref={ref}
                    className={[
                        'input',
                        sizeClass,
                        error ? 'error' : '',
                        className,
                    ].filter(Boolean).join(' ')}
                    style={{
                        paddingLeft: hasLeft ? '2.5rem' : undefined,
                        paddingRight: hasRight ? '2.5rem' : undefined,
                        width: full ? '100%' : undefined,
                        resize: Tag === 'textarea' ? 'vertical' : undefined,
                        ...style,
                    }}
                    aria-invalid={error ? 'true' : undefined}
                    aria-describedby={error || hint ? `${uid}-msg` : undefined}
                    {...rest}
                />

                {hasRight && (
                    <span
                        className="input-icon"
                        style={{ left: 'auto', right: 'var(--sp-3)' }}
                    >
                        {rightIcon}
                    </span>
                )}
            </div>

            {(error || hint) && (
                <p
                    id={`${uid}-msg`}
                    style={{
                        marginTop: 'var(--sp-1)',
                        fontSize: 'var(--text-xs)',
                        color: error ? 'var(--color-error)' : 'var(--color-text-faint)',
                    }}
                    role={error ? 'alert' : undefined}
                >
                    {error || hint}
                </p>
            )}
        </div>
    );
});

export default Input;
