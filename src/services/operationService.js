import { operations } from "./testdata";


// Сервис для работы с операциями проекта
export default class OperationService {
    // Поулчение проектов
    static async getOperations(projectId) {
        try {
            return operations.filter((operation) => operation.projectId == projectId);
        } catch (err) {
            console.error(err);
            console.error(`services/operationService: getOperations  => ${err}`);
        }
    }

    // Получение данных проекта по его ID
    static async getProjectData(projectId) {
        try {
            const found = testdata.find((project) => project.id == projectId);
            return found;
        } catch (err) {
            console.error(err);
            console.error(`services/operationService: getOperations  => ${err}`);
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