// src/plugins/head.ts
import { createHead } from '@unhead/vue/client'
import type { App } from 'vue'

export function installHead(app: App) {
  const head = createHead()
  app.use(head)
}
