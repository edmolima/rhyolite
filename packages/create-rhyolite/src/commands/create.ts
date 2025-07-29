import { createSpinner } from '../utils/spinner';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import { resolveTemplate } from '../core/template-resolver';
import { discoverCommunityTemplates } from '../core/community-discovery';

export interface CreateOptions {
  plugin?: string;
  theme?: string;
}

export async function runCreate(name: string, options: CreateOptions) {
  if (!options.plugin && !options.theme) {
    console.error('Please specify --plugin or --theme with a template name.');
    process.exit(1);
  }

  const type = options.plugin ? 'plugin' : 'theme';
  const argValue = options.plugin || options.theme || '';
  // possibleArgs is not used, so removed to fix lint error
  const spinner = createSpinner(`Downloading ${type} template '${argValue}'...`);

  try {
    // Try official templates first
    let template = resolveTemplate(argValue, type);
    // If not found, try community templates
    if (!template) {
      const communityTemplates = discoverCommunityTemplates(type);
      template = communityTemplates.find((t) =>
        [argValue, `obsidian-template-${argValue}`].includes(t.args),
      );
    }
    if (!template) {
      spinner.fail(`Template with args '${argValue}' not found.`);
      process.exit(1);
    }

    const dest = path.resolve(process.cwd(), name);
    if (fs.existsSync(dest)) {
      spinner.fail(`Directory '${name}' already exists.`);
      process.exit(1);
    }
    execSync(`git clone --depth=1 ${template.repo} ${name}`, { stdio: 'ignore' });

    fs.rmSync(path.join(dest, '.git'), { recursive: true, force: true });

    spinner.succeed(
      `${type[0].toUpperCase() + type.slice(1)} '${name}' created from template '${template.args}'.`,
    );
    console.log(`\nNext steps:`);
    console.log(`  cd ${name}`);
    console.log(`  pnpm install`);
    console.log(`  pnpm dev`);
  } catch (err) {
    if (err instanceof Error) {
      spinner.fail(`Failed to create ${type}: ${err.message}`);
    } else {
      spinner.fail(`Failed to create ${type}: Unknown error`);
    }
    process.exit(1);
  }
}
