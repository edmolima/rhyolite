import path from 'path';
import fs from 'fs/promises';
import { TemplateMeta } from '../core/template-discovery';

export async function discoverCommunityTemplates(
  type: 'plugin' | 'theme',
): Promise<TemplateMeta[]> {
  const communityDirs = [
    path.resolve(__dirname, `../../../../packages/${type}/community`),
    path.resolve(process.cwd(), `packages/${type}/community`),
    path.resolve(process.cwd(), `../packages/${type}/community`),
    path.resolve(__dirname, `../../../../packages/${type}s/community`),
    path.resolve(process.cwd(), `packages/${type}s/community`),
    path.resolve(process.cwd(), `../packages/${type}s/community`),
  ];
  const templates: TemplateMeta[] = [];
  for (const dir of communityDirs) {
    try {
      const stat = await fs.stat(dir);
      if (!stat.isDirectory()) continue;
      const files = (await fs.readdir(dir)).filter((f) => f.endsWith('.json'));
      for (const file of files) {
        const jsonPath = path.join(dir, file);
        try {
          const json = JSON.parse(await fs.readFile(jsonPath, 'utf-8'));
          templates.push({
            name: json.name,
            args: json.args,
            description: json.description,
            repo: json.repo,
            file: jsonPath,
            type,
          });
        } catch {
          // ignore invalid JSON files
        }
      }
    } catch {
      // ignore missing dirs
    }
  }
  return templates;
}
