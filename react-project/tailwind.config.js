/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                heritage: {
                    green: '#1a4d3e',
                    greenLight: '#2d6a5a',
                    gold: '#c9a227',
                    goldLight: '#e8c547',
                    cream: '#faf6f0',
                    sand: '#f5ebe0',
                    teal: '#3d8b8b',
                    tealLight: '#5ba3a3',
                    brown: '#5c4033',
                    brownLight: '#8b6914'
                },
                accent: {
                    DEFAULT: 'var(--color-accent)',
                    hover: 'var(--color-accent-hover)',
                    soft: 'var(--color-accent-soft)',
                    glow: 'var(--color-accent-glow)',
                },
                primary: 'var(--color-bg)',
                secondary: 'var(--color-bg-subtle)',
                forest: {
                    DEFAULT: 'var(--color-forest)',
                    soft: 'var(--color-forest-soft)',
                },
                glass: 'var(--color-overlay)',
                'obsidian-pure': 'rgb(3 3 3 / <alpha-value>)',
                surface: 'rgb(10 10 10 / <alpha-value>)',
            },
            fontFamily: {
                display: ['Cormorant Garamond', 'serif'],
                heading: ['Poppins', 'sans-serif'],
                body: ['Poppins', 'sans-serif']
            }
        },
    },
    plugins: [],
}
