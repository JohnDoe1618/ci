
export default function useHandlerFormLocalStorage() {

    // Заполнение формы creationForm по данным из localStorage (если они есть)
    function filledCreationFormOfStorage(creationForm) {
        let existsCreationForm = localStorage.getItem('creation_form');
        if(existsCreationForm) {
            existsCreationForm = JSON.parse(existsCreationForm);
            for (const [key, value] of Object.entries(existsCreationForm)) {
                if(key === 'projectPort') creationForm[key] = Number(value);
                creationForm[key] = value;
            }
        }
    }

    // Запись измененного объекта формы в localStorage
    function recordCreationFormToStorage(updatedForm) {
        let readyUpdatedForm = { ...updatedForm }
        if(readyUpdatedForm.projectPort === '') readyUpdatedForm.projectPort = null;
        localStorage.setItem('creation_form', JSON.stringify(readyUpdatedForm));
    }

    // Удаление сохраненной формы создания из localStorage 
    function removeFormFromStorage() {
        localStorage.removeItem('creation_form');
    }

 

    return {
        recordCreationFormToStorage,
        filledCreationFormOfStorage,
        removeFormFromStorage,
    }
}