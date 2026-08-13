import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#05070A",
        "canvas-secondary": "#090D12",
        surface: "#0D131A",
        ink: "#F4F7FA",
        muted: "#88929F",
        cyan: "#5CE1E6",
        violet: "#786CF6"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(92, 225, 230, 0.18), 0 24px 60px rgba(4, 10, 17, 0.5)"
      },
      backgroundImage: {
        "hero-grid": "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
} satisfies Config;
