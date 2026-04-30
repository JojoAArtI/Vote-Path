import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Base dark backgrounds
        void: {
          DEFAULT: "#0a0a0a",
          50:      "#141414",
          100:     "#111111",
          200:     "#0e0e0e",
        },
        // Text — off-white scale
        fog: {
          50:  "#fafaf9",
          100: "#f0ebe4",
          200: "#d8d2ca",
          300: "#b8b0a6",
          400: "#8f8880",
          500: "#6a6460",
          600: "#4a4440",
        },
        // Brand orange
        ember: {
          DEFAULT: "#f47f1f",
          50:  "#fff4ea",
          100: "#ffe5cb",
          200: "#ffcca0",
          300: "#ffad69",
          400: "#ff9337",
          500: "#f47f1f",
          600: "#d56613",
          700: "#ac4d10",
          800: "#873d12",
          900: "#6b3110",
        },
        // Legacy aliases used in non-redesigned pages
        paper: {
          50:  "#fcf9f4",
          100: "#f7f0e7",
          200: "#ece0d0",
          300: "#deccb5",
          400: "#c8b08f",
          500: "#ad8f68",
          600: "#8d6e49",
          700: "#715736",
          800: "#594428",
          900: "#433219",
        },
        ink: {
          50:  "#f6f3ee",
          100: "#ece4da",
          200: "#d9c8b4",
          300: "#bea584",
          400: "#a07f5c",
          500: "#806342",
          600: "#644b31",
          700: "#4e3926",
          800: "#362618",
          900: "#1b120c",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        "orange-glow": "0 0 80px -10px rgba(244,127,31,0.40)",
        "card":        "0 1px 0 rgba(255,255,255,0.05) inset, 0 24px 60px -30px rgba(0,0,0,0.7)",
        soft:          "0 24px 60px -34px rgba(20,14,10,0.35)",
        panel:         "0 28px 80px -38px rgba(20,14,10,0.48)",
        glow:          "0 24px 60px -28px rgba(244,127,31,0.28)",
      },
      backgroundImage: {
        "grid-dark": "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
      },
    }
  },
  plugins: []
};

export default config;
