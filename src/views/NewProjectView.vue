<template>
    <div class="ci-view ci-block w-full flex flex-column align-items-stretch justify-content-start">

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
                <InputText class="w-10" v-model="projectName" id="project-name" type="text" placeholder="Enter a project name"/>

                <!-- Default Signature-->
                <small v-if="true" class="w-10 mt-2 ml-5 flex align-items-center">
                    <i 
                    class="pi pi-question-circle mr-2" 
                    style="font-size: 1rem; color: gray;" 
                    ></i>
                    The name of the project does not affect anything, but it is necessary
                </small>

                <!-- ERROR:[Special Characters] -->
                <small v-else class="w-10 mt-2 ml-5 flex align-items-center">
                    <i 
                    class="pi pi-exclamation-circle mr-2" 
                    style="font-size: 1rem; color: red;" 
                    ></i>
                    <span style="color: red;">the <strong>name</strong> cannot contain special characters: !@#$%^&*()-=+_</span>
                </small>
            </div>

            <!---------------------   PROJECT DESCRIPTION   ----------------------->
            <div class="new-project-block w-8 p-1 pb-3 flex flex-column align-items-center justify-content-center">
                <label class="w-10 mr-5" for="project-description">
                    <h3 class="ci-text text-xl font-normal mb-2">> Description</h3>
                </label>
                <Textarea class="w-10" v-model="projectDescription" id="project-description" autoResize rows="5" cols="30" placeholder="Enter a description" />

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
                    <SelectButton class="align-self-center mb-2 ml-auto" v-model="hostProtocol" :options="['http://', 'https://']" aria-labelledby="basic" />
                </label>
                <InputGroup class="w-10">
                    <InputGroupAddon>{{ hostProtocol }}</InputGroupAddon>
                    <InputText v-model="projectHost" id="project-host" placeholder="example-host" />
                </InputGroup>

                <!-- Default Signature-->
                <small v-if="true" class="w-10 mt-2 ml-5 flex align-items-center">
                    <i 
                    class="pi pi-question-circle mr-2" 
                    style="font-size: 1rem; color: gray;" 
                    ></i>
                    A host is required for remote project management
                </small>

                <!-- ERROR:[Special Characters] -->
                <small v-else class="w-10 mt-2 ml-5 flex align-items-center">
                    <i 
                    class="pi pi-exclamation-circle mr-2" 
                    style="font-size: 1rem; color: red;" 
                    ></i>
                    <span style="color: red;">the <strong>host</strong> cannot contain special characters: !@#$%^&*()-=+_</span>
                </small>
            </div>

            <!---------------------   PROJECT PORT   ----------------------->
            <div class="new-project-block w-8 p-1 pb-3 flex flex-column align-items-center justify-content-center">
                <label class="w-10 mr-5 flex align-items-center" for="project-port">
                    <h3 class="ci-text text-xl font-normal mb-2">> Port <span style="color: red;">*</span></h3>
                </label>
                <InputMask v-model="projectPort" id="project-port" mask="9999?9" placeholder="65535"/>

                <!-- Default Signature-->
                <small v-if="true" class="w-10 mt-2 ml-5 flex align-items-center">
                    <i 
                    class="pi pi-question-circle mr-2" 
                    style="font-size: 1rem; color: gray;" 
                    ></i>
                    Port is a required server application identifier
                </small>

                <!-- ERROR:[Invalid Value] -->
                <small v-else class="w-10 mt-2 ml-5 flex align-items-center">
                    <i 
                    class="pi pi-exclamation-circle mr-2" 
                    style="font-size: 1rem; color: red;" 
                    ></i>
                    <span style="color: red;">invalid <strong>port</strong> </span>
                </small>
            </div>

            <!---------------------   HANDSHAKE TOKEN   ----------------------->
            <div class="new-project-block w-8 p-1 pb-3 flex flex-column align-items-center justify-content-center">
                <label class="w-10 mr-5" for="handshake-token">
                    <h3 class="ci-text text-xl font-normal mb-2">> Handshake Token <span style="color: red;">*</span></h3>
                </label>
                <InputText class="w-10" v-model="handshakeToken" id="handshake-token" type="password" placeholder="any"/>

                <!-- Default Signature-->
                <small v-if="true" class="w-10 mt-2 ml-5 flex align-items-center">
                    <i 
                    class="pi pi-question-circle mr-2" 
                    style="font-size: 1rem; color: gray;" 
                    ></i>
                    The handshake token is required to establish a connection with the remote server
                </small>

                <!-- ERROR:[Field Empty] -->
                <small v-else class="w-10 mt-2 ml-5 flex align-items-center">
                    <i 
                    class="pi pi-exclamation-circle mr-2" 
                    style="font-size: 1rem; color: red;" 
                    ></i>
                    <span style="color: red;"><strong>handshake token</strong> cannot be empty</span>
                </small>
            </div>

            <div class="w-8 flex justify-content-end align-items-center mt-3">
                <Button class="mr-2" @click="resetForm" icon="pi pi-undo" aria-label="Save" title="reset form" />
                <Button class="btn-success w-10rem" @click="confirmCreationForm" label="Save" icon="pi pi-check" iconPos="right" severity="success"/>
            </div>
        </form>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const hostProtocol = ref('http://');
const projectName = ref('');
const projectDescription = ref('');
const projectHost = ref('');
const projectPort = ref('');
const handshakeToken = ref('');

// Очистить поля формы
function resetForm() {
    projectName.value = '';
    projectDescription.value = '';
    projectHost.value = '';
    projectPort.value = '';
    handshakeToken.value = '';
}

// Подтвердить форму
function confirmCreationForm() {
    // 
}

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