import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/FIT5032--efolio/',   // ← 仓库名，必须完全一致
  plugins: [vue()],
})
