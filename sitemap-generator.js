// sitemap-generator.js
import { SitemapStream, streamToPromise } from 'sitemap'
import { createWriteStream } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// ESM specific __dirname and __filename
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = 'https://chuan.life'

// 直接定義從品牌定義檔案 中提取的頁面配置數據。
// 在實際生產環境中，你可以考慮設定一個建置步驟來編譯這些 TypeScript 檔案，
// 或者透過一個後端 API 來動態獲取這些路由資訊。
const ALL_BRAND_DEFINITIONS_DATA = {
  chuanlife: {
    brandName: 'chuanlife',
    pageConfigs: [
      { path: '/' }, // 首頁
      { path: '/about' }, // 關於我們
      {
        path: '/product',
        children: [
          // 產品介紹
          { path: '/product/list' }, // 所有產品
        ],
      },
      { path: '/faq' }, // 常見問題
      { path: '/contact' }, // 聯絡我們
    ],
    isMainBrand: true, // 此品牌使用根網域 (chuan.life)
  },
  crazyclown: {
    brandName: 'crazyclown',
    pageConfigs: [
      { path: '/' }, // 首頁 (對應 /crazyclown)
      { path: '/about' }, // 關於我們 (對應 /crazyclown/about)
      { path: '/faq' }, // 常見問題 (對應 /crazyclown/faq)
      { path: '/contact' }, // 聯絡我們 (對應 /crazyclown/contact)
    ],
    isMainBrand: false, // 此品牌使用子路徑 (chuan.life/crazyclown)
  },
}

async function generateSitemap() {
  const links = []
  const addedUrls = new Set() // 用於防止重複的 URL

  // 首先添加主根 URL，給予最高優先級
  const rootUrl = BASE_URL + '/'
  links.push({ url: rootUrl, changefreq: 'daily', priority: 1.0 })
  addedUrls.add(rootUrl)

  // 遞迴處理頁面配置的函數
  const processPageConfigs = (brandDef, configs, currentRelativePath = '') => {
    configs.forEach((config) => {
      let pagePath = config.path
      let fullUrl

      if (brandDef.isMainBrand) {
        // 針對主品牌 (chuanlife)
        if (pagePath === '/') {
          // 如果是主品牌的根路徑，並且已經被添加，則跳過此處，只處理其子路由
          if (config.children) {
            processPageConfigs(brandDef, config.children, currentRelativePath + pagePath)
          }
          return // 跳過此處添加 '/'，避免重複
        }
        // 例如：chuan.life/about, chuan.life/product
        fullUrl = BASE_URL + currentRelativePath + pagePath
      } else {
        // 針對子品牌 (例如 crazyclown)
        const brandPrefix = `/${brandDef.brandName}`
        if (pagePath === '/') {
          // 如果是子品牌的根路徑，例如：https://chuan.life/crazyclown
          fullUrl = BASE_URL + brandPrefix
        } else {
          // 如果是子品牌的其他頁面，例如：https://chuan.life/crazyclown/about
          fullUrl = BASE_URL + brandPrefix + currentRelativePath + pagePath
        }
      }

      // 正規化 URL (如果不是根目錄，移除尾隨斜線)
      if (fullUrl.endsWith('/') && fullUrl !== BASE_URL + '/') {
        fullUrl = fullUrl.slice(0, -1)
      }

      // 如果此 URL 尚未被添加，則加入 Sitemap 連結
      if (!addedUrls.has(fullUrl)) {
        links.push({ url: fullUrl, changefreq: 'daily', priority: 0.9 })
        addedUrls.add(fullUrl)
      }

      // 處理子頁面 (如果有的話)
      if (config.children && config.children.length > 0) {
        processPageConfigs(brandDef, config.children, currentRelativePath + pagePath)
      }
    })
  }

  // 遍歷所有品牌定義並生成連結
  for (const brandKey in ALL_BRAND_DEFINITIONS_DATA) {
    if (Object.hasOwnProperty.call(ALL_BRAND_DEFINITIONS_DATA, brandKey)) {
      const brandDef = ALL_BRAND_DEFINITIONS_DATA[brandKey]
      processPageConfigs(brandDef, brandDef.pageConfigs)
    }
  }

  const sitemapStream = new SitemapStream({ hostname: BASE_URL })
  const writeStream = createWriteStream(path.resolve(__dirname, 'public', 'sitemap.xml'))

  sitemapStream.pipe(writeStream)

  links.forEach((link) => sitemapStream.write(link))
  sitemapStream.end()

  try {
    await streamToPromise(sitemapStream)
    console.log('Sitemap generated successfully!')
  } catch (error) {
    console.error('Error generating sitemap:', error)
  }
}

generateSitemap()
