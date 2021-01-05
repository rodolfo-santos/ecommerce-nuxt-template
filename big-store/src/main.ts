import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.filter('numeroPreco', (valor: any) => {
  valor = Number(valor);
  if (!isNaN(valor)) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  beforeCreate() { this.$store.commit('consultarLocalStorage'); },
}).$mount('#app');
