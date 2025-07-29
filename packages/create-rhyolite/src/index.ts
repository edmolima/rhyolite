// #!/usr/bin/env node
import { Command } from 'commander';
import { runCreate } from './commands/create';
import { askProjectInfo } from './utils/prompt';

function printBanner() {
  console.log(`\x1b[36m`);
  console.log('  _____  _                 _ _ _              ');
  console.log(' |  __ \\| |               | (_| |             ');
  console.log(' | |__) | |__  _   _  ___ | |_| |_ ___        ');
  console.log(" |  _  /| '_ \\| | | |/ _ \\| | | __/ _ \\   ");
  console.log(' | | \\ \\| | | | |_| | (_) | | | ||  __/      ');
  console.log(' |_|  \\_\\_| |_|\\__, |\\___/|_|_|\\__\\___| ');
  console.log('                 __/ |                    ');
  console.log('                |___/                     ');
  console.log('');
  console.log('  ⚡ Create next generation Obsidian plugins and themes ⚡');
  console.log('\x1b[0m');
}

const program = new Command();

program
  .name('create-rhyolite')
  .description('CLI for scaffolding Obsidian plugins and themes')
  .version('0.1.0')
  .showHelpAfterError()
  .showSuggestionAfterError();

program
  .command('create <name>')
  .option('--plugin <template>', 'Create a new plugin from a template')
  .option('--theme <template>', 'Create a new theme from a template')
  .description('Create a new plugin or theme project')
  .action(async (name: string, options: { plugin?: string; theme?: string }) => {
    printBanner();
    await runCreate(name, options);
  });

program
  .argument('<name>', 'Project name')
  .option('--plugin <template>', 'Create a new plugin from a template')
  .option('--theme <template>', 'Create a new theme from a template')
  .action(async (name: string, options: { plugin?: string; theme?: string }) => {
    printBanner();
    await runCreate(name, options);
  });

program.addHelpText(
  'after',
  `\nExamples:\n  pnpm create rhyolite my-plugin -- --plugin react\n  pnpm create rhyolite my-theme -- --theme vue\n  pnpm create rhyolite my-cool-thing -- --plugin my-custom-template\n`,
);

try {
  if (process.argv.length <= 2) {
    // Interactive mode
    (async () => {
      const answers = await askProjectInfo();
      if (!answers.template) {
        console.error('No template selected. Exiting.');
        process.exit(1);
      }
      // answers now has name property
      await runCreate(answers.name, {
        [answers.type]: answers.template,
      });
    })();
  } else {
    program.parse(process.argv);
  }
} catch (err) {
  if (err instanceof Error) {
    console.error(`\n\x1b[31mError:\x1b[0m`, err.message);
  } else {
    console.error(`\n\x1b[31mError:\x1b[0m`, err);
  }
  process.exit(1);
}
