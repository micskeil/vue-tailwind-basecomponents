/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  plugins: ['tailwindcss'],
  extends: [
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/prettier',
    'plugin:vue/vue3-recommended',
    'plugin:tailwindcss/recommended',
    'prettier',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
  },
  rules: {
    'tailwindcss/no-custom-classname': 'off',
    'prettier/prettier': ['error', {}],
    '@typescript-eslint/no-unused-vars': [
      'error', // or warn
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.vue'],
      rules: {},
    },
  ],
  settings: {
    // Fix eslint "import/named" when importing interfaces from modules.
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
