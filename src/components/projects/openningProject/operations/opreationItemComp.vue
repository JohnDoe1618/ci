<template>
    <Panel class="overflow-hidden shadow-2" :toggleable="true" :collapsed="isCollapseSelf" @update:collapsed="handlerCollapsed">
        <!-- Header -->
        <template #header>
            <div class="ci-block flex alighn-items-center gap-2 w-full pb-1 mx-1" :style="(isCollapseSelf === false)? { borderBottom: '1px solid var(--panel-border-color)' } : {}">
                <span class="font-bold ci-text text-xl">{{ props.data.title ?? 'No Title' }}</span>
            </div>
        </template>

        <!-- Content -->
        <template #default>
            <div class="ci-block">

                <!-- Description -->
                <div>
                    <h2 class="operation-chunck-label text-xl ml-2 ci-text">Description:</h2>
                    <div class="ml-4 my-2">{{ props.data.description }}</div>
                </div>

                <!-- Method -->
                <div class="operation-chunck-label mt-3">
                    <h2 class=" text-xl ml-2 ci-text">Method:</h2>
                    <div class="ml-4 my-2">{{ props.data.method }}</div>
                </div>

                <!-- Endpoint -->
                <div class="operation-chunck-label mt-3">
                    <h2 class=" text-xl ml-2 ci-text">Endpoint:</h2>
                    <div class="ml-4 my-2">{{ props.data.endpoint }}</div>
                </div>

                <!-- For Role -->
                <div class="operation-chunck-label mt-3">
                    <h2 class=" text-xl ml-2 ci-text">For Role:</h2>
                    <div class="ml-4 my-2">{{ props.data.forRole }}</div>
                </div>

                <!-- Query params -->
                <div class="operation-chunck-label mt-3">
                    <h2 class=" text-xl ml-2 ci-text">Query Params:</h2>
                    <DataTable 
                    class="mx-4 mt-2"
                    :value="computeQueryParams" 
                    :show-gridlines="true"
                    tableStyle="min-width: 30rem"
                    >
                        <Column field="key" header="Key" style="width: 25%"></Column>
                        <Column field="type" header="Type" style="width: 25%"></Column>
                        <Column field="default" header="By default" style="width: 25%"></Column>
                        <Column field="required" header="Required" style="width: 25%"></Column>
                    </DataTable>
                </div>

                <!-- Path params -->
                <div class="operation-chunck-label mt-3">
                    <h2 class=" text-xl ml-2 ci-text">Path Params:</h2>
                    <DataTable 
                    class="mx-4 mt-2"
                    :value="computePathParams" 
                    :show-gridlines="true"
                    tableStyle="min-width: 30rem"
                    >
                        <Column field="key" header="Key" style="width: 25%"></Column>
                        <Column field="type" header="Type" style="width: 25%"></Column>
                        <Column field="default" header="By default" style="width: 25%"></Column>
                        <Column field="required" header="Required" style="width: 25%"></Column>
                    </DataTable>
                </div>

                <!-- Created At -->
                <div class="operation-chunck-label mt-3 mr-4 flex align-items-center justify-content-end">
                    <h2 class=" text-lg font-italic font-normal ml-2 ci-text">Created At:</h2>
                    <div class="ml-4 my-2 text-md font-italic font-light">{{ computeTemplateCreatedAt }}</div>
                </div>

                <!-- Updated At -->
                <div class="operation-chunck-label mt-0 mr-4 flex align-items-center justify-content-end">
                    <h2 class=" text-lg font-italic font-normal ml-2 ci-text">Last update:</h2>
                    <div class="ml-4 my-2 text-md font-italic font-light">{{ computeTemplateUpdatedAt }}</div>
                </div>

            </div>
        </template>

        <!-- Footer -->
        <template #footer>
            <div class="ci-block relative flex flex-wrap align-items-center justify-content-end mx-4 mt-2 mb-1 gap-3">
                <SpeedDial :model="items" direction="left" style="position: absolute; bottom: -2px; right: 10%">
                    <template #button="{ toggleCallback }">
                        <Button @click="toggleCallback" rounded icon="pi pi-ellipsis-h"/>
                    </template>
                </SpeedDial>
                <!-- Operation Launch -->
                <Button 
                label="Launch" 
                icon="pi pi-play" 
                iconPos="right" 
                @click="router.push({ 
                    name: 'launch-operation', 
                    params: { 
                        operationName: PatternService.replaceStringByKebab(props.data.title), 
                        operationId: props.data.id 
                    } 
                })"
                />
            </div>
        </template>
    </Panel>
</template>

<script setup>
import { ref, defineEmits, defineProps, onMounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import PatternService from '@/services/patternService';

const router = useRouter();

const props = defineProps({
    isCollapseIds: {
        type: Array,
        default: () => [],
        required: false,
    }, 

    reqCollapse: {
        type: Boolean,
        default: false,
        required: false,
    },
    data: {
        type: Object,
        default(rawProp) {
            return {
                id: null,
                projectId: null,
                method: null,
                endpoint: null,
                pathParams: null,
                queryParams: null,
                title: null,
                description: null,
                forRole: null,
                createdAt: null,
                updatedAt: null,
            }
        },
        required: true,
    }
});


// =======================  DATA  ===========================
const isCollapseSelf = ref(true);
const selfId = ref(null);
// Кнопки 
const items = ref([
    {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
            console.log('test');
        }
    },
    {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => {
            console.log('test');
        }
    },
    {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
            console.log('test');
        }
    },
]);

// =======================  METHODS  ===========================

function handlerCollapsed(value) {
    isCollapseSelf.value = value;
    emit('update:collapsed', { isCollapse: value, id: selfId.value });
}

// =======================  COMPUTED  ===========================

// вычисление массива параметров путей на основе объекта парметров путей 
const computePathParams = computed(() => {
    const entries = Object.entries(props.data.pathParams);
    let readyData = [];
    entries.forEach(([key, value]) => {
        readyData.push({ 
            key: key ?? '-', 
            type: value.type ?? '-',
            default: value.default ?? '-',
            required: value.required ?? '-', 
        });
    });
    return readyData;
});

// вычисление массива параметров запроса на основе объекта парметров запроса 
const computeQueryParams = computed(() => {
    const entries = Object.entries(props.data.queryParams);
    let readyData = [];
    entries.forEach(([key, value]) => {
        readyData.push({ 
            key: key ?? '-', 
            type: value.type ?? '-',
            default: value.default ?? '-',
            required: value.required ?? '-', 
        });
    });
    return readyData;
});

// вычисление даты и времени для отображения их в Created At
const computeTemplateCreatedAt = computed(() => {
    return PatternService.formattedDateTime(props.data.createdAt, 'HH:mm  DD/MM/YYYY', '+03:00');
});

// вычисление даты и времени для отображения их в Last update
const computeTemplateUpdatedAt = computed(() => {
    return PatternService.formattedDateTime(props.data.updatedAt, 'HH:mm  DD/MM/YYYY', '+03:00');
});


// =======================  WATCH  ===========================
watch(() => props.reqCollapse, (newValue) => {
    if(newValue === true) {
        if(props.isCollapseIds.includes(selfId.value)) {
            isCollapseSelf.value = true;
        }
    }
});


// =======================  LIFECYCLE HOOKS  ===========================
onMounted(() => {
    // Идентифицируем текущий компонент уникальным ID для скрытия его в списке таких компонентов
    selfId.value = Date.now() + '';
});

const emit = defineEmits(['update:collapsed']);

</script>

<style scoped>
.operation-chunck-label {
    letter-spacing: .05rem;
}
</style>