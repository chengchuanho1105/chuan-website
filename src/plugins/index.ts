// src/plugins/index.ts
import type { App } from 'vue'
import { installPinia } from './pinia'
import { installRouter } from './router'
import { installHead } from './head'

export function registerPlugins(app: App) {
  installPinia(app)
  installRouter(app)
  installHead(app)
}
