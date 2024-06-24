import AppearanceView from '@/views/AppearanceView.vue';
import SecurityView from '@/views/SecurityView.vue';

export default [
    {
        path: '/settings/appearance',
        name: 'appearance',
        component: AppearanceView,
        meta: { requiredAuth: true },
    },
    {
        path: '/settings/security',
        name: 'security',
        component: SecurityView,
        meta: { requiredAuth: true },
    },

]