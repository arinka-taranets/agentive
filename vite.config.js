import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const ROOT = import.meta.dirname

export default defineConfig({
  root: resolve(ROOT, 'src'),
  publicDir: resolve(ROOT, 'public'),

  css: {
    devSourcemap: true,
  },

  build: {
    outDir: resolve(ROOT, 'dist'),
    // outDir sits outside root, so Vite will not clear it by default.
    emptyOutDir: true,
    // A map in dist/ is public and exposes the original source.
    // For a one-off debug build: npm run build -- --sourcemap
    sourcemap: false,
  },
})
