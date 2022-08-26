const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "Josefin": ["Josefin Sans", ...defaultTheme.fontFamily.sans],
        "Montserrat": ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}