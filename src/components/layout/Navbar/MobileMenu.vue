<script setup lang="ts">
defineOptions({ name: 'MobileMenu' });

import { computed, watch, provide } from 'vue';
import type { NavbarItem } from '@/types/navbar';
import MobileMenuItem from './MobileMenuItem.vue';
import MobileMenuActions from './MobileMenuActions.vue'; // 導入 MobileMenuActions 元件
import { useBrandPath } from '@/composables/useBrandPath'; // 導入 useBrandPath composable

const props = defineProps<{
    isOpen: boolean;
    items: NavbarItem[];
}>();

const emit = defineEmits(['close']);

const { getBrandPath } = useBrandPath();
provide('getBrandPath', getBrandPath);

const filteredAndSortedItems = computed(() => {
    return props.items
        .filter(item => item.displayInNavbar !== false)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
});

watch(() => props.isOpen, (newVal) => {
    if (newVal) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

const closeMenu = () => {
    emit('close');
};
</script>

<template>
    <transition enter-active-class="transition ease-out duration-300 transform" enter-from-class="-translate-x-full"
        enter-to-class="translate-x-0" leave-active-class="transition ease-in duration-300 transform"
        leave-from-class="translate-x-0" leave-to-class="-translate-x-full">
        <div v-show="props.isOpen" class="fixed inset-0 z-40 bg-white dark:bg-zinc-900 lg:hidden overflow-y-auto">
            <div class="pt-20 px-2 sm:px-4 py-6">
                <div class="space-y-1">
                    <ul class="space-y-1">
                        <MobileMenuItem v-for="item in filteredAndSortedItems" :key="item.path" :item="item"
                            @close-menu="closeMenu" />
                    </ul>
                </div>

                <hr class="my-4 border-zinc-200 dark:border-zinc-700">

                <MobileMenuActions @close="closeMenu" />
            </div>
        </div>
    </transition>
</template>

<style scoped></style>