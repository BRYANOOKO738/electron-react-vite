import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  {
    ignores: ['.vite/', 'out/', 'node_modules/', 'docs/.vitepress/cache/', 'docs/.vitepress/dist/'],
  },
  js.configs.recommended,
  {
    // Electron main process, preload script and shared code (Node.js).
    files: ['src/main/**/*.js', 'src/preload/**/*.js', 'src/shared/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        MAIN_WINDOW_VITE_DEV_SERVER_URL: 'readonly',
        MAIN_WINDOW_VITE_NAME: 'readonly',
      },
    },
  },
  {
    // Build and tooling config files and setup scripts.
    files: ['*.config.{js,mjs}', 'scripts/**/*.js'],
    languageOptions: { globals: globals.node },
  },
  {
    // End-to-end tests run in Node.js, but code passed to page.evaluate() runs in the page.
    files: ['tests/**/*.js'],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },
  {
    // React renderer (browser).
    files: ['src/renderer/**/*.{js,jsx}'],
    ...react.configs.flat.recommended,
    ...react.configs.flat['jsx-runtime'],
    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,
      globals: globals.browser,
    },
    plugins: { react, 'react-hooks': reactHooks },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/prop-types': 'off',
    },
    settings: { react: { version: 'detect' } },
  },
];
