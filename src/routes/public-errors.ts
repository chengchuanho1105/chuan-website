// routes/public-errors.ts
import type { RouteRecordRaw } from 'vue-router'

const publicErrorRoutes: Array<RouteRecordRaw> = [
  {
    path: '/public-errors/brand-not-found',
    name: 'BrandNotFound',
    component: () => import('@/pages/public/errors/brand-not-found.vue'),
    meta: {
      layout: 'error', // 錯誤頁面通常是獨立的 layout
    },
  },
  // 全局 404 頁面，處理所有未匹配的路徑
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/public/errors/brand-not-found.vue'), // 預設導向品牌不存在，或更通用的 404
    meta: {
      layout: 'error',
      // 可添加邏輯判斷是否導向品牌專屬 404 或通用 404
    },
  },
  // 如果您需要更細緻的 403, 500 錯誤，也可以在這裡定義
  // {
  //   path: '/public-errors/403',
  //   name: 'Forbidden',
  //   component: () => import('@/pages/public-errors/403.vue'),
  //   meta: { layout: 'error' },
  // },
]

export default publicErrorRoutes
