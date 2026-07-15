/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fhnec-red': '#DC143C',
        'fhnec-green': '#228B22',
        'fhnec-gold': '#DAA520',
      },
    },
  },
  plugins: [],
}
