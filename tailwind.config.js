/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: '#00f3ff',
          cyan: '#00ffff',
          purple: '#b026ff',
          pink: '#ff00ff',
        },
        space: {
          black: '#050505',
          dark: '#0a0a0a',
          gray: '#111111',
          silver: '#c0c0c0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 3s infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%': { boxShadow: '0 0 10px #00f3ff, 0 0 20px #00f3ff' },
          '100%': { boxShadow: '0 0 20px #b026ff, 0 0 40px #b026ff' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
