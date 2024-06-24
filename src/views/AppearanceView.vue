<template>
    <div class="ci-block w-full">
        <Button @click="setTheme('theme-dark')" class="ci-block m-3">Dark Theme</Button>
        <Button @click="setTheme('theme-dark-contrast')">Colorful Theme</Button>
        <Button>Example Btn</Button>
        <ToggleSwitch v-model="lightMode" @update:modelValue="toggleLightTheme" />
        <ToggleSwitch v-model="lightMode" />
        <btn-comp>Hello</btn-comp>
        <h1>Hello Dorothy</h1>

        <div class="ci-block top-0 flex align-items-center w-max h-max ml-6 p-3" style="border: 1px solid black;">
            <div class="card flex-column justify-center">
                <div class="flex-column flex-col gap-4">
                    <div v-for="category of categories" :key="category.key" class="flex items-center my-2">
                        <Checkbox class="mr-2" v-model="selectedCategories" :inputId="category.key" name="category"
                            :value="category.name" :disabled="category.key === 'P'" />
                        <label :for="category.key">{{ category.name }}</label>
                    </div>
                </div>
            </div>
        </div>
        <terminal-comp></terminal-comp>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import TerminalService from "primevue/terminalservice";
const lightMode = ref(false);
function setTheme(theme) {
    document.documentElement.classList = theme;
}
const categories = ref([
    { name: "Accounting", key: "A" },
    { name: "Marketing", key: "M" },
    { name: "Production", key: "P" },
    { name: "Research", key: "R" }
]);
const selectedCategories = ref(['Marketing']);

function toggleLightTheme(isChecked) {
    if (isChecked === true) {
        setTheme('theme-dark');
    } else {
        setTheme('theme-light');
    }
}

onMounted(() => {
    TerminalService.on('command', commandHandler);
})

onBeforeUnmount(() => {
    TerminalService.off('command', commandHandler);
})

function commandHandler(text) {
    let response;
    let argsIndex = text.indexOf(' ');
    let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;
    if (command === "date") {
        response = 'Today is ' + new Date().toDateString();
    } else if (command === "greet") {
        response = 'Hola ' + text.substring(argsIndex + 1);
    } else if (command === "random") {
        response = Math.floor(Math.random() * 100);
    } else {
        response = "Unknown command: " + command;
    }
    TerminalService.emit('response', response);
}
</script>

<style scoped>
</style>