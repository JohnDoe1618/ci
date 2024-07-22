import { reactive } from "vue";

// Реактивное состояние ошибок для полей проекта
export default function useErrorCreationForm(unacceptableSymbols, availableLength) {

    // ==========================  PROJECT NAME  =========================
    const errorsProjectName = reactive({
        // ---------------  EMPTY  ---------------
        // Пустое значение
        empty: {
            _visible: false,
            msg: 'Project Name is a required field',
            // > getter
            get visible() {
                return this._visible;
            },
            // > setter
            set visible(value) {
                if(value !== this._visible) {
                    this._visible = value; 
                    if(value === true) {
                        errorsProjectName.lgth.visible = false;
                        errorsProjectName.specialSymbols.visible = false;
                        errorsProjectName.incorrect.visible = false;
                    }
                }
            },
        },

        // ---------------  LENGTH  ---------------
        // Недостаточная длина
        lgth: {
            _visible: false,
            msg: `The length of the project name cannot be less than ${availableLength.default} characters`,
            // > getter
            get visible() {
                return this._visible;
            },
            // > setter
            set visible(value) {
                if(value !== this._visible) {
                    this._visible = value; 
                    if(value === true) {
                        errorsProjectName.empty.visible = false;
                        errorsProjectName.specialSymbols.visible = false;
                        errorsProjectName.incorrect.visible = false;
                    }
                }
            },
        },

        // ---------------  SPECIAL SYMBOLS  ---------------
        // Недопустимые спецсимволы
        specialSymbols: {
            _visible: false,
            msg: `the project name cannot contain special characters: ${unacceptableSymbols}`,
            
            // > getter
            get visible() {
                return this._visible;
            },
            // > setter
            set visible(value) {
                if(value !== this._visible) {
                    this._visible = value; 
                    if(value === true) {
                        errorsProjectName.empty.visible = false;
                        errorsProjectName.lgth.visible = false;
                        errorsProjectName.incorrect.visible = false;
                    }
                }
            },
        },

        // ---------------  UNCORRECT VALUE  ---------------
        // Неккоректное значение
        incorrect: {
            _visible: false,
            msg: `Incorrect project name`,
            
            // > getter
            get visible() {
                return this._visible;
            },
            // > setter
            set visible(value) {
                if(value !== this._visible) {
                    this._visible = value; 
                    if(value === true) {
                        errorsProjectName.empty.visible = false;
                        errorsProjectName.lgth.visible = false;
                        errorsProjectName.specialSymbols.visible = false;
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

    // ==========================  PROJECT HOSTNAME  =========================
    const errorsProjectHost = reactive({
        // ---------------  EMPTY  ---------------
        // Пустое значение
        empty: {
            _visible: false,
            msg: 'Project Host is a required field',
            // > getter
            get visible() {
                return this._visible;
            },
            // > setter
            set visible(value) {
                if(value !== this._visible) {
                    this._visible = value; 
                    if(value === true) {
                        errorsProjectHost.lgth.visible = false;
                        errorsProjectHost.specialSymbols.visible = false;
                        errorsProjectHost.incorrect.visible = false;
                    }
                }
            },
        },

        // ---------------  LENGTH  ---------------
        // Недостаточная длина
        lgth: {
            _visible: false,
            msg: `The length of the hostname cannot be less than ${availableLength.default} characters`,
            // > getter
            get visible() {
                return this._visible;
            },
            // > setter
            set visible(value) {
                if(value !== this._visible) {
                    this._visible = value; 
                    if(value === true) {
                        errorsProjectHost.empty.visible = false;
                        errorsProjectHost.specialSymbols.visible = false;
                        errorsProjectHost.incorrect.visible = false;
                    }
                }
            },
        },

        // ---------------  SPECIAL SYMBOLS  ---------------
        // Недопустимые спецсимволы
        specialSymbols: {
            _visible: false,
            msg: `the hostname cannot contain special characters: ${unacceptableSymbols}`,
            
            // > getter
            get visible() {
                return this._visible;
            },
            // > setter
            set visible(value) {
                if(value !== this._visible) {
                    this._visible = value; 
                    if(value === true) {
                        errorsProjectHost.empty.visible = false;
                        errorsProjectHost.lgth.visible = false;
                        errorsProjectHost.incorrect.visible = false;
                    }
                }
            },
        },

        // ---------------  UNCORRECT VALUE  ---------------
        // Неккоректное значение
        incorrect: {
            _visible: false,
            msg: `Incorrect hostname`,
            
            // > getter
            get visible() {
                return this._visible;
            },
            // > setter
            set visible(value) {
                if(value !== this._visible) {
                    this._visible = value; 
                    if(value === true) {
                        errorsProjectHost.empty.visible = false;
                        errorsProjectHost.lgth.visible = false;
                        errorsProjectHost.specialSymbols.visible = false;
                    }
                }
            },
        },
        // Сбросить состояние ошибок
        resetErrors () {
            this.empty.visible = false;
            this.lgth.visible = false;
            this.incorrect.visible = false;
            this.specialSymbols.visible = false;
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

    // ==========================  PROJECT PORT  =========================
    const errorsProjectPort = reactive({
        // ---------------  EMPTY  ---------------
        // Пустое значение
        empty: {
            _visible: false,
            msg: 'Project Port is a required field',
            // > getter
            get visible() {
                return this._visible;
            },
            // > setter
            set visible(value) {
                if(value !== this._visible) {
                    this._visible = value; 
                    if(value === true) {
                        errorsProjectPort.lgth.visible = false;
                    }
                }
            },
        },

        // ---------------  LENGTH  ---------------
        // Недостаточная длина
        lgth: {
            _visible: false,
            msg: `The length of the port cannot be less than ${availableLength.port} characters`,
            // > getter
            get visible() {
                return this._visible;
            },
            // > setter
            set visible(value) {
                if(value !== this._visible) {
                    this._visible = value; 
                    if(value === true) {
                        errorsProjectPort.empty.visible = false;
                    }
                }
            },
        },

        // Сбросить состояние ошибок
        resetErrors () {
            this.empty.visible = false;
            this.lgth.visible = false;
        },
        // Проверка на существование хотя-бы одной ошибки
        hasError() {
            if(
                this.empty.visible === true || 
                this.lgth.visible === true
            ) return true;
            else return false;
        }

    });

    // ==========================  HANDSHAKE TOKEN  =========================
    const errorsHandshakeToken = reactive({
        // ---------------  EMPTY  ---------------
        // Пустое значение
        empty: {
            _visible: false,
            msg: 'Handshake Token is a required field',
            // > getter
            get visible() {
                return this._visible;
            },
            // > setter
            set visible(value) {
                if(value !== this._visible) {
                    this._visible = value; 
                }
            },
        },
        // Сбросить состояние ошибок
        resetErrors () {
            this.empty.visible = false;
        },
        // Проверка на существование хотя-бы одной ошибки
        hasError() {
            if(
                this.empty.visible === true
            ) return true;
            else return false;
        }
    });

    // ==========================  PASSWORD  =========================
    const errorsPassword = reactive({
        // ---------------  EMPTY  ---------------
        // Пустое значение
        empty: {
            _visible: false,
            msg: 'Password is a required field',
            // > getter
            get visible() {
                return this._visible;
            },
            // > setter
            set visible(value) {
                if(value !== this._visible) {
                    this._visible = value; 
                }
            },
        },
        // ---------------  LENGTH  ---------------
        // Недостаточная длина
        lgth: {
            _visible: false,
            msg: `The length of the pasword cannot be less than ${availableLength.password} characters`,
            // > getter
            get visible() {
                return this._visible;
            },
            // > setter
            set visible(value) {
                if(value !== this._visible) {
                    this._visible = value; 
                    if(value === true) {
                        errorsPassword.empty.visible = false;
                    }
                }
            },
        },
        // Сбросить состояние ошибок
        resetErrors () {
            this.empty.visible = false;
            this.lgth.visible = false;
        },
        // Проверка на существование хотя-бы одной ошибки
        hasError() {
            if(
                this.empty.visible === true ||
                this.lgth.visible === true
            ) return true;
            else return false;
        }
    });


    return {
        errorsProjectName,
        errorsProjectHost,
        errorsProjectPort,
        errorsHandshakeToken,
        errorsPassword,
    }
}