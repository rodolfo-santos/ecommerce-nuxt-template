import Vue from 'vue';
import Vuetify from 'vuetify';
Vue.use(Vuetify);

import { shallowMount } from '@vue/test-utils';
import Home from '@/views/home.vue';
import Banner from '@/components/Home/HomeBanner.vue';
import Categorias from '@/components/Home/HomeCategories.vue';
import DivImage from '@/components/Home/HomeDivImage.vue';
import Lancamentos from '@/components/Home/HomeLaunched.vue';
import Melhoresproducts from '@/components/Home/Melhoresproducts.vue';

describe('Home = Verificando se existem os componentes', () => {
  const wrapper = shallowMount(Home);
  const banner = wrapper.findComponent(Banner);
  const categories = wrapper.findComponent(Categorias);
  const divImage = wrapper.findComponent(DivImage);
  const lancamentos = wrapper.findComponent(Lancamentos);
  const melhoresproducts = wrapper.findComponent(Melhoresproducts);

  it('Deveria retornar o Banner', () => expect(banner.exists()).toBeTruthy());
  it('Deveria retornar a lista de Categorias', () => expect(categories.exists()).toBeTruthy());
  it('Deveria retornar a lista de Lançamentos', () => expect(lancamentos.exists()).toBeTruthy());
  it('Deveria retornar a a imagem promocional', () => expect(divImage.exists()).toBeTruthy());
  it('Deveria retornar a lista de melhores products', () => expect(melhoresproducts.exists()).toBeTruthy());
});
