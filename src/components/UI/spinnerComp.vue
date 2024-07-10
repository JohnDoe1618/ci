<template>
    <ProgressSpinner 
    style="width: 60px; height: 60px" 
    strokeWidth="4" 
    fill="transparent"
    animationDuration=".8s" 
    aria-label="Custom ProgressSpinner" 
    v-show="props.show"
    />
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    show: {
        type: Boolean,
        required: false,
        default: true,
    }
});

</script>