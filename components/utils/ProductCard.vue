<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { IProduct } from '~/models/data';
import { ICartStore } from '~/models/store';
import { cart } from '~/store';

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
          <nuxt-link
            v-for="n in 3"
            :key="n"
            :to="`/category/${product.categories[n]}`"
            class="ml-2 text-capitalize link-category text-muted">
            {{ product.categories[n] }}
          </nuxt-link>
        </div>
      </div>
      <h2 class="my-3 white--text">
        <nuxt-link :to="`/product/${product.id}`">{{ product.name }}</nuxt-link>
      </h2>

      <v-chip-group v-model="selection" active-class="primary" center-active class="chip-product">
        <v-chip v-for="variacao in product.variations" :key="variacao">{{ variacao }}</v-chip>
      </v-chip-group>
      <div class="price mt-4">{{ product.price | currencyBRL }}</div>
    </v-card-text>

    <v-card-actions class="flex-center">
      <v-btn color="primary" text :disabled="!btnAddCarrinho" @click="addProduct(product)"> + Carrinho </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss" scoped>
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
