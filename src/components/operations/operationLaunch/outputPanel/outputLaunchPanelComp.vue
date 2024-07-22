<template>
    <div class="output-panel w-full m-2 border-round-sm shadow-3">

        <!-------------------------------  HEADER  --------------------------------->
        <header class="output-panel__header ci-block flex justify-content-end align-items-center mx-2 pb-1">
            <span class="mr-2">View:</span>
            <SelectButton
            v-model="selectedModeView" 
            :options="['table', 'tree', 'code']" 
            aria-labelledby="custom"
            @update:model-value="" 
             >
                <template #option="{ option }">
                    <span>
                        <i :class="(option === 'tree')? 'pi pi-sitemap' : 'pi pi-' + option"></i>
                    </span>
                </template>
            </SelectButton>
        </header>

        <!-------------------------------  PAYLOAD DATA  --------------------------------->
        <div class="ci-block payload-data-overlay">
            <span 
            class="loading-overlay"
            v-show="props.isLoadData"
            >
                <ci-spinner></ci-spinner>
            </span>
            
            <treeLaunchPanel v-if=false :result="props.result"/>
            <tableDataComp v-else-if="false" :result="props.result"/>
            <codeDataComp :data="operationResultGet" v-else/>
            
        </div>
    </div>
</template>

<script setup>
import { operationResultGet } from '@/services/testdata';
import { ref, defineProps } from 'vue';
import treeLaunchPanel from '@/components/operations/operationLaunch/outputPanel/treeTableDataComp.vue';
import tableDataComp from '@/components/operations/operationLaunch/outputPanel/tableDataComp.vue';
import codeDataComp from '@/components/operations/operationLaunch/outputPanel/codeDataComp.vue';

// ########################################  { PROPS }  #########################################
const props = defineProps({
    result: {
        type: [Object, Array],
        required: false,
        default: null,
    },
    isLoadData: {
        type: Boolean,
        default: false,
        required: false,
    },
})

// ########################################  { DATA }  #########################################
const selectedModeView = ref('code')   // table | code | tree
</script>

<style scoped>
.output-panel {
    overflow: hidden;
    background-color: rgb(253, 253, 253) !important;
}
.output-panel__header {
    border-bottom: 1px solid var(--block-border-color);
}
.loading-overlay {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    right: 0;
    left: 0;
    bottom: 1rem;
    background-color: rgba(0,0,0, .07);
    backdrop-filter: blur(2px);
}
.payload-data-overlay {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 0.5rem 0 2.5rem 0 !important;
}
</style>