/**
 * Metadata for a project template.
 */
export interface TemplateMeta {
  name: string;
  args: string;
  description?: string;
  repo: string;
  file: string;
  type: 'plugin' | 'theme';
  official?: boolean;
  community?: boolean;
  popular?: boolean;
}

/**
 * Synchronous version for legacy compatibility. Always throws.
 * @throws Always throws. Use discoverTemplatesAsync instead.
 */
export function discoverTemplates(): TemplateMeta[] {
  throw new Error('discoverTemplates is now async. Use discoverTemplatesAsync instead.');
}

/**
 * Async version for new architecture. Not implemented in core.
 * @throws Always throws. Must be implemented in adapters/template-discovery.ts.
 */
export async function discoverTemplatesAsync(): Promise<TemplateMeta[]> {
  throw new Error('discoverTemplatesAsync must be implemented in adapters/template-discovery.ts');
}
