import { ref, computed } from 'vue';

// Компосабл для формы создания/редактирования параметров таких как параметры пути, параметры запроса и т.п 
export function useParamsForm(emit) {
    // ###############################  DATA  ###############################
    const isShowKeyInput = ref({ show: false, index: null });
    const isErrorKeyInput = ref(false);
    const isShowTypeSelect = ref({ show: false, index: null });
    const isShowByDefaultInput = ref({ show: false, index: null });
    const isShowDefaultBooleanSelect = ref({ show: false, index: null });
    const isShowRequiredSelect = ref({ show: false, index: null });
    const params = ref([]);
    const keyName = ref(null);
    const byDefault = ref(null);
    const byDefaultBool = ref(false);
    const selectedType = ref(null);
    const requiredValue = ref(false);
    const types = ref([ 'string', 'number', 'boolean', 'array', 'object' ]);


    // ###############################  METHODS  ###############################
    // Обработчик добавления нового параметра в таблицу параметров
    function handlerAppendParam() {
        try {
            params.value.push({ key: null, type: null, default: null, required: false });
            emit('update', params.value);
            isShowTypeSelect.value.show = true;
            isShowTypeSelect.value.index = params.value.length - 1;
            isShowKeyInput.value.show = true;
            isShowKeyInput.value.index = params.value.length - 1;
        } catch (err) {
            console.error(err);
        }
    };

    // Обработчик добавления ключа
    function handlerAppendKey(data) {
        if(!!keyName.value) {
            data.key = keyName.value;
            keyName.value = null; 
            emit('update', params.value);
            isShowKeyInput.value.show = false;
            isShowKeyInput.value.index = null;
        } else {
            isErrorKeyInput.value = true;
            setTimeout(() => {
                isErrorKeyInput.value = false;
            }, 2000)
        }
    }
    // Обработчик добавления значения по умолчанию
    function handlerAppendByDefault(data) {
        data.default = byDefault.value;
        emit('update', params.value);
        byDefault.value = null; 
        isShowByDefaultInput.value.show = false;
        isShowByDefaultInput.value.index = null;
    }

    // Обработчик добавления boolean значения как значение по умолчанию для параметра
    function handlerChangeDefaultBool(data, value) {
        data.default = value;
        emit('update', params.value);
        isShowDefaultBooleanSelect.value.show = false;
        isShowDefaultBooleanSelect.value.index = null;
        byDefaultBool.value = false;
    }

    // Обработчик изменения типа данных. Для того чтобы сбросить значение по умолчанию
    function handlerChangeType(data, type) {
        // обнуление колонки для значения по умолчанию
        byDefault.value = null;
        data.default = null;
        data.type = type;
        emit('update', params.value);
        if(type === 'boolean') data.default = false;
        // Закрытие селекта/инпута для колонки default
        isShowDefaultBooleanSelect.value.show = false;
        isShowDefaultBooleanSelect.value.index = null;
        isShowByDefaultInput.value.show = false;
        isShowByDefaultInput.value.index = null;
        // Закрытие селекта для колонки type
        isShowTypeSelect.value.show = false;
        isShowTypeSelect.value.index = null;
    }

    // Обработчик изменения опциональности параметра
    function handlerChangeRequired(data, value) {
        data.required = value;
        emit('update', params.value);
        requiredValue.value = false;
        isShowRequiredSelect.value.show = false;
        isShowRequiredSelect.value.index = null;
    }

    // Обработчик открытия инпута для редактирования ключа
    function openInputKey(key, index) {
        isShowKeyInput.value.show = true;
        isShowKeyInput.value.index = index; 
        keyName.value = key;
    }

    // Обработчик открытия инпута для редактирования значения по умолчанию
    function openInputByDefault(value, type, index) {
        // Если тип данных параметра выбран как boolean, для значения по умолчанию открывается не обычный инпут а селект в котором true/false
        if(type === 'boolean') {
            isShowDefaultBooleanSelect.value.show = true;
            isShowDefaultBooleanSelect.value.index = index;
            byDefaultBool.value = value;
            return
        }
        isShowByDefaultInput.value.show = true;
        isShowByDefaultInput.value.index = index;
        byDefault.value = value;
    }

    // Обработчик открытия инпута для редактирования типа параметра
    function openInputType(value, index) {
        isShowTypeSelect.value.show = true;
        isShowTypeSelect.value.index = index;
        selectedType.value = value;
    }

    function openSelectRequired(isRequired, index) {
        requiredValue.value = isRequired;
        isShowRequiredSelect.value.show = true;
        isShowRequiredSelect.value.index = index;
    } 

    // Обработчик удаления параметра из таблицы
    function handlerRemoveParams(index) {
        params.value = params.value.filter((_, paramIndex) => index !== paramIndex);
        emit('update', params.value);
    }

    // ###############################  COMPUTED  ###############################
    // Вычисление значения для колонки default
    const computeValueDefaultCol = computed(() => {
        return function (data) {
            if(data.type === 'boolean') {
                return data.default;
            }
            else {
                if(data.default?.length) {
                    return data.default
                } else {
                    return '-' 
                }
            }
        }
    });

    return {
        // Data
        isShowKeyInput,
        isErrorKeyInput,
        isShowTypeSelect,
        isShowByDefaultInput,
        isShowDefaultBooleanSelect,
        isShowRequiredSelect,
        params,
        keyName,
        byDefault,
        byDefaultBool,
        selectedType,
        requiredValue,
        types,
        
        // Methods
        handlerAppendParam,
        handlerAppendKey,
        handlerAppendByDefault,
        handlerChangeDefaultBool,
        handlerChangeType,
        handlerChangeRequired,
        openInputKey,
        openInputByDefault,
        openInputType,
        openSelectRequired,
        handlerRemoveParams,

        // Computed
        computeValueDefaultCol,
    }
}