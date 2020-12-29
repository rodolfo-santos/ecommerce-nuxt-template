import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      light: {
        primary: '#25af6c',
        secondary: '#222222',
      },
      dark: {
        primary: '#25af6c',
        secondary: '#272727',
      },
    },
  },
});

// Alterar também em ./sass/variaveis.scss
