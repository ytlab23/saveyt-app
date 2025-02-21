import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        gradient: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(1%, 1%) scale(1.02)" },
        },
      },
      animation: {
        gradient: "gradient 10s ease infinite",
        "gradient-slow": "gradient 15s ease-in-out infinite",
      },
    },
  },
  plugins: [forms],
};
