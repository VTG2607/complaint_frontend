/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily:
            {
                anton: ["Anton", "sans-serif"],
                garamond: ["EB Garamond", "serif"],
                henny: ["Henny Penny", "cursive"],
                merriweather: ["Merriweather", "serif"],
                noto: ["Noto Sans", "sans-serif"],
            },
    },
  },
  plugins: [],
}

