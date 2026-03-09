import React, { useCallback, useEffect, useRef } from 'react';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

/**
 * Toast / notification banner with auto-dismiss
 *
 * Usage (managed by useToast hook):
 *   const { toasts, toast } = useToast();
 *   toast.success('Saved!');
 *   toast.error('Something went wrong');
 *   <ToastStack toasts={toasts} />
 */

const icons = {
    success: <CheckCircle size={18} style={{ color: 'var(--color-success)', flexShrink: 0 }} />,
    error: <AlertCircle size={18} style={{ color: 'var(--color-error)', flexShrink: 0 }} />,
    warning: <AlertTriangle size={18} style={{ color: 'var(--color-warning)', flexShrink: 0 }} />,
    info: <Info size={18} style={{ color: 'var(--color-info)', flexShrink: 0 }} />,
};

export function Toast({ id, type = 'info', title, message, onDismiss }) {
    const timerRef = useRef(null);

    const dismiss = useCallback(() => onDismiss?.(id), [id, onDismiss]);

    useEffect(() => {
        timerRef.current = setTimeout(dismiss, 5000);
        return () => clearTimeout(timerRef.current);
    }, [dismiss]);

    return (
        <div
            className={`toast toast-${type}`}
            role="alert"
            aria-live="polite"
            onMouseEnter={() => clearTimeout(timerRef.current)}
            onMouseLeave={() => { timerRef.current = setTimeout(dismiss, 2000); }}
        >
            {icons[type]}
            <div style={{ flex: 1, minWidth: 0 }}>
                {title && (
                    <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text)', marginBottom: 2 }}>
                        {title}
                    </p>
                )}
                {message && (
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-subtle)', lineHeight: 1.4 }}>
                        {message}
                    </p>
                )}
            </div>
            <button
                onClick={dismiss}
                className="icon-btn"
                style={{ width: 28, height: 28, border: 'none', flexShrink: 0 }}
                aria-label="Dismiss notification"
            >
                <X size={13} />
            </button>
        </div>
    );
}

export function ToastStack({ toasts = [], onDismiss }) {
    return (
        <div className="toast-container" aria-label="Notifications">
            {toasts.map((t) => (
                <Toast key={t.id} {...t} onDismiss={onDismiss} />
            ))}
        </div>
    );
}

/**
 * useToast – hook for managing toast notifications
 *
 * const { toasts, toast } = useToast();
 * toast.success('Profile saved', 'Your changes have been applied.');
 */
export function useToast() {
    const [toasts, setToasts] = React.useState([]);

    const dismiss = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const push = useCallback((type, title, message) => {
        const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        setToasts((prev) => [...prev, { id, type, title, message }]);
    }, []);

    const toast = {
        success: (title, message) => push('success', title, message),
        error: (title, message) => push('error', title, message),
        warning: (title, message) => push('warning', title, message),
        info: (title, message) => push('info', title, message),
    };

    return { toasts, toast, dismiss };
}

export default Toast;
