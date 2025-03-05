// src/router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Home from '../pages/HomePage';


// Определите типы маршрутов
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

