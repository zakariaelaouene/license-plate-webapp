/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    darkMode: "class",
    extend: {
      opacity: {
        '0': '0',
        '15': '0.15',
        '25': '0.25',
        '50': '0.5',
        '75': '0.75',
        '100': '1',
      },
      colors: {
        primary: "#F84018",
        secondary: "#aaaaaa",
        success: "#469F0A",
        warning: "#C38405",
        danger: "#E00909",
        alert: "#FEC107",
        dark: "#000000",
        light: "#FFFFFF",
      },
      fontSize: {
        "2xs": "0.625rem",
        "3xs": "0.5rem",
      },
      transitionDuration: "0.5s",
      screens: {
        "lg": "1024px",
        "2xl": "1424px",
        "3xl": "1920px",
        "tsm": "400px",
      },
    },
  },
  safelist: [
    "w-28 pointer-events-none",
    {
      pattern: /^.+-(primary|secondary|success|warning|danger|alert|dark|light)$/,
    },
    {
      pattern: /^w-\d+/,
    },
  ],
  plugins: [],
});
