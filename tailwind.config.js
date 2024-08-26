/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Use 'class' for dark mode
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkbg: "#1E293B",
      },
      screens: {
        other: { min: "340px", max: "1200px" },
      },
    },
  },
};
