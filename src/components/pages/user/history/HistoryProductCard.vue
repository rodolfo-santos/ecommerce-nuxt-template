<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class extends Vue {}
</script>

<template>
  <v-card>
    <div class="d-flex justify-space-between align-center pa-4">
      <div class="d-flex">
        <img
          src="https://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/hoodie_1_front.jpg"
          alt=""
          height="100" />
        <div class="d-flex flex-column justify-space-between pl-2">
          <div class="text-primary">Entregue</div>
          <div>
            <div>Chegou no dia 20 de outubro</div>
            <div>Moletom | Cor: Azul, Tamanho: G</div>
          </div>
        </div>
      </div>
      <v-btn color="primary">Ver Produto</v-btn>
    </div>
  </v-card>
</template>
