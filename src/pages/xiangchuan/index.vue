<script setup lang="ts">
defineOptions({ name: 'XiangChuan-HomePage' });
</script>

<template>
    <div class="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-8">
        <h1 class="text-5xl font-bold text-blue-800 mb-6">祥銓生活服務工作室</h1>
        <p class="text-xl text-blue-600 mb-8">歡迎來到祥銓生活服務工作室官方網站！</p>
        <div class="flex space-x-4">
            <router-link to="/about"
                class="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                關於我們
            </router-link>
            <router-link to="/crazyclown"
                class="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition duration-300">
                前往 Crazy Clown
            </router-link>
        </div>
    </div>
</template>

<style scoped></style>