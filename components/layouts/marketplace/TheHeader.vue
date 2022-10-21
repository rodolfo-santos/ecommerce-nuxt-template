<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import {
  TheHeaderLogo,
  TheHeaderInputSearch,
  TheHeaderMobileMenuContent,
  TheHeaderSideCart,
  TheHeaderCartButton,
  TheHeaderUserButton
} from './TheHeader/index';
import { categoryService } from '~/services/api';
import { ICategory } from '~/models/data';

@Component({
  components: {
    TheHeaderLogo,
    TheHeaderInputSearch,
    TheHeaderMobileMenuContent,
    TheHeaderSideCart,
    TheHeaderCartButton,
    TheHeaderUserButton
  }
})
export default class extends Vue {
  public categories: ICategory[] = [];
  public isShowSideCart: boolean = false;
  public isShowMobileMenu: boolean = false;

  created() {
    this.fetchCategories();
  }

  private fetchCategories(): void {
    categoryService.get(10).then(({ data }) => (this.categories = data));
  }
}
</script>

<template>
  <nav>
    <v-app-bar fixed class="app-bar">
      <v-app-bar-nav-icon class="d-md-none" @click.stop="isShowMobileMenu = !isShowMobileMenu"></v-app-bar-nav-icon>
      <TheHeaderLogo />
      <v-spacer></v-spacer>
      <TheHeaderInputSearch :categories="categories" />
      <TheHeaderCartButton @click="isShowSideCart = !isShowSideCart" />
      <TheHeaderUserButton />
    </v-app-bar>

    <TheHeaderMobileMenuContent v-model="isShowMobileMenu" :categories="categories" />
    <TheHeaderSideCart v-model="isShowSideCart" />
  </nav>
</template>

<style lang="scss" scoped>
.cart-menu {
  min-height: 500px;
  @media (max-width: $bk-md) {
    border-top: $primary 5px solid;
  }
}

.app-bar {
  background-color: darken($secondary, 10%);
  z-index: 2 !important;
}

.nuxt-link-exact-active {
  color: $primary;
}
</style>
