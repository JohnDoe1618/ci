
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import components from './components';
import ui from './components/UI';
import 'primeicons/primeicons.css';
import '../node_modules/primeflex/primeflex.css';
import './styles/index.css';
import Aura from '@primevue/themes/aura';


const app = createApp(App)

components.forEach((component) => {
    app.component(component.name, component);
});
ui.forEach((component) => {
    app.component(component.name, component);
})

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
        },
    }
});

app.mount('#app');
