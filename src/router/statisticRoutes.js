import StatisticsView from '@/views/StatisticsView.vue';

export default [
    {
        path: '/statistics',
        name: 'statistics',
        component: StatisticsView,
        meta: { requiredAuth: true },
    }
]