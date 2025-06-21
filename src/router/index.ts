import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/routes'
import { brandGuard } from './guards.ts' // 匯入品牌守衛

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// 添加全局前置守衛
router.beforeEach(brandGuard)
// router.beforeEach(authGuard); // 如果有權限守衛，也可以在這裡添加

export default router
