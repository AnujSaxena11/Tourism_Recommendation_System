/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Palette from the Reference Design
        cosmos: {
          DEFAULT: '#003049',
          950: '#020C17',
          900: '#031626',
          850: '#051E33',
          800: '#08233F',
          700: '#003049',
          600: '#0B3F60',
        },
        crimson: {
          DEFAULT: '#C1121F',
          light: '#E63946',
          dark: '#780000',
        },
        gold: {
          DEFAULT: '#F5B82E',
          light: '#F8C857',
          dark: '#D99B15',
          amber: '#F59E0B',
        },
        cream: {
          DEFAULT: '#FAF5EB',
          50: '#FFFDF9',
          100: '#FAF5EB',
          200: '#F3E9D2',
          300: '#EBDCB9',
          card: '#FFFFFF',
        },
        marble: {
          DEFAULT: '#669BBC',
          light: '#88B7D5',
          dark: '#467B9C',
        },
        // Backwards compatibility tokens
        yale: {
          DEFAULT: '#003049',
          900: '#031626',
          800: '#051E33',
          500: '#003049',
        },
        goldenrod: {
          DEFAULT: '#F5B82E',
          light: '#F8C857',
        },
        night: {
          900: '#031626',
          800: '#051E33',
          700: '#08233F',
        },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'Impact', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive'],
        sans: ['Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'float-delayed': 'float 5s ease-in-out 2.5s infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
