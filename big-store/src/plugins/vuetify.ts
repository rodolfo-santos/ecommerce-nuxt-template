import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      light: {
        primary: '#16D17E',
        secondary: '#222222',
      },
      dark: {
        primary: '#16D17E',
        secondary: '#272727',
      },
    },
  },
});

// Alterar também em ./sass/variaveis.scss
