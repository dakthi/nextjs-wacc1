import type { Config } from "tailwindcss";

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const config: Config = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        trueGray: colors.neutral,
        primary: {
          50: '#f0f9f3',
          100: '#dcf2e1',
          200: '#bce5c8',
          300: '#8cd2a4',
          400: '#5bb679',
          500: '#3a9d56', // Main forest green
          600: '#2d7e44',
          700: '#256437',
          800: '#20502e',
          900: '#1c4127',
          950: '#0f2818', // Deeper green for buttons
        },
        accent: {
          50: '#f7fdf8',
          100: '#ecfaef',
          200: '#d1f2d8',
          300: '#a6e6b8',
          400: '#74d390', // Light sage
          500: '#4aba6a',
          600: '#369d54',
          700: '#2e7e45',
          800: '#28653a',
          900: '#235430',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontWeight: "700",
              fontSize: "2.5rem",
              letterSpacing: "-0.02em",
            },
            p: {
              color: "#444",
              fontSize: "1.1rem",
              lineHeight: "1.75",
            },
            ul: {
              color: "#444",
              fontSize: "1.1rem",
              lineHeight: "1.60",
              textAlign: "left",
            },
            a: {
              color: "#3b82f6",
              "&:hover": {
                textDecoration: "underline",
              },
            },
            code: {
              backgroundColor: "#f3f4f6",
              padding: "0.2rem 0.4rem",
              borderRadius: "0.25rem",
              textAlign: "left",
            },
          },
        },
      },
    },
    fontFamily: {
      sans: ["Inter", "system-ui", ...defaultTheme.fontFamily.sans],
      heading: ["Inter", "system-ui", ...defaultTheme.fontFamily.sans],
      stock: [defaultTheme.fontFamily.sans],
    },
    letterSpacing: {
      tighter: '-0.02em',
      tight: '-0.01em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
    lineHeight: {
      tight: '1.1',
      snug: '1.2',
      normal: '1.5',
      relaxed: '1.6',
      loose: '1.8',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
