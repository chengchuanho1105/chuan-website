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
    active ? 'bg-zinc-300 dark:bg-zinc-700 text-gray-900 dark:text-gray-100' : '',
    'block px-4 py-1 text-base space-x-1 text-gray-900 dark:text-gray-100 rounded-xl',
  ]">
    <slot></slot>
  </component>
  </MenuItem>
</template>
