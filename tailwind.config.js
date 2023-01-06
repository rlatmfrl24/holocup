/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5edbed",
        secondary: "#26c5fd",
        third: {
          400: "#4f9eed",
          500: "#478ed5",
          600: "#3f7fbf",
          700: "#3872ab",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        noto_kr: ["Noto Sans KR", "sans-serif"],
      },
    },
  },
  plugins: [],
};
