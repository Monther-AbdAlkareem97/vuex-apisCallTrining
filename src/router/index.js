import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '@/views/SignupView.vue';
import AboutView from '@/views/AboutView.vue';

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true } 
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: AboutView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView,
    meta: { requiresAuth: true } 
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      const response = await axios.get('http://localhost:3000/users'); 
      const loggedInUser = response.data.find(user => user.loggedIn);
      if (loggedInUser) {
        next(); 
      } else {
        next({ name: 'login' }); 
      }
    } catch (error) {
      console.error('Error verifying login:', error);
      next({ name: 'login' });
    }
  } else {
    next(); 
  }
});

export default router;
