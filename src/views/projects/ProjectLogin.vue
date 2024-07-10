<template>
    <div class="ci-view ci-block w-full h-full flex justify-content-center align-items-center">
        <Toast />
        <form class="ci-block-2 project-login-form flex flex-column shadow-3 px-3 py-5" @submit.prevent>
            <h1 class="ci-text text-2xl mb-3 ml-2">Project Login</h1>
            <InputText 
            id="project-name" 
            v-model.trim="projectName" 
            @update:model-value="(value) => validateProjectName(value, false, (isError) => isProjectNameInvalidInput = isError)"
            @blur="({target: { value }}) => validateProjectName(value, true, (isError) => isProjectNameInvalidInput = isError)"
            @focus="({target: { value }}) => validateProjectName(value, true, (isError) => isProjectNameInvalidInput = isError)"
            :invalid="isProjectNameInvalidInput"
            type="text" 
            placeholder="Enter a project name"
            />
            <!-- Сообщения об ошибках для инпута projectName -->
            <inputErrorSignatures 
            :indent-left="3"
            :default-signature="'Project Name is a required field'"
            :empty-err="{ visible: errorsProjectName.empty.visible, msg: errorsProjectName.empty.msg }"
            :length-err="{ visible: errorsProjectName.lgth.visible, msg: errorsProjectName.lgth.msg }"
            :incorrect-err="{ visible: errorsProjectName.incorrect.visible, msg: errorsProjectName.incorrect.msg }"
            :spec-chars-err="{ visible: errorsProjectName.specialSymbols.visible, msg: errorsProjectName.specialSymbols.msg }"
            />

            <InputText
            class="mt-3"
            id="project-password" 
            v-model.trim="password" 
            @update:model-value="(value) => validatePassword(value, false, (isError) => isPasswordInvalidInput = isError)"
            @blur="({target: { value }}) => validatePassword(value, true, (isError) => isPasswordInvalidInput = isError)"
            @focus="({target: { value }}) => validatePassword(value, true, (isError) => isPasswordInvalidInput = isError)"
            :invalid="isPasswordInvalidInput"
            type="password" 
            placeholder="Project password"
            />
            <!-- Сообщения об ошибках для инпута password -->
            <inputErrorSignatures 
            :indent-left="3"
            :default-signature="'Password is a required field'"
            :empty-err="{ visible: errorsPassword.empty.visible, msg: errorsPassword.empty.msg }"
            :length-err="{ visible: errorsPassword.lgth.visible, msg: errorsPassword.lgth.msg }"
            />
            <Button 
            class="align-self-end mt-3" 
            label="Confirm"
            @click="loginConfirm"
            />
        </form>
    </div>
</template>

<script setup>
import inputErrorSignatures from '@/components/projects/newProject/inputErrorSignatures.vue';
import useNewProject from '@/composables/newProjectComposables/newProjectComposable';
import ProjectService from '@/services/projectService';
import { ref } from 'vue';
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';
import { useProjectsStore } from '@/stores/projectsStore';

// ===============================  COMPOSABLES  ================================
const router = useRouter();
const projectsStore = useProjectsStore();
const toast = useToast();

// ===============================  DATA  ================================
const isProjectNameInvalidInput = ref(false);
const isPasswordInvalidInput = ref(false);

const {
    // validators
    validateProjectName, errorsProjectName,
    validatePassword, errorsPassword,
} = useNewProject();

const projectName = ref('');
const password = ref('');

// Подтверждение формы
async function loginConfirm() {
    try {
        validateProjectName(projectName.value);
        validatePassword(password.value);
        if(errorsPassword.hasError() === true) isPasswordInvalidInput.value = true;
        if(errorsProjectName.hasError() === true) isProjectNameInvalidInput.value = true;
        if(isPasswordInvalidInput.value === true || isProjectNameInvalidInput.value === true) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Fill in all the fields', life: 3000 });
            return;
        }
        await ProjectService.loginProject();
        projectsStore.isAuthForCurrentProject = true;
        router.push({ name: 'project', params: { id: 2 } });
    } catch (err) {
        console.error(`views/projectLogin.vue: loginConfirm  =>  ${err}`);      
    }
}

</script>

<style scoped>
.project-login-form {
    width: 450px;
    height: max-content;
    border: 1px solid var(--ui-border-color);
    border-radius: 10px;
}
</style>