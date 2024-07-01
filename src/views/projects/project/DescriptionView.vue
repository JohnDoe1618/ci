<template>
    <div class="ci-block w-full h-full">
        DESCRIPTION PROJECT {{ props.projectData.id }}
        <!-- <ol>
            <li data-list="ordered" class="ql-align-center">
                <span class="ql-ui" contenteditable="false">
                </span>
                    asdsa
                <span style="background-color: rgb(255, 255, 102);">
                    das
                </span>
                da
                <u>
                    sdasdasd
                </u>
            </li>
        </ol> -->

        <ol>
            <li data-list="bullet" class="ql-align-center">
                <span class="ql-ui" contenteditable="false">

                </span>
                hello world
            </li>
        </ol>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    projectData: {
        type: Object,
        required: true,
    },
})

</script>

<style scoped>
    
</style>