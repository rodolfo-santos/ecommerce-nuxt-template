import { Plugin } from '@nuxt/types';
import { initializeAxios } from '../assets/ts/nuxtInstance';

const accessor: Plugin = ({ app }) => {
  initializeAxios(app.$axios);
};

export default accessor;
