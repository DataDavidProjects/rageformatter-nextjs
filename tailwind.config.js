/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        toner: "#1C1F26",
        fax: "#E6E8EC",
        letterhead: "#FBFBFA",
        carbon: "#4A5160",
        redline: "#D9DCE2",
        ballpoint: {
          DEFAULT: "#A4262C",
          dark: "#821D22",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        sheet: "0 1px 0 rgba(28,31,38,.06), 0 12px 28px -12px rgba(28,31,38,.22)",
      },
    },
  },
  plugins: [],
};
