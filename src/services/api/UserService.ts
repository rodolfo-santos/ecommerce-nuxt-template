import { IUser } from '~/models/data';
import { $axios } from '~/assets/ts/nuxtInstance';

export class UserService {
  public get(id: string) {
    return $axios.get(`/user/${id}`);
  }

  public create(user: IUser) {
    return $axios.post(`/user`, user);
  }

  public update(id: string, user: IUser) {
    return $axios.put(`/user/${id}`, user);
  }
}
