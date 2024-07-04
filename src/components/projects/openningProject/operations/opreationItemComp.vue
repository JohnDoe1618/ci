<template>
    <Panel class="overflow-hidden shadow-2" :toggleable="true" :collapsed="isCollapseSelf" @update:collapsed="handlerCollapsed">
        <!-- Header -->
        <template #header>
            <div class="ci-block flex items-center gap-2 w-full pb-1 mx-1" :style="(isCollapseSelf === false)? { borderBottom: '1px solid var(--panel-border-color)' } : {}">
                <span class="font-bold ci-text">{{ props.data.title ?? 'No Title' }}</span>
            </div>
        </template>

        <!-- Content -->
        <template #default>
            <div class="ci-block">

                <!-- Description -->
                <div >
                    <h2 class="text-xl ml-2 ci-text">Description</h2>
                    <div class="ml-4 my-2">{{ props.data.description }}</div>
                </div>

                <!-- Method -->
                <div >
                    <h2 class="text-xl ml-2 ci-text">Method</h2>
                    <div class="ml-4 my-2">{{ props.data.method }}</div>
                </div>
            </div>
        </template>

        <!-- Footer -->
        <template #footer>
            <div class="ci-block flex flex-wrap align-items-center justify-content-between gap-4">
            </div>
        </template>
    </Panel>
</template>

<script setup>
import { ref, defineEmits, defineProps, onMounted, watch } from 'vue';

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

const isCollapseSelf = ref(true);
const selfId = ref(null);

function handlerCollapsed(value) {
    isCollapseSelf.value = value;
    emit('update:collapsed', { isCollapse: value, id: selfId.value });
}

watch(() => props.reqCollapse, (newValue) => {
    if(newValue === true) {
        if(props.isCollapseIds.includes(selfId.value)) {
            isCollapseSelf.value = true;
        }
    }
});

onMounted(() => {
    // Идентифицируем текущий компонент уникальным ID для скрытия его в списке таких компонентов
    selfId.value = Date.now() + '';
});

const emit = defineEmits(['update:collapsed']);

</script>

<style scoped>
</style>