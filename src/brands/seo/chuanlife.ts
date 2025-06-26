// src/brands/seo/chuanlife.ts

const seolist = {
  brand: 'chuanlife',
  name: '銓生活服務工作室',
  shortName: '銓生活',
  slogan: '品味生活，輕鬆擁有',
  url: 'https://chuan.life',
  icon: 'https://chuan.life/assets/media/chuanlife/logo.png',
  ogImg: 'https://chuan.life/assets/media/chuanlife/ogimg.png',
  description:
    '銓生活提供各式高品質生活用品，讓您的生活更有品味，享受輕鬆便利。探索家居、廚具、美妝等精選商品。',
  keyword: '銓生活, 生活用品, 家居, 廚具, 美妝, 品味生活',
  author: '銓生活',
  twitter: '@xiangquan10',
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
    { name: 'keyword', content: seolist.keyword },
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
}
