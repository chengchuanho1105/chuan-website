// src/routes/index.ts

import type { RouteRecordRaw } from 'vue-router'
import type { Brand } from '@/constants/brands/brands'
import { ALL_BRANDS, MAIN_BRAND_NAME } from '@/constants/brands/brands'
import generatedRoutes from '~pages'
import publicErrorRoutes from './public-errors'
import type { NavbarItem } from '@/types/navbar'
import type { BrandDefinitions } from '../utils/createBrandDefinitions'

/**
 * 匯入所有品牌定義模組
 * 每個品牌模組現在預期會**預設匯出**一個 BrandDefinitions 類型的物件。
 */
const brandModules = import.meta.glob('./brand-definitions/*.ts', { eager: true })

// 這些匯出變數現在會從每個品牌模組的 default export 中提取
export const allBrandTopLevelPaths: Partial<Record<Brand, string[]>> = {}
export const brandNavbars: Partial<Record<Brand, NavbarItem[]>> = {}
const allManualBrandRoutes: RouteRecordRaw[] = []

// 遍歷所有品牌模組並組裝各品牌相關資料
for (const path in brandModules) {
  // 直接將 module.default 視為 BrandDefinitions 類型
  const moduleExports = (brandModules[path] as { default: BrandDefinitions | undefined }).default // 預期 default export

  // 從檔案路徑中提取品牌名稱 (e.g. './brand-definitions/brandA.ts' -> 'brandA')
  const brandNameMatch = path.match(/\/([a-zA-Z0-9_-]+)\.ts$/)
  if (brandNameMatch && brandNameMatch[1]) {
    // 排除工具檔案本身，避免將其誤認為品牌
    if (brandNameMatch[1] === 'createBrandDefinitions') {
      // 排除工具檔
      continue // 跳過這個檔案
    }
    const brandName = brandNameMatch[1] as Brand

    if (ALL_BRANDS.includes(brandName) && moduleExports) {
      // 處理 topLevelPathsAsMainBrand
      allBrandTopLevelPaths[brandName] = moduleExports.topLevelPathsAsMainBrand || []

      // 處理 navbarConfig
      brandNavbars[brandName] = moduleExports.navbarConfig || []

      // 處理手動定義的路由
      if (moduleExports.routes) {
        const prefixedRoutes = moduleExports.routes.map((route) => {
          if (
            brandName !== MAIN_BRAND_NAME &&
            !route.path.startsWith(`/${brandName}`) &&
            route.path !== '/'
          ) {
            return {
              ...route,
              path: `/${brandName}${route.path}`,
              name: route.name ? `${brandName}-${String(route.name)}` : undefined,
            }
          }
          return route
        })
        allManualBrandRoutes.push(...prefixedRoutes)
      } else {
        console.warn(
          `Brand definition '${brandName}' in '${path}' is missing 'routes' in its default export. No manual routes added.`,
        )
      }
    } else if (!moduleExports) {
      console.warn(
        `Brand definition '${brandName}' in '${path}' has no default export or it's not a BrandDefinitions object. Skipping.`,
      )
    } else {
      console.warn(
        `Found brand definition for '${brandName}' in '${path}', but it's not listed in ALL_BRANDS. Skipping.`,
      )
    }
  }
}

// 確保在動態遍歷後，'unknown' 始終有預設值
if (!allBrandTopLevelPaths.unknown) {
  allBrandTopLevelPaths.unknown = []
}
if (!brandNavbars.unknown) {
  brandNavbars.unknown = []
}

/**
 * 將所有品牌的頂層路徑（當作主品牌時）轉換為可用於比對的正規表達式。
 * 用於 router/helpers.ts 的 getBrandFromPath 函式中比對主品牌路徑。
 */
export const allBrandTopLevelPathRegexes: Partial<Record<Brand, RegExp[]>> = {}
for (const brandName in allBrandTopLevelPaths) {
  const paths = allBrandTopLevelPaths[brandName as Brand]
  if (paths) {
    allBrandTopLevelPathRegexes[brandName as Brand] = paths.map((p) => {
      const regexString = `^${p.replace(/:[a-zA-Z0-9_]+/g, '[^/]+')}(/|$)`
      return new RegExp(regexString)
    })
  }
}

/**
 * 匯總所有路由：
 */
const routes: Array<RouteRecordRaw> = [
  ...generatedRoutes,
  ...allManualBrandRoutes,
  ...publicErrorRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: 'CatchAll',
    redirect: '/public-errors/brand-not-found',
  },
]

export default routes
