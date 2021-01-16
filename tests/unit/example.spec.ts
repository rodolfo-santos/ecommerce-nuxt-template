import Vue from 'vue';
import Vuetify from 'vuetify';
Vue.use(Vuetify);

import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';

describe('App.vue', () => {
  it('Testando Component', () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.isVueInstance).toBeTruthy();
  });
});
