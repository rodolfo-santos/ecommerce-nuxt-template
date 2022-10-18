<script lang="ts">
import { ICartStore } from '@/models/store';
import { cart } from '@/store';
import { Vue, Component, VModel } from 'vue-property-decorator';
import { TheHeaderSideCartItem } from './TheHeaderSideCart/index';

@Component({ components: { TheHeaderSideCartItem } })
export default class extends Vue {
  @cart.Getter public readonly isEmptyCart!: ICartStore['isEmptyCart'];
  @cart.Getter public readonly cartTotalValue!: ICartStore['cartTotalValue'];
  @cart.State public readonly productList!: ICartStore['productList'];
  @cart.Action public emptyCart!: ICartStore['emptyCart'];
  @VModel({ type: Boolean }) public readonly show!: boolean;
}
</script>

<template>
  <v-navigation-drawer v-model="show" fixed bottom right temporary width="400" class="cart-menu">
    <v-container id="scroll-target" class="overflow-y-auto cart-product-list">
      <div v-if="isEmptyCart" class="cart-empty">
        <p>Seu cart ainda está vazio,</p>
        <router-link :to="{ name: 'store' }">Visite nossa loja</router-link>
      </div>
      <transition-group name="fade" mode="out-in">
        <TheHeaderSideCartItem v-for="(product, index) in productList" :key="index + 1" :product="product" :index="index" class="mb-1" />
      </transition-group>
    </v-container>

    <v-card class="pa-5 cart-footer">
      <div class="text-center cart-total"><strong>Total:</strong> {{ cartTotalValue | numeroPreco }}</div>
      <v-row>
        <v-col class="col-6 p-2">
          <v-btn color="" width="100%"> Finalizar </v-btn>
        </v-col>
        <v-col class="col-6 p-2">
          <v-btn color="error" width="100%" @click="emptyCart">Esvaziar</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-navigation-drawer>
</template>

<style scoped lang="scss">
@import '@/sass/custom.scss';

.cart-product-list {
  background: darken($secondary, 10%);
  height: 85%;
  @media (max-width: $bk-md) {
    max-height: 70%;
  }
}

.cart-empty {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
}

.cart-footer {
  display: flex;
  flex-direction: column;
  background-color: darken($secondary, 5%);
  border-top: $primary solid 5px;
  height: 100%;
  max-height: 15%;

  @media (max-width: $bk-md) {
    max-height: 30%;
  }

  .row {
    align-items: flex-end;
  }
}
</style>
