// src/seo/crazyclown.ts
import type { HeadObj } from '@unhead/vue'

export const crazyclownSEO: HeadObj = {
  title: 'CrazyClown - 瘋狂創意，無設限玩樂',
  link: [
    { rel: 'icon', href: '/favicon-crazyclown.ico', type: 'image/x-icon' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon-crazyclown.png' },
  ],
  meta: [
    {
      name: 'description',
      content: 'CrazyClown 帶來最瘋狂、最有創意的商品和娛樂體驗。打破常規，享受無設限的玩樂世界！',
    },
    { name: 'keywords', content: 'CrazyClown, 瘋狂, 創意, 玩樂, 搞怪, 特色商品' },
    { name: 'author', content: 'CrazyClown' },
    { property: 'og:title', content: 'CrazyClown - 瘋狂創意，無設限玩樂' },
    {
      property: 'og:description',
      content: 'CrazyClown 帶來最瘋狂、最有創意的商品和娛樂體驗。打破常規，享受無設限的玩樂世界！',
    },
    { property: 'og:image', content: 'https://yourwebsite.com/images/og-crazyclown.jpg' },
    { property: 'og:url', content: 'https://crazyclown.com' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'CrazyClown - 瘋狂創意，無設限玩樂' },
    {
      name: 'twitter:description',
      content: 'CrazyClown 帶來最瘋狂、最有創意的商品和娛樂體驗。打破常規，享受無設限的玩樂世界！',
    },
    { name: 'twitter:image', content: 'https://yourwebsite.com/images/twitter-crazyclown.jpg' },
  ],
}
