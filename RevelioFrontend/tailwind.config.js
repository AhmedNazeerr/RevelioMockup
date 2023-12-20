/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'main-color' : '#373A28',
        'high-light-color' : '#8FA32E'
      },
      colors: {
        'main-color' : '#373A28',
        'high-light-color' : '#8FA32E'
      },
    },
  },
  plugins: [],
}