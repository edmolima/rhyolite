import { TemplateMeta } from './template-discovery';

/**
 * Synchronous version for legacy compatibility. Always throws.
 * @throws Always throws. Use discoverCommunityTemplatesAsync instead.
 */
export function discoverCommunityTemplates(): TemplateMeta[] {
  throw new Error(
    'discoverCommunityTemplates is now async. Use discoverCommunityTemplatesAsync instead.',
  );
}

/**
 * Async version for new architecture. Not implemented in core.
 * @throws Always throws. Must be implemented in adapters/community-discovery.ts.
 */
export async function discoverCommunityTemplatesAsync(): Promise<TemplateMeta[]> {
  throw new Error(
    'discoverCommunityTemplatesAsync must be implemented in adapters/community-discovery.ts',
  );
}
