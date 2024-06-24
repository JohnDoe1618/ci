import TasksView from '@/views/TasksView.vue';

export default [
    {
        path: '/tasks',
        name: 'tasks',
        component: TasksView,
        meta: { requiredAuth: true },
    }
]