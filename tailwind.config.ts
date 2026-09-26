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
        teal: {
          50: "#eaf6f8",
          100: "#cfebf0",
          200: "#9fd7e1",
          300: "#6cc0d0",
          400: "#3aa9be",
          500: "#0097b2",
          600: "#027e96",
          700: "#08677b",
          800: "#0d5262",
          900: "#103f4c",
        },
        orange: {
          50: "#fff3ea",
          100: "#ffe2cc",
          200: "#ffc79c",
          300: "#ffab6e",
          400: "#ff9d5e",
          500: "#ff914d",
          600: "#f0762c",
          700: "#c75e1e",
          800: "#9c4a18",
          900: "#713414",
        },
        neutral: {
          50: "#f7f7f6",
          100: "#ededec",
          200: "#dcdcda",
          300: "#c2c2c0",
          400: "#a3a3a1",
          500: "#737373",
          600: "#5b5b5a",
          700: "#444443",
          800: "#2c2c2b",
          900: "#1a1a19",
          950: "#0e0e0d",
        },
      },
      fontFamily: {
        serif: ["Lora", "ui-serif", "Georgia", "serif"],
        sans: ["Figtree", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "24px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(26,26,25,.06)",
        md: "0 4px 12px rgba(26,26,25,.08), 0 1px 2px rgba(26,26,25,.05)",
        lg: "0 12px 32px rgba(26,26,25,.12), 0 2px 6px rgba(26,26,25,.06)",
        focus: "0 0 0 3px #cfebf0",
      },
      transitionDuration: {
        fast: "120ms",
        base: "200ms",
        slow: "320ms",
      },
    },
  },
  plugins: [],
};

export default config;
