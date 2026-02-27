import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    disabled = false,
    as: Component = 'button',
    ...props
}) => {
    const baseClass = 'btn';
    const variantClass = `btn-${variant}`;
    const sizeClass = size !== 'md' ? `btn-${size}` : '';

    return (
        <Component
            className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
            disabled={disabled}
            aria-disabled={disabled}
            {...props}
        >
            {LeftIcon && <LeftIcon className="w-4 h-4" aria-hidden="true" />}
            {children}
            {RightIcon && <RightIcon className="w-4 h-4" aria-hidden="true" />}
        </Component>
    );
};

export default Button;
