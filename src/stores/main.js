import { ref } from "vue";
import { defineStore } from "pinia";

export const useMainStore = defineStore("mainStore", () => {

    // STATE
    const isShowNavdrawer = ref(true);

    return { isShowNavdrawer };
});
