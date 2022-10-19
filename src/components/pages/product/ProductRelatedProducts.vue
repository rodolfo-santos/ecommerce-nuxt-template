<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import { productService } from '@/services/api';
import { ProductCard, SkeletonProductList } from '@/components/utils/index';
import { IProduct } from '@/models/data';

@Component({ components: { ProductCard, SkeletonProductList } })
export default class productsRelacionados extends Vue {
  public loading: boolean = true;
  public products: IProduct[] = [];

  async created() {
    this.fetchProducts();
  }

  public fetchProducts(): void {
    productService.get(6, '', '').then((response) => {
      this.products = response.data;
      this.loading = false;
    });
  }
}
</script>

<template>
  <section>
    <SkeletonProductList v-if="loading" :heading="true" :cols="4" :rows="1" />
    <div v-else class="pa-0 py-4">
      <h2>Produtos Relacionados</h2>
      <v-sheet class="bg-transparent">
        <v-slide-group center-active>
          <v-slide-item v-for="n in products.length" :key="n" v-slot="{ toggle }">
            <div @click="toggle">
              <ProductCard :product="products[n - 1]" width="300" class="mr-3 ml-3" v-if="products[n - 1]" />
            </div>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </div>
  </section>
</template>
