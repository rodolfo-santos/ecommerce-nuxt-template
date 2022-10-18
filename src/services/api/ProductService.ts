import { http } from '../config';

export class ProductService {
  public get(limit: number | null, query: string | null, category: string) {
    let limitQuery: string = limit === null ? '' : `_limit=${limit}`;
    return http.get(`product/?q=${category}&${limitQuery}${query}`);
  }

  public getUnique(id: string) {
    return http.get(`/product/${id}`);
  }
}
