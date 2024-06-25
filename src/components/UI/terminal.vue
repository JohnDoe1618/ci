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
import { ref, onBeforeUnmount, onMounted, watch } from 'vue';
import TerminalService from "primevue/terminalservice";
import DoublyLinkedList from '@/utils/linkedList';

const terminal = ref(null);
const isHoldOn = ref(false);
const posLeftStop = ref(null);
const posRightStop = ref(null);
const coords = ref({
    x: 0,
    y: 0,
});
const offsetPosition = {
    x: 0,
    y: 0,
}
const terminalLine = ref(null);
const terminalLineFixedValue = ref(null);
const historyCLI = new DoublyLinkedList();
const currentFindedCommand = ref(null);

function recordCoord(event) {
    if (isHoldOn.value === true) {
        if (recordCoord.offsetPosition) {
            offsetPosition.x = recordCoord.offsetPosition.x;
            offsetPosition.y = recordCoord.offsetPosition.y;
            coords.value.x = event.pageX;
            coords.value.y = event.pageY;
            let resultLeft = coords.value.x - offsetPosition.x;
            let resultTop = coords.value.y - offsetPosition.y;
            checkBeyondBorder(({ lockX, lockY }) => {
                if(lockX === true && lockY === true) return;
                if (lockX === false) terminal.value.style.left = `${resultLeft}px`;
                if (lockY === false) terminal.value.style.top = `${resultTop}px`;
                localStorage.setItem('terminalPosition', JSON.stringify({ x: resultLeft, y: resultTop }));
            });
        }
    }
}

function checkBeyondBorder(callback) {
    const { height, left, right } = terminal.value.getBoundingClientRect();
    function checkLeftBorder() {
        if (left < 0) {
            if (posLeftStop.value === null) {
                posLeftStop.value = coords.value.x;
                callback({ lockX: true, lockY: false });
                return true;
            }
            if (coords.value.x > posLeftStop.value) {
                callback({ lockX: false, lockY: false });
                posLeftStop.value = null;
                return false;
            }
            callback({ lockX: true, lockY: false });
            return true;
        }
    }
    function checkRightBorder() {
        if (right > document.documentElement.clientWidth) {
            if (posRightStop.value === null) {
                posRightStop.value = coords.value.x;
                callback({ lockX: true, lockY: false });
                return true;
            }
            if (coords.value.x < posRightStop.value) {
                callback({ lockX: false, lockY: false });
                posLeftStop.value = null;
                return false;
            }
            callback({ lockX: true, lockY: false });
            return true;
        }
    }
    function checkTopBorder() {
        if (coords.value.y < 0) {
            callback({ lockX: false, lockY: true });
            return true;
        }
        return false;
    }
    function checkBottomBorder() {
        if ((coords.value.y + height) > (document.documentElement.clientHeight + 30)) {
            callback({ lockX: false, lockY: true });
            return true;
        }
        return false;
    }
    // TOP
    if (checkTopBorder() === true) return;
    // BOTTOM
    if (checkBottomBorder() === true) return;
    // LEFT
    if (checkLeftBorder() === true) return;
    // RIGHT
    if (checkRightBorder() === true) return;
    return callback({ lockX: false, lockY: false });

}

function handlerDown(e) {
    isHoldOn.value = true;
    const { left, top } = terminal.value.getBoundingClientRect();
    const { pageX, pageY } = e;
    const offsetMousePosX = Math.abs(pageX - left);
    const offsetMousePosY = Math.abs(pageY - top);
    recordCoord.offsetPosition = {
        x: offsetMousePosX,
        y: offsetMousePosY,
    }
}

function handlerUp() {
    isHoldOn.value = false;
}

function reportToHistory(command) {
    historyCLI.addNode(command);
    currentFindedCommand.value = historyCLI.tail;
}

function commandHandler(text) {
    let response;
    let argsIndex = text.indexOf(' ');
    let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;
    if(command === '--list-history') {
        response = '> '+ historyCLI.length
    }
    else if(command === 'clear' || command === 'cls') {
        return terminalClear();
    }
    else if(command === '--help') {
        response = 'hello';
    } 
    else {
        response = 'Unknown command';
    }
    reportToHistory(command);
    TerminalService.emit('response', response);
}

function terminalClear() {
    const commands = document.querySelectorAll('.p-terminal-command');
    commands.forEach((item) => {
        item.remove();
    });
}

function setPrevCommand() {
    let resultCmd;
    if(currentFindedCommand.value?.prev && !currentFindedCommand.value?.next) {
        terminalLineFixedValue.value = terminalLine.value.value;
    }
    // Если история пуста
    if (!historyCLI.length) {
        return;
    }
    if (currentFindedCommand.value) {
        resultCmd = currentFindedCommand.value.data;
        if(currentFindedCommand.value.prev) currentFindedCommand.value = currentFindedCommand.value.prev;
    }
    return resultCmd;
}
function setNextCommand() {
    let resultCmd;
    // Если история пуста
    if (!historyCLI.length) {
        return;
    }
    if (currentFindedCommand.value) {
        if(currentFindedCommand.value.next) {
            resultCmd = currentFindedCommand.value.next.data;
            currentFindedCommand.value = currentFindedCommand.value.next;
        } else {
            if(terminalLineFixedValue.value) resultCmd = terminalLineFixedValue.value;
            else return ' ';
        }
    } 
    return resultCmd;
}

onBeforeUnmount(() => {
    TerminalService.off('command', commandHandler);
});

onMounted(() => {
    const terminalCommandLine = document.querySelector('.p-terminal-prompt-value');
    terminalLine.value = terminalCommandLine;
    if(document.activeElement === terminalCommandLine) {
        terminalCommandLine.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') {
                const data = setPrevCommand();
                if(data) terminalCommandLine.value = data;
            }
            if (e.key === 'ArrowDown') {
                const data = setNextCommand();
                if(data) terminalCommandLine.value = data;
            }
        });
    }
    TerminalService.on('command', commandHandler);
    document.addEventListener('mousemove', recordCoord);
    const { x: existsX, y: existsY } = JSON.parse(localStorage.getItem('terminalPosition'));
    terminal.value.style.left = `${existsX}px`;
    terminal.value.style.top = `${existsY}px`;
});

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