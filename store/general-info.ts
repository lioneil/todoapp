import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGeneralInfoStore = defineStore('general-info', () => {
  const shown = ref(true);
  const text = ref(`This application uses the browser's Local Storage to store data`);

  function toggle() {
    shown.value = !shown.value;
  }

  return { text, shown, toggle };
});
