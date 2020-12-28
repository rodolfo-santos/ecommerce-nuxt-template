import { http } from './config';

export default {
  listar: (limit: number) => {
    return http.get(`/produto?_limit=${limit}`);
  },

  produto_unico: (id: string) => {
    return http.get(`/produto/${id}`);
  },
};
