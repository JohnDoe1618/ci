<template >
    <div class="ci-block relative w-full h-full flex">
        <!-- <Splitter style="height: 300px" class="mb-8">
            <SplitterPanel class="flex items-center justify-center">

                <div class="filled-form w-6 m-auto flex flex-column overflow-auto" style="border: 1px solid black;">

                </div>
            </SplitterPanel>
            <SplitterPanel class="flex items-center justify-center"> Panel 2 </SplitterPanel>
        </Splitter> -->
        <Splitter style="height: 300px; width: 100%;">
            <SplitterPanel class="flex items-center justify-center" :size="50" :minSize="10"> Panel 1 </SplitterPanel>
            <SplitterPanel class="flex items-center justify-center" :size="50"> Panel 2 </SplitterPanel>
        </Splitter>

    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    projectData: {
        type: Object,
        required: true,
    },
});


</script>

<style scoped>
.filled-form {
    min-height: 10%;
    height: max-content;
    max-height: 30%;
}
</style>