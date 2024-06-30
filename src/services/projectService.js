import testdata from "./testdata";

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