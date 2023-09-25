/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    daisyui: {
        themes: [
            {
                dark: {
                    'primary': '#1DB954',
                    'secondary': '#BBCCDD',
                    'accent': '#7fd615',
                    'neutral': '#888888',
                    'base-100': '#000000',
                    'info': '#7bb4d5',
                    'success': '#25e48e',
                    'warning': '#f9d639',
                    'error': '#AA2200'
                }
            }
        ]
    },
    plugins: [require('daisyui')]
};
