<template>
  <section>
    <Skeleton v-if="loading" :heading="true" :cols="4" :rows="1" />
    <div v-else class="pa-0 py-4">
      <h2>Produtos Relacionados</h2>
      <v-sheet class="bg-transparent">
        <v-slide-group center-active>
          <v-slide-item v-for="n in produtos.length" :key="n" v-slot="{ toggle }">
            <div @click="toggle">
              <Produto :dados="produtos[n - 1]" width="300" class="mr-3 ml-3" v-if="produtos[n - 1]" />
            </div>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </div>
  </section>
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
export default class ProdutosRelacionados extends Vue {
  private loading: boolean = true;
  private produtos: object[] = [];
  private getProdutos(): void {
    ProdutosServ.listar(6, '', '').then((response) => {
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
