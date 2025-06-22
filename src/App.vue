<script setup lang="ts">
import { ref, watch, onMounted, markRaw, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useBrand } from '@/composables/useBrand';
import type { Brand } from '@/constants/brands/brands.ts';
import { ALL_BRANDS } from '@/constants/brands/brands.ts'; // 導入 ALL_BRANDS 列表

// 定義佈局組件的類型和結構
type LayoutType = 'public' | 'admin' | 'user';

// 更精確的類型定義
type LayoutComponentLoader = () => Promise<{ default: ReturnType<typeof defineComponent> }>;

// 佈局組件的動態導入映射表
// 這個物件將在 setup 函數中動態填充
const dynamicLayoutLoaders: Partial<Record<Brand | 'default' | 'unknown', Record<LayoutType, LayoutComponentLoader>>> = {};

// 獲取所有品牌資料夾下的佈局檔案
// eager: true 表示在構建時就加載所有匹配的模塊
// as 'raw' 表示將模塊內容作為字符串加載 (通常用於文檔，這裡不需要，我們需要的是模塊本身)
// 我們將使用更細緻的 glob 模式來收集每個佈局類型
const publicLayouts = import.meta.glob('@/layouts/*/Public.vue');
const adminLayouts = import.meta.glob('@/layouts/*/Admin.vue');
const userLayouts = import.meta.glob('@/layouts/*/User.vue');

// 遍歷 ALL_BRANDS 列表，動態填充 dynamicLayoutLoaders
ALL_BRANDS.forEach(brandName => {
  // 將 'unknown' 品牌直接指向 'default' 佈局
  const effectiveBrandName = brandName === 'unknown' ? 'default' : brandName;

  dynamicLayoutLoaders[brandName] = {
    public: publicLayouts[`/src/layouts/${effectiveBrandName}/Public.vue`] as LayoutComponentLoader || publicLayouts[`/src/layouts/default/Public.vue`] as LayoutComponentLoader,
    admin: adminLayouts[`/src/layouts/${effectiveBrandName}/Admin.vue`] as LayoutComponentLoader || adminLayouts[`/src/layouts/default/Admin.vue`] as LayoutComponentLoader,
    user: userLayouts[`/src/layouts/${effectiveBrandName}/User.vue`] as LayoutComponentLoader || userLayouts[`/src/layouts/default/User.vue`] as LayoutComponentLoader,
  };
});

// 確保 'default' 佈局存在，以防 ALL_BRANDS 中沒有 'default' 或作為 fallback
// 直接定義 default 佈局的載入器
dynamicLayoutLoaders.default = {
  public: publicLayouts['/src/layouts/default/Public.vue'] as LayoutComponentLoader,
  admin: adminLayouts['/src/layouts/default/Admin.vue'] as LayoutComponentLoader,
  user: userLayouts['/src/layouts/default/User.vue'] as LayoutComponentLoader,
};

const route = useRoute();
const { currentBrand } = useBrand();

const isBrandResolved = ref(false);
const currentLayoutComponent = ref<ReturnType<typeof defineComponent> | null>(null);

const loadLayout = async () => {
  let targetBrandKey: Brand | 'default' = currentBrand.value;
  let targetLayoutType: LayoutType = 'public'; // 預設為 public 佈局

  if (route.meta.layout) {
    const metaLayout = route.meta.layout as string;

    if (['admin', 'user', 'public'].includes(metaLayout)) {
      targetLayoutType = metaLayout as LayoutType;
    } else if (metaLayout === 'error') {
      targetBrandKey = 'default';
      targetLayoutType = 'public';
    }
  }

  // 確保 targetBrandKey 對應到實際存在的佈局鍵
  // 如果某個品牌沒有定義特定佈局，我們會嘗試使用 'default' 佈局
  const brandSpecificLoaders = dynamicLayoutLoaders[targetBrandKey];
  let loader = brandSpecificLoaders?.[targetLayoutType];

  // 如果特定品牌沒有此佈局，或者佈局載入器不存在，則嘗試 fallback 到 default 品牌的相同類型佈局
  if (!loader && targetBrandKey !== 'default') {
    console.warn(`Layout '${targetLayoutType}' not found for brand '${targetBrandKey}'. Attempting to use default brand's layout.`);
    loader = dynamicLayoutLoaders.default?.[targetLayoutType];
  }

  // 如果仍然沒有載入器，或者連 default 品牌的特定類型佈局都不存在，最終 fallback 到 default/public
  if (!loader) {
    console.warn(`Layout '${targetLayoutType}' not found for brand '${targetBrandKey}' or default brand. Falling back to default/public.`);
    loader = dynamicLayoutLoaders.default?.public;
  }

  if (loader) {
    try {
      const module = await loader();
      currentLayoutComponent.value = markRaw(module.default);
    } catch (e) {
      console.error(`Failed to load final layout for brand '${targetBrandKey}' and type '${targetLayoutType}':`, e);
      // 如果最終載入還是失敗，設置為 null 或顯示錯誤組件
      currentLayoutComponent.value = null;
    }
  } else {
    // 最終仍然沒有找到任何可用的佈局
    console.error(`No layout loader found for brand '${targetBrandKey}' and type '${targetLayoutType}', and no fallback available.`);
    currentLayoutComponent.value = null;
  }
};

onMounted(async () => {
  await loadLayout();
  isBrandResolved.value = true;
});

watch([currentBrand, () => route.meta.layout], () => {
  loadLayout();
});
</script>

<template>
  <div v-if="!isBrandResolved || !currentLayoutComponent"
    class="flex items-center justify-center min-h-screen bg-zinc-950 text-white">
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