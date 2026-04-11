/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        barrio: {
          light: "#d8f5d1",
          mint: "#a7e6a1",
          green: "#2f7d32",
          deep: "#174a22",
          ink: "#111111",
          orange: "#f28c28",
          yellow: "#f3c623",
          brown: "#7a5a34"
        }
      },
      boxShadow: {
        soft: "0 16px 45px rgba(17, 17, 17, 0.10)"
      }
    }
  },
  plugins: []
};
