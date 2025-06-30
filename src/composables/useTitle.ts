// src/composables/useTitle.ts
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import routes from '@/routes/index.ts'

export function useTitle() {
  const route = useRoute()
  const title = ref('')
  const defaultTitle = '銓生活服務工作室 - 品味生活，輕鬆擁有'
  const updateTitle = () => {
    if (route.meta && route.meta.title) {
      title.value = route.meta.title as string
    } else {
      title.value = defaultTitle
    }
    document.title = title.value
  }
  onMounted(() => {
    updateTitle()
  })
  watch(
    () => route.path,
    () => {
      updateTitle()
    },
  )
  return { title }
}
