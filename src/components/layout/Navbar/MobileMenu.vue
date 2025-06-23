<script setup lang="ts">
defineOptions({ name: 'MobileMenu' });

// 確保 ref, computed, watch 都已從 'vue' 導入
import { computed, watch, ref } from 'vue';
import type { NavbarItem } from '@/types/navbar';
import MobileMenuItem from './MobileMenuItem.vue';
import { useBrand } from '@/composables/useBrand';
import { MAIN_BRAND_NAME } from '@/constants/brands/brands';

// 導入 NavDropdown 和 NavDropdownItem
import NavDropdown from './Dropdown.vue';
import NavDropdownItem from './DropdownItem.vue';

const props = defineProps<{
    isOpen: boolean;
    items: NavbarItem[];
}>();

const emit = defineEmits(['close']);

const { currentBrand } = useBrand();

const getBrandPath = (path: string): string => {
    if (currentBrand.value === MAIN_BRAND_NAME || currentBrand.value === 'unknown') {
        return path;
    }
    return `/${currentBrand.value}${path.startsWith('/') ? path : '/' + path}`;
};

const filteredAndSortedItems = computed(() => {
    return props.items
        .filter(item => item.displayInNavbar !== false)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
});

watch(() => props.isOpen, (newVal) => {
    if (newVal) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// 以下是 NavbarActions 中的相關數據和方法，確保它們在 MobileMenu 中也可用
const languageOptions = ref([
    { id: 'zh-hant', text: '繁體中文' },
    { id: 'en-us', text: 'English' },
]);

function setLang(langid: string) {
    console.log('Set language to:', langid)
}

const isLoggedIn = ref(false); // 預設為 false
const user = ref({
    role: 'user',
    name: '王曉明',
    account: '@WangXiaoMeng',
    avatar: '/public/favicon/crazyclown/favicon.png'
});

const loggedOutActions = ref([
    { id: 'login', text: '登入', icon: 'bi-person-circle', action: 'login' },
    { id: 'divider-1', divider: true },
    { id: 'settings', text: '設定', icon: 'bi bi-gear', action: 'settings' },
]);

const userActions = ref([
    { id: 'manage', text: '管理帳戶', icon: 'bi bi-file-medical', action: 'manageAccount' },
    { id: 'switch', text: '切換帳戶', icon: 'bi bi-arrow-left-right', action: 'switchAccount' },
    { id: 'logout', text: '登出', icon: 'bi bi-box-arrow-right', action: 'logout' },
    { id: 'divider-1', divider: true },
    { id: 'settings', text: '設定', icon: 'bi bi-gear', action: 'settings' },
]);

const handleUserAction = (actionId: string) => {
    console.log('User onClick:', actionId);
    switch (actionId) {
        case 'login':
            isLoggedIn.value = true; // 模擬登入成功
            break;
        case 'logout':
            isLoggedIn.value = false; // 模擬登出
            break;
        // 其他動作...
        default:
            break;
    }
};
</script>

<template>
    <transition enter-active-class="transition ease-out duration-300 transform"
        enter-from-class="opacity-0 -translate-x-full" enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition ease-in duration-200 transform" leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 -translate-x-full">
        <div v-if="isOpen" class="fixed inset-0 z-40 bg-white dark:bg-zinc-900 lg:hidden overflow-y-auto shadow-xl">
            <div class="p-4">
                <div class="flex justify-end mb-4">
                    <button @click="emit('close')"
                        class="p-2 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <nav>
                    <ul class="space-y-2">
                        <MobileMenuItem v-for="item in filteredAndSortedItems" :key="item.path" :item="item"
                            :getBrandPath="getBrandPath" @close-menu="emit('close')" />
                    </ul>
                </nav>

                <hr class="my-4 border-zinc-200 dark:border-zinc-700" />

                <div class="mt-4 flex flex-col space-y-4">
                    <NavDropdown menu-width="w-30" class="w-full">
                        <template #button-content>
                            <div class="flex items-center justify-start space-x-2 p-2 w-full text-lg">
                                <i class="bi bi-translate"></i>
                                <span>語言</span>
                            </div>
                        </template>

                        <template #menu-items>
                            <NavDropdownItem v-for="lang in languageOptions" :key="lang.id"
                                :on-click="() => { setLang(lang.id); emit('close'); }" tag="div">
                                {{ lang.text }}
                            </NavDropdownItem>
                        </template>
                    </NavDropdown>

                    <NavDropdown menu-width="w-70" class="w-full">
                        <template #button-content>
                            <div class="flex items-center justify-start space-x-2 p-2 w-full text-lg">
                                <img v-if="isLoggedIn" :src="user.avatar" alt="" class="rounded-full w-7 h-7">
                                <i v-else class="bi bi-person-circle"></i>
                                <span>{{ isLoggedIn ? user.name : '帳戶' }}</span>
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
                                            <span
                                                class="px-2 text-xs border border-zinc-800 dark:border-zinc-200 rounded-full">
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
                                            <a href="#"
                                                @click.prevent="() => { handleUserAction(item.action ?? ''); emit('close'); }"
                                                class="block space-x-2">
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
                                            <a href="#"
                                                @click.prevent="() => { handleUserAction(item.action ?? ''); emit('close'); }"
                                                class="block space-x-2">
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
            </div>
        </div>
    </transition>
</template>

<style scoped></style>