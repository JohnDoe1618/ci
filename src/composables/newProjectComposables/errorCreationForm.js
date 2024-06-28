import { reactive } from "vue"


export default function useErrorCreationForm() {
    // Ошибки для поля ввода Названия Проекта
    const errorsProjectName = reactive({
        empty: {
            visible: false,
            msg: 'Project Name is a required field',
        },
        lgth: {
            visible: false,
            msg: 'The length of the project name cannot be less than 4 characters',
        },
        specialSymbols: {
            visible: false,
            msg: 'the project name cannot contain special characters: !@#$%^&*|/?()=+<',
        }
    });

    return {
        errorsProjectName,
    }
}