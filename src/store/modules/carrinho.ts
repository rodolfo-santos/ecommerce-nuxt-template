export default {
  namespaced: true,

  state: {
    alert: false,
    alert_error: false,
    itens: [],
  },

  mutations: {
    SHOW_ALERT(state) {
      state.alert = true;
      setTimeout(() => { state.alert = false; }, 3000);      
    },

    SHOW_ALERT_ERROR(state) {
      state.alert_error = true;
      setTimeout(() => { state.alert = false; }, 3000);      
    },

    UPDATE_CARRINHO(state, carrinho) {
      state.itens = carrinho;
    },

    INSERT_CARRINHO(state, produto) {
      state.itens.push(produto);
      localStorage.setItem('carrinho', JSON.stringify(state.itens));
    },

    DELETE_CARRINHO(state, index) {
      state.itens.splice(index, 1);
      localStorage.setItem('carrinho', JSON.stringify(state.itens));
    },

    DELETE_ALL_CARRINHO(state) {
      state.itens = [];
      localStorage.setItem('carrinho', JSON.stringify(state.itens));
    },
  },

  actions: {
    carrinhoLocalStorage(context) {
      if (localStorage.getItem('carrinho')) {
        context.commit('UPDATE_CARRINHO', JSON.parse(localStorage.getItem('carrinho')));
      }
    },

    esvaziarCarrinho(context) {
      context.commit('DELETE_ALL_CARRINHO');
    },

    removerCarrinho(context, index) {
      context.commit('DELETE_CARRINHO', index);
    },

    addCarrinho(context, produto) {
      context.commit('INSERT_CARRINHO', produto);
      context.commit('SHOW_ALERT');
    },
  },
};
