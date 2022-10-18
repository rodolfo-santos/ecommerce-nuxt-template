import { IUser } from '@/models/data';
import { http } from '../config';

export class UserService {
  public get(id: string) {
    return http.get(`/user/${id}`);
  }

  public create(user: IUser) {
    return http.post(`/user`, user);
  }

  public update(id: string, user: IUser) {
    return http.put(`/user/${id}`, user);
  }
}
