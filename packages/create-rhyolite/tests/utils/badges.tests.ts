import { describe, it, expect } from 'vitest';
import { getBadges } from '../../src/utils/badges';

describe('getBadges (unit)', () => {
  it('returns empty string for no badges', () => {
    expect(getBadges({})).toBe('');
  });
  it('returns official badge', () => {
    expect(getBadges({ official: true })).toMatch(/OFFICIAL/);
  });
  it('returns community badge', () => {
    expect(getBadges({ community: true })).toMatch(/COMMUNITY/);
  });
  it('returns popular badge', () => {
    expect(getBadges({ popular: true })).toMatch(/POPULAR/);
  });
  it('returns all badges together', () => {
    const badges = getBadges({ official: true, community: true, popular: true });
    expect(badges).toMatch(/OFFICIAL/);
    expect(badges).toMatch(/COMMUNITY/);
    expect(badges).toMatch(/POPULAR/);
  });
});
