/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        textColor: "#FED13D",
        secondary: "#262626",
        popup: "#202022",
      },
      blur: {
        mk: "5px",
        xs: "2px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        teko: ["Teko", "sans-serif"],
      },
    },
  },
  plugins: [],
}
