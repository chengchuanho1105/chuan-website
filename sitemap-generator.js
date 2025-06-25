// sitemap-generator.js
import { SitemapStream, streamToPromise } from 'sitemap'
import { createWriteStream } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// 模擬 __dirname 在 ES 模組中的行為
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 引入你的品牌列表 (假設從你的 constants/brands/brands.ts 中提取)
// 或者如果品牌列表是動態的，你需要一個方法來獲取它，例如讀取一個JSON文件
const ALL_BRANDS = ['chuanlife', 'crazyclown', 'default'] // 模擬你的品牌列表

const BASE_URL = 'https://chuan.life' // 你的網站基礎 URL

async function generateSitemap() {
  const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    // 添加其他靜態路由，例如 /about, /contact
    // { url: '/about', changefreq: 'monthly', priority: 0.8 },
  ]

  // 為每個品牌添加 URL
  ALL_BRANDS.forEach((brand) => {
    if (brand === 'default') return // default 品牌通常不是一個獨立的公開頁面

    let brandUrl = `${BASE_URL}/${brand}`
    if (brand === 'chuanlife') {
      // 根據你的 SEO 配置，chuanlife 的 URL 是根目錄
      brandUrl = BASE_URL
    }
    links.push({ url: brandUrl, changefreq: 'daily', priority: 0.9 })
    // 如果品牌下還有其他特定頁面，也要在這裡添加
    // links.push({ url: `${brandUrl}/products`, changefreq: 'weekly', priority: 0.7 });
  })

  const sitemapStream = new SitemapStream({ hostname: BASE_URL })
  // 正確的路徑，直接指向專案根目錄下的 public 資料夾
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
