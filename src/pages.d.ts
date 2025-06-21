// src/pages.d.ts (或 vite-env.d.ts)
declare module '~pages' {
  import type { RouteRecordRaw } from 'vue-router'
  const routes: RouteRecordRaw[]
  export default routes
}
