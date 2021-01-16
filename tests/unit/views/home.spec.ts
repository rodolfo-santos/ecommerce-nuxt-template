import Vue from 'vue';
import Vuetify from 'vuetify';
Vue.use(Vuetify);

import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';
import Banner from '@/components/Home/Banner.vue';
import Categorias from '@/components/Home/Categorias.vue';
import DivImage from '@/components/Home/DivImage.vue';
import Lancamentos from '@/components/Home/Lancamentos.vue';
import MelhoresProdutos from '@/components/Home/MelhoresProdutos.vue';

describe('Home = Verificando se existem os componentes', () => {
  const wrapper = shallowMount(Home);
  const banner = wrapper.findComponent(Banner);
  const categorias = wrapper.findComponent(Categorias);
  const divImage = wrapper.findComponent(DivImage);
  const lancamentos = wrapper.findComponent(Lancamentos);
  const melhoresProdutos = wrapper.findComponent(MelhoresProdutos)

  it('Deveria retornar o Banner', () => expect(banner.exists()).toBeTruthy());
  it('Deveria retornar a lista de Categorias', () => expect(categorias.exists()).toBeTruthy());
  it('Deveria retornar a lista de Lançamentos', () => expect(lancamentos.exists()).toBeTruthy());
  it('Deveria retornar a a imagem promocional', () => expect(divImage.exists()).toBeTruthy());
  it('Deveria retornar a lista de melhores produtos', () => expect(melhoresProdutos.exists()).toBeTruthy());
});
