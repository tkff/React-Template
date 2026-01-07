#!/usr/bin/env node

/**
 * Checks if an optional dependency is installed before running a command.
 * Usage: node scripts/check-optional.js <package-name>
 */

import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const packageName = process.argv[2];

if (!packageName) {
  console.error('Usage: node scripts/check-optional.js <package-name>');
  process.exit(1);
}

try {
  require.resolve(packageName);
} catch {
  console.error(`\n❌ Optional dependency "${packageName}" is not installed.\n`);
  console.error(`To enable this feature, run:\n`);
  console.error(`  pnpm add -D ${packageName}\n`);
  console.error(`Then try again.\n`);
  process.exit(1);
}
