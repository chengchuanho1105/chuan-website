// src/plugins/pinia.ts
import { createPinia } from 'pinia'
import type { App } from 'vue'

export function installPinia(app: App) {
  const pinia = createPinia()
  app.use(pinia)
}
