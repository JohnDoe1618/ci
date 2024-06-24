<template>
    <div class="main-view">
        MAIN
        <btn-comp :icon="'pi pi-check'">Toggle</btn-comp>
    </div>
</template>

<script setup>
function toggleTheme() {
    document.body.classList.toggle("app-dark");
}

</script>

<style scoped>
.main-view {
    color: black;
}
</style>