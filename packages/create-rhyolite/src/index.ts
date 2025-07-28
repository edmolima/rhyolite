#!/usr/bin/env node

import cac from 'cac';
import { scaffoldPlugin, scaffoldTheme } from './scaffold';

const cli = cac('create-rhyolite');

cli
  .command('[name]', 'Create a new Rhyolite project')
  .option('--plugin <type>', 'Scaffold a plugin')
  .option('--theme <type>', 'Scaffold a theme')
  .action((name: string | undefined, options: { plugin?: string; theme?: string }) => {
    if (!name) {
      console.log('Error: Project name is required.');
      cli.outputHelp();
      process.exit(1);
    }
    if (options.plugin) {
      scaffoldPlugin({ name, type: options.plugin });
    } else if (options.theme) {
      scaffoldTheme({ name, type: options.theme });
    } else {
      cli.outputHelp();
      process.exit(1);
    }
  });

cli.help();
cli.parse();
