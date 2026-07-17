/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A0A14',
        accent: '#7B61FF',
        background: '#F0EFF4',
        text: '#18181B',
        surface: '#0A0A14', 
        dark: '#18181B'
      },
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        dramatic: ['Instrument Serif', 'serif'],
        mono: ['Fira Code', 'monospace']
      }
    },
  },
  plugins: [],
}
