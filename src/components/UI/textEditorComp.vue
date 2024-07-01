<template>
    <div>
        <Editor 
        @update:modelValue="(value) => emit('update:modelValue', value)" 
        :modelValue="props.modelValue" 
        editorStyle="height: 320px" 
        />
    </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        required: false,
    }
})
const emit = defineEmits(['update:modelValue']);


</script>

<style scoped>
    
</style>