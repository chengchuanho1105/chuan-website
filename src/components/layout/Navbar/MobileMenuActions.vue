<script setup lang="ts">
import { ref } from 'vue';
import NavDropdown from './Dropdown.vue';
import NavDropdownItem from './DropdownItem.vue';
import { useUserActions } from '@/composables/useUserActions';

defineOptions({ name: 'MobileMenuActions' });

const emit = defineEmits(['close']);

const languageOptions = ref([
    { id: 'zh-hant', text: '繁體中文' },
    { id: 'en-us', text: 'English' },
]);

function setLang(langid: string) {
    console.log('設定語言為:', langid);
    emit('close');
}

const { isLoggedIn, user, loggedOutActions, userActions, handleUserAction } = useUserActions();

const handleUserActionAndClose = (action: string) => {
    handleUserAction(action);
    emit('close');
};
</script>

<template>
    <div class="px-2 pt-2 pb-3 space-y-1">
        <NavDropdown align="left" menu-width="w-full" class="w-full block"> <template #button-content>
                <div class="flex items-center w-full px-4 py-2 text-base font-medium text-gray-800 dark:text-gray-200
                            hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-left">
                    <i class="bi bi-translate text-xl"></i>
                    <span class="ml-2">語言</span>
                </div>
            </template>
            <template #dropdown-content>
                <div class="py-1">
                    <NavDropdownItem v-for="lang in languageOptions" :key="lang.id" @click="setLang(lang.id)">
                        <a href="#" class="block px-4 py-2 space-x-2 w-full text-left"> <span>{{ lang.text }}</span>
                        </a>
                    </NavDropdownItem>
                </div>
            </template>
        </NavDropdown>

        <NavDropdown align="left" menu-width="w-full" class="w-full block"> <template #button-content>
                <div v-if="isLoggedIn" class="flex items-center w-full px-4 py-2 text-base font-medium text-gray-800 dark:text-gray-200
                           hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-left">
                    <img :src="user.avatar" alt="Avatar" class="h-8 w-8 rounded-full">
                    <span class="ml-2">{{ user.account }}</span>
                </div>
                <div v-else class="flex items-center w-full px-4 py-2 text-base font-medium text-gray-800 dark:text-gray-200
                           hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-left">
                    <i class="bi bi-person-circle text-xl"></i>
                    <span class="ml-2">會員中心</span>
                </div>
            </template>
            <template #dropdown-content>
                <template v-if="isLoggedIn">
                    <div class="py-1 px-4 text-sm text-gray-700 dark:text-gray-300">
                        <div class="font-medium text-black dark:text-white">{{ user.name }}</div>
                        <div class="">{{ user.account }}</div>
                    </div>
                    <hr class="my-1 border-zinc-200 dark:bg-zinc-600">
                    <template v-for="item in userActions" :key="item.id">
                        <hr v-if="item.divider" class="my-1 border-zinc-200 dark:bg-zinc-600">
                        <div class="py-1" v-else>
                            <NavDropdownItem>
                                <a href="#" @click.prevent="handleUserActionAndClose(item.action ?? '')"
                                    class="block space-x-2 w-full"> <i v-if="item.icon" :class="item.icon"></i>
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
                                <a href="#" @click.prevent="handleUserActionAndClose(item.action ?? '')"
                                    class="block space-x-2 w-full"> <i v-if="item.icon" :class="item.icon"></i>
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