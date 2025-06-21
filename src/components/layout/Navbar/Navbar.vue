<script setup lang="ts">
defineOptions({ name: 'AppNavbar' });

import { ref, computed, onMounted } from 'vue';
import { useBrand } from '@/composables/useBrand';
import { brandNavbars } from '@/routes/index';

import NavbarBrand from './Brand.vue';
import NavbarLinks from './Links.vue';
import NavbarActions from './Actions.vue';

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

</script>

<template>
    <nav :class="['fixed top-0 w-full z-50 transition-all duration-500 shadow-lg',
        isScrolled ? 'backdrop-blur-lg bg-white/95 dark:bg-black/95' : 'bg-white/50 dark:bg-black/50']">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="lg:flex justify-between items-center h-14">
                <NavbarBrand :current-brand="currentBrand" />

                <NavbarLinks :items="navbarItemsData" />

                <NavbarActions />
            </div>
        </div>
    </nav>
</template>

<style scoped></style>