<script lang="ts">
import { IProduct } from '@/models/data';
import { ICartStore } from '@/models/store';
import { cart } from '@/store';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
  @cart.Action public addToCart!: ICartStore['addToCart'];

  @Prop() public readonly product!: IProduct;
  @Prop() public readonly width!: number;
  @Prop() public readonly height!: number;
  public selection: number = 1;
  public btnAddCarrinho = true;

  public addProduct(product: IProduct): void {
    this.addToCart(product);
    this.btnAddCarrinho = false;
    setTimeout(() => {
      this.btnAddCarrinho = true;
    }, 2000);
  }
}
</script>

<template>
  <v-card class="mx-auto my-4" :width="width" :height="height">
    <v-img :src="product.gallery[0]"></v-img>

    <v-card-text align="center">
      <div class="">
        <div class="d-flex justify-center">
          <router-link :to="`/category/${product.categories[n]}`" class="ml-2 text-capitalize link-category text-muted" v-for="n in 3" :key="n">
            {{ product.categories[n] }}
          </router-link>
        </div>
      </div>
      <h2 class="my-3 white--text">
        <router-link :to="{ name: 'product', params: { id: product.id } }">{{ product.name }}</router-link>
      </h2>

      <v-chip-group v-model="selection" active-class="primary" center-active class="chip-product">
        <v-chip v-for="variacao in product.variations" :key="variacao">{{ variacao }}</v-chip>
      </v-chip-group>
      <div class="price mt-4">{{ product.price | numeroPreco }}</div>
    </v-card-text>

    <v-card-actions class="flex-center">
      <v-btn :disabled="!btnAddCarrinho" @click="addProduct(product)" color="primary" text> + Carrinho </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss" scoped>
@import '@/sass/custom.scss';
.price {
  color: #fff;
}

.v-card {
  transition: 1s;
  border: solid $secondary 1px;

  &:hover {
    background-color: lighten($secondary, 2%) !important;
  }
}
</style>
