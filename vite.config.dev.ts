import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  if (command === 'serve') {
    // Development configuration
    return {
      plugins: [vue()],
      root: 'src/example/',
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
      },
      server: {
        port: 8000,
      },
    };
  } else {
    // Build configuration
    return {
      plugins: [
        vue({
          script: {
            defineModel: true,
          },
        }),
      ],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
      },
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'baseComponents',
          fileName: (format) => `index.${format}.js`,
          typesDir: 'dist',
        },
        rollupOptions: {
          external: ['vue'],
          output: {
            globals: {
              vue: 'Vue',
            },
          },
        },
        declarations: true,
        outDir: 'dist',
      },
    };
  }
});
