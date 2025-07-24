<script setup lang="ts">
defineOptions({ name: 'ChuanLife-ReturnPolicy' })
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- 頁面標題 -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            退換貨方式流程
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            保障您的購物權益，提供完善的退換貨服務
          </p>
        </div>

        <!-- 內容區域 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div class="prose prose-lg max-w-none dark:prose-invert">
            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                1. 退換貨基本原則
              </h2>
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                根據消費者保護法，我們提供以下退換貨服務：
              </p>
              <ul class="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>7天鑑賞期內無條件退貨</li>
                <li>商品瑕疵免費換貨或退貨</li>
                <li>商品與描述不符可退換貨</li>
                <li>運費由我們承擔（非人為因素）</li>
                <li>退款處理時間不超過14天</li>
              </ul>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. 退換貨條件
              </h2>
              <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h3 class="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                    ✅ 可退換貨情況
                  </h3>
                  <ul class="text-green-700 dark:text-green-300 space-y-1 text-sm">
                    <li>• 商品有瑕疵或損壞</li>
                    <li>• 商品與網站描述不符</li>
                    <li>• 收到錯誤商品</li>
                    <li>• 7天鑑賞期內不滿意</li>
                    <li>• 商品包裝完整未拆封</li>
                  </ul>
                </div>
                <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <h3 class="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                    ❌ 不可退換貨情況
                  </h3>
                  <ul class="text-red-700 dark:text-red-300 space-y-1 text-sm">
                    <li>• 已拆封商品</li>
                    <li>• 客製化商品</li>
                    <li>• 數位商品</li>
                    <li>• 人為損壞商品</li>
                    <li>• 超過7天鑑賞期</li>
                  </ul>
                </div>
              </div>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. 退換貨流程
              </h2>
              <div class="space-y-6">
                <div class="flex items-start space-x-4">
                  <div
                    class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      聯絡客服
                    </h3>
                    <p class="text-gray-700 dark:text-gray-300">
                      透過客服專線、電子郵件或線上客服聯絡我們，
                      說明退換貨需求，客服人員會協助您處理申請。
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div
                    class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      審核確認
                    </h3>
                    <p class="text-gray-700 dark:text-gray-300">
                      客服人員會在24小時內審核您的申請，並透過電子郵件通知審核結果。
                      如獲批准，會提供退貨標籤和詳細說明。
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div
                    class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      寄回商品
                    </h3>
                    <p class="text-gray-700 dark:text-gray-300">
                      將商品完整包裝，貼上退貨標籤，送至指定物流據點或安排到府取件。
                      請確保商品包裝完整，配件齊全。
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div
                    class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      商品檢驗
                    </h3>
                    <p class="text-gray-700 dark:text-gray-300">
                      收到退貨商品後，我們會在3個工作日內完成檢驗。
                      確認商品狀態符合退貨條件後，會立即處理退款或換貨。
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div
                    class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                    5
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      完成處理
                    </h3>
                    <p class="text-gray-700 dark:text-gray-300">
                      退款會在14天內完成，換貨商品會在7天內寄出。
                      您會收到處理完成的電子郵件通知。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. 退款方式
              </h2>
              <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  原付款方式退款
                </h3>
                <ul class="text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                  <li>• 銀行轉帳：1-3個工作日</li>
                  <li>• 貨到付款：現金退款</li>
                </ul>
              </div>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. 運費說明
              </h2>
              <div class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <h3 class="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  運費承擔原則
                </h3>
                <ul class="text-yellow-700 dark:text-yellow-300 space-y-2">
                  <li>• <strong>商品瑕疵：</strong>我們承擔來回運費</li>
                  <li>• <strong>商品錯誤：</strong>我們承擔來回運費</li>
                  <li>• <strong>7天鑑賞期：</strong>客戶承擔運費</li>
                  <li>• <strong>人為損壞：</strong>客戶承擔運費</li>
                  <li>• <strong>超過鑑賞期：</strong>客戶承擔運費</li>
                </ul>
              </div>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                6. 注意事項
              </h2>
              <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <ul class="text-blue-700 dark:text-blue-300 space-y-2">
                  <li>• 請保持商品原包裝和配件完整</li>
                  <li>• 商品原包裝一經拆封恕不退換</li>
                  <li>• 客製化商品無法退換</li>
                  <li>• 數位商品售出後無法退換</li>
                  <li>• 退貨商品必須在7天內寄出</li>
                  <li>• 請妥善包裝，避免運送損壞</li>
                  <li>• 如有疑問請先聯絡客服</li>
                </ul>
              </div>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                7. 常見問題
              </h2>
              <div class="space-y-4">
                <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Q: 可以部分退貨嗎？
                  </h3>
                  <p class="text-gray-700 dark:text-gray-300">
                    A: 可以，但必須在7天鑑賞期內申請，且商品必須保持完整包裝。
                  </p>
                </div>

                <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Q: 換貨需要多久？
                  </h3>
                  <p class="text-gray-700 dark:text-gray-300">
                    A: 一般換貨會在7個工作日內完成，如有缺貨會另行通知。
                  </p>
                </div>

                <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Q: 可以到店退貨嗎？
                  </h3>
                  <p class="text-gray-700 dark:text-gray-300">
                    A: 目前僅提供線上退貨服務，請透過網站申請退貨。
                  </p>
                </div>
              </div>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                8. 聯絡客服
              </h2>
              <p class="text-gray-700 dark:text-gray-300">
                如果您對退換貨流程有任何疑問，歡迎透過以下方式聯絡我們：
              </p>
              <div class="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p class="text-gray-700 dark:text-gray-300">
                  <strong>退換貨專線：</strong> +886-908-911-153<br>
                  <strong>電子郵件：</strong> chengchuanho110@gmail.com<br>
                  <strong>地址：</strong> 雲林縣斗六市南環路82巷11號
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
