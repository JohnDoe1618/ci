<template>
    <div>
        STATISTICS PROJECT {{ props.projectData.id }}
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    projectData: {
        type: Object,
        required: true,
    },
})

</script>

<style scoped>
    
</style>