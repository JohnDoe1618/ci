import { operations } from "./testdata";


// Сервис для работы с операциями проекта
export default class OperationService {
    // Поулчение операций
    static async getOperations(projectId) {
        try {
            return operations.filter((operation) => operation.projectId == projectId);
        } catch (err) {
            console.error(err);
            console.error(`services/operationService: getOperations  => ${err}`);
        }
    }

    // Получение данных операции по её ID
    static async getOperationById(operationId) {
        try {
            const found = operations.find((operation) => operation.id == operationId);
            return found;
        } catch (err) {
            console.error(err);
            console.error(`services/operationService: getOperationById  => ${err}`);
        }
    }

    // Авторизация в проекте
    static async loginProject() {
        try {
            return true;
        } catch (err) {
            console.error(err);
            console.error(`services/operationService: getOperations  => ${err}`);
        }
    }
}