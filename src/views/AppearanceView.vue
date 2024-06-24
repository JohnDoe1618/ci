<template>
    <div class="ci-block w-full">
        <Button @click="setTheme('theme-dark')" class="ci-block m-3">Dark Theme</Button>
        <Button @click="setTheme('theme-dark-contrast')">Colorful Theme</Button>
        <ToggleSwitch v-model="lightMode" @update:modelValue="toggleLightTheme"/>
        <btn-comp>Hello</btn-comp>
        <h1>Hello Dorothy</h1>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const lightMode = ref(false);
function setTheme(theme) {
    document.documentElement.classList = theme;
}

function toggleLightTheme(isChecked) {
    if(isChecked === true) {
        setTheme('theme-dark');
    } else {
        setTheme('theme-light');
    }
}
</script>

<style scoped>

</style>