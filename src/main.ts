// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { setupPlugins } from './plugins'
import { setupAOS } from './utils/aos'
import './assets/style/public/main.css'

import './utils/pageUpdater.ts'

const app = createApp(App)

// 設定插件
setupPlugins(app)

// 初始化 AOS
setupAOS()

app.mount('#app')
