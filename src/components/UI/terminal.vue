<template>
    <div 
    id="terminal" 
    class="terminal-overlay"
    ref="terminal"
    >
        <p 
        class="terminal__title cursor-move"
        @mousedown="handlerDown"
        @mouseup="handlerUp"
        >
            Terminal
        </p>
        <Terminal 
        class="terminal"
        welcomeMessage="Welcome to CI!" 
        prompt="ci-root $" 
        aria-label="PrimeVue Terminal Service"
        />

    </div>
</template>

<script setup>
import useTerminal from '@/composables/terminal';
import { ref } from 'vue';

const terminal = ref(null); 

const { handlerDown, handlerUp } = useTerminal(terminal);

</script>

<style scoped>
.terminal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* margin: 1rem; */

}
.terminal {
    width: 100% !important;

}
.terminal__title {
    background-color: black;
    color: white;
    width: 100%;
    font-family: monospace;
    padding: 0 0.3rem;
    user-select: none;
}



</style>