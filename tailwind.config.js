/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bebas: "Bebas Neue', sans-serif",
        inter: "Inter', sans-serif",
      },
      backgroundColor: {
        primary: "#ac1a33",
      },
      textColor: {
        primary: "#ac1a33",
      },
    },
  },
  plugins: [require("daisyui")],
};
