<template>
  <v-parallax
    :src="require('@/assets/imagens/jeans_banner.jpg')"
    height="350"
    class="flex-center bloco"
  >
    <div class="text-center">
      <span class="text-upper">Nova Coleção</span>
      <h2 class="text-upper">Moda Jeans Premium</h2>
      <p>De uma olhada em nossas novidades, acesse nosso catálogo agora.</p>
      <v-btn>Confira Agora</v-btn>
    </div>
  </v-parallax>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DivImage extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/sass/custom.scss';

.bloco {
  margin-top: 50px;
  border-top: $primary solid 5px;
  border-bottom: $primary solid 5px;
}

span {
  font-size: 1.5em;
}

h2 {
  font-size: 2em;
}
</style>
