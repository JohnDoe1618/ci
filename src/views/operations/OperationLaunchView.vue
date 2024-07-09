<template >
    <div class="ci-block relative w-full h-full flex px-2 py-3">
        <Toast />
        <Splitter class="shadow-3 w-full h-full">
<!--
            .----------------.  .-----------------. .----------------.  .----------------.  .----------------. 
            | .--------------. || .--------------. || .--------------. || .--------------. || .--------------. |
            | |     _____    | || | ____  _____  | || |   ______     | || | _____  _____ | || |  _________   | |
            | |    |_   _|   | || ||_   \|_   _| | || |  |_   __ \   | || ||_   _||_   _|| || | |  _   _  |  | |
            | |      | |     | || |  |   \ | |   | || |    | |__) |  | || |  | |    | |  | || | |_/ | | \_|  | |
            | |      | |     | || |  | |\ \| |   | || |    |  ___/   | || |  | '    ' |  | || |     | |      | |
            | |     _| |_    | || | _| |_\   |_  | || |   _| |_      | || |   \ `--' /   | || |    _| |_     | |
            | |    |_____|   | || ||_____|\____| | || |  |_____|     | || |    `.__.'    | || |   |_____|    | |
            | |              | || |              | || |              | || |              | || |              | |
            | '--------------' || '--------------' || '--------------' || '--------------' || '--------------' |
            '----------------'  '----------------'  '----------------'  '----------------'  '----------------'  -->
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
                    <span 
                    class="ci-operation-method mt-1 mx-2 px-2 shadow-2 flex justify-content-end"
                    :class="operationData?.method?.toLowerCase()"
                    >{{ operationData?.method }}</span>

                    <!-- Path Params -->
                    <h1 class="text-xl mt-1 ml-2">Path Params:</h1>
                    <paramInputComp
                    v-if="pathParams && pathParams?.length"
                    v-for="item in pathParams"
                    @updateValue="handlerUpdatePathParams"
                    @validationError="handlerValidateError"
                    :initialValue="pathParamsData"
                    :validate="requestValidation"
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
                    @validationError="handlerValidateError"
                    :initialValue="queryParamsData"
                    :validate="requestValidation"
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
                    @validationError="handlerValidateError"
                    :initialValue="requestBodyData"
                    :validate="requestValidation"
                    :key="item.key"
                    :data="item"
                    />
                    <h2 v-else class="ci-text ml-4 text-lg">None</h2>

                </div>
            </SplitterPanel><!--  ################################################################################################-->
<!--         .----------------.  .----------------.  .----------------.  .----------------.  .----------------.  .----------------. 
            | .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. |
            | |     ____     | || | _____  _____ | || |  _________   | || |   ______     | || | _____  _____ | || |  _________   | |
            | |   .'    `.   | || ||_   _||_   _|| || | |  _   _  |  | || |  |_   __ \   | || ||_   _||_   _|| || | |  _   _  |  | |
            | |  /  .--.  \  | || |  | |    | |  | || | |_/ | | \_|  | || |    | |__) |  | || |  | |    | |  | || | |_/ | | \_|  | |
            | |  | |    | |  | || |  | '    ' |  | || |     | |      | || |    |  ___/   | || |  | '    ' |  | || |     | |      | |
            | |  \  `--'  /  | || |   \ `--' /   | || |    _| |_     | || |   _| |_      | || |   \ `--' /   | || |    _| |_     | |
            | |   `.____.'   | || |    `.__.'    | || |   |_____|    | || |  |_____|     | || |    `.__.'    | || |   |_____|    | |
            | |              | || |              | || |              | || |              | || |              | || |              | |
            | '--------------' || '--------------' || '--------------' || '--------------' || '--------------' || '--------------' |
            '----------------'  '----------------'  '----------------'  '----------------'  '----------------'  '----------------'  -->
            <SplitterPanel class="flex items-center justify-center" :size="60" :minSize="35">
                <outputLaunchPanelComp />
            </SplitterPanel>
        </Splitter>
    </div>
</template>

<script setup>
import paramInputComp from '@/components/operations/operationLaunch/inputPanel/paramInputComp.vue';
import requestItemComp from '@/components/operations/operationLaunch/inputPanel/requestItemComp.vue';
import outputLaunchPanelComp from '@/components/operations/operationLaunch/outputPanel/outputLaunchPanelComp.vue';
import OperationService from '@/services/operationService';
import { useOperationsStore } from '@/stores/operationsStore';
import { useToast } from 'primevue/usetoast';
import { ref, defineProps, onBeforeMount, reactive, nextTick } from 'vue';
import { useRoute } from 'vue-router';

// ===========================  COMPOSABLES  =================================
const operationsStore =  useOperationsStore();
const route = useRoute();
const toast = useToast();

// ===========================  PROPS  =================================
const props = defineProps({
    projectData: {
        type: Object,
        required: true,
    },
});

// ===========================  DATA  =================================
const requestValidation = ref(false);
const errorState = ref([]);
const isNotValideForm = ref(false);

const operationData = ref(null);     // объект операции
const queryParams = ref([]);         // парметры запроса
const pathParams = ref([]);          // парметры пути
const requestBodyItems = ref([])     // элементы тела запроса

const requestBodyData = reactive({});
const pathParamsData = reactive({});
const queryParamsData = reactive({});

// ===========================  METHODS  =================================
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

// Обработчик возникновения ошибок полей формы
function handlerValidateError({ isError, key }) {
    if(isError === true && !errorState.value.includes(key)) {
        errorState.value.push(key);
    }
    if(isError === false) {
        errorState.value = errorState.value.filter((entry) => entry !== key);
    }
    if(errorState.value.length > 0) isNotValideForm.value = true;
    else isNotValideForm.value = false;
    // console.log(errorState.value, isNotValideForm.value);
}

// Запуск уведомления об ошибке
function errorToastRun() {
    toast.add({ 
        severity: 'error', 
        summary: 'Error', 
        detail: 'check the correctness of the entered data', 
        life: 3000 
    });
}

// Обработчик запуска операции
async function handlerOperationLaunch() {
    try {
        requestValidation.value = true;
        await nextTick();
        if(isNotValideForm.value === true) {
            return errorToastRun();
        }
    } catch (err) {
        console.error('views/operations/OperationLaunchView.vue: handlerOperationLaunch', err);
    } finally {
        requestValidation.value = false;
    }

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


// ===========================  LIFECYCLE HOOKS  =================================
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