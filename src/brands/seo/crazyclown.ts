// src/brands/seo/chuanlife.ts

const seolist = {
  brand: 'CrazyClown',
  name: 'Crazy_Clown',
  shortName: 'CrazyClown',
  slogan: '不瘋，不成團！',
  url: 'https://chuan.life',
  icon: 'https://chuan.life/assets/media/CrazyClown/logo.png',
  ogImg: 'https://chuan.life/assets/media/CrazyClown/ogimg.png',
  description: '在這裡，每場遊戲都是一場瘋狂表演！Crazy_Clown 期待你的加入！',
  keywords: 'Crazy_Clown, PUBG, 戰隊, 公會, clan, S級',
  author: '銓生活',
  twitter: '@xiangquan10',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: seolist.name,
  legalName: seolist.name,
  url: seolist.url,
  logo: seolist.icon,
  image: seolist.ogImg,
  description: seolist.description,
  founder: '銓',
  foundingDate: '2023-01-01',
  email: 'chengchuanho1105@gmail.com',
  telephone: '+886-900-000-000',
  sameAs: [
    'https://www.facebook.com/cheng.1105.chuan',
    'https://www.instagram.com/x._.1105._.q',
    'https://www.youtube.com/@Chuan._.1105',
    'https://x.com/@xiangquan10',
    'https://line.me/ti/p/@xiangquan10',
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '台中市西屯區',
    addressLocality: '台中市西屯區',
    addressRegion: '台灣',
    postalCode: '407',
    addressCountry: 'TW',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+886-900-000-000',
      contactType: 'customer service',
      areaServed: 'TW',
      availableLanguage: ['zh-TW', 'en'],
    },
  ],
}

export const seo = {
  title: seolist.shortName + ' - ' + seolist.slogan,
  link: [
    { rel: 'canonical', href: seolist.url },
    { rel: 'icon', href: seolist.icon, type: 'image/png' },
    { rel: 'apple-touch-icon', href: seolist.icon },
    { rel: 'manifest', href: seolist.url + '/manifest/webmanifest/' + seolist.brand },
  ],
  meta: [
    // 通用
    { name: 'robots', content: 'index, follow' },
    { name: 'googlebot', content: 'index, follow' },
    { name: 'description', content: seolist.description },
    { name: 'keywords', content: seolist.keywords },
    { name: 'author', content: seolist.author },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    { name: 'apple-mobile-web-app-title', content: seolist.shortName + ' - ' + seolist.slogan },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'application-name', content: seolist.shortName + ' - ' + seolist.slogan },

    // OG
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: seolist.shortName + ' - ' + seolist.slogan },
    { property: 'og:description', content: seolist.description },
    { property: 'og:url', content: seolist.url },
    { property: 'og:image', content: seolist.ogImg },
    { property: 'og:image:alt', content: seolist.shortName + ' - ' + seolist.slogan },
    { property: 'og:site_name', content: seolist.shortName + ' - ' + seolist.slogan },
    { property: 'og:locale', content: 'zh-TW' },
    { property: 'og:locale:alternate', content: 'en_US' },

    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: seolist.shortName + ' - ' + seolist.slogan },
    { name: 'twitter:description', content: seolist.description },
    { name: 'twitter:image', content: seolist.ogImg },
    { name: 'twitter:image:alt', content: seolist.shortName + ' - ' + seolist.slogan },
    { name: 'twitter:site', content: seolist.twitter },
    { name: 'twitter:creator', content: seolist.twitter },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(jsonLd),
    },
  ],
  __dangerouslyDisableSanitizers: ['script'],
}
