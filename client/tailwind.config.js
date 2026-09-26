/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#15132C",
        "ink-soft": "#4A4768",
        paper: "#EFEAE0",
        "paper-dim": "#E3DDCE",
        gold: "#B8863B",
        violet: "#5B4FCF",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};