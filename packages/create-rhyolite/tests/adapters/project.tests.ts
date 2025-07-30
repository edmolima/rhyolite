import { describe, it, expect, vi } from 'vitest';
import { TemplateMeta } from '../../src/core/template-discovery';

describe('adapters/project (unit)', () => {
  it('calls git clone and removes .git', async () => {
    vi.resetModules();
    const fs = {
      access: vi.fn().mockRejectedValue(undefined),
      rm: vi.fn().mockResolvedValue(undefined),
    };
    const createSpinner = vi.fn(() => ({ fail: vi.fn(), succeed: vi.fn() }));
    vi.doMock('child_process', () => ({
      exec: (cmd: string, cb: ((err: Error | null) => void) | undefined) => cb && cb(null),
      default: {
        exec: (cmd: string, cb: ((err: Error | null) => void) | undefined) => cb && cb(null),
      },
    }));
    vi.doMock('fs/promises', () => ({
      ...fs,
      default: { ...fs },
    }));
    vi.doMock('../../src/utils/spinner', () => ({
      createSpinner,
      default: { createSpinner },
    }));
    const { createProject } = await import('../../src/adapters/project');
    const template: TemplateMeta = {
      name: 'Test',
      args: 'test',
      repo: 'repo',
      file: '',
      type: 'plugin',
    };
    await expect(createProject('foo', template)).resolves.toBeUndefined();
    expect(fs.rm).toHaveBeenCalled();
  });
  it('fails if directory exists', async () => {
    vi.resetModules();
    const fs = {
      access: vi.fn().mockResolvedValue(undefined),
      rm: vi.fn().mockResolvedValue(undefined),
    };
    const createSpinner = vi.fn(() => ({ fail: vi.fn(), succeed: vi.fn() }));
    vi.doMock('fs/promises', () => ({ ...fs, default: { ...fs } }));
    vi.doMock('../../src/utils/spinner', () => ({ createSpinner, default: { createSpinner } }));
    const { createProject } = await import('../../src/adapters/project');
    const template: TemplateMeta = {
      name: 'Test',
      args: 'test',
      repo: 'repo',
      file: '',
      type: 'plugin',
    };
    const exit = vi.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('exit');
    });
    await createProject('foo', template);
    expect(exit).toHaveBeenCalledWith(1);
    exit.mockRestore();
  });
});
