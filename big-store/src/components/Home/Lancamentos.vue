<template>
  <v-container>
    <Titulo titulo="Lançamentos que você vai Amar" subtitulo="Confira abaixo as últimas novidades da loja!" />
    <v-row>
      <v-col v-for="produto in produtos" :key="produto.id" class="col-3">
        <Produto :dados="produto" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ProdutosServ from '@/services/produtos';

import Produto from '@/components/Produto.vue';
import Titulo from '@/components/Titulo.vue';

@Component({
  components: {
    Produto,
    Titulo,
  },
})
export default class Lancamentos extends Vue {
  private produtos: object[] = [];

  private getProdutos(): void {
    ProdutosServ.listar(8).then((response) => {
      this.produtos = response.data;
    });
  }

  private created() {
    this.getProdutos();
  }
}
</script>

<style>

</style>