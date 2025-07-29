import chalk from 'chalk';
import inquirer from 'inquirer';
import fuzzysort from 'fuzzysort';
import { execSync } from 'child_process';
import { discoverTemplates } from '../core/template-discovery';
import { validateProjectName } from './validateName';
import { getBadges } from './badges';
import { previewRepo } from './preview';

export interface ProjectPromptAnswers {
  name: string;
  type: 'plugin' | 'theme';
  template: string;
  preview?: boolean;
}

export async function askProjectInfo(): Promise<ProjectPromptAnswers> {
  await validateEnvironment();
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: chalk.cyan.bold('Project name:'),
      validate: (input: string) => validateProjectName(input),
    },
    {
      type: 'list',
      name: 'type',
      message: chalk.cyan.bold('What do you want to create?'),
      choices: [
        { name: chalk.magenta('🧩 Plugin'), value: 'plugin' },
        { name: chalk.blue('🎨 Theme'), value: 'theme' },
      ],
    },
    {
      type: 'autocomplete',
      name: 'template',
      message: (answers: ProjectPromptAnswers) =>
        answers.type === 'plugin'
          ? chalk.magenta.bold('Type to search for a plugin template:')
          : chalk.blue.bold('Type to search for a theme template:'),
      source: async (_answers: unknown, input: string | undefined) => {
        const type = (_answers as ProjectPromptAnswers).type;
        const templates = discoverTemplates(type);
        const choices = templates.map((json) => ({
          name:
            getBadges({
              official: json.official ?? false,
              community: json.community ?? false,
              popular: json.popular ?? false,
            }) +
            (type === 'plugin' ? chalk.magenta('🧩') : chalk.blue('🎨')) +
            ' ' +
            chalk.bold(json.name) +
            chalk.gray(` (${json.args})`) +
            (json.description ? chalk.dim(' - ' + json.description) : ''),
          value: json.args,
          description: json.description,
          short: json.name,
          repo: json.repo,
        }));
        if (!input) return choices;
        const results = fuzzysort.go(input, choices, { key: 'name' });
        return results.map((r: Fuzzysort.KeyResult<(typeof choices)[0]>) => r.obj);
      },
      pageSize: 10,
      loop: false,
    },
    {
      type: 'confirm',
      name: 'preview',
      message: chalk.cyan('Preview the selected template repo in your browser?'),
      default: false,
      when: (answers: ProjectPromptAnswers) => {
        return !!answers.template;
      },
    },
  ];

  // @ts-expect-error inquirer type inference limitation with custom prompts
  const answers = (await inquirer.prompt(questions)) as ProjectPromptAnswers;

  if (answers.preview) {
    const type = answers.type;
    const templates = discoverTemplates(type);
    const selected = templates.find((t) => t.args === answers.template);
    if (selected) previewRepo(selected.repo);
  }
  return answers;
}

export function printSuccess(name: string, type: string) {
  console.log(chalk.greenBright.bold('\n✔ Success!'));
  console.log(chalk.cyanBright(`\nYour ${type} '${name}' was created.`));
  console.log(chalk.yellowBright('\nNext steps:'));
  console.log(chalk.bold(`  cd ${name}`));
  console.log(chalk.bold('  pnpm install'));
  console.log(chalk.bold('  pnpm dev'));
  console.log(
    chalk.gray('\nNeed help? See the docs: https://github.com/edmolima/rhyolite#readme\n'),
  );
}

export function printError(message: string, suggestion?: string) {
  console.log(chalk.redBright.bold('\n✖ Error: ') + chalk.red(message));
  if (suggestion) {
    console.log(chalk.yellowBright('Suggestion: ') + chalk.yellow(suggestion));
  }
  console.log(
    chalk.gray('If you need help, open an issue: https://github.com/edmolima/rhyolite/issues\n'),
  );
}

export async function validateEnvironment() {
  try {
    execSync('node --version', { stdio: 'ignore' });
  } catch {
    printError(
      'Node.js is not installed or not in PATH.',
      'Install Node.js from https://nodejs.org/',
    );
    process.exit(1);
  }
  try {
    execSync('pnpm --version', { stdio: 'ignore' });
  } catch {
    printError('pnpm is not installed or not in PATH.', 'Install pnpm: npm install -g pnpm');
    process.exit(1);
  }
  try {
    execSync('git --version', { stdio: 'ignore' });
  } catch {
    printError('git is not installed or not in PATH.', 'Install git: https://git-scm.com/');
    process.exit(1);
  }
}
