import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        tetrisBlue: '#3B4B5B',
        tetrisAccent: '#BECDD5',
      },
    },
  },
  plugins: [],
}

export default config
