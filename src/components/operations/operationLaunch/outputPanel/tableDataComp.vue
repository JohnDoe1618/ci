<template>
       <DataTable
        :selectionMode="'single'"
        dataKey="id"
        @row-select="console.log"
        :value="operationResultGet" 
        :size="'large'"
        :showGridlines="true"
        :stripedRows="false"
        :paginator="true"
        :rows="4"
        :rowsPerPageOptions="[2,4,5]"
        removableSort
        :loading="false"
        scrollable
        scrollHeight="81vh"
        tableStyle="width: 100%"
        columnResizeMode="fit"
        >
            <Column 
            v-for="col of resultColumns" 
            :key="col.field" 
            :field="col.field" 
            :header="col.header"
            :style="(col.field === '_split')? { width: '2%' }: { width: '15%' }"
            ></Column>
            <template #footer> In total there are <strong>{{ 12 }}</strong> projects. </template>
        </DataTable>
</template>

<script setup>
import { operationResultGet } from '@/services/testdata';
import { onMounted, ref } from 'vue';

// Функция собирает массив колонок таблицы по 
function bundleColumns(entryArray) {
    const resultCols = [];
    try {
        if(Array.isArray(entryArray)) {
            const template = entryArray[0];
            if(typeof template === 'object' && template !== null) {
                Object.entries(template).forEach(([key, value]) => {
                    const newCol = { field: null, header: null };
                    // Примитивы
                    if(typeof value !== 'object' || value === null) {
                        newCol.field = key;
                        newCol.header = key;
                        resultCols.push(newCol);
                    } 
                    // Структрные типы данных
                    else if(typeof value === 'object' && value !== null) {
                        newCol.field = key;
                        newCol.header = key;
                    }
                });
            }
        }
    } catch (err) {
        console.error('bundleColumns', err);
    }
}

const resultColumns = ref([
    { field: 'id', header: 'ID' },
    { field: 'data.label', header: 'Label' },
    { field: '_split', header: 'Data >' },
    { field: 'data.isActive', header: 'isActive' },
]);

onMounted(() => {
    const firstItem = operationResultGet[0];
    console.log(Object.keys(firstItem));
})

</script> 

<style scoped>
    
</style>