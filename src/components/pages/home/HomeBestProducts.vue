<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import { productService } from '@/services/api';
import { TheTitle, ProductCard, SkeletonProductList } from '@/components/utils';
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
      const { data } = await productService.get(8, '', '');
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
    <TheTitle title="Produtos com Preços Incríveis" subtitle="produtos separados especialmente para você" />
    <SkeletonProductList :rows="1" :cols="6" v-if="isLoading" />
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
