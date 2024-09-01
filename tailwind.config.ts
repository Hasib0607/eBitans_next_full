import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        Rampart: ["Raleway", "cursive"],
      },
      height: {
        "128": "35rem",
        "132": "43rem",
      },
      width: {
        "128": "35rem",
        "132": "43rem",
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        marquee2: "marquee2 25s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      lg2: "1024px",
      xl2: "1280px",
      xl: "1440px",
      xl3: "1800px",
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
export default config;
