<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { productService } from '@/services/api';

import { ProductCard } from '@/components';
import { TheTitle } from '@/components';
import { SkeletonProductList } from '@/components/Skeleton';
import { IProduct } from '@/models/data';

@Component({ components: { ProductCard, TheTitle, SkeletonProductList } })
export default class extends Vue {
  public loading: boolean = true;
  public products: IProduct[] = [];

  created(): void {
    this.fetchProducts();
  }

  private fetchProducts(): void {
    productService.get(12, '', '').then((response) => {
      this.products = response.data;
      this.loading = false;
    });
  }
}
</script>

<template>
  <v-container>
    <TheTitle title="Lançamentos que você vai Amar" subtitle="Confira abaixo as últimas novidades da loja!" />
    <v-row v-if="loading">
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
