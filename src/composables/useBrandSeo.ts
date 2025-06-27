// src/composables/useBrandSeo.ts
import { watchEffect, ref } from 'vue'
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
      brandName = 'unknown' // 假設你有一個 unknown.ts 的 SEO 配置
    }

    try {
      // 動態導入 SEO 配置
      const module = await import(`@/brands/seo/${brandName}.ts`)
      seoConfig.value = module.seo
    } catch (error) {
      console.warn(
        `Failed to load SEO for brand "${brandName}", falling back to default SEO.`,
        error,
      )
      // 如果特定品牌的 SEO 檔案不存在或載入失敗，嘗試載入 unknown 的 SEO
      try {
        const defaultModule = await import('@/brands/seo/unknown.ts') // 嘗試載入 unknown SEO
        // Normalize meta to only include objects with 'name' and 'content'
        const normalizedMeta = Array.isArray(defaultModule.seo.meta)
          ? defaultModule.seo.meta
              .filter(
                (m: unknown): m is { name: string; content: string } =>
                  typeof m === 'object' &&
                  m !== null &&
                  typeof (m as { name?: unknown }).name === 'string' &&
                  typeof (m as { content?: unknown }).content === 'string',
              )
              .map((m: { name: string; content: string }) => ({ name: m.name, content: m.content }))
          : []
        // Normalize link to ensure all values are strings and 'type' is always present
        const normalizedLink = Array.isArray(defaultModule.seo.link)
          ? defaultModule.seo.link.map((l: Record<string, unknown>) => {
              const result: Record<string, string> = {}
              Object.keys(l).forEach((key) => {
                // If the value is undefined, set it to an empty string
                result[key] = typeof l[key] === 'string' ? (l[key] as string) : ''
              })
              // Ensure 'type' key exists
              if (!('type' in result)) {
                result['type'] = ''
              }
              return result
            })
          : []
        seoConfig.value = {
          ...defaultModule.seo,
          meta: normalizedMeta,
          link: normalizedLink,
        }
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
