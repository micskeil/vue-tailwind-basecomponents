import viteConfig from './vite.config';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';
import { configDefaults, defineConfig } from 'vitest/config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [
      vue({
        script: {
          defineModel: true,
        },
      }),
    ],
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      reporters: ['default', 'html'],
      outputFile: './coverage/index.html',
      coverage: {
        enabled: true,
        lines: 80,
        statements: 80,
        functions: 60,
        branches: 60,
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 3000,
    },
  })
);
