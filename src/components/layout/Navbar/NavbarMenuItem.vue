<script setup lang="ts">
import { computed } from 'vue';
import { useBrand } from '@/composables/useBrand';
import { MAIN_BRAND_NAME } from '@/constants/brands/brands';
import type { NavbarItem } from '@/types/navbar';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';

// Props 定義，接收單個導覽列項目
const props = defineProps<{
    item: NavbarItem;
}>();

const { currentBrand } = useBrand();

// 輔助函數：生成品牌前綴路徑
const getBrandPath = (path: string): string => {
    if (currentBrand.value === MAIN_BRAND_NAME || currentBrand.value === 'unknown') {
        return path;
    }
    return `/${currentBrand.value}${path.startsWith('/') ? path : '/' + path}`;
};

// 輔助函數：過濾和排序子項目，確保遞迴調用時子項目也符合條件
const filteredChildren = computed(() => {
    if (!props.item.children) return [];
    return props.item.children
        .filter(child => child.displayInNavbar !== false)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
});

// 是否有可顯示的子菜單
const hasVisibleChildren = computed(() => filteredChildren.value.length > 0);
</script>

<template>
    <li v-if="props.item.displayInNavbar !== false" class="relative">
        <template v-if="hasVisibleChildren">
            <Menu v-slot="{ open }" as="div" class="relative inline-block text-left">
                <MenuButton
                    class="relative space-x-1 group text-base text-gray-800 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-200 transition-colors duration-200">
                    <span class="mr-1" v-if="props.item.icon">
                        {{ props.item.icon }}
                    </span>
                    <span class="font-medium">
                        {{ props.item.text }}
                    </span>
                    <i class="bi bi-chevron-down transform transition-transform duration-200 inline-block"
                        :class="{ 'rotate-180': open }">
                    </i>
                    <span
                        class="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-180 group-hover:w-full">
                    </span>
                </MenuButton>

                <transition enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <MenuItems
                        class="absolute w-35 mt-1 bg-zinc-100 dark:bg-zinc-900 right-0 ring-black/5 rounded-md shadow-lg ring-1 focus:outline-none z-50">
                        <div class="py-1">
                            <MenuItem v-for="child in filteredChildren" :key="child.path" v-slot="{ active }">
                            <router-link :to="getBrandPath(child.path)" :class="[
                                active ? 'bg-zinc-300 dark:bg-zinc-700 text-gray-900 dark:text-gray-100' : '',
                                'block px-4 py-2 text-sm space-x-1 text-gray-900 dark:text-gray-100',
                            ]">
                                <span class="mr-1" v-if="child.icon">
                                    {{ child.icon }}
                                </span>
                                <span>
                                    {{ child.text }}
                                </span>
                            </router-link>
                            </MenuItem>
                        </div>
                    </MenuItems>
                </transition>
            </Menu>
        </template>
        <template v-else>
            <router-link :to="getBrandPath(props.item.path)"
                class="relative space-x-1 group text-base text-gray-800 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-200 transition-colors duration-200">
                <span class="mr-1" v-if="props.item.icon">
                    {{ props.item.icon }}
                </span>
                <span class="font-medium">
                    {{ props.item.text }}
                </span>
                <span
                    class="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-180 group-hover:w-full">
                </span>
            </router-link>
        </template>
    </li>
</template>

<style scoped></style>