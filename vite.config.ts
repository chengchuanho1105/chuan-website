import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import Pages from 'vite-plugin-pages'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    Pages({
      dirs: [
        // 將 'src/pages/xiangchuan' 設定為生成 '/' 根路徑的來源
        { dir: 'src/pages/xiangchuan', baseRoute: '' }, // baseRoute: '' 表示映射到根路徑
        // 將 'src/pages/crazyclown' 設定為生成 '/crazyclown' 子路徑的來源
        { dir: 'src/pages/crazyclown', baseRoute: 'crazyclown' },
        // 將 'src/pages/public-errors' 設定為生成 '/public-errors' 子路徑的來源
        { dir: 'src/pages/public-errors', baseRoute: 'public-errors' },
        // 如果您還有其他頂層頁面，但不想它們被視為 xiangchuan 的一部分，可以新增一個 dirs 入口
        // { dir: 'src/pages/global', baseRoute: '' }, // 例如：src/pages/global/privacy.vue -> /privacy
      ],
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
