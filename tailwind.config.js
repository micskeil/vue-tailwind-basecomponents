/** @type {import('tailwindcss').Config} */

module.exports = {
  /**
   * To avoid conflicts with the builder bootstrap styles
   * @see https://tailwindcss.com/docs/configuration#selector-strategy
   */
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        '2xs': '0.6rem',
      },
      colors: {
        primary: {
          DEFAULT: '#14b8a6',
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        secondary: {
          DEFAULT: '#b81426 ',
          50: '#f8e8e9',
          100: '#f1d0d4',
          200: '#e3a1a8',
          300: '#d4727d',
          400: '#c64351',
          500: '#b81426',
          600: '#93101e',
          700: '#6e0c17',
          800: '#4a080f',
          900: '#250408',
        },
        inherit: 'inherit',
      },
      borderWidth: {
        default: '1px',
        1: '1px',
      },
      minHeight: {
        1: '1rem',
      },
      zIndex: {
        popup: '9999',
      },
    },
  },
  plugins: [],
};
