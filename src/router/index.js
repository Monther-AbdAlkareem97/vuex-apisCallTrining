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
    meta: { requiresAuth: true } // Requires authentication
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: AboutView,
    meta: { requiresAuth: true } // Requires authentication
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
    meta: { requiresAuth: true } // Requires authentication
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Navigation guard to check if the user is logged in by verifying with JSON server
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      const response = await axios.get('http://localhost:3000/users'); // Adjust to your JSON server endpoint
      const admin = response.data.find(user => user.name === 'admin' && user.loggedIn);

      if (admin) {
        next(); // Admin is logged in, allow access
      } else {
        next({ name: 'login' }); // Redirect to login if not logged in
      }
    } catch (error) {
      console.error('Error verifying login:', error);
      next({ name: 'login' }); // Redirect to login on error
    }
  } else {
    next(); // Proceed to the route if no auth required
  }
});

export default router;
