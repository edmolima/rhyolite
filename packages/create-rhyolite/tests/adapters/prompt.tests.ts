import { describe, it, expect, vi } from 'vitest';

describe('adapters/prompt (unit)', () => {
  it('returns user selection', async () => {
    vi.resetModules();
    vi.doMock('inquirer', () => {
      const prompt = vi.fn().mockResolvedValue({ name: 'foo', type: 'plugin', template: 'bar' });
      return { default: { prompt } };
    });
    const { askProjectInfo } = await import('../../src/adapters/prompt');
    await expect(askProjectInfo()).resolves.toEqual({
      name: 'foo',
      type: 'plugin',
      template: 'bar',
    });
  });

  it('returns empty object if no selection', async () => {
    vi.resetModules();
    vi.doMock('inquirer', () => {
      const prompt = vi.fn().mockResolvedValue({});
      return { default: { prompt } };
    });
    const { askProjectInfo } = await import('../../src/adapters/prompt');
    await expect(askProjectInfo()).resolves.toEqual({});
  });
});
