import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Check, UserPlus, Loader2, ChevronRight, ChevronLeft } from 'lucide-react';

// ── MCQ Options Data ──────────────────────────────────────────────
const learningGoalsOptions = [
    { id: 'philosophy', label: 'Indian Philosophy', emoji: '🕉️' },
    { id: 'meditation', label: 'Meditation & Mindfulness', emoji: '🧘' },
    { id: 'cultural', label: 'Cultural Heritage', emoji: '🏛️' },
    { id: 'spiritual', label: 'Spiritual Growth', emoji: '✨' },
    { id: 'history', label: 'History & Traditions', emoji: '📜' },
    { id: 'wellness', label: 'Wellness & Ayurveda', emoji: '🌿' },
];

const usageIntentOptions = [
    { id: 'daily_practice', label: 'Daily Spiritual Practice', emoji: '🙏' },
    { id: 'research', label: 'Cultural Research', emoji: '🔍' },
    { id: 'personal_growth', label: 'Personal Growth', emoji: '🌱' },
    { id: 'community', label: 'Community & Discussions', emoji: '👥' },
    { id: 'education', label: 'Education & Learning', emoji: '📚' },
    { id: 'casual', label: 'Casual Exploration', emoji: '🗺️' },
];

const occupationOptions = [
    { id: 'student', label: 'Student', emoji: '🎓' },
    { id: 'teacher', label: 'Teacher / Professor', emoji: '👩‍🏫' },
    { id: 'professional', label: 'Working Professional', emoji: '💼' },
    { id: 'researcher', label: 'Researcher / Scholar', emoji: '🔬' },
    { id: 'artist', label: 'Artist / Creative', emoji: '🎨' },
    { id: 'retired', label: 'Retired', emoji: '🏡' },
    { id: 'homemaker', label: 'Homemaker', emoji: '🏠' },
    { id: 'other', label: 'Other', emoji: '🌟' },
];

const ageGroupOptions = [
    { id: '13-17', label: '13 – 17', emoji: '🧑' },
    { id: '18-24', label: '18 – 24', emoji: '🧑‍🎓' },
    { id: '25-34', label: '25 – 34', emoji: '👨‍💻' },
    { id: '35-44', label: '35 – 44', emoji: '👩‍💼' },
    { id: '45-59', label: '45 – 59', emoji: '🧑‍🏫' },
    { id: '60+', label: '60+', emoji: '🧓' },
];

const regionOptions = [
    { id: 'north_india', label: 'North India', emoji: '🏔️' },
    { id: 'south_india', label: 'South India', emoji: '🌴' },
    { id: 'east_india', label: 'East India', emoji: '🌾' },
    { id: 'west_india', label: 'West India', emoji: '🏖️' },
    { id: 'central_india', label: 'Central India', emoji: '🏛️' },
    { id: 'outside_india', label: 'Outside India', emoji: '🌏' },
];


// ── Reusable MCQ Component ───────────────────────────────────────
const MCQQuestion = ({ question, icon, options, selected, onSelect, multiSelect = false }) => {
    const handleSelect = (id) => {
        if (multiSelect) {
            const arr = selected ? selected.split(',').filter(Boolean) : [];
            if (arr.includes(id)) {
                onSelect(arr.filter(i => i !== id).join(','));
            } else {
                onSelect([...arr, id].join(','));
            }
        } else {
            onSelect(id === selected ? '' : id);
        }
    };

    const isSelected = (id) => {
        if (multiSelect) {
            return selected?.split(',').includes(id);
        }
        return selected === id;
    };

    return (
        <div className="mb-6">
            <label className="text-sm font-semibold text-[var(--fg)] mb-3 flex items-center gap-2">
                <span className="text-lg">{icon}</span>
                {question}
                {multiSelect && (
                    <span className="text-xs font-normal text-[var(--text-secondary)] ml-auto">Select multiple</span>
                )}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                {options.map((opt) => (
                    <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelect(opt.id)}
                        className={`relative flex flex-col items-center gap-1.5 py-4 px-3 rounded-xl border-2 text-sm font-medium
                                   transition-all duration-300 cursor-pointer group
                                   ${isSelected(opt.id)
                                ? 'border-heritage-gold bg-heritage-gold/10 text-[var(--fg)] shadow-lg shadow-heritage-gold/10 scale-[1.03]'
                                : 'border-white/10 bg-white/5 text-[var(--text-secondary)] hover:border-white/30 hover:bg-white/10 hover:scale-[1.02]'
                            }`}
                    >
                        {isSelected(opt.id) && (
                            <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-heritage-gold flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                            </div>
                        )}
                        <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{opt.emoji}</span>
                        <span className="text-center leading-tight">{opt.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};


// ── Main Signup Component ────────────────────────────────────────
const Signup = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        learningGoals: '',
        usageIntent: '',
        occupation: '',
        ageGroup: '',
        region: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    const { register, googleAuth } = useAuth();

    const totalSteps = 3;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMsg('');
    };

    const handleMCQChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        setErrorMsg('');
    };

    const handleNext = () => {
        if (currentStep === 1) {
            if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
                setErrorMsg('Please fill in all fields');
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                setErrorMsg('Passwords do not match');
                return;
            }
        }
        if (currentStep === 2) {
            if (!formData.learningGoals) {
                setErrorMsg('Please select at least one learning goal');
                return;
            }
            if (!formData.usageIntent) {
                setErrorMsg('Please select how you plan to use Inner Root');
                return;
            }
        }
        setErrorMsg('');
        setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    };

    const handleBack = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
        setErrorMsg('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentStep < totalSteps) {
            handleNext();
            return;
        }

        setIsLoading(true);
        setErrorMsg('');
        try {
            await register(
                formData.name,
                formData.email,
                formData.password,
                {
                    learningGoals: formData.learningGoals,
                    usageIntent: formData.usageIntent,
                    occupation: formData.occupation,
                    age: formData.ageGroup,
                    address: formData.region
                }
            );
            navigate('/');
        } catch (err) {
            setErrorMsg(err.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignup = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setIsLoading(true);
            setErrorMsg('');
            try {
                await googleAuth(tokenResponse.access_token);
                navigate('/');
            } catch (err) {
                setErrorMsg(err.message || 'Google sign-up failed');
            } finally {
                setIsLoading(false);
            }
        },
        onError: () => setErrorMsg('Google sign-up failed. Please try again.'),
    });

    return (
        <div className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[10%] left-[10%] w-72 h-72 bg-heritage-green/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-heritage-gold/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="max-w-2xl w-full glass-card p-8 rounded-2xl shadow-2xl relative z-10 border border-white/20 backdrop-blur-xl bg-white/10">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        {[1, 2, 3].map((step) => (
                            <div key={step} className="flex items-center flex-1">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${currentStep >= step
                                        ? 'bg-gradient-to-r from-heritage-green to-heritage-teal text-white shadow-lg'
                                        : 'bg-white/10 text-gray-400'
                                    }`}>
                                    {currentStep > step ? <Check className="w-5 h-5" /> : step}
                                </div>
                                {step < 3 && (
                                    <div className={`flex-1 h-1 mx-2 rounded transition-all duration-300 ${currentStep > step ? 'bg-heritage-green' : 'bg-white/10'
                                        }`}></div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-[var(--text-secondary)]">
                            Step {currentStep} of {totalSteps}
                        </p>
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h2 className="text-4xl font-display font-bold text-[var(--fg)] mb-2">
                        {currentStep === 1 && "Join Us"}
                        {currentStep === 2 && "Tell Us About Yourself"}
                        {currentStep === 3 && "Almost There!"}
                    </h2>
                    <p className="text-[var(--text-secondary)]">
                        {currentStep === 1 && "Create your Inner Root account"}
                        {currentStep === 2 && "Select all that apply to personalize your journey"}
                        {currentStep === 3 && "A few more details to complete your profile"}
                    </p>
                </div>

                {errorMsg && (
                    <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* ── Step 1: Basic Account Info ── */}
                    {currentStep === 1 && (
                        <div className="space-y-4 animate-fadeIn">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-heritage-gold transition-colors" />
                                </div>
                                <input type="text" name="name" required disabled={isLoading}
                                    className="w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-white/5
                                             text-[var(--fg)] placeholder-gray-400 focus:outline-none focus:ring-2
                                             focus:ring-heritage-gold/50 focus:border-transparent transition-all duration-300"
                                    placeholder="Full Name" value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-heritage-gold transition-colors" />
                                </div>
                                <input type="email" name="email" required disabled={isLoading}
                                    className="w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-white/5
                                             text-[var(--fg)] placeholder-gray-400 focus:outline-none focus:ring-2
                                             focus:ring-heritage-gold/50 focus:border-transparent transition-all duration-300"
                                    placeholder="Email address" value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-heritage-gold transition-colors" />
                                </div>
                                <input type="password" name="password" required disabled={isLoading}
                                    className="w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-white/5
                                             text-[var(--fg)] placeholder-gray-400 focus:outline-none focus:ring-2
                                             focus:ring-heritage-gold/50 focus:border-transparent transition-all duration-300"
                                    placeholder="Password" value={formData.password} onChange={handleChange} />
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Check className="h-5 w-5 text-gray-400 group-focus-within:text-heritage-gold transition-colors" />
                                </div>
                                <input type="password" name="confirmPassword" required disabled={isLoading}
                                    className="w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-white/5
                                             text-[var(--fg)] placeholder-gray-400 focus:outline-none focus:ring-2
                                             focus:ring-heritage-gold/50 focus:border-transparent transition-all duration-300"
                                    placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
                            </div>

                            <div className="flex items-center text-sm">
                                <label className="flex items-center text-[var(--text-secondary)] hover:text-[var(--fg)] cursor-pointer">
                                    <input type="checkbox" required className="mr-2 rounded border-gray-300 text-heritage-gold focus:ring-heritage-gold" />
                                    I accept the Terms and Conditions
                                </label>
                            </div>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/10"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-[var(--bg)] text-[var(--text-secondary)]">or continue with</span>
                                </div>
                            </div>

                            {/* Google Button */}
                            <button type="button" onClick={() => handleGoogleSignup()} disabled={isLoading}
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
                        </div>
                    )}

                    {/* ── Step 2: Learning Goals & Usage (MCQ) ── */}
                    {currentStep === 2 && (
                        <div className="animate-fadeIn">
                            <MCQQuestion
                                question="What are you hoping to learn?"
                                icon="🎯"
                                options={learningGoalsOptions}
                                selected={formData.learningGoals}
                                onSelect={(val) => handleMCQChange('learningGoals', val)}
                                multiSelect={true}
                            />
                            <MCQQuestion
                                question="How do you plan to use Inner Root?"
                                icon="💡"
                                options={usageIntentOptions}
                                selected={formData.usageIntent}
                                onSelect={(val) => handleMCQChange('usageIntent', val)}
                                multiSelect={false}
                            />
                        </div>
                    )}

                    {/* ── Step 3: Occupation, Age Group, Region (MCQ) ── */}
                    {currentStep === 3 && (
                        <div className="animate-fadeIn">
                            <MCQQuestion
                                question="What is your occupation?"
                                icon="💼"
                                options={occupationOptions}
                                selected={formData.occupation}
                                onSelect={(val) => handleMCQChange('occupation', val)}
                                multiSelect={false}
                            />
                            <MCQQuestion
                                question="What is your age group?"
                                icon="📅"
                                options={ageGroupOptions}
                                selected={formData.ageGroup}
                                onSelect={(val) => handleMCQChange('ageGroup', val)}
                                multiSelect={false}
                            />
                            <MCQQuestion
                                question="Where are you from?"
                                icon="📍"
                                options={regionOptions}
                                selected={formData.region}
                                onSelect={(val) => handleMCQChange('region', val)}
                                multiSelect={false}
                            />
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex gap-4 pt-4">
                        {currentStep > 1 && (
                            <button type="button" onClick={handleBack} disabled={isLoading}
                                className="flex-1 flex justify-center items-center py-3 px-4 border border-white/20 rounded-lg
                                         text-[var(--fg)] bg-white/5 hover:bg-white/10 font-medium text-sm
                                         transform hover:scale-[1.02] transition-all duration-300
                                         disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Back
                            </button>
                        )}
                        <button type="submit" disabled={isLoading}
                            className={`${currentStep === 1 ? 'w-full' : 'flex-1'} flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium
                                     text-white bg-gradient-to-r from-heritage-green to-heritage-teal hover:from-heritage-greenLight
                                     hover:to-heritage-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-heritage-green
                                     transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : currentStep === totalSteps ? (
                                <>Create Account <UserPlus className="ml-2 h-4 w-4" /></>
                            ) : (
                                <>Next <ChevronRight className="ml-2 h-4 w-4" /></>
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-[var(--text-secondary)]">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-heritage-green hover:text-heritage-greenLight transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
