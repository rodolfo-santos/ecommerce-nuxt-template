import { IAlert } from '@/models/data';
import { Module, Action, Mutation, VuexModule } from 'vuex-module-decorators';
import { IAlertStore } from '@/models/store';

@Module({ namespaced: true, stateFactory: true })
export default class Alert extends VuexModule implements IAlertStore {
  alert: IAlert = {
    variant: 'success',
    message: '',
    isShow: false
  };

  @Mutation
  setProperties(alert: Partial<IAlert>) {
    this.alert = { ...this.alert, ...alert };
  }

  @Action
  showSuccessAlert(message: string) {
    this.context.commit('setProperties', {
      variant: 'success',
      message,
      isShow: true
    });

    console.log('showSuccessAlert');

    setTimeout(() => this.context.commit('setProperties', { isShow: false }), 3000);
  }

  @Action
  showErrorAlert(message: string) {
    this.context.commit('setProperties', {
      variant: 'error',
      message,
      isShow: true
    });

    setTimeout(() => this.context.commit('setProperties', { isShowSuccessAlert: false }), 3000);
  }

  @Action
  showWarningAlert(message: string) {
    this.context.commit('setProperties', {
      variant: 'warning',
      message,
      isShow: true
    });

    setTimeout(() => this.context.commit('setProperties', { isShowSuccessAlert: false }), 3000);
  }
}
