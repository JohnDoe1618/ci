<template>
    <Drawer
    aria-expanded="true"
    :position="'right'"
    :visible="props.show"
    @update:visible="handlerVisible"
    :style="{ width: '600px' }"
    >
        <template #header>
            <h1 class="ci-navdrawer__header text-2xl m-0 cursor-pointer">CI > project > settings</h1>
        </template>

        <template #default>
            <div class="drawer-settings flex flex-column align-items-stretch justify-content-start h-full w-full overflow-auto px-4 py-3">
                <Accordion class="ci-block" value="4">
                    <AccordionPanel value="0">
                        <AccordionHeader>
                            <div class="flex align-items-center">
                                <i class="pi pi-image mr-2" style="font-size: 1.1rem"></i>
                                <p>Appearance</p>
                            </div>
                        </AccordionHeader>
                        <AccordionContent >
                            <!-- Content -->
                            <div class="ci-block py-3">
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
                                    <label class="ci-text font-light mr-3 text-xl w-5 cursor-pointer" for="checkbox-show-grid-lines">Show Grid Lines</label>
                                    <Checkbox
                                    :inputId="'checkbox-show-grid-lines'"
                                    @update:modelValue="(value) => updateShowGridLines(value)"
                                    v-model="showGridLines"
                                    name="showGridLines"
                                    :value="true"
                                    />
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionPanel>
                    <AccordionPanel value="1">
                        <AccordionHeader>
                            <div class="flex align-items-center">
                                <i class="pi pi-align-left mr-2" style="font-size: 1.1rem"></i>
                                <p>General Data</p>
                            </div>
                        </AccordionHeader>
                        <AccordionContent>
                            <div class="ci-block">
                                HEllo
                            </div>
                        </AccordionContent>
                    </AccordionPanel>
                    <AccordionPanel value="2">
                        <AccordionHeader>
                            <div class="flex align-items-center">
                                <i class="pi pi-lock mr-2" style="font-size: 1.1rem"></i>
                                <p>Access</p>
                            </div>
                        </AccordionHeader>
                        <AccordionContent>
                            <p class="m-0">
                                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                                qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                            </p>
                        </AccordionContent>
                    </AccordionPanel>
                </Accordion>



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
    'update:dateTemplate',
    'addDateTemplate'
]);

const selectedSizeTable = ref('Large');
const showGridLines = ref([]);
const stripedRows = ref([]);
const selectedPaginator = ref([]);
const selectedDateTemplate = ref(null);
const dateTemplates = ref([]);
const newDateTemplate = ref('');

function handlerVisible(state) {
    if(state === false) return emit('close');
}

// Обработчик обновления showGridLines
function updateShowGridLines(value) {
    let readyValue = value.at(-1);
    if(readyValue === undefined) readyValue = false;
    emit('update:showGridLines', readyValue);
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