/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "var(--brand-primary)",
          "primary-dark": "var(--brand-primary-dark)",
          "primary-light": "var(--brand-primary-light)",
          "primary-soft": "var(--brand-primary-soft)",
          accent: "var(--brand-accent)",
          "accent-light": "var(--brand-accent-light)",
          "accent-deep": "var(--brand-accent-deep)",
          "accent-hover": "var(--brand-accent-hover)",
          bg: "var(--brand-bg)",
          surface: "var(--brand-surface)",
          card: "var(--brand-card)",
          text: "var(--brand-text)",
          "text-inverse": "var(--brand-text-inverse)",
          muted: "var(--brand-muted)",
          "muted-inverse": "var(--brand-muted-inverse)",
          placeholder: "var(--brand-placeholder)",
          border: "var(--brand-border)",
          "border-strong": "var(--brand-border-strong)",
          "border-dark": "var(--brand-border-dark)",
          "border-dark-strong": "var(--brand-border-dark-strong)",
          outline: "var(--brand-outline)",
          footer: "var(--brand-footer)",
        },
        kovision: {
          cyan: "#22d3c8",
          gold: "#d4a843",
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', "Impact", "sans-serif"],
        sans: ["Barlow", "system-ui", "sans-serif"],
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
