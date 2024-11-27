/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebarBg: 'rgba(245, 245, 245, 1)',
        sidebarText: 'rgba(114, 114, 114, 1)'
      },
    },
  },
  plugins: [],
}


