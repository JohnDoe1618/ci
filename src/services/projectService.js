import { testdata } from "./testdata";

const projectDataDefault = {
    id: null,
    name: null,
    host: null,
    port: null,
    handshakeHash: null,
    createdAt: null,
    updatedAt: null,
}


export default class ProjectService {
    static templateProject = {...projectDataDefault};
    // Поулчение проектов
    static async getProjects() {
        try {
            return testdata;
        } catch (err) {
            console.error(err);
            console.error(`services/projectService: getProjects  => ${err}`);
        }
    }

    // Получение данных проекта по его ID
    static async getProjectData(projectId) {
        try {
            const found = testdata.find((project) => project.id == projectId);
            return found;
        } catch (err) {
            console.error(err);
            console.error(`services/projectService: getProjectData  => ${err}`);
        }
    }

    // Авторизация в проекте
    static async loginProject() {
        try {
            return true;
        } catch (err) {
            console.error(err);
            console.error(`services/projectService: loginProject  => ${err}`);
        }
    }
}