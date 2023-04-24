import App from './App.vue';
import ParagraphElement from './components/ParagraphElement.vue';
import TitleElement from './components/TitleElement.vue';
import router from './router';
import '@/assets/main.css';
import BaseComponents from '@/index';
import { createApp } from 'vue';

const app = createApp(App);
app.component('ParagraphElement', ParagraphElement);
app.component('TitleElement', TitleElement);

const { BaseTextarea, BaseIcon, BaseButton } = BaseComponents;

app.component('BaseTextarea', BaseTextarea);
app.component('BaseIcon', BaseIcon);
app.component('BaseButton', BaseButton);

app.use(router);

app.mount('#app');
