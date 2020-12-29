import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Produto from '../views/PaginaProduto.vue';
import Categoria from '../views/Categoria.vue';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/produto/:id',
    name: 'Produto',
    component: Produto,
    props: true,
  },
  {
    path: '/categoria/:id',
    name: 'Categoria',
    component: Categoria,
    props: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return window.scrollTo({top: 0, behavior: 'smooth'});
  },
});

export default router;
