<template>
    <div class="ci-view ci-block w-full h-full flex flex-column align-items-stretch">
        <projectSettingsDrawer 
        :show="isShowProjectSettingDrawer"
        @close="isShowProjectSettingDrawer = false"
        />
        <div class="ci-block flex align-items-center my-3 mx-4">
            <h1 class="ci-text text-4xl">Second Project</h1>
            <Button class="ci-btn ml-2" icon="pi pi-pencil" text/>

            <!-- Settings project -->
            <Button
            class="ml-auto"
            icon="pi pi-cog" 
            rounded 
            raised 
            @click="isShowProjectSettingDrawer = true"
            title="project settings" />

            <!-- Leave a project -->
            <Button
            class="ml-2"
            icon="pi pi-sign-out" 
            rounded 
            raised 
            @click="console.log('leave a project')"
            title="leave a project" />

   
        </div>
        <Toolbar class="ci-block mx-2 shadow-3">
            <template #start>
                <Button class="ci-btn mr-2" @click="$router.push({ name: 'description' })" label="Description" icon="pi pi-info-circle" iconPos="left" size="" />
                <Button class="ci-btn mr-2" @click="$router.push({ name: 'statistics' })" label="Statistics" icon="pi pi-chart-bar" iconPos="left" size="" />
                <Button class="ci-btn mr-2" @click="$router.push({ name: 'operations' })" label="Operations" icon="pi pi-code" iconPos="left" size=""/>
                <Button class="ci-btn mr-2" @click="$router.push({ name: 'interactions' })" label="Interactions" icon="pi pi-history" iconPos="left" size=""/>
                <Button class="ci-btn mr-2" @click="$router.push({ name: 'participants' })" label="Participants" icon="pi pi-users" iconPos="left" size="" />

            </template>

            <template #center>
            </template>
        </Toolbar>

        <div class="ci-block mx-2 px-2 py-4">
            <RouterView v-slot="{ Component }">
            <component
                :is="Component"
                :project-data="{ id: 2 }"
            />
            </RouterView>
        </div>

    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProjectsStore } from '@/stores/projectsStore';
import projectSettingsDrawer from '@/components/projects/openningProject/projectSettingsDrawer.vue';

// =================================  COMPOSABLES  ============================
const router = useRouter();
const projectsStore = useProjectsStore();

// ==============================  DATA  ===============================
const isShowProjectSettingDrawer = ref(false);

onBeforeMount(() => {
    // Запрос авторизации...
    // await...
    // если запрос не прошел успешно 
    if (projectsStore.isAuthForCurrentProject === false) {
        router.replace({ name: 'project-login' });
    }
});

</script>

<style scoped></style>