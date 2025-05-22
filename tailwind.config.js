/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#27c6a9",
        bgPrimary: "#0c0a09",
        bgSecondary: "#1C1917",
      },
      backgroundImage: {
        bg: "url('../public/bg.jpg')",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
