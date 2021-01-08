import UsuarioServ from '@/services/usuario';

export default {
  namespaced: true,

  state: {
    usuario: {
      id: '',
      nome: '',
      email: '',
      senha: '',
      cep: '',
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
    },
    logado: false,
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.logado = payload;
    },

    UPDATE_USUARIO(state, payload) {
      state.usuario = Object.assign(state.usuario, payload);
    },
  },
  actions: {
    getUsuario(context, payload) {
      return UsuarioServ.getUsuario(payload).then((response) => {
        context.commit('UPDATE_USUARIO', response.data);
        context.commit('UPDATE_LOGIN', true);
      });
    },

    criarUsuario(context, payload) {
      context.commit('UPDATE_USUARIO', { id: payload.email });
      return UsuarioServ.criar(payload);
    },

    deslogarUsuario(context) {
      context.commit('UPDATE_USUARIO', {
        id: '',
        nome: '',
        email: '',
        senha: '',
        cep: '',
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
      });
      context.commit('UPDATE_LOGIN', false);
    },
  },
};
