import { defineStore } from "pinia";
import TerminalService from "primevue/terminalservice";
import DoublyLinkedList from '@/utils/linkedList';
import { ref } from "vue";


export const useTerminalStore = defineStore('terminalStore', () => {
    // =======================  STATE  =======================
    const historyCLI = new DoublyLinkedList();
    const currentFindedCommand = ref(null);

    // =======================  ACTIONS  =========================

    // Очистка терминала
    function terminalClear() {
        const commands = document.querySelectorAll('.p-terminal-command');
        commands.forEach((item) => {
            item.remove();
        });
    }

    // Запись в историю комманд
    function reportToHistory(command) {
        historyCLI.addNode(command);
        currentFindedCommand.value = historyCLI.tail;
    }

    // Обработка введенных команд в командную строку
    function commandHandler(text) {
        let response;
        let argsIndex = text.indexOf(" ");
        let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;
        if (command === "--list-history") {
            response = "> " + historyCLI.length;
        } else if (command === "clear" || command === "cls") {
            return terminalClear();
        } else if (command === "--help") {
            response = "hello";
        } else {
            response = "Unknown command";
        }
        reportToHistory(command);
        TerminalService.emit("response", response);
    }

    return {
        historyCLI,
        currentFindedCommand,

        commandHandler,
    }
})