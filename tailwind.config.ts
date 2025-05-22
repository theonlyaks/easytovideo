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
        primary: {
          DEFAULT: "#7C3AED", // Vibrant purple
          dark: "#5B21B6", // Darker purple
          light: "#A78BFA", // Lighter purple
        },
        secondary: {
          DEFAULT: "#111827", // Dark gray
          light: "#F9FAFB", 
        },
        background: {
          DEFAULT: "#FFFFFF",
          dark: "#111827",
        },
        "muted-text": "#6B7280", // Gray-500
        // Success, error, warning colors
        success: "#10b981",
        error: "#ef4444",
        warning: "#f59e0b",
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        'dm-sans': ['var(--font-dm-sans)'],
      },
      animation: {
        'gradient-slow': 'gradient 15s ease infinite',
        'float-slow': 'float 20s ease-in-out infinite',
        'float-medium': 'float 15s ease-in-out infinite',
        'float-fast': 'float 10s ease-in-out infinite',
        'float-slow-reverse': 'floatReverse 20s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(20px)' },
        },
      },
      backgroundSize: {
        'super': '400% 400%',
      },
      backdropBlur: {
        'md': '12px',
      },
    },
  },
  plugins: [],
} satisfies Config;
