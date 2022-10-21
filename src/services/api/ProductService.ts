import { $axios } from '~/assets/ts/utils/nuxtInstance';
import { IProductQuery } from '~/models/data';
import { objectToQuery } from '~/assets/ts/utils';

export class ProductService {
  public get(query: IProductQuery) {
    return $axios.get(`product/${objectToQuery(query)}`);
  }

  public getUnique(id: string) {
    return $axios.get(`/product/${id}`);
  }
}
