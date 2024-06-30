import ProjectsView from '@/views/projects/ProjectsView.vue';
import NewProjectView from '@/views/projects/NewProjectView.vue';
import ProjectView from '@/views/projects/ProjectView.vue';
import ProjectLogin from '@/views/projects/ProjectLogin.vue';

export default [
    {
        path: '/projects/list',
        name: 'projects',
        component: ProjectsView,
        meta: { requiredAuth: true },
    },
    {
        path: '/projects/create-new-project',
        name: 'new-project',
        component: NewProjectView,
        meta: { requiredAuth: true },
    },
    {
        path: '/projects/:id',
        name: 'project',
        component: ProjectView,
        meta: { requiredAuth: true },
    },
    {
        path: '/projects/project-login',
        name: 'project-login',
        component: ProjectLogin,
        meta: { requiredAuth: true },
    },
]