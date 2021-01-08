import { http } from './config';

export default {
  listar: (limit: number | null, query: string | null, categoria: string ) => {
    let limitQuery: string = limit === null ? '' : `_limit=${limit}`
    return http.get(`produto/?q=${categoria}&${limitQuery}${query}`);
  },

  produto_unico: (id: string) => {
    return http.get(`/produto/${id}`);
  },
};
