<script setup lang="ts">
defineOptions({ name: 'NavbarBrand' });

import { computed } from 'vue';
import type { Brand } from '@/constants/brands/brands.ts';
import { MAIN_BRAND_NAME } from '@/constants/brands/brands.ts';
import { useBrandConfig } from '@/composables/useBrandConfig';

// 接收當前品牌名稱
const { currentBrand } = defineProps<{
  currentBrand: Brand;
}>();

// 使用 useBrandConfig 獲取品牌配置
const { config: currentBrandConfig, isLoading, error } = useBrandConfig(currentBrand);

// 根據需求選擇顯示的名稱
const displayName = computed(() => currentBrandConfig.value?.shortName || '載入中...');
const logoPath = computed(() => currentBrandConfig.value?.logoPath || '/logos/default-logo.svg');
</script>

<template>
  <div class="flex-shrink-0 flex items-center">
    <router-link :to="currentBrand === MAIN_BRAND_NAME ? '/' : `/${currentBrand}`" class="flex items-center space-x-2">

      <template v-if="isLoading">
        <div class="h-7 w-7 bg-gray-200 animate-pulse mr-2 rounded-full"></div>
        <span class="w-24 h-6 bg-gray-200 animate-pulse rounded"></span>
      </template>

      <template v-else-if="error">
        <span class="text-red-500 mr-2">!</span>
        <span>錯誤</span>
      </template>

      <template v-else>
        <img :src="logoPath" :alt="`${displayName} Logo`" class="w-7 h-7 rounded-md object-contain" />
        <span class="text-lg font-bold text-gray-900 dark:text-gray-100">{{ displayName }}</span>
      </template>

    </router-link>
  </div>
</template>

<style scoped></style>