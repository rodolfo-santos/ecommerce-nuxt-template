<template>
  <section>
    <Skeleton v-if="loading" :heading="true" :cols="4" :rows="1" />
    <div v-else class="pa-0 py-4">
      <h2>products Relacionados</h2>
      <v-sheet class="bg-transparent">
        <v-slide-group center-active>
          <v-slide-item v-for="n in products.length" :key="n" v-slot="{ toggle }">
            <div @click="toggle">
              <product :dados="products[n - 1]" width="300" class="mr-3 ml-3" v-if="products[n - 1]" />
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
import productsServ from '@/services/products';
import product from '@/components/product.vue';
import Skeleton from '@/components/Skeleton/SkeletonproductList.vue';

@Component({
  components: {
    product,
    Titulo,
    Skeleton,
  },
})
export default class productsRelacionados extends Vue {
  public loading: boolean = true;
  public products: object[] = [];
  public getproducts(): void {
    productsServ.listar(6, '', '').then((response) => {
      this.products = response.data;
      this.loading = false;
    });
  }

  public async created(): Promise<void> {
    await this.getproducts();
  }
}
</script>

<style lang="scss"></style>
