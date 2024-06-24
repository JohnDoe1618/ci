<template>
    <button class="btn">
        <i v-if="props.icon" class="btn__icon" :class="props.icon"></i>
        <p v-if="hasLabel" ref="btnLabel" class="btn__label" :class="props.icon ? 'with-icon': ''">
            <slot></slot>
        </p>
    </button>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue';

const props = defineProps({
    icon: {
        type: String,
        required: false,
    }
})

const btnLabel = ref(null);
const hasLabel = ref(true);
onMounted(() => {
    if(btnLabel.value) {
        if(typeof btnLabel.value.innerHTML === 'string' && btnLabel.value.innerHTML.trim() === '') {
            hasLabel.value = false;
        }
    }
})

</script>

<style scoped>
.btn {
    background-color: #252525;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-family: var(--font);
    padding: 0.4rem 0.7rem;
    outline: rgba(0,0,0,0);
    border: 1px solid black;
    transition: all 0.2s ease;
    border-radius: 5px;
    box-shadow: 1px 1px 5px rgba(0,0,0, .2);
}
.btn:hover {
    background-color: #464646;
    transition: all 0.2s ease;
}
.btn:active {
    background-color: #797777;
    transition: all 0.1s ease;
    border: 1px solid rgb(136, 136, 136);
}
.btn__icon {
    font-size: 15px;
}
.btn__label {
}
.btn__label.with-icon {
    margin-left: 0.5rem;

}
</style>