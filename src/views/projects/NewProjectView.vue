<template>
    <div class="ci-view ci-block w-full flex flex-column align-items-stretch justify-content-start">
        <Toast />
        <!-- HEADER -->
        <header class="new-project__header w-full h-4rem flex align-items-center px-4">
            <!-- Back page -->
            <Button 
            class="mr-3"
            icon="pi pi-angle-left" 
            rounded 
            raised 
            @click="router.go(-1)"
            title="go to back" />
            <h1 class="ci-text text-2xl mr-auto font-normal">New Project</h1>

        </header>
        
        <!-- MAIN -->
        <form class="ci-block w-full h-full flex flex-column align-items-center overflow-auto px-8 py-6" @submit.prevent>

            <!---------------------   PROJECT NAME   ----------------------->
            <div class="new-project-block w-8 p-1 pb-3 flex flex-column align-items-center justify-content-center">
                <label class="w-10 mr-5" for="project-name">
                    <h3 class="ci-text text-xl font-normal mb-2">> Project name <span style="color: red;">*</span></h3>
                </label>

                <InputText 
                class="w-10" 
                v-model.trim="creationForm.projectName" 
                @update:model-value="(value) => validateProjectName(value)"
                @blur="({target: { value }}) => validateProjectName(value, true)"
                @focus="({target: { value }}) => validateProjectName(value, true)"
                id="project-name" 
                type="text" 
                placeholder="Enter a project name"
                />
                <!-- Сообщения об ошибках для инпута projectName -->
                <inputErrorSignatures 
                :default-signature="'The name of the project does not affect anything, but it is necessary'"
                :empty-err="{ visible: errorsProjectName.empty.visible, msg: errorsProjectName.empty.msg }"
                :length-err="{ visible: errorsProjectName.lgth.visible, msg: errorsProjectName.lgth.msg }"
                :incorrect-err="{ visible: errorsProjectName.incorrect.visible, msg: errorsProjectName.incorrect.msg }"
                :spec-chars-err="{ visible: errorsProjectName.specialSymbols.visible, msg: errorsProjectName.specialSymbols.msg }"
                />
            </div>

            <!---------------------   PROJECT DESCRIPTION   ----------------------->
            <div class="new-project-block w-8 p-1 pb-3 flex flex-column align-items-center justify-content-center">
                <label class="w-10 mr-5" for="project-description">
                    <h3 class="ci-text text-xl font-normal mb-2">> Description</h3>
                </label>
                <!-- <Textarea class="w-10" v-model.trim="creationForm.projectDescription" id="project-description" autoResize rows="5" cols="30" placeholder="Enter a description" /> -->
                <textEditorComp class="w-10" v-model="creationForm.projectDescription"/>

                <!-- Default Signature-->
                <small class="w-10 mt-2 ml-5 flex align-items-center">
                    <i 
                    class="pi pi-question-circle mr-2" 
                    style="font-size: 1rem; color: gray;" 
                    ></i>
                    A project description is not required, but you can describe the essence of the project
                </small>
            </div>

            <!---------------------   PROJECT HOST   ----------------------->
            <div class="new-project-block w-8 p-1 pb-3 flex flex-column align-items-center justify-content-center">
                <label class="w-10 mr-5 flex align-items-center" for="project-host">
                    <h3 class="ci-text text-xl font-normal mb-2">> Host <span style="color: red;">*</span></h3>
                    <SelectButton class="align-self-center mb-2 ml-auto" v-model="creationForm.hostProtocol" :options="['http://', 'https://']" aria-labelledby="basic" />
                </label>
                <InputGroup class="w-10">
                    <InputGroupAddon>{{ creationForm.hostProtocol }}</InputGroupAddon>
                    <InputText 
                    v-model.trim="creationForm.projectHost" 
                    @update:model-value="(value) => validateProjectHost(value)"
                    @blur="({target: { value }}) => validateProjectHost(value, true)"
                    @focus="({target: { value }}) => validateProjectHost(value, true)"
                    id="project-host" 
                    placeholder="example-host"
                    />
                </InputGroup>
                <!-- Сообщения об ошибках для инпута projectHost -->
                <inputErrorSignatures 
                :default-signature="'A host is required for remote project management'"
                :empty-err="{ visible: errorsProjectHost.empty.visible, msg: errorsProjectHost.empty.msg }"
                :length-err="{ visible: errorsProjectHost.lgth.visible, msg: errorsProjectHost.lgth.msg }"
                :incorrect-err="{ visible: errorsProjectHost.incorrect.visible, msg: errorsProjectHost.incorrect.msg }"
                :spec-chars-err="{ visible: errorsProjectHost.specialSymbols.visible, msg: errorsProjectHost.specialSymbols.msg }"
                />
            </div>

            <!---------------------   PROJECT PORT   ----------------------->
            <div class="new-project-block w-8 p-1 pb-3 flex flex-column align-items-center justify-content-center">
                <label class="w-10 mr-5 flex align-items-center" for="project-port">
                    <h3 class="ci-text text-xl font-normal mb-2">> Port <span style="color: red;">*</span></h3>
                </label>
                <InputMask 
                v-model="creationForm.projectPort" 
                @update:model-value="(value) => validateProjectPort(value)"
                @blur="({target: { value }}) => validateProjectPort(value, true)"
                @focus="({target: { value }}) => validateProjectPort(value, true)"
                id="project-port" 
                mask="9999?9" placeholder="65535"
                />
                <!-- Сообщения об ошибках для инпута projectHost -->
                <inputErrorSignatures 
                :default-signature="'Port is a required server application identifier'"
                :empty-err="{ visible: errorsProjectPort.empty.visible, msg: errorsProjectPort.empty.msg }"
                :length-err="{ visible: errorsProjectPort.lgth.visible, msg: errorsProjectPort.lgth.msg }"
                />
            </div>

            <!---------------------   HANDSHAKE TOKEN   ----------------------->
            <div class="new-project-block w-8 p-1 pb-3 flex flex-column align-items-center justify-content-center">
                <label class="w-10 mr-5" for="handshake-token">
                    <h3 class="ci-text text-xl font-normal mb-2">> Handshake Token <span style="color: red;">*</span></h3>
                </label>
                <InputText 
                class="w-10" 
                v-model.trim="creationForm.handshakeToken" 
                @update:model-value="(value) => validateHandshakeToken(value)"
                @blur="({target: { value }}) => validateHandshakeToken(value, true)"
                @focus="({target: { value }}) => validateHandshakeToken(value, true)"
                id="handshake-token" 
                type="password" 
                placeholder="any"
                />

                <!-- Сообщения об ошибках для инпута handshakeToken -->
                <inputErrorSignatures 
                :default-signature="'The handshake token is required to establish a connection with the remote server'"
                :empty-err="{ visible: errorsHandshakeToken.empty.visible, msg: errorsHandshakeToken.empty.msg }"
                />
            </div>

            <ConfirmPopup></ConfirmPopup>
            <div class="w-8 flex justify-content-end align-items-center mt-3">
                <Button 
                class="mr-2" 
                @click="handlerReset($event)" 
                :disabled="isResetDisabled" 
                icon="pi pi-undo" 
                aria-label="Save" 
                title="reset form" 
                />
                <Button 
                class="btn-success w-10rem" 
                @click="confirmCreationForm" 
                :disabled="isConfirmDisabled"
                label="Save" 
                icon="pi pi-check" 
                iconPos="right" 
                severity="success"
                />
            </div>
        </form>

    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import useNewProject from '@/composables/newProjectComposables/newProjectComposable';
import inputErrorSignatures from '@/components/projects/newProject/inputErrorSignatures.vue';
import { watch } from 'vue';

const router = useRouter();

const {
    // State
    isResetDisabled,
    isConfirmDisabled,
    creationForm,
    // Actions
    handlerReset,
    confirmCreationForm,

    // validators
    validateProjectName, errorsProjectName,
    validateProjectHost, errorsProjectHost,
    validateProjectPort, errorsProjectPort,
    validateHandshakeToken, errorsHandshakeToken,
} = useNewProject();

watch(() => creationForm.projectDescription, (newValue) => console.log(newValue))

</script>

<style scoped>
.new-project__header {
    border-bottom: 1px solid var(--border-color-view);
    cursor: default;
    user-select: none;
}
.new-project-block {
    border-bottom: 1px solid var(--border-color-view);
}
.new-project-block + .new-project-block {
    margin-top: 3rem;
}
</style>