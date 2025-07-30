import { describe, it, expect } from 'vitest';
import * as cli from '../../src/cli/index';

describe('cli/index (unit)', () => {
  it('exports runCli', () => {
    expect(typeof cli.runCli).toBe('function');
  });
});
