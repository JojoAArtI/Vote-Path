import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Dark surfaces
        void: {
          DEFAULT: "#0a0a0a",
          50:  "#1a1a1a",
          100: "#141414",
          200: "#111111",
          300: "#0e0e0e",
        },
        // Brand orange (from Nado)
        ember: {
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
          DEFAULT: "#f47f1f",
        },
        // Off-white text
        fog: {
          50:  "#faf9f7",
          100: "#f0ebe4",
          200: "#d8d2ca",
          300: "#b8b0a6",
          400: "#8f8880",
          500: "#6a6460",
        },
        // Dark card surfaces
        card: {
          DEFAULT: "#111111",
          hover: "#161616",
          border: "rgba(255,255,255,0.07)",
        }
      },
      fontFamily: {
        sans:  ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono:  ["var(--font-space-mono)", "monospace"],
      },
      boxShadow: {
        "orange-glow": "0 0 60px -10px rgba(244,127,31,0.35)",
        "card":        "0 1px 0 rgba(255,255,255,0.05) inset, 0 24px 60px -30px rgba(0,0,0,0.6)",
        "nav":         "0 1px 0 rgba(255,255,255,0.06) inset",
      },
      backgroundImage: {
        "radial-orange": "radial-gradient(circle at 70% 20%, rgba(244,127,31,0.30), transparent 40%)",
        "radial-ember":  "radial-gradient(circle at 20% 80%, rgba(244,127,31,0.12), transparent 35%)",
        "grid-dark":     "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
      },
    }
  },
  plugins: []
};

export default config;
