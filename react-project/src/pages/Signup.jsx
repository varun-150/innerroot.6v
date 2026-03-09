import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Mail, Lock, User, Eye, EyeOff, CheckCircle2, AlertCircle, ShieldCheck, ArrowLeft, RefreshCcw } from 'lucide-react';
import SEO from '../components/ui/SEO';
import { useAuth } from '../context/AuthContext';

import logo from '../assets/logo.webp';

/* ── Google G SVG Icon ── */
const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.64 9.20455C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z" fill="#4285F4" />
        <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4205 9 14.4205C6.65591 14.4205 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z" fill="#34A853" />
        <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957275C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z" fill="#FBBC05" />
        <path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335" />
    </svg>
);

/* ── Password strength checker ── */
const getStrength = (pw) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score; // 0-4
};

const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const strengthColors = ['', '#ef4444', '#f59e0b', '#22c55e', '#14532d'];

const Signup = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState('signup'); // 'signup' | 'verify'
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const { register, googleAuth } = useAuth();

    // OTP State
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const otpRefs = useRef([]);

    useEffect(() => {
        let interval;
        if (step === 'verify' && timer > 0) {
            interval = setInterval(() => setTimer(t => t - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [step, timer]);

    const pwStrength = getStrength(form.password);
    const updateField = (field, value) => setForm(f => ({ ...f, [field]: value }));

    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        if (value && index < 5) otpRefs.current[index + 1].focus();
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) otpRefs.current[index - 1].focus();
    };

    /* Email sign-up - Step 1 */
    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!form.name || !form.email || !form.password) { setError('Please fill in all fields.'); return; }
        if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return; }
        if (!agreedToTerms) { setError('You must agree to the Terms & Conditions.'); return; }
        setLoading(true);
        // Simulated API to send verification code in local mode
        await new Promise(r => setTimeout(r, 1200));
        setLoading(false);
        setStep('verify');
    };

    /* Verification Submit - Step 2 */
    const handleVerifySubmit = async (e) => {
        e.preventDefault();
        setError('');
        const code = otp.join('');
        if (code.length < 6) { setError('Please enter the full 6-digit code.'); return; }
        setLoading(true);
        try {
            if (code === '123456') {
                await register(form.name, form.email, form.password);
                navigate('/dashboard');
            } else {
                setError('Invalid verification code. Please try again.');
            }
        } catch (err) {
            setError(err.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    /* Google sign-up */
    // Using Supabase direct OAuth instead of Google Login provider component here
    const handleGoogleAuth = async () => {
        setGoogleLoading(true);
        setError('');
        try {
            await googleAuth();
        } catch (err) {
            setError(err.message || 'Google sign-in failed.');
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <>
            <SEO title={step === 'signup' ? "Sign Up — Inner Root" : "Verify Account — Inner Root"} description="Create your Inner Root account and begin your journey." />
            <div className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
                <div className="sacred-geometry" style={{ opacity: 0.02 }} />

                <div className="absolute w-80 h-80 rounded-full pointer-events-none"
                    style={{ bottom: '10%', left: '-5%', background: 'radial-gradient(circle, rgba(20,83,45,0.06) 0%, transparent 70%)' }} />

                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-md relative z-10"
                >
                    <div className="rounded-3xl p-8 sm:p-10" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', boxShadow: 'var(--shadow-xl)' }}>

                        <AnimatePresence mode="wait">
                            {step === 'signup' ? (
                                <motion.div
                                    key="signup-step"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Logo + Heading */}
                                    <div className="text-center mb-8">
                                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 overflow-hidden"
                                            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)' }}>
                                            <img src={logo} alt="Inner Root Logo" className="w-full h-full object-contain" />
                                        </div>
                                        <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>Begin Your Journey</h1>
                                        <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Create your Inner Root account</p>
                                    </div>

                                    {/* Google Button */}
                                    <button
                                        onClick={handleGoogleAuth}
                                        disabled={googleLoading || loading}
                                        className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 mb-5"
                                        style={{ background: 'var(--bg-secondary)', border: '1.5px solid var(--border-primary)', color: 'var(--text-primary)' }}
                                        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                                        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-primary)'}
                                    >
                                        {googleLoading ? (
                                            <div className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
                                                style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} />
                                        ) : <GoogleIcon />}
                                        {googleLoading ? 'Connecting...' : 'Continue with Google'}
                                    </button>

                                    {/* Divider */}
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="flex-1 h-px" style={{ background: 'var(--border-primary)' }} />
                                        <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>or sign up with email</span>
                                        <div className="flex-1 h-px" style={{ background: 'var(--border-primary)' }} />
                                    </div>

                                    {/* Error */}
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                                            className="flex items-center gap-2 rounded-xl p-3 mb-5 text-sm overflow-hidden"
                                            style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }}
                                        >
                                            <AlertCircle size={15} /> {error}
                                        </motion.div>
                                    )}

                                    {/* Form */}
                                    <form onSubmit={handleSignupSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Full Name</label>
                                            <div className="relative">
                                                <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }} />
                                                <input
                                                    type="text" value={form.name} onChange={e => updateField('name', e.target.value)}
                                                    placeholder="Your name" className="input" style={{ paddingLeft: '2.75rem' }}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Email</label>
                                            <div className="relative">
                                                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }} />
                                                <input
                                                    type="email" value={form.email} onChange={e => updateField('email', e.target.value)}
                                                    placeholder="you@example.com" className="input" style={{ paddingLeft: '2.75rem' }}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Password</label>
                                            <div className="relative">
                                                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }} />
                                                <input
                                                    type={showPassword ? 'text' : 'password'} value={form.password}
                                                    onChange={e => updateField('password', e.target.value)}
                                                    placeholder="Min. 8 characters" className="input"
                                                    style={{ paddingLeft: '2.75rem', paddingRight: '2.75rem' }}
                                                />
                                                <button type="button" onClick={() => setShowPassword(s => !s)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }}>
                                                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                                </button>
                                            </div>
                                            {form.password.length > 0 && (
                                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2">
                                                    <div className="flex gap-1 mb-1">
                                                        {[1, 2, 3, 4].map(n => (
                                                            <div key={n} className="h-1 flex-1 rounded-full transition-all duration-300"
                                                                style={{ background: pwStrength >= n ? strengthColors[pwStrength] : 'var(--border-primary)' }} />
                                                        ))}
                                                    </div>
                                                    <span className="text-[10px] font-semibold" style={{ color: strengthColors[pwStrength] }}>
                                                        {strengthLabels[pwStrength]}
                                                    </span>
                                                </motion.div>
                                            )}
                                        </div>

                                        <div className="flex items-start gap-3 py-1">
                                            <div className="pt-0.5">
                                                <input
                                                    type="checkbox"
                                                    id="terms-checkbox"
                                                    checked={agreedToTerms}
                                                    onChange={e => setAgreedToTerms(e.target.checked)}
                                                    className="w-4 h-4 rounded border-primary bg-secondary text-accent focus:ring-accent"
                                                />
                                            </div>
                                            <label htmlFor="terms-checkbox" className="text-xs leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
                                                I agree to the <Link to="/terms" className="text-accent underline">Terms of Service</Link> and <Link to="/privacy" className="text-accent underline">Privacy Policy</Link>.
                                            </label>
                                        </div>

                                        <button type="submit" disabled={loading}
                                            className="btn btn-primary w-full justify-center" style={{ height: 48 }}>
                                            {loading ? (
                                                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                            ) : <><UserPlus size={17} /> Create Account</>}
                                        </button>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="verify-step"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <button
                                        onClick={() => setStep('signup')}
                                        className="flex items-center gap-1.5 text-xs mb-6 hover:translate-x-[-2px] transition-transform"
                                        style={{ color: 'var(--text-tertiary)' }}
                                    >
                                        <ArrowLeft size={14} /> Back to Sign Up
                                    </button>

                                    <div className="text-center mb-8">
                                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                            style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                                            <ShieldCheck size={28} />
                                        </div>
                                        <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>Verify Email</h1>
                                        <p className="text-sm px-4" style={{ color: 'var(--text-tertiary)' }}>
                                            Verification code sent to <span className="font-medium text-[var(--text-secondary)]">{form.email}</span>
                                        </p>
                                    </div>

                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                                            className="flex items-center gap-2 rounded-xl p-3 mb-6 text-sm overflow-hidden"
                                            style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }}
                                        >
                                            <AlertCircle size={15} /> {error}
                                        </motion.div>
                                    )}

                                    <form onSubmit={handleVerifySubmit}>
                                        <div className="flex justify-between gap-2 mb-8">
                                            {otp.map((digit, i) => (
                                                <input
                                                    key={i}
                                                    ref={el => otpRefs.current[i] = el}
                                                    type="text"
                                                    value={digit}
                                                    onChange={e => handleOtpChange(i, e.target.value)}
                                                    onKeyDown={e => handleOtpKeyDown(i, e)}
                                                    className="w-12 h-14 text-center text-xl font-bold rounded-xl border-2 transition-all outline-none"
                                                    style={{
                                                        borderColor: digit ? 'var(--accent)' : 'var(--border-primary)',
                                                        background: digit ? 'var(--accent-soft)' : 'var(--bg-secondary)',
                                                        color: 'var(--text-primary)'
                                                    }}
                                                    maxLength={1}
                                                />
                                            ))}
                                        </div>

                                        <button type="submit" disabled={loading}
                                            className="btn btn-primary w-full justify-center mb-6" style={{ height: 48 }}>
                                            {loading ? (
                                                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                            ) : 'Confirm Account'}
                                        </button>

                                        <div className="text-center">
                                            <p className="text-xs mb-2" style={{ color: 'var(--text-tertiary)' }}>Didn't receive the code?</p>
                                            <button
                                                type="button"
                                                onClick={() => { setTimer(30); setOtp(['', '', '', '', '', '']); }}
                                                disabled={timer > 0}
                                                className="flex items-center gap-2 mx-auto text-xs font-semibold px-4 py-2 rounded-lg transition-all"
                                                style={{
                                                    color: timer > 0 ? 'var(--text-tertiary)' : 'var(--accent)',
                                                    background: timer > 0 ? 'transparent' : 'var(--accent-soft)'
                                                }}
                                            >
                                                <RefreshCcw size={14} className={timer > 0 ? '' : 'animate-spin-slow'} />
                                                {timer > 0 ? `Resend in ${timer}s` : 'Resend Code Now'}
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="divider my-6" />

                        <p className="text-center text-sm" style={{ color: 'var(--text-tertiary)' }}>
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold" style={{ color: 'var(--accent)' }}>Sign In</Link>
                        </p>
                    </div>

                    <p className="text-center text-xs mt-5" style={{ color: 'var(--text-tertiary)' }}>
                        By creating an account, you agree to our{' '}
                        <Link to="/terms" style={{ color: 'var(--accent)' }}>Terms</Link> &amp;{' '}
                        <Link to="/privacy" style={{ color: 'var(--accent)' }}>Privacy Policy</Link>
                    </p>
                </motion.div>
            </div>
        </>
    );
};

export default Signup;
