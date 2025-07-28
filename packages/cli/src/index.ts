#!/usr/bin/env node

import { hello } from '@rhyolite/core';

// CLI command parsing
const args = process.argv.slice(2);
const name = args[0];
const hasDoubleDash = args[1] === '--';
const flagIndex = hasDoubleDash ? 2 : 1;
const flag = args[flagIndex];

hello(' rhyolite');

if (flag === '--plugin') {
  // In the future, call core logic to scaffold a plugin
  // eslint-disable-next-line no-console
  console.log('plugin created');
} else if (flag === '--theme') {
  // In the future, call core logic to scaffold a theme
  // eslint-disable-next-line no-console
  console.log('theme created');
} else {
  // eslint-disable-next-line no-console
  console.log('Usage: npm create rhyolite@latest <name> -- --plugin <type> | --theme <type>');
}
