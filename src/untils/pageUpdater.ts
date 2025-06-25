let lastSrcs: string[] | undefined
let lastVersion: string | undefined

const scriptReg = /<script[^>]*src=["'](?<src>[^"']+)["']/gm
const metaVersionReg = /<meta[^>]*name=["']app-version["'][^>]*content=["'](?<version>[^"']+)["']/i

async function extractScriptAndVersion() {
  try {
    const resp = await fetch('/?_timestamp=' + Date.now())
    const html = await resp.text()

    const newSrcs: string[] = []
    let match

    // 解析 script src
    scriptReg.lastIndex = 0
    while ((match = scriptReg.exec(html))) {
      if (match.groups?.src) newSrcs.push(match.groups.src)
    }

    // 解析 meta version（選用）
    const versionMatch = metaVersionReg.exec(html)
    const newVersion = versionMatch?.groups?.version

    return { newSrcs, newVersion }
  } catch (e) {
    console.warn('無法取得頁面 HTML:', e)
    return { newSrcs: [], newVersion: undefined }
  }
}

async function needUpdate() {
  const { newSrcs, newVersion } = await extractScriptAndVersion()

  if ((!lastSrcs || lastSrcs.length === 0) && !lastVersion) {
    lastSrcs = newSrcs
    lastVersion = newVersion
    return false
  }

  // 判斷 script src 是否變動
  if (lastSrcs?.length !== newSrcs.length || lastSrcs?.some((src, i) => src !== newSrcs[i])) {
    return true
  }

  // 判斷 version 是否變動
  if (lastVersion && newVersion && lastVersion !== newVersion) {
    return true
  }

  return false
}

const DURATION = 5000

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
