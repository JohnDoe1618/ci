<template>
    <div class="ci-view ci-block w-full">
        <Toast />
        <tableSettingDrawer 
        :show="isShowSettingDrawer"
        @close="isShowSettingDrawer = false"
        @update:sizeTable="handlerUpdateSizeTable"
        @update:showGridLines="handlerUpdateShowGridLines"
        @update:stripedRows="handlerUpdateStripedRows"
        @update:paginatorSelect="handlerUpdatePaginatorState"
        @update:dateTemplate="handlerUpdateDateTemplate"
        @add-date-template="addDateTemplate"
        :settings="tableSettings"
        ></tableSettingDrawer>

        <DataTable
        :selectionMode="'single'"
        v-model:selection="projectOpenning"
        dataKey="id"
        @row-select="(event) => handlerOpenProject(event.data.id)"
        :value="projects" 
        :size="tableSettings.sizeTable"
        :showGridlines="tableSettings.showGridLines"
        :stripedRows="tableSettings.stripedRows"
        :paginator="tableSettings.paginator"
        :rows="4"
        :rowsPerPageOptions="[2,4,5]"
        removableSort
        :loading="loadingData"
        scrollable
        scrollHeight="81vh"
        tableStyle="width: 100%"
        columnResizeMode="fit"
        >
            <template #header>
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <!-- Back page -->
                    <Button 
                    class="ci-btn mr-2"
                    icon="pi pi-angle-left" 
                    rounded 
                    raised 
                    @click="router.go(-1)"
                    title="go to back" />
                    <h1 class="ci-text text-2xl mr-auto font-normal align-self-center">Projects</h1>

                    <!-- New Project -->
                    <Button 
                    class="ci-btn ml-auto" 
                    icon="pi pi-plus" 
                    rounded 
                    @click="router.push({ name: 'new-project' })"
                    raised 
                    title="create new project" />

                    <!-- Settings -->
                    <Button 
                    class="ci-btn"
                    icon="pi pi-cog" 
                    rounded 
                    @click="isShowSettingDrawer = true"
                    raised 
                    title="settings"/>

                    <!-- Update Table -->
                    <Button 
                    class="ci-btn"
                    icon="pi pi-refresh" 
                    rounded 
                    raised 
                    title="reload list"/>
                </div>
            </template>

            <Column field="id" header="ID" sortable></Column>
            <Column field="name" header="Name"></Column>
            <Column field="host" header="Host"></Column>
            <Column field="port" header="Port"></Column>
            <Column field="handshakeHash" header="Handshake Hash"></Column>
            <Column field="createdAt" header="Created at">
                <template #body="{data}">
                    <p :title="`${dateFromNow(data.createdAt)}`">{{ formatedDateTimeTemplate(data.createdAt, tableSettings.selectDateTemplate) }}</p>
                </template>
            </Column>
            <Column field="updatedAt" header="Updated at">
                <template #body="{data}">
                    <p :title="`${dateFromNow(data.updatedAt)}`">{{ formatedDateTimeTemplate(data.updatedAt, tableSettings.selectDateTemplate) }}</p>
                </template>
            </Column>
 
            <template #footer> In total there are <strong>{{ projects?.length }}</strong> projects. </template>
        </DataTable>
    </div>
</template>

<script setup>
import tableSettingDrawer from '@/components/UI/tableSettingDrawer.vue';
import { onMounted, ref } from 'vue';
import ProjectService from '@/services/projectService';
import { formatedDateTimeTemplate, dateFromNow } from '@/utils/maskUtils';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();

const projects = ref();
const projectOpenning = ref();
const loadingData = ref(false);
const isShowSettingDrawer = ref(false);
const tableSettings = ref({
    sizeTable: 'large',
    showGridLines: false,
    stripedRows: true,
    paginator: true,
    dateTemplates: ['HH:mm / DD-MM-YYYY', 'HH:mm | DD/MM/YY'],
    selectDateTemplate: 'HH:mm / DD-MM-YYYY',
});

function handlerOpenProject(projectId) {
    router.push({ name: 'project', params: { id: projectId } });
}

// Добавление пользовательского шаблона времени
function addDateTemplate(template) {
    tableSettings.value.dateTemplates.push(template);
    localStorage.setItem('table_projects_settings', JSON.stringify(tableSettings.value));
    toast.add({ severity: 'success', summary: 'Success!', detail: 'A new date template has been added', life: 3000 });
}

// Изменение размера таблицы
function handlerUpdateSizeTable(value) {
    if(tableSettings.value.sizeTable === value) return;
    tableSettings.value.sizeTable = value;
    localStorage.setItem('table_projects_settings', JSON.stringify(tableSettings.value));
}

// Изменение видимости сетки
function handlerUpdateShowGridLines(value) {
    tableSettings.value.showGridLines = value;
    localStorage.setItem('table_projects_settings', JSON.stringify(tableSettings.value));
}

// активация/деактивация полосатых рядов
function handlerUpdateStripedRows(value) {
    tableSettings.value.stripedRows = value;
    localStorage.setItem('table_projects_settings', JSON.stringify(tableSettings.value));
}

//  Изменение видимости пагинатора
function handlerUpdatePaginatorState(value) {
    tableSettings.value.paginator = value;
    localStorage.setItem('table_projects_settings', JSON.stringify(tableSettings.value));
}

// Изменение шаблона времени
function handlerUpdateDateTemplate(value) {
    tableSettings.value.selectDateTemplate = value;
    localStorage.setItem('table_projects_settings', JSON.stringify(tableSettings.value));
}

// Получение UI-настроек таблицы с localStorage
function getTableSettings() {
    const tableProjectsSettings = JSON.parse(localStorage.getItem('table_projects_settings'));
    // Установка UI-настроек таблицы по умолчанию в localStorage (Если ранее UI-настроек не было)
    if(!tableProjectsSettings) return localStorage.setItem('table_projects_settings', JSON.stringify(tableSettings.value));
    tableSettings.value = {
        ...tableProjectsSettings,
    }
}

onMounted(async () => {
    getTableSettings();
    try {
        loadingData.value = true;
        // projects.value = await (await fetch('https://jsonplaceholder.typicode.com/posts?_limit=20')).json();
        projects.value = await ProjectService.getProjects();
    } catch (err) {
        console.log(err)
    } finally {
        loadingData.value = false;
    }
});


</script>

<style scoped>
</style>