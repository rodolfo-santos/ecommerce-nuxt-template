<template>
  <v-container>
    <Titulo titulo="Produtos com Preços Incríveis" subtitulo="Produtos separados especialmente para você" />
    <Skeleton :rows="1" :cols="6" v-if="loading" />
    <v-sheet class="bg-transparent" v-else>
      <v-slide-group center-active>
        <v-slide-item v-for="n in produtos.length" :key="n" v-slot="{ toggle }">
          <div @click="toggle">
            <Produto :dados="produtos[n - 1]" width="250" class="mr-2 ml-2" v-if="produtos[n - 1]" />
          </div>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </v-container>
</template>

<script lang="ts" scoped>
import Titulo from '@/components/Titulo.vue';
import { Component, Vue } from 'vue-property-decorator';
import ProdutosServ from '@/services/produtos';
import Produto from '@/components/Produto.vue';
import Skeleton from '@/components/Skeleton/SkeletonProdutoList.vue';

@Component({
  components: {
    Produto,
    Titulo,
    Skeleton,
  },
})
export default class MelhoresProdutos extends Vue {
  private loading: boolean = true;
  private produtos: object[] = [];
  private getProdutos(): void {
    ProdutosServ.listar(8, '', '').then((response) => {
      this.produtos = response.data;
      this.loading = false;
    });
  }

  private async created(): Promise<void> {
    await this.getProdutos();
  }
}
</script>

<style lang="scss"></style>
