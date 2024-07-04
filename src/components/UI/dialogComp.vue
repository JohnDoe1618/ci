<template>
    <Dialog
    :visible="props.show"
    @update:visible="(e) => (e === false)? emit('close') : 0"
    modal 
    :style="{ minWidth: '25rem' }"
    :closable="true"
    >
        <template #header>
            <h1 class="ci-text text-2xl mr-4 font-normal">{{ props.title }}</h1>
        </template>
        <div class="ci-block">
            <slot></slot>
        </div>
    </Dialog>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        required: false,
        default: false,
    },
    title: {
        type: String,
        required: false,
    }
});
const emit = defineEmits(['close']);
</script>

<style scoped>
    
</style>