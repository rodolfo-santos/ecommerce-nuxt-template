<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { cart } from '@/store';
import { ICartStore } from '@/models/store';

@Component
export default class extends Vue {
  @cart.Getter public readonly productListLength!: ICartStore['productListLength'];
}
</script>

<template>
  <div class="cart flex-center">
    <v-btn @click.stop="$emit('click')">
      <v-icon left>mdi-cart</v-icon>
      {{ productListLength }}
    </v-btn>
  </div>
</template>
