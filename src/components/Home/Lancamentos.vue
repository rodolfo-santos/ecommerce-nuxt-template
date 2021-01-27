<template>
  <v-container>
    <Titulo titulo="Lançamentos que você vai Amar" subtitulo="Confira abaixo as últimas novidades da loja!" />
    <v-row v-if="loading">
      <v-col>
        <Skeleton :cols="6" :rows="2" />
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
import Skeleton from '@/components/Skeleton/SkeletonProdutoList.vue';

@Component({
  components: {
    Produto,
    Titulo,
    Skeleton,
  },
})
export default class Lancamentos extends Vue {
  public loading: boolean = true;
  public produtos: object[] = [];
  public getProdutos(): void {
    ProdutosServ.listar(12, '', '').then((response) => {
      this.produtos = response.data;
      this.loading = false;
    });
  }

  public async created(): Promise<void> {
    await this.getProdutos();
  }
}
</script>

<style></style>
