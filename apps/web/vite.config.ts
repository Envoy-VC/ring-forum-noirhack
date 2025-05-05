import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { nodePolyfills } from 'vite-plugin-node-polyfills';

import topLevelAwait from 'vite-plugin-top-level-await';
import wasm from 'vite-plugin-wasm';

export default defineConfig({
  envPrefix: ['VITE_'],
  plugins: [
    wasm(),
    topLevelAwait(),
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    nodePolyfills({ protocolImports: true }),
  ],
  server: {
    port: 3000,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  optimizeDeps: {
    esbuildOptions: { target: 'esnext', minify: false, sourcemap: true },
    include: [''],
    exclude: [
      '@noir-lang/noirc_abi',
      '@noir-lang/acvm_js',
      '@aztec/foundation',
    ],
  },
  build: {
    rollupOptions: {
      treeshake: false, // disable tree-shaking globally (not recommended)
      output: {
        manualChunks: undefined, // prevent code splitting (optional)
      },
    },
    commonjsOptions: {
      include: [/node_modules/], // ensure CommonJS modules are preserved
    },
    target: 'esnext',
    minify: false,
  },
  publicDir: 'public',
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      public: path.resolve(__dirname, './public'),
    },
  },
});
