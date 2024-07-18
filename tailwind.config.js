/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        bg: "url('../public/bg.jpg')",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'), 
  ],
};
