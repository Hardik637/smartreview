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
        background: "var(--background)",
        foreground: "var(--foreground)",
        // SmartReview Academic Design Palette
        navy: {
          50: "#F0F4F9",
          100: "#E1E9F3",
          200: "#C3D3E7",
          300: "#94B4D5",
          400: "#5D8EC0",
          500: "#3478C8",
          600: "#245EA6",
          700: "#1C4982",
          800: "#173B67", // Primary Navy
          900: "#0F2847",
          950: "#0A1B30",
        },
        accent: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3478C8", // Accent Blue
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        primary: {
          50: "#F0F4F9",
          100: "#E1E9F3",
          200: "#C3D3E7",
          300: "#94B4D5",
          400: "#3478C8",
          500: "#245EA6",
          600: "#1C4982",
          700: "#173B67",
          800: "#0F2847",
          900: "#0A1B30",
        },
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(23, 59, 103, 0.06), 0 1px 2px -1px rgba(23, 59, 103, 0.04)",
        card: "0 4px 6px -1px rgba(23, 59, 103, 0.06), 0 2px 4px -2px rgba(23, 59, 103, 0.04)",
        "card-hover": "0 10px 15px -3px rgba(23, 59, 103, 0.08), 0 4px 6px -4px rgba(23, 59, 103, 0.04)",
        elevated: "0 20px 25px -5px rgba(23, 59, 103, 0.1), 0 8px 10px -6px rgba(23, 59, 103, 0.04)",
        neo: "0 2px 4px rgba(23, 59, 103, 0.08)",
        "neo-md": "0 4px 8px rgba(23, 59, 103, 0.1)",
        "neo-lg": "0 8px 16px rgba(23, 59, 103, 0.12)",
        "neo-xl": "0 12px 24px rgba(23, 59, 103, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
