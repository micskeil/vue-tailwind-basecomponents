import App from './App.vue';
import './assets/main.css';
import ParagraphElement from './components/ParagraphElement.vue';
import TitleElement from './components/TitleElement.vue';
import MainLayout from './layouts/MainLayout.vue';
import router from './router';
import { VBaseButton, VBaseTextarea, VBaseCode, VBaseIcon } from '@/index';
import { createApp } from 'vue';

const app = createApp(App);
app.component('MainLayout', MainLayout);
app.component('ParagraphElement', ParagraphElement);
app.component('TitleElement', TitleElement);

app.component('VBaseTextarea', VBaseTextarea);
app.component('VBaseIcon', VBaseIcon);
app.component('VBaseButton', VBaseButton);
app.component('VBaseCode', VBaseCode);

app.use(router);

app.mount('#app');
