/**
 * Core scaffolding logic for Rhyolite plugins and themes.
 */

import { ScaffoldOptions, logInfo } from './core';

export function scaffoldPlugin(options: ScaffoldOptions) {
  // TODO: Implement actual plugin scaffolding logic
  logInfo(`Scaffolding plugin '${options.name}' of type '${options.type}'`);
}

export function scaffoldTheme(options: ScaffoldOptions) {
  // TODO: Implement actual theme scaffolding logic
  logInfo(`Scaffolding theme '${options.name}' of type '${options.type}'`);
}
