//
/**
 * @file /src/routes/brand-definitions/crazyclown.ts
 * @module router/brand-definitions/crazyclown
 * @description
 * 定義品牌的頂層主品牌路徑與靜態手動路由（補充 vite-plugin-pages 結果）。
 *
 * 這個模組會被動態載入並參與頂層路徑比對，用於：
 * - 自動品牌判斷（router/helpers.ts 中）
 * - 生成正規表達式（routes/index.ts 中）
 *
 * 注意：這些手動定義的路由大多數情況會由 vite-plugin-pages 自動產生。
 * 本模組主要提供頂層路徑邏輯參考，僅在特殊情況下需要手動定義完整路由。
 */
//

import type { RouteRecordRaw } from 'vue-router'

// 導入基礎 NavbarItem 類型
import type { NavbarItem } from '@/types/navbar'

const brandName = 'crazyclown'

// 定義所有頁面的通用配置
// 這將是所有路由和導覽列資訊的單一來源
const crazyclownPageConfigs: NavbarItem[] = [
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

/* ---------------------------------------
 * 頂層路徑定義（主品牌模式時的對應路徑）
 - 這些將被轉換為 RegExp 用於主品牌判斷（如 getBrandFromPath）
 * 從 crazyclownPageConfigs 中提取
 * --------------------------------------- */

export const topLevelPathsAsMainBrand = crazyclownPageConfigs
  .map((item) => item.path)
  .flat(Infinity) // 攤平所有巢狀路徑，如果子項目有獨立的頂層路徑需求
  .filter((path, index, self) => self.indexOf(path) === index)
//

/* ---------------------------------------
 * 導覽列資料定義
 * 直接匯出 crazyclownPageConfigs 作為導覽列資料，不包含 componentLoader 和 layout 屬性
 * 導覽列資料將是 crazyclownPageConfigs 的子集，不包含路由配置相關的屬性
 * --------------------------------------- */
export const navbarConfig: NavbarItem[] = crazyclownPageConfigs.map(
  ({ componentLoader, layout, ...rest }) => ({ ...rest }),
)
//

/* ---------------------------------------
 * 路由定義（品牌的實際路由）
 * 從 crazyclownPageConfigs 中動態生成
 * --------------------------------------- */
// 輔助函式：遞迴生成路由
function generateRoutes(configs: NavbarItem[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  configs.forEach((config) => {
    if (config.componentLoader && config.path && config.name) {
      const route: RouteRecordRaw = {
        path: config.path,
        name: config.name,
        component: config.componentLoader,
        meta: {
          brand: brandName, // 品牌固定為 'crazyclown'
          layout: config.layout || 'public', // 如果沒有定義佈局，預設為 public
        },
      }

      // 檢查並處理動態參數，使其與 vite-plugin-pages 的行為更一致，
      // 如果路由是如 `/product/:id` 這樣的，Vue Router 會自動處理。
      // 這裡主要確保路由結構正確。

      if (config.children && config.children.length > 0) {
        // 如果子路由的路徑是相對的，Vue Router 會自動處理
        const childrenRoutes = generateRoutes(config.children)
        if (childrenRoutes.length > 0) {
          ;(route as unknown as RouteRecordRaw & { children: RouteRecordRaw[] }).children =
            childrenRoutes // 遞迴處理子路由
        }
      }
      routes.push(route)
    } else if (config.children && config.children.length > 0) {
      // 如果父節點本身沒有 componentLoader 但有子路由（例如只是個菜單分類），
      // 可以創建一個沒有 component 的父路由，或者直接將子路由拉平。
      // 在此範例中，我們會嘗試將子路由附加到父路由的 children 中。
      // 如果父路由沒有 component 且 path 為空，可以考慮作為一個抽象路由。
      // 但為了簡化，這裡假設所有有子路由的父級都有自己的 component。
      // 如果您的父路由純粹只是個導覽群組，沒有實際頁面，則可以調整。
      // 例如： routes.push(...generateRoutes(config.children));
    }
  })
  return routes
}
export const crazyclownRoutes: RouteRecordRaw[] = generateRoutes(crazyclownPageConfigs)

export default crazyclownRoutes
