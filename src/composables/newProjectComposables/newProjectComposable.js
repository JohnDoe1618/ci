import { reactive, watch, onMounted, ref, nextTick } from 'vue';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import useHandlerFormLocalStorage from './creationFormLocalStorage';
import useValidationFieldsForm from './validationFieldsForm';

export default function useNewProject() {
    const confirm = useConfirm();
    const toast = useToast();

    // Composable Of localStorage
    const { filledCreationFormOfStorage, recordCreationFormToStorage, removeFormFromStorage } = useHandlerFormLocalStorage();
    // Composable Validation Fields Form
    const { validateProjectName } = useValidationFieldsForm()
    
    // Состояние активности кнопки сброса формы
    const isResetDisabled = ref(true);

    // Реактивное состояние формы создания нового проекта
    const creationForm = reactive({
        hostProtocol: 'http://',
        projectName: '',
        projectDescription: '',
        projectHost: '',
        projectPort: null,
        handshakeToken: '',
    });

    // Наблюдение за изменением полей формы создания
    watch(() => creationForm, (newValue) => {
        for (const [key, value] of Object.entries(newValue)) {
            if(key === 'hostProtocol') {
                if(value !== 'http://') {
                    isResetDisabled.value = false;
                    // Запись актуальных данных в localStorage (creation_form)
                    recordCreationFormToStorage(newValue);
                    break;
                }
            } 
            else if(key === 'projectPort') {
                if(value !== null) {
                    isResetDisabled.value = false;
                    // Запись актуальных данных в localStorage (creation_form)
                    recordCreationFormToStorage(newValue);
                    break;
                }
            }
            else if(value !== '') {
                isResetDisabled.value = false;
                // Запись актуальных данных в localStorage (creation_form)
                recordCreationFormToStorage(newValue);
            }
        }
    }, { deep: true });
    
    // Вызов окна пордтверждения для очистки формы
    function handlerReset(event) {
        confirm.require({
            target: event.currentTarget,
            message: 'Are you sure you want reset form?',
            icon: 'pi pi-exclamation-triangle',
            rejectProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptProps: {
                label: 'Yes'
            },
            accept: () => {
                resetForm();  // Очистка реактивной формы создания
                
                isResetDisabled.value = true;
                toast.add({ severity: 'success', summary: 'Confirmed', detail: 'The creation form has been cleared', life: 3000 });
            },
            reject: () => {}
        });
    }
    
    // Очистить поля формы
    async function resetForm() {
        if(creationForm.hostProtocol !== 'http://') creationForm.hostProtocol = 'http://';
        creationForm.projectName = '';
        creationForm.projectDescription = '';
        creationForm.projectHost = '';
        creationForm.projectPort = null;
        creationForm.handshakeToken = '';
        await nextTick();
        isResetDisabled.value = true; 
        removeFormFromStorage(); // Удаление creation_form из localStorage
    }
    
    // Подтвердить форму
    function confirmCreationForm() {
        try {
            // Проверка поля projectName
            validateProjectName(creationForm.projectName);
        } catch (err) {
            console.error(err);
        }
    }

    onMounted(() => {
        // Заполнение формы создания объектом из localStorage, если он существует
        filledCreationFormOfStorage(creationForm);
    });


    return {
        confirm,
        toast,
        isResetDisabled,
        creationForm,
        filledCreationFormOfStorage,
        recordCreationFormToStorage,
        removeFormFromStorage,
        handlerReset,
        resetForm,
        confirmCreationForm,
    }
}