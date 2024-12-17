/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ea40a4",
        business: "#3a82ee",
        personal: "#ea40a4",
        light: "#eee",
        grey: "#888",
        dark: "#313154",
        danger: "#ff5b57",
      },
      boxShadow: {
        custom: "0 1px 3px rgba(0, 0, 0, 0.1)",
        business: "0px 0px 4px rgba(58, 130, 238, 0.75)",
        personal: "0px 0px 4px rgba(234, 64, 164, 0.75)",
      },

      fontFamily: {
        Onest: ["Onest", "sans-serif"],
      },
    },
  },
  plugins: [],
};
