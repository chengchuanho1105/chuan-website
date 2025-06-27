// src/utils/init.ts
import { setupAOS } from '@/utils/aos'
import '@/utils/pageUpdater.ts'

export function setupDomIntegrations() {
  setupAOS()
  // 可擴充其他 JS init
}
