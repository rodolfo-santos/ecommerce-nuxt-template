<script lang="ts" scoped>
import { Component, Vue } from 'nuxt-property-decorator';
import { productService } from '~/services/api';
import { TheTitle, ProductCard } from '~/components/utils';
import { IProduct } from '~/models/data';

@Component({ components: { ProductCard, TheTitle } })
export default class extends Vue {
  public isLoading: boolean = true;
  public products: IProduct[] = [];

  async fetch() {
    const { data } = await productService.get({ _limit: 8 });
    this.products = data;
  }
}
</script>

<template>
  <v-container>
    <TheTitle title="Produtos com Preços Incríveis" subtitle="produtos separados especialmente para você" />
    <v-sheet class="bg-transparent">
      <v-slide-group center-active>
        <v-slide-item v-for="n in products.length" :key="n" v-slot="{ toggle }">
          <div @click="toggle">
            <ProductCard v-if="products[n - 1]" :product="products[n - 1]" width="250" class="mr-2 ml-2" />
          </div>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </v-container>
</template>
