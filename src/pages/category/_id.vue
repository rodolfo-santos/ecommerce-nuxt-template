<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';
import { objectToQuery } from '~/assets/ts';
import { ProductCard, SubHeader, Pagination, SkeletonProductList } from '~/components/utils';
import { CategoryFilters } from '~/components/pages/category';
import { categoryService, productService } from '~/services/api';
import { IBreadcrumb, ICategory, IProduct, IProductQuery } from '~/models/data';

@Component({
  components: { SubHeader, ProductCard, Pagination, SkeletonProductList, CategoryFilters },
  async asyncData({ params, query }) {
    const { data: category } = await categoryService.getUnique(params.id);
    const { data: products, headers } = await productService.get({ _page: 1, _limit: 12, ...query, q: params.id });
    const productsTotal = Number(headers['x-total-count']);

    const breadcrumbs: IBreadcrumb[] = [
      { text: 'Página Inicial', disabled: false, to: '/' },
      { text: 'Categorias', disabled: false, to: '/category' }
    ];

    breadcrumbs.push({
      text: category.name,
      disabled: true,
      href: `/category/${category.id}`
    });

    return { category, products, productsTotal, breadcrumbs };
  }
})
export default class extends Vue {
  public category!: ICategory;
  public products!: IProduct[];
  public productsTotal!: number;
  public breadcrumbs!: IBreadcrumb[];

  public isShowFilter: boolean = false;

  public orderTypeOptions: string[] = ['Crescente', 'Decrescente'];
  public order: string = 'Crescente';
  public imgNotFound: string = require('~/assets/images/not_found.svg');

  public get title(): string {
    if (this.$route.params.id) return this.category.name;
    return 'Loja';
  }

  public get url(): string {
    const query: string = objectToQuery(this.$route.query);
    return query;
  }

  @Watch('$route.query', { deep: true })
  async onRouteChange() {
    const { data: products, headers } = await productService.get({
      ...this.$route.query,
      _limit: 12,
      q: this.$route.params.id
    });

    this.products = products;
    this.productsTotal = Number(headers['x-total-count']);
  }

  @Watch('order')
  onOrderChange(): void {
    const params: IProductQuery = { _sort: 'name', _order: 'asc' };
    if (this.order !== 'Crescente') params._order = 'desc';

    this.filter(params, true);
  }

  public filter(query: IProductQuery, isFirstPage: boolean): void {
    if (isFirstPage) query = Object.assign(query, { _page: 1 });
    const newQuery = {
      ...this.$route.query,
      ...query
    };

    const queryParams: string = objectToQuery(newQuery);
    this.$router.push(`${this.$route.path}${queryParams}`);
  }

  public openFilters(): void {
    this.isShowFilter = true;
  }
}
</script>

<template>
  <v-main>
    <SubHeader :title="title" :breadcrumbs="breadcrumbs" :background="category.banner" />
    <v-container>
      <v-row>
        <CategoryFilters class="d-none d-md-block col-md-3 mt-8" />
        <div class="col-12 col-md-9 pa-5">
          <div class="d-block d-md-flex justify-space-between align-center">
            <transition name="fade" mode="out-in" appear>
              <div class="text-primary">
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
                <v-select v-model="order" :items="orderTypeOptions" class="order-select"></v-select>
              </div>
            </div>
          </div>
          <v-divider></v-divider>

          <div>
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
