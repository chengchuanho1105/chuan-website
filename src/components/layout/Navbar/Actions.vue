<script setup lang="ts">
defineOptions({ name: 'NavbarActions' });

import { ref } from 'vue';
import NavDropdown from './Dropdown.vue';
import NavDropdownItem from './DropdownItem.vue';
import { useUserActions } from '@/composables/useUserActions';

const languageOptions = ref([
  { id: 'zh-hant', text: '繁體中文' },
  { id: 'en-us', text: 'English' },
]);

function setLang(langid: string) {
  console.log('設定語言為:', langid);
  // NavDropdownItem 內部會自動關閉選單，無需在此處手動關閉
}

const { isLoggedIn, user, loggedOutActions, userActions, handleUserAction } = useUserActions();
</script>

<template>
  <div class="flex items-center space-x-5">
    <NavDropdown align="right" menu-width="w-48">
      <template #button-content>
        <i class="bi bi-translate text-xl"></i>
      </template>
      <template #dropdown-content>
        <div class="py-1">
          <NavDropdownItem v-for="lang in languageOptions" :key="lang.id" @click="setLang(lang.id)">
            <a href="#" class="block space-x-2">
              <span>{{ lang.text }}</span>
            </a>
          </NavDropdownItem>
        </div>
      </template>
    </NavDropdown>

    <NavDropdown align="right" menu-width="w-75">
      <template #button-content>
        <template v-if="isLoggedIn">
          <img :src="user.avatar" alt="User Avatar" class="h-8 w-8 rounded-full" />
        </template>
        <template v-else>
          <i class="bi-person-circle text-xl"></i>
        </template>
      </template>
      <template #dropdown-content>
        <template v-if="isLoggedIn">
          <div class="flex flex-row px-4 py-2 space-x-4 items-center" role="none">
            <div class="text-black dark:text-white" role="none">
              <img :src="user.avatar" alt="User Avatar" class="w-10 h-10 rounded-full" role="none">
            </div>
            <div class="flex flex-col text-base text-black dark:text-white" role="none">
              <div class="flex flex-row space-x-2 items-center" role="none">
                <span class="" role="none">{{ user.name }}</span>
                <span v-if="user.role" class="px-2 text-xs border border-zinc-800 dark:border-zinc-200 rounded-full"
                  role="none">{{ user.role }}</span>
              </div>
              <span class="" role="none">{{ user.account }}</span>
            </div>
          </div>
          <hr class="my-1 border-zinc-200 dark:border-zinc-700">
          <template v-for="item in userActions" :key="item.id">
            <hr v-if="item.divider" class="my-1 border-zinc-200 dark:border-zinc-700">
            <div class="py-1" v-else>
              <NavDropdownItem @click="handleUserAction(item.action ?? '')">
                <a href="#" class="block space-x-2">
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
            <hr v-if="item.divider" class="my-1 border-zinc-200 dark:border-zinc-700">
            <div class="py-1" v-else>
              <NavDropdownItem @click="handleUserAction(item.action ?? '')">
                <a href="#" class="block space-x-2">
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