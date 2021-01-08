<template>
  <v-container>
    <Titulo titulo="Lançamentos que você vai Amar" subtitulo="Confira abaixo as últimas novidades da loja!" />
    <v-row v-if="produtos.length === 0">
      <v-col>
        <Loading />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col v-for="produto in produtos" :key="produto.id" class="col-12 col-md-3 col-xl-2">
        <Produto :dados="produto" />
      </v-col>
    </v-row>
    <v-row class="flex-center mt-4">
      <v-btn to="/loja">
        Ver Catálogo Completo
      </v-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProdutosServ from '@/services/produtos';

import Produto from '@/components/Produto.vue';
import Titulo from '@/components/Titulo.vue';
import Loading from '@/components/Loading.vue';

@Component({
  components: {
    Produto,
    Titulo,
    Loading,
  },
})
export default class Lancamentos extends Vue {
  private produtos: object[] = [];

  private getProdutos(): void {
    ProdutosServ.listar(12).then((response) => {
      this.produtos = response.data;
    });
  }

  private created(): void {
    this.getProdutos();
  }
}
</script>

<style></style>
