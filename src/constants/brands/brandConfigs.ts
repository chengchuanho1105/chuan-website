// src/constants/brands/brandConfigs.ts

/**
 * @file /src/constants/brands/brandConfigs.ts
 * @description 儲存各品牌的詳細配置，包括顯示名稱和 Logo 路徑。
 */

import type { Brand } from './brands' // 確保路徑正確

// 定義品牌配置的介面
export interface BrandConfig {
  displayName: string // 品牌在 UI 上顯示的名稱
  logoPath: string // 品牌 Logo 圖片的路徑
  // 您可以在這裡添加更多品牌相關的配置，例如主題顏色、網域等
}
