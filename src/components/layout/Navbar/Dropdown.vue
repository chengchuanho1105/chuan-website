<script setup lang="ts">
defineOptions({ name: 'NavbarDropdown' });

import { Menu, MenuButton, MenuItems } from '@headlessui/vue';
import { defineProps } from 'vue';

const props = defineProps({
    // 允許外部設定選單的寬度，預設為 w-auto
    menuWidth: {
        type: String,
        default: 'w-auto'
    }
});
</script>

<template>
    <Menu as="div" class="relative inline-block text-left">
        <MenuButton
            class="flex min-w-9 min-h-9 items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full">
            <div class="text-lg text-black dark:text-white">
                <slot name="button-content"></slot>
            </div>
        </MenuButton>

        <transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <MenuItems
                :class="['absolute mt-1 py-1 bg-zinc-50 dark:bg-zinc-800 right-0 ring-black/5 rounded-xl shadow-lg ring-1 focus:outline-none z-50', props.menuWidth]">
                <slot name="menu-items"></slot>
            </MenuItems>
        </transition>
    </Menu>
</template>