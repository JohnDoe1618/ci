
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
                class="my-1"
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
            <div v-if="params.length || props.editMode" class="w-full h-max flex align-items-center justify-content-end">
                <!-- Всплывающая форма подтверждения при попытке сбросить изменения в параметрах  -->
                <ConfirmPopup></ConfirmPopup>
                <span v-show="props.error && params.length" class="mr-auto" style="color: red;"><strong>Key</strong> and <strong>Type</strong> is a required fields</span>
                <!-- Сбросить изменения параметров до исходных значений (ДЛЯ РЕЖИМА РЕДАКТИРОВАНИЯ) -->
                <Button
                v-show="props.isResetToInitalState"
                v-tooltip="'Reset Changes'"
                class="text-xs mt-1 mr-1"
                icon="pi pi-undo" 
                size="small"
                severity="warn"
                @click="handlerConfirmResetState($event)"
                />
                <!-- Добавить параметр -->
                <Button
                v-show="params.length"
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
import { defineEmits, defineProps } from 'vue';
import { useParamsForm } from '@/composables/newOperationComposables/paramsForm';
import useEditParamsForm from '@/composables/newOperationComposables/editParamsForm';
// ###############################  PROPS  ###############################
const props = defineProps({
    editMode: {
        type: Boolean,
        required: false,
        default: false,
    },
    initialParams: {
        type: Array,
        required: false,
        default: () => [],
    },
    isResetToInitalState: {
        type: Boolean,
        required: false,
        default: false,
    },
    error: {
        type: Boolean,
        required: false,
        default: false,
    }
});

// ###############################  EMITS  ###############################
const emit = defineEmits(['update', 'resetChanges']);

// ###############################  COMPOSABLES  ###############################
const {
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
} = useParamsForm(emit);

const { handlerConfirmResetState } = useEditParamsForm(props, emit, params);
</script>

<style scoped>
</style>