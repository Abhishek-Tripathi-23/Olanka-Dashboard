/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '640px',   // phones
        md: '768px',   // small tablets
        lg: '1024px',  // tablets / small laptops
        xl: '1280px',  // desktops
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px',
        '5xl': '3840px', // 55″ 4K
        'iphone-se': '375px', // iPhone SE series
      },
    },
  },
  plugins: [],
}