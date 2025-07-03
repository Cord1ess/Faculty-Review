/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'primary': {
                    start: '#FF6B00',
                    end: '#FF9800',
                    100: '#FFF1E6',
                    200: '#FFE4CC',
                    300: '#FFD4B3',
                    400: '#FFC299',
                    500: '#FF6B00',
                    600: '#E65D00',
                    700: '#CC5200',
                    800: '#B34700',
                    900: '#993D00'
                },
                'dark': {
                    100: '#1E1E1E',
                    200: '#2D2D2D',
                    300: '#3C3C3C',
                    400: '#4B4B4B',
                    500: '#5A5A5A'
                }
            },
            backgroundImage: {
                'orange-gradient': 'linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'fade-up': 'fadeUp 0.5s ease-out',
                'fade-down': 'fadeDown 0.5s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeDown: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            fontFamily: {
                'base': ['WF Visual Sans', 'Arial', 'sans-serif'],
                'sans': ['WF Visual Sans', 'Arial', 'sans-serif'],
            },
        },
    },
    plugins: [],
}; 