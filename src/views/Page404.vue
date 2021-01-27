<template>
  <v-main>
    <v-container>
      <div class="bloco">
        <img :src="img404" alt="404" />
        <strong class="mt-4">Opa, não conseguimos encontrar o que você está procurando.</strong>
        <p>Verifique o link que você está tentando acessar.</p>
        <v-btn link :to="{ name: 'Home' }">Voltar para a Home</v-btn>
      </div>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Page404 extends Vue {
  public img404: string = require('../assets/imagens/404.svg');
}
</script>

<style lang="scss" scoped>
@import '@/sass/custom.scss';

.bloco {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  strong {
    font-size: 1.5em;
  }

  p {
    font-size: 1.2em;
  }

  img {
    width: 100%;
    max-width: 500px;
  }
}
</style>
