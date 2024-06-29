import useErrorCreationForm from "./errorCreationForm"

// Composable для валидации полей формы создания проекта
export default function useValidationFieldsForm() {

    const unacceptableSymbols = '!@#$%^&*|/?()=+<';
    const availableLength = {
        default: 3,
        port: 4,
    };
    const { 
        errorsProjectName, 
        errorsProjectHost, 
        errorsProjectPort, 
        errorsHandshakeToken,
    } = useErrorCreationForm(unacceptableSymbols, availableLength);

    // Валидация projectName
    function validateProjectName(value, isResetValidation) {
        if(!value.length && isResetValidation === true) {
            return errorsProjectName.resetErrors();
        }
        // ERROR:[empty]
        if(!value) {
            return errorsProjectName.empty.visible = true;
        } else errorsProjectName.empty.visible = false;
        // ERROR:[inccorect]
        const lastChar = value.trim().at(-1);
        const firstChar = value.trim().at(0);
        const firstCharNumber = Number(firstChar); // если не равно NaN то первый символ - число 
        if(firstChar === '-' || lastChar === '-' || (firstCharNumber === firstCharNumber /* NaN не равно самому себе */ && typeof firstCharNumber === 'number')) {
            console.log('IF');
            return errorsProjectName.incorrect.visible = true;
        } else errorsProjectName.incorrect.visible = false;
        // ERROR:[Special Symbols]
        if(unacceptableSymbols.includes(value.at(-1))) {
            return errorsProjectName.specialSymbols.visible = true;
        } else errorsProjectName.specialSymbols.visible = false;
        // ERROR:[length]
        if(value && value.length < availableLength.default) {
            return errorsProjectName.lgth.visible = true;
        } else errorsProjectName.lgth.visible = false;
    }

    // Валидация projectHost
    function validateProjectHost(value, isResetValidation) {
        if(!value.length && isResetValidation === true) {
            return errorsProjectHost.resetErrors();
        }
        // ERROR:[empty]
        if(!value) {
            return errorsProjectHost.empty.visible = true;
        } else errorsProjectHost.empty.visible = false;
        // ERROR:[inccorect]
        const lastChar = value.trim().at(-1);
        const firstChar = value.trim().at(0);
        const firstCharNumber = Number(firstChar); // если не равно NaN то первый символ - число 
        if(firstChar === '-' || lastChar === '-' || (firstCharNumber === firstCharNumber /* NaN не равно самому себе */ && typeof firstCharNumber === 'number')) {
            return errorsProjectHost.incorrect.visible = true;
        } else errorsProjectHost.incorrect.visible = false;
        // ERROR:[Special Symbols]
        if(unacceptableSymbols.includes(value.at(-1))) {
            return errorsProjectHost.specialSymbols.visible = true;
        } else errorsProjectHost.specialSymbols.visible = false;
        // ERROR:[length]
        if(value && value.length < availableLength.default) {
            return errorsProjectHost.lgth.visible = true;
        } else errorsProjectHost.lgth.visible = false;
    }

    // Валидация projectHost
    function validateProjectPort(value, isResetValidation) {
        const correctValue = value.split('_').join('');
        if(!correctValue.length && isResetValidation === true) {
            return errorsProjectPort.resetErrors();
        }
        // ERROR:[empty]
        if(!correctValue) {
            return errorsProjectPort.empty.visible = true;
        } else errorsProjectPort.empty.visible = false;

        // ERROR:[length]
        if(correctValue && correctValue.length < availableLength.port) {
            return errorsProjectPort.lgth.visible = true;
        } else errorsProjectPort.lgth.visible = false;
    }

    // Валидация handshakeToken
    function validateHandshakeToken(value, isResetValidation) {
        const correctValue = value.split('_').join('');
        if(!correctValue.length && isResetValidation === true) {
            return errorsHandshakeToken.resetErrors();
        }
        // ERROR:[empty]
        if(!correctValue) {
            return errorsHandshakeToken.empty.visible = true;
        } else errorsHandshakeToken.empty.visible = false;
    }

    return {
        // Error State
        errorsProjectName,
        errorsProjectHost,
        errorsProjectPort,
        errorsHandshakeToken,

        // Validators
        validateProjectName,
        validateProjectHost,
        validateProjectPort,
        validateHandshakeToken,
    }
}