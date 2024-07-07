<template>
    <div class="flex flex-column mt-3">
        <h2 class="ci-text text-lg ml-3 mb-0">{{ props.data.label }}</h2>
        <InputGroup class="mt-1 px-5">
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
                v-else-if="props.data.type === 'string'" 
                class="type-string p-0 flex align-items-center" 
                :size="29"
                />
                <!-- Boolean Type -->
                <span 
                v-else-if="props.data.type === 'boolean'" 
                class="type-bool">bool</span>
            </InputGroupAddon>
    
            <!-- Boolean select -->
            <Select 
            v-if="props.data.type === 'boolean'"
            class="ci-text"
            v-model="booleanData"
            @update:modelValue="handlerEmitValue"
            :options="['true', 'false']" 
            :invalid="invalidData"
            :placeholder="props.data.key" 
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
    </div>
</template>

<script setup>
import Numeric from 'vue-material-design-icons/Numeric.vue';
import Alphabetical from 'vue-material-design-icons/Alphabetical.vue';
import HexagramOutline from 'vue-material-design-icons/Hexagram.vue';
import Help from 'vue-material-design-icons/Help.vue';
import { defineProps, defineEmits, ref, onMounted } from 'vue';

const props = defineProps({
    data: {
        type: Object,
        required: false,
        default(rawProp) {
            return {
                title: null,
                key: null,
                type: null,
                default: null,
                required: false,
            }
        }
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
    }
});
const emit = defineEmits(['updateValue', 'initEntries']);

const booleanData = ref(null);
const textData = ref(null);
const invalidData = ref(false);

// Обработчик для вводимых данных
function handlerEmitValue(value) {
    invalidData.value = false;
    if(props.data.type === 'number') {
        if(value.length > 0) {
            textData.value = value;
            console.log(value);
            if(+value !== +value) return invalidData.value = true;
            value = +value;
            return emit('updateValue', { key: props.data.key, value });
        } else {
            console.log('else', value.length);
            textData.value = value;
            return emit('updateValue', { key: props.data.key, value: undefined });
        }
    }
    if(value.length <= 0) {
        textData.value = value;
        return emit('updateValue', { key: props.data.key, value: undefined });
    }
    if(!!value) {
        textData.value = value;
        emit('updateValue', { key: props.data.key, value });
    }
}

function initDefaultValue() {
    Object.entries(props.initialValue).forEach(([key, value]) => {
        if(props.data.key !== key) return;
        console.log(value);
        if(props.data.type === 'boolean') return booleanData.value = value;
        if(props.data.type === 'string' || props.data.type === 'number') return textData.value = value;
    });
}

onMounted(() => {
    initDefaultValue();
})



</script>

<style scoped>
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
</style>