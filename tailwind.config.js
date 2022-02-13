module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        revealSidebar: "revealSidebar 0.5s ease-in-out forwards",
        hideSidebar: "hideSidebar 0.5s ease-in-out forwards",
      },
      keyframes: {
        revealSidebar: {
          "0%": {
            width: "0",
            opacity: "0",
          },
          "50%": {
            width: "270px",
          },
          "100%": {
            width: "260px",
          },
        },
        hideSidebar: {
          "0%": {
            width: "260px",
            opacity: "1",
          },
          "50%": {
            width: "270px",
            opacity: "1",
          },
          "100%": {
            width: "0",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};
