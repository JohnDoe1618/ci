<template>
    <div class="ci-view ci-block w-full">
        <DataTable
        :value="projects" 
        :size="'large'"
        showGridlines
        stripedRows
        paginator
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        removableSort
        :loading="loadingData"
        scrollable
        scrollHeight="81vh"
        tableStyle="width: 100%"
        columnResizeMode="fit"
        >
            <template #header>
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <span class="text-xl font-bold">Projects</span>
                    <Button icon="pi pi-refresh" class="ml-auto" rounded raised />
                </div>
            </template>
            <!-- <Column field="id" header="ID"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="host" header="Host"></Column>
            <Column field="port" header="Port"></Column>
            <Column field="handshakeHash" header="Handshake Hash"></Column>
            <Column field="createdAt" header="Created at"></Column>
            <Column field="updatedAt" header="Updated at"></Column> -->
            <Column class="w-3" field="id" header="ID" :sortable="true"></Column>
            <Column class="w-3" field="userId" header="userId"></Column>
            <Column class="w-3" field="title" header="title" sortable></Column>
            <Column class="w-3" field="body" header="body"></Column>
            <template #footer> In total there are 0 products. </template>
        </DataTable>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import ProjectService from '@/services/projectService';

const projects = ref();
const loadingData = ref(false);

onMounted(async () => {
    // projects.value = await ProjectService.getProjects();
    // console.log( projects.value);
    try {
        loadingData.value = true;
        projects.value = await (await fetch('https://jsonplaceholder.typicode.com/posts?_limit=20')).json();
    } catch (err) {
        console.log(err)
    } finally {
        loadingData.value = false;
    }
})


</script>

<style scoped>
</style>