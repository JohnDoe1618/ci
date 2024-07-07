<template >
    <div class="ci-block relative w-full h-full flex px-2 py-3">
        <Splitter class="shadow-3 w-full h-full">
            <SplitterPanel class="flex items-center justify-center" :size="40" :minSize="35">
                <div class="w-full h-full pt-2 p-1">
                    <!-- Toolbar -->
                    <Toolbar class="shadow-1">
                        <template #start>
                            <h1 class="text-xl ml-3">{{ operationData?.title }}</h1>
                        </template>
                        <template #center></template>
                        <template #end>
                            <!-- Launch Btn -->
                            <Button 
                            class="ci-btn mr-2"
                            style="color: var(--btn-painted-color) !important;"
                            icon="pi pi-play" 
                            title="operation launch"
                            severity="success"
                            size="small" 
                            @click="handlerOperationLaunch"
                            />
                        </template>
                    </Toolbar>

                    <!-- Path Params -->
                    <h1 class="text-xl mt-3 ml-2">Path Params:</h1>
                    <paramInputComp
                    v-if="pathParams && pathParams?.length"
                    v-for="item in pathParams"
                    @updateValue="handlerUpdatePathParams"
                    :initialValue="pathParamsData"
                    :key="item.key"
                    :data="item"
                    />
                    <h2 v-else class="ci-text ml-4 text-lg font-normal">None</h2>

                    <!-- Query Params -->
                    <h1 class="text-xl mt-3 ml-2">Query Params:</h1>
                    <paramInputComp
                    v-if="queryParams && queryParams?.length"
                    v-for="item in queryParams"
                    @updateValue="handlerUpdateQueryParams"
                    :initialValue="queryParamsData"
                    :key="item.key"
                    :data="item"
                    />
                    <h2 v-else class="ci-text ml-4 text-lg">None</h2>

                    <!-- Request Body -->
                    <h1 class="text-xl mt-3 ml-2">Request Body:</h1>
                    <requestItemComp
                    v-if="requestBodyItems && requestBodyItems?.length"
                    v-for="item in requestBodyItems"
                    @updateValue="handlerUpdateRequestBody"
                    :initialValue="requestBodyData"
                    :key="item.key"
                    :data="item"
                    />
                    <h2 v-else class="ci-text ml-4 text-lg">None</h2>

                </div>
            </SplitterPanel>
            <SplitterPanel class="flex items-center justify-center" :size="60" :minSize="35"> Panel 2 </SplitterPanel>
        </Splitter>
    </div>
</template>

<script setup>
import paramInputComp from '@/components/operations/operationLaunch/paramInputComp.vue';
import requestItemComp from '@/components/operations/operationLaunch/requestItemComp.vue';
import OperationService from '@/services/operationService';
import { useOperationsStore } from '@/stores/operationsStore';
import { ref, defineProps, onBeforeMount, computed, reactive } from 'vue';
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
const requestBodyItems = ref([])     // элементы тела запроса

const requestBodyData = reactive({});
const pathParamsData = reactive({});
const queryParamsData = reactive({});

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

// Обработчик запуска операции
function handlerOperationLaunch() {
    // ////
}

// Обновление данных полей в localStorage
function updateFormInStorage(projectId, operationId) {
    const storageKey = `operation_${operationId}_launch_data_project_${projectId}`;
    localStorage.setItem(storageKey, JSON.stringify({
        path_params: pathParamsData,
        query_params: queryParamsData,
        request_body: requestBodyData,
    }));
}

// Заполнить целевой объект данными другого объекта
function filledObjectOfObject(targetObj, sourceObj) {
    if((targetObj && sourceObj) && (typeof targetObj === 'object' && typeof sourceObj === 'object')) {
        Object.entries(sourceObj).forEach(([key, value]) => {
            targetObj[key] = value;
        });
    }
    return targetObj;
}

// Извлечение сохраненных данных из localStorage если они есть
function extractStorageData(projectId, operationId) {
    const storageKey = `operation_${operationId}_launch_data_project_${projectId}`;
    let storageData = localStorage.getItem(storageKey);
    if(!storageData) return;
    storageData = JSON.parse(storageData);
    filledObjectOfObject(requestBodyData, storageData.request_body);  // request body
    filledObjectOfObject(pathParamsData, storageData.path_params);    // path params
    filledObjectOfObject(queryParamsData, storageData.query_params);  // query params
}

// Обработчик ввода данных тела запроса
function handlerUpdateRequestBody({ key, value }) {
    requestBodyData[key] = value;
    updateFormInStorage(props.projectData.id, operationData.value?.id);
}

// Обработчик ввода данных параметров путей
function handlerUpdatePathParams({ key, value }) {
    pathParamsData[key] = value;
    updateFormInStorage(props.projectData.id, operationData.value?.id);
}

// Обработчик ввода данных параметров запроса
function handlerUpdateQueryParams({ key, value }) {
    queryParamsData[key] = value;
    updateFormInStorage(props.projectData.id, operationData.value?.id);
}

onBeforeMount(async() => {
    try {
        await extractOperationData(); // получение операции
    } catch (err) {
        console.error('views/operations/OperationLaunchView.vue: onBeforeMount', err)
    } finally {
        pathParams.value = operationData.value?.pathParams;
        queryParams.value = operationData.value?.queryParams;
        requestBodyItems.value = operationData.value?.requestBody;
        // Извлечение сохраненных данных из localStorage если они есть
        extractStorageData(operationData.value?.projectId, operationData.value?.id);
    }

});



</script>

<style scoped>
</style>