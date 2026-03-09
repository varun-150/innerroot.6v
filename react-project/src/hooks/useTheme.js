import { useState, useEffect } from 'react';
import { THEME_STORAGE_KEY } from '../utils/constants';

export const useTheme = () => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'light';
        setTheme(savedTheme);
        document.body.dataset.theme = savedTheme;
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
        document.body.dataset.theme = newTheme;
    };

    return { theme, toggleTheme };
};
