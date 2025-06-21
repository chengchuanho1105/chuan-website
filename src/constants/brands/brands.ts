//
/**
 * @file /src/constants/brands/brands.ts
 * @description
 * 0. 此檔案為品牌相關邏輯的基礎常數來源，請確保在新增品牌時一併維護相關模組。
 * 1. ALL_BRANDS: 品牌名稱清單
 * 2. Brand: 提供品牌型別
 * 3. MAIN_BRAND_NAME: 設定主品牌
 * 4. ...
 */
//

/**
 * 所有支援的品牌名稱清單。
 *
 * - `'unknown'`：預設值，用於處理未辨識或未設定品牌時的 fallback。
 *
 * **新增品牌時請遵循以下規則**：
 * 1. 在此陣列新增品牌名稱
 * 2. 確保在以下模組同步更新對應資料： (待確認)
 *    - `/constants/brands/brandConfigs.ts`（品牌資料對照）
 *    - `/layouts/brands/**`（品牌專屬版型）
 */
export const ALL_BRANDS = [
  'xiangchuan',
  'crazyclown',
  // 'anotherBrand', // ← 新品牌請新增於此處
  'unknown',
] as const

/**
 * 品牌名稱的 Type 定義。
 *
 * 從 `ALL_BRANDS` 推導出字面量型別的 union：
 */
export type Brand = (typeof ALL_BRANDS)[number]

/**
 * 系統主品牌名稱。
 *
 * 若要切換主要品牌，請僅修改此常數，不建議於其他模組硬編寫品牌名稱。
 */
export const MAIN_BRAND_NAME: Brand = 'xiangchuan'
