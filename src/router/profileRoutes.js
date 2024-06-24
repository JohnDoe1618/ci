import ProfileView from '@/views/ProfileView.vue';

export default [
    {
        path: '/profile',
        name: 'profile',
        component: ProfileView,
        meta: { requiredAuth: true },
    }
];