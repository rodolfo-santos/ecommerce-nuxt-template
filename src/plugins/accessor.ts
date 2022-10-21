import { Plugin } from '@nuxt/types';
import { initializeAxios } from '../assets/ts/utils/nuxtInstance';

const accessor: Plugin = ({ app }) => {
  initializeAxios(app.$axios);
};

export default accessor;
