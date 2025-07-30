import { describe, it, expect, vi } from 'vitest';
import { runCli } from '../../src/cli/runCli';

describe('cli/runCli (unit)', () => {
  it('prints banner and handles create command', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const exit = vi.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('exit');
    });
    vi.mock('../../src/commands/create', () => ({
      createHandler: vi.fn().mockResolvedValue(undefined),
    }));
    process.argv = ['node', 'cli', 'create', 'foo'];
    await expect(runCli()).resolves.toBeUndefined();
    log.mockRestore();
    error.mockRestore();
    exit.mockRestore();
  });
  it('handles interactive mode with no template', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const exit = vi.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('exit');
    });
    vi.mock('../../src/adapters/prompt', () => ({ askProjectInfo: vi.fn().mockResolvedValue({}) }));
    process.argv = ['node', 'cli'];
    await expect(runCli()).rejects.toThrow('exit');
    log.mockRestore();
    error.mockRestore();
    exit.mockRestore();
  });
});
