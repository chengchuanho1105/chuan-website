// src/plugins/router.ts
import router from '@/router/index'
import type { App } from 'vue'

export function installRouter(app: App) {
  app.use(router)
}
