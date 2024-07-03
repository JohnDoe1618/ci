<template>
    <div class="ci-block relative w-full h-full flex flex-column align-items-center justify-content-center overflow-auto">

        <div 
        v-if="isExistsDescr === false"
        class="ex absolute top-0 right-0 bottom-0 left-0 w-full h-full flex align-items-center justify-content-center flex-column z-5"
        >
            <h1 class="text-3xl mb-2">
                No description
            </h1>
            <!-- new descr -->
            <Button
            @click="handlerSetMode"
            label="Add"
            icon="pi pi-plus" 
            />
        </div>
        <div class="descr-overlay w-full relative flex align-items-start justify-content-center">
            <div 
            class="absolute flex flex-column align-content-center justify-content-center" 
            style="top: 10px; right: 0;" 
            >


                <!-- toggle mode -->
                <Button 

                v-show="isExistsDescr === true"
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

            <!-- TEXT EDITOR -->
            <textEditorComp
            v-show="editMode === true"
            class="w-10 mt-4 m-auto" 
            v-model="editedDescription"
            :initialContent="props.projectData.description"
            :placeholder="'Enter a description'"
            />

 
            <div v-show="editMode === false && isExistsDescr === true" class="ql-editor m-auto ci-block" ref="overlayDescription"></div>
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
const isExistsDescr = ref(false);
const overlayDescription = ref(null);
const editedDescription = ref('');


watch(() => props.projectData, (newValue) => {
    setContentInnerDoc();
});

function setContentInnerDoc() {
    overlayDescription.value.innerHTML = props.projectData.description;
    if(props.projectData.description) {
        isExistsDescr.value = true;
    }
}

function handlerSetMode() {
    editMode.value = !editMode.value;
    isExistsDescr.value = !isExistsDescr.value;
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