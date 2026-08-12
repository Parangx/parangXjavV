/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0a0a0f',
        card: '#16213e',
        accent: '#e94560',
        accent2: '#4fc3f7',
      }
    },
  },
  plugins: [],
}
