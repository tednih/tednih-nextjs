/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // lightMode
        primary: "#fffffe",
        headline: "#2b2c34",
        text: "#2b2c34",
        stroke: "#2b2c34",
        // darkMode
        darkprimary: "#242629",
        darkheadline: "#fffffe",
        darktext: "#94a1b2",
        darkstroke: "#010101",

        // Green
        button: "#006400",
      },
    },
    fontFamily: {
      spartan: ["League Spartan", "sans-serif"],
      righteous: ["Righteous", "cursive"],
    },
  },
  plugins: [],
};
