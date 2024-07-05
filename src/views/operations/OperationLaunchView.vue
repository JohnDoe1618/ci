<template >
    <div class="ci-block relative w-full h-full flex px-2 py-3">
        <Splitter class="shadow-3 w-full h-full">
            <SplitterPanel class="flex items-center justify-center" :size="40" :minSize="35">
                <div class="filled-form w-full h-full">

                    <Toolbar class="m-1 p-2 shadow-1">
                        <template #start>
                            <h1 class="text-xl ml-3">{{ 'projectData' }}</h1>
                        </template>
                        <template #center></template>
                        <template #end>
                            <Button 
                            class="ci-btn mr-2"
                            style="color: var(--btn-painted-color) !important;"
                            icon="pi pi-play" 
                            title="operation launch"
                            severity="success"
                            size="small" />
                        </template>
                    </Toolbar>
                </div>
            </SplitterPanel>
            <SplitterPanel class="flex items-center justify-center" :size="60" :minSize="35"> Panel 2 </SplitterPanel>
        </Splitter>

    </div>
</template>

<script setup>
import OperationService from '@/services/operationService';
import { ref, defineProps, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const props = defineProps({
    projectData: {
        type: Object,
        required: true,
    },
});

const operationData = ref(null);

onMounted(async() => {
    operationData.value = await OperationService.getOperationById(route.params.operationId);
});



</script>

<style scoped>
.filled-form {
    border: 1px solid black !important;
}
</style>