/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  parser: 'vue-eslint-parser',
  rules: {
    'vue/no-multiple-template-root': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn', // or error
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['error', 'default'],
      },
    ],
    curly: 'error',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.vue'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'vue/multi-word-component-names': [
          'error',
          {
            ignores: ['error', 'default'],
          },
        ],
      },
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
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
