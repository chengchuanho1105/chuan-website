/**
 * @file src/routes/brand-definitions/[brand].ts
 * @module router/brand-definitions/[brand]
 * @description
 * 定義品牌的頁面配置與導覽列項目，並透過 `createBrandDefinitions` 封裝為標準格式供路由系統使用。
 *
 * - 每筆頁面設定同時對應一個 route 與一個導覽列項目（NavbarItem）
 * - 每個項目包含頁面元件、路徑、導覽列顯示選項、排序等
 * - 可支援 children（巢狀子頁面）
 */
//

import type { Brand } from '@/constants/brands/brands.ts'
import type { NavbarItem } from '@/types/navbar'
import { createBrandDefinitions } from '../../untils/createBrandDefinitions'

/**
 * 品牌名稱：會作為 route name、component path 等的命名基礎
 */
const brandName: Brand = 'crazyclown'

/**
 * 頁面與導覽列設定清單
 *
 * 每個項目會被轉換為：
 * - RouteRecordRaw（用於 vue-router）
 * - 導覽列項目（由 layout 或 navbar 元件使用）
 */
const pageConfigs: NavbarItem[] = [
  {
    text: '首頁',
    path: '/',
    name: `${brandName}-Home`,
    componentLoader: () => import(`@/pages/${brandName}/index.vue`),
    layout: 'public',
    displayInNavbar: true,
    order: 1,
  },
  {
    text: '關於我們',
    path: '/about',
    name: `${brandName}-About`,
    componentLoader: () => import(`@/pages/${brandName}/about.vue`),
    layout: 'public',
    displayInNavbar: true,
    order: 2,
  },
  {
    text: '常見問題',
    path: '/faq',
    name: `${brandName}-FAQ`,
    componentLoader: () => import(`@/pages/${brandName}/faq.vue`),
    layout: 'public',
    displayInNavbar: true,
    order: 4,
  },
  {
    text: '聯絡我們',
    path: '/contact',
    name: `${brandName}-Contact`,
    componentLoader: () => import(`@/pages/${brandName}/contact.vue`),
    layout: 'public',
    displayInNavbar: true,
    order: 5,
  },
]

/**
 * 將品牌名稱與頁面設定轉換為標準格式的品牌定義模組
 * 包含：
 * - topLevelPathsAsMainBrand：主品牌的頂層路徑
 * - brandRoutes：對應的 route 清單
 * - brandName：品牌名稱
 */
export default createBrandDefinitions(brandName, pageConfigs)
