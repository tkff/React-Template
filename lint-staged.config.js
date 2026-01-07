/**
 * Lint-staged configuration
 *
 * To enable:
 * pnpm add -D lint-staged husky
 *
 * Then run: pnpm prepare
 */
export default {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,css,scss}': ['prettier --write'],
};
