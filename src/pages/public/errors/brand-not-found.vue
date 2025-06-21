<script setup lang="ts">
</script>

<template>
    <div class="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-8 text-center">
        <h1 class="text-6xl font-extrabold text-red-600 mb-4">404</h1>
        <h2 class="text-3xl font-bold mb-6">品牌不存在或路徑錯誤</h2>
        <p class="text-lg text-gray-400 mb-8 max-w-lg">
            您訪問的品牌可能不存在，或者您輸入的網址有誤。
            請確認網址是否正確，或返回主站。
        </p>
        <div class="flex space-x-4">
            <router-link to="/"
                class="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                返回祥銓主站
            </router-link>
            <router-link to="/crazyclown"
                class="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-300">
                前往 Crazy Clown
            </router-link>
        </div>
    </div>
</template>

<style scoped></style>