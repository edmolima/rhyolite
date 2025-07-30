import { describe, it, expect, vi } from 'vitest';

describe('createSpinner (unit)', () => {
  it('returns an ora spinner and starts it', async () => {
    vi.resetModules();
    const mockSpinner = { succeed: vi.fn(), fail: vi.fn() };
    const start = vi.fn(() => mockSpinner);
    const ora = vi.fn(() => ({ start }));
    vi.doMock('ora', () => ({ default: ora }));
    const { createSpinner } = await import('../../src/utils/spinner');
    const spinner = createSpinner('Loading...');
    expect(ora).toHaveBeenCalledWith({ text: 'Loading...', spinner: 'dots' });
    expect(start).toHaveBeenCalled();
    expect(spinner).toBeDefined();
    expect(spinner).toBe(mockSpinner);
  });
});
