<template>
    <div class="app ci-block card flex justify-center">
        <navDrawerComp />
        <router-view></router-view>
        
    </div>

</template>

<script setup>
import navDrawerComp from "./components/navdrawer/navDrawerComp.vue";
import { onMounted } from "vue";

onMounted(() => {
    document.documentElement.classList = 'theme-dark';    

})

</script>


<style scoped>
.app {
    display: flex;
    align-items: stretch;
    background-color: white;
    width: 100%;
    height: 100vh;
    color: var(--main-fg-light);
}
</style>