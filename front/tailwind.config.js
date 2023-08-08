/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      height: {
        90: '90px',
        '90vh': '90vh',
        '45vh': '45vh',
        '40vh': '40vh',
        '35vh': '35vh',
      },
    },
  },
  plugins: [],
}
