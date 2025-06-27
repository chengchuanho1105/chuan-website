// src/composables/useBrandPath.ts
import { useBrand } from './useBrand'
import { MAIN_BRAND_NAME } from '@/constants/brands/brands'
import type { GetBrandPath } from '@/types/navbar'

export function useBrandPath() {
  const { currentBrand } = useBrand()

  /**
   * 輔助函數：生成品牌前綴路徑。
   * 如果當前品牌是主要品牌或未知品牌，則返回原始路徑；
   * 否則，返回帶有品牌前綴的路徑。
   * @param path 原始路徑
   * @returns 帶有品牌前綴的路徑或原始路徑
   */
  const getBrandPath: GetBrandPath = (path: string): string => {
    if (currentBrand.value === MAIN_BRAND_NAME || currentBrand.value === 'unknown') {
      return path
    }
    return `/${currentBrand.value}${path.startsWith('/') ? path : '/' + path}`
  }

  return {
    getBrandPath,
  }
}
