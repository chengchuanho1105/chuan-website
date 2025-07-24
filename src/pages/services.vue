<script setup lang="ts">
defineOptions({ name: 'ChuanLife-Services' })
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 py-12">
      <!-- 頁面標題 -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          專業服務總覽
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          銓生活提供多元化的專業服務，從網站設計到3C產品代購，為您的生活提供便利與無限可能
        </p>
      </div>

      <!-- 服務項目 -->
      <div class="space-y-16">
        <!-- 網站設計服務 -->
        <section class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div class="grid lg:grid-cols-2 gap-0">
            <!-- 服務介紹 -->
            <div class="p-8 lg:p-12">
              <div class="flex items-center gap-3 mb-6">
                <i class="bi bi-code-slash text-3xl text-blue-600 dark:text-blue-400"></i>
                <h2 class="text-3xl font-bold text-gray-900 dark:text-white">網站設計</h2>
              </div>

              <div class="space-y-6">
                <div>
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">服務內容</h3>
                  <ul class="space-y-2 text-gray-700 dark:text-gray-300">
                    <li class="flex items-start gap-2">
                      <i class="bi bi-check-circle-fill text-green-500 mt-1"></i>
                      <span>響應式網站設計（支援手機、平板、電腦）</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <i class="bi bi-check-circle-fill text-green-500 mt-1"></i>
                      <span>企業形象網站與品牌設計</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <i class="bi bi-check-circle-fill text-green-500 mt-1"></i>
                      <span>電商平台建置與購物車系統</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <i class="bi bi-check-circle-fill text-green-500 mt-1"></i>
                      <span>網站維護與內容管理系統</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <i class="bi bi-check-circle-fill text-green-500 mt-1"></i>
                      <span>SEO 優化與搜尋引擎排名</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">收費模式</h3>
                  <div class="grid md:grid-cols-2 gap-4">
                    <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">基本方案</h4>
                      <p class="text-blue-700 dark:text-blue-300 text-sm">
                        響應式網站設計<br>
                        <span class="font-bold text-lg">TWD 10,000 起</span>
                      </p>
                    </div>
                    <!--
                    <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <h4 class="font-semibold text-green-800 dark:text-green-200 mb-2">進階方案</h4>
                      <p class="text-green-700 dark:text-green-300 text-sm">
                        電商平台建置<br>
                        <span class="font-bold text-lg">NT$ 35,000 起</span>
                      </p>
                    </div>
                    -->
                  </div>
                </div>

                <!--
                <div class="pt-4">
                  <a href="/contact"
                    class="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    <i class="bi bi-chat-dots"></i>
                    洽詢網站設計
                  </a>
                </div>
                -->
              </div>
            </div>

            <!-- 服務圖片 -->
            <div class="bg-gradient-to-br from-blue-500 to-blue-700 p-8 lg:p-12 relative overflow-hidden">
              <!-- 背景裝飾 -->
              <div class="absolute inset-0">
                <div class="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
                <div class="absolute bottom-8 left-8 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-1000"></div>
                <div class="absolute top-1/2 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-500"></div>
                <div class="absolute top-1/4 right-1/3 w-8 h-8 bg-white/5 rounded-full"></div>
                <div class="absolute bottom-1/4 right-1/6 w-10 h-10 bg-white/5 rounded-full"></div>
              </div>

              <!-- 浮動元素 -->
              <div class="absolute inset-0">
                <div class="absolute top-6 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-bounce"></div>
                <div class="absolute top-1/3 right-1/4 w-1 h-1 bg-white/40 rounded-full animate-bounce delay-300"></div>
                <div class="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white/25 rounded-full animate-bounce delay-700">
                </div>
              </div>

              <!-- 主要內容 -->
              <div class="relative z-10 text-center text-white">
                <div class="mb-6">
                  <div
                    class="inline-flex items-center justify-center w-28 h-28 bg-white/20 rounded-full mb-4 shadow-lg">
                    <i class="bi bi-laptop text-5xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold mb-2">專業網站設計</h3>
                  <p class="opacity-90 mb-4">打造專屬於您的完美網路形象</p>
                </div>

                <!-- 特色標籤 -->
                <div class="flex flex-wrap justify-center gap-2 mb-4">
                  <span class="px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">響應式設計</span>
                  <span class="px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">SEO 優化</span>
                  <span class="px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">電商平台</span>
                </div>

                <!-- 額外資訊 -->
                <div class="text-xs opacity-75">
                  <div class="flex justify-center items-center gap-4">
                    <span class="flex items-center gap-1">
                      <i class="bi bi-clock"></i>
                      快速交付
                    </span>
                    <span class="flex items-center gap-1">
                      <i class="bi bi-shield-check"></i>
                      品質保證
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 貼圖代購服務 -->
        <section class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div class="grid lg:grid-cols-2 gap-0">
            <!-- 服務圖片 -->
            <div class="bg-gradient-to-br from-green-500 to-green-700 p-8 lg:p-12 relative overflow-hidden">
              <!-- 背景裝飾 -->
              <div class="absolute inset-0">
                <div class="absolute top-6 left-6 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-300"></div>
                <div class="absolute bottom-6 right-6 w-20 h-20 bg-white/10 rounded-full animate-pulse delay-700"></div>
                <div class="absolute top-1/3 right-1/3 w-12 h-12 bg-white/10 rounded-full animate-pulse"></div>
                <div class="absolute top-1/4 left-1/4 w-10 h-10 bg-white/5 rounded-full"></div>
                <div class="absolute bottom-1/4 left-1/3 w-8 h-8 bg-white/5 rounded-full"></div>
              </div>

              <!-- 浮動元素 -->
              <div class="absolute inset-0">
                <div class="absolute top-8 right-1/3 w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-500">
                </div>
                <div class="absolute top-1/2 left-1/4 w-1 h-1 bg-white/30 rounded-full animate-bounce delay-200"></div>
                <div class="absolute bottom-1/4 right-1/4 w-2 h-2 bg-white/25 rounded-full animate-bounce delay-800">
                </div>
              </div>

              <!-- 主要內容 -->
              <div class="relative z-10 text-center text-white">
                <div class="mb-6">
                  <div
                    class="inline-flex items-center justify-center w-28 h-28 bg-white/20 rounded-full mb-4 shadow-lg">
                    <i class="bi bi-emoji-smile text-5xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold mb-2">貼圖代購服務</h3>
                  <p class="opacity-90 mb-4">讓您的通訊更有趣、更生動</p>
                </div>

                <!-- 特色標籤 -->
                <div class="flex flex-wrap justify-center gap-2 mb-4">
                  <span class="px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">Line 貼圖</span>
                  <span class="px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">Telegram</span>
                  <span class="px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">客製設計</span>
                </div>

                <!-- 額外資訊 -->
                <div class="text-xs opacity-75">
                  <div class="flex justify-center items-center gap-4">
                    <span class="flex items-center gap-1">
                      <i class="bi bi-lightning"></i>
                      即時處理
                    </span>
                    <span class="flex items-center gap-1">
                      <i class="bi bi-heart"></i>
                      熱門推薦
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 服務介紹 -->
            <div class="p-8 lg:p-12">
              <div class="flex items-center gap-3 mb-6">
                <i class="bi bi-emoji-smile text-3xl text-green-600 dark:text-green-400"></i>
                <h2 class="text-3xl font-bold text-gray-900 dark:text-white">貼圖代購</h2>
              </div>

              <div class="space-y-6">
                <div>
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">服務內容</h3>
                  <ul class="space-y-2 text-gray-700 dark:text-gray-300">
                    <li class="flex items-start gap-2">
                      <i class="bi bi-check-circle-fill text-green-500 mt-1"></i>
                      <span>Line 貼圖代購與推薦</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <i class="bi bi-check-circle-fill text-green-500 mt-1"></i>
                      <span>Telegram 貼圖代購</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <i class="bi bi-check-circle-fill text-green-500 mt-1"></i>
                      <span>客製化貼圖設計服務</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <i class="bi bi-check-circle-fill text-green-500 mt-1"></i>
                      <span>貼圖使用教學與設定</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <i class="bi bi-check-circle-fill text-green-500 mt-1"></i>
                      <span>熱門貼圖推薦與介紹</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">收費模式</h3>
                  <div class="grid md:grid-cols-2 gap-4">
                    <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <h4 class="font-semibold text-green-800 dark:text-green-200 mb-2">代購服務</h4>
                      <p class="text-green-700 dark:text-green-300 text-sm">
                        貼圖原價 + 代購費<br>
                        <span class="font-bold text-lg">代購費 TWD 1 起</span>
                      </p>
                    </div>
                    <!--
                    <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                      <h4 class="font-semibold text-purple-800 dark:text-purple-200 mb-2">客製設計</h4>
                      <p class="text-purple-700 dark:text-purple-300 text-sm">
                        個人化貼圖設計<br>
                        <span class="font-bold text-lg">NT$ 2,000 起</span>
                      </p>
                    </div>
                    -->
                  </div>
                </div>

                <!--
                <div class="pt-4">
                  <a href="/contact"
                    class="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                    <i class="bi bi-chat-dots"></i>
                    洽詢貼圖代購
                  </a>
                </div>
                -->
              </div>
            </div>
          </div>
        </section>

        <!-- 3C產品代購服務 -->
        <section class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div class="grid lg:grid-cols-2 gap-0">
            <!-- 服務介紹 -->
            <div class="p-8 lg:p-12">
              <div class="flex items-center gap-3 mb-6">
                <i class="bi bi-phone text-3xl text-yellow-600 dark:text-yellow-400"></i>
                <h2 class="text-3xl font-bold text-gray-900 dark:text-white">3C產品代購</h2>
              </div>

              <div class="space-y-6">
                <div>
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">服務內容</h3>
                  <ul class="space-y-2 text-gray-700 dark:text-gray-300">
                    <li class="flex items-start gap-2">
                      <i class="bi bi-check-circle-fill text-green-500 mt-1"></i>
                      <span>手機、平板、筆電代購</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <i class="bi bi-check-circle-fill text-green-500 mt-1"></i>
                      <span>電腦配件與周邊設備</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <i class="bi bi-check-circle-fill text-green-500 mt-1"></i>
                      <span>智慧穿戴裝置</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <i class="bi bi-check-circle-fill text-green-500 mt-1"></i>
                      <span>產品諮詢與規格比較</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <i class="bi bi-check-circle-fill text-green-500 mt-1"></i>
                      <span>售後服務與保固處理</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">收費模式</h3>
                  <div class="grid md:grid-cols-2 gap-4">
                    <div class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                      <h4 class="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">代購服務費</h4>
                      <p class="text-yellow-700 dark:text-yellow-300 text-sm">
                        商品價格 + 代購費<br>
                        <span class="font-bold text-lg">5-10% 代購費</span>
                      </p>
                    </div>
                    <div class="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                      <h4 class="font-semibold text-orange-800 dark:text-orange-200 mb-2">諮詢服務</h4>
                      <p class="text-orange-700 dark:text-orange-300 text-sm">
                        產品諮詢與推薦<br>
                        <span class="font-bold text-lg">免費</span>
                      </p>
                    </div>
                  </div>
                </div>

                <!--
                <div class="pt-4">
                  <a href="/contact"
                    class="inline-flex items-center gap-2 bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors">
                    <i class="bi bi-chat-dots"></i>
                    洽詢3C代購
                  </a>
                </div>
                -->
              </div>
            </div>

            <!-- 服務圖片 -->
            <div class="bg-gradient-to-br from-yellow-500 to-orange-600 p-8 lg:p-12 relative overflow-hidden">
              <!-- 背景裝飾 -->
              <div class="absolute inset-0">
                <div class="absolute top-4 left-4 w-18 h-18 bg-white/10 rounded-full animate-pulse delay-200"></div>
                <div class="absolute bottom-4 right-4 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-600"></div>
                <div class="absolute top-1/2 right-1/4 w-14 h-14 bg-white/10 rounded-full animate-pulse delay-400">
                </div>
                <div class="absolute top-1/3 left-1/3 w-12 h-12 bg-white/5 rounded-full"></div>
                <div class="absolute bottom-1/3 right-1/3 w-10 h-10 bg-white/5 rounded-full"></div>
              </div>

              <!-- 浮動元素 -->
              <div class="absolute inset-0">
                <div class="absolute top-6 right-1/4 w-2 h-2 bg-white/35 rounded-full animate-bounce delay-400"></div>
                <div class="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-white/25 rounded-full animate-bounce delay-600">
                </div>
                <div class="absolute bottom-1/3 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-bounce delay-200">
                </div>
              </div>

              <!-- 主要內容 -->
              <div class="relative z-10 text-center text-white">
                <div class="mb-6">
                  <div
                    class="inline-flex items-center justify-center w-28 h-28 bg-white/20 rounded-full mb-4 shadow-lg">
                    <i class="bi bi-phone text-5xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold mb-2">3C產品代購</h3>
                  <p class="opacity-90 mb-4">專業代購，品質保證</p>
                </div>

                <!-- 特色標籤 -->
                <div class="flex flex-wrap justify-center gap-2 mb-4">
                  <span class="px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">手機平板</span>
                  <span class="px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">電腦配件</span>
                  <span class="px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">智慧穿戴</span>
                </div>

                <!-- 額外資訊 -->
                <div class="text-xs opacity-75">
                  <div class="flex justify-center items-center gap-4">
                    <span class="flex items-center gap-1">
                      <i class="bi bi-truck"></i>
                      快速配送
                    </span>
                    <span class="flex items-center gap-1">
                      <i class="bi bi-award"></i>
                      正品保證
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- 聯絡我們區塊
      <div class="mt-16 text-center">
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h2 class="text-2xl font-bold mb-4">需要客製化服務嗎？</h2>
          <p class="text-lg mb-6 opacity-90">
            我們提供彈性的客製化服務，根據您的需求量身打造最適合的解決方案
          </p>
          <a href="/contact"
            class="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <i class="bi bi-chat-dots-fill"></i>
            立即聯絡我們，獲得專屬服務建議
          </a>
        </div>
      </div>
      -->
    </div>
  </div>
</template>

<style scoped></style>
