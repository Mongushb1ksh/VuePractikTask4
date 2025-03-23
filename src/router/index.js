import { createRouter, createWebHistory } from 'vue-router';
import CatalogView from '../views/CatalogView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import CartView from '../views/CartView.vue';
import store from '@/store';




const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Catalog', component: CatalogView },
    { path: '/login', name: 'Login', component: LoginView },
    { path: '/register', name: 'Register', component: RegisterView },
    { path: '/cart', name: 'Cart', component: CartView }
  ],
});


export default router
