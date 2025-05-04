import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { type Plugin, defineConfig } from 'vite';

import { nodePolyfills } from 'vite-plugin-node-polyfills';

import topLevelAwait from 'vite-plugin-top-level-await';
import wasm from 'vite-plugin-wasm';

const wasmContentTypePlugin: Plugin = {
  name: 'wasm-content-type-plugin',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url?.endsWith('.wasm')) {
        res.setHeader('Content-Type', 'application/wasm');
      }
      next();
    });
  },
};

export default defineConfig({
  envPrefix: ['VITE_'],
  plugins: [
    wasm(),
    topLevelAwait(),
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    react(),
    wasmContentTypePlugin,
    tailwindcss(),
    nodePolyfills({
      protocolImports: true,
    }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
      sourcemap: true,
      minify: false,
    },
    include: ['@aztec/aztec.js', '@aztec/bb.js'],
    exclude: ['@noir-lang/noir_js', '@noir-lang/noirc_abi'],
  },
  server: { port: 3000 },
  publicDir: 'public',
  define: {
    'process.env': {},
    'process.browser': true,
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      public: path.resolve(__dirname, './public'),
      buffer: 'buffer',
    },
  },
});
