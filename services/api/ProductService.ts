import { http } from '../config';
import { IProductQuery } from '~/models/data';
import { objectToQuery } from '~/assets/ts';

export class ProductService {
  public get(query: IProductQuery) {
    return http.get(`product/${objectToQuery(query)}`);
  }

  public getUnique(id: string) {
    return http.get(`/product/${id}`);
  }
}
