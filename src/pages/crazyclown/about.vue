<script setup lang="ts">
defineOptions({ name: 'CrazyClown-About' });
</script>

<template>
    <div class="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8 text-white">
        <h1 class="text-4xl font-bold text-red-500 mb-4">關於 Crazy Clown 戰隊</h1>
        <p class="text-lg text-gray-400 mb-6 text-center max-w-2xl">
            Crazy Clown 是一支專注於 PUBG 遊戲的精英戰隊，我們追求卓越，享受團隊合作的樂趣。
            無論是競技對抗還是休閒娛樂，我們都致力於提供最佳的遊戲體驗。
        </p>
        <router-link to="/crazyclown"
            class="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-300">
            返回 Crazy Clown 首頁
        </router-link>
    </div>
</template>

<style scoped></style>