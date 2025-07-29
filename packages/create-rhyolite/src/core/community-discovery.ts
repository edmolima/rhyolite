import path from 'path';
import fs from 'fs';
import { TemplateMeta } from './template-discovery';

export function discoverCommunityTemplates(type: 'plugin' | 'theme'): TemplateMeta[] {
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
    if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
      const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
      for (const file of files) {
        const jsonPath = path.join(dir, file);
        try {
          const json = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
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
    }
  }
  return templates;
}
