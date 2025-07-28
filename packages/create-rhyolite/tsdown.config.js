// No longer need path aliasing, all code is local
export default {
  entry: ['src/index.ts'],
  target: 'node20',
  minify: true,
  outDir: 'dist',
  format: 'cjs', // CommonJS for CLI compatibility
  bundle: true,
  splitting: false,
  clean: true,
  dts: false,
  external: [],
};
