/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // prettier-ignore
      colors: {
        "roulette-black": colors.neutral["600"],
        "roulette-red": colors.red["600"],
        "roulette-green": colors.green["600"],
        "background": colors.neutral["900"],
        "dark-background": colors.neutral["950"],
      },
    },
  },
  plugins: [],
};
