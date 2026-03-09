import React, { useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';

/**
 * Modal – Accessible dialog with slide-up + blur animation
 *
 * Usage:
 *   <Modal open={isOpen} onClose={() => setOpen(false)} title="Confirm action">
 *     <p>Are you sure?</p>
 *     <div slot="footer">
 *       <button onClick={() => setOpen(false)}>Cancel</button>
 *     </div>
 *   </Modal>
 *
 * Props:
 *   open     – boolean
 *   onClose  – () => void
 *   title    – string | ReactNode
 *   size     – 'sm' | 'md' | 'lg'  (default md)
 *   footer   – ReactNode (optional)
 *   closeOnBackdrop – boolean (default true)
 */
export function Modal({
    open = false,
    onClose,
    title,
    size = 'md',
    footer,
    children,
    className = '',
}) {
    const backdropRef = useRef(null);
    const firstFocusRef = useRef(null);

    // Lock body scroll
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
            // Slight delay so CSS transition can play
            const t = setTimeout(() => {
                if (backdropRef.current) backdropRef.current.classList.add('open');
            }, 10);
            return () => clearTimeout(t);
        } else {
            if (backdropRef.current) backdropRef.current.classList.remove('open');
            document.body.style.overflow = '';
        }
    }, [open]);

    // Close on Escape
    const handleKey = useCallback((e) => {
        if (e.key === 'Escape') onClose?.();
    }, [onClose]);

    useEffect(() => {
        if (open) {
            document.addEventListener('keydown', handleKey);
            firstFocusRef.current?.focus();
        }
        return () => document.removeEventListener('keydown', handleKey);
    }, [open, handleKey]);

    if (!open) return null;

    const sizeClass = size === 'sm' ? 'modal-sm' : size === 'lg' ? 'modal-lg' : '';

    return (
        <div
            ref={backdropRef}
            className="modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => { if (e.target === backdropRef.current) onClose?.(); }}
        >
            <div className={`modal ${sizeClass} ${className}`} role="document">
                {/* Header */}
                {title && (
                    <div className="modal-header">
                        <h3
                            id="modal-title"
                            style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: 'var(--text-lg)',
                                fontWeight: 600,
                                color: 'var(--color-text)',
                                letterSpacing: '-0.01em',
                            }}
                        >
                            {title}
                        </h3>
                        <button
                            ref={firstFocusRef}
                            onClick={onClose}
                            className="icon-btn"
                            aria-label="Close dialog"
                            style={{ marginLeft: 'auto' }}
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}

                {/* Body */}
                <div className="modal-body">{children}</div>

                {/* Footer */}
                {footer && <div className="modal-footer">{footer}</div>}
            </div>
        </div>
    );
}

export default Modal;
