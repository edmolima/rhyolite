import { CreateOptions } from '../types.js';
import { resolveTemplateAsync } from '../core/template-resolver.js';
import { discoverTemplates } from '../adapters/template-discovery.js';
import { discoverCommunityTemplates } from '../adapters/community-discovery.js';
import { createProject } from '../adapters/project.js';

/**
 * Handles the creation of a new project from a template.
 * @param name - The project name.
 * @param options - The creation options (plugin or theme).
 * @throws If no template is found or options are invalid.
 */
export async function createHandler(name: string, options: CreateOptions): Promise<void> {
  if (!options.plugin && !options.theme) {
    throw new Error('Please specify --plugin or --theme with a template name.');
  }
  const type = options.plugin ? 'plugin' : 'theme';
  const argValue = options.plugin || options.theme || '';

  let template = await resolveTemplateAsync(argValue, type, discoverTemplates);
  if (!template) {
    const communityTemplates = await discoverCommunityTemplates(type);
    template = communityTemplates.find(
      (t) => t.type === type && [argValue, `obsidian-template-${argValue}`].includes(t.args),
    );
  }
  if (!template) {
    throw new Error(`Template with args '${argValue}' not found.`);
  }
  await createProject(name, template);
}
