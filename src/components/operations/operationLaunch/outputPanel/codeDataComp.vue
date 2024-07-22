<template>
    <pre>
       <code ref="code" class="json">{{ computeJSON }}</code>
    </pre>
</template>

<script setup>
import hljs from 'highlight.js';
import { computed, onMounted, onUpdated, ref } from 'vue';

const props = defineProps({
    data: {
        type: [Object, Array],
        default: null,
        required: false,
    }
})

// ####################################  DATA  ####################################
const code = ref(null);

// ####################################  COMPUTED  ####################################
const computeJSON = computed(() => {
    if(props.data) {
        return JSON.stringify(props.data, null, 2);
    } else return 'None'
});

// ####################################  METHODS  ####################################
function highlightCode() {
    const codeElement = code.value;
    hljs.highlightElement(codeElement);
}

// ####################################  LIFECYCLE HOOKS  ####################################
onMounted(() => {
    highlightCode();
})
onUpdated(() => {
    highlightCode();
});

</script>

<style scoped>
pre {
    background: rgb(24, 24, 24);
    padding: 1em;
    border-radius: 3px;
}
</style>