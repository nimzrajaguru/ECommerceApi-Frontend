/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif']
      },
      colors: {
        ink: {
          50: '#f7f7f8',
          100: '#eeeef0',
          200: '#d9d9de',
          300: '#b6b6bf',
          400: '#8c8c99',
          500: '#6b6b78',
          600: '#54545f',
          700: '#43434c',
          800: '#28282e',
          900: '#18181b',
          950: '#0a0a0c'
        },
        brand: {
          50: '#eef1ff',
          100: '#e0e4ff',
          200: '#c6cbff',
          300: '#a3a6ff',
          400: '#8480fb',
          500: '#6a5cf5',
          600: '#5a3fe8',
          700: '#4c30cc',
          800: '#3f29a5',
          900: '#362783',
          950: '#211653'
        }
      },
      boxShadow: {
        card: '0 1px 2px rgba(10, 10, 12, 0.04), 0 8px 24px -12px rgba(10, 10, 12, 0.15)',
        'card-hover': '0 4px 8px rgba(10, 10, 12, 0.06), 0 16px 32px -12px rgba(10, 10, 12, 0.22)'
      },
      backgroundImage: {
        'hero-grid': 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)'
      }
    }
  },
  plugins: []
};
