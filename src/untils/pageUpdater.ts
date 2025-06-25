// src/utils/pageUpdater.ts

let initialJsPaths: string[] = []
let pollingInterval: number | null = null
const POLLING_INTERVAL_MS = 2000 // 每 2 秒檢查一次

/**
 * 從 HTML 內容中提取所有 <script> 標籤的 src 屬性
 * @param htmlContent HTML 字符串
 * @returns 包含所有 JavaScript 檔案路徑的陣列
 */
function extractJsPaths(htmlContent: string): string[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlContent, 'text/html')
  const scriptTags = Array.from(doc.querySelectorAll('script[src]'))
  return scriptTags
    .map((script) => {
      const src = script.getAttribute('src')
      // 只考慮非空且以 .js 結尾的外部腳本
      return src && src.endsWith('.js') ? src : null
    })
    .filter((src): src is string => src !== null) // 過濾掉 null 並斷言類型
}

/**
 * 檢查頁面更新
 */
async function checkForPageUpdate() {
  try {
    const response = await fetch(window.location.href)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const newHtml = await response.text()
    const newJsPaths = extractJsPaths(newHtml)

    // 如果 initialJsPaths 尚未初始化，則進行初始化
    if (initialJsPaths.length === 0) {
      initialJsPaths = newJsPaths
      console.log('頁面更新檢查：已初始化，當前 JS 路徑:', initialJsPaths)
      return // 首次初始化後不觸發更新提示
    }

    const hasChanged =
      initialJsPaths.some((path, index) => path !== newJsPaths[index]) ||
      initialJsPaths.length !== newJsPaths.length

    if (hasChanged) {
      // 如果 JS 路徑有變化，提示使用者
      stopPageUpdatePolling() // 發現更新後先停止輪詢，避免重複提示
      if (confirm('偵測到頁面已更新，是否重新載入以獲取最新內容？')) {
        location.reload()
      } else {
        console.log('使用者選擇不重新載入頁面。')
        // 可以選擇在此處不重新啟動輪詢，或在一段時間後再次提醒
      }
    }
  } catch (error) {
    console.error('檢查頁面更新時發生錯誤:', error)
    // 遇到錯誤時，可以選擇停止輪詢，或者在稍後重試
    // stopPageUpdatePolling(); // 視情況決定是否停止
  }
}

/**
 * 啟動頁面更新輪詢
 */
export function startPageUpdatePolling() {
  if (pollingInterval === null) {
    // 在啟動輪詢前，確保 initialJsPaths 已設定為當前頁面的腳本路徑
    // 這樣可以避免首次載入就觸發更新提示
    initialJsPaths = extractJsPaths(document.documentElement.innerHTML)
    console.log('頁面更新檢查：輪詢啟動，初始 JS 路徑:', initialJsPaths)
    pollingInterval = setInterval(checkForPageUpdate, POLLING_INTERVAL_MS) as unknown as number
  }
}

/**
 * 停止頁面更新輪詢
 */
export function stopPageUpdatePolling() {
  if (pollingInterval !== null) {
    clearInterval(pollingInterval)
    pollingInterval = null
    console.log('頁面更新檢查已停止。')
  }
}
