import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0B0B",
        paper: "#FAF8F4",
        accent: "#E85D2C",
        rule: "#E5E1D8",
        muted: "#6B6660",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        ultra: "0.22em",
      },
      maxWidth: {
        "prose-tight": "60ch",
      },
    },
  },
  plugins: [],
};

export default config;
