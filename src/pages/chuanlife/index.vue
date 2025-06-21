<script setup lang="ts">
defineOptions({ name: 'ChuanLife-HomePage' });

import heroImg1 from '@/assets/media/chuanlife/logo.png'

function scrollTo(where: string) {
    const target = document.querySelector(where)
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
    }
}

</script>

<template>
    <section id="home-hero">
        <div class="bg-white dark:bg-sky-950 grid h-screen place-content-center">
            <div class="mx-auto w-screen max-w-screen-xl px-5 md:grid md:grid-cols-2 md:items-center md:gap-5">

                <div class="w-full flex items-center justify-center md:h-[70svh] mb-10 md:mb-0 rounded-xl"
                    data-aos="zoom-in">
                    <img class="rounded-xl" :src="heroImg1" alt="">
                </div>

                <div class="max-w-prose text-left" data-aos="zoom-in">
                    <h3 class="font-bold text-gray-800 dark:text-gray-400 sm:text-5xl">
                        <span class="text-4xl text-sky-800 dark:text-gray-100">服務用心・品質至上</span> <br>
                        <span class="text-5xl text-sky-800 dark:text-gray-100">銓生活服務</span>
                        <span class="text-5xl text-gray-800 dark:text-gray-300">與您同在</span>
                    </h3>

                    <p class="mt-4 text-xl text-pretty text-gray-700 dark:text-gray-300">
                        <strong class="text-sky-700 dark:text-gray-100">專注每個細節，打造專屬於你的理想服務！</strong><br>
                        從品質感生活到數位科技，用心傾聽每一位客戶的需求，提供客製化且高品質服務。
                    </p>

                    <div class="mt-4 flex gap-4 sm:mt-6">
                        <a class="inline-block rounded border border-sky-200 px-5 py-3 font-medium text-sky-700 dark:text-sky-300 shadow-sm transition-colors hover:bg-sky-50 hover:text-sky-900"
                            @click.prevent="scrollTo('#home-about')" href="">
                            了解更多
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </section>

</template>

<style scoped></style>