// src/brands/seo/default.ts

export const seo = {
  title: '',
  link: [
    { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  ],
  meta: [
    {
      name: 'description',
      content: '',
    },
    { name: 'keywords', content: '' },
    { name: 'author', content: '' },
    { property: 'og:title', content: '' },
    {
      property: 'og:description',
      content: '',
    },
    { property: 'og:image', content: '' },
    { property: 'og:url', content: 'https://chuan.life' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '' },
    {
      name: 'twitter:description',
      content: '',
    },
    { name: 'twitter:image', content: '' },
  ],
}
