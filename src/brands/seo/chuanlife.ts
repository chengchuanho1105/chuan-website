// src/seo/chuanlife.ts
import type { HeadObj } from '@unhead/vue'

export const chuanlifeSEO: HeadObj = {
  title: '銓生活 - 品味生活，輕鬆擁有',
  link: [
    { rel: 'icon', href: '/favicon-chuanlife.ico', type: 'image/x-icon' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon-chuanlife.png' },
  ],
  meta: [
    {
      name: 'description',
      content:
        '銓生活提供各式高品質生活用品，讓您的生活更有品味，享受輕鬆便利。探索家居、廚具、美妝等精選商品。',
    },
    { name: 'keywords', content: '銓生活, 生活用品, 家居, 廚具, 美妝, 品味生活' },
    { name: 'author', content: '銓生活' },
    { property: 'og:title', content: '銓生活 - 品味生活，輕鬆擁有' },
    {
      property: 'og:description',
      content:
        '銓生活提供各式高品質生活用品，讓您的生活更有品味，享受輕鬆便利。探索家居、廚具、美妝等精選商品。',
    },
    { property: 'og:image', content: 'https://yourwebsite.com/images/og-chuanlife.jpg' },
    { property: 'og:url', content: 'https://chuanlife.com' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '銓生活 - 品味生活，輕鬆擁有' },
    {
      name: 'twitter:description',
      content:
        '銓生活提供各式高品質生活用品，讓您的生活更有品味，享受輕鬆便利。探索家居、廚具、美妝等精選商品。',
    },
    { name: 'twitter:image', content: 'https://yourwebsite.com/images/twitter-chuanlife.jpg' },
  ],
}
