import type { Component } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

const WelcomePage = (): Component => import('../views/WelcomePage.vue');
const ButtonPage = (): Component => import('../views/ButtonPage.vue');
const TextareaPage = (): Component => import('../views/TextareaPage.vue');

const routes = [
  {
    path: '/',
    name: 'home',
    component: WelcomePage,
  },
  {
    path: '/button',
    name: 'button',
    component: ButtonPage,
  },
  {
    path: '/textarea',
    name: 'textarea',
    component: TextareaPage,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

export const router = createRouter({
  // use hash history to circumvent problems with relative embedding
  history: createWebHistory(),
  routes,
});

export default router;
