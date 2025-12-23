const js = require('@eslint/js');
const prettier = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

/**
 * Base ESLint configuration for the monorepo
 * This provides shared rules that all packages can extend
 * @type {import('eslint').Linter.FlatConfig[]}
 */
const config = [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/lib/**',
      '**/coverage/**',
      '**/.yarn/**',
      '**/*.eslintrc.cjs',
      '**/*.eslintrc.js',
      '**/public/**/*.js',
    ],
  },
  js.configs.recommended,
  prettierConfig,
  {
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'warn',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
];

module.exports = config;
