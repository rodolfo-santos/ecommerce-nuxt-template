import { http } from './config';

export default {
  listar: (limit: number) => {
    return http.get(`/produto?_limit=${limit}`);
  },
};
