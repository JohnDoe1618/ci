import useErrorCreationForm from "./errorCreationForm"

// Composable для валидации полей формы создания проекта
export default function useValidationFieldsForm() {

    const unacceptableSymbols = '!@#$%^&*|/?()=+<';
    const availableLength = {
        default: 3,
        port: 4,
        password: 8,
    };
    const { 
        errorsProjectName, 
        errorsProjectHost, 
        errorsProjectPort, 
        errorsHandshakeToken,
        errorsPassword,
    } = useErrorCreationForm(unacceptableSymbols, availableLength);

    // Валидация password
    function validatePassword(value, isResetValidation, callback) {
        try {
            if(!value.length && isResetValidation === true) {
                return errorsPassword.resetErrors();
            }
            // ERROR:[empty]
            if(!value) {
                if(callback) callback(true);
                return errorsPassword.empty.visible = true;
            } else errorsPassword.empty.visible = false;
            // ERROR:[length]
            if(value && value.length < availableLength.password) {
                if(callback) callback(true);
                return errorsPassword.lgth.visible = true;
            } else errorsPassword.lgth.visible = false;
            if(callback) return callback(false);
        } catch (err) {
            console.error('Ошибка validatePassword: ', err);
            throw err;
        }
    }

    // Валидация projectName
    function validateProjectName(value, isResetValidation, callback) {
        try {
            if(!value.length && isResetValidation === true) {
                return errorsProjectName.resetErrors();
            }
            // ERROR:[empty]
            if(!value) {
                if(callback) callback(true);
                return errorsProjectName.empty.visible = true;
            } else errorsProjectName.empty.visible = false;
            // ERROR:[inccorect]
            const lastChar = value.trim().at(-1);
            const firstChar = value.trim().at(0);
            const firstCharNumber = Number(firstChar); // если не равно NaN то первый символ - число 
            if(firstChar === '-' || lastChar === '-' || (firstCharNumber === firstCharNumber /* NaN не равно самому себе */ && typeof firstCharNumber === 'number')) {
                if(callback) callback(true);
                return errorsProjectName.incorrect.visible = true;
            } else errorsProjectName.incorrect.visible = false;
            // ERROR:[Special Symbols]
            if(unacceptableSymbols.includes(value.at(-1))) {
                if(callback) callback(true);
                return errorsProjectName.specialSymbols.visible = true;
            } else errorsProjectName.specialSymbols.visible = false;
            // ERROR:[length]
            if(value && value.length < availableLength.default) {
                if(callback) callback(true);
                return errorsProjectName.lgth.visible = true;
            } else errorsProjectName.lgth.visible = false;
            if(callback) return callback(false);
        } catch (err) {
            console.error('Ошибка validateProjectName: ', err);
            throw err;
        }
        
    }

    // Валидация projectHost
    function validateProjectHost(value, isResetValidation, callback) {
        try {
            if(!value.length && isResetValidation === true) {
                return errorsProjectHost.resetErrors();
            }
            // ERROR:[empty]
            if(!value) {
                if(callback) callback(true);
                return errorsProjectHost.empty.visible = true;
            } else errorsProjectHost.empty.visible = false;
            // ERROR:[inccorect]
            const lastChar = value.trim().at(-1);
            const firstChar = value.trim().at(0);
            const firstCharNumber = Number(firstChar); // если не равно NaN то первый символ - число 
            if(firstChar === '-' || lastChar === '-' || (firstCharNumber === firstCharNumber /* NaN не равно самому себе */ && typeof firstCharNumber === 'number')) {
                if(callback) callback(true);
                return errorsProjectHost.incorrect.visible = true;
            } else errorsProjectHost.incorrect.visible = false;
            // ERROR:[Special Symbols]
            if(unacceptableSymbols.includes(value.at(-1))) {
                if(callback) callback(true);
                return errorsProjectHost.specialSymbols.visible = true;
            } else errorsProjectHost.specialSymbols.visible = false;
            // ERROR:[length]
            if(value && value.length < availableLength.default) {
                if(callback) callback(true);
                return errorsProjectHost.lgth.visible = true;
            } else errorsProjectHost.lgth.visible = false;   
            if(callback) return callback(false);
        } catch (err) {
            console.error('Ошибка validateProjectHost: ', err);
            throw err;
        }
    }

    // Валидация projectPort
    function validateProjectPort(value, isResetValidation, callback) {
        try {
            if(value === null) value = '';
            const correctValue = value.split('_').join('');
            if(!correctValue.length && isResetValidation === true) {
                return errorsProjectPort.resetErrors();
            }
            // ERROR:[empty]
            if(!correctValue) {
                if(callback) callback(true);
                return errorsProjectPort.empty.visible = true;
            } else errorsProjectPort.empty.visible = false;
    
            // ERROR:[length]
            if(correctValue && correctValue.length < availableLength.port) {
                if(callback) callback(true);
                return errorsProjectPort.lgth.visible = true;
            } else errorsProjectPort.lgth.visible = false;
            if(callback) return callback(false);
        } catch (err) {
            console.error('Ошибка validateProjectPort: ', err);
            throw err;
        }

    }

    // Валидация handshakeToken
    function validateHandshakeToken(value, isResetValidation, callback) {
        try {
            const correctValue = value.split('_').join('');
            if(!correctValue.length && isResetValidation === true) {
                return errorsHandshakeToken.resetErrors();
            }
            // ERROR:[empty]
            if(!correctValue) {
                if(callback) callback(true);
                return errorsHandshakeToken.empty.visible = true;
            } else errorsHandshakeToken.empty.visible = false;
            if(callback) return callback(false);
        } catch (err) {
            console.error('Ошибка validateHandshakeToken: ', err);
            throw err;
        }

    }

    return {
        // Error State
        errorsProjectName,
        errorsProjectHost,
        errorsProjectPort,
        errorsHandshakeToken,
        errorsPassword,

        // Validators
        validateProjectName,
        validateProjectHost,
        validateProjectPort,
        validateHandshakeToken,
        validatePassword,
    }
}