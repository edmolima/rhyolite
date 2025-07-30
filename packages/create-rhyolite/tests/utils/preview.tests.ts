import { describe, it, expect, vi } from 'vitest';

describe('previewRepo (unit)', () => {
  it('calls open with the repo url', async () => {
    vi.resetModules();
    const open = vi.fn();
    vi.doMock('open', () => ({ default: open }));
    const { previewRepo } = await import('../../src/utils/preview');
    previewRepo('https://github.com/example/repo');
    expect(open).toHaveBeenCalledWith('https://github.com/example/repo');
  });
});
