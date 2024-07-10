<template>
    <TreeTable :value="nodes" scrollable scrollHeight="70vh" tableStyle="min-width: 50rem">
        <Column field="key" header="Key" expander style="width: 33%"></Column>
        <Column field="value" header="Value" style="width: 33%"></Column>
        <Column field="type" header="Type" style="width: 33%"></Column>
    </TreeTable>
</template>

<script setup>
import { bundleTreeTableData } from '@/utils/bundlerObjects';
import { onMounted, ref, defineProps } from 'vue';
import { operationPostResult } from '@/services/testdata';

const props = defineProps({
    result: {
        type: Object,
        default: null,
        required: false,
    }
}) 

const nodes = ref([]);

onMounted(() => {
    nodes.value = bundleTreeTableData(operationPostResult);
});



</script>

<style scoped>
    
</style>