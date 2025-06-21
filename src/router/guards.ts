// Router/guards.ts
import type { NavigationGuard } from 'vue-router'
import { getBrandFromPath } from './helpers'
import { useBrand } from '@/composables/useBrand'

// 品牌守衛
export const brandGuard: NavigationGuard = (to, from, next) => {
  // 在守衛內部呼叫 useBrand()，因為這裡提供了 Vue 的上下文環境
  const { setBrand } = useBrand()

  const detectedBrand = getBrandFromPath(to.path)

  // 設定當前品牌到 composable 中
  setBrand(detectedBrand) // 確保在處理前設定好品牌

  if (detectedBrand === 'unknown' && to.name !== 'BrandNotFound') {
    // 如果品牌無法識別，且目前不在品牌不存在頁面，則導向品牌不存在頁面
    // console.warn(`未識別的品牌路徑: ${to.path}. 導向品牌不存在頁面.`)
    return next({ name: 'BrandNotFound' })
  }

  // console.log(`品牌識別成功: ${detectedBrand}. 繼續導航到 ${to.path}`)

  // 繼續路由導航
  next()
}

// 您可以在這裡添加其他守衛，例如權限守衛
// export const authGuard: NavigationGuard = (to, from, next) => { /* ... */ };
