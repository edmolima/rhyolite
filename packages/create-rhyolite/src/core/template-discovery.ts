import path from 'path';
import fs from 'fs';

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

export function discoverTemplates(type: 'plugin' | 'theme'): TemplateMeta[] {
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
