import { ref } from 'vue';
<template>
    <Drawer
    header="CI > table > settings"
    aria-expanded="true"
    :position="'right'"
    :visible="props.show"
    @update:visible="handlerVisible"
    :style="{ width: '600px' }"

    >
        <template #header>
            <h1 class="ci-navdrawer__header text-2xl m-0 cursor-pointer">CI > table > settings</h1>
        </template>

        <template #default>
            <div class="drawer-settings flex flex-column align-items-stretch justify-content-start h-full w-full overflow-auto px-4 py-3">

                <!-- Size Table -->
                <div class="flex align-items-center">
                    <h3 class="ci-text font-light mr-3 text-xl w-5">Size Table</h3>
                    <Select
                    class="ci-text w-5"
                    v-model="selectedSizeTable"
                    :options="['Small', 'Large']"
                    checkmark
                    :highlightOnSelect="false"
                    @update:modelValue="(value) => emit('update:sizeTable', value.toLowerCase())"
                    >
                        <template #option="{option}">
                            <p class="ci-text font-light">{{ option }}</p>
                        </template>
                    </Select>
                </div>

                <!-- Show Grid Lines -->
                <div class="flex align-items-center mt-3">
                    <label class="ci-text font-light mr-3 text-xl w-5" for="checkbox-show-grid-lines">Show Grid Lines</label>
                    <Checkbox
                    :inputId="'checkbox-show-grid-lines'"
                    @update:modelValue="(value) => updateShowGridLines(value)"
                    v-model="showGridLines"
                    name="showGridLines"
                    :value="true"
                    />
                </div>

                <!-- Striped Rows -->
                <div class="flex align-items-center mt-3">
                    <label class="ci-text font-light mr-3 text-xl w-5" for="checkbox-striped-rows">Striped Rows</label>
                    <Checkbox
                    :inputId="'checkbox-striped-rows'"
                    @update:modelValue="(value) => updateStripedRows(value)"
                    v-model="stripedRows"
                    name="stripedRows"
                    :value="true"
                    />
                </div>

                <!-- Paginator -->
                <div class="flex align-items-center mt-3">
                    <label class="ci-text font-light mr-3 text-xl w-5" for="paginator">Paginator</label>
                    <Checkbox
                    :inputId="'paginator'"
                    @update:modelValue="(value) => updatePaginatorSelect(value)"
                    v-model="selectedPaginator"
                    name="paginator"
                    :value="true"
                    />
                </div>

                <!-- Date Template -->
                <div class="flex align-items-center mt-3">
                    <h3 class="ci-text font-light mr-3 text-xl w-5">Date Template</h3>
                    <Select 
                    class="ci-text w-5"
                    v-model="selectedDateTemplate" 
                    @update:modelValue="(value) => emit('update:dateTemplate', value)"
                    :options="dateTemplates" 
                    placeholder="Select a template" 
                    checkmark
                    :highlightOnSelect="false" 
                    >
                        <template #option="{option}">
                            <p class="ci-text font-light">{{ option }}</p>
                        </template>
                    </Select>
                </div>

            </div>
        </template>
        <template #footer>
            <p 
            class="font-italic" 
            style="font-family: monospace; color: var(--nav-color-copyright);"
            >
                (c) Command Interface Inc.
            </p>
        </template>
    </Drawer>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        required: false,
        default: false,
    },
    settings: {
        type: Object,
        required: true,
    }
});
const emit = defineEmits([
    'close', 
    'update:sizeTable', 
    'update:showGridLines', 
    'update:stripedRows', 
    'update:paginatorSelect', 
    'update:dateTemplate'
]);

const selectedSizeTable = ref('Large');
const showGridLines = ref([]);
const stripedRows = ref([]);
const selectedPaginator = ref([]);
const selectedDateTemplate = ref(null);
const dateTemplates = ref([]);

function handlerVisible(state) {
    if(state === false) return emit('close');
}

// Обработчик обновления showGridLines
function updateShowGridLines(value) {
    let readyValue = value.at(-1);
    if(readyValue === undefined) readyValue = false;
    emit('update:showGridLines', readyValue);
}

// Обработчик обновления stripedRows
function updateStripedRows(value) {
    let readyValue = value.at(-1);
    if(readyValue === undefined) readyValue = false;
    emit('update:stripedRows', readyValue);
}

// Обработчик обновления paginator
function updatePaginatorSelect(value) {
    let readyValue = value.at(-1);
    if(readyValue === undefined) readyValue = false;
    emit('update:paginatorSelect', readyValue);
}

watch(() => props.settings, (newValue) => {
    if(newValue) {
        // sizeTable
        selectedSizeTable.value = newValue.sizeTable
            .split('')
            .map((word, index) => (index === 0)? word.toUpperCase() : word)
            .join('');

        // showGridLines
        showGridLines.value = [newValue.showGridLines];

        // stripedRows
        stripedRows.value = [newValue.stripedRows];

        // paginator
        selectedPaginator.value = [newValue.paginator];

        // dateTemplates
        dateTemplates.value = props.settings.dateTemplates;
        selectedDateTemplate.value = props.settings.selectDateTemplate;
    }
})


</script>

<style scoped>

</style>