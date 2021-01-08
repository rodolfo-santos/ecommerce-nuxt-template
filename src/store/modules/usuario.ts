import Login from '@/models/Login';
import Usuario from '@/models/Usuario';
import UsuarioServ from '@/services/usuario';

export default {
  namespaced: true,

  state: {
    usuario: {
      id: '',
      nome: '',
      email: '',
      cpf: '',
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
    UPDATE_LOGIN(state, bol) {
      state.logado = bol;
    },

    UPDATE_USUARIO(state, dados) {
      state.usuario = Object.assign(state.usuario, dados);
    },
  },
  actions: {
    getUsuario(context, dados: Login) {
      return UsuarioServ.getUsuario(dados.email).then((response) => {
        context.commit('UPDATE_USUARIO', response.data);
        context.commit('UPDATE_LOGIN', true);
      });
    },

    criarUsuario(context, usuario) {
      usuario = Object.assign(usuario, { id: usuario.email })
      return UsuarioServ.criar(usuario);
    },

    deslogarUsuario(context) {
      context.commit('UPDATE_USUARIO', {
        id: '',
        nome: '',
        cpf: '',
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
