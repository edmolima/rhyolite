import { describe, it, expect, vi } from 'vitest';

describe('adapters/community-discovery (unit)', () => {
  it('returns templates from local community dirs', async () => {
    vi.resetModules();
    const stat = vi.fn().mockResolvedValue({ isDirectory: () => true });
    const readdir = vi.fn().mockResolvedValue(['foo.json']);
    const readFile = vi
      .fn()
      .mockResolvedValue('{"name":"foo","args":"bar","description":"desc","repo":"repo"}');
    vi.doMock('fs/promises', () => ({ stat, readdir, readFile }));
    vi.doMock('path', () => ({
      resolve: () => '/mock/community',
      join: () => '/mock/community/foo.json',
      default: {
        resolve: () => '/mock/community',
        join: () => '/mock/community/foo.json',
      },
    }));
    vi.spyOn(process, 'cwd').mockReturnValue('/mock');
    const { discoverCommunityTemplates } = await import('../../src/adapters/community-discovery');
    const result = await discoverCommunityTemplates('plugin');
    expect(Array.isArray(result)).toBe(true);
    for (const item of result) {
      expect(item).toMatchObject({
        name: 'foo',
        args: 'bar',
        description: 'desc',
        repo: 'repo',
        file: expect.any(String),
        type: 'plugin',
      });
    }
  });
  it('ignores invalid JSON and missing dirs', async () => {
    vi.resetModules();
    const stat = vi.fn().mockRejectedValue(new Error('no dir'));
    vi.doMock('fs/promises', () => ({ stat }));
    const { discoverCommunityTemplates } = await import('../../src/adapters/community-discovery');
    const result = await discoverCommunityTemplates('plugin');
    expect(result).toEqual([]);
  });
});
