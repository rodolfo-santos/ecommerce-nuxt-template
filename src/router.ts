import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Page404 from '../views/Page404.vue';
import { Home } from '@/views';
// import product from '../views/Paginaproduct.vue';
// import Categoria from '../views/PaginaCategoria.vue';
// import Login from '../views/Login.vue';
// import Usuario from '../views/Usuario/Usuario.vue';
// import UsuarioEditar from '../views/Usuario/UsuarioEditar.vue';
// import UsuarioFormasPagamento from '../views/Usuario/UsuarioFormasPagamento.vue';
// import UsuarioPedidos from '../views/Usuario/UsuarioPedidos.vue';
// import UsuarioHistoricoCompras from '../views/Usuario/UsuarioHistoricoCompras.vue';
// import UsuarioFalarComseller from '../views/Usuario/UsuarioFalarComseller.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  // {
  //   path: '*',
  //   component: Page404,
  // },
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  // {
  //   path: '/product/:id',
  //   name: 'product',
  //   component: product,
  //   props: true,
  // },
  // {
  //   path: '/category/:id',
  //   name: 'category',
  //   component: Categoria,
  //   props: true,
  // },
  // {
  //   path: '/store',
  //   name: 'store',
  //   component: Categoria,
  //   props: true,
  // },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: Login,
  // },
  // {
  //   path: '/user',
  //   name: 'user',
  //   component: Usuario,
  //   children: [
  //     {
  //       path: 'edit',
  //       name: 'user-edit',
  //       component: UsuarioEditar,
  //     },
  //     {
  //       path: 'payment',
  //       name: 'user-payment',
  //       component: UsuarioFormasPagamento,
  //     },
  //     {
  //       path: 'orders',
  //       name: 'user-orders',
  //       component: UsuarioPedidos,
  //     },
  //     {
  //       path: 'history',
  //       name: 'user-history',
  //       component: UsuarioHistoricoCompras,
  //     },
  //     {
  //       path: 'talk-to-seller',
  //       name: 'user-talk-to-seller',
  //       component: UsuarioFalarComseller,
  //     },
  //   ],
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
});

export default router;
