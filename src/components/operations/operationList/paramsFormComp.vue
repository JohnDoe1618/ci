
<!-- Компонент для заполнения/редактирования параметров путей/запроса/тела запроса. 
    Используется один компонент для них в силу того что это однообразные сущности с идентичными ключами и требованиями -->
<template>
    <DataTable
    class="params-form w-10"
    :value="params" 
    :show-gridlines="true"
    tableStyle="min-width: 30rem"
    >
         
     <!--    ___ __  __ ___ _______   __
            | __|  \/  | _ \_   _\ \ / /
            | _|| |\/| |  _/ | |  \ V / 
            |___|_|  |_|_|   |_|   |_|  -->
        <!-- Массив параметров пуст -->
        <template #empty>
            <div class="w-full h-full flex align-items-center justify-content-center">
                <Button
                icon="pi pi-plus" 
                size="small"
                @click="handlerAppendParam"
                />
            </div>
        </template>
       <!-- ╦╔═╔═╗╦ ╦
            ╠╩╗║╣ ╚╦╝
            ╩ ╩╚═╝ ╩ -->
        <Column field="key" style="width: 25% !important;">
            <template #header><strong>Key</strong><span style="color: red;">*</span></template>
            <template #body="{ data, index }">
                <div class="flex w-full justify-content-center" style="width: 100% !important;">
                    <div v-if="isShowKeyInput.show && isShowKeyInput.index === index" class="relative flex align-items-center justify-content-center">
                        <InputText
                        class="m-1 w-full"
                        placeholder="Param key"
                        v-model="keyName"
                        :invalid="isErrorKeyInput"
                        />
                        <i 
                        class="absolute pi pi-check cursor-pointer" 
                        style="right: 0.7rem;"
                        @click="() => handlerAppendKey(data)"
                        ></i>
                    </div>
      
                    <div v-else class="relative w-full flex align-items-center justify-content-between py-1 px-2">
                        <p>{{ data?.key }}</p>
                        <Button 
                        class="absolute p-0 w-2rem" 
                        style="right: 0.1rem;" 
                        icon="pi pi-pencil" 
                        size="small" 
                        text
                        title="edit"
                        @click="() => openInputKey(data?.key, index)"
                        />
                    </div>
                </div>
            </template>
        </Column>
        <!--╔╦╗╦ ╦╔═╗╔═╗
             ║ ╚╦╝╠═╝║╣ 
             ╩  ╩ ╩  ╚═╝-->
        <Column field="type" style="width: 25% !important;">
            <template #header><strong>Type</strong><span style="color: red;">*</span></template>
            <template #body="{ data, index }">
                <div class="w-auto h-max flex justify-content-center">
                    <Select 
                    v-if="isShowTypeSelect.show && isShowTypeSelect.index === index" 
                    class="m-1 w-full"
                    @change="(event) => handlerChangeType(data, event.value)"
                    :model-value="selectedType"
                    :options="types" 
                    placeholder="Select a type" 
                    />
                    <div v-else class="relative w-full flex align-items-center justify-content-between py-1 px-2">
                        <p>{{ data?.type }}</p>
                        <Button 
                        class="absolute p-0 w-2rem" 
                        style="right: 0.1rem;" 
                        icon="pi pi-pencil" 
                        size="small" 
                        text
                        title="edit"
                        @click="() => openInputType(data?.type, index)"
                        />
                    </div>
                </div>
            </template>
        </Column>
         <!--╔╦╗╔═╗╔═╗╔═╗╦ ╦╦ ╔╦╗
              ║║║╣ ╠╣ ╠═╣║ ║║  ║ 
             ═╩╝╚═╝╚  ╩ ╩╚═╝╩═╝╩ -->
        <Column field="default" header="By default" style="width: 25% !important;">
            <template #body="{ data, index }">
                <div class="w-full flex justify-content-center">
                    <div v-if="isShowByDefaultInput.show && isShowByDefaultInput.index === index" class="relative w-full flex align-items-center justify-content-center">
                        <InputText
                        class="m-1 w-full"
                        placeholder="Default by"
                        v-model="byDefault"
                        />
                        <i 
                        class="absolute pi pi-check cursor-pointer" 
                        style="right: 0.7rem;"
                        @click="() => handlerAppendByDefault(data)"
                        ></i>
                    </div>
                    <!-- Если тип данных параметра представлен как boolean -->
                    <Select 
                    v-else-if="isShowDefaultBooleanSelect.show && isShowDefaultBooleanSelect.index === index" 
                    class="m-1 w-full"
                    @change="(event) => handlerChangeDefaultBool(data, event.value)"
                    :model-value="byDefaultBool"
                    :option-label="'label'"
                    :option-value="'value'"
                    :options="[{ label: 'True', value: true}, {label: 'False', value: false }]" 
                    placeholder="Default by" 
                    />
                    <div v-else class="relative w-full flex align-items-center justify-content-between py-1 px-2">
                        <p>{{ computeValueDefaultCol(data) }}</p>
                        <Button 
                        class="absolute p-0 w-2rem ml-auto" 
                        style="right: 0.1rem;" 
                        icon="pi pi-pencil" 
                        size="small" 
                        text
                        title="edit"
                        @click="() => openInputByDefault(data?.default, data?.type, index)"
                        />
                    </div>
                </div>
            </template>
        </Column>
        <!--╦═╗╔═╗╔═╗ ╦ ╦╦╦═╗╔═╗╔╦╗
            ╠╦╝║╣ ║═╬╗║ ║║╠╦╝║╣  ║║
            ╩╚═╚═╝╚═╝╚╚═╝╩╩╚═╚═╝═╩╝-->
        <Column field="required" header="Required" style="width: 25% !important">
            <template #body="{ data, index }">
                <div class="w-full flex justify-content-center">
                    <Select 
                    v-if="isShowRequiredSelect.show && isShowRequiredSelect.index === index" 
                    class="m-1 w-full"
                    @change="(event) => handlerChangeRequired(data, event.value)"
                    :model-value="requiredValue"
                    :option-label="'label'"
                    :option-value="'value'"
                    :options="[{ label: 'True', value: true}, {label: 'False', value: false }]" 
                    placeholder="Required" 
                    />
                    <div v-else class="relative w-full flex align-items-center justify-content-between py-1 px-2">
                        <p>{{ data.required }}</p>
                        <Button 
                        class="absolute p-0 w-2rem ml-auto" 
                        style="right: 0.1rem;" 
                        icon="pi pi-pencil" 
                        size="small" 
                        text
                        title="edit"
                        @click="() => openSelectRequired(data?.required, index)"
                        />
                    </div>
                </div>
            </template>
        </Column>
        <!-- Колонка для удаления параметра из таблицы -->
        <Column field="action", header="X" style="font-family: monospace">
            <template #body="{ data, index }">
                <div class="flex align-items-center justify-content-center">
                    <!-- Для удаления текущего параметра -->
                    <Button 
                    class="p-0 w-2rem" 
                    icon="pi pi-trash" 
                    size="small" 
                    title="remove"
                    text
                    severity="danger"
                    @click="() => handlerRemoveParams(index)"
                    />
                </div>
            </template>
        </Column>
         <!--___ ___   ___ _____ ___ ___ 
            | __/ _ \ / _ \_   _| __| _ \
            | _| (_) | (_) || | | _||   /
            |_| \___/ \___/ |_| |___|_|_\-->
        <template #footer>
            <div v-if="params.length" class="w-full h-max flex align-items-center justify-content-end">
                <Button
                class="text-xs mt-1"
                icon="pi pi-plus" 
                size="small"
                @click="handlerAppendParam"
                />
            </div>
        </template>
    </DataTable>
</template>

<script setup>
import { ref, computed } from 'vue';

const isShowKeyInput = ref({ show: false, index: null });
const isErrorKeyInput = ref(false);
const isShowTypeSelect = ref({ show: false, index: null });
const isShowByDefaultInput = ref({ show: false, index: null });
const isShowDefaultBooleanSelect = ref({ show: false, index: null });
const isShowRequiredSelect = ref({ show: false, index: null });
const params = ref([
    // { key: 'id', type: 'number', default: 0, required: true }
]);
const keyName = ref(null);
const byDefault = ref(null);
const byDefaultBool = ref(false);
const selectedType = ref(null);
const requiredValue = ref(false);
const types = ref([ 'string', 'number', 'boolean', 'array', 'object' ]);

// Обработчик добавления ключа
function handlerAppendKey(data) {
    if(!!keyName.value) {
        data.key = keyName.value;
        keyName.value = null; 
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
    byDefault.value = null; 
    isShowByDefaultInput.value.show = false;
    isShowByDefaultInput.value.index = null;
}

// Обработчик добавления boolean значения как значение по умолчанию для параметра
function handlerChangeDefaultBool(data, value) {
    data.default = value;
    isShowDefaultBooleanSelect.value.show = false;
    isShowDefaultBooleanSelect.value.index = null;
    byDefaultBool.value = false;
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

// Обработчик изменения типа данных. Для того чтобы сбросить значение по умолчанию
function handlerChangeType(data, type) {
    // обнуление колонки для значения по умолчанию
    byDefault.value = null;
    data.default = null;
    data.type = type;
    if(type === 'boolean') data.default = false;
    isShowDefaultBooleanSelect.value.show = false;
    isShowDefaultBooleanSelect.value.index = null;
    isShowByDefaultInput.value.show = false;
    isShowByDefaultInput.value.index = null;
    isShowTypeSelect.value.show = false;
    isShowTypeSelect.value.index = null;
}

// Обработчик изменения опциональности параметра
function handlerChangeRequired(data, value) {
    data.required = value;
    requiredValue.value = false;
    isShowRequiredSelect.value.show = false;
    isShowRequiredSelect.value.index = null;
}
function openSelectRequired(isRequired, index) {
    requiredValue.value = isRequired;
    isShowRequiredSelect.value.show = true;
    isShowRequiredSelect.value.index = index;
} 

// Обработчик добавления нового параметра в таблицу параметров
function handlerAppendParam() {
    try {
        params.value.push({ key: null, type: null, default: null, required: false });
        isShowTypeSelect.value.show = true;
        isShowTypeSelect.value.index = params.value.length - 1;
        isShowKeyInput.value.show = true;
        isShowKeyInput.value.index = params.value.length - 1;
    } catch (err) {
        console.error(err);
    }
};

// Обработчик удаления параметра из таблицы
function handlerRemoveParams(index) {
    params.value = params.value.filter((_, paramIndex) => index !== paramIndex);
}

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
})

</script>

<style scoped>
</style>