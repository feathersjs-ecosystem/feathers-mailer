import { defineConfig } from 'tsdown'
import pkg from './package.json' with { type: 'json' }

export default defineConfig({
  entry: ['./src/index.ts'],
  outDir: './dist',
  format: 'es',
  dts: true,
  clean: true,
  deps: {
    neverBundle: [
      ...Object.keys(pkg.peerDependencies),
      ...Object.keys(pkg.devDependencies),
    ],
  },
})
