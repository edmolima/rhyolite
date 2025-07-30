import { describe, it, expect } from 'vitest';
import { resolveTemplate, resolveTemplateAsync } from '../../src/core/template-resolver';

describe('template-resolver (unit)', () => {
  it('throws on sync legacy call', () => {
    expect(() => resolveTemplate()).toThrow();
  });
  it('returns undefined for async with no templates', async () => {
    const result = await resolveTemplateAsync('foo', 'plugin', async () => []);
    expect(result).toBeUndefined();
  });
  it('returns correct template for async', async () => {
    const fake = { name: 'A', args: 'foo', repo: '', file: '', type: 'plugin' as const };
    const result = await resolveTemplateAsync('foo', 'plugin', async () => [fake]);
    expect(result).toBe(fake);
  });
});
