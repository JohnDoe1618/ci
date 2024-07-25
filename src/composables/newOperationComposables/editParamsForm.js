import { useConfirm } from 'primevue/useconfirm';
import { ref, onMounted, nextTick } from 'vue';

// Компосабл, отвечает за логику редактирования параметров компонента paramsFormComp.vue
export default function useEditParamsForm(props, emit, params /* исходыный реактиный массив параметров по которому рисуются параметры */) {

// ###############################  COMPOSABLES  ###############################
    const confirm = useConfirm();


// ###############################  DATA  ###############################
    let paramsCopy = [];


// ###############################  METHODS  ###############################
    // Функция создает копию исходных параметров чтобы в дальнейшем узнать были ли внесены какие либо изменения
    function initParamsForEdition() {
        if(params) {
            createCopyParams(props.initialParams);
            params.value = props.initialParams;
        }
    }

    // Функция создает копию массива параметров на основе поступающих начальных данных в компонент через пропсы
    async function createCopyParams() {
        await nextTick();
        if(params && Array.isArray(params.value)) {
            params.value.forEach((param) => {
                paramsCopy.push({...param});
            });
        }
    }

    // Обработчик сброса изменений в форме параметров (ДЛЯ РЕЖИМА РЕДАКТИРОВАНИЯ)
    function handlerResetState() {
        // Отправляем запрос на сбрасывание изменений параметров в род. компонент, для того чтобы все зависимые активы/переменные почистились
        emit('resetChanges');
        if(params) {
            // Заносим в реактивный массив параметров исходные параметры которые были до изменений
            params.value.length = 0;
            paramsCopy.forEach((param) => {
                params.value.push({...param});
            })
        }
    }

    // Установка окна подтверждения для сброса изменений параметров
    function handlerConfirmResetState(event) {
        confirm.require({
            target: event.currentTarget,
            message: 'Are you sure you want reset params changes?',
            icon: 'pi pi-exclamation-triangle',
            rejectProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptProps: {
                label: 'Yes'
            },
            accept: () => {
                handlerResetState();  // Сброс изменений
            },
            reject: () => {}
        });
    }

// ###############################  LIFECYCLE HOOKS  ###############################
    onMounted(async() => {
        await nextTick();
        initParamsForEdition();
    });

    return {
        // Data

        // Methods
        handlerConfirmResetState,
    }
}