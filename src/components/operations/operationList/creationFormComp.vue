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
            </label>
            <InputText 
            id="operation-name"
            class="w-10"
            placeholder="Operation Name"
            v-model.trim="formData.operationName"
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
            </label>
            <Select 
            class="w-10" 
            id="operation-method"
            v-model="formData.selectedMethod" 
            @change="isMethodErr = false"
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
            </label>
            <InputGroup class="w-10">
                <InputGroupAddon><strong>/</strong></InputGroupAddon>
                <InputText 
                id="operation-endpoint"
                placeholder="Operation Endpoint"
                v-model.trim="formData.operationEndpoint" 
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
            </label>
            <Textarea 
            id="operation-description" 
            class="w-10" 
            rows="2" 
            cols="30" 
            placeholder="Operation Description" 
            v-model.trim="formData.operationDescription"
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
            :error="isRequestBodyParamsError"
            />
        </div>

        <!-- КНОПКА ПОДТВЕРЖДЕНИЯ ФОРМЫ -->
        <div class="chunk-form w-11 mt-4 mb-2">
            <Button
            class="ml-auto shadow-2"
            icon="pi pi-check" 
            label="Create"
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
} = useCreationOperationMain(props.projectId, emit);
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