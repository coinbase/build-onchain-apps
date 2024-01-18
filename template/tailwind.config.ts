import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './onchainKit/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      gridTemplateColumns: {
        // Coffee column grid
        '2CoffeeLg': '1fr 380px',
        '2CoffeeMd': '1fr 330px',

        // Mint colum grid
        '2mint': '420px 1fr',
      },
      colors: {
        'boat-footer-dark-gray': '#141519',
        'boat-footer-light-gray': '#8a919e',
        "boat-color-blue-40": "var(--boat-color-blue-40)",
        "boat-color-green-40": "var(--boat-color-green-40)",
        "boat-color-palette-backgroundalternate": "var(--boat-color-palette-backgroundalternate)",
        "boat-color-palette-foreground": "var(--boat-color-palette-foreground)",
        "boat-color-palette-foregroundmuted": "var(--boat-color-palette-foregroundmuted)",
        "boat-color-palette-line": "var(--boat-color-palette-line)",
        "boat-color-pink-50": "var(--boat-color-pink-50)",
        "boat-color-purple-60": "var(--boat-color-purple-60)",
        "boat-color-yellow-60": "var(--boat-color-yellow-60)",
      },
    },
  },
  plugins: [],
};

export default config;
