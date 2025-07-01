<script setup lang="ts">
defineOptions({ name: 'CrazyClown-HomePage' });

import { onMounted } from 'vue'

import SectionDefStyle from '@/components/uiCompo/SectionDefStyle.vue'
import heroImg1 from '@/assets/media/crazyclown/logo.png'

function scrollTo(where: string) {
  const target = document.querySelector(where)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  const hash = window.location.hash
  if (hash) {
    setTimeout(() => {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }, 300)
  }
})

</script>

<template>
  <section id="home-hero">
    <div class="bg-white dark:bg-indigo-950 grid h-screen place-content-center">
      <div class="mx-auto w-screen max-w-screen-xl px-5 md:grid md:grid-cols-2 md:items-center md:gap-5">

        <div class="w-full flex items-center justify-center md:h-[70svh] mb-10 md:mb-0 rounded-xl" data-aos="zoom-in">
          <img class="rounded-xl" :src="heroImg1" alt="">
        </div>

        <div class="max-w-prose text-left" data-aos="zoom-in">
          <h3 class="font-bold text-gray-800 dark:text-gray-400 sm:text-5xl">
            <span class="text-4xl text-indigo-800 dark:text-gray-100">S級戰隊·強者集結</span> <br>
            <span class="text-5xl text-indigo-800 dark:text-gray-100">Crazy_Clown</span>
            <span class="text-5xl text-gray-800 dark:text-gray-300">與您並肩而戰</span>
          </h3>

          <p class="mt-4 text-xl text-pretty text-gray-700 dark:text-gray-300">
            <strong class="text-indigo-700 dark:text-gray-100">PUBG:Crazy_Clown是你最佳的戰友陣線！</strong><br>
            無論你是剛起步的新手，還是久經沙場的老兵，只要你是高活躍玩家，要的就是你！<br>
          </p>

          <div class="mt-4 flex gap-4 sm:mt-6">
            <router-link
              class="inline-block rounded-lg border border-blue-200 px-5 py-3 font-medium text-blue-700 dark:text-blue-300 shadow-sm transition-colors hover:bg-blue-50 hover:text-blue-900"
              to="/crazyclown/joinus" title="加入我們" data-aos="fade-up">
              加入我們
            </router-link>

            <a class="inline-block rounded-lg border border-green-200 px-5 py-3 font-medium text-green-700 dark:text-green-300 shadow-sm transition-colors hover:bg-green-50 hover:text-green-900"
              @click.prevent="scrollTo('#home-event')" href="" data-aos="fade-up">
              最新活動
            </a>

            <a class="inline-block rounded-lg border border-indigo-200 px-5 py-3 font-medium text-indigo-700 dark:text-indigo-300 shadow-sm transition-colors hover:bg-indigo-50 hover:text-indigo-900"
              href=" https://discord.gg/3TEHPZhYUK" data-aos="fade-up">
              Discord 社群
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>

  <div class="max-w-[1024px] container mx-auto p-3">

    <SectionDefStyle id="home-event" mainTitle="最新活動" subTitle="event" slogan="" data-aos="fade-up">
      <div id="event-SummerCampEvent" class="m-5 bg-white rounded-xl">
        <h2 class="pt-5 pb-3 text-3xl">《絕地夏令營》</h2>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSconF3s4pk0ykmLBbL0DmHZIbuyGZfWMsO-GRoG-Athv6fsmg/viewform?embedded=true"
          class="w-full h-[50svh]">載入中…</iframe>
      </div>
      <hr class="mx-3 border-2 border-indigo-500">
      <div id="event-KillChallenge45" class="m-5 bg-white rounded-xl">
        <h2 class="pt-5 pb-3 text-3xl">《第 45 期擊殺挑戰》</h2>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdLJsQNQ3nbj5GbwzoOrdy3frAc_TZnl_rpFxG4jshaIp-3gw/viewform?embedded=true"
          class="w-full h-[50svh]">載入中…</iframe>
      </div>
    </SectionDefStyle>
  </div>
</template>


<style scoped>
.banner {
  background-image: url('https://picsum.photos/1920/1080');
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100svh;
}

.scroll-hint {
  animation: scrollDown 1.5s infinite;
}

@keyframes scrollDown {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(10px);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
