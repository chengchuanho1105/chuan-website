<script setup lang="ts">
defineOptions({ name: 'ChuanLife-About' });
</script>

<template>
    <div class="min-h-screen flex flex-col items-center justify-center p-8">
        <h1 class="text-4xl font-bold text-blue-800 mb-4">關於祥銓</h1>
        <p class="text-lg text-blue-600 mb-6 text-center ">
            祥銓生活服務工作室致力於提供優質的網站設計、貼圖代購、3C產品代購和服務，
            為您的生活提供便利與無限可能。
        </p>
        <router-link to="/"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            返回首頁
        </router-link>
    </div>
</template>

<style scoped></style>