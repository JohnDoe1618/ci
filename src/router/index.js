import { createRouter, createWebHistory } from "vue-router";
import AuthView from "@/views/AuthView.vue";
import MainView from "@/views/MainView.vue";
import DefaultView from "@/views/DefaultView.vue";
import { useMainStore } from "@/stores/main";
// Routes
import profileRoutes from "./profileRoutes";
import statisticRoutes from "./statisticRoutes";
import projectsRoutes from "./projectsRoutes";
import tasksRoutes from "./tasksRoutes";
import employeesRoutes from "./employeesRoutes";
import settingRoutes from "./settingRoutes";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'default',
            component: DefaultView,
            redirect: { name: 'main' },
            meta: { requiredAuth: true },
        },
        {
            path: '/main',
            name: 'main',
            component: MainView,
            meta: { requiredAuth: true },
        },
        {
            path: '/auth',
            name: 'auth',
            component: AuthView, 
            meta: { requiredAuth: false },
        },
        ...profileRoutes,  // Profile
        ...statisticRoutes, // Statistics
        ...projectsRoutes, // Projects
        ...tasksRoutes, //Tasks
        ...employeesRoutes, // Employees
        ...settingRoutes  // Settings
    ],
});

router.beforeEach((to, from, next) => {
    const store = useMainStore();
    if(to.name === 'auth') {
        store.isShowNavdrawer = false;
        console.log(store.isShowNavdrawer);
    }
    next();
});

export default router;
