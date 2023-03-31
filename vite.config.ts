import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // base: '/test',
  assetsInclude: [ '**/*.mp4' ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "sass:list";
          @use "sass:math";
          @use "sass:map";
          @use "sass:string";
          @import "@/assets/sass/1-global/_sass-variables.scss";
        `,
      },
    },
  },
})
