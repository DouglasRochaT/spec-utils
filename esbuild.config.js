const esbuild = require('esbuild');
const path = require('path');

esbuild.build({
  entryPoints: ['./src/extension.ts'],
  bundle: true,
  platform: 'node',
  target: 'node20',
  outfile: path.resolve(__dirname, 'dist', 'extension.js'),
  external: ['commonjs', 'vscode'],
  format: 'cjs',
  sourcemap: true,
  tsconfig: './tsconfig.json',
}).catch(() => process.exit(1));
