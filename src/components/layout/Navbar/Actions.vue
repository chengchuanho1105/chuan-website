<script setup lang="ts">
defineOptions({ name: 'NavbarActions' });

import { ref } from 'vue';
import NavDropdown from './Dropdown.vue';
import NavDropdownItem from './DropdownItem.vue';

const languageOptions = ref([
  { id: 'zh-hant', text: '繁體中文' },
  { id: 'en-us', text: 'English' },
]);

function setLang(langid: string) {
  console.log('Set language to:', langid)
}

// 新增一個判斷是否登入的狀態變數
const isLoggedIn = ref(false); // 這裡預設為 true，你可以根據實際登入邏輯設定

const user = ref({
  role: 'user',
  name: '王曉明',
  account: '@WangXiaoMeng',
  avatar: '/public/favicon/crazyclown/favicon.png'
});

// 未登入時只顯示選項
const loggedOutActions = ref([
  { id: 'login', text: '登入', icon: 'bi-person-circle', action: 'login' },
  { id: 'divider-1', divider: true },
  { id: 'settings', text: '設定', icon: 'bi bi-gear', action: 'settings' },
]);

// 登入時只顯示選項
const userActions = ref([
  { id: 'manage', text: '管理帳戶', icon: 'bi bi-file-medical', action: 'manageAccount' },
  { id: 'switch', text: '切換帳戶', icon: 'bi bi-arrow-left-right', action: 'switchAccount' },
  { id: 'logout', text: '登出', icon: 'bi bi-box-arrow-right', action: 'logout' },
  { id: 'divider-1', divider: true },
  { id: 'settings', text: '設定', icon: 'bi bi-gear', action: 'settings' },
]);

// 處理使用者動作的函數
const handleUserAction = (actionId: string) => {
  console.log('User onClick:', actionId);
  // 根據 actionId 執行不同的邏輯
  switch (actionId) {
    case 'manageAccount':
      // 處理管理帳戶邏輯
      break;
    case 'switchAccount':
      // 處理切換帳戶邏輯
      break;
    case 'logout':
      // 處理登出邏輯
      break;
    case 'settings':
      // 處理設定邏輯
      break;
    default:
      break;
  }
};

</script>

<template>
  <div class="flex items-center space-x-5">

    <NavDropdown menu-width="w-30">
      <template #button-content>
        <i class="bi bi-translate"></i>
      </template>

      <template #menu-items>
        <NavDropdownItem v-for="lang in languageOptions" :key="lang.id" :on-click="() => setLang(lang.id)" tag="div">
          {{ lang.text }}
        </NavDropdownItem>
      </template>
    </NavDropdown>

    <NavDropdown menu-width="w-70">
      <template #button-content>
        <img v-if="isLoggedIn" :src="user.avatar" alt="" class="rounded-full">
        <div v-else class="mx-2">
          <i class="bi bi-person-circle"></i>
          /
          <i class="bi bi-gear"></i>
        </div>

      </template>

      <template #menu-items>
        <template v-if="isLoggedIn">
          <div class="flex flex-row px-4 py-2 space-x-4 items-center">
            <div class="text-black dark:text-white">
              <img :src="user.avatar" alt="" class="w-10 h-10 rounded-full">
            </div>
            <div class="flex flex-col text-base text-black dark:text-white">
              <div class="flex flex-row space-x-2 items-center">
                <span class="">
                  {{ user.name }}
                </span>
                <span class="px-2 text-xs border border-zinc-800 dark:border-zinc-200 rounded-full">
                  {{ user.role }}
                </span>
              </div>
              <span class="">{{ user.account }}</span>
            </div>
          </div>
          <hr class="my-1 border-zinc-200 dark:bg-zinc-600">
          <template v-for="item in userActions" :key="item.id">
            <hr v-if="item.divider" class="my-1 border-zinc-200 dark:bg-zinc-600">
            <div class="py-1" v-else>
              <NavDropdownItem>
                <a href="#" @click.prevent="handleUserAction(item.action ?? '')" class="block space-x-2">
                  <i v-if="item.icon" :class="item.icon"></i>
                  <span class="">
                    {{ item.text }}
                  </span>
                </a>
              </NavDropdownItem>
            </div>
          </template>
        </template>
        <template v-else>
          <template v-for="item in loggedOutActions" :key="item.id">
            <hr v-if="item.divider" class="my-1 border-zinc-200 dark:bg-zinc-600">
            <div class="py-1" v-else>
              <NavDropdownItem>
                <a href="#" @click.prevent="handleUserAction(item.action ?? '')" class="block space-x-2">
                  <i v-if="item.icon" :class="item.icon"></i>
                  <span class="">
                    {{ item.text }}
                  </span>
                </a>
              </NavDropdownItem>
            </div>
          </template>
        </template>
      </template>
    </NavDropdown>

  </div>
</template>

<style scoped></style>