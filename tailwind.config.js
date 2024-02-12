const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: "hsl(75, 94%, 57%)",
        white: "hsl(0, 0%, 100%)",
        grey: "hsl(0, 0%, 20%)",
        dark_grey: "hsl(0, 0%, 12%)",
        off_black: "hsl(0, 0%, 8%)",
        red: "hsl(358, 100%, 72%)"
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [],
})

