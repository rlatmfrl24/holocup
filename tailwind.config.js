/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#7aa6d3",
          200: "#669acc",
          300: "#548cc7",
          400: "#4080be",
          500: "#3873ab",
          600: "#336799",
          700: "#2d5986",
          800: "#264d74",
          900: "#1f405f",
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
