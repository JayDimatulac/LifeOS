/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#080C15',
          900: '#0B1220',
          800: '#121A2C',
          700: '#1B2540',
          600: '#28355A',
        },
        cream: {
          50: '#F7F2E7',
          100: '#EFE7D4',
        },
        gold: {
          DEFAULT: '#CBA057',
          soft: '#E4C888',
        },
        silver: '#8D96A8',
        burgundy: '#8C3B45',
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      borderRadius: {
        xl2: '20px',
        xl3: '26px',
      },
      boxShadow: {
        card: '0 20px 60px -20px rgba(0,0,0,0.6)',
        'card-light': '0 20px 50px -24px rgba(27,37,64,0.25)',
      },
    },
  },
  plugins: [],
};
