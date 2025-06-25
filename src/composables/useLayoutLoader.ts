// src/composables/useLayoutLoader.ts
import { ref, watch, markRaw, defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBrand } from '@/composables/useBrand.ts'
import { ALL_BRANDS } from '@/constants/brands/brands.ts'
import type { Brand } from '@/constants/brands/brands.ts'

// 定義佈局組件的類型和結構
type LayoutType = 'public' | 'admin' | 'user'
type LayoutComponentLoader = () => Promise<{ default: ReturnType<typeof defineComponent> }>

// 佈局組件的動態導入映射表
const dynamicLayoutLoaders: Partial<
  Record<Brand | 'default' | 'unknown', Record<LayoutType, LayoutComponentLoader>>
> = {}

const publicLayouts = import.meta.glob('@/layouts/*/Public.vue')
const adminLayouts = import.meta.glob('@/layouts/*/Admin.vue')
const userLayouts = import.meta.glob('@/layouts/*/User.vue')

ALL_BRANDS.forEach((brandName) => {
  const effectiveBrandName = brandName === 'unknown' ? 'default' : brandName
  dynamicLayoutLoaders[brandName] = {
    public:
      (publicLayouts[`/src/layouts/${effectiveBrandName}/Public.vue`] as LayoutComponentLoader) ||
      (publicLayouts[`/src/layouts/default/Public.vue`] as LayoutComponentLoader),
    admin:
      (adminLayouts[`/src/layouts/${effectiveBrandName}/Admin.vue`] as LayoutComponentLoader) ||
      (adminLayouts[`/src/layouts/default/Admin.vue`] as LayoutComponentLoader),
    user:
      (userLayouts[`/src/layouts/${effectiveBrandName}/User.vue`] as LayoutComponentLoader) ||
      (userLayouts[`/src/layouts/default/User.vue`] as LayoutComponentLoader),
  }
})

dynamicLayoutLoaders.default = {
  public: publicLayouts['/src/layouts/default/Public.vue'] as LayoutComponentLoader,
  admin: adminLayouts['/src/layouts/default/Admin.vue'] as LayoutComponentLoader,
  user: userLayouts['/src/layouts/default/User.vue'] as LayoutComponentLoader,
}

export function useLayoutLoader() {
  const route = useRoute()
  const { currentBrand } = useBrand()

  const currentLayoutComponent = ref<ReturnType<typeof defineComponent> | null>(null)
  const isLayoutLoading = ref(true) // 新增一個狀態來表示佈局是否正在載入

  const loadLayout = async () => {
    isLayoutLoading.value = true
    let targetBrandKey: Brand | 'default' = currentBrand.value
    let targetLayoutType: LayoutType = 'public'

    if (route.meta.layout) {
      const metaLayout = route.meta.layout as string
      if (['admin', 'user', 'public'].includes(metaLayout)) {
        targetLayoutType = metaLayout as LayoutType
      } else if (metaLayout === 'error') {
        targetBrandKey = 'default'
        targetLayoutType = 'public'
      }
    }

    const brandSpecificLoaders = dynamicLayoutLoaders[targetBrandKey]
    let loader = brandSpecificLoaders?.[targetLayoutType]

    if (!loader && targetBrandKey !== 'default') {
      console.warn(
        `Layout '<span class="math-inline">\{targetLayoutType\}' not found for brand '</span>{targetBrandKey}'. Attempting to use default brand's layout.`,
      )
      loader = dynamicLayoutLoaders.default?.[targetLayoutType]
    }

    if (!loader) {
      console.warn(
        `Layout '<span class="math-inline">\{targetLayoutType\}' not found for brand '</span>{targetBrandKey}' or default brand. Falling back to default/public.`,
      )
      loader = dynamicLayoutLoaders.default?.public
    }

    if (loader) {
      try {
        const module = await loader()
        currentLayoutComponent.value = markRaw(module.default)
      } catch (e) {
        console.error(
          `Failed to load final layout for brand '<span class="math-inline">\{targetBrandKey\}' and type '</span>{targetLayoutType}':`,
          e,
        )
        currentLayoutComponent.value = null
      }
    } else {
      console.error(
        `No layout loader found for brand '<span class="math-inline">\{targetBrandKey\}' and type '</span>{targetLayoutType}', and no fallback available.`,
      )
      currentLayoutComponent.value = null
    }
    isLayoutLoading.value = false
  }

  onMounted(() => {
    loadLayout()
  })

  watch([currentBrand, () => route.meta.layout], () => {
    loadLayout()
  })

  return {
    currentLayoutComponent,
    isLayoutLoading,
  }
}
