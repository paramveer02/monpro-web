import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Obsidian theme from branding.json
        background: "#010409",
        glass: "rgba(13, 17, 23, 0.7)",
        primary: "#00f2ff",
        secondary: "#00ff88",
        accent: "#ff3e3e",
        border: "rgba(48, 54, 61, 0.8)",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
        glitch: ["var(--font-orbitron)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "cyber-grid":
          "linear-gradient(rgba(0, 242, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 255, 0.03) 1px, transparent 1px)",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      backgroundSize: {
        grid: "50px 50px",
      },
      animation: {
        "pulse-cyan": "pulse-cyan 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-up": "slide-up 0.5s ease-out",
        glow: "glow 2s ease-in-out infinite",
        "glitch": "glitch 0.3s ease-in-out infinite alternate",
        "glitch-intense": "glitch-intense 0.2s ease-in-out infinite alternate",
      },
      keyframes: {
        "pulse-cyan": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 242, 255, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(0, 242, 255, 0.6)" },
        },
        glitch: {
          "0%": { textShadow: "-2px 0 #00f2ff, 2px 0 #00f2ff" },
          "25%": { textShadow: "2px 0 #00f2ff, -2px 0 #00f2ff" },
          "50%": { textShadow: "-1px 0 #00f2ff, 1px 0 #00f2ff" },
          "75%": { textShadow: "1px 0 #00f2ff, -1px 0 #00f2ff" },
          "100%": { textShadow: "-2px 0 #00f2ff, 2px 0 #00f2ff" },
        },
        "glitch-intense": {
          "0%": { textShadow: "-3px 0 #00f2ff, 3px 0 #00f2ff" },
          "25%": { textShadow: "3px 0 #00f2ff, -3px 0 #00f2ff" },
          "50%": { textShadow: "-2px 0 #00f2ff, 2px 0 #00f2ff" },
          "75%": { textShadow: "2px 0 #00f2ff, -2px 0 #00f2ff" },
          "100%": { textShadow: "-3px 0 #00f2ff, 3px 0 #00f2ff" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
