import ProjectsView from '@/views/projects/ProjectsView.vue';
import NewProjectView from '@/views/projects/NewProjectView.vue';
import ProjectView from '@/views/projects/ProjectView.vue';
import ProjectLogin from '@/views/projects/ProjectLogin.vue';
import DescriptionView from '@/views/projects/project/DescriptionView.vue';
import StatisticsView from '@/views/projects/project/StatisticsView.vue';
import InteracrionsView from '@/views/projects/project/InteracrionsView.vue';
import ParticipantsView from '@/views/projects/project/ParticipantsView.vue';
// Operations
import OperationsView from '@/views/operations/OperationsView.vue';
import OperationLaunchView from '@/views/operations/OperationLaunchView.vue';

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
        redirect: { name: 'description' },
        children: [
            {
                path: 'about-project',
                name: 'description',
                component: DescriptionView,
                meta: { requiredAuth: true },
                props: true,
            },
            {
                path: 'statistics',
                name: 'statistics',
                component: StatisticsView,
                meta: { requiredAuth: true },
                props: true,

            },
            {
                path: 'operations',
                name: 'operations',
                component: OperationsView,
                meta: { requiredAuth: true },
                props: true,
            },
            // LAUNCH OPERATION
            {
                path: 'operations/launch/:operationName/:operationId',
                name: 'launch-operation',
                component: OperationLaunchView,
                meta: { requiredAuth: true },
                props: true,
            },
            {
                path: 'participants',
                name: 'participants',
                component: ParticipantsView,
                meta: { requiredAuth: true },
                props: true,

            },
            {
                path: 'history',
                name: 'interactions',
                component: InteracrionsView,
                meta: { requiredAuth: true },
                props: true,

            },
        ]
    },
    {
        path: '/projects/project-login',
        name: 'project-login',
        component: ProjectLogin,
        meta: { requiredAuth: true },
    },
]