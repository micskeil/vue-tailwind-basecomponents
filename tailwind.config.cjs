/**
 * Selects the primary color as RGBA value.
 *
 * If no override is given --primary css Variable will be used as color source.
 * If --primary is undefined the defaultValue will be used.
 * If override is specified the order of precedence is: override > --primary > defaultValue
 * @param defaultValue the default value to use as color (rgb string f.e. '255 0 0' for a very red color)
 * @param override the css variable to use as color source (if defined)
 */
function getPrimaryAsRGBA(defaultValue, override = '--primary') {
  return ({ opacityValue }) => {
    if (opacityValue) {
      return `rgba(var(${override}, var(--primary, ${defaultValue})), ${opacityValue})`;
    }
    return `rgb(var(${override}, var(--primary, ${defaultValue})))`;
  };
}

/** The primary color default value (RGB color channels). */
const primaryDefault = '0, 0, 0';

/** @type {import('tailwindcss').Config} */

module.exports = {
  /**
   * To avoid conflicts with the builder bootstrap styles
   * @see https://tailwindcss.com/docs/configuration#selector-strategy
   */
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: getPrimaryAsRGBA(primaryDefault),
        },
        inherit: 'inherit',
      },
    },
  },
  plugins: [],
};
