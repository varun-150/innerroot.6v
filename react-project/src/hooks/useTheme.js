import { useState, useEffect } from 'react';

export const useTheme = () => {
    const [theme] = useState('dark');

    useEffect(() => {
        document.body.dataset.theme = 'dark';
    }, []);

    const toggleTheme = () => {
        // No-op to prevent errors if called
    };

    return { theme, toggleTheme };
};
