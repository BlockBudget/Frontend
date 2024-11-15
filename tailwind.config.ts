import type { Config } from "tailwindcss";

export default {
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
        'custom-dark': '#0F1521',
         'dark-gray':'#191E24',
         'lavender-gray': '#8C89B4',
         'borderColor':'#344054',
         'gray-medium': '#9A9A9A',
      },
      
      fontFamily: {
        montserrat: ["Montserrat"],
      },
    },
  },
  plugins: [],
} satisfies Config;
