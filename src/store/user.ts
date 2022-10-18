import { Module, Mutation, VuexModule } from 'vuex-module-decorators';

import { IUser } from '@/models/data';
import { IUserStore } from '@/models/store';

@Module({ namespaced: true, stateFactory: true })
export default class User extends VuexModule implements IUserStore {
  user: IUser = {
    id: '',
    name: '',
    email: '',
    cpf: '',
    password: '',
    cep: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    phone: '',
  };

  @Mutation
  setUser(user: IUser) {
    this.user = user;
  }
}
