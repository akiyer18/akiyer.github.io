/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: '#00FFAB',
        primary: {
          50: '#f0fdf4',
          500: '#00FFAB',
          900: '#0f172a',
        }
      }
    },
  },
  plugins: [],
} 