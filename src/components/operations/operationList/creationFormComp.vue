<template>
    <div class="op-form-overlay">
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
            />
            <!-- Сообщения об ошибках для инпута Operation Name -->
            <inputErrorSignatures 
            :default-signature="'The name of the operation describes its purpose'"
            :empty-err="{ visible: false, msg: 'Empty' }"
            :length-err="{ visible: false, msg: 'Length' }"
            :incorrect-err="{ visible: false, msg: 'Incorrect' }"
            :spec-chars-err="{ visible: false, msg: 'Spec' }"
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
            v-model="selectedMethod" 
            :options="methods" 
            placeholder="Select a method" 
            />
            <!-- Сообщения об ошибках для селект-инпута Operation Method -->
            <inputErrorSignatures 
            :default-signature="'HTTP-method is required to perform a remote operation'"
            :empty-err="{ visible: false, msg: 'Empty' }"
            :length-err="{ visible: false, msg: 'Length' }"
            :incorrect-err="{ visible: false, msg: 'Incorrect' }"
            :spec-chars-err="{ visible: false, msg: 'Spec' }"
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
                <h3 class="ci-text text-xl font-normal mb-2">> Endpoint <span style="color: red;">*</span></h3>
            </label>
            <InputText 
            id="operation-endpoint"
            class="w-10"
            placeholder="Operation Endpoint"
            />
            <!-- Сообщения об ошибках для инпута Operation Endpoint -->
            <inputErrorSignatures 
            :default-signature="'Endpoint is the address of the resource on which the operation is performed'"
            :empty-err="{ visible: false, msg: 'Empty' }"
            :length-err="{ visible: false, msg: 'Length' }"
            :incorrect-err="{ visible: false, msg: 'Incorrect' }"
            :spec-chars-err="{ visible: false, msg: 'Spec' }"
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
            <InputText 
            id="operation-description"
            class="w-10"
            placeholder="Operation Description"
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
                <h3 class="ci-text text-xl font-normal mb-2">> Path Params</h3>
            </label>
            <paramsFormComp />
        </div>

    </div>
</template>

<script setup>
import inputErrorSignatures from '@/components/projects/newProject/inputErrorSignatures.vue';
import paramsFormComp from '@/components/operations/operationList/paramsFormComp.vue';
import { ref } from 'vue';

const selectedMethod = ref(null);

const methods = ref(['GET','POST','PUT','DELETE','PATCH',]);

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