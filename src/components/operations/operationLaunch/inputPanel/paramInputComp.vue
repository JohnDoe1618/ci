<template>
    <InputGroup class="mt-2 px-5" :class="(invalidData)? 'invalid-data' : ''">
        <!-- Data Type -->
        <InputGroupAddon class="p-0" style="width: 3.5rem;">
            <!-- Number Type -->
            <Numeric
            v-if="props.data.type === 'number'" 
            class="type-numeric p-0 flex align-items-center" 
            :size="26"
            />
            <!-- String Type -->
            <Alphabetical 
            v-if="props.data.type === 'string'" 
            class="type-string p-0 flex align-items-center" 
            :size="29"
            />
            <!-- Boolean Type -->
            <span v-else-if="props.data.type === 'boolean'" class="type-bool">bool</span>
        </InputGroupAddon>

        <!-- Param Name -->
        <InputGroupAddon>
            <span class="param-name">
                {{ props.data.key }}
            </span>
            
        </InputGroupAddon>

        <Select 
        v-if="props.data.type === 'boolean'"
        class="ci-text"
        v-model="booleanData"
        @update:modelValue="handlerEmitValue"
        :options="['true', 'false']" 
        :placeholder="props.data.key" 
        :invalid="invalidData"
        checkmark
        :highlightOnSelect="false" 
        />
        <InputText 
        v-else 
        @update:modelValue="handlerEmitValue"
        :modelValue="textData"
        :invalid="invalidData"
        :placeholder="props.data.key" 
        />

        <!-- Required -->
        <InputGroupAddon>
            <span 
            class="is-necessary" 
            :class="(props.data.required === true)? 'required' : ''"
            >
                <HexagramOutline 
                v-if="props.data.required === true" 
                class="flex align-items-center"
                :size="17"
                v-tooltip.right="'required'"
                />
                <Help 
                v-else
                class="flex align-items-center" 
                :size="17"
                v-tooltip.right="'not required'"
                />
            </span>
            
        </InputGroupAddon>

    </InputGroup>
</template>

<script setup>
import Numeric from 'vue-material-design-icons/Numeric.vue';
import Alphabetical from 'vue-material-design-icons/Alphabetical.vue';
import HexagramOutline from 'vue-material-design-icons/Hexagram.vue';
import Help from 'vue-material-design-icons/Help.vue';
import { defineProps, defineEmits, ref, onMounted, watch } from 'vue';

const props = defineProps({
    data: {
        type: Object,
        required: false,
        default(rawProp) {
            return {
                key: null,
                type: null,
                default: null,
                required: false,
            }
        },
    },
    initialValue: {
        type: Object,
        required: false,
        default(rawProp) {
            return {
                key: null,
                value: null,
                type: null,
            }
        }
    },
    validate: {
        type: Boolean,
        required: false,
        default: false,
    }
});
const emit = defineEmits(['updateValue', 'initEntries', 'validationError']);

const booleanData = ref(null);
const textData = ref(null);
const invalidData = ref(false);

// Обработчик для вводимых данных
function handlerEmitValue(value) {
    invalidData.value = false;
    if(props.data.type === 'number') {
        if(value.length > 0) {
            textData.value = value;
            if(+value !== +value) {
                emit('validationError', {isError: true, key: props.data.key});
                return invalidData.value = true;
            }
            value = +value;
            emit('validationError', {isError: false, key: props.data.key});
            return emit('updateValue', { key: props.data.key, value });
        } else {
            textData.value = value;
            emit('validationError', {isError: false, key: props.data.key});
            return emit('updateValue', { key: props.data.key, value: undefined });
        }
    }
    if(value.length <= 0) {
        textData.value = value;
        emit('validationError', {isError: false, key: props.data.key});
        return emit('updateValue', { key: props.data.key, value: undefined });
    }
    if(!!value) {
        textData.value = value;
        emit('validationError', {isError: false, key: props.data.key});
        emit('updateValue', { key: props.data.key, value });
    }
}

// Валидация поля
function validateField() {
    if(props.data.required === true) {
        // Если тип данных boolean то проверяется соотв. переменная
        if(props.data.type === 'boolean') {
            if(booleanData.value === null || !booleanData.value?.length) {
                emit('validationError', {isError: true, key: props.data.key});
                return invalidData.value = true;
            }
        }
        // Если тип данных не booolean
        if(!textData.value) {
            emit('validationError', {isError: true, key: props.data.key});
            return invalidData.value = true;
        }
        emit('validationError', {isError: false, key: props.data.key});
    }
}

// Инициализация значений по умолчанию, если например они пришли из localStorage
function initDefaultValue() {
    Object.entries(props.initialValue).forEach(([key, value]) => {
        if(props.data.key !== key) return;
        if(props.data.type === 'boolean') return booleanData.value = value;
        if(props.data.type === 'string' || props.data.type === 'number') return textData.value = value;
    });
}

// отслеживание запроса на валидацию поля
watch(() => props.validate, (isValidate) => {
    if(isValidate === true) {
        validateField();
    }
})

onMounted(() => {
    initDefaultValue();
})

</script>

<style scoped>
@keyframes ripple-error {
    50% {
        background-color: rgba(225, 70, 70, 0.4);
    }
    100% {
        background-color: rgba(225, 70, 70, 0.3);
    }
}
.param-name {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: max-content;
    max-width: 5.4rem;
    overflow: auto;
    font-size: 1rem;
    font-weight: 600;
    font-family: monospace;
}
.param-name::-webkit-scrollbar {
    height: 4px;
}
.type-numeric {
    color: var(--type-numeric-color) !important;
}
.type-bool {
    font-weight: bolder;
    padding: 0 0.5rem;
    font-size: .9rem;
    font-family: monospace !important;
    color: var(--type-bool-color) !important;
}
.type-string {
    color: var(--type-string-color) !important;

}
.is-necessary {
    font-size: 1.1rem;
}

.is-necessary.required {
    color: var(--required-color) !important;
}
.invalid-data {
    background-color: rgba(225, 70, 70, 0.3);
    border-radius: var(--block-radius);
    animation-name: ripple-error;
    animation-duration: 0.2s;
    animation-iteration-count: 3;
}
</style>