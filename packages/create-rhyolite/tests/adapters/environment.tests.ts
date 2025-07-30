import { describe, it, expect, vi } from 'vitest';

describe('adapters/environment (unit)', () => {
  it('calls exec for node, pnpm, and git', async () => {
    vi.resetModules();
    const exec = vi.fn((_cmd, cb) => cb && cb(null));
    vi.doMock('child_process', () => ({
      exec,
      default: { exec },
    }));
    const { validateEnvironment } = await import('../../src/adapters/environment');
    await expect(validateEnvironment()).resolves.toBeUndefined();
    expect(exec).toHaveBeenCalledWith('node --version', expect.any(Function));
    expect(exec).toHaveBeenCalledWith('pnpm --version', expect.any(Function));
    expect(exec).toHaveBeenCalledWith('git --version', expect.any(Function));
  });
  it('exits process if a command fails', async () => {
    vi.resetModules();
    const exec = vi.fn((_cmd, cb) => cb && cb(new Error('fail')));
    vi.doMock('child_process', () => ({
      exec,
      default: { exec },
    }));
    const exit = vi.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('exit');
    });
    const { validateEnvironment } = await import('../../src/adapters/environment');
    await expect(validateEnvironment()).rejects.toThrow('exit');
    exit.mockRestore();
  });
});
