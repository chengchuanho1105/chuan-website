/**
 * @file src/untils/pageUpdater.ts
 * @description
 * 面更新監控工具。
 * 原理為定期抓取當前頁面 HTML，解析其中的 script 標籤與 meta 版本資訊，
 * 與初次載入時的快照比對，若有變動則提示使用者重新載入。
 *
 * 使用場景：
 * - 靜態網站（SSG）部署於 CDN 或前端 cache 頻繁的情境
 * - 無法使用 HMR 的純前端專案
 */
//

let lastSrcs: string[] | undefined
let lastVersion: string | undefined

// 用於抓取 script src，支援 <script src="xxx.js"> 標籤
const scriptReg = /<script[^>]*src=["'](?<src>[^"']+)["']/gm

// 用於抓取 meta[name="app-version"] 的 content
const metaVersionReg = /<meta[^>]*name=["']app-version["'][^>]*content=["'](?<version>[^"']+)["']/i

/**
 * 解析當前 HTML 頁面內容中的 script src 與版本號
 * @returns {Promise<{ newSrcs: string[], newVersion?: string }>}
 */
async function extractScriptAndVersion() {
  try {
    const resp = await fetch('/?_timestamp=' + Date.now()) // 加時間參數避免 cache
    const html = await resp.text()

    const newSrcs: string[] = []
    let match

    // 擷取所有 <script src="..."> 的 src
    scriptReg.lastIndex = 0
    while ((match = scriptReg.exec(html))) {
      if (match.groups?.src) newSrcs.push(match.groups.src)
    }

    // 擷取 <meta name="app-version" content="..."> 的版本號
    const versionMatch = metaVersionReg.exec(html)
    const newVersion = versionMatch?.groups?.version

    return { newSrcs, newVersion }
  } catch (e) {
    console.warn('無法取得頁面 HTML:', e)
    return { newSrcs: [], newVersion: undefined }
  }
}

/**
 * 比對新舊 script src 或 meta version 是否變動
 * @returns {Promise<boolean>} 是否需要更新
 */
async function needUpdate() {
  const { newSrcs, newVersion } = await extractScriptAndVersion()

  // 初次呼叫，儲存 snapshot 作為基準
  if ((!lastSrcs || lastSrcs.length === 0) && !lastVersion) {
    lastSrcs = newSrcs
    lastVersion = newVersion
    return false
  }

  // 比對 script src 長度或順序有無變動
  if (lastSrcs?.length !== newSrcs.length || lastSrcs?.some((src, i) => src !== newSrcs[i])) {
    return true
  }

  // 比對版本號變動
  if (lastVersion && newVersion && lastVersion !== newVersion) {
    return true
  }

  return false
}

// 設定檢查一次頻率 (ms)
const DURATION = 2000

/**
 * 啟動自動頁面更新監控
 * - 若偵測到變動，會提示使用者重新載入
 */
function startAutoRefresh() {
  setInterval(async () => {
    const changed = await needUpdate()
    if (changed) {
      const reload = confirm('頁面已更新，點擊確定後重新載入。')
      if (reload) location.reload()
    }
  }, DURATION)
}

startAutoRefresh()
