<template>
    <div class="ci-block relative w-full h-full flex">
        <div 
        v-if="isShowNotAOperations"
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

        <!-- Отрисовка операций -->
        <div class="ml-4 py-4 px-3 overflow-auto" style="width: 95%;">
            <opreationItemComp 
            v-for="operation in operations" 
            class="operation-item" 
            @update:collapsed="handlerUpdateCollapsed"
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
import opreationItemComp from '@/components/projects/openningProject/operations/opreationItemComp.vue';
import OperationService from '@/services/operationService';

const isShowNotAOperations = ref(false);

const props = defineProps({
    projectData: {
        type: Object,
        required: true,
    },
});

// ==========================  DATA  ====================================
const isShowCollapseBtn = ref(false);
const reqCollapse = ref(false);                   // запрос на свертывание элементов
let isCollapsedIds = reactive([]);                // ID развернутых элементов
let operations = ref([]);           

// ==========================  METHODS  ====================================
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

async function getOperations() {
    const data = await OperationService.getOperations(props.projectData.id);
    operations.value = data;
}

// ==========================  WATCH  ====================================
watch(() => props.projectData, (_) => {
    getOperations();
})

// ==========================  LIFECYCLE HOOKS  ====================================
onMounted(() => {
    getOperations();
})

</script>

<style scoped>
.operation-item + .operation-item {
    margin-top: 0.5rem;
}
</style>