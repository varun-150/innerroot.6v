import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react';
import SEO from '../components/ui/SEO';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';

import logo from '../assets/logo.webp';

/* ── Google Icon ── */
const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.64 9.20455C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z" fill="#4285F4" />
        <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4205 9 14.4205C6.65591 14.4205 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z" fill="#34A853" />
        <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957275C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z" fill="#FBBC05" />
        <path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335" />
    </svg>
);

const Signup = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const { register, googleAuth } = useAuth();

    const updateField = (field, value) => setForm(f => ({ ...f, [field]: value }));

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!form.name || !form.email || !form.password) { setError('Please manifest all required fields.'); return; }
        if (!agreedToTerms) { setError('You must accept the sacred terms.'); return; }
        
        setLoading(true);
        try {
            await register(form.name, form.email, form.password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Creation failed. The spirit is willing but the network is slow.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setLoading(true);
            try {
                await googleAuth(tokenResponse.access_token);
                navigate('/dashboard');
            } catch (err) {
                setError('Google synchronization failed.');
            } finally {
                setLoading(false);
            }
        },
        onError: () => setError('Google communion unsuccessful.')
    });

    return (
        <div className="bg-[#050604] min-h-screen text-[#F0EEE8] font-sans selection:bg-[#D4AF37] selection:text-black">
            <SEO title="Initiate | Inner Root" />


            <main className="relative flex items-center justify-center pt-32 pb-20 px-6 min-h-screen overflow-hidden">
                {/* ── Background Effects ── */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(20,83,45,0.1)_0%,transparent_70%)] blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(212,175,55,0.05)_0%,transparent_70%)] blur-[100px]" />
                    <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" 
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
                    />
                </div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.98, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full max-w-[480px] z-10"
                >
                    {/* ── Main Auth Card ── */}
                    <div className="backdrop-blur-[40px] bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 md:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                        {/* Shimmer Border */}
                        <div className="absolute inset-0 border border-[#D4AF37]/10 rounded-[2.5rem] group-hover:border-[#D4AF37]/30 transition-colors duration-1000 pointer-events-none" />

                        <div className="text-center mb-12">
                            <div className="w-20 h-20 rounded-3xl mx-auto mb-8 bg-white/5 border border-white/5 flex items-center justify-center shadow-inner group/logo">
                                <img src={logo} alt="Inner Root" className="w-12 h-12 object-contain group-hover/logo:scale-110 transition-transform duration-700" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-serif font-black uppercase tracking-tight text-white mb-4">
                                Begin Your Journey
                            </h1>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]/70">Initiate your digital avatar</p>
                            </div>
                        </div>

                        {/* Social Auth */}
                        <button 
                            onClick={() => handleGoogleLogin()}
                            className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-white/[0.02] border border-white/5 rounded-2xl font-bold text-sm hover:bg-white/[0.06] transition-all mb-8 group/google"
                        >
                            <GoogleIcon />
                            <span className="text-white/80 group-hover/google:text-white transition-colors">Continue with Google</span>
                        </button>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex-1 h-[1px] bg-white/5" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/20">or sign up with email</span>
                            <div className="flex-1 h-[1px] bg-white/5" />
                        </div>

                        {/* Error Handling */}
                        {error && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-4 rounded-xl bg-red-400/10 border border-red-400/20 text-red-300 text-xs flex items-center gap-3">
                                <AlertCircle size={14} /> {error}
                            </motion.div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSignupSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Full Name</label>
                                <div className="relative group/field">
                                    <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-hover/field:text-[#D4AF37]/50 transition-colors" />
                                    <input 
                                        type="text" value={form.name} onChange={e => updateField('name', e.target.value)}
                                        placeholder="Your name" 
                                        className="w-full bg-white/[0.01] border border-white/5 focus:border-[#D4AF37]/40 focus:bg-white/[0.03] rounded-2xl py-4 pl-14 pr-6 outline-none transition-all text-sm font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Email</label>
                                <div className="relative group/field">
                                    <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-hover/field:text-[#D4AF37]/50 transition-colors" />
                                    <input 
                                        type="email" value={form.email} onChange={e => updateField('email', e.target.value)}
                                        placeholder="you@example.com" 
                                        className="w-full bg-white/[0.01] border border-white/5 focus:border-[#D4AF37]/40 focus:bg-white/[0.03] rounded-2xl py-4 pl-14 pr-6 outline-none transition-all text-sm font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Password</label>
                                <div className="relative group/field">
                                    <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-hover/field:text-[#D4AF37]/50 transition-colors" />
                                    <input 
                                        type={showPassword ? 'text' : 'password'} value={form.password} onChange={e => updateField('password', e.target.value)}
                                        placeholder="••••••••" 
                                        className="w-full bg-white/[0.01] border border-white/5 focus:border-[#D4AF37]/40 focus:bg-white/[0.03] rounded-2xl py-4 pl-14 pr-14 outline-none transition-all text-sm font-medium"
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-[#D4AF37] transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 px-1 py-1">
                                <input 
                                    type="checkbox" id="terms" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)}
                                    className="mt-1 w-4 h-4 rounded border-white/10 bg-white/5 checked:bg-[#D4AF37] focus:ring-offset-0 focus:ring-[#D4AF37]"
                                />
                                <label htmlFor="terms" className="text-[11px] leading-relaxed text-white/40">
                                    I agree to the <Link to="/terms" className="text-[#D4AF37]/80 hover:text-[#D4AF37] transition-colors">Terms of Service</Link> and <Link to="/privacy" className="text-[#D4AF37]/80 hover:text-[#D4AF37] transition-colors">Privacy Policy</Link>
                                </label>
                            </div>

                            <button 
                                type="submit" disabled={loading}
                                className="w-full py-5 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-black uppercase text-[11px] tracking-[0.3em] rounded-2xl shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.3)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                            >
                                {loading ? 'Synchronizing...' : 'Manifest Identity'}
                            </button>
                        </form>

                        <div className="mt-12 pt-8 border-t border-white/5 text-center">
                            <p className="text-xs text-white/40 font-medium">
                                Already have an account?{' '}
                                <Link to="/login" className="text-[#D4AF37] hover:brightness-125 transition-all font-black uppercase tracking-widest text-[10px] ml-2">Sign In</Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </main>

            <style dangerouslySetInnerHTML={{ __html: `
                .font-serif { font-family: 'Cinzel', serif; }
            `}} />
        </div>
    );
};

export default Signup;
