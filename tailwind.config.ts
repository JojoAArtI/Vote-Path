import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        civic: {
          50: "#eff8ff",
          100: "#dbeeff",
          200: "#b9ddff",
          300: "#86c6ff",
          400: "#4da8ff",
          500: "#1e88ff",
          600: "#156fe0",
          700: "#1559b5",
          800: "#164a90",
          900: "#123e75"
        },
        civicGreen: {
          50: "#eefbf6",
          100: "#d5f6e7",
          200: "#aaecd1",
          300: "#6ddbb4",
          400: "#34c793",
          500: "#16a874",
          600: "#10855e",
          700: "#11684c",
          800: "#13513d",
          900: "#114236"
        }
      },
      boxShadow: {
        soft: "0 18px 40px -24px rgba(15, 23, 42, 0.3)",
        glow: "0 24px 60px -28px rgba(30, 136, 255, 0.35)"
      },
      backgroundImage: {
        "civic-grid":
          "linear-gradient(rgba(148, 163, 184, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.12) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;

