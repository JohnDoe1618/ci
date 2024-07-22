import useErrorsCreationForm from "./errorsCreationForm";

export default function useValidationForm() {
    const availableLength = { default: 4 };
    const unacceptableSymbols = '!@#$%^&*|/?()=+<>.,';

    const { errorsOperationEndpoint, errorsOperationName } = useErrorsCreationForm(availableLength, unacceptableSymbols);

    // Функция проверяет наличие недопустимых спец. символов в строке
    function hasSpecChars(value) {
        try {
            if(value && typeof value === 'string') {
                let specCharsArr = unacceptableSymbols.split('');
                const result = specCharsArr.some((char) => {
                    if(value.includes(char)) return true;
                });
                return result;
            }
        } catch (err) {
            throw { call: 'hasSpecChars', err };
        }
    }

    // Валидация имени операции
    function validateOperationName(value, isResetValidation, callback) {
        try {
            // ERROR:[empty]
            if(!value) {
                if(callback) callback(true);
                return errorsOperationName.empty.visible = true;
            } else errorsOperationName.empty.visible = false;
            if(!value.length && isResetValidation === true) {
                return errorsOperationName.resetErrors();
            }
            // ERROR:[inccorect]
            const lastChar = value.trim().at(-1);       // крайний правый символ
            const firstChar = value.trim().at(0);       // крайний левый символ
            const firstCharNumber = Number(firstChar);  // если не равно NaN то первый символ - число 
            if(firstChar === '-' || lastChar === '-' || (firstCharNumber === firstCharNumber /* NaN не равно самому себе */ && typeof firstCharNumber === 'number')) {
                if(callback) callback(true);
                return errorsOperationName.incorrect.visible = true;
            } else errorsOperationName.incorrect.visible = false;
            // ERROR:[Special Symbols]
            if(hasSpecChars(value)) {
                if(callback) callback(true);
                return errorsOperationName.specialSymbols.visible = true;
            } else errorsOperationName.specialSymbols.visible = false;
            // ERROR:[length]
            if(value && value.length < availableLength.default) {
                if(callback) callback(true);
                return errorsOperationName.lgth.visible = true;
            } else errorsOperationName.lgth.visible = false;
            if(callback) return callback(false);
        } catch (err) {
            console.error('composables/newOperationComposables/validationForm: validateOperationName =>', err);
            throw err;
        }
    }

    // Валидация эндпоинта операции
    function validateProjectEndpoint(value, isResetValidation, callback) {
        try {
            // ERROR:[empty]
            if(!value) {
                if(callback) callback(true);
                return errorsOperationEndpoint.empty.visible = true;
            } else errorsOperationEndpoint.empty.visible = false;
            if(!value.length && isResetValidation === true) {
                return errorsOperationEndpoint.resetErrors();
            }
            if(callback) return callback(false);
        } catch (err) {
            console.error('composables/newOperationComposables/validationForm: validateProjectEndpoint =>', err);
            throw err;
        }
    }

    // Валидация параметров таких как pathParams/queryParams/requestBodyParams
    function validateArrayParams(params, callback) {
        try {
            if(params && Array.isArray(params)) {
                const result = params.some(({ key, type }) => {
                    if(!key || !type) return true;
                });
                callback(result);
                return result;
            }
        } catch (err) {
            console.error('/validateArrayParams', err);
        }
    }

    return {
        validateOperationName,
        validateProjectEndpoint,
        validateArrayParams,

        errorsOperationName,
        errorsOperationEndpoint,
    }
}