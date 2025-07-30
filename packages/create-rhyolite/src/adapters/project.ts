import { TemplateMeta } from '../core/template-discovery';
import { createSpinner } from '../utils/spinner';
import path from 'path';
import fs from 'fs/promises';
import { exec } from 'child_process';

export async function createProject(name: string, template: TemplateMeta) {
  const spinner = createSpinner(`Downloading ${template.type} template '${template.args}'...`);
  try {
    const dest = path.resolve(process.cwd(), name);
    try {
      await fs.access(dest);
      spinner.fail(`Directory '${name}' already exists.`);
      process.exit(1);
      return;
    } catch {
      /* ignore */
    }
    await execPromise(`git clone --depth=1 ${template.repo} ${name}`);
    await fs.rm(path.join(dest, '.git'), { recursive: true, force: true });
    spinner.succeed(
      `${template.type[0].toUpperCase() + template.type.slice(1)} '${name}' created from template '${template.args}'.`,
    );
    console.log(`\nNext steps:`);
    console.log(`  cd ${name}`);
    console.log(`  pnpm install`);
    console.log(`  pnpm dev`);
  } catch (err) {
    if (err instanceof Error) {
      spinner.fail(`Failed to create ${template.type}: ${err.message}`);
    } else {
      spinner.fail(`Failed to create ${template.type}: Unknown error`);
    }
    process.exit(1);
    return;
  }
}

function execPromise(cmd: string): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(cmd, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}
