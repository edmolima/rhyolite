import { Command } from 'commander';
import { createHandler } from '../commands/create.js';
import { askProjectInfo } from '../adapters/prompt.js';
import chalk from 'chalk';

function printBanner() {
  console.log(
    chalk.cyanBright(`
  _____  _                 _ _ _
 |  __ \\| |               | (_| |
 | |__) | |__  _   _  ___ | |_| |_ ___
 |  _  /| '_ \\| | | |/ _ \\| | | __/ _ \\
 | | \\ \\| | | | |_| | (_) | | | ||  __/
 |_|  \\_\\_| |_|\\__, |\\___/|_|_|\\__\\___|
                 __/ |
                |___/
`),
  );
  console.log(chalk.magentaBright('  ⚡ Create next generation Obsidian plugins and themes ⚡\n'));
}

export async function runCli() {
  const program = new Command();
  program
    .name('create-rhyolite')
    .description(chalk.bold('CLI for scaffolding Obsidian plugins and themes'))
    .version('0.1.0')
    .showHelpAfterError()
    .showSuggestionAfterError();

  program
    .command('create <name>')
    .option('--plugin <template>', 'Create a new plugin from a template')
    .option('--theme <template>', 'Create a new theme from a template')
    .description(chalk.green('Create a new plugin or theme project'))
    .action(async (name: string, options: { plugin?: string; theme?: string }) => {
      printBanner();
      try {
        await createHandler(name, options);
      } catch (err) {
        if (err instanceof Error) {
          console.error(`\n${chalk.redBright('Error:')}`, chalk.yellow(err.message));
        } else {
          console.error(`\n${chalk.redBright('Error:')}`, chalk.yellow(String(err)));
        }
        process.exit(1);
      }
    });

  program.addHelpText(
    'after',
    chalk.gray(`
Examples:
  pnpm create rhyolite my-plugin -- --plugin react
  pnpm create rhyolite my-theme -- --theme vue
  pnpm create rhyolite my-cool-thing -- --plugin my-custom-template
`),
  );

  if (process.argv.length <= 2) {
    // Interactive mode
    try {
      const answers = await askProjectInfo();
      if (!answers.template) {
        console.error(chalk.red('No template selected. Exiting.'));
        process.exit(1);
      }
      await createHandler(answers.name, {
        [answers.type]: answers.template,
      });
    } catch (err) {
      if (err instanceof Error) {
        console.error(`\n${chalk.redBright('Error:')}`, chalk.yellow(err.message));
      } else {
        console.error(`\n${chalk.redBright('Error:')}`, chalk.yellow(String(err)));
      }
      process.exit(1);
    }
  } else {
    program.parse(process.argv);
  }
}
