import ProjectsView from '@/views/ProjectsView.vue';

export default [
    {
        path: '/projects',
        name: 'projects',
        component: ProjectsView,
        meta: { requiredAuth: true },
    }
]