<script setup lang="ts">
defineOptions({ name: 'ChuanLife-HomePage' });

import heroImg1 from '@/assets/media/chuanlife/logo.png'

function scrollTo(where: string) {
  const target = document.querySelector(where)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

type Partner = {
  name: string,
  url: string,
  logo: string,
}

const partners = [
  {
    name: 'Crazy Clown',
    url: 'https://chuan.life/crazyclown',
    logo: '/assets/media/partners/crazyclown/logo.png',
  },
  {
    name: '源品香企業行',
    url: 'https://yuanpinxiang.com',
    logo: '/assets/media/partners/yuanpinxiang/logo.png',
  },
] as Partner[]

</script>

<template>

  <section id="home-hero">
    <div class="bg-white dark:bg-sky-950 grid h-screen place-content-center">
      <div class="mx-auto w-screen max-w-screen-xl px-5 md:grid md:grid-cols-2 md:items-center md:gap-5">

        <div class="w-full flex items-center justify-center md:h-[70svh] mb-10 md:mb-0 rounded-xl" data-aos="zoom-in">
          <img class="rounded-xl" :src="heroImg1" alt="">
        </div>

        <div class="max-w-prose text-left" data-aos="zoom-in">
          <h3 class="font-bold text-gray-800 dark:text-gray-400 sm:text-5xl">
            <span class="text-4xl text-sky-800 dark:text-gray-100">Happy~ 服務用心・品質至上</span> <br>
            <span class="text-5xl text-sky-800 dark:text-gray-100">銓生活服務！</span>
            <span class="text-5xl text-gray-800 dark:text-gray-300">與您同在</span>
          </h3>

          <p class="mt-4 text-xl text-pretty text-gray-700 dark:text-gray-300">
            <strong class="text-sky-700 dark:text-gray-100">專注每個細節，打造專屬於你的理想服務！</strong><br>
            從品質感生活到數位科技，用心傾聽每一位客戶的需求，提供客製化且高品質服務。
          </p>

          <div class="mt-4 flex gap-4 sm:mt-6">
            <a class="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-indigo-50 shadow-sm transition-colors hover:bg-indigo-700"
              @click.prevent="scrollTo('#home-about')" href="">
              了解更多
            </a>
            <a class="inline-block rounded border border-sky-200 px-5 py-3 font-medium text-sky-700 dark:text-sky-300 shadow-sm transition-colors hover:bg-sky-50 hover:text-sky-900"
              @click.prevent="scrollTo('#home-partners')" href="">
              合作夥伴
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>

  <section id="home-partners">
    <div class="container mx-auto p-8">

      <section class="my-16">
        <h2 class="text-3xl font-semibold text-center mb-10 text-gray-800">我們的合作夥伴</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <a v-for="partner in partners" :key="partner.name" :href="partner.url" target="_blank"
            rel="noopener noreferrer"
            class="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
            <img :src="partner.logo" :alt="`${partner.name} Logo`" class="h-40 w-auto mb-4 object-contain rounded-xl" />
            <p class="text-lg font-medium text-gray-700 text-center">{{ partner.name }}</p>
          </a>
        </div>

        <div v-if="partners.length === 0" class="text-center text-gray-500 mt-8">
          目前沒有合作夥伴資訊。
        </div>
      </section>

      <p class="text-center text-gray-600 mt-16">
        探索我們的服務，讓生活更美好。
      </p>
    </div>
  </section>

</template>

<style scoped></style>
