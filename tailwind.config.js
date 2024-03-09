/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // prettier-ignore
      colors: {
        "roulette-black": "#313135",
        "roulette-red": colors.red["600"],
        "roulette-green": colors.green["600"],
        "background": "#232326",
        "dark-background": "#1F1F22",
      },
    },
  },
  plugins: [],
};
