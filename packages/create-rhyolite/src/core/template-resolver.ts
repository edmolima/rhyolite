import { TemplateMeta, discoverTemplates } from './template-discovery';

export function resolveTemplate(
  argValue: string,
  type: 'plugin' | 'theme',
): TemplateMeta | undefined {
  const possibleArgs = [argValue, `obsidian-template-${argValue}`];
  const templates = discoverTemplates(type);
  return templates.find((t) => possibleArgs.includes(t.args));
}
