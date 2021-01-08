import { http } from './config';

export default {
  getUsuario: (id) => {
    return http.get(`/usuario/${id}`);
  },

  criar: (obj) => {
    return http.post(`/usuario`, obj);
  },

  atualizar: (id, obj) => {
    return http.put(`/usuario/${id}`, obj);
  },
};
