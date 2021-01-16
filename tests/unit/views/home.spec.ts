import Vue from 'vue';
import Vuetify from 'vuetify';
Vue.use(Vuetify);

import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';

describe('Home = Verificando se existem os componentes', () => {
  const wrapper = shallowMount(Home);
  it('Deveria retornar o Banner', () => {
    expect(wrapper.html().includes('<banner-stub>')).toBeTruthy();
  });

  it('Deveria retornar a lista de Categorias', () => {
    expect(wrapper.html().includes('<categorias-stub>')).toBeTruthy();
  });

  it('Deveria retornar a lista de Lancamentos', () => {
    expect(wrapper.html().includes('<lancamentos-stub>')).toBeTruthy();
  });

  it('Deveria retornar a imagem promocional', () => {
    expect(wrapper.html().includes('<divimage-stub>')).toBeTruthy();
  });

  it('Deveria retornar a lista de melhores produtos', () => {
    expect(wrapper.html().includes('<melhoresprodutos-stub>')).toBeTruthy();
  });

});
