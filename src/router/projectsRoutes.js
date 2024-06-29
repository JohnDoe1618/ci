import ProjectsView from '@/views/ProjectsView.vue';
import NewProjectView from '@/views/NewProjectView.vue';

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
    }
]