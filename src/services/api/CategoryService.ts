import { $axios } from '~/assets/ts/utils/nuxtInstance';

export class CategoryService {
  public get(limit: number) {
    return $axios.get(`/category/?_limit=${limit}`);
  }

  public filter(filtro: string) {
    return $axios.get(`/category/?q=${filtro}`);
  }

  public getUnique(id: string) {
    return $axios.get(`/category/${id}`);
  }
}
