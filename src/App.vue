<script setup lang="ts">
import { ref, watch } from 'vue'; // <--- 將 'watch' 加入這裡
import { useLayoutLoader } from '@/composables/useLayoutLoader.ts'; // 引入新的佈局載入模組
import { useBrandSeo } from '@/composables/useBrandSeo.ts'; // 引入新的 SEO 模組

// 初始化佈局載入器
const { currentLayoutComponent, isLayoutLoading } = useLayoutLoader();

// 初始化品牌 SEO
useBrandSeo();

// 將 isBrandResolved 的邏輯合併到 isLayoutLoading，因為佈局載入完成就意味著品牌相關的解析也完成
// isBrandResolved 在此處已無必要獨立存在，可移除或根據實際需求調整
// 為了保持與原程式碼的行為一致，這裡我們讓 isBrandResolved 依賴於 isLayoutLoading
const isBrandResolved = ref(false);
// 當佈局載入完成，就認為品牌解析完成
watch(isLayoutLoading, (newValue) => {
  if (!newValue) {
    isBrandResolved.value = true;
  }
}, { immediate: true }); // 立即執行一次以處理初始狀態

</script>

<template>
  <div v-if="isLayoutLoading || !currentLayoutComponent"
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
