import { exec } from 'child_process';

export async function validateEnvironment(): Promise<void> {
  await execPromise(
    'node --version',
    'Node.js is not installed or not in PATH.',
    'Install Node.js from https://nodejs.org/',
  );
  await execPromise(
    'pnpm --version',
    'pnpm is not installed or not in PATH.',
    'Install pnpm: npm install -g pnpm',
  );
  await execPromise(
    'git --version',
    'git is not installed or not in PATH.',
    'Install git: https://git-scm.com/',
  );
}

function execPromise(cmd: string, errorMsg: string, suggestion: string): Promise<void> {
  return new Promise((resolve) => {
    exec(cmd, (err) => {
      if (err) {
        console.error(errorMsg);
        console.error(suggestion);
        process.exit(1);
      }
      resolve();
    });
  });
}
