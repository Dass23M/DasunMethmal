/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        accent: {
          DEFAULT: '#FF8A00',
          hover: '#FFA029',
          glow: 'rgba(255, 138, 0, 0.4)',
          deep: '#FF5500',
          amber: '#FFAA00',
        },
        obsidian: {
          DEFAULT: '#07080B',
          deep: '#040507',
          surface: '#0D0E15',
          card: '#12141F',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        dark: '#08080A',
        'card-dark': '#101118',
        cyan: {
          accent: '#38BDF8',
        },
        emerald: {
          pulse: '#10B981',
        },
      },
      boxShadow: {
        'glow-accent': '0 0 30px rgba(255, 138, 0, 0.25)',
        'glow-accent-lg': '0 0 50px rgba(255, 138, 0, 0.4)',
        'glass-card': '0 10px 30px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
      },
      screens: {
        xs: '400px',
      },
    },
  },
  plugins: [],
};
