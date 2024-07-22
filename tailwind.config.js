/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage:{
        "home": "url('/')",
        "homemd": "url('/assets/232.png')"
      }
    },
  },
  plugins: [],
}

