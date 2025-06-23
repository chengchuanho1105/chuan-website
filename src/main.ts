import '@/assets/style/public/main.css'

import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init({ duration: 800, once: false, offset: 50 })

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue/client'

import App from './App.vue'
import router from '@/router/index.ts'

const app = createApp(App)

const head = createHead()
app.use(head)

app.use(createPinia())
app.use(router)

app.mount('#app')
