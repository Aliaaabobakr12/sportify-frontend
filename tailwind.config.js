/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#27c6a9",
        secondary: "#171717",
      },
      backgroundImage: {
        bg: "url('../public/bg.jpg')",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
