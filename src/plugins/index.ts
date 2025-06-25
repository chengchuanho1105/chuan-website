// src/plugins/index.ts
import type { App } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue/client'
import router from '@/router/index.ts'

export function setupPlugins(app: App) {
  const head = createHead()
  app.use(head)
  app.use(createPinia())
  app.use(router)
}
