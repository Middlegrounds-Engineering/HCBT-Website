/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        pulse: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 0.5 },
        },
      },
      transitionProperty: {
        'transform': 'transform',
      },
      scale: {
        '75': '0.75',
        '90': '0.90',
        '110': '1.10',
      },
    },
  },
  plugins: [],
};