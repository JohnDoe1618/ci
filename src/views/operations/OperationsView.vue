<template>
    <div class="ci-block relative w-full h-full flex">
        <Toast />
        <div 
        v-if="isShowNotOperations"
        class="absolute top-0 right-0 bottom-0 left-0 flex align-items-center justify-content-center flex-column z-5"
        >
            <h1 class="text-3xl mb-2">
                No operations yet
            </h1>
            <!-- new operation -->
            <Button
            label="Add"
            icon="pi pi-plus" 
            />
        </div>
        <!-- Диалоговое окно с формой создания операции -->
        <dialog-comp 
        :show="isShowCreationForm" 
        :title="'Add operation'"
        @close="handlerCloseForm"
        >
            <!-- Форма для создания и редактирования операций -->
            <creationFormComp 
            :project-id="props.projectData?.id"
            :edit-operation-data="editOperationData"
            @append-operation="(operation) => handlerAppendOperation(operation)"
            @close="handlerCloseForm"
            />
        </dialog-comp>

        <!-- Отрисовка операций -->
        <div class="ml-4 pb-4 px-3 overflow-auto" style="width: 95%;">
            <div class="w-full flex align-items-center justify-content-end">
                <!-- Добавить операцию -->
                <Button
                class="my-2 shadow-2"
                icon="pi pi-plus" 
                size="small"
                label="Add"
                @click="handlerOpenCreationForm"
                />
            </div>
            <opreationItemComp 
            v-for="operation in operations" 
            class="operation-item" 
            @update:collapsed="handlerUpdateCollapsed"
            @open-edit-form="(operation) => handlerOpenEditForm(operation)"
            
            :is-collapse-ids="isCollapsedIds"
            :req-collapse="reqCollapse"
            :data="operation"
            />
        </div>

        <div class="flex flex-column py-4 mr-auto ml-2">
            <Button
            v-show="isShowCollapseBtn"
            icon="pi pi-minus" 
            @click="collapseItems"
            size="small"
            />
        </div>
    </div>
    
</template>

<script setup>
import { ref, defineProps, reactive, nextTick, onMounted, watch } from 'vue';
import opreationItemComp from '@/components/operations/operationList/opreationItemComp.vue';
import creationFormComp from '@/components/operations/operationList/creationFormComp.vue';
import OperationService from '@/services/operationService';
import { useToast } from 'primevue/usetoast';

// ###############################  COMPOSABLES  ###############################
const toast = useToast();


// ###############################  PROPS  ###############################
const props = defineProps({
    projectData: {
        type: Object,
        required: true,
    },
});

// ###############################  DATA  ###############################
const isShowNotOperations = ref(false);
const isShowCollapseBtn = ref(false);             // отображение кнопки, которая сворачивает все развернутые операции 
const isShowCreationForm = ref(false);            // отображение формы создания операции
const editOperationData = ref(null);              // данные операции для редактирования
const reqCollapse = ref(false);                   // запрос на свертывание элементов
let isCollapsedIds = reactive([]);                // ID развернутых элементов
let operations = ref([]);           

// ###############################  METHODS  ###############################
// Обработчик открытия формы создания операции для проекта
function handlerOpenCreationForm() {
    isShowCreationForm.value = true;
}
// Свернуть все элементы
async function collapseItems() {
    isShowCollapseBtn.value = false;
    reqCollapse.value = true;
    await nextTick()
    isCollapsedIds.length = 0;  // очистка массива айдишников развернутых элементов  
}

// Удаление ID элемента если он сворачивается
function removeCollapsedId(id) {
    isCollapsedIds = reactive([...isCollapsedIds.filter(entry => entry !== id)]);
    if(!isCollapsedIds.length) isShowCollapseBtn.value = false;
}

// Обработчик обновление состояния collapsed для  каждого элемента
function handlerUpdateCollapsed({ isCollapse, id }) {
    if(isCollapse === false) {
        isShowCollapseBtn.value = true;
        reqCollapse.value = false;
        isCollapsedIds.push(id);
    } else {
        removeCollapsedId(id)
    }
}

// Обработчик открытия формы редактирования операции
function handlerOpenEditForm(operation) {
    isShowCreationForm.value = true;
    editOperationData.value = operation;
}

// Обработчик добавления новой операции в массив операций
function handlerAppendOperation(operation) {
    operations.value.push(operation);
    toast.add({ severity: 'success', summary: 'Success', detail: 'A new operation has been created', life: 3000 });
};

// Получение операций с сервера
async function getOperations() {
    const data = await OperationService.getOperations(props.projectData.id);
    operations.value = data;
}

// Обработчик закрытия формы создания/редактирования операции
function handlerCloseForm() {
    editOperationData.value = null;
    isShowCreationForm.value = false;
}

// ###############################  WATCH  ###############################
watch(() => props.projectData, (_) => {
    getOperations();
})

// ###############################  LIFECYCLE HOOKS  ###############################
onMounted(() => {
    getOperations();
})

</script>

<style scoped>
.operation-item + .operation-item {
    margin-top: 0.5rem;
}
</style>