<script setup lang="ts">
defineOptions({ name: 'NavbarDropdown' });
import { computed } from 'vue';
import { Menu, MenuButton, MenuItems } from '@headlessui/vue';
import { defineProps } from 'vue';

const props = defineProps({
    // 允許外部設定選單的寬度，預設為 w-auto
    menuWidth: {
        type: String,
        default: 'w-auto'
    },
    align: {
        type: String,
        default: 'right', // 可選 'left', 'center', 'right'
        validator: (value: string) => ['left', 'center', 'right'].includes(value)
    }
});

// 根據 align prop 計算對應的 CSS 類別
const alignmentClasses = computed(() => {
    if (props.align === 'left') {
        return 'left-0';
    } else if (props.align === 'center') {
        return 'left-1/2 -translate-x-1/2';
    } else {
        return 'right-0';
    }
});
</script>

<template>
    <Menu as="div" class="relative inline-block text-left">
        <MenuButton
            class="flex min-w-9 min-h-9 items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full">
            <div class="w-full h-full flex items-center justify-center text-lg text-black dark:text-white">
                <slot name="button-content"></slot>
            </div>
        </MenuButton>

        <transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <MenuItems :class="[
                'absolute mt-2 origin-top-right',
                // 背景色與 Navbar 相似，使用半透明和模糊效果
                'bg-white/95 dark:bg-black/95 backdrop-blur-lg',
                // 移除邊框，讓陰影來定義邊界
                // 'border border-zinc-200 dark:border-zinc-700', // <-- 移除這行
                // 分隔線顏色保持不變，因為它們是內部元素
                'divide-y divide-zinc-100 dark:divide-zinc-700',
                // 圓角和陰影與 Navbar 保持一致
                'rounded-md shadow-lg', // 確保有 shadow-lg
                'focus:outline-none z-50',
                props.menuWidth,
                alignmentClasses
            ]">
                <slot name="dropdown-content"></slot>
            </MenuItems>
        </transition>
    </Menu>
</template>