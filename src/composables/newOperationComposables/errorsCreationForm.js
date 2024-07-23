
import { reactive } from 'vue';

export default function useErrorsCreationForm(availableLength, unacceptableSymbols) {
    // ==========================  OPERATION NAME  =========================
    const errorsOperationName = reactive({
        // ---------------  EMPTY  ---------------
        // Пустое значение
        empty: {
            _visible: false,
            msg: 'Operation Name is a required field',
            // > getter
            get visible() {
                return this._visible;
            },
            // > setter
            set visible(value) {
                if(value !== this._visible) {
                    this._visible = value; 
                    if(value === true) {
                        errorsOperationName.lgth.visible = false;
                        errorsOperationName.specialSymbols.visible = false;
                        errorsOperationName.incorrect.visible = false;
                    }
                }
            },
        },

        // ---------------  LENGTH  ---------------
        // Недостаточная длина
        lgth: {
            _visible: false,
            msg: `The length of the operation name cannot be less than ${availableLength.default} characters`,
            // > getter
            get visible() {
                return this._visible;
            },
            // > setter
            set visible(value) {
                if(value !== this._visible) {
                    this._visible = value; 
                    if(value === true) {
                        errorsOperationName.empty.visible = false;
                        errorsOperationName.specialSymbols.visible = false;
                        errorsOperationName.incorrect.visible = false;
                    }
                }
            },
        },

        // ---------------  SPECIAL SYMBOLS  ---------------
        // Недопустимые спецсимволы
        specialSymbols: {
            _visible: false,
            msg: `the operation name cannot contain special characters: ${unacceptableSymbols}`,
            
            // > getter
            get visible() {
                return this._visible;
            },
            // > setter
            set visible(value) {
                if(value !== this._visible) {
                    this._visible = value; 
                    if(value === true) {
                        errorsOperationName.empty.visible = false;
                        errorsOperationName.lgth.visible = false;
                        errorsOperationName.incorrect.visible = false;
                    }
                }
            },
        },

        // ---------------  UNCORRECT VALUE  ---------------
        // Неккоректное значение
        incorrect: {
            _visible: false,
            msg: `Incorrect operation name`,
            
            // > getter
            get visible() {
                return this._visible;
            },
            // > setter
            set visible(value) {
                if(value !== this._visible) {
                    this._visible = value; 
                    if(value === true) {
                        errorsOperationName.empty.visible = false;
                        errorsOperationName.lgth.visible = false;
                        errorsOperationName.specialSymbols.visible = false;
                    }
                }
            },
        },
        // Сбросить состояние ошибок
        resetErrors () {
            this.empty.visible = false;
            this.lgth.visible = false;
            this.specialSymbols.visible = false;
            this.incorrect.visible = false;
        },
        // Проверка на существование хотя-бы одной ошибки
        hasError() {
            if(
                this.empty.visible === true || 
                this.lgth.visible === true || 
                this.incorrect.visible === true || 
                this.specialSymbols.visible === true
            ) return true;
            else return false;
        }
    });

    // ==========================  OPERATION ENDPOINT  =========================
    const errorsOperationEndpoint = reactive({
        // ---------------  EMPTY  ---------------
        // Пустое значение
        empty: {
            _visible: false,
            msg: 'Operation Endpoint is a required field',
            // > getter
            get visible() {
                return this._visible;
            },
            // > setter
            set visible(value) {
                if(value !== this._visible) {
                    this._visible = value;
                    if(value === true) {
                        errorsOperationEndpoint.specialSymbols.visible = false;
                    }
                }
            },
        },
        // ---------------  SPECIAL SYMBOLS  ---------------
        // Недопустимые спецсимволы
        specialSymbols: {
            _visible: false,
            msg: `the operation endpoint cannot contain special characters: ${unacceptableSymbols}`,
            
            // > getter
            get visible() {
                return this._visible;
            },
            // > setter
            set visible(value) {
                if(value !== this._visible) {
                    this._visible = value; 
                    if(value === true) {
                        errorsOperationEndpoint.empty.visible = false;
                    }
                }
            },
        },
        // Сбросить состояние ошибок
        resetErrors () {
            this.empty.visible = false;
            this.specialSymbols.visible = false;
        },
        // Проверка на существование хотя-бы одной ошибки
        hasError() {
            if(this.empty.visible === true || this.specialSymbols.visible === true) return true;
            else return false;
        }

    });

    return {
        errorsOperationName,
        errorsOperationEndpoint,
    }
}