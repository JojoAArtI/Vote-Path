import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brutal: {
          blue: "#0000FF",
          black: "#000000",
          white: "#FFFFFF",
          gray: "#E5E5E5"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      boxShadow: {
        brutal: "4px 4px 0px 0px rgba(0,0,0,1)",
        "brutal-blue": "4px 4px 0px 0px rgba(0,0,255,1)",
      }
    }
  },
  plugins: []
};

export default config;
