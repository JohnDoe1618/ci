import btnComp from '@/components/UI/btnComp.vue';
import terminal from './terminal.vue';
import textEditorComp from './textEditorComp.vue';
import dialogComp from './dialogComp.vue';
import spinnerComp from './spinnerComp.vue';


btnComp.name = 'btnComp';
terminal.name = 'terminalComp';
textEditorComp.name = 'textEditorComp';
dialogComp.name = 'dialogComp';
spinnerComp.name = 'ciSpinner';

export default [
    btnComp,
    terminal,
    textEditorComp,
    dialogComp,
    spinnerComp,
]