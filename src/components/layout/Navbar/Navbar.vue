<script setup lang="ts">
defineOptions({ name: 'AppNavbar' });

// 確保 ref, computed, onMounted 都已從 'vue' 導入
import { ref, computed, onMounted } from 'vue';
import { useBrand } from '@/composables/useBrand';
import { brandNavbars } from '@/routes/index';

import NavbarBrand from './Brand.vue';
import NavbarLinks from './Links.vue';
import NavbarActions from './Actions.vue';
import MobileMenu from './MobileMenu.vue';

const { currentBrand } = useBrand();

const navbarItemsData = computed(() => {
    const items = brandNavbars[currentBrand.value];
    return items || [];
});

const isScrolled = ref(false)
onMounted(() => {
    window.addEventListener('scroll', () => {
        isScrolled.value = window.scrollY > 5
    })
})

const isMobileMenuOpen = ref(false);
const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<template>
    <nav :class="['fixed top-0 w-full z-50 transition-all duration-500 shadow-lg',
        isScrolled ? 'backdrop-blur-lg bg-white/95 dark:bg-black/95' : 'bg-white/50 dark:bg-black/50']">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-14">
                <NavbarBrand :current-brand="currentBrand" />

                <NavbarLinks :items="navbarItemsData" class="hidden lg:flex" />

                <div class="flex items-center">
                    <NavbarActions class="hidden lg:flex" />
                    <button @click="toggleMobileMenu"
                        class="lg:hidden p-2 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 ml-4">
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <MobileMenu :isOpen="isMobileMenuOpen" :items="navbarItemsData" @close="toggleMobileMenu" />
</template>

<style scoped></style>