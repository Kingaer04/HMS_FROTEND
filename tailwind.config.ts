import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        mono: ["DM Mono", "monospace"],
      },
      animation: {
        "fade-up":     "fadeUp 0.4s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in":     "fadeIn 0.3s ease both",
        "slide-right": "slideRight 0.35s cubic-bezier(0.22,1,0.36,1) both",
        "pop":         "scalePop 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
        "float":       "floatUp 4s ease-in-out infinite",
        "pulse-soft":  "pulse-soft 2s ease-in-out infinite",
        "spin":        "spin 1s linear infinite",
      },
      keyframes: {
        fadeUp:    { from: { opacity: "0", transform: "translateY(10px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        fadeIn:    { from: { opacity: "0" }, to: { opacity: "1" } },
        slideRight:{ from: { opacity: "0", transform: "translateX(-12px)" }, to: { opacity: "1", transform: "translateX(0)" } },
        scalePop:  { "0%": { transform: "scale(0.92)", opacity: "0" }, "60%": { transform: "scale(1.02)" }, "100%": { transform: "scale(1)", opacity: "1" } },
        floatUp:   { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-6px)" } },
        "pulse-soft": { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0.5" } },
        spin:      { to: { transform: "rotate(360deg)" } },
      },
    },
  },
  plugins: [],
};
export default config;
