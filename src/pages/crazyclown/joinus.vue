<script setup lang="ts">
defineOptions({ name: 'CrazyClown-TestPage' });
import { ref, watch } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';


// 輔助函式：檢查字串是否為空 (考慮 trim())
const isStringEmpty = (value: string | null | undefined): boolean => {
  return value === null || value === undefined || (typeof value === 'string' && value.trim() === '');
};

// 輔助函式：檢查數字是否為有效非負數字
const isValidPositiveNumber = (value: number | null | undefined): boolean => {
  return value !== null && value !== undefined && !isNaN(value) && value >= 0;
};

// 輔助函式：根據值和焦點狀態更新驗證狀態
const updateValidationStatus = <T>(
  value: T,
  isFocused: Ref<boolean>,
  statusRef: Ref<null | 'success' | 'error'>,
  validationFn: (val: T) => boolean
) => {
  if (validationFn(value)) {
    statusRef.value = 'success';
  } else if (!isFocused.value) { // 僅在失去焦點且驗證失敗時標記為錯誤
    statusRef.value = 'error';
  } else {
    statusRef.value = null; // 聚焦時或有內容但還未完全驗證時，重置為 null
  }
};

// --- Form State Variables ---

// 暱稱
const nickName = ref('');
const isNickNameFocused = ref(false);
const nickNameStatus = ref<null | 'success' | 'error'>(null);
const handleNickNameBlur = () => {
  isNickNameFocused.value = false;
  updateValidationStatus(nickName.value, isNickNameFocused, nickNameStatus, (val) => !isStringEmpty(val));
};
watch(nickName, (newValue) => {
  updateValidationStatus(newValue, isNickNameFocused, nickNameStatus, (val) => !isStringEmpty(val));
});

// Discord 使用者名稱
const discordUsername = ref('');
const isDiscordUsernameFocused = ref(false);
const discordUsernameStatus = ref<null | 'success' | 'error'>(null);
const handleDiscordUsernameBlur = () => {
  isDiscordUsernameFocused.value = false;
  updateValidationStatus(discordUsername.value, isDiscordUsernameFocused, discordUsernameStatus, (val) => !isStringEmpty(val));
};
watch(discordUsername, (newValue) => {
  updateValidationStatus(newValue, isDiscordUsernameFocused, discordUsernameStatus, (val) => !isStringEmpty(val));
});

// 申請遊戲 (下拉選單)
const gameOptions = [{ value: '', label: '請選擇遊戲' }, { value: 'PUBG', label: 'PUBG' }];
const gameApplied = ref<string | null>(null); // 將初始值設為 null
const isGameAppliedFocused = ref(false);
const gameAppliedStatus = ref<null | 'success' | 'error'>(null);
const handleGameAppliedBlur = () => {
  isGameAppliedFocused.value = false;
  // 對於下拉選單，只要選擇了非空的 value 就算成功，如果還是 null/空字串就算錯誤
  updateValidationStatus(gameApplied.value, isGameAppliedFocused, gameAppliedStatus, (val) => !isStringEmpty(val));
};
watch(gameApplied, (newValue) => {
  updateValidationStatus(newValue, isGameAppliedFocused, gameAppliedStatus, (val) => !isStringEmpty(val));
});

// 遊戲 ID
const gameId = ref('');
const isGameIdFocused = ref(false);
const gameIdStatus = ref<null | 'success' | 'error'>(null);
const handleGameIdBlur = () => {
  isGameIdFocused.value = false;
  updateValidationStatus(gameId.value, isGameIdFocused, gameIdStatus, (val) => !isStringEmpty(val));
};
watch(gameId, (newValue) => {
  updateValidationStatus(newValue, isGameIdFocused, gameIdStatus, (val) => !isStringEmpty(val));
});

// 累計遊玩時數
const totalPlaytime = ref<number | null>(null);
const isTotalPlaytimeFocused = ref(false);
const totalPlaytimeStatus = ref<null | 'success' | 'error'>(null);
const handleTotalPlaytimeBlur = () => {
  isTotalPlaytimeFocused.value = false;
  updateValidationStatus(totalPlaytime.value, isTotalPlaytimeFocused, totalPlaytimeStatus, isValidPositiveNumber);
};
watch(totalPlaytime, (newValue) => {
  updateValidationStatus(newValue, isTotalPlaytimeFocused, totalPlaytimeStatus, isValidPositiveNumber);
});

// 每週遊玩時數
const weeklyPlaytime = ref<number | null>(null);
const isWeeklyPlaytimeFocused = ref(false);
const weeklyPlaytimeStatus = ref<null | 'success' | 'error'>(null);
const handleWeeklyPlaytimeBlur = () => {
  isWeeklyPlaytimeFocused.value = false;
  updateValidationStatus(weeklyPlaytime.value, isWeeklyPlaytimeFocused, weeklyPlaytimeStatus, isValidPositiveNumber);
};
watch(weeklyPlaytime, (newValue) => {
  updateValidationStatus(newValue, isWeeklyPlaytimeFocused, weeklyPlaytimeStatus, isValidPositiveNumber);
});

// 是否有朋友一同加入
const hasFriends = ref(false);
watch(hasFriends, (newValue) => {
  if (!newValue) {
    friendGameId.value = ''; // 如果不選擇有朋友，清空朋友ID
    friendGameIdStatus.value = null; // 重置朋友ID的狀態
  }
});

// 朋友遊戲 ID
const friendGameId = ref('');
const isFriendGameIdFocused = ref(false);
const friendGameIdStatus = ref<null | 'success' | 'error'>(null);
const handleFriendGameIdBlur = () => {
  isFriendGameIdFocused.value = false;
  if (hasFriends.value) { // 只有當 hasFriends 為 true 時才驗證
    updateValidationStatus(friendGameId.value, isFriendGameIdFocused, friendGameIdStatus, (val) => !isStringEmpty(val));
  } else {
    friendGameIdStatus.value = null; // 如果沒有朋友，則不驗證
  }
};
watch(friendGameId, (newValue) => {
  if (hasFriends.value) { // 只有當 hasFriends 為 true 時才監聽
    updateValidationStatus(newValue, isFriendGameIdFocused, friendGameIdStatus, (val) => !isStringEmpty(val));
  } else {
    friendGameIdStatus.value = null;
  }
});


// 備註
const notes = ref('');
const isNotesFocused = ref(false);
const notesStatus = ref<null | 'success' | 'error'>(null);
const handleNotesBlur = () => {
  isNotesFocused.value = false;
  notesStatus.value = notes.value.trim() !== '' ? 'success' : null;
};
watch(notes, (newValue) => {
  notesStatus.value = newValue.trim() !== '' ? 'success' : null;
});

// --- Form Submission and Validation ---
const isFormValid = ref(false);
const showErrorMessage = ref(false); // 保持錯誤訊息在原位顯示

// 新增 Modal 相關狀態
const showSuccessModal = ref(false);

const validateForm = () => {
  // 觸發所有必填欄位的驗證，確保在提交前更新狀態
  handleNickNameBlur();
  handleDiscordUsernameBlur();
  handleGameAppliedBlur();
  handleGameIdBlur();
  handleTotalPlaytimeBlur();
  handleWeeklyPlaytimeBlur();
  handleFriendGameIdBlur(); // 即使沒有朋友，也會執行，但會被內部邏輯處理

  isFormValid.value = (
    nickNameStatus.value === 'success' &&
    discordUsernameStatus.value === 'success' &&
    gameAppliedStatus.value === 'success' &&
    gameIdStatus.value === 'success' &&
    totalPlaytimeStatus.value === 'success' &&
    weeklyPlaytimeStatus.value === 'success' &&
    (!hasFriends.value || friendGameIdStatus.value === 'success') // 如果有朋友，朋友ID必須成功
  );
};

const handleSubmit = async (event: Event) => {
  // 防止表單預設提交行為
  event.preventDefault();

  validateForm();

  if (isFormValid.value) {
    const formData = {
      暱稱: nickName.value,
      Discord使用者名稱: discordUsername.value,
      申請的遊戲: gameApplied.value,
      遊戲ID: gameId.value,
      累計遊玩時數: totalPlaytime.value,
      每週遊玩時數: weeklyPlaytime.value,
      是否有朋友一同加入: hasFriends.value ? '是' : '否',
      朋友遊戲ID: hasFriends.value ? friendGameId.value : '無',
      備註: notes.value || '無',
    };

    try {
      const response = await fetch('https://formspree.io/f/xpwrbkjp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        showSuccessModal.value = true; // 提交成功，顯示 Modal
        showErrorMessage.value = false;
        // 注意：這裡不呼叫 handleResetForm()，讓使用者可以在 Modal 中看到已填寫的內容
      } else {
        showErrorMessage.value = true;
        showSuccessModal.value = false; // 確保 Modal 不顯示
        setTimeout(() => {
          showErrorMessage.value = false;
        }, 5000);
        console.error('表單提交失敗:', response.statusText);
      }
    } catch (error) {
      showErrorMessage.value = true;
      showSuccessModal.value = false; // 確保 Modal 不顯示
      setTimeout(() => {
        showErrorMessage.value = false;
      }, 5000);
      console.error('提交過程中發生錯誤:', error);
    }
  } else {
    const firstErrorField = document.querySelector('.border-red-500');
    if (firstErrorField) {
      firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
};

// --- Reset Function ---
const handleResetForm = () => {
  nickName.value = '';
  isNickNameFocused.value = false;
  nickNameStatus.value = null;

  discordUsername.value = '';
  isDiscordUsernameFocused.value = false;
  discordUsernameStatus.value = null;

  gameApplied.value = null;
  isGameAppliedFocused.value = false;
  gameAppliedStatus.value = null;

  gameId.value = '';
  isGameIdFocused.value = false;
  gameIdStatus.value = null;

  totalPlaytime.value = null;
  isTotalPlaytimeFocused.value = false;
  totalPlaytimeStatus.value = null;

  weeklyPlaytime.value = null;
  isWeeklyPlaytimeFocused.value = false;
  weeklyPlaytimeStatus.value = null;

  hasFriends.value = false;
  friendGameId.value = '';
  isFriendGameIdFocused.value = false;
  friendGameIdStatus.value = null;

  notes.value = '';
  isNotesFocused.value = false;
  notesStatus.value = null;

  // 重置表單時隱藏所有提示
  showErrorMessage.value = false;
  showSuccessModal.value = false; // 確保 Modal 也被隱藏
};

const router = useRouter();

// 關閉成功 Modal 並重置表單
const closeSuccessModalAndResetForm = () => {
  showSuccessModal.value = false;
  handleResetForm();
  router.push({ name: 'crazyclown-Home' });
};
</script>

<template>
  <div class="min-h-screen text-gray-900 dark:bg-zinc-900 transition-colors duration-300">
    <form class="max-w-[1024px] container mx-auto p-8" autocomplete="off" @submit="handleSubmit">

      <div class="mt-10"></div>

      <div class="mb-8 p-6 bg-white rounded-lg shadow-md dark:bg-zinc-800 dark:shadow-lg">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-extrabold text-gray-800 dark:text-zinc-50 mb-2">🎮 遊戲戰隊/公會申請</h1>
          <p class="text-lg text-gray-600 dark:text-zinc-300">
            歡迎加入我們的大家庭！請詳細填寫以下資料，讓我們更了解您。
          </p>
        </div>

        <div class="border-l-4 border-yellow-500 bg-yellow-50 dark:bg-zinc-700 p-4 mb-6 rounded-md shadow-inner">
          <div class="flex items-center">
            <svg class="h-6 w-6 text-yellow-600 dark:text-yellow-400 mr-3 flex-shrink-0" fill="none"
              stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z">
              </path>
            </svg>
            <h2 class="text-2xl font-bold text-yellow-700 dark:text-yellow-300">重要注意事項</h2>
          </div>
          <hr class="my-3 border-yellow-300 dark:border-zinc-600">
          <ul class="list-disc pl-5 space-y-2 text-gray-700 dark:text-zinc-200">
            <li>
              申請提交後，請務必<a href="https://discord.gg/3TEHPZhYUK"><span class="font-bold text-red-500">立即加入</span></a>我們的
              <a href="https://discord.gg/3TEHPZhYUK" target="_blank" rel="noopener noreferrer"
                class="text-blue-600 dark:text-blue-400 font-semibold hover:underline transition-colors duration-200 flex-grow-0 inline-flex items-center">
                「戰隊Discord社群」
                <svg class="ml-1 h-4 w-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>。
            </li>
            <li>
              審核進度請留意戰隊Discord社群中：
              <a href="https://discord.com/channels/490129931808931840/1389642260936790211" target="_blank"
                rel="noopener noreferrer"
                class="text-blue-600 dark:text-blue-400 font-semibold hover:underline transition-colors duration-200 flex-grow-0 inline-flex items-center">
                <span class="font-mono text-purple-700 dark:text-purple-300">「#⚖️⇜戰隊審核進度」</span> 頻道
                <svg class="ml-1 h-4 w-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>。
            </li>
          </ul>
        </div>

      </div>

      <div v-if="showErrorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
        role="alert">
        <strong class="font-bold">提交失敗！</strong>
        <span class="block sm:inline">您的申請未能送出，請稍後再試或聯繫管理員。</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" @click="showErrorMessage = false">
          <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <title>Close</title>
            <path
              d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.103l-2.651 3.746a1.2 1.2 0 0 1-1.697-1.697l3.746-2.651-3.746-2.651a1.2 1.2 0 0 1 1.697-1.697L10 8.897l2.651-3.746a1.2 1.2 0 0 1 1.697 1.697L11.103 10l3.746 2.651a1.2 1.2 0 0 1 0 1.697z" />
          </svg>
        </span>
      </div>

      <div class="mb-8 p-6 bg-white rounded-lg shadow-md dark:bg-zinc-800 dark:shadow-lg">
        <h2 class="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-2">您的基本資料</h2>
        <p class="text-gray-600 dark:text-zinc-300 mb-6">請填寫您的暱稱與Discord使用者名稱。</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="relative border-2 rounded-md px-3 py-2 transition-all duration-200 ease-in-out" :class="{
            'border-gray-300 dark:border-zinc-600': !isNickNameFocused && nickNameStatus === null,
            'border-blue-500 dark:border-blue-400': isNickNameFocused,
            'border-green-500 dark:border-green-400': !isNickNameFocused && nickNameStatus === 'success',
            'border-red-500 dark:border-red-400': !isNickNameFocused && nickNameStatus === 'error',
          }">
            <label for="nickName" class="absolute left-3 transition-all duration-200 ease-in-out pointer-events-none"
              :class="{
                'text-gray-600 dark:text-zinc-400': !isNickNameFocused && !nickName,
                'text-blue-500 dark:text-blue-400': isNickNameFocused,
                'text-green-500 dark:text-green-400': !isNickNameFocused && nickNameStatus === 'success',
                'text-red-500 dark:text-red-400': !isNickNameFocused && nickNameStatus === 'error',
                'text-xs -top-2 bg-white dark:bg-zinc-800 px-1': isNickNameFocused || nickName,
                'top-1/2 -translate-y-1/2': !isNickNameFocused && !nickName
              }">
              暱稱 <span class="text-red-500 dark:text-red-400">*</span>
            </label>
            <input type="text" id="nickName" v-model="nickName" @focus="isNickNameFocused = true"
              @blur="handleNickNameBlur"
              class="block w-full px-1 pt-3 pb-1 bg-transparent appearance-none h-10
                      text-gray-900 dark:text-zinc-100 focus:outline-none placeholder-gray-400 dark:placeholder-zinc-500" placeholder=""
              autocomplete="off" name="暱稱" />
            <p v-if="nickNameStatus === 'error'"
              class="absolute -bottom-5 left-0 text-red-500 dark:text-red-400 text-xs">
              請輸入暱稱
            </p>
          </div>

          <div class="relative border-2 rounded-md px-3 py-2 transition-all duration-200 ease-in-out" :class="{
            'border-gray-300 dark:border-zinc-600': !isDiscordUsernameFocused && discordUsernameStatus === null,
            'border-blue-500 dark:border-blue-400': isDiscordUsernameFocused,
            'border-green-500 dark:border-green-400': !isDiscordUsernameFocused && discordUsernameStatus === 'success',
            'border-red-500 dark:border-red-400': !isDiscordUsernameFocused && discordUsernameStatus === 'error',
          }">
            <label for="discordUsername"
              class="absolute left-3 transition-all duration-200 ease-in-out pointer-events-none" :class="{
                'text-gray-600 dark:text-zinc-400': !isDiscordUsernameFocused && !discordUsername,
                'text-blue-500 dark:text-blue-400': isDiscordUsernameFocused,
                'text-green-500 dark:text-green-400': !isDiscordUsernameFocused && discordUsernameStatus === 'success',
                'text-red-500 dark:text-red-400': !isDiscordUsernameFocused && discordUsernameStatus === 'error',
                'text-xs -top-2 bg-white dark:bg-zinc-800 px-1': isDiscordUsernameFocused || discordUsername,
                'top-1/2 -translate-y-1/2': !isDiscordUsernameFocused && !discordUsername
              }">
              Discord 使用者名稱 <span class="text-red-500 dark:text-red-400">*</span>
            </label>
            <input type="text" id="discordUsername" v-model="discordUsername" @focus="isDiscordUsernameFocused = true"
              @blur="handleDiscordUsernameBlur"
              class="block w-full px-1 pt-3 pb-1 bg-transparent appearance-none h-10
                      text-gray-900 dark:text-zinc-100 focus:outline-none placeholder-gray-400 dark:placeholder-zinc-500" placeholder=""
              autocomplete="off" name="Discord 使用者名稱" />
            <p v-if="discordUsernameStatus === 'error'"
              class="absolute -bottom-5 left-0 text-red-500 dark:text-red-400 text-xs">
              請輸入 Discord 使用者名稱
            </p>
          </div>
        </div>

      </div>

      <div class="mb-8 p-6 bg-white rounded-lg shadow-md dark:bg-zinc-800 dark:shadow-lg">
        <h2 class="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-2">您的遊戲資料</h2>
        <p class="text-gray-600 dark:text-zinc-300 mb-6">請提供您的遊戲相關資訊，幫助我們更好地為您分配合適的社群。</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="relative border-2 rounded-md px-3 py-2 transition-all duration-200 ease-in-out" :class="{
            'border-gray-300 dark:border-zinc-600': !isGameAppliedFocused && gameAppliedStatus === null,
            'border-blue-500 dark:border-blue-400': isGameAppliedFocused,
            'border-green-500 dark:border-green-400': !isGameAppliedFocused && gameAppliedStatus === 'success',
            'border-red-500 dark:border-red-400': !isGameAppliedFocused && gameAppliedStatus === 'error',
          }">
            <label for="gameApplied" class="absolute left-3 transition-all duration-200 ease-in-out pointer-events-none"
              :class="{
                'text-gray-600 dark:text-zinc-400': !isGameAppliedFocused && gameApplied === null,
                'text-blue-500 dark:text-blue-400': isGameAppliedFocused,
                'text-green-500 dark:text-green-400': !isGameAppliedFocused && gameAppliedStatus === 'success',
                'text-red-500 dark:text-red-400': !isGameAppliedFocused && gameAppliedStatus === 'error',
                'text-xs -top-2 bg-white dark:bg-zinc-800 px-1': isGameAppliedFocused || gameApplied !== null,
                'top-1/2 -translate-y-1/2': !isGameAppliedFocused && gameApplied === null
              }">
              申請的遊戲 <span class="text-red-500 dark:text-red-400">*</span>
            </label>
            <select id="gameApplied" v-model="gameApplied" @focus="isGameAppliedFocused = true"
              @blur="handleGameAppliedBlur" class="block w-full px-1 pt-3 pb-1 bg-transparent appearance-none h-10 cursor-pointer
                      text-gray-900 dark:text-zinc-100 focus:outline-none" autocomplete="off" name="申請的遊戲">
              <option v-for="game in gameOptions" :key="game.value" :value="game.value" :disabled="game.value === ''"
                class="bg-white dark:bg-zinc-700 text-gray-900 dark:text-zinc-100">
                {{ game.label }}
              </option>
            </select>
            <p v-if="gameAppliedStatus === 'error'"
              class="absolute -bottom-5 left-0 text-red-500 dark:text-red-400 text-xs">請選擇申請的遊戲</p>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-zinc-300">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          <div class="relative border-2 rounded-md px-3 py-2 transition-all duration-200 ease-in-out" :class="{
            'border-gray-300 dark:border-zinc-600': !isGameIdFocused && gameIdStatus === null,
            'border-blue-500 dark:border-blue-400': isGameIdFocused,
            'border-green-500 dark:border-green-400': !isGameIdFocused && gameIdStatus === 'success',
            'border-red-500 dark:border-red-400': !isGameIdFocused && gameIdStatus === 'error',
          }">
            <label for="gameId" class="absolute left-3 transition-all duration-200 ease-in-out pointer-events-none"
              :class="{
                'text-gray-600 dark:text-zinc-400': !isGameIdFocused && !gameId,
                'text-blue-500 dark:text-blue-400': isGameIdFocused,
                'text-green-500 dark:text-green-400': !isGameIdFocused && gameIdStatus === 'success',
                'text-red-500 dark:text-red-400': !isGameIdFocused && gameIdStatus === 'error',
                'text-xs -top-2 bg-white dark:bg-zinc-800 px-1': isGameIdFocused || gameId,
                'top-1/2 -translate-y-1/2': !isGameIdFocused && !gameId
              }">
              遊戲 ID <span class="text-red-500 dark:text-red-400">*</span>
            </label>
            <input type="text" id="gameId" v-model="gameId" @focus="isGameIdFocused = true" @blur="handleGameIdBlur"
              class="block w-full px-1 pt-3 pb-1 bg-transparent appearance-none h-10
                      text-gray-900 dark:text-zinc-100 focus:outline-none placeholder-gray-400 dark:placeholder-zinc-500"
              placeholder="" autocomplete="off" name="遊戲 ID" />
            <p v-if="gameIdStatus === 'error'" class="absolute -bottom-5 left-0 text-red-500 dark:text-red-400 text-xs">
              請輸入遊戲 ID</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div class="relative border-2 rounded-md px-3 py-2 transition-all duration-200 ease-in-out" :class="{
            'border-gray-300 dark:border-zinc-600': !isTotalPlaytimeFocused && totalPlaytimeStatus === null,
            'border-blue-500 dark:border-blue-400': isTotalPlaytimeFocused,
            'border-green-500 dark:border-green-400': !isTotalPlaytimeFocused && totalPlaytimeStatus === 'success',
            'border-red-500 dark:border-red-400': !isTotalPlaytimeFocused && totalPlaytimeStatus === 'error',
          }">
            <label for="totalPlaytime"
              class="absolute left-3 transition-all duration-200 ease-in-out pointer-events-none" :class="{
                'text-gray-600 dark:text-zinc-400': !isTotalPlaytimeFocused && totalPlaytime === null,
                'text-blue-500 dark:text-blue-400': isTotalPlaytimeFocused,
                'text-green-500 dark:text-green-400': !isTotalPlaytimeFocused && totalPlaytimeStatus === 'success',
                'text-red-500 dark:text-red-400': !isTotalPlaytimeFocused && totalPlaytimeStatus === 'error',
                'text-xs -top-2 bg-white dark:bg-zinc-800 px-1': isTotalPlaytimeFocused || totalPlaytime !== null,
                'top-1/2 -translate-y-1/2': !isTotalPlaytimeFocused && totalPlaytime === null
              }">
              累計遊玩時數 <span class="text-red-500 dark:text-red-400">*</span>
            </label>
            <input type="number" id="totalPlaytime" v-model.number="totalPlaytime"
              @focus="isTotalPlaytimeFocused = true" @blur="handleTotalPlaytimeBlur"
              class="block w-full px-1 pt-3 pb-1 bg-transparent appearance-none h-10
                      text-gray-900 dark:text-zinc-100 focus:outline-none placeholder-gray-400 dark:placeholder-zinc-500" placeholder="" autocomplete="off" name="累計遊玩時數" />
            <p v-if="totalPlaytimeStatus === 'error'"
              class="absolute -bottom-5 left-0 text-red-500 dark:text-red-400 text-xs">請輸入有效數字</p>
          </div>

          <div class="relative border-2 rounded-md px-3 py-2 transition-all duration-200 ease-in-out" :class="{
            'border-gray-300 dark:border-zinc-600': !isWeeklyPlaytimeFocused && weeklyPlaytimeStatus === null,
            'border-blue-500 dark:border-blue-400': isWeeklyPlaytimeFocused,
            'border-green-500 dark:border-green-400': !isWeeklyPlaytimeFocused && weeklyPlaytimeStatus === 'success',
            'border-red-500 dark:border-red-400': !isWeeklyPlaytimeFocused && weeklyPlaytimeStatus === 'error',
          }">
            <label for="weeklyPlaytime"
              class="absolute left-3 transition-all duration-200 ease-in-out pointer-events-none" :class="{
                'text-gray-600 dark:text-zinc-400': !isWeeklyPlaytimeFocused && weeklyPlaytime === null,
                'text-blue-500 dark:text-blue-400': isWeeklyPlaytimeFocused,
                'text-green-500 dark:text-green-400': !isWeeklyPlaytimeFocused && weeklyPlaytimeStatus === 'success',
                'text-red-500 dark:text-red-400': !isWeeklyPlaytimeFocused && weeklyPlaytimeStatus === 'error',
                'text-xs -top-2 bg-white dark:bg-zinc-800 px-1': isWeeklyPlaytimeFocused || weeklyPlaytime !== null,
                'top-1/2 -translate-y-1/2': !isWeeklyPlaytimeFocused && weeklyPlaytime === null
              }">
              每週遊玩時數 <span class="text-red-500 dark:text-red-400">*</span>
            </label>
            <input type="number" id="weeklyPlaytime" v-model.number="weeklyPlaytime"
              @focus="isWeeklyPlaytimeFocused = true" @blur="handleWeeklyPlaytimeBlur"
              class="block w-full px-1 pt-3 pb-1 bg-transparent appearance-none h-10
                      text-gray-900 dark:text-zinc-100 focus:outline-none placeholder-gray-400 dark:placeholder-zinc-500" placeholder="" autocomplete="off" name="每週遊玩時數" />
            <p v-if="weeklyPlaytimeStatus === 'error'"
              class="absolute -bottom-5 left-0 text-red-500 dark:text-red-400 text-xs">請輸入有效數字
            </p>
          </div>
        </div>

      </div>

      <div class="mb-8 p-6 bg-white rounded-lg shadow-md dark:bg-zinc-800 dark:shadow-lg">
        <h2 class="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-2">其他相關資訊</h2>
        <p class="text-gray-600 dark:text-zinc-300 mb-6">如有其他希望讓我們了解的內容，歡迎在此補充。</p>

        <div class="grid grid-cols-1 gap-8">
          <div class="flex items-center mb-4">
            <input type="checkbox" id="hasFriends" v-model="hasFriends"
              class="mr-3 h-5 w-5 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-zinc-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400"
              name="是否有朋友一同加入">
            <label for="hasFriends" class="text-gray-900 dark:text-zinc-100 text-lg font-medium">是否有朋友一同加入?</label>
          </div>

          <div v-if="hasFriends" class="relative border-2 rounded-md px-3 py-2 transition-all duration-200 ease-in-out"
            :class="{
              'border-gray-300 dark:border-zinc-600': !isFriendGameIdFocused && friendGameIdStatus === null,
              'border-blue-500 dark:border-blue-400': isFriendGameIdFocused,
              'border-green-500 dark:border-green-400': !isFriendGameIdFocused && friendGameIdStatus === 'success',
              'border-red-500 dark:border-red-400': !isFriendGameIdFocused && friendGameIdStatus === 'error',
            }">
            <label for="friendGameId"
              class="absolute left-3 transition-all duration-200 ease-in-out pointer-events-none" :class="{
                'text-gray-600 dark:text-zinc-400': !isFriendGameIdFocused && !friendGameId,
                'text-blue-500 dark:text-blue-400': isFriendGameIdFocused,
                'text-green-500 dark:text-green-400': !isFriendGameIdFocused && friendGameIdStatus === 'success',
                'text-red-500 dark:text-red-400': !isFriendGameIdFocused && friendGameIdStatus === 'error',
                'text-xs -top-2 bg-white dark:bg-zinc-800 px-1': isFriendGameIdFocused || friendGameId,
                'top-1/2 -translate-y-1/2': !isFriendGameIdFocused && !friendGameId
              }">
              朋友遊戲 ID <span class="text-sm text-red-500 dark:text-red-400">(若有多位請用"、"區隔)</span> <span
                class="text-red-500 dark:text-red-400">*</span>
            </label>
            <input type="text" id="friendGameId" v-model="friendGameId" @focus="isFriendGameIdFocused = true"
              @blur="handleFriendGameIdBlur"
              class="block w-full px-1 pt-3 pb-1 bg-transparent appearance-none h-10
                      text-gray-900 dark:text-zinc-100 focus:outline-none placeholder-gray-400 dark:placeholder-zinc-500" placeholder=""
              autocomplete="off" name="朋友遊戲 ID" />
            <p v-if="friendGameIdStatus === 'error'"
              class="absolute -bottom-5 left-0 text-red-500 dark:text-red-400 text-xs">請輸入朋友遊戲 ID
            </p>
          </div>

          <div class="relative border-2 rounded-md px-3 py-2 transition-all duration-200 ease-in-out" :class="{
            'border-gray-300 dark:border-zinc-600': !isNotesFocused && notesStatus === null,
            'border-blue-500 dark:border-blue-400': isNotesFocused,
            'border-green-500 dark:border-green-400': !isNotesFocused && notesStatus === 'success',
            'border-red-500 dark:border-red-400': !isNotesFocused && notesStatus === 'error',
          }">
            <label for="notes" class="absolute left-3 transition-all duration-200 ease-in-out pointer-events-none"
              :class="{
                'text-gray-600 dark:text-zinc-400': !isNotesFocused && !notes,
                'text-blue-500 dark:text-blue-400': isNotesFocused,
                'text-green-500 dark:text-green-400': !isNotesFocused && notesStatus === 'success',
                'text-red-500 dark:text-red-400': !isNotesFocused && notesStatus === 'error',
                'text-xs -top-2 bg-white dark:bg-zinc-800 px-1': isNotesFocused || notes,
                'top-3': !isNotesFocused && !notes // 對於 textarea 調整預設 label 位置
              }">
              備註 (非必填)
            </label>
            <textarea id="notes" v-model="notes" @focus="isNotesFocused = true" @blur="handleNotesBlur"
              class="block w-full px-1 pt-6 pb-1 bg-transparent appearance-none h-24 resize-y
                      text-gray-900 dark:text-zinc-100 focus:outline-none placeholder-gray-400 dark:placeholder-zinc-500" placeholder="" name="備註"></textarea>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-10">
        <button type="button" @click="handleResetForm" class="inline-block w-1/2 md:w-1/3 rounded-l-full border
                                 border-gray-300 dark:border-zinc-700 bg-gray-200 dark:bg-zinc-700 px-5 py-3 font-medium
                                 text-gray-700 dark:text-zinc-200 shadow-sm transition-colors
                                 hover:bg-gray-300 dark:hover:bg-zinc-600">
          清除
        </button>
        <button type="submit" class="inline-block w-1/2 md:w-1/3 rounded-r-full border
                                 border-blue-600 dark:border-blue-500 bg-blue-600 dark:bg-blue-500 px-5 py-3 font-medium
                                 text-white shadow-sm transition-colors
                                 hover:bg-blue-700 dark:hover:bg-blue-600">
          提交申請
        </button>
      </div>

    </form>

    <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        class="bg-white dark:bg-zinc-800 rounded-lg shadow-xl p-8 max-w-sm w-full mx-auto relative transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-700">
            <svg class="h-6 w-6 text-green-600 dark:text-green-200" fill="none" stroke="currentColor"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="mt-4 text-xl leading-6 font-medium text-gray-900 dark:text-zinc-100" id="modal-title">
            申請已提交，請加入戰隊 Discord 社群！
          </h3>
          <div class="mt-4">
            <p class="text-lg text-gray-500 dark:text-zinc-300">
              您的遊戲戰隊/公會申請書已成功送出，感謝您的填寫。
            </p>
            <p class="text-lg text-gray-500 dark:text-zinc-300">
              為加速審核流程，請立即加入戰隊 Discord 社群**
            </p>
            <p class="text-lg text-red-600 dark:text-red-400 font-semibold mt-1">
              若未加入戰隊 Discord 社群將無法開始審核您的申請。
            </p>
          </div>
        </div>
        <div class="mt-5 sm:mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <button type="button"
            class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600 dark:border-zinc-600"
            @click="closeSuccessModalAndResetForm">
            回到首頁
          </button>
          <a href="https://discord.gg/3TEHPZhYUK" target="_blank" rel="noopener noreferrer"
            class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:text-sm dark:bg-purple-500 dark:hover:bg-purple-600">
            加入 Discord 社群
            <svg class="ml-2 -mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fill-rule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.295a.75.75 0 111.04-1.04l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.04-1.04l4.158-4.158H3.75A.75.75 0 013 10z"
                clip-rule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* 針對數字輸入框隱藏上下箭頭 */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  appearance: textfield;
  -moz-appearance: textfield;
  /* Firefox */
}

/* 確保下拉選單的選項在深色模式下也能正確顯示背景和文字 */
/* Tailwind 的 dark:bg-zinc-700 和 dark:text-zinc-100 會應用到這裡 */
</style>
