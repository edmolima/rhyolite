import path from 'path';
import fs from 'fs';

const reserved = ['node_modules', 'favicon.ico', 'package.json', 'pnpm-lock.yaml'];

export function validateProjectName(name: string): string | true {
  if (!/^[a-zA-Z0-9-_]+$/.test(name)) {
    return 'Name must use only letters, numbers, dashes and underscores.';
  }
  if (reserved.includes(name)) {
    return `Name '${name}' is reserved.`;
  }
  if (fs.existsSync(path.resolve(process.cwd(), name))) {
    return `Directory '${name}' already exists.`;
  }
  return true;
}
