import { http } from '../config';

export class CategoryService {
  public get(limit: number) {
    return http.get(`/category/?_limit=${limit}`);
  }

  public filter(filtro: string) {
    return http.get(`/category/?q=${filtro}`);
  }

  public getUnique(id: string) {
    return http.get(`/category/${id}`);
  }
}
