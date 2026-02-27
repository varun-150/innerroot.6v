import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    const { login, googleAuth } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMsg('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg('');
        try {
            await login(formData.email, formData.password);
            navigate('/');
        } catch (err) {
            setErrorMsg(err.message || 'Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setIsLoading(true);
            setErrorMsg('');
            try {
                await googleAuth(tokenResponse.access_token);
                navigate('/');
            } catch (err) {
                setErrorMsg(err.message || 'Google sign-in failed');
            } finally {
                setIsLoading(false);
            }
        },
        onError: () => setErrorMsg('Google sign-in failed. Please try again.'),
    });

    return (
        <div className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[10%] left-[10%] w-72 h-72 bg-heritage-gold/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-heritage-green/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="max-w-md w-full glass-card p-8 rounded-2xl shadow-2xl relative z-10 border border-white/20 backdrop-blur-xl bg-white/10">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-display font-bold text-[var(--fg)] mb-2">Welcome Back</h2>
                    <p className="text-[var(--text-secondary)]">Sign in to continue your journey</p>
                </div>

                {errorMsg && (
                    <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-heritage-gold transition-colors" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-white/5 
                                         text-[var(--fg)] placeholder-gray-400 focus:outline-none focus:ring-2 
                                         focus:ring-heritage-gold/50 focus:border-transparent transition-all duration-300"
                                placeholder="e.g. name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-heritage-gold transition-colors" />
                            </div>
                            <input
                                type="password"
                                name="password"
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-white/5 
                                         text-[var(--fg)] placeholder-gray-400 focus:outline-none focus:ring-2 
                                         focus:ring-heritage-gold/50 focus:border-transparent transition-all duration-300"
                                placeholder="Min. 8 characters"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center text-[var(--text-secondary)] hover:text-[var(--fg)] cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 mr-2 rounded border-white/20 bg-white/5 text-heritage-gold focus:ring-heritage-gold transition-all" />
                            <span className="group-hover:text-heritage-gold transition-colors">Remember me</span>
                        </label>
                        <button
                            type="button"
                            onClick={() => alert('Password reset functionality is coming soon. Please contact support@innerroot.in if you need immediate assistance.')}
                            className="font-medium text-heritage-gold hover:text-heritage-goldLight transition-colors"
                        >
                            Forgot password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium 
                                 text-white bg-gradient-to-r from-heritage-gold to-heritage-orange hover:from-heritage-goldLight 
                                 hover:to-heritage-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-heritage-gold 
                                 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Sign In <ArrowRight className="ml-2 h-4 w-4" /></>}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-[var(--bg)] text-[var(--text-secondary)]">or continue with</span>
                    </div>
                </div>

                {/* Google Button */}
                <button
                    type="button"
                    onClick={() => handleGoogleLogin()}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-white/10 rounded-lg 
                             bg-white/5 hover:bg-white/10 text-[var(--fg)] font-medium text-sm 
                             transform hover:scale-[1.02] transition-all duration-300 hover:border-white/30
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                </button>

                <div className="mt-8 text-center">
                    <p className="text-sm text-[var(--text-secondary)]">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-medium text-heritage-gold hover:text-heritage-goldLight transition-colors">
                            Create account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;