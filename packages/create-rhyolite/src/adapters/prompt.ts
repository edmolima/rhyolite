import inquirer from 'inquirer';
import chalk from 'chalk';
import fuzzysort from 'fuzzysort';
import { discoverTemplates } from '../core/template-discovery';
import { validateProjectName } from '../utils/validateName';
import { getBadges } from '../utils/badges';
import { previewRepo } from './preview.js';
/**
 * Answers returned from the project creation prompt.
 */
export interface ProjectPromptAnswers {
  name: string;
  type: 'plugin' | 'theme';
  template: string;
  preview?: boolean;
}

/**
 * Prompts the user for project information (name, type, template, preview).
 * @returns {Promise<ProjectPromptAnswers>} The user's answers.
 */
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
        { name: chalk.magenta('🛩️ Plugin'), value: 'plugin' },
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
        const templates = discoverTemplates();
        const choices = templates.map((json) => ({
          name:
            getBadges({
              official: json.official ?? false,
              community: json.community ?? false,
              popular: json.popular ?? false,
            }) +
            (type === 'plugin' ? chalk.magenta('🛩️') : chalk.blue('🎨')) +
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
    const templates = discoverTemplates();
    const selected = templates.find((t) => t.args === answers.template);
    if (selected) previewRepo(selected.repo);
  }
  return answers;
}

/**
 * Validates the environment for project creation.
 * @returns {Promise<true>} Always returns true (placeholder for real validation).
 */
export async function validateEnvironment(): Promise<true> {
  return true;
}
