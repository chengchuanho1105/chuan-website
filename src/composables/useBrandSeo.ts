// src/composables/useBrandSeo.ts
import { watchEffect, ref } from 'vue' // 引入 ref
import { useHead } from '@unhead/vue'
import { useBrand } from '@/composables/useBrand.ts'

export function useBrandSeo() {
  const { currentBrand } = useBrand()

  // 創建一個響應式的 ref 來保存最終的 SEO 配置
  interface SeoConfig {
    title: string
    meta: Array<{ name: string; content: string }>
    link: Array<Record<string, string>>
  }

  const seoConfig = ref<SeoConfig>({
    title: '載入中...',
    meta: [{ name: 'description', content: '正在載入網站內容...' }],
    link: [],
  })

  // 在 useHead 中直接使用這個響應式的 ref
  useHead(seoConfig) // <--- 同步調用 useHead，傳入一個響應式對象

  // 使用 watchEffect 來觀察 currentBrand 的變化並異步載入新的 SEO 配置
  watchEffect(async () => {
    let brandName = currentBrand.value

    if (brandName === 'unknown') {
      brandName = 'unknown' // 假設你有一個 default.ts 的 SEO 配置
    }

    try {
      // 動態導入 SEO 配置
      const module = await import(`@/brands/seo/${brandName}.ts`) // 注意路徑：假設別名設置正確
      seoConfig.value = module.seo // 更新響應式的 SEO 配置
    } catch (error) {
      console.warn(
        `Failed to load SEO for brand "${brandName}", falling back to default SEO.`,
        error,
      )
      // 如果特定品牌的 SEO 檔案不存在或載入失敗，嘗試載入 default 的 SEO
      try {
        const defaultModule = await import('@/brands/seo/unknown.ts') // 嘗試載入 default SEO
        seoConfig.value = defaultModule.seo
      } catch (defaultError) {
        console.error('Failed to load default SEO configuration:', defaultError)
        // 最終 fallback 到一個空的或預設的 SEO 設定
        seoConfig.value = {
          title: '網站載入中...',
          meta: [{ name: 'description', content: '網站內容載入中...' }],
          link: [],
        }
      }
    }
  })
}
