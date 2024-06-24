import EmployeesView from '@/views/EmployeesView.vue';

export default [
    {
        path: '/employees',
        name: 'employees',
        component: EmployeesView,
        meta: { requiredAuth: true },
    }
]