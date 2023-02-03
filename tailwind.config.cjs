/** @type {import('tailwindcss').Config} */

import tailwindElevation from "tailwindcss-elevation";

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
    tailwindElevation(["responsive"]),
    require("tailwindcss-no-scrollbar"),
  ],
};
