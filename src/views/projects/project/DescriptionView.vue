<template>
    <div class="ci-block w-full h-full flex flex-column align-items-center">
        <div class="ql-editor" ref="overlayDescription"></div>
    </div>
</template>

<script setup>
import { ref, defineProps, watch, onMounted } from 'vue';

const props = defineProps({
    projectData: {
        type: Object,
        required: true,
    },
});

const overlayDescription = ref(null);


watch(() => props.projectData, (newValue) => {
    overlayDescription.value.innerHTML = newValue.description;
});

onMounted(() => {
    overlayDescription.value.innerHTML = props.projectData.description;
});


</script>

<style scoped>
    
</style>