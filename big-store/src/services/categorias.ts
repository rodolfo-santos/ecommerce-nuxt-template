import { http } from './config';

export default {
  listar: (limit: number) => {
    return http.get(`/categoria?_limit=${limit}`);
  },
};
