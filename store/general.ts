import { Module, Mutation, VuexModule } from 'vuex-module-decorators';

@Module({ namespaced: true, stateFactory: true })
export default class General extends VuexModule {
  saving = false;
  appTitle = 'Trade Center';

  @Mutation
  SHOW_SAVING() {
    this.saving = true;
  }

  @Mutation
  HIDE_SAVING() {
    this.saving = false;
  }
}
