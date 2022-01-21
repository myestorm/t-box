import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // command -> serve, build
  // mode -> development, production
  return {
    plugins: [vue()],
    base: command === 'build' ? '' : '/',
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            'primary-6': '#009844',
            'primary-5': '#23C343',
            'primary-7': '#009A29',
            'primary-4': '#4CD263',
            'primary-3': '#7BE188',
            'primary-2': '#AFF0B5',
            'primary-1': '#E8FFEA',
            'color-border-1': '#f2f3f5',
            'color-border-2': '#e5e6eb',
            'color-border-3': '#c9cdd4',
            'color-border-4': '#869C90',
            'arcoblue-6': '#009844',
          },
          javascriptEnabled: true,
        },
        scss: {
          additionalData: `
            @import "./src/assets/scss/var.scss";
            @import "./src/assets/scss/mixins.scss";
          `
        }
      }
    }
  }
})
