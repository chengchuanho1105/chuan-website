// src/composables/useBrandConfig.ts

import { ref, watchEffect } from 'vue'
import type { Ref } from 'vue'
import type { Brand, DetailedBrandConfig } from '@/constants/brands/brands'

export function useBrandConfig(brand: Brand): {
  config: Ref<DetailedBrandConfig>
  isLoading: Ref<boolean>
  error: Ref<unknown>
} {
  const config = ref<DetailedBrandConfig>(undefined as unknown as DetailedBrandConfig)
  const isLoading = ref(true)
  const error = ref<unknown>(null)

  watchEffect(async () => {
    isLoading.value = true
    error.value = null
    try {
      // 動態導入品牌設定檔
      const module = await import(`@/constants/brands/brandConfigs/${brand}.ts`)

      // 統一使用 `${brand}Config` 命名規則
      const brandConfig = module[`${brand}Config`] as DetailedBrandConfig | undefined

      if (!brandConfig) {
        throw new Error(`Config for brand '${brand}' not found in its module.`)
      }

      config.value = brandConfig
    } catch (e) {
      error.value = e
      console.error(`Failed to load config for brand '${brand}':`, e)

      // 載入 fallback：unknownConfig
      try {
        const fallback = await import('@/constants/brands/brandConfigs/unknown.ts')
        config.value = fallback.unknownConfig
      } catch (fallbackError) {
        console.error('Failed to load unknownConfig as fallback:', fallbackError)
      }
    } finally {
      isLoading.value = false
    }
  })

  return { config, isLoading, error }
}
