import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Dropdown – Animated, accessible dropdown menu
 *
 * Usage:
 *   <Dropdown trigger={<button className="btn btn-secondary">Options</button>}>
 *     <DropdownItem onClick={…}>Edit</DropdownItem>
 *     <DropdownItem danger onClick={…}>Delete</DropdownItem>
 *   </Dropdown>
 *
 * Props (Dropdown):
 *   trigger  – ReactNode (the element that opens the dropdown)
 *   align    – 'left' | 'right' (default 'left')
 *   children – DropdownItem nodes
 *
 * Props (DropdownItem):
 *   onClick  – () => void
 *   icon     – ReactNode
 *   danger   – boolean
 *   active   – boolean
 *   disabled – boolean
 */
export function Dropdown({ trigger, align = 'left', children, className = '' }) {
    const [open, setOpen] = useState(false);
    const wrapRef = useRef(null);

    const close = useCallback(() => setOpen(false), []);

    useEffect(() => {
        const handler = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) close();
        };
        const keyHandler = (e) => { if (e.key === 'Escape') close(); };
        if (open) {
            document.addEventListener('mousedown', handler);
            document.addEventListener('keydown', keyHandler);
        }
        return () => {
            document.removeEventListener('mousedown', handler);
            document.removeEventListener('keydown', keyHandler);
        };
    }, [open, close]);

    return (
        <div ref={wrapRef} className={`dropdown ${className}`} style={{ position: 'relative', display: 'inline-block' }}>
            {/* Trigger */}
            <div
                onClick={() => setOpen((p) => !p)}
                style={{ cursor: 'pointer' }}
                aria-haspopup="true"
                aria-expanded={open}
            >
                {trigger}
            </div>

            {/* Menu */}
            <div
                className={`dropdown-menu ${open ? 'open' : ''}`}
                style={align === 'right' ? { left: 'auto', right: 0 } : {}}
                role="menu"
            >
                {React.Children.map(children, (child) =>
                    child
                        ? React.cloneElement(child, {
                            onClick: (...args) => {
                                child.props.onClick?.(...args);
                                close();
                            },
                        })
                        : null
                )}
            </div>
        </div>
    );
}

export function DropdownItem({ onClick, icon, danger = false, active = false, disabled = false, children }) {
    return (
        <button
            className={`dropdown-item ${danger ? 'danger' : ''} ${active ? 'active' : ''}`}
            onClick={disabled ? undefined : onClick}
            role="menuitem"
            disabled={disabled}
            style={disabled ? { opacity: 0.45, cursor: 'not-allowed' } : {}}
        >
            {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
            {children}
        </button>
    );
}

export function DropdownDivider() {
    return <div className="dropdown-divider" />;
}

/**
 * SelectDropdown – A stylized native-feeling select replacement
 *
 * Usage:
 *   <SelectDropdown
 *     options={[{ label: 'Option A', value: 'a' }]}
 *     value={val}
 *     onChange={setVal}
 *     placeholder="Choose…"
 *   />
 */
export function SelectDropdown({ options = [], value, onChange, placeholder = 'Select…', disabled = false }) {
    const [open, setOpen] = useState(false);
    const selected = options.find((o) => o.value === value);
    const wrapRef = useRef(null);

    useEffect(() => {
        const handler = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={wrapRef} style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
            <button
                type="button"
                className="input"
                onClick={() => !disabled && setOpen((p) => !p)}
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={open}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                }}
            >
                <span style={{ color: selected ? 'var(--color-text)' : 'var(--color-text-faint)' }}>
                    {selected ? selected.label : placeholder}
                </span>
                <ChevronDown
                    size={15}
                    style={{
                        color: 'var(--color-text-faint)',
                        transition: 'transform 0.2s',
                        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                        flexShrink: 0,
                    }}
                />
            </button>

            <div
                className={`dropdown-menu ${open ? 'open' : ''}`}
                role="listbox"
                style={{ width: '100%' }}
            >
                {options.map((opt) => (
                    <button
                        key={opt.value}
                        className={`dropdown-item ${opt.value === value ? 'active' : ''}`}
                        role="option"
                        aria-selected={opt.value === value}
                        onClick={() => { onChange?.(opt.value); setOpen(false); }}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Dropdown;
