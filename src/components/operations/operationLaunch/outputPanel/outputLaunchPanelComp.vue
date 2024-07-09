<template>
    <div class="output-panel w-full m-2 border-round-sm shadow-3">
        <header class="output-panel__header ci-block flex justify-content-end align-items-center mx-2 pb-1">
            <span class="mr-2">View:</span>
            <SelectButton v-model="selectedModeView" :options="options" optionLabel="value" dataKey="value" aria-labelledby="custom">
                <template #option="slotProps">
                    <i :class="slotProps.option.icon"></i>
                </template>
            </SelectButton>
        </header>
    </div>
</template>

<script setup>
import { ref } from 'vue'

// ########################################  DATA  #########################################
const selectedModeView = ref('code')   // table | code 
const options = ref([
    { icon: 'pi pi-table', value: 'table' },
    { icon: 'pi pi-code', value: 'code' },
]);
function handlerSelectModeView(mode) {
    selectedModeView.value = mode;
}


</script>

<style scoped>
.output-panel {
    background-color: rgb(253, 253, 253) !important;
}
.output-panel__header {
    border-bottom: 1px solid var(--block-border-color);
}
</style>