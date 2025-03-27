/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        "din-a4": "210 / 297",
      },
      colors: {
        custom: {
          DEFAULT: "#f5f6f9",
          600: "#293F71",
          700: "#5497ff",
          800: "#1e2e4f",
          900: "#182341",
        },
      },
    },
  },
  plugins: [],
};
