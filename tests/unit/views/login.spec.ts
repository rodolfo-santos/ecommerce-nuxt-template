import Vue from 'vue';
import Vuetify from 'vuetify';
Vue.use(Vuetify);

import Login from '@/views/login.vue';
import SubHeader from '@/components/SubHeader.vue';
import LoginForm from '@/components/Usuario/LoginForm.vue';
import UsuarioForm from '@/components/Usuario/UsuarioForm.vue';

import { shallowMount } from '@vue/test-utils';

describe('Login - Verificando se Estão carregando os Components', () => {
  const wrapper = shallowMount(Login);
  it('Deveria Retornar o SubHeader', () => {
    const subheader = wrapper.findComponent(SubHeader);
    expect(subheader.exists()).toBeTruthy();
  });

  it('Deveria Retornar o Formulário de Login', () => {
    const loginForm = wrapper.findComponent(LoginForm);
    expect(loginForm.exists()).toBeTruthy();
  });

  it('Deveria Retornar o Formulário de Cadastro', () => {
    const usuarioForm = wrapper.findComponent(UsuarioForm);
    expect(usuarioForm.exists()).toBeTruthy();
  });
});
