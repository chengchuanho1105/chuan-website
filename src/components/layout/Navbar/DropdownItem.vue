<script setup lang="ts">
import { MenuItem } from '@headlessui/vue';
import { defineProps } from 'vue';

const props = defineProps({
  // 讓元件可以是 <div>, <a>, <router-link> 等
  tag: {
    type: String,
    default: 'div'
  },
  href: {
    type: String,
    default: '#'
  },
  onClick: {
    type: Function,
    default: () => { }
  }
});
</script>

<template>
  <MenuItem v-slot="{ active }">
  <component :is="props.tag" :href="props.href" @click="props.onClick" :class="[
    // 保留現有的 active/hover 狀態背景和文字顏色，與 Navbar 中的其他連結 hover 狀態保持風格一致
    active ? 'bg-zinc-300 dark:bg-zinc-700 text-gray-900 dark:text-gray-100' : '',
    // 預設文字顏色
    'block px-4 py-1 text-base space-x-1 text-gray-800 dark:text-gray-200',
    // 添加圓角以匹配下拉選單的圓角
    'rounded-md'
  ]">
    <slot></slot>
  </component>
  </MenuItem>
</template>