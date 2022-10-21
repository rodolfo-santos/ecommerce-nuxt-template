<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import InnerImageZoom from 'vue-inner-image-zoom';
import { SubHeader } from '~/components/utils';
import { ProductRelatedProducts } from '~/components/pages/product';
import { productService } from '~/services/api';
import { IBreadcrumb, IProduct } from '~/models/data';
import { ICartStore } from '~/models/store';
import { cart } from '~/store';
import 'vue-inner-image-zoom/lib/vue-inner-image-zoom.css';

@Component({
  layout: 'marketplace',
  components: { SubHeader, InnerImageZoom, ProductRelatedProducts },
  async asyncData({ params }) {
    const { data } = await productService.getUnique(params.id);

    const product = data;
    const activeImage = product.gallery[0];
    const breadcrumbs: IBreadcrumb[] = [
      { text: 'Home', disabled: false, to: '/' },
      { text: product.categories[0], disabled: false, to: `/category/${product.categories[0]}` },
      { text: product.name, disabled: true, to: `/product/${product.id}` }
    ];

    return { product, activeImage, breadcrumbs };
  }
})
export default class extends Vue {
  @cart.Action private addToCart!: ICartStore['addToCart'];
  @Prop() public readonly id!: string;

  public breadcrumbs: IBreadcrumb[] = [];
  public product: IProduct = {
    id: '',
    name: '',
    price: 0,
    short_description: '',
    full_description: '',
    inventory: 0,
    gallery: [],
    categories: [],
    variations: [],
    weight_kg: 0,
    height_cm: 0,
    width_cm: 0,
    length_cm: 0,
    promotion: false,
    promotional_price: 0,
    publish: false
  };

  public activeImage: string = '';
  public selection: string = '';
  public cep: string = '';
  public btnAdd = true;

  public async fetchProduct(): Promise<void> {}

  public changeImage(image): void {
    this.activeImage = image;
  }

  public addProduct(product: IProduct): void {
    this.addToCart(product);
    this.btnAdd = false;
    setTimeout(() => {
      this.btnAdd = true;
    }, 2000);
  }
}
</script>

<template>
  <v-main>
    <SubHeader :title="product.name" :breadcrumbs="breadcrumbs" />
    <v-container class="product-container">
      <v-row>
        <v-row class="col-12 col-md-8">
          <div class="d-none d-md-block col-2">
            <v-img
              v-for="(foto, index) in product.gallery"
              :key="index"
              :src="foto"
              class="mb-2 image_lateral"
              :class="{ image_ativa: foto === activeImage }"
              @click="changeImage(foto)"></v-img>
          </div>
          <div class="col-12 col-md-10">
            <InnerImageZoom :src="activeImage" :zoom-src="activeImage" />
          </div>
          <div class="d-md-none col-12 row">
            <div v-for="(foto, index) in product.gallery" :key="index" class="col-4">
              <v-img :src="foto" :class="{ image_ativa: foto === activeImage }" @click="changeImage(foto)"></v-img>
            </div>
          </div>
        </v-row>
        <v-col>
          <h2>{{ product.name }}</h2>
          <p>{{ product.short_description }}</p>
          <p class="price">{{ product.price | currencyBRL }}</p>
          <v-divider class="mb-4"></v-divider>
          <div class="variations">
            <strong>Escolha a variação</strong>
            <v-chip-group v-model="selection" active-class="primary" mandatory>
              <v-chip v-for="variacao in product.variations" :key="variacao">{{ variacao }}</v-chip>
            </v-chip-group>
          </div>
          <v-divider class="my-4"></v-divider>
          <div>
            <p>
              Categorias:
              <nuxt-link
                v-for="category in product.categories"
                :key="category"
                class="text-capitalize text-muted"
                :to="`/category/${category}`">
                {{ category }}
              </nuxt-link>
            </p>
            <v-text-field :counter="8" maxlength="6" label="Calcular Frete"></v-text-field>
            <v-row class="mt-5 pa-2">
              <v-btn class="col-12 mb-2 pa-7" color="primary">Comprar Agora</v-btn>
              <v-btn class="col-12 mb-2 pa-7" color="warning" :disabled="!btnAdd" @click="addProduct(product)"
                >Adicionar ao Carrinho +</v-btn
              >
            </v-row>
          </div>
        </v-col>
      </v-row>

      <section class="mt-15">
        <h2>Descrição</h2>
        <p class="text-justify">{{ product.full_description }}</p>
        <h4>Informações Complementares</h4>
        <p>
          Peso Kg: {{ product.weight_kg }} <br />
          Altura Cm:{{ product.height_cm }} <br />
          Largura Cm:{{ product.width_cm }} <br />
          Comprimento Cm:{{ product.length_cm }} <br />
        </p>
      </section>
      <v-divider></v-divider>
      <ProductRelatedProducts />
    </v-container>
  </v-main>
</template>

<style lang="scss" scoped>
.image_lateral {
  opacity: 0.5;
  transition: 0.25s;
}

.image_ativa {
  opacity: 1;
}

.product-container {
  max-width: 1300px;
}

.variations {
  max-width: 300px;
}

.price {
  font-size: 1.3em;
  color: $primary;
}
</style>
