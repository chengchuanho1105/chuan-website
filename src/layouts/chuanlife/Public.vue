<script setup lang="ts">
defineOptions({ name: 'ChuanLife-Layout-Public' });
import Navbar from '@/components/layout/Navbar/Navbar.vue'
</script>

<template>
    <header>
        <Navbar />
    </header>
    <main class="min-h-screen bg-sky-50 dark:bg-sky-950">
        <slot></slot>
    </main>
</template>

<style scoped></style>