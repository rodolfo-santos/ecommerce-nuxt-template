<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { productService } from '~/services/api';

import { TheTitle, SkeletonProductList, ProductCard } from '~/components/utils';
import { IProduct } from '~/models/data';

@Component({ components: { ProductCard, TheTitle, SkeletonProductList } })
export default class extends Vue {
  public products: IProduct[] = [];

  async fetch() {
    const { data } = await productService.get({ _limit: 12 });
    this.products = data;
  }
}
</script>

<template>
  <v-container>
    <TheTitle title="Lançamentos que você vai Amar" subtitle="Confira abaixo as últimas novidades da loja!" />
    <v-row>
      <v-col v-for="product in products" :key="product.id" class="col-12 col-md-3 col-xl-2">
        <ProductCard :product="product" />
      </v-col>
    </v-row>
    <v-row class="flex-center mt-4">
      <v-btn to="/category"> Ver Catálogo Completo </v-btn>
    </v-row>
  </v-container>
</template>
