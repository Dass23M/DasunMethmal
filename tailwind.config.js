/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['var(--font-raleway)', 'sans-serif'],
        arimo: ['var(--font-arimo)', 'sans-serif'],
      },
      colors: {
        accent: '#FF6B00',
        dark: '#191919',
        'card-dark': '#212121',
      },
      screens: {
        xs: '400px',
      },
    },
  },
  plugins: [],
};
