/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#f97316',
          hover:   '#ea580c',
          light:   '#fb923c',
        },
        navy: {
          950: '#060d1a',
          900: '#0a1428',
          800: '#0f1d3a',
          700: '#17284d',
          600: '#1e3460',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        brand: '0 4px 24px rgba(249,115,22,0.22)',
        'brand-lg': '0 8px 40px rgba(249,115,22,0.18)',
        card: '0 2px 16px rgba(0,0,0,0.4)',
        'card-lg': '0 8px 48px rgba(0,0,0,0.6)',
      },
      borderColor: {
        DEFAULT: '#1a2a45',
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
};
