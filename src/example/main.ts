import App from './App.vue';
import './assets/main.css';
import ParagraphElement from './components/ParagraphElement.vue';
import TitleElement from './components/TitleElement.vue';
import MainLayout from './layouts/MainLayout.vue';
import router from './router';
import BaseComponents from '@/index';
import { createApp } from 'vue';

const app = createApp(App);
app.component('MainLayout', MainLayout);
app.component('ParagraphElement', ParagraphElement);
app.component('TitleElement', TitleElement);

const { BaseTextarea, BaseIcon, BaseButton, BaseCode } = BaseComponents;

app.component('BaseTextarea', BaseTextarea);
app.component('BaseIcon', BaseIcon);
app.component('BaseButton', BaseButton);
app.component('BaseCode', BaseCode);

app.use(router);

app.mount('#app');
