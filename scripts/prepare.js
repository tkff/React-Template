#!/usr/bin/env node

/**
 * Prepare script for package.json "prepare" hook.
 * Safely initializes Husky if it's installed and .git exists.
 */

import { existsSync } from 'fs';
import { execSync } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// Skip in CI environments
if (process.env.CI) {
  console.log('CI detected, skipping prepare script.');
  process.exit(0);
}

// Check if .git directory exists
if (!existsSync('.git')) {
  console.log('No .git directory found, skipping Husky setup.');
  process.exit(0);
}

// Check if husky is installed
try {
  require.resolve('husky');
} catch {
  console.log('Husky not installed, skipping git hooks setup.');
  console.log(
    'To enable git hooks, run: pnpm add -D husky @commitlint/cli @commitlint/config-conventional'
  );
  process.exit(0);
}

// Initialize Husky
try {
  execSync('npx husky', { stdio: 'inherit' });
  console.log('✅ Husky initialized successfully.');
} catch (error) {
  console.warn('⚠️ Failed to initialize Husky:', error.message);
}
