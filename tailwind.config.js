// tailwind.config.js
module.exports = {
  darkMode: "class", // Dark mode 
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#1e3a8a", // Indigo 900
          secondary: "#d4af37", // Gold-like
          light: "#f5f5f4", // Warm gray
          dark: "#0f172a", // Slate 900
        },
      },
      fontFamily: {
        serif: ["Merriweather", "serif"], // Titles
        sans: ["Inter", "sans-serif"], // texts
      },
    },
  },
  plugins: [],
};
