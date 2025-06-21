// src/composables/useBrandConfig.ts

import { ref, watchEffect } from 'vue'
import type { Brand } from '@/constants/brands/brands' // 確保路徑正確

// 定義您的品牌配置類型，這樣就有強類型檢查
export interface DetailedBrandConfig {
  brand: Brand
  fullName: string
  fullNameEn: string
  shortName: string
  shortNameEn: string
  logoPath: string
  companyAddress: string
  contactEmail: string
  // ... 其他公司相關資料
}

// 提供一個預設的未知品牌配置
const DEFAULT_UNKNOWN_CONFIG: DetailedBrandConfig = {
  brand: 'unknown',
  fullName: '未知的品牌',
  fullNameEn: 'Unknown Brand',
  shortName: '未知品牌',
  shortNameEn: 'unknown brand',
  logoPath: '/logos/default-logo.svg',
  companyAddress: '',
  contactEmail: '',
}

export function useBrandConfig(brand: Brand) {
  const config = ref<DetailedBrandConfig>(DEFAULT_UNKNOWN_CONFIG)
  const isLoading = ref(true)
  const error = ref<unknown>(null)

  watchEffect(async () => {
    isLoading.value = true
    error.value = null
    try {
      if (brand === 'unknown') {
        config.value = DEFAULT_UNKNOWN_CONFIG
        return
      }
      // 動態導入路徑
      const module = await import(`../constants/brands/brandConfigs/${brand}.ts`)
      // 根據您的導出方式調整這裡
      // 如果是 export const yourBrandConfig = { ... }
      config.value = module[`${brand}Config`] as DetailedBrandConfig
      if (!config.value) {
        throw new Error(`Config for brand '${brand}' not found in its module.`)
      }
    } catch (e) {
      error.value = e
      console.error(`Failed to load config for brand '${brand}':`, e)
      // Fallback to unknown config if loading fails
      config.value = DEFAULT_UNKNOWN_CONFIG
    } finally {
      isLoading.value = false
    }
  })

  return { config, isLoading, error }
}
