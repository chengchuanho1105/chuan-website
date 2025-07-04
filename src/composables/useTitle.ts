// src/composables/useTitle.ts
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export function useTitle() {
  const route = useRoute()
  const title = ref('')
  const defaultTitle = ''

  console.log('useTitle 內部 - 當前路由物件:', route)
  console.log('useTitle 內部 - 當前路由 meta:', route.meta)

  const updateTitle = () => {
    // 優先從路由的 meta.title 取得標題
    if (route.meta && route.meta.title) {
      title.value = route.meta.title as string
    } else {
      // 如果路由 meta 中沒有定義 title，則使用預設標題
      title.value = defaultTitle
    }
    // 更新網頁標題
    document.title = title.value
  }

  // 元件載入時設定一次標題
  onMounted(() => {
    updateTitle()
  })

  // 監聽路由路徑變化，當路徑改變時更新標題
  watch(
    () => route.path,
    () => {
      updateTitle()
    },
  )

  return { title }
}
