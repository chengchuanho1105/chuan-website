<script setup lang="ts">
import { ref, watch, onMounted, markRaw, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useBrand } from '@/composables/useBrand';
import type { Brand } from '@/constants/brands/brands.ts'

// 定義佈局組件的類型和結構
type LayoutType = 'public' | 'admin' | 'user';

// 更精確的類型定義
type LayoutComponentLoader = () => Promise<{ default: ReturnType<typeof defineComponent> }>;

// 佈局組件的動態導入映射表
// 這裡的結構是：{ '品牌名稱': { '佈局類型': () => import(...) } }
const layoutLoaders: Record<Brand | 'default', Record<LayoutType, LayoutComponentLoader>> = {
  chuanlife: {
    public: () => import('@/layouts/chuanlife/Public.vue'),
    admin: () => import('@/layouts/chuanlife/Admin.vue'),
    user: () => import('@/layouts/chuanlife/User.vue'),
  },
  crazyclown: {
    public: () => import('@/layouts/crazyclown/Public.vue'),
    admin: () => import('@/layouts/crazyclown/Admin.vue'),
    user: () => import('@/layouts/crazyclown/User.vue'),
  },
  // 預設 (通用/錯誤頁面) 品牌的佈局
  default: {
    public: () => import('@/layouts/default/Public.vue'),
    admin: () => import('@/layouts/default/Admin.vue'),
    user: () => import('@/layouts/default/User.vue'),
  },
  // unknown 品牌 (在 Brand 類型中存在，但實際在 layoutLoaders 中會指向 default)
  unknown: {
    public: () => import('@/layouts/default/Public.vue'),
    admin: () => import('@/layouts/default/Admin.vue'),
    user: () => import('@/layouts/default/User.vue'),
  }
};

const route = useRoute();
const { currentBrand } = useBrand();

const isBrandResolved = ref(false);
const currentLayoutComponent = ref<ReturnType<typeof defineComponent> | null>(null); // 儲存當前動態載入的佈局組件

// 根據路由的 meta 資訊和當前品牌來判斷要載入的佈局
const loadLayout = async () => {
  let targetBrandKey: Brand | 'default' = currentBrand.value;
  let targetLayoutType: LayoutType = 'public'; // 預設為 public 佈局

  // 1. 根據路由 meta.layout 判斷佈局類型
  // 假設 meta.layout 可以是 'admin', 'user', 'public' 或 'error'
  if (route.meta.layout) {
    const metaLayout = route.meta.layout as string; // meta.layout 可以是 string 或 string[]

    if (['admin', 'user', 'public'].includes(metaLayout)) {
      targetLayoutType = metaLayout as LayoutType;
    } else if (metaLayout === 'error') {
      // 如果 meta.layout 是 'error'，則使用 default 品牌的 public 佈局
      targetBrandKey = 'default';
      targetLayoutType = 'public'; // 錯誤頁面通常使用 default/public 佈局
    }
  }

  // 2. 如果品牌是 'unknown'，則使用 'default' 品牌的佈局
  if (targetBrandKey === 'unknown') {
    targetBrandKey = 'default';
  }

  // 3. 獲取對應的佈局載入器
  const brandLayouts = layoutLoaders[targetBrandKey];
  const loader = brandLayouts ? brandLayouts[targetLayoutType] : null;

  if (loader) {
    try {
      const module = await loader();
      currentLayoutComponent.value = markRaw(module.default);
    } catch (e) {
      console.error(`Failed to load layout for brand '${targetBrandKey}' and type '${targetLayoutType}':`, e);
      // 載入失敗時，嘗試載入 default/public 佈局作為 fallback
      try {
        const fallbackModule = await layoutLoaders.default.public();
        currentLayoutComponent.value = markRaw(fallbackModule.default);
        console.warn(`Fallback to default/public layout due to error loading ${targetBrandKey}/${targetLayoutType}.`);
      } catch (fallbackError) {
        console.error('Failed to load fallback default/public layout:', fallbackError);
        currentLayoutComponent.value = null;
      }
    }
  } else {
    // 如果沒有找到指定品牌和佈局類型的載入器，也嘗試 fallback 到 default/public
    console.warn(`No specific layout defined for brand '${targetBrandKey}' and type '${targetLayoutType}'. Attempting fallback to default/public.`);
    try {
      const fallbackModule = await layoutLoaders.default.public();
      currentLayoutComponent.value = markRaw(fallbackModule.default);
    } catch (fallbackError) {
      console.error('Failed to load fallback default/public layout:', fallbackError);
      currentLayoutComponent.value = null;
    }
  }
};

onMounted(async () => {
  await loadLayout(); // 初始載入時調用
  isBrandResolved.value = true;
});

// 監聽品牌和路由元信息變化，重新載入佈局
watch([currentBrand, () => route.meta.layout], () => {
  loadLayout();
});
</script>

<template>
  <div v-if="!isBrandResolved || !currentLayoutComponent"
    class="flex items-center justify-center min-h-screen bg-gray-900 text-white">
    <svg class="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
      </path>
    </svg>
    <span class="ml-3 text-xl">載入中...</span>
  </div>
  <component :is="currentLayoutComponent" v-else>
    <router-view />
  </component>
</template>

<style scoped></style>
