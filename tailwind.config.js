/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'amalanku-teal': '#0d9488',
        'amalanku-gold': '#b45309',
        'amalanku-purple': '#6D28D9', // Warna logo glassmorphism anda
        'amalanku-bg': '#f1f5f9',
      },
      boxShadow: {
        // Kesan Neumorphism (Timbul & Tenggelam)
        'neu-flat': '8px 8px 16px #d1d5db, -8px -8px 16px #ffffff',
        'neu-pressed': 'inset 6px 6px 12px #d1d5db, inset -6px -6px 12px #ffffff',
      },
      borderRadius: {
        'amalanku': '2.5rem',
      }
    },
  },
  plugins: [],
};
