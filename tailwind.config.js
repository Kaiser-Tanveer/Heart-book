/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#008a00",
        "secondary": "#ffffff"
      }
    },
  },
  plugins: [
    require('daisyui')
  ],
}