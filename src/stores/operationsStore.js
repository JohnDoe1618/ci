
import { defineStore } from "pinia";
import { ref } from "vue";

export const useOperationsStore = defineStore('operationsStore', () => {

    const runningOperation = ref(null);

    return {
        runningOperation,
    }
});