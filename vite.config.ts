import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import Pages from 'vite-plugin-pages'
import tailwindcss from '@tailwindcss/vite'
import Prerender from 'vite-plugin-prerender' // 引入 Prerender 插件
import path from 'path' // 引入 path 模組

// ----------------------------------------------------
// 導入品牌路由定義和品牌常量
// 這些路徑是相對於 vite.config.ts 檔案的位置
// ----------------------------------------------------
import { pageConfigs as chuanlifePageConfigs } from './src/routes/brand-definitions/chuanlife'
import { pageConfigs as crazyclownPageConfigs } from './src/routes/brand-definitions/crazyclown'
import { MAIN_BRAND_NAME } from './src/constants/brands/brands'
import type { NavbarItem } from './src/types/navbar' // 引入 NavbarItem 類型

// 定義 BrandDefinitions 的結構，以匹配你的品牌路由定義
interface BrandDefinitions {
  brandName: string
  pageConfigs: NavbarItem[]
  isMainBrand: boolean
}

// 組合所有品牌的頁面配置數據，供預渲染使用
// 這裡我們手動將每個品牌的 pageConfigs 組合成 Prerender 插件所需的格式
const ALL_BRAND_DEFINITIONS_DATA_FOR_PRERENDER: Record<string, BrandDefinitions> = {
  chuanlife: {
    brandName: 'chuanlife',
    pageConfigs: chuanlifePageConfigs,
    isMainBrand: 'chuanlife' === MAIN_BRAND_NAME,
  },
  crazyclown: {
    brandName: 'crazyclown',
    pageConfigs: crazyclownPageConfigs,
    isMainBrand: 'crazyclown' === MAIN_BRAND_NAME,
  },
  // 如果有其他品牌，也按照此模式添加
}

// 輔助函數：遞迴地從品牌定義中提取所有路由路徑
function extractRoutesFromBrandDefs(brandDefs: Record<string, BrandDefinitions>): string[] {
  const routes: string[] = []
  const addedPaths = new Set<string>() // 用於追蹤已添加的路徑，防止重複

  for (const brandKey in brandDefs) {
    if (Object.hasOwnProperty.call(brandDefs, brandKey)) {
      const brandDef = brandDefs[brandKey]
      // 如果是主品牌，其基礎路徑為空字串；否則為 /brandName
      const baseBrandPath = brandDef.isMainBrand ? '' : `/${brandDef.brandName}`

      const processConfigs = (configs: NavbarItem[], currentRelativePath: string) => {
        configs.forEach((config) => {
          let fullRelativePath: string

          if (config.path === '/') {
            // 對於品牌的根路徑（例如 /chuanlife 的 / 或 /crazyclown 的 /）
            fullRelativePath = baseBrandPath // 如果是 '/', 則直接使用品牌前綴或空字串
          } else {
            fullRelativePath = `${baseBrandPath}${currentRelativePath}${config.path}`
          }

          // 確保路徑不以斜線結尾，除非它是根路徑 '/'
          if (fullRelativePath.endsWith('/') && fullRelativePath !== '/') {
            fullRelativePath = fullRelativePath.slice(0, -1)
          }
          // 特殊處理根路徑，確保它是 '/' 而不是 ''
          if (fullRelativePath === '') {
            fullRelativePath = '/'
          }

          if (!addedPaths.has(fullRelativePath)) {
            routes.push(fullRelativePath)
            addedPaths.add(fullRelativePath)
          }

          if (config.children && config.children.length > 0) {
            processConfigs(config.children, currentRelativePath + config.path)
          }
        })
      }
      processConfigs(brandDef.pageConfigs, '')
    }
  }
  return routes
}

const prerenderRoutes = extractRoutesFromBrandDefs(ALL_BRAND_DEFINITIONS_DATA_FOR_PRERENDER)

// 添加其他需要預渲染的靜態路由，例如特定的錯誤頁面
// 根據 public-errors.ts，/public-errors/brand-not-found 是一個特定的頁面
prerenderRoutes.push('/public-errors/brand-not-found')

console.log('Routes to prerender:', prerenderRoutes) // 在建置時會印出預渲染的路徑列表

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(), // 如果你使用 JSX
    vueDevTools(), // 如果你使用 Vue 開發工具
    Pages({
      dirs: [
        // 將 'src/pages/xiangchuan' 設定為生成 '/' 根路徑的來源 (假設 'xiangchuan' 是 'chuanlife')
        { dir: 'src/pages/xiangchuan', baseRoute: '' },
        // 將 'src/pages/crazyclown' 設定為生成 '/crazyclown' 子路徑的來源
        { dir: 'src/pages/crazyclown', baseRoute: 'crazyclown' },
        // 將 'src/pages/public-errors' 設定為生成 '/public-errors' 子路徑的來源
        { dir: 'src/pages/public-errors', baseRoute: 'public-errors' },
        // 如果您還有其他頂層頁面，可以新增 dirs 入口
      ],
    }),
    tailwindcss(), // 如果你使用 TailwindCSS
    Prerender({
      // 你的建置輸出目錄，通常是 'dist'
      staticDir: path.resolve(__dirname, 'dist'),
      // 需要預渲染的路由列表
      routes: prerenderRoutes,
      // 你可以選擇是否啟用 Renderer，預設是使用 Puppeteer 進行渲染。
      // 如果你的網站結構簡單，可能不需要額外配置。
      // 如果遇到渲染問題，可以參考插件文檔進行配置。
      // renderer: new Renderer({
      //   maxConcurrentRoutes: 5,
      //   args: ['--no-sandbox', '--disable-setuid-sandbox'],
      // }),
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // 確保這裡的輸出目錄與 staticDir 一致
    outDir: 'dist',
    // 每次建置前清空輸出目錄，確保生成的是最新的預渲染檔案
    emptyOutDir: true,
  },
})
