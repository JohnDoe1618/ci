import { ref, onBeforeUnmount, onMounted, watch } from 'vue';
import TerminalService from "primevue/terminalservice";
import { useTerminalStore } from '@/stores/terminalStore';

export default function useTerminal(terminalNode) {

    // =================================  DATA  =================================
    const terminalStore = useTerminalStore();
    const terminalLine = ref(null);
    const terminalLineFixedValue = ref(null);
    const terminal = ref(terminalNode);
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

    // Установка позиции для терминала
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
    
    // Проверка нарушения границ документа при перемещении терминала
    function checkBeyondBorder(callback) {
        const { height, left, right } = terminal.value.getBoundingClientRect();

        // Проверка нарушения левой границы экрана
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

        // Проверка нарушения правой границы экрана
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
        // Проверка нарушения верхней границы экрана
        function checkTopBorder() {
            if (coords.value.y < 0) {
                callback({ lockX: false, lockY: true });
                return true;
            }
            return false;
        }
        // Проверка нарушения нижней границы экрана
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
    
    // Обработка события mousedown у терминала 
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
    
    // Обработка события mouseup у терминала 
    function handlerUp() {
        isHoldOn.value = false;
    }

    // Выбор предыдущей команды в командной строке
    function setPrevCommand() {
        console.log('work setPrevCommand');
        let resultCmd;
        if(terminalStore.currentFindedCommand?.prev && !terminalStore.currentFindedCommand?.next) {
            terminalLineFixedValue.value = terminalLine.value.value;
        }
        // Если история пуста
        if (!terminalStore.historyCLI.length) {
            return;
        }
        if (terminalStore.currentFindedCommand) {
            resultCmd = terminalStore.currentFindedCommand.data;
            if(terminalStore.currentFindedCommand.prev) terminalStore.currentFindedCommand = terminalStore.currentFindedCommand.prev;
        }
        return resultCmd;
    }

    // Выбор следующей команды в командной строке
    function setNextCommand() {
        let resultCmd;
        // Если история пуста
        if (!terminalStore.historyCLI.length) {
            return;
        }
        if (terminalStore.currentFindedCommand) {
            if(terminalStore.currentFindedCommand.next) {
                resultCmd = terminalStore.currentFindedCommand.next.data;
                terminalStore.currentFindedCommand = terminalStore.currentFindedCommand.next;
            } else {
                if(terminalLineFixedValue.value) resultCmd = terminalLineFixedValue.value;
                else return ' ';
            }
        } 
        return resultCmd;
    }

    onBeforeUnmount(() => {
        TerminalService.off("command", terminalStore.commandHandler);
    });

    onMounted(() => {
        const terminalCommandLine = document.querySelector(".p-terminal-prompt-value");
        terminalLine.value = terminalCommandLine;
        if (document.activeElement === terminalCommandLine) {
        terminalCommandLine.addEventListener("keydown", (e) => {
            if (e.key === "ArrowUp") {
            const data = setPrevCommand();
            if (data) terminalCommandLine.value = data;
            }
            if (e.key === "ArrowDown") {
            const data = setNextCommand();
            if (data) terminalCommandLine.value = data;
            }
        });
        }
        TerminalService.on("command", terminalStore.commandHandler);
        document.addEventListener("mousemove", recordCoord);
        const { x: existsX, y: existsY } = JSON.parse(localStorage.getItem("terminalPosition"));
        terminal.value.style.left = `${existsX}px`;
        terminal.value.style.top = `${existsY}px`;
    });

    return {
        handlerDown,
        handlerUp,
    }
}
