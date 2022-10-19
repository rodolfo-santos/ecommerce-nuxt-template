<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { objectToQuery } from '@/assets/ts';
import { ProductCard, SubHeader, Pagination, SkeletonProductList } from '@/components/utils';
import { CategoryFilters } from '@/components/pages/category';
import { categoryService, productService } from '@/services/api';
import { IBreadcrumb, ICategory, IProduct } from '@/models/data';

@Component({ components: { SubHeader, ProductCard, Pagination, SkeletonProductList, CategoryFilters } })
export default class extends Vue {
  @Prop() public readonly id!: string;

  public category: ICategory = {
    id: '',
    name: 'Loja',
    image: '',
    banner: '',
    description: ''
  };

  public isLoading: boolean = true;
  public isShowFilter: boolean = false;
  public products: IProduct[] = [];
  public breadCrumbs: IBreadcrumb[] = [];

  public productsTotal: number = 0;
  public orderTypeOptions: string[] = ['Crescente', 'Decrescente'];
  public order: string = 'Crescente';
  public imgNotFound: string = require('@/assets/images/not_found.svg');

  public get title(): string {
    if (this.id) return this.category.name;
    return 'Loja';
  }

  public get url(): string {
    const query: string = objectToQuery(this.$route.query);
    return query;
  }

  async created(): Promise<void> {
    this.fetchCategory();
    this.setBreadCrumb();
  }

  @Watch('order')
  onOrderChange(): void {
    let params: { _sort: string; _order: string } = null;
    if (this.order === 'Crescente') params = { _sort: 'name', _order: 'asc' };
    else params = { _sort: 'name', _order: 'desc' };
    this.setFilter(params, true);
  }

  @Watch('$route', { immediate: true, deep: true })
  onRouteChange() {
    setTimeout(() => {
      this.fetchProducts();
    }, 500);
  }

  @Watch('id')
  changeCategory() {
    this.fetchCategory();
    this.setBreadCrumb();
  }

  private setFilter(filter, firstPage: boolean) {
    const query = { ...this.$route.query };
    if (firstPage) filter = Object.assign(filter, { _page: 1 });
    const newQuery = Object.assign(query, filter);
    const url: string = objectToQuery(newQuery);
    this.$router.push('?' + url).catch(() => {});
  }

  private async fetchProducts(): Promise<void> {
    this.isLoading = true;
    if (!!this.id) {
      await productService.get(12, this.url, this.id).then((response) => {
        this.productsTotal = Number(response.headers['x-total-count']);
        this.products = response.data;
      });
    } else {
      await productService.get(12, this.url, '').then((response) => {
        this.productsTotal = Number(response.headers['x-total-count']);
        this.products = response.data;
      });
    }
    this.isLoading = false;
  }

  private setBreadCrumb(): void {
    this.breadCrumbs = [
      { text: 'Home', disabled: false, to: '/' },
      { text: 'Store', disabled: false, to: '/loja' }
    ];

    if (!!this.id) {
      const category: IBreadcrumb = {
        text: this.category.name,
        disabled: true,
        href: `/category/${this.category.id}`
      };
      this.breadCrumbs.push(category);
    }
  }

  public async fetchCategory(): Promise<void> {
    await categoryService.getUnique(this.id).then((response) => {
      this.category = response.data;
    });
  }

  public openFilters(): void {
    this.isShowFilter = true;
  }
}
</script>

<template>
  <v-main>
    <SubHeader :title="title" :breadCrumbs="breadCrumbs" :background="category.banner" />
    <v-container>
      <v-row>
        <CategoryFilters class="d-none d-md-block col-md-3 mt-8" />
        <div class="col-12 col-md-9 pa-5">
          <div class="d-block d-md-flex justify-space-between align-center">
            <transition name="fade" mode="out-in" appear>
              <div v-if="isLoading"><v-progress-circular indeterminate color="primary"></v-progress-circular></div>
              <div v-else class="text-primary">
                <div v-if="productsTotal === 0" class="text-center text-md-left">
                  Sua pesquisa não encontrou resultados.
                </div>
                <div v-else-if="productsTotal === 1">Sua pesquisa encontrou 1 resultado.</div>
                <div v-else>Sua pesquisa encontrou {{ productsTotal }} resultados.</div>
              </div>
            </transition>

            <div class="d-flex align-center justify-center">
              <div class="d-flex align-center justify-center">
                <v-icon class="mr-4">mdi-view-grid-outline</v-icon>
                <v-icon>mdi-format-list-bulleted</v-icon>
              </div>
              <div class="ml-4">
                <v-select :items="orderTypeOptions" v-model="order" class="order-select"></v-select>
              </div>
            </div>
          </div>
          <v-divider></v-divider>
          <div v-if="isLoading" class="mt-5">
            <transition name="slow" mode="out-in" appear>
              <SkeletonProductList :rows="5" :cols="4" />
            </transition>
          </div>
          <div v-else>
            <transition name="slow" mode="out-in" appear>
              <v-row v-if="products.length === 0">
                <v-col class="not-found">
                  <img :src="imgNotFound" class="not-found-img mb-8" />
                  <div class="text-center">
                    <strong>Infelizmente não encontramos o que você procura. </strong>
                    <p class="d-none d-md-block">Tente mudar um pouco os parâmetros de pesquisa</p>
                  </div>
                </v-col>
              </v-row>
              <v-row v-else>
                <v-col v-for="product in products" :key="product.id" class="col-12 col-md-4 col-xl-3">
                  <ProductCard :product="product" />
                </v-col>
              </v-row>
            </transition>
          </div>
        </div>
      </v-row>

      <Pagination v-if="products.length !== 0" :limit="10" :total="productsTotal" />

      <v-navigation-drawer v-model="isShowFilter" fixed bottom temporary class="filtro-mobile">
        <v-container id="scroll-target" class="overflow-y-auto">
          <CategoryFilters class="pa-3" />
        </v-container>
      </v-navigation-drawer>

      <v-btn class="d-md-none filtro-btn" fab x-large dark @click="openFilters">
        <v-icon>mdi-filter</v-icon>
      </v-btn>
    </v-container>
  </v-main>
</template>

<style lang="scss" scoped>
@import '@/sass/custom.scss';

.order-select {
  width: 250px;
}

.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 700px;
  @media (max-width: 800px) {
    min-height: 500px;
  }

  .not-found-img {
    width: 100%;
    max-width: 600px;
    height: auto;
  }
  strong {
    font-size: 1.5em;
    @media (max-width: 800px) {
      font-size: 1em;
    }
  }
  p {
    font-size: 1.2em;
  }
}

.filtro-mobile {
  background-color: $secondary;
  padding-top: 15px;
  border-top: $primary solid 5px;
}

.filtro-btn {
  z-index: 1;
  position: fixed;
  bottom: 10px;
  right: 10px;
  background: darken($primary, 10%) !important;
}
</style>
