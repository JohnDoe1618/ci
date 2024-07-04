<template >
    <div class="ci-block relative w-full h-full flex">
        LAUNCH OPERATION {{ $route.params.operationName }} {{ $route.params.operationId }}
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    projectData: {
        type: Object,
        required: true,
    },
});


</script>

<style scoped>
    
</style>