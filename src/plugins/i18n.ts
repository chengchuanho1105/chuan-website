// src/plugins/i18n.ts

import { createI18n, type I18nOptions } from 'vue-i18n'
import type { Router, NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { MAIN_BRAND_NAME } from '@/constants/brands/brands'

/**
 * 儲存所有語系內容：
 * { 'zh-TW': { brand: messages } }
 */
const messages = {} as Record<string, Record<string, Record<string, unknown>>>

const zhTW = import.meta.glob('@/locales/**/zh-TW.json', { eager: true, import: 'default' })
const enUS = import.meta.glob('@/locales/**/en-US.json', { eager: true, import: 'default' })

function processLocales(locales: Record<string, unknown>, lang: string) {
  if (!messages[lang]) messages[lang] = {}
  for (const path in locales) {
    const match = path.match(/\/locales\/([a-zA-Z0-9_-]+)\//)
    if (match?.[1]) {
      messages[lang][match[1]] = locales[path] as Record<string, unknown>
    }
  }
}

processLocales(zhTW, 'zh-TW')
processLocales(enUS, 'en-US')

const i18nOptions: I18nOptions = {
  legacy: false,
  globalInjection: true,
  locale: 'zh-TW',
  fallbackLocale: 'en-US',
  messages: {},
}

export const i18n = createI18n(i18nOptions)

let currentBrandMessages = {} as Record<string, unknown>

function updateI18nMessages(brand: string, locale: string) {
  const all = messages[locale] || {}
  const merged = {
    ...all.default,
    ...all[brand],
  }

  i18n.global.setLocaleMessage(locale, merged)
  currentBrandMessages = merged
}

interface RouteMetaWithBrand {
  brand?: string
}

/**
 * 在每次路由變化時更新品牌語系內容
 */
export function setupDynamicI18n(router: Router, i18nInstance = i18n) {
  router.beforeEach(
    (
      to: RouteLocationNormalized & { meta: RouteMetaWithBrand },
      from: RouteLocationNormalized,
      next: NavigationGuardNext,
    ) => {
      const currentBrand = (to.meta.brand || MAIN_BRAND_NAME) as string
      const currentLocale = i18nInstance.global.locale as string
      updateI18nMessages(currentBrand, currentLocale)
      next()
    },
  )
}
