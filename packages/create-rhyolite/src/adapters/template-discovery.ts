import path from 'path';
import fs from 'fs/promises';
import { TemplateMeta } from '../core/template-discovery';

export async function discoverTemplates(type: 'plugin' | 'theme'): Promise<TemplateMeta[]> {
  const searchDirs = [
    path.resolve(__dirname, `../../../../packages/${type}`),
    path.resolve(process.cwd(), `packages/${type}`),
    path.resolve(process.cwd(), `../packages/${type}`),
    path.resolve(__dirname, `../../../../packages/${type}s`),
    path.resolve(process.cwd(), `packages/${type}s`),
    path.resolve(process.cwd(), `../packages/${type}s`),
  ];
  const templates: TemplateMeta[] = [];
  for (const dir of searchDirs) {
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
