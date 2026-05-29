import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "media",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        mono: ["DM Mono", "Fira Code", "monospace"],
      },
      colors: {
        // Map CSS vars → Tailwind classes
        primary: {
          DEFAULT: "var(--color-primary)",
          hover:   "var(--color-primary-hover)",
          light:   "var(--color-primary-light)",
          50:  "var(--hms-navy-50)",
          100: "var(--hms-navy-100)",
          200: "var(--hms-navy-200)",
          300: "var(--hms-navy-300)",
          400: "var(--hms-navy-400)",
          500: "var(--hms-navy-500)",
          600: "var(--hms-navy-600)",
          700: "var(--hms-navy-700)",
          800: "var(--hms-navy-800)",
          900: "var(--hms-navy-900)",
          950: "var(--hms-navy-950)",
        },
        teal: {
          DEFAULT: "var(--hms-teal-500)",
          50:  "var(--hms-teal-50)",
          100: "var(--hms-teal-100)",
          200: "var(--hms-teal-200)",
          300: "var(--hms-teal-300)",
          400: "var(--hms-teal-400)",
          500: "var(--hms-teal-500)",
          600: "var(--hms-teal-600)",
          700: "var(--hms-teal-700)",
          800: "var(--hms-teal-800)",
          900: "var(--hms-teal-900)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          hover:   "var(--color-accent-hover)",
          light:   "var(--color-accent-light)",
          50:  "var(--hms-amber-50)",
          100: "var(--hms-amber-100)",
          200: "var(--hms-amber-200)",
          300: "var(--hms-amber-300)",
          400: "var(--hms-amber-400)",
          500: "var(--hms-amber-500)",
          600: "var(--hms-amber-600)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          raised:  "var(--color-surface-raised)",
          bg:      "var(--color-bg)",
        },
        border: {
          DEFAULT: "var(--color-border)",
          strong:  "var(--color-border-strong)",
        },
        text: {
          primary:   "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted:     "var(--color-text-muted)",
          disabled:  "var(--color-text-disabled)",
        },
      },
      borderRadius: {
        sm:   "var(--radius-sm)",
        md:   "var(--radius-md)",
        lg:   "var(--radius-lg)",
        xl:   "var(--radius-xl)",
        "2xl":"20px",
        "3xl":"28px",
        full: "9999px",
      },
      boxShadow: {
        sm:  "var(--shadow-sm)",
        md:  "var(--shadow-md)",
        lg:  "var(--shadow-lg)",
        xl:  "var(--shadow-xl)",
        "glow-primary": "var(--shadow-glow-primary)",
        "glow-teal":    "var(--shadow-glow-teal)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(6px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          from: { backgroundPosition: "-200% 0" },
          to:   { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease both",
        shimmer:   "shimmer 1.5s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
