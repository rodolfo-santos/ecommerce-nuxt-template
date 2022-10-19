import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
// import { Home, Category, Product, Cart, Payment, Login, User, NotFound } from '@/pages';
import { Home, Category, Product, Login, User, NotFound } from '@/pages';
import { UserEdit, UserHistory, UserOrders, UserPayment, UserTalkToSeller } from '@/pages/user/index';

Vue.use(VueRouter);

type Route = RouteConfig & { layout?: string };

export const routes: Route[] = [
  {
    path: '*',
    component: NotFound,
    layout: 'blank'
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    layout: 'marketplace'
  },
  {
    path: '/store',
    name: 'store',
    component: Category,
    props: true,
    layout: 'marketplace'
  },
  {
    path: '/category/:id',
    name: 'category',
    component: Category,
    props: true,
    layout: 'marketplace'
  },
  {
    path: '/product/:id',
    name: 'product',
    component: Product,
    props: true,
    layout: 'marketplace'
  },
  // {
  //   path: '/cart',
  //   name: 'cart',
  //   component: Cart,
  //   layout: 'checkout',
  // },
  // {
  //   path: '/payment',
  //   name: 'payment',
  //   component: Payment,
  //   layout: 'checkout',
  // },
  {
    path: '/login',
    name: 'login',
    component: Login,
    layout: 'marketplace'
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    layout: 'marketplace',
    children: [
      {
        path: '',
        redirect: { name: 'user-edit' }
      },
      {
        path: 'edit',
        name: 'user-edit',
        component: UserEdit
      },
      {
        path: 'payment',
        name: 'user-payment',
        component: UserPayment
      },
      {
        path: 'orders',
        name: 'user-orders',
        component: UserOrders
      },
      {
        path: 'history',
        name: 'user-history',
        component: UserHistory
      },
      {
        path: 'talk-to-seller',
        name: 'user-talk-to-seller',
        component: UserTalkToSeller
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

export default router;
