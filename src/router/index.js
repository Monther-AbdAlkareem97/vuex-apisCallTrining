import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import AboutView from '@/views/AboutView.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'about',
    component: AboutView,
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
//router.beforeEach((to, from, next) => {
 // if (to.meta.requiresAuth) {
   // router.push({ name: 'login' })
  //}
//})


export default router

