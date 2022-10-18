<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { TheHeader, TheFooter } from '@/components/layouts/marketplace';
import { Alert } from '@/components/utils';
import { cart } from '@/store';
import { ICartStore } from '@/models/store';

@Component({ components: { TheHeader, TheFooter, Alert } })
export default class extends Vue {
  @cart.Action public readonly getCartOfLocalStorage!: ICartStore['getCartOfLocalStorage'];

  created() {
    this.getCartOfLocalStorage();
  }
}
</script>

<template>
  <v-app>
    <TheHeader />
    <transition name="fade" mode="out-in" appear>
      <router-view class="content-view"></router-view>
    </transition>
    <TheFooter />
    <Alert />
  </v-app>
</template>

<style lang="scss">
@import '@/sass/custom.scss';

a {
  text-decoration: none;
  transition: 0.25s;
  &:hover {
    color: lighten($primary, 10%) !important;
  }
}

.content-view {
  margin-top: $header-margin;
  min-height: 88vh;
}

::-webkit-scrollbar {
  width: 10px;
  background-color: $secondary;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 0px;
}

::-webkit-scrollbar-thumb {
  background-color: $primary;
  border-radius: 4px;
  box-shadow: inset 0 0 4px #000;
}

/* Cor de fundo do autocomplete */
input:-webkit-autofill {
  box-shadow: 0 0 0 30px #000 inset;
}

/* Cor do texto do autocomplete */
input:-webkit-autofill {
  -webkit-text-fill-color: $primary !important;
}

/* Remover botoes do InputNumber */
input[type='number'] {
  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}

.chip-product .v-slide-group__content {
  justify-content: center;
}
</style>
