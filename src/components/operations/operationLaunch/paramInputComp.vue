<template>
    <InputGroup class="mt-2 px-5">
        <!-- Data Type -->
        <InputGroupAddon class="p-0" style="width: 3.5rem;">
            <!-- Number Type -->
            <Numeric
            v-if="props.data.type === 'number'" 
            class="type-numeric p-0 flex align-items-center" 
            :size="26"
            />
            <!-- String Type -->
            <Alphabetical 
            v-if="props.data.type === 'string'" 
            class="type-string p-0 flex align-items-center" 
            :size="29"
            />
            <!-- Boolean Type -->
            <span v-else-if="props.data.type === 'boolean'" class="type-bool">bool</span>
        </InputGroupAddon>

        <!-- Param Name -->
        <InputGroupAddon>
            <span class="param-name">
                {{ props.data.key }}
            </span>
            
        </InputGroupAddon>

        <Select 
        v-if="props.data.type === 'boolean'"
        class="ci-text"
        v-model="selectBooleanParam"
        :options="['true', 'false']" 
        :placeholder="props.data.key" 
        checkmark
        :highlightOnSelect="false" 
        />
        <InputText v-else :placeholder="props.data.key" />



        <!-- Required -->
        <InputGroupAddon>
            <span 
            class="is-necessary" 
            :class="(props.data.required === true)? 'required' : ''"
            >
                <HexagramOutline 
                v-if="props.data.required === true" 
                class="flex align-items-center"
                :size="17"
                v-tooltip.right="'required'"
                />
                <Help 
                v-else
                class="flex align-items-center" 
                :size="17"
                v-tooltip.right="'not required'"
                />
            </span>
            
        </InputGroupAddon>

    </InputGroup>
</template>

<script setup>
import Numeric from 'vue-material-design-icons/Numeric.vue';
import Alphabetical from 'vue-material-design-icons/Alphabetical.vue';
import HexagramOutline from 'vue-material-design-icons/Hexagram.vue';
import Help from 'vue-material-design-icons/Help.vue';
import { defineProps, ref } from 'vue';

const props = defineProps({
    data: {
        type: Object,
        required: false,
        default(rawProp) {
            return {
                key: null,
                type: null,
                default: null,
                required: false,
            }
        }
    }
});

const selectBooleanParam = ref(null);

</script>

<style scoped>
.param-name {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: max-content;
    max-width: 5.4rem;
    overflow: auto;
    font-size: 1rem;
    font-weight: 600;
    font-family: monospace;
}
.param-name::-webkit-scrollbar {
    height: 4px;
}
.type-numeric {
    color: var(--type-numeric-color) !important;
}
.type-bool {
    font-weight: bolder;
    padding: 0 0.5rem;
    font-size: .9rem;
    font-family: monospace !important;
    color: var(--type-bool-color) !important;
}
.type-string {
    color: var(--type-string-color) !important;

}
.is-necessary {
    font-size: 1.1rem;
}

.is-necessary.required {
    color: var(--required-color) !important;
}
</style>