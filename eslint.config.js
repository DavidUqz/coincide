import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['node_modules/', 'coverage/', 'benchmarks/out/'],
  },
  js.configs.recommended,
  {
    // Base rules for every JavaScript file in the project
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      eqeqeq: ['error', 'always'],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  {
    // UI, state and services run in the browser
    files: ['src/js/**/*.js'],
    ignores: ['src/js/core/**'],
    languageOptions: {
      globals: { ...globals.browser },
    },
  },
  {
    // The core is pure: no DOM, no network, no storage
    files: ['src/js/core/**/*.js'],
    rules: {
      'no-restricted-globals': [
        'error',
        'window',
        'document',
        'localStorage',
        'sessionStorage',
        'fetch',
        'navigator',
        'location',
      ],
    },
  },
  {
    // Tests, benchmarks and config files run in Node
    files: ['tests/**/*.js', 'benchmarks/**/*.js', '*.config.js'],
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      'no-console': 'off',
    },
  },
];
