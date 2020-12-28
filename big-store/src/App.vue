<template>
  <v-app>
    <Header />
    <transition name="fade" mode="out-in" appear>
      <router-view class="conteudo-view"></router-view>
      a
    </transition>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

@Component({
  components: {
    Header,
    Footer,
  },
})
export default class App extends Vue {

}
</script>

<style lang="scss">
@import '@/sass/variaveis.scss';
@import '@/sass/custom.scss';


a {
  text-decoration: none;
}

.conteudo-view {
  margin-top: $header-margin;
  min-height: 110vh;
}

::-webkit-scrollbar {
    width: 10px;
    background-color: $secondary;
}

::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 0px;
}

::-webkit-scrollbar-thumb {
    background-color: $primary;
    border-radius: 4px;
    box-shadow: inset 0 0 4px #000;
}

</style>