import Vue from 'vue';
import Vuex from 'vuex';

import geral from './modules/geral';
import carrinho from './modules/carrinho';
import usuario from './modules/usuario';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    geral,
    carrinho,
    usuario,
  },
});
