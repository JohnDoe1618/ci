import { ref, reactive, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import { throttling } from '@/utils/optimization/throttling';

// Главный компосабл для управления компонентом ФОРМЫ СОЗДАНИЯ НОВОЙ ОПЕРАЦИИ для проекта 
import useValidationForm from "./validationForm"
import OperationService from '@/services/operationService';

export default function useCreationOperationMain(projectId, emit) {

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
            const requestData = {
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
            emit('close');
        } catch (err) {
            console.error('/handlerConfirmForm', err);
        } finally {
            isLoadRequest.value = false;
        }
    }

    // Обновление параметров пути
    function updatePathParams(params) {
        formData.pathParams = params;
        isPathParamsError.value = false;
    }

    // Обновление параметров запроса
    function updateQueryParams(params) {
        formData.queryParams = params;
        isQueryParamsError.value = false;
    }

    // обновление параметров тела запроса
    function updateRequestBody(params) {
        formData.requestBodyParams = params;
        isRequestBodyParamsError.value = false;
    }


    // ###############################  LIFECYCLE HOOKS  ###############################
    onMounted(() => {
        // Дросселирование полей ввода на отключение ошибок по временной задержке, для избежания перегрузки вызовов resetErrors
        document
            .getElementById('operation-name')
            .addEventListener('input', throttling(() => errorsOperationName.resetErrors(), 400));
        document
            .getElementById('operation-endpoint')
            .addEventListener('input', throttling(() => errorsOperationEndpoint.resetErrors(), 400));
    })


    return {
        // Data
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

        // Composables
        errorsOperationEndpoint, 
        errorsOperationName, 
    }
}