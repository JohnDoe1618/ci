<template>
    <span class="w-10">
        <!-- ERROR:[empty] -->
        <small v-if="props.emptyErr.visible" :class="`w-full mt-2 ml-${props.indentLeft} flex align-items-center`">
            <i 
            class="pi pi-exclamation-circle mr-2"
            style="font-size: 1rem; color: red;"
            ></i>
            <span style="color: red;">{{ props.emptyErr.msg }}</span>
        </small>
        <!-- ERROR:[length] -->
        <small v-else-if="props.lengthErr.visible" :class="`w-full mt-2 ml-${props.indentLeft} flex align-items-center`">
            <i 
            class="pi pi-exclamation-circle mr-2" 
            style="font-size: 1rem; color: red;" 
            ></i>
            <span style="color: red;">{{ props.lengthErr.msg }}</span>
        </small>
        <!-- ERROR:[Special Characters] -->
        <small v-else-if="props.specCharsErr.visible" :class="`w-full mt-2 ml-${props.indentLeft} flex align-items-center`">
            <i 
            class="pi pi-exclamation-circle mr-2" 
            style="font-size: 1rem; color: red;" 
            ></i>
            <span style="color: red;">{{ props.specCharsErr.msg }}</span>
        </small>
        <!-- ERROR:[inccorect] -->
        <small v-else-if="props.incorrectErr.visible" :class="`w-full mt-2 ml-${props.indentLeft} flex align-items-center`">
            <i 
            class="pi pi-exclamation-circle mr-2" 
            style="font-size: 1rem; color: red;" 
            ></i>
            <span style="color: red;">{{ props.incorrectErr.msg }}</span>
        </small>
        <!-- Default Signature-->
        <small v-else :class="`w-full mt-2 ml-${props.indentLeft} flex align-items-center`">
            <i 
            class="pi pi-question-circle mr-2" 
            style="font-size: 1rem; color: gray;" 
            ></i>
            {{ props.defaultSignature }}
        </small>
    </span>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    defaultSignature: {
        type: String,
        required: true,
    },
    indentLeft: {
        type: Number,
        default: 5,
        required: false,
    },
    emptyErr: {
        type: Object,
        required: false,
        default(rawProps) {
            return { visible: false, msg: '' }
        }  
    },
    lengthErr: {
        type: Object,
        required: false,
        default(rawProps) {
            return { visible: false, msg: '' }
        }  
    },
    specCharsErr: {
        type: Object,
        required: false,
        default(rawProps) {
            return { visible: false, msg: '' }
        }  
    },
    incorrectErr: {
        type: Object,
        required: false,
        default(rawProps) {
            return { visible: false, msg: '' }
        }  
    },
})

</script>

<style scoped>
    
</style>