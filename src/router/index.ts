import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import PostsPage from '@/pages/PostsPage.vue';
import RegistrationPage from '@/pages/RegistrationPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import { hasAuthData } from '@/utils/authStorage';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Posts',
    component: PostsPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/sign-up',
    name: 'Register',
    component: RegistrationPage,
  },
  {
    path: '/sign-in',
    name: 'Login',
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(''),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(hasAuthData());
  if (to.meta.requiresAuth && !hasAuthData()) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
