// Shared types and utilities for create-rhyolite

export interface ScaffoldOptions {
  name: string;
  type: string;
}

export function logInfo(message: string) {
  // eslint-disable-next-line no-console
  console.log(`[rhyolite] ${message}`);
}
