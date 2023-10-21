/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}", // Include all files in the app directory
    "./components/**/*.{js,jsx,ts,tsx}", // Include all files in the components directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
