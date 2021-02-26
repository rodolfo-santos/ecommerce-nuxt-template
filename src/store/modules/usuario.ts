import Login from '@/models/Login';
import UsuarioServ from '@/services/usuario';

export default {
  namespaced: true,

  state: {
    alert: false,
    alert_error: false,
    alert_warning: false,
    disabled: false,
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
    SHOW_ALERT(state) {
      state.alert = true;
      setTimeout(() => {
        state.alert = false;
      }, 3000);
    },

    SHOW_ALERT_ERROR(state) {
      state.alert_error = true;
      setTimeout(() => {
        state.alert_error = false;
      }, 3000);
    },

    SHOW_ALERT_WARNING(state) {
      state.alert_warning = true;
      setTimeout(() => {
        state.alert_warning = false;
      }, 3000);
    },

    DISABLED_FORM(state) {
      state.disabled = !state.disabled;
    },

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

    REMOVE_LOCAL_STORAGE() {
      localStorage.removeItem('usuario');
      localStorage.removeItem('logado');
    },
  },

  actions: {
    usuarioLocalStorage(context) {
      if (localStorage.getItem('usuario')) {
        context.commit('UPDATE_USUARIO', JSON.parse(localStorage.getItem('usuario')));
        context.commit('UPDATE_LOGIN', JSON.parse(localStorage.getItem('logado')));
      }
    },

    getUsuario(context, dados: Login) {
      return UsuarioServ.getUsuario(dados.email)
        .then((response) => {
          context.commit('UPDATE_USUARIO', response.data);
          context.commit('UPDATE_LOGIN', true);
          context.commit('ADD_LOCAL_STORAGE');
          return response;
        })
        .catch(() => {
          context.commit('SHOW_ALERT_WARNING');
        });
    },

    async criarUsuario(context, usuario) {
      let check = false;
      context.commit('geral/SHOW_SAVING', null, { root: true });
      context.commit('DISABLED_FORM');
      usuario = Object.assign(usuario, { id: usuario.email });
      await UsuarioServ.criar(usuario)
        .then(() => {
          context.commit('geral/HIDE_SAVING', null, { root: true });
          context.commit('DISABLED_FORM');
          check = true;
        })
        .catch(() => {
          context.commit('geral/HIDE_SAVING', null, { root: true });
          context.commit('DISABLED_FORM');
          context.commit('SHOW_ALERT_ERROR');
        });
      return check;
    },

    atualizarUsuario(context, usuario) {
      context.commit('geral/SHOW_SAVING', null, { root: true });
      context.commit('DISABLED_FORM');
      setTimeout(() => {
        UsuarioServ.atualizar(usuario.id, usuario)
          .then(() => {
            context.commit('geral/HIDE_SAVING', null, { root: true });
            context.commit('DISABLED_FORM');
            context.commit('UPDATE_USUARIO', usuario);
            context.commit('SHOW_ALERT');
          })
          .catch(() => {
            context.commit('geral/HIDE_SAVING', null, { root: true });
            context.commit('DISABLED_FORM');
            context.commit('SHOW_ALERT_ERROR');
          });
      }, 2000);
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
