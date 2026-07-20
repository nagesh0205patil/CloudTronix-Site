/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0057D9',
        secondary: '#00B4D8',
        accent: '#00C896',
        ink: '#111827',
        muted: '#64748B',
        surface: '#F8FAFC',
        night: '#0F172A',
      },
      fontFamily: {
        heading: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 60px rgba(15, 23, 42, 0.12)',
        lift: '0 16px 40px rgba(0, 87, 217, 0.18)',
      },
    },
  },
  plugins: [],
};
