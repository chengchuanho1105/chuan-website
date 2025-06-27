// composables/useBrand.ts
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router' // 這裡引入是為了類型提示和在需要時使用

// 匯入「品牌名稱清單 {ALL_BRANDS}」、「主品牌{MAIN_BRAND_NAME}」、「品牌型別Brand」
import { ALL_BRANDS, MAIN_BRAND_NAME } from '@/constants/brands/brands.ts'
import type { Brand } from '@/constants/brands/brands.ts'

const _currentBrand = ref<Brand>('unknown') // 使用內部變數來存儲品牌狀態

export function useBrand() {
  // 注意：useRoute() 不在檔案頂層直接呼叫
  // 它應該在組件的 setup() 或路由守衛中被呼叫

  // 根據路徑判斷品牌的核心邏輯
  const detectBrandFromPath = (path: string): Brand => {
    if (path === '/') {
      // 主品牌根路徑
      return MAIN_BRAND_NAME
    }

    // 檢查子品牌路徑
    for (const brand of ALL_BRANDS) {
      if (brand === MAIN_BRAND_NAME) continue
      if (path.startsWith(`/${brand}`)) {
        return brand
      }
    }

    // 這裡我們暫時不依賴 route.meta.brand，因為 detectBrandFromPath
    // 通常會在路由守衛中，此時 route.meta 可能還不完整或不穩定。
    // 品牌資訊主要從 URL 路徑獲取。
    return 'unknown'
  }

  return {
    // 暴露 computed 屬性供組件使用
    currentBrand: computed(() => _currentBrand.value),

    // 暴露一個方法來設定品牌，供路由守衛呼叫
    setBrand: (brand: Brand) => {
      _currentBrand.value = brand
      // console.log('當前品牌已設定為:', brand)
    },

    // 暴露核心的偵測邏輯，供外部（如路由守衛）使用
    detectBrandFromPath,

    // 這裡提供一個方法讓組件內或需要時獲取當前路由的品牌
    // 但請注意：這個方法內部調用 useRoute()，它必須在 setup() 範圍內
    getBrandFromCurrentRoute: () => {
      // 只有當這個方法被呼叫時，useRoute() 才被執行
      try {
        const route = useRoute()
        const brand = detectBrandFromPath(route.path)
        // _currentBrand.value = brand; // 這裡也可以更新內部狀態，但通常由路由守衛負責
        return brand
      } catch (e) {
        console.error('Error calling useRoute in getBrandFromCurrentRoute:', e)
        return 'unknown'
      }
    },
  }
}
