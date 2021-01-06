import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tituloApp: 'Trade Center',
    carrinhoAlert: false,
    carrinho: [],
    usuario: 'Entrar / Cadastrar',
    logado: false,
  },
  mutations: {
    consultarLocalStorage(state) {
      if (localStorage.getItem('carrinho')) {
        state.carrinho = JSON.parse(localStorage.getItem('carrinho'));
      }
    },

    addCarrinho(state, produto) {
      state.carrinho.push(produto);
      state.carrinhoAlert = true;
      localStorage.setItem('carrinho', JSON.stringify(state.carrinho));
      setTimeout(() => {
        state.carrinhoAlert = false;
      }, 2000);
    },

    removerCarrinho(state, index) {
      state.carrinho.splice(index, 1);
      localStorage.setItem('carrinho', JSON.stringify(state.carrinho));
    },

    esvaziarCarrinho(state) {
      state.carrinho = [];
      localStorage.setItem('carrinho', JSON.stringify(state.carrinho));
    },
  },
  actions: {
  },
  modules: {
  },
});
