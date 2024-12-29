import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/constants/**/*.{js,ts}"
  ],
  theme: {
    extend: {
      colors: {
        // Background colors
        background: "#f6f4f1",
        "background-text": "#2a2522",
        
        // Primary colors
        primary: "#e07a5f",
        "primary-text": "#fffff",
        
        // Secondary colors
        secondary: "#3d405b",
        "secondary-text": "#ffffff",
        
        // Accent colors
        accent: "#81b29a",
        "accent-text": "#ffffff",
        
        // Neutral colors
        neutral: "#9ca3af",
        "neutral-text": "#2a2522",
        
        // Muted colors
        muted: "#d7cec7",
        "muted-text": "#4a4541",
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        'dm-sans': ['var(--font-dm-sans)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
