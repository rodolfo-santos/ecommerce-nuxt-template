import { IUser } from '~/models/data';

export interface IUserStore {
  user: IUser;
  setUser(user: IUser): void;
}
