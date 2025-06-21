//
/**
 * @file src/router/helpers.ts
 * @fileoverview
 * 根據網址路徑，自動判斷該屬於哪一個品牌。
 * 可用於 Layout 切換、SEO 設定、品牌導向內容渲染等情境。
 *
 * @module router/helpers
 */
//

// 匯入「品牌名稱清單 {ALL_BRANDS}」、「主品牌{MAIN_BRAND_NAME}」、「品牌型別Brand」
import { ALL_BRANDS, MAIN_BRAND_NAME } from '@/constants/brands/brands.ts'
import type { Brand } from '@/constants/brands/brands.ts'

// 匯入「所有品牌頂層路徑的正規表達式清單」
import { allBrandTopLevelPathRegexes } from '@/routes'

/**
 * 根據網址路徑推斷對應的品牌名稱。
 *
 * 優先判斷邏輯如下：
 * 1. 如果路徑以 `/brand` 開頭，並非主品牌 (MAIN_BRAND_NAME)，則視為該品牌。
 * 2. 否則使用預先定義的主品牌 Regex 規則，檢查是否符合主品牌樣式。
 * 3. 若都不符合，視為 `unknown` 品牌。
 *
 * @param {string} path - 目前的網址路徑 (e.g. `/brand/about` or `/brand/abc`)
 * @returns {Brand} 回傳對應品牌名稱 ('brandA' | 'brandB' | ... | 'unknown')
 *
 * @example
 * getBrandFromPath('/about')         // => 'brandA' (符合主品牌 regex)
 * getBrandFromPath('/brandB/about')  // => 'brandB'
 * getBrandFromPath('/unknown/path')  // => 'unknown'
 */
export function getBrandFromPath(path: string): Brand {
  // Step 1: 檢查是否符合非主品牌的品牌路徑前綴 (e.g. "/brandB")
  for (const brand of ALL_BRANDS) {
    // 忽略主品牌，因為主品牌不會出現在 URL 的第一層路徑中
    if (brand === MAIN_BRAND_NAME) {
      continue // 若是主品牌，則留給 Step 2 判斷
    }

    // 若路徑以某品牌名稱開頭，則視為該品牌
    if (path.startsWith(`/${brand}`)) {
      return brand // 找到對應品牌，直接回傳
    }
  }

  // Step 2: 使用主品牌的正則規則來判斷是否為主品牌
  const mainBrandRegexes = allBrandTopLevelPathRegexes[MAIN_BRAND_NAME]
  if (mainBrandRegexes) {
    for (const regex of mainBrandRegexes) {
      if (regex.test(path)) {
        return MAIN_BRAND_NAME // 若符合主品牌的正則規則，則回傳主品牌名稱
      }
    }
  }

  // Step 3: 都不符合時，回傳 'unknown'，代表找不到對應品牌
  return 'unknown'
}
