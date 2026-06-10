import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#080808",
        "bg-secondary": "#1A1A1A",
        primary: "#E8E8E0",
        accent: "#C8FF00",
        "accent-light": "#D4FF33",
        "accent-dark": "#A8D900",
        muted: "#555550",
      },
      fontFamily: {
        display: ["Clash Display", "sans-serif"],
        body: ["Cabinet Grotesk", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
