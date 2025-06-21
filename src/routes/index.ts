//
/**
 * @file /src/routes/index.ts
 * @module router/routes
 * @description
 * routes 負責組合整個網站的路由表，包括：
 * 1. 所有自動產生的頁面路由（由 vite-plugin-pages 產生）
 * 2. 所有公共錯誤頁面路由（e.g. 404、403 等）
 * 3. 所有品牌的頂層路徑規則（由 brand-definitions/*.ts 匯入）
 * 4. 最終組合成 `routes` 陣列供 vue-router 使用
 */
//

import type { RouteRecordRaw } from 'vue-router'
import type { Brand } from '@/constants/brands/brands.ts'
import { ALL_BRANDS } from '@/constants/brands/brands.ts'
import generatedRoutes from '~pages'
import publicErrorRoutes from './public-errors'
import type { NavbarItem } from '@/types/navbar'

/**
 * 匯入所有品牌定義模組
 *
 * 使用 import.meta.glob 載入 routes/brand-definitions/ 目錄下所有 .ts 檔案，
 * 每個品牌模組皆需輸出 `topLevelPathsAsMainBrand: string[]`，代表該品牌在主品牌情境下對應的頂層路徑。
 */
const brandModules = import.meta.glob('./brand-definitions/*.ts', { eager: true })

// 定義品牌模組的介面，包含所有預期的匯出
interface BrandDefinitionModule {
  topLevelPathsAsMainBrand: string[]
  navbarConfig?: NavbarItem[] // 導覽列配置現在是可選的
  default?: RouteRecordRaw[] // 如果品牌定義檔也匯出 RouteRecordRaw 陣列
}

/**
 * 暫存各品牌對應的頂層路徑（僅當該品牌作為主品牌時）
 * e.g. dynamicTopLevelPathsMap['brandA'] = ['/about', '/products/:id']
 */
export const allBrandTopLevelPaths: Partial<Record<Brand, string[]>> = {}

/**
 * 儲存各品牌的導覽列配置
 * e.g. brandNavbars['brandA'] = [{ text: 'Home', path: '/' }]
 */
export const brandNavbars: Partial<Record<Brand, NavbarItem[]>> = {}

/**
 * 儲存所有手動定義的品牌路由（如果品牌定義檔有 default export RouteRecordRaw[]）
 * 這些路由將與 generatedRoutes 合併。
 */
const allManualBrandRoutes: RouteRecordRaw[] = []

// 遍歷所有品牌模組並組裝各品牌相關資料
for (const path in brandModules) {
  const module = brandModules[path] as BrandDefinitionModule

  // 從檔案路徑中提取品牌名稱 (e.g. './brand-definitions/brandA.ts' -> 'brandA')
  const brandNameMatch = path.match(/\/([a-zA-Z0-9_-]+)\.ts$/)
  if (brandNameMatch && brandNameMatch[1]) {
    const brandName = brandNameMatch[1] as Brand

    // 僅接受在 ALL_BRANDS 中定義過的品牌，避免誤載入無效模組
    // (ALL_BRANDS 包含了 'unknown'，所以這裡的檢查會包含所有靜態定義的品牌)
    if (ALL_BRANDS.includes(brandName)) {
      // 處理 topLevelPathsAsMainBrand
      if (module.topLevelPathsAsMainBrand) {
        allBrandTopLevelPaths[brandName] = module.topLevelPathsAsMainBrand
      } else {
        console.warn(
          `Brand definition '${brandName}' in '${path}' is missing 'topLevelPathsAsMainBrand' export. Providing an empty array.`,
        )
        allBrandTopLevelPaths[brandName] = [] // 提供一個空陣列避免後續錯誤
      }

      // 處理 navbarConfig
      if (module.navbarConfig) {
        brandNavbars[brandName] = module.navbarConfig
      } else {
        console.warn(
          `Brand definition '${brandName}' in '${path}' is missing 'navbarConfig' export. Providing an empty array.`,
        )
        brandNavbars[brandName] = [] // 提供一個空陣列
      }

      // 處理手動定義的路由（如果存在）
      if (module.default) {
        allManualBrandRoutes.push(...module.default)
      }
    } else {
      console.warn(
        `Found brand definition for '${brandName}' in '${path}', but it's not listed in ALL_BRANDS. Skipping.`,
      )
    }
  }
}

// 確保在動態遍歷後，'unknown' 始終有空陣列
if (!allBrandTopLevelPaths.unknown) {
  allBrandTopLevelPaths.unknown = []
}
if (!brandNavbars.unknown) {
  brandNavbars.unknown = []
}

/**
 * 將所有品牌的頂層路徑（當作主品牌時）轉換為可用於比對的正規表達式。
 * e.g. `/products/:id` → `/products/[^/]+(/|$)`
 *
 * 用於 router/helpers.ts 的 getBrandFromPath 函式中比對主品牌路徑。
 */
export const allBrandTopLevelPathRegexes: Partial<Record<Brand, RegExp[]>> = {}
for (const brandName in allBrandTopLevelPaths) {
  const paths = allBrandTopLevelPaths[brandName as Brand]
  if (paths) {
    allBrandTopLevelPathRegexes[brandName as Brand] = paths.map((p) => {
      // 將動態參數如 :id 轉換為 [^/]+ 並包成完整起始正規式
      const regexString = `^${p.replace(/:[a-zA-Z0-9_]+/g, '[^/]+')}(/|$)`
      return new RegExp(regexString)
    })
  }
}

/**
 * 匯總所有路由：
 * - 自動產生的頁面路由（由 vite-plugin-pages 提供）
 * - 公共錯誤頁面路由（如 brand-not-found）
 * - catch-all 萬用路由（用於重導至品牌錯誤頁）
 */
const routes: Array<RouteRecordRaw> = [
  ...generatedRoutes, // Vite-plugin-pages 自動生成的路由
  ...allManualBrandRoutes, // 所有手動定義的品牌路由
  ...publicErrorRoutes, // 公共錯誤頁面路由
  {
    path: '/:pathMatch(.*)*',
    name: 'CatchAll',
    redirect: '/public-errors/brand-not-found',
  },
]

export default routes
