<template >
    <div class="ci-block relative w-full h-full flex px-2 py-3">
        <Splitter class="shadow-3 w-full h-full">
            <SplitterPanel class="flex items-center justify-center" :size="40" :minSize="35">
                <div class="w-full h-full pt-2 p-1">
                    <!-- Toolbar -->
                    <Toolbar class="shadow-1">
                        <template #start>
                            <h1 class="text-xl ml-3">{{ props.projectData.name }}</h1>
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

                    <!-- Path Params -->
                    <h1 class="text-xl mt-3 ml-2">Path Params</h1>
                    <paramInputComp 
                    v-for="item in pathParams"
                    :key="item.key"
                    :data="item"
                    />

                    <!-- Query Params -->
                    <h1 class="text-xl mt-3 ml-2">Query Params</h1>
                    <paramInputComp 
                    v-for="item in queryParams"
                    :key="item.key"
                    :data="item"
                    />

                    <!-- Request Body -->


                </div>
            </SplitterPanel>
            <SplitterPanel class="flex items-center justify-center" :size="60" :minSize="35"> Panel 2 </SplitterPanel>
        </Splitter>
    </div>
</template>

<script setup>
import paramInputComp from '@/components/operations/operationLaunch/paramInputComp.vue';
import OperationService from '@/services/operationService';
import { useOperationsStore } from '@/stores/operationsStore';
import { ref, defineProps, onBeforeMount, computed } from 'vue';
import { useRoute } from 'vue-router';

const operationsStore =  useOperationsStore();
const route = useRoute();

const props = defineProps({
    projectData: {
        type: Object,
        required: true,
    },
});

const operationData = ref(null);     // объект операции
const queryParams = ref([]);         // парметры запроса
const pathParams = ref([]);          // парметры пути


// Извлечение объекта операции
async function extractOperationData() {
    try {
        // Если в сторе нет операции, то запрашиваем её через сервис по параметрам пути
        if(!operationsStore.runningOperation) {
            return operationData.value = await OperationService.getOperationById(route.params.operationId);
        }
        operationData.value = operationsStore.runningOperation;
    } catch (err) {
        console.error('views/operations/OperationLaunchView.vue: extractOperationData', err);
        throw err;
    }
}

onBeforeMount(async() => {
    try {
        await extractOperationData(); // получение операции
    } catch (err) {
        console.error('views/operations/OperationLaunchView.vue: onBeforeMount', err)
    } finally {
        pathParams.value = operationData.value?.pathParams;
        queryParams.value = operationData.value?.queryParams;
    }
});



</script>

<style scoped>
</style>