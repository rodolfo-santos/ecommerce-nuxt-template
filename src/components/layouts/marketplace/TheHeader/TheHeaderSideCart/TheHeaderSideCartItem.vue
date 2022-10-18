<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IProduct } from '@/models/data';
import { ICartStore } from '@/models/store';
import { cart } from '@/store';

@Component
export default class extends Vue {
  @cart.Action public removeFromCart!: ICartStore['removeFromCart'];
  @Prop() public readonly product!: IProduct;
  @Prop() public readonly index!: number;
}
</script>

<template>
  <v-card class="pa-2">
    <v-row>
      <v-col class="col-4 flex-center">
        <v-img :src="product.gallery[0]"></v-img>
      </v-col>
      <v-col class="col-8">
        <h3 class="my-3 white--text">
          <router-link :to="{ name: 'product', params: { id: product.id } }">{{ product.name }}</router-link>
        </h3>
        <p>{{ product.price | numeroPreco }}</p>

        <div class="d-flex justify-end">
          <v-btn color="primary" text @click="removeFromCart(index)"> Remover </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<style lang="scss" scoped>
@import '@/sass/variaveis';

.v-card {
  transition: 1s;
  border: solid $secondary 1px;

  &:hover {
    background-color: lighten($secondary, 2%) !important;
  }
}
</style>
