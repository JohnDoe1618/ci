<template>
    <button 
    class="btn ci-btn cursor-pointer flex align-items-center justify-content-end text-base outline-none shadow-2"
    :class="(props.show === false)? 'none' : ''"
    >
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
    },
    show: {
        type: Boolean,
        required: false,
        default: true,
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
    font-family: var(--font);
    padding: 0.4rem 0.7rem;
    border-radius: 5px;
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