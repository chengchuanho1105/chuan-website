<script setup lang="ts">
defineOptions({ name: 'MobileMenuItem' });

import { computed } from 'vue';
import type { NavbarItem } from '@/types/navbar';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';

const props = defineProps<{
    item: NavbarItem;
    // 傳遞 getBrandPath 函數，以確保路由正確處理品牌前綴
    getBrandPath: (path: string) => string;
}>();

const emit = defineEmits(['close-menu']);

// 輔助函數：過濾和排序子項目，確保遞迴調用時子項目也符合條件
const filteredChildren = computed(() => {
    if (!props.item.children) return [];
    return props.item.children
        .filter(child => child.displayInNavbar !== false)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
});

// 是否有可顯示的子菜單
const hasVisibleChildren = computed(() => filteredChildren.value.length > 0);

// 處理點擊導覽項目時關閉菜單
const handleItemClick = () => {
    if (!hasVisibleChildren.value) { // 只有當沒有子菜單時才關閉主菜單
        emit('close-menu');
    }
};
</script>

<template>
    <li v-if="props.item.displayInNavbar !== false">
        <template v-if="hasVisibleChildren">
            <Disclosure v-slot="{ open }">
                <DisclosureButton
                    class="flex justify-between items-center w-full px-4 py-2 text-left text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                    <span class="flex items-center space-x-2">
                        <span v-if="props.item.icon">{{ props.item.icon }}</span>
                        <span>{{ props.item.text }}</span>
                    </span>
                    <i class="bi bi-chevron-down transform transition-transform duration-200"
                        :class="{ 'rotate-180': open }"></i>
                </DisclosureButton>
                <transition enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <DisclosurePanel class="ml-4 mt-2 space-y-2">
                        <router-link v-for="child in filteredChildren" :key="child.path" :to="getBrandPath(child.path)"
                            @click="emit('close-menu')"
                            class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                            <span class="flex items-center space-x-2">
                                <span v-if="child.icon">{{ child.icon }}</span>
                                <span>{{ child.text }}</span>
                            </span>
                        </router-link>
                    </DisclosurePanel>
                </transition>
            </Disclosure>
        </template>
        <template v-else>
            <router-link :to="getBrandPath(props.item.path)" @click="handleItemClick"
                class="block px-4 py-2 text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                <span class="flex items-center space-x-2">
                    <span v-if="props.item.icon">{{ props.item.icon }}</span>
                    <span>{{ props.item.text }}</span>
                </span>
            </router-link>
        </template>
    </li>
</template>

<style scoped></style>