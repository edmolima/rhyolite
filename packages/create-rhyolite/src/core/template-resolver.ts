import { TemplateMeta } from './template-discovery';

/**
 * Synchronous version for legacy compatibility. Always throws.
 * @throws Always throws. Use resolveTemplateAsync instead.
 */
export function resolveTemplate(): TemplateMeta | undefined {
  throw new Error('resolveTemplate is now async. Use resolveTemplateAsync instead.');
}

/**
 * Async version for new architecture. Finds a template by argument value and type.
 * @param argValue - The argument value to match.
 * @param type - The template type ('plugin' or 'theme').
 * @param discoverTemplates - Async function to discover templates.
 * @returns The matching TemplateMeta or undefined.
 */
export async function resolveTemplateAsync(
  argValue: string,
  type: 'plugin' | 'theme',
  discoverTemplates: (type: 'plugin' | 'theme') => Promise<TemplateMeta[]>,
): Promise<TemplateMeta | undefined> {
  const possibleArgs = [argValue, `obsidian-template-${argValue}`];
  const templates = await discoverTemplates(type);
  return templates.find((t) => possibleArgs.includes(t.args));
}
