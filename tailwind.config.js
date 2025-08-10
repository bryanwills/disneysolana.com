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
        'avenir-heavy': ['AvenirLTStd-Heavy', 'sans-serif'],
        'avenir-medium': ['AvenirLTStd-Medium', 'sans-serif'],
        'avenir-roman': ['AvenirLTStd-Roman', 'sans-serif'],
      },
      colors: {
        primary: '#00DCFF',
        'primary-dark': '#00B8D4',
        'bg-primary': '#151724',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
      },
    },
  },
  plugins: [],
}