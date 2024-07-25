import { ref, reactive, onBeforeUnmount, onMounted, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import { throttling } from '@/utils/optimization/throttling';

// Главный компосабл для управления компонентом ФОРМЫ СОЗДАНИЯ НОВОЙ ОПЕРАЦИИ для проекта 
import useValidationForm from "./validationForm"
import OperationService from '@/services/operationService';

export default function useCreationOperationMain(projectId, editOperationData, emit) {

// ###############################  COMPOSABLES  ###############################
    const { 
        errorsOperationEndpoint, 
        errorsOperationName, 
        validateOperationName, 
        validateProjectEndpoint,
        validateArrayParams,
    } = useValidationForm();
    const toast =  useToast();


// ###############################  DATA  ###############################
    let copiedBasicData = null;
    const isActiveEditMode = ref(false);
    const editedFieldsForm = reactive({});
    const isLoadRequest = ref(false);
    const methods = ref(['GET','POST','PUT','DELETE','PATCH',]);
    const isMethodErr = ref(false);
    const isPathParamsError = ref(false);
    const isQueryParamsError = ref(false);
    const isRequestBodyParamsError = ref(false);
    const formData = reactive({
        operationName: null,
        operationEndpoint: null,
        selectedMethod: null,
        operationDescription: null,
        pathParams: [],
        queryParams: [],
        requestBodyParams: [],
    });

// ###############################  METHODS  ###############################
    // Валидация формы (Проверка на наличие ошибок в форме)
    function validateForm() {
        let isHasError = false;  // флаг по которому определяется есть ли ошибка в форме
        // Валидация имени
        validateOperationName(formData.operationName, false, (isErr) => {
            if(isErr === true) isHasError = true;
        });
        // Валидация метода
        if(!formData.selectedMethod) {
            isMethodErr.value = true;
            isHasError = true;
        }
        // Валдация конченой точки
        validateProjectEndpoint(formData.operationEndpoint, false, (isErr) => {
            if(isErr === true) isHasError = true;
        });

        // Валидация параметров путей
        validateArrayParams(formData.pathParams, (result) => {
            if(result === true){
                isHasError = true;
                isPathParamsError.value = true;
            }
        });
        // Валидация параметров запроса 
        validateArrayParams(formData.queryParams, (result) => {
            if(result === true){
                isHasError = true;
                isQueryParamsError.value = true;
            }
        });
        // Валидация параметров тела запроса   
        validateArrayParams(formData.requestBodyParams, (result) => {
            if(result === true){
                isHasError = true;
                isRequestBodyParamsError.value = true;
            }
        });
        return isHasError;
    }

    // Обработчик подтверждения формы
    async function handlerConfirmForm() {
        try {
            isLoadRequest.value = true;
            // Валидция формы
            const isHasError = validateForm();
            if(isHasError === true) return void toast.add({ severity: 'error', summary: 'Error', detail: 'Сheck the entered data', life: 3000 });
            // Собираем объект тела запроса для создания новой операции проекта
            let requestData;
            // Если форма использовалась для режима редактирования, то тело запроса заполняется 
            // только из тех полей, которые фактически были изменены
            if(isActiveEditMode.value === true) {
                requestData = {...editedFieldsForm};
                // Запрос на редактирование текущей операции
                const result = await OperationService.editOperationById(editOperationData.id, requestData);
                console.log(result);
            } 
            // Классический режим: Создание новой операции. Записываются все необходимые поля тела запроса
            else {
                requestData = {
                    projectId: projectId,
                    method: formData.selectedMethod,
                    endpoint: '/' + (formData.operationEndpoint ?? ''),
                    pathParams: formData.pathParams,
                    queryParams: formData.queryParams,
                    requestBody: formData.requestBodyParams,
                    title: formData.operationName,
                    description: formData.operationDescription,
                    forRole: '*',
                }
                // Запрос на создание новой операции
                const result = await OperationService.createNewOperation(requestData);
                emit('appendOperation', result);
            }
            emit('close');
        } catch (err) {
            console.error('/handlerConfirmForm', err);
        } finally {
            isLoadRequest.value = false;
        }
    }

    // Обработчик сброса изменения какого-либо поля по ключу
    function handlerResetChangedKey(key) {
        Reflect.deleteProperty(editedFieldsForm, key);
        if(key === 'title') return void (formData.operationName = copiedBasicData.operationName);
        if(key === 'method') return void (formData.selectedMethod = copiedBasicData.selectedMethod);
        if(key === 'endpoint') return void (formData.operationEndpoint = copiedBasicData.operationEndpoint);
        if(key === 'description') return void (formData.operationDescription = copiedBasicData.operationDescription);
    }

    // Обработчик выбора метода в селект-меню
    function handlerChangeMethod() {
        isMethodErr.value = false;
        handlerRecEditedBasicFields('method', formData.selectedMethod);
    }

    // Обновление параметров пути
    function updatePathParams(params) {
        formData.pathParams = params;
        if(isActiveEditMode.value === true) {
            editedFieldsForm['pathParams'] = params;
        }
        isPathParamsError.value = false;
    }

    // Обновление параметров запроса
    function updateQueryParams(params) {
        formData.queryParams = params;
        if(isActiveEditMode.value === true) {
            editedFieldsForm['queryParams'] = params;
        }
        isQueryParamsError.value = false;
    }

    // обновление параметров тела запроса
    function updateRequestBody(params) {
        formData.requestBodyParams = params;
        if(isActiveEditMode.value === true) {
            editedFieldsForm['requestBody'] = params;
        }
        isRequestBodyParamsError.value = false;
    }

    // Удаление параметров (запроса/путей/тела запроса) из объекта редактирования
    function handlerResetParamsChanges(editFormKey) {
        if(editFormKey === 'pathParams') {
            Reflect.deleteProperty(editedFieldsForm, 'pathParams');
        } 
        else if(editFormKey === 'queryParams') {
            Reflect.deleteProperty(editedFieldsForm, 'queryParams');
        }
        else if(editFormKey === 'requestBody') {
            Reflect.deleteProperty(editedFieldsForm, 'requestBody');
        }
    }

    // Обработчик записи основных полей формы в объект редактирования (ДЛЯ РЕЖИМА РЕДАКТИРОВАНИЯ)
    function handlerRecEditedBasicFields(key, value) {
        editedFieldsForm[key] = value;
    }

    // (ДЛЯ РЕЖИМА РЕДАКТИРОВАНИЯ)
    // Функция, которая создает копию основных данных таких как operationName,operationEndpoint и пр. кроме параметров
    // За формирование копии параметров путей/запросов/тела запроса отвечает их компонент paramsFormComp с его соответствующими composables
    function createCopyBasicData(initialData) {
        if(initialData && typeof initialData === 'object') {
            copiedBasicData = {
                operationName: initialData.title,
                selectedMethod: initialData.method,
                operationEndpoint: computeEndpointValid(initialData.endpoint),
                operationDescription: initialData.description,
            }
        }
    }
    // Фукнция проверяет есть ли у эндпоинта начальный слэш и если есть то он убирает его
    function computeEndpointValid(endpoint) {
        try {
            if(endpoint && typeof endpoint === 'string') {
                let readyEndpoint = endpoint;
                readyEndpoint.at(0) === '/' && (readyEndpoint = readyEndpoint.slice(1));
                return readyEndpoint;
            }
        } catch (err) {
            console.error('components/operations/operationList/creationFormComp: computeEndpointValid', err);
        }
    }

// ###############################  COMPUTED  ###############################
    const computedVisibleResetBasicKey = computed(() => {
        return (key) => {
            if(Object.keys(editedFieldsForm).includes(key)) {
                return true;
            } else return false;
        }
    })


// ###############################  LIFECYCLE HOOKS  ###############################
    onBeforeUnmount(() => {
        isActiveEditMode.value = false;
    });
    onMounted(() => {
        // формирование копии общих данных (без параметров)  (ДЛЯ РЕЖИМА РЕДАКТИРОВАНИЯ)
        createCopyBasicData(editOperationData);
        // Если есть объект для редактирования операции (например если мы открываем форму для редактирования операции), 
        // то заполняется объект формы на основе этого редактирования
        if(editOperationData) {
            isActiveEditMode.value = true;
            formData.operationName = editOperationData.title;
            formData.selectedMethod = editOperationData.method;
            formData.operationEndpoint = computeEndpointValid(editOperationData.endpoint);
            formData.operationDescription = editOperationData.description;
            formData.pathParams = editOperationData.pathParams;
            formData.queryParams = editOperationData.queryParams;
            formData.requestBodyParams = editOperationData.requestBody;
        }
        // Дросселирование полей ввода на отключение ошибок по временной задержке, для избежания перегрузки вызовов resetErrors
        document
            .getElementById('operation-name')
            .addEventListener('input', throttling(() => errorsOperationName.resetErrors(), 400));
        document
            .getElementById('operation-endpoint')
            .addEventListener('input', throttling(() => errorsOperationEndpoint.resetErrors(), 400));
    });

    return {
        // Data
        isActiveEditMode,
        editedFieldsForm,
        isLoadRequest,
        methods,
        isMethodErr,
        isPathParamsError,
        isQueryParamsError,
        isRequestBodyParamsError,
        formData,

        // Methods
        handlerConfirmForm,
        updatePathParams,
        updateQueryParams,
        updateRequestBody,
        handlerChangeMethod,
        handlerRecEditedBasicFields,
        handlerResetParamsChanges,
        handlerResetChangedKey,

        // Computed
        computedVisibleResetBasicKey,

        // Composables
        errorsOperationEndpoint, 
        errorsOperationName, 
    }
}