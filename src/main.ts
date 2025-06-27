// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { setupPlugins } from './plugins'
import { setupDomIntegrations } from '@/utils/inti.ts'
import './assets/style/public/main.css'

const app = createApp(App)

// 設定插件
setupPlugins(app)

setupDomIntegrations()

app.mount('#app')
