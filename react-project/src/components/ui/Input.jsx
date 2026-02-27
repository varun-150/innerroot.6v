import React from 'react';

const Input = ({
    label,
    error,
    id,
    className = '',
    containerClassName = '',
    icon: Icon,
    as: Component = 'input',
    ...props
}) => {
    const commonClasses = `
        w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
        text-[var(--fg)] placeholder-[var(--muted)]/50
        focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 focus:border-transparent
        transition-all duration-300
        ${Icon ? 'pl-11' : ''}
        ${error ? 'border-red-500 focus:ring-red-500/50' : ''}
        ${className}
    `;

    return (
        <div className={`space-y-2 ${containerClassName}`}>
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-semibold text-[var(--fg)]"
                >
                    {label}
                </label>
            )}
            <div className="relative group">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Icon className="h-5 w-5 text-[var(--muted)] group-focus-within:text-[var(--accent)] transition-colors" />
                    </div>
                )}
                <Component
                    id={id}
                    className={commonClasses}
                    {...props}
                />
            </div>
            {error && (
                <p className="text-xs text-red-500 mt-1 animate-fadeIn">{error}</p>
            )}
        </div>
    );
};

export default Input;
