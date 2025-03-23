import { createRouter, createWebHistory } from 'vue-router'
import store from '../store';
import CatalogView from '../views/CatalogView.vue'
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';




const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: CatalogView },
    { path: '/login', component: LoginView },
    { path: '/register', component: RegisterView },
  ],
});


export default router
