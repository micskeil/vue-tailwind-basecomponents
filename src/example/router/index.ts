import type { Component } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

const TextareaPage = (): Component => import('../views/TextareaPage.vue');

const routes = [
  {
    path: '/',
    name: 'home',
    component: TextareaPage,
  },
];

export const router = createRouter({
  // use hash history to circumvent problems with relative embedding
  history: createWebHistory(),
  routes,
});

export default router;
