import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Page404 from '../views/Page404.vue';
import Home from '../views/Home.vue';
import Produto from '../views/PaginaProduto.vue';
import Categoria from '../views/PaginaCategoria.vue';
import Login from '../views/Login.vue';
import Usuario from '../views/Usuario.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '*',
    component: Page404,
  },

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
    path: '/loja',
    name: 'Loja',
    component: Categoria,
    props: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/usuario',
    name: 'Usuario',
    component: Usuario,
  },
];


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(): void {
    window.scrollTo({top: 0, behavior: 'smooth'});
  },
});

export default router;
