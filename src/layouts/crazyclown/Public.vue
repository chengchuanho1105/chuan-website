<script setup lang="ts">
defineOptions({ name: 'CrazyClown-Layout-Public' });
import Navbar from '@/components/layout/Navbar/Navbar.vue'
</script>

<template>
    <header>
        <Navbar />
    </header>
    <div class="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <slot></slot>
    </div>
</template>

<style scoped></style>