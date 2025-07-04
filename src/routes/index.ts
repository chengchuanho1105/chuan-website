/**
 * @file routes/index.ts
 * @module router/index
 * @description
 * 組裝應用程式的完整路由清單，來源包含：
 * - vite-plugin-pages 產生的頁面路由
 * - 各品牌模組定義的手動路由
 * - 公共錯誤路由
 * - catch-all 路由（品牌找不到）
 *
 * 同時也會：
 * - 將各品牌的頂層主品牌路徑轉換為正規表達式供品牌判斷使用
 * - 匯出各品牌 navbar 設定
 */

import type { RouteRecordRaw } from 'vue-router'
import type { Brand } from '@/constants/brands/brands'
import { ALL_BRANDS, MAIN_BRAND_NAME } from '@/constants/brands/brands'
import generatedRoutes from '~pages'
import publicErrorRoutes from './public-errors'
import type { NavbarItem } from '@/types/navbar'
import type { BrandDefinitions } from '../utils/createBrandDefinitions'

/**
 * 匯入所有品牌定義模組。
 * 每個品牌模組預期會預設匯出一個 `BrandDefinitions` 型別物件。
 */
const brandModules = import.meta.glob('./brand-definitions/*.ts', { eager: true })

// 儲存每個品牌的主品牌頂層路徑清單
export const allBrandTopLevelPaths: Partial<Record<Brand, string[]>> = {}

// 儲存每個品牌的 navbar 組態
export const brandNavbars: Partial<Record<Brand, NavbarItem[]>> = {}

// 所有品牌模組內部定義的手動路由（靜態路由）
const allManualBrandRoutes: RouteRecordRaw[] = []

/* ----------------------------------------
 * 遍歷所有品牌模組：組裝路由與設定
 * ---------------------------------------- */
for (const path in brandModules) {
  const moduleExports = (brandModules[path] as { default: BrandDefinitions | undefined }).default

  const brandNameMatch = path.match(/\/([a-zA-Z0-9_-]+)\.ts$/)

  if (brandNameMatch && brandNameMatch[1]) {
    const rawBrandName = brandNameMatch[1]

    // 排除工具檔案，例如 createBrandDefinitions.ts
    if (rawBrandName === 'createBrandDefinitions') continue

    const brandName = rawBrandName as Brand

    // 驗證品牌是否在 ALL_BRANDS 名單中
    if (ALL_BRANDS.includes(brandName) && moduleExports) {
      // 加入頂層路徑（主品牌時使用）
      allBrandTopLevelPaths[brandName] = moduleExports.topLevelPathsAsMainBrand || []

      // 加入 navbar 設定
      brandNavbars[brandName] = moduleExports.navbarConfig || []

      // 加入手動路由
      if (moduleExports.routes) {
        const prefixedRoutes = moduleExports.routes.map((route) => {
          const needPrefix =
            brandName !== MAIN_BRAND_NAME &&
            !route.path.startsWith(`/${brandName}`) &&
            route.path !== '/'

          return needPrefix
            ? {
                ...route,
                path: `/${brandName}${route.path}`,
                name: route.name ? `${brandName}-${String(route.name)}` : undefined,
              }
            : route
        })
        allManualBrandRoutes.push(...prefixedRoutes)
      } else {
        console.warn(
          `Brand definition '${brandName}' in '${path}' is missing 'routes'. No manual routes added.`,
        )
      }
    } else if (!moduleExports) {
      console.warn(
        `Brand definition '${brandName}' in '${path}' has no default export or it's not a BrandDefinitions object.`,
      )
    } else {
      console.warn(
        `Found brand definition for '${brandName}' in '${path}', but it's not listed in ALL_BRANDS. Skipping.`,
      )
    }
  }
}

/* ----------------------------------------
 * 確保 'unknown' 品牌仍有預設值（防錯）
 * ---------------------------------------- */
if (!allBrandTopLevelPaths.unknown) allBrandTopLevelPaths.unknown = []
if (!brandNavbars.unknown) brandNavbars.unknown = []

/* ----------------------------------------
 * 將頂層路徑轉為正規表達式，供品牌判斷比對使用
 * ---------------------------------------- */
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

/* ----------------------------------------
 * 組合最終路由表
 * ---------------------------------------- */
const routes: Array<RouteRecordRaw> = [
  ...generatedRoutes, // 自動產生的路由
  ...allManualBrandRoutes, // 各品牌自定義的手動路由
  ...publicErrorRoutes, // 公共錯誤頁（如 brand-not-found）
  {
    path: '/:pathMatch(.*)*', // 萬用錯誤轉向
    name: 'CatchAll',
    redirect: '/public-errors/brand-not-found',
  },
]
console.log('最終組合的路由表:', routes)
export default routes

/**
 * 取得指定品牌的手動路由
 * @param brand 品牌名稱
 * @returns 該品牌的手動路由陣列
 */
export function getManualRoutesByBrand(brand: Brand): RouteRecordRaw[] {
  return allManualBrandRoutes.filter((route) => {
    // 品牌主路由通常以 /brandName 開頭，或是根路徑（主品牌）
    if (brand === MAIN_BRAND_NAME) {
      // 主品牌的路由不帶品牌前綴
      return !route.path.startsWith('/') || /^\/(?![a-zA-Z0-9_-]+\/)/.test(route.path)
    }
    return route.path.startsWith(`/${brand}`)
  })
}
