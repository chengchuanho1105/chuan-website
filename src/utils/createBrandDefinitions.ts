/**
 * @file src/routes/utils/createBrandDefinitions.ts
 * @module router/utils/createBrandDefinitions
 * @description
 * 將品牌頁面設定（NavbarItem[]）轉換為標準格式的品牌定義物件：
 * - 頂層路徑列表（topLevelPathsAsMainBrand）
 * - 導覽列設定（navbarConfig）
 * - 對應的 Vue Router 路由（routes）
 */
//

import type { RouteRecordRaw } from 'vue-router'
import type { NavbarItem } from '@/types/navbar'
import type { Brand } from '@/constants/brands/brands'

/**
 * 品牌定義資料結構
 *
 * @property topLevelPathsAsMainBrand - 該品牌作為主品牌時的頂層路徑清單（供正規表達式比對）
 * @property navbarConfig - 可用於導覽列渲染的項目設定
 * @property routes - 對應的 Vue Router 路由清單
 */
export interface BrandDefinitions {
  topLevelPathsAsMainBrand: string[]
  navbarConfig: NavbarItem[]
  routes: RouteRecordRaw[]
}

/**
 * 將品牌名稱與頁面設定轉換為標準化品牌定義物件
 *
 * @param {Brand} brandName - 品牌名稱（如 'chuanlife', 'crazyclown'）
 * @param {NavbarItem[]} pageConfigs - 該品牌的頁面與導覽列設定
 * @returns {BrandDefinitions} 組合後的品牌定義物件，包含頂層路徑、路由與 navbar 配置
 */
export function createBrandDefinitions(
  brandName: Brand,
  pageConfigs: NavbarItem[],
): BrandDefinitions {
  // --------------------------------------------------
  // 頂層路徑定義：去除重複的 path，供 brand path 判斷使用
  // --------------------------------------------------
  const topLevelPathsAsMainBrand = pageConfigs
    .map((item) => item.path)
    .flat(Infinity)
    .filter((path, index, self) => self.indexOf(path) === index)

  // --------------------------------------------------
  // 導覽列設定：去除與路由無關的欄位（componentLoader、layout）
  // --------------------------------------------------
  const navbarConfig: NavbarItem[] = pageConfigs.map(
    ({ componentLoader: _componentLoader, layout: _layout, ...rest }) => ({
      ...rest,
    }),
  )

  // --------------------------------------------------
  // 路由定義：根據 pageConfigs 遞迴產生 RouteRecordRaw 陣列
  // --------------------------------------------------
  function generateRoutes(configs: NavbarItem[]): RouteRecordRaw[] {
    const routes: RouteRecordRaw[] = []
    configs.forEach((config) => {
      if (config.componentLoader && config.path && config.name) {
        const route: RouteRecordRaw = {
          path: config.path,
          name: config.name,
          component: config.componentLoader,
          meta: {
            brand: brandName,
            layout: config.layout || 'public',
          },
        }
        if (config.children && config.children.length > 0) {
          ;(route as RouteRecordRaw & { children?: RouteRecordRaw[] }).children = generateRoutes(
            config.children,
          )
        }
        routes.push(route)
      }
    })
    return routes
  }
  const routes: RouteRecordRaw[] = generateRoutes(pageConfigs)

  // 回傳標準格式品牌定義
  return {
    topLevelPathsAsMainBrand,
    navbarConfig,
    routes,
  }
}
