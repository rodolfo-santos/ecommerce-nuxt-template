import Login from '@/models/Login';
import Usuario from '@/models/Usuario';
import UsuarioServ from '@/services/usuario';
import { AxiosResponse } from 'axios';

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

    ADD_LOCAL_STORAGE(state) {
      localStorage.setItem('usuario', JSON.stringify(state.usuario));
      localStorage.setItem('logado', JSON.stringify(state.logado));
    },

    REMOVE_LOCAL_STORAGE(){
      localStorage.removeItem('usuario');
      localStorage.removeItem('logado');
    }

  },
  actions: {
    usuarioLocalStorage(context) {
      if (localStorage.getItem('usuario')) {
        context.commit('UPDATE_USUARIO', JSON.parse(localStorage.getItem('usuario')));
        context.commit('UPDATE_LOGIN', JSON.parse(localStorage.getItem('logado')));
      }
    },


    getUsuario(context, dados: Login) {
      return UsuarioServ.getUsuario(dados.email).then((response) => {
        context.commit('UPDATE_USUARIO', response.data);
        context.commit('UPDATE_LOGIN', true);
        context.commit('ADD_LOCAL_STORAGE');
        return response;
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
        telefone: '',
      });
      context.commit('UPDATE_LOGIN', false);
      context.commit('REMOVE_LOCAL_STORAGE');
    },
  },
};
