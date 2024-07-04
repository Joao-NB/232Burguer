/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage:{
        "home": "url('/assets/pitombeira-dark.png')",
        "homemd": "url('/assets/pitombeira-dark-md.png')"
      }
    },
  },
  plugins: [],
}

