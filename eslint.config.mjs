// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['dist/', 'node_modules/', 'packages/*/dist/'],
  },
  ...tseslint.config(eslint.configs.recommended, tseslint.configs.recommended),
];
