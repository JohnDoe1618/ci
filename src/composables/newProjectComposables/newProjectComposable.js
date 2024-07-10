import { reactive, watch, onMounted, ref, nextTick } from 'vue';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import useHandlerFormLocalStorage from './creationFormLocalStorage';
import useValidationFieldsForm from './validationFieldsForm';

// TEST
import { testdata } from '@/services/testdata';

export default function useNewProject() {
    const confirm = useConfirm();
    const toast = useToast();

    // Composable Of localStorage
    const { filledCreationFormOfStorage, recordCreationFormToStorage, removeFormFromStorage } = useHandlerFormLocalStorage();
    // Composable Validation Fields Form
    const { 
        errorsProjectName, 
        errorsProjectHost, 
        errorsProjectPort,
        errorsHandshakeToken,
        errorsPassword,

        validateProjectName, 
        validateProjectHost, 
        validateProjectPort,
        validateHandshakeToken,
        validatePassword,
    } = useValidationFieldsForm()
    
    // Состояние активности кнопки сброса формы
    const isResetDisabled = ref(true);
    // Состояние активности кнопки подтверждения формы
    const isConfirmDisabled = ref(true);

    const projectDescriptionExists = ref(null);
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
                    isConfirmDisabled.value = false;
                    // Запись актуальных данных в localStorage (creation_form)
                    recordCreationFormToStorage(newValue);
                    break;
                }
            } 
            else if(key === 'projectPort') {
                if(value !== null) {
                    isResetDisabled.value = false;
                    isConfirmDisabled.value = false;
                    // Запись актуальных данных в localStorage (creation_form)
                    recordCreationFormToStorage(newValue);
                    break;
                }
            }
            else if(value !== '' || value !== '<p><br></p>') {
                isResetDisabled.value = false;
                isConfirmDisabled.value = false;
                // Запись актуальных данных в localStorage (creation_form)
                // recordCreationFormToStorage(newValue);
            }
            recordCreationFormToStorage(newValue);
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
                toast.add({ severity: 'success', summary: 'Confirmed', detail: 'The creation form has been cleared', life: 3000 });
            },
            reject: () => {}
        });
    }
    
    // Сбросить общее состояние ошибок формы
    function resetAllErrorsForm() {
        errorsProjectName.resetErrors();
        errorsProjectHost.resetErrors();
        errorsProjectPort.resetErrors();
        errorsHandshakeToken.resetErrors();
    }

    // Очистить поля формы
    async function resetForm() {
        if(creationForm.hostProtocol !== 'http://') creationForm.hostProtocol = 'http://';
        creationForm.projectName = '';
        creationForm.projectDescription = '<p><br></p>';
        creationForm.projectHost = '';
        creationForm.projectPort = null;
        creationForm.handshakeToken = '';
        await nextTick();
        isResetDisabled.value = true;
        isConfirmDisabled.value = true;
        resetAllErrorsForm();
        removeFormFromStorage(); // Удаление creation_form из localStorage
    }
    
    // Подтвердить форму
    function confirmCreationForm() {
        try {
            let isNotValideForm = false;
            /* Здесь используются повторные валидаторы полей вместо функций hasError (из composables/useErrorCreationForm)
                Потому что при первой загрузке страницы, если форма была загружена с localStorage
                то hasError не обнаружит ошибок, так как определяет их состояние только после выполнения функций валидаторов.
                Потому валидаторы актуализируют состояние ошибок, потому hasError нахуй не нужное API, но всем похуй. Конец
            */
            validateProjectName(creationForm.projectName, false, (isError) => {
                if(isError === true) isNotValideForm = true;
            });
            validateProjectHost(creationForm.projectHost, false, (isError) => {
                if(isError === true) isNotValideForm = true;
            });
            validateProjectPort(creationForm.projectPort, false, (isError) => {
                if(isError === true) isNotValideForm = true;
            });
            validateHandshakeToken(creationForm.handshakeToken, false, (isError) => {
                if(isError === true) isNotValideForm = true;
            });

            // Если есть хотябы одна ошибка то форма не отправляется
            if(isNotValideForm === true) {
                return toast.add({ severity: 'error', summary: 'Error', detail: 'Check that the entered data is correct', life: 3000 });
            }

            toast.add({ severity: 'success', summary: 'Confirmed', detail: 'A new project has been created', life: 3000 });
            // Для теста 
            testdata.push({...creationForm});
            console.log(testdata);
            
        } catch (err) {
            console.error('Error: confirmCreationForm => ', err);
        }
    }

    onMounted(() => {
        // Заполнение формы создания объектом из localStorage, если он существует
        filledCreationFormOfStorage(creationForm);
        projectDescriptionExists.value = creationForm.projectDescription;  // запись существующего описания из localStorage в редактор статей
    });


    return {
        confirm,
        toast,
        isResetDisabled,
        isConfirmDisabled,
        creationForm,
        filledCreationFormOfStorage,
        recordCreationFormToStorage,
        removeFormFromStorage,
        handlerReset,
        resetForm,
        confirmCreationForm,
        projectDescriptionExists,

        // validators
        validateProjectName, errorsProjectName,
        validateProjectHost, errorsProjectHost,
        validateProjectPort, errorsProjectPort,
        validateHandshakeToken, errorsHandshakeToken,
        validatePassword, errorsPassword
        
    }
}