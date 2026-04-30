import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Dark surfaces — lifted from pure black to charcoal
        void: {
          DEFAULT: "#13161f",   // body bg — dark charcoal
          50:      "#1c2030",   // card surfaces — visible depth
          100:     "#181b26",   // slightly lighter inset
          200:     "#151821",   // between body and card
        },
        // Text — brighter off-white scale
        fog: {
          50:  "#f5f1eb",       // headings — warm bright white
          100: "#e8e3dc",       // body text
          200: "#ccc6bc",       // secondary text
          300: "#a8a29a",       // muted text
          400: "#837d76",       // placeholder / helper
          500: "#5e5a55",       // very muted
          600: "#3d3a36",       // dividers
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
        // Legacy aliases — kept for any unconverted inner component
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
        "orange-glow": "0 0 80px -10px rgba(244,127,31,0.35)",
        "card":        "0 1px 0 rgba(255,255,255,0.07) inset, 0 20px 50px -20px rgba(0,0,0,0.5)",
        soft:          "0 24px 60px -34px rgba(10,10,15,0.4)",
        panel:         "0 28px 80px -38px rgba(10,10,15,0.55)",
        glow:          "0 24px 60px -28px rgba(244,127,31,0.28)",
      },
      backgroundImage: {
        "grid-dark": "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
    }
  },
  plugins: []
};

export default config;
