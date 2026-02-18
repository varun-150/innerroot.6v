import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check for existing token on mount
    useEffect(() => {
        const token = localStorage.getItem('innerRootToken');
        if (token) {
            fetchCurrentUser();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchCurrentUser = async () => {
        try {
            const userData = await authAPI.getMe();
            setUser(userData);
        } catch (err) {
            console.error('Failed to fetch user:', err);
            localStorage.removeItem('innerRootToken');
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        setError(null);
        try {
            const response = await authAPI.login(email, password);
            localStorage.setItem('innerRootToken', response.token);
            setUser({
                id: response.id,
                name: response.name,
                email: response.email,
                profilePicture: response.profilePicture,
                role: response.role,
            });
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const register = async (name, email, password, onboardingData = {}) => {
        setError(null);
        try {
            const response = await authAPI.register(name, email, password, onboardingData);
            localStorage.setItem('innerRootToken', response.token);
            setUser({
                id: response.id,
                name: response.name,
                email: response.email,
                profilePicture: response.profilePicture,
                role: response.role,
            });
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const googleAuth = async (accessToken) => {
        setError(null);
        try {
            const response = await authAPI.googleAuth(accessToken);
            localStorage.setItem('innerRootToken', response.token);
            setUser({
                id: response.id,
                name: response.name,
                email: response.email,
                profilePicture: response.profilePicture,
                role: response.role,
            });
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const logout = () => {
        localStorage.removeItem('innerRootToken');
        setUser(null);
    };

    const value = {
        user,
        loading,
        error,
        login,
        register,
        googleAuth,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
