import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import PostsPageVue from '@/pages/PostsPage.vue';
import LoginPageVue from '@/pages/LoginPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Posts',
    component: PostsPageVue,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPageVue,
  },
];

const router = createRouter({
  history: createWebHistory(''),
  routes,
});

export default router;
