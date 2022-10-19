<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { productService } from '@/services/api';

import { ProductCard } from '@/components/utils';
import { TheTitle } from '@/components/utils';
import { SkeletonProductList } from '@/components/utils';
import { IProduct } from '@/models/data';

@Component({ components: { ProductCard, TheTitle, SkeletonProductList } })
export default class extends Vue {
  public isLoading: boolean = true;
  public products: IProduct[] = [];

  created(): void {
    this.fetchProducts();
  }

  private async fetchProducts(): Promise<void> {
    this.isLoading = true;
    try {
      const { data } = await productService.get(12, '', '');
      this.products = data;
    } catch (error) {
      console.error(error);
    }
    this.isLoading = false;
  }
}
</script>

<template>
  <v-container>
    <TheTitle title="Lançamentos que você vai Amar" subtitle="Confira abaixo as últimas novidades da loja!" />
    <v-row v-if="isLoading">
      <v-col>
        <SkeletonProductList :cols="6" :rows="2" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col v-for="product in products" :key="product.id" class="col-12 col-md-3 col-xl-2">
        <ProductCard :product="product" />
      </v-col>
    </v-row>
    <v-row class="flex-center mt-4">
      <v-btn to="/loja"> Ver Catálogo Completo </v-btn>
    </v-row>
  </v-container>
</template>
