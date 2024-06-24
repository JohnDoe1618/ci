<template>
    <div id="terminal" class="terminal-overlay">
        <p 
        class="terminal__title cursor-move"
        @mousedown="isHoldsCursor = true"
        @mouseup="isHoldsCursor = false"
        >
            Terminal
        </p>
        <Terminal 
        class="terminal"
        welcomeMessage="Welcome to PrimeVue" 
        prompt="primevue $" 
        aria-label="PrimeVue Terminal Service" 
        />
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const isHoldsCursor = ref(false);
const posCursor = ref({
    x: 0,
    y: 0,
});

function computePosTerminal(e) {
    const posX_terminal = e.pageX;
    const posY_terminal = e.pageY;
    const terminal = document.getElementById('terminal');
    const data = terminal.getBoundingClientRect();
    const terminalWidth = data.width;
    const terminalHeight = data.height;
    const documentWidth =  document.documentElement.clientWidth;
    console.log();
}

function initListenerCursorMove() {
    document.addEventListener('mousemove', computePosTerminal);
}

watch(() => isHoldsCursor.value, (newValue) => {
    if(newValue === true) {
        initListenerCursorMove();
        watch(() => posCursor.value, ({ x, y }) => {
            console.log(x, y);
        }, { deep: true });
    } else {
        document.removeEventListener('mousemove', computePosTerminal);
    }
})


onMounted(() => {
    const terminal = document.getElementById('terminal');
    const data = terminal.getBoundingClientRect();
    console.log(data);
})

</script>

<style scoped>
.terminal-overlay {
    position: fixed !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 600px !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    /* margin: 1rem; */
}
.terminal {
    width: 100% !important;
    --p-terminal-border-radius: none !important;
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