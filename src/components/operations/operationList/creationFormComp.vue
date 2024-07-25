<template>
    <div class="op-form-overlay">
        <Toast />
           <!-- ,--.  ,--.                          
                |  ,'.|  | ,--,--.,--,--,--. ,---.  
                |  |' '  |' ,-.  ||        || .-. : 
                |  | `   |\ '-'  ||  |  |  |\   --. 
                `--'  `--' `--`--'`--`--`--' `----' -->
        <div class="chunk-form w-12">
            <label class="w-10 mr-5 flex align-items-center" for="operation-name">
                <h3 class="ci-text text-xl font-normal mb-2">> Name <span style="color: red;">*</span></h3>
                <!-- Кнопка Сбросить Изменения -->
                <Button
                v-show="computedVisibleResetBasicKey('title')"
                v-tooltip="'Reset'"
                class="ml-auto mb-1 shadow-1"
                icon="pi pi-undo" 
                size="small"
                text
                severity="warn"
                @click="() => handlerResetChangedKey('title')"
                />
            </label>
            <InputText 
            class="w-10"
            id="operation-name"
            placeholder="Operation Name"
            v-model.trim="formData.operationName"
            @input="(event) => handlerRecEditedBasicFields('title', event.target.value)"
            />
            <!-- Сообщения об ошибках для инпута Operation Name -->
            <inputErrorSignatures 
            :default-signature="'The name of the operation describes its purpose'"
            :empty-err="{ visible: errorsOperationName.empty.visible, msg: errorsOperationName.empty.msg }"
            :length-err="{ visible: errorsOperationName.lgth.visible, msg: errorsOperationName.lgth.msg }"
            :incorrect-err="{ visible: errorsOperationName.incorrect.visible, msg: errorsOperationName.incorrect.msg }"
            :spec-chars-err="{ visible: errorsOperationName.specialSymbols.visible, msg: errorsOperationName.specialSymbols.msg }"
            />
        </div>
       <!--   ,--.   ,--.         ,--.  ,--.               ,--. 
              |   `.'   | ,---. ,-'  '-.|  ,---.  ,---.  ,-|  | 
              |  |'.'|  || .-. :'-.  .-'|  .-.  || .-. |' .-. | 
              |  |   |  |\   --.  |  |  |  | |  |' '-' '\ `-' | 
              `--'   `--' `----'  `--'  `--' `--' `---'  `---'  -->
        <div class="chunk-form w-12">
            <label class="w-10 mr-5 flex align-items-center" for="operation-method">
                <h3 class="ci-text text-xl font-normal mb-2">> Method <span style="color: red;">*</span></h3>
                <!-- Кнопка Сбросить Изменения -->
                <Button
                v-show="computedVisibleResetBasicKey('method')"
                v-tooltip="'Reset'"
                class="ml-auto mb-1 shadow-1"
                icon="pi pi-undo" 
                size="small"
                text
                severity="warn"
                @click="() => handlerResetChangedKey('method')"
                />
            </label>
            <Select 
            class="w-10" 
            id="operation-method"
            v-model="formData.selectedMethod" 
            @change="handlerChangeMethod"
            :options="methods" 
            placeholder="Select a method" 
            />
            <!-- Сообщения об ошибках для селект-инпута Operation Method -->
            <inputErrorSignatures 
            :default-signature="'HTTP-method is required to perform a remote operation'"
            :empty-err="{ visible: isMethodErr, msg: 'Method is a required field' }"
            />
        </div>
       <!--   ,------.           ,--.              ,--.          ,--.   
              |  .---',--,--,  ,-|  | ,---.  ,---. `--',--,--, ,-'  '-. 
              |  `--, |      \' .-. || .-. || .-. |,--.|      \'-.  .-' 
              |  `---.|  ||  |\ `-' || '-' '' '-' '|  ||  ||  |  |  |   
              `------'`--''--' `---' |  |-'  `---' `--'`--''--'  `--'   
                                     `--'                               -->
        <div class="chunk-form w-12">
            <label class="w-10 mr-5 flex align-items-center" for="operation-endpoint">
                <h3 class="ci-text text-xl font-normal mb-2">> Endpoint</h3>
                <!-- Кнопка Сбросить Изменения -->
                <Button
                v-show="computedVisibleResetBasicKey('endpoint')"
                v-tooltip="'Reset'"
                class="ml-auto mb-1 shadow-1"
                icon="pi pi-undo" 
                size="small"
                text
                severity="warn"
                @click="() => handlerResetChangedKey('endpoint')"
                />
            </label>
            <InputGroup class="w-10">
                <InputGroupAddon><strong>/</strong></InputGroupAddon>
                <InputText 
                id="operation-endpoint"
                placeholder="Operation Endpoint"
                v-model.trim="formData.operationEndpoint"
                @input="(event) => handlerRecEditedBasicFields('endpoint', event.target.value)"
                />
            </InputGroup>
            <!-- Сообщения об ошибках для инпута Operation Endpoint -->
            <inputErrorSignatures 
            :default-signature="'Endpoint is the address of the resource on which the operation is performed'"
            :empty-err="{ visible: errorsOperationEndpoint.empty.visible, msg: errorsOperationEndpoint.empty.msg }"
            :spec-chars-err="{ visible: errorsOperationEndpoint.specialSymbols.visible, msg: errorsOperationEndpoint.specialSymbols.msg }"
            />
        </div>
            <!------.                             ,--.         ,--.  ,--.                
             |  .-.  \  ,---.  ,---.  ,---.,--.--.`--' ,---. ,-'  '-.`--' ,---. ,--,--,  
             |  |  \  :| .-. :(  .-' | .--'|  .--',--.| .-. |'-.  .-',--.| .-. ||      \ 
             |  '--'  /\   --..-'  `)\ `--.|  |   |  || '-' '  |  |  |  |' '-' '|  ||  | 
             `-------'  `----'`----'  `---'`--'   `--'|  |-'   `--'  `--' `---' `--''--' 
                                                      `-->
        <div class="chunk-form w-12">
            <label class="w-10 mr-5 flex align-items-center" for="operation-description">
                <h3 class="ci-text text-xl font-normal mb-2">> Description</h3>
                <!-- Кнопка Сбросить Изменения -->
                <Button
                v-show="computedVisibleResetBasicKey('description')"
                v-tooltip="'Reset'"
                class="ml-auto mb-1 shadow-1"
                icon="pi pi-undo" 
                size="small"
                text
                severity="warn"
                @click="() => handlerResetChangedKey('description')"
                />
            </label>
            <Textarea 
            id="operation-description" 
            class="w-10" 
            rows="2" 
            cols="30" 
            placeholder="Operation Description" 
            v-model.trim="formData.operationDescription"
            @input="(event) => handlerRecEditedBasicFields('description', event.target.value)"
            />
            <!-- Подпись для инпута Operation Description -->
            <inputErrorSignatures 
            :default-signature="'A simple summary of the operation'"
            />
        </div>
            <!------.           ,--.  ,--.                    
            |  .--. ' ,--,--.,-'  '-.|  ,---.  ,---.  ,---.  
            |  '--' |' ,-.  |'-.  .-'|  .-.  || .-. :(  .-'  
            |  | --' \ '-'  |  |  |  |  | |  |\   --..-'  `) 
            `--'      `--`--'  `--'  `--' `--' `----'`---->  
        <div class="chunk-form w-12">
            <label class="w-10 mr-5 flex align-items-center" for="operation-description">
                <h3 class="ci-text text-xl font-normal mb-2">> Path Params {{ formData.pathParams.length }}</h3>
            </label>
            <paramsFormComp 
            @update="(params) => updatePathParams(params)"
            @reset-changes="() => handlerResetParamsChanges('pathParams')"
            :is-reset-to-inital-state="!!editedFieldsForm['pathParams']"
            :edit-mode="isActiveEditMode"
            :initial-params="formData.pathParams"
            :error="isPathParamsError"
            />
        </div>
       <!--                    _        
             __ _ _  _ ___ _ _(_)___ ___
            / _` | || / -_) '_| / -_|_-<
            \__, |\_,_\___|_| |_\___/__/
               |_|-->
        <div class="chunk-form w-12">
            <label class="w-10 mr-5 flex align-items-center" for="operation-description">
                <h3 class="ci-text text-xl font-normal mb-2">> Query Params {{ formData.queryParams.length }}</h3>
            </label>
            <paramsFormComp 
            @update="(params) => updateQueryParams(params)"
            @reset-changes="() => handlerResetParamsChanges('queryParams')"
            :is-reset-to-inital-state="!!editedFieldsForm['queryParams']"
            :edit-mode="isActiveEditMode"
            :initial-params="formData.queryParams"
            :error="isQueryParamsError"
            />
        </div>
          <!-- ___            __ _                             _     
              | _ \    ___   / _` |   _  _     ___     ___    | |_   
              |   /   / -_)  \__, |  | +| |   / -_)   (_-<    |  _|  
              |_|_\   \___|   __|_|   \_,_|   \___|   /__/_   _\__|  
            _|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""| 
            "`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'-->
        <div class="chunk-form w-12">
            <label class="w-10 mr-5 flex align-items-center" for="operation-description">
                <h3 class="ci-text text-xl font-normal mb-2">> Request Body {{ formData.requestBodyParams.length }}</h3>
            </label>
            <paramsFormComp 
            @update="(params) => updateRequestBody(params)"
            @reset-changes="() => handlerResetParamsChanges('requestBody')"
            :is-reset-to-inital-state="!!editedFieldsForm['requestBody']"
            :edit-mode="isActiveEditMode"
            :initial-params="formData.requestBodyParams"
            :error="isRequestBodyParamsError"
            />
        </div>

        <!-- КНОПКА ПОДТВЕРЖДЕНИЯ ФОРМЫ -->
        <div class="chunk-form w-11 mt-4 mb-2">
            <Button
            class="ml-auto shadow-2"
            icon="pi pi-check" 
            :label="(!props.editOperationData)? 'Create' : 'Confirm'"
            :disabled="props.editOperationData && !Object.keys(editedFieldsForm).length"
            size="small"
            :icon-pos="'left'"
            :loading="isLoadRequest"
            @click="handlerConfirmForm"
            />
        </div>

    </div>
</template>

<script setup>
import inputErrorSignatures from '@/components/projects/newProject/inputErrorSignatures.vue';
import paramsFormComp from '@/components/operations/operationList/paramsFormComp.vue';
import useCreationOperationMain from '@/composables/newOperationComposables/createOperationMain';
import { defineProps, defineEmits } from 'vue';
// ###############################  PROPS  ###############################
const props = defineProps({
    editOperationData: {
        type: Object,
        required: false,
        default: null,
    },
    projectId: {
        type: Number,
        required: false,
        default: null,
    }
});


// ###############################  EMITS  ###############################
const emit = defineEmits(['close', 'appendOperation']);


// ###############################  COMPOSABLES  ###############################
const {  
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
} = useCreationOperationMain(props.projectId, props.editOperationData, emit);
</script>

<style scoped>
.op-form-overlay {
    width: 50vw;
    padding: 1rem 2rem 1.3rem 2rem !important;
}
.chunk-form {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.chunk-form + .chunk-form {
    margin-top: 0.6rem;
}
</style>