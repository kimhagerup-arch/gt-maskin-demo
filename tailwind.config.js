/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "rgb(var(--brand-primary) / <alpha-value>)",
          "primary-dark": "rgb(var(--brand-primary-dark) / <alpha-value>)",
          "primary-light": "rgb(var(--brand-primary-light) / <alpha-value>)",
          "primary-soft": "rgb(var(--brand-primary-soft) / <alpha-value>)",
          accent: "rgb(var(--brand-accent) / <alpha-value>)",
          "accent-light": "rgb(var(--brand-accent-light) / <alpha-value>)",
          "accent-deep": "rgb(var(--brand-accent-deep) / <alpha-value>)",
          "accent-hover": "rgb(var(--brand-accent-hover) / <alpha-value>)",
          bg: "rgb(var(--brand-bg) / <alpha-value>)",
          surface: "rgb(var(--brand-surface) / <alpha-value>)",
          card: "rgb(var(--brand-card) / <alpha-value>)",
          text: "rgb(var(--brand-text) / <alpha-value>)",
          "text-inverse": "rgb(var(--brand-text-inverse) / <alpha-value>)",
          muted: "rgb(var(--brand-muted) / <alpha-value>)",
          "muted-inverse": "rgb(var(--brand-muted-inverse) / <alpha-value>)",
          placeholder: "rgb(var(--brand-placeholder) / <alpha-value>)",
          border: "rgb(var(--brand-border) / <alpha-value>)",
          "border-strong": "rgb(var(--brand-border-strong) / <alpha-value>)",
          "border-dark": "rgb(var(--brand-border-dark) / <alpha-value>)",
          "border-dark-strong": "rgb(var(--brand-border-dark-strong) / <alpha-value>)",
          outline: "rgb(var(--brand-outline) / <alpha-value>)",
          footer: "rgb(var(--brand-footer) / <alpha-value>)",
        },
        kovision: {
          cyan: "#22d3c8",
          gold: "#d4a843",
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', "Impact", "sans-serif"],
        sans: ["Barlow", "system-ui", "sans-serif"],
        script: ["Yellowtail", "cursive"],
      },
      maxWidth: {
        container: "1200px",
      },
      backgroundImage: {
        "stripes-dark":
          "repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 18px)",
        "stripes-light":
          "repeating-linear-gradient(135deg, rgba(0,0,0,0.05) 0 2px, transparent 2px 18px)",
      },
      keyframes: {
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "slide-in-right": "slide-in-right 220ms ease-out",
        "fade-in": "fade-in 180ms ease-out",
      },
    },
  },
  plugins: [],
};
