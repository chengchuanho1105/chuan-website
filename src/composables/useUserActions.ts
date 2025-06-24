// useUserActions.ts
import { ref, computed } from 'vue'

// 這裡我們假設有一個簡單的全局狀態來模擬登入狀態。
// 在實際應用中，您會使用 Pinia/Vuex 或其他更健壯的狀態管理方案。
const _isLoggedIn = ref(false) // 這是一個共享的 ref
const _user = ref({
  role: 'test',
  name: '王曉明',
  account: '@WangXiaoMeng',
  avatar: '/favicon/crazyclown/favicon.png',
})

const _loggedOutActions = ref([
  { id: 'login', text: '登入', icon: 'bi-person-circle', action: 'login' },
  { id: 'divider-1', divider: true },
  { id: 'settings', text: '設定', icon: 'bi bi-gear', action: 'settings' },
])

const _userActions = ref([
  { id: 'manage', text: '管理帳戶', icon: 'bi bi-file-medical', action: 'manageAccount' },
  { id: 'profile', text: '個人資料', icon: 'bi bi-person', action: 'viewProfile' },
  { id: 'messages', text: '我的訊息', icon: 'bi bi-chat-dots', action: 'viewMessages' },
  { id: 'divider-1', divider: true },
  { id: 'logout', text: '登出', icon: 'bi bi-box-arrow-right', action: 'logout' },
])

export function useUserActions() {
  const isLoggedIn = computed(() => _isLoggedIn.value)
  const user = computed(() => _user.value)
  const loggedOutActions = computed(() => _loggedOutActions.value)
  const userActions = computed(() => _userActions.value)

  const handleUserAction = (action: string) => {
    console.log('執行動作:', action)
    if (action === 'login') {
      _isLoggedIn.value = true // 模擬登入
      console.log('已登入')
    } else if (action === 'logout') {
      _isLoggedIn.value = false // 模擬登出
      console.log('已登出')
    } else if (action === 'settings') {
      alert('前往設定頁面')
    } else if (action === 'manageAccount') {
      alert('前往管理帳戶頁面')
    }
    // 其他動作處理...
  }

  return {
    isLoggedIn,
    user,
    loggedOutActions,
    userActions,
    handleUserAction,
  }
}
