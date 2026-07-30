/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F6F3EA',
        ink: '#1E2321',
        muted: '#6B6558',
        line: '#D8D2C0',
        green: {
          DEFAULT: '#2F6E4E',
          dark: '#1F4D36',
          light: '#E4EEE7',
        },
        mustard: {
          DEFAULT: '#E8B33D',
          dark: '#C4922A',
        },
        sale: '#C4432E',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        tag: '0 2px 0 0 rgba(30,35,33,0.08)',
      },
    },
  },
  plugins: [],
}
