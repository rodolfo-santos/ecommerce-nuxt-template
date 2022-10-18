import Vue from 'vue';
import Vuex from 'vuex';
import { namespace } from 'vuex-class';

import Alert from './alert';
import Auth from './auth';
import Cart from './cart';
import General from './general';
import User from './user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    alert: Alert,
    auth: Auth,
    cart: Cart,
    general: General,
    user: User,
  },
});

export const alert = namespace('alert');
export const auth = namespace('auth');
export const cart = namespace('cart');
export const general = namespace('general');
export const user = namespace('user');
