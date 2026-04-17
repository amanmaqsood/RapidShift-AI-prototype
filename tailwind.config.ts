import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#47664a",
        "primary-dim": "#3b5a3f",
        "primary-container": "#c8ecc8",
        "primary-fixed": "#c8ecc8",
        "primary-fixed-dim": "#badeba",
        "on-primary": "#e9ffe6",
        "on-primary-container": "#3a593d",
        "on-primary-fixed": "#27462c",
        "on-primary-fixed-variant": "#436347",

        secondary: "#53644d",
        "secondary-dim": "#475841",
        "secondary-container": "#e3f7d9",
        "secondary-fixed": "#e3f7d9",
        "secondary-fixed-dim": "#d5e8cb",
        "on-secondary": "#ebffe1",
        "on-secondary-container": "#4e5f48",
        "on-secondary-fixed": "#3c4c37",
        "on-secondary-fixed-variant": "#586952",

        tertiary: "#4a50c8",
        "tertiary-dim": "#3d43bc",
        "tertiary-container": "#afb2ff",
        "tertiary-fixed": "#afb2ff",
        "tertiary-fixed-dim": "#9ea3ff",
        "on-tertiary": "#fbf7ff",
        "on-tertiary-container": "#1c209f",
        "on-tertiary-fixed": "#03007c",
        "on-tertiary-fixed-variant": "#272ca7",

        error: "#ac3434",
        "error-dim": "#70030f",
        "error-container": "#f56965",
        "on-error": "#fff7f6",
        "on-error-container": "#65000b",

        background: "#fafaf5",
        surface: "#fafaf5",
        "surface-bright": "#fafaf5",
        "surface-dim": "#d7dbd3",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f3f4ee",
        "surface-container": "#edeee8",
        "surface-container-high": "#e7e9e2",
        "surface-container-highest": "#e0e4dc",
        "surface-variant": "#e0e4dc",
        "surface-tint": "#47664a",

        "on-background": "#30332e",
        "on-surface": "#30332e",
        "on-surface-variant": "#5c605a",
        "inverse-surface": "#0d0f0c",
        "inverse-on-surface": "#9c9d99",
        "inverse-primary": "#cdf2cd",

        outline: "#787c75",
        "outline-variant": "#b0b3ac",
      },
      fontFamily: {
        headline: ["var(--font-manrope)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        label: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        xxl: "1.5rem",
        full: "9999px",
      },
      boxShadow: {
        ambient: "0 12px 40px rgba(48, 51, 46, 0.06)",
        lift: "0 4px 20px rgba(48, 51, 46, 0.08)",
      },
      keyframes: {
        "ai-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
      },
      animation: {
        "ai-pulse": "ai-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
