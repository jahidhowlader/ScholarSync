/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'primary-color': '#5D01EE',
      'secondary-color': '#00FF0E',
      'black': '#010717',
      'white': '#fff',
      'error': '#F23030'
    }
  },
  plugins: [],
}