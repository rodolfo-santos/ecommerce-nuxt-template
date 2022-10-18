<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import { productService } from '@/services/api';
import { TheTitle, ProductCard, SkeletonProductList } from '@/components/utils';
import { IProduct } from '@/models/data';

@Component({ components: { ProductCard, TheTitle, SkeletonProductList } })
export default class extends Vue {
  public loading: boolean = true;
  public products: IProduct[] = [];

  created(): void {
    this.fetchProducts();
  }

  private fetchProducts(): void {
    productService.get(8, '', '').then((response) => {
      this.products = response.data;
      this.loading = false;
    });
  }
}
</script>

<template>
  <v-container>
    <TheTitle title="products com Preços Incríveis" subtitle="produtos separados especialmente para você" />
    <SkeletonProductList :rows="1" :cols="6" v-if="loading" />
    <v-sheet class="bg-transparent" v-else>
      <v-slide-group center-active>
        <v-slide-item v-for="n in products.length" :key="n" v-slot="{ toggle }">
          <div @click="toggle">
            <ProductCard :product="products[n - 1]" width="250" class="mr-2 ml-2" v-if="products[n - 1]" />
          </div>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </v-container>
</template>

<style lang="scss"></style>
