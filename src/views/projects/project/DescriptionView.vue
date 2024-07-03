<template>
    <div class="ci-block w-full h-full flex flex-column align-items-center justify-content-center overflow-auto">
        <div class="descr-overlay w-full relative flex align-items-start justify-content-center">
            <div class="absolute flex flex-column align-content-center justify-content-center" style="top: 10px; right: 0;" >
                <!-- toggle mode -->
                <Button 
                class="shadow-2 mb-1" 
                @click="handlerSetMode"
                :icon="(editMode === true)? 'pi pi-times' : 'pi pi-pencil'" 
                />
                <!-- save -->
                <Button
                v-show="editMode === true"
                @click="handlerUpdateDescription"
                icon="pi pi-save" 
                />
            </div>
            <textEditorComp
            v-show="editMode === true"
            class="w-10 mt-4" 
            v-model="editedDescription"
            :initialContent="props.projectData.description"
            :placeholder="'Enter a description'"
            />
            <div v-show="editMode === false" class="ql-editor m-auto ci-block" ref="overlayDescription"></div>
        </div>
    </div>

</template>

<script setup>
import { ref, defineProps, defineEmits, watch, onMounted } from 'vue';

const props = defineProps({
    projectData: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['update:description']);

const editMode = ref(false);
const overlayDescription = ref(null);
const editedDescription = ref('');


watch(() => props.projectData, (newValue) => {
    overlayDescription.value.innerHTML = newValue.description;
});

function setContentInnerDoc() {
    overlayDescription.value.innerHTML = props.projectData.description;
}

function handlerSetMode() {
    editMode.value = !editMode.value;
    setContentInnerDoc();
}

function handlerUpdateDescription() {
    emit('update:description', editedDescription.value);
    handlerSetMode();
}

onMounted(() => {
    setContentInnerDoc();
});


</script>

<style scoped>
.descr-overlay {
    border-top: 1px solid var(--ui-border-color);
    border-bottom: 1px solid var(--ui-border-color);
    height: 95% !important;
    width: 800px !important;
}
</style>