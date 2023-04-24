import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

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
        port: 5555,
      },
    };
  } else {
    // Build configuration
    return {
      plugins: [vue(), dts()],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
      },
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'vue-tailwind-basecomponents',
          formats: ['es'],
          fileName: 'vue-tailwind-basecomponents',
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
      },
    };
  }
});
