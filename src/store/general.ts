import { Module, Mutation, VuexModule } from 'vuex-module-decorators';

@Module({ namespaced: true, stateFactory: true })
export default class General extends VuexModule {
  saving = false;
  appTitle = 'Trade Center';
  rules = {
    required: [(v: any) => !!v || 'Este campo obrigatório.'],
    email: [(v: string) => !!v || 'Este campo obrigatório.', (v: string) => /.+@.+\..+/.test(v) || 'Insira um E-mail Válido.'],
    password: [
      (v: string) => !!v || 'Este campo obrigatório.',
      (v: string) => (v && v.length >= 8) || 'A password precisa ter no mínimo 8 caracteres',
      (v: string) => /(?=.*[a-z])|(?=.*[A-Z])/.test(v) || 'Adicione letras a sua password.',
      (v: string) => /(?=.*\d)/.test(v) || 'Adicione números a sua password.',
    ],
    phone: [(v: string) => !!v || 'Este campo obrigatório.', (v: string) => /^[0-9]/.test(v) || 'Digite apenas números'],
    cpf: [(v: string) => !!v || 'Este campo obrigatório.', (v: string) => v.length >= 10 || 'CPF deve possuir no mínimo 10 caracteres.'],
  };
  @Mutation
  SHOW_SAVING() {
    this.saving = true;
  }

  @Mutation
  HIDE_SAVING() {
    this.saving = false;
  }
}
