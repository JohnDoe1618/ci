<template>
    <div>
        Project {{ $route.params.id }}
    </div>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useProjectsStore } from '@/stores/projectsStore';

const router = useRouter();
const projectsStore = useProjectsStore();

onBeforeMount(() => {
    // Запрос авторизации...
    // await...
    // если запрос не прошел успешно 
    if(projectsStore.isAuthForCurrentProject === false) {
        router.replace({ name: 'project-login' });
    }
});

</script>

<style scoped>
    
</style>    