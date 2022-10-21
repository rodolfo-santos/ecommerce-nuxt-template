import { VuexModule } from 'vuex-module-decorators';
import { IAuthStore } from '~/models/store';

export default class Auth extends VuexModule implements IAuthStore {
  isLoggedIn: boolean = true;
}
