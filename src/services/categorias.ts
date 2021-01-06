import { http } from './config';

export default {
  listar: (limit: number) => {
    return http.get(`/categoria/?_limit=${limit}`);
  },

  filtrar: (filtro: string) => {
    return http.get(`/categoria/?q=${filtro}`);
  },

  categoria_unica: (id: string) => {
    return http.get(`/categoria/${id}`);
  },
};
