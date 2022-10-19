import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';

import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';

const localVue = createLocalVue();

Vue.use(Vuetify);
localVue.use(Vuex);

import LoginForm from '@/components/Usuario/LoginForm.vue';
import RecuperarSenha from '@/components/Usuario/RecuperarSenha.vue';

describe('Formulário Login - Verificando funcionalidade', () => {
  const wrapper: Wrapper<Vue> = shallowMount(LoginForm, {
    propsData: {
      login: {
        email: 'rodolfodossantos29@gmail.com',
        password: '123'
      }
    },
    computed: {
      rules: () => {
        return {
          required: [(v: any) => !!v || 'Este campo obrigatório.'],
          email: [
            (v: string) => !!v || 'Este campo obrigatório.',
            (v: string) => /.+@.+\..+/.test(v) || 'Insira um E-mail Válido.'
          ],
          password: [
            (v: string) => !!v || 'Este campo obrigatório.',
            (v: string) => (v && v.length >= 8) || 'A password precisa ter no mínimo 8 caracteres',
            (v: string) => /(?=.*[a-z])|(?=.*[A-Z])/.test(v) || 'Adicione letras a sua password.',
            (v: string) => /(?=.*\d)/.test(v) || 'Adicione números a sua password.'
          ],
          phone: [
            (v: string) => !!v || 'Este campo obrigatório.',
            (v: string) => /^[0-9]/.test(v) || 'Digite apenas números'
          ],
          cpf: [
            (v: string) => !!v || 'Este campo obrigatório.',
            (v: string) => v.length >= 10 || 'CPF deve possuir no mínimo 10 caracteres.'
          ]
        };
      }
    },
    localVue
  });

  it('Deveria ser corretamente renderizado o component Login', () => {
    expect(wrapper.is(LoginForm)).toBeTruthy();
  });

  it('Deveria existir todos os campos de login existem.', () => {
    expect(wrapper.find('#email').exists()).toBeTruthy();
    expect(wrapper.find('#password').exists()).toBeTruthy();
    expect(wrapper.find('#manter-conectado').exists()).toBeTruthy();
  });

  it('Deveria existir o componente RecuperarSenha', () => {
    const recuperarSenha = wrapper.findComponent(RecuperarSenha);
    expect(recuperarSenha.exists()).toBeTruthy();
  });
});
