<script setup lang="ts">
defineOptions({ name: 'XiangChuan-Layout-Public' });
import Navbar from '@/components/layout/Navbar/Navbar.vue'
</script>

<template>
    <header>
        <Navbar />
    </header>
    <div class="">
        <slot></slot>
    </div>
</template>

<style scoped></style>