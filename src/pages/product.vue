<template>
  <v-main>
    <SubHeader :titulo="product.name" :breadCrumbs="breadCrumbs" />
    <v-container class="product-container">
      <Skeletonproduct v-if="loading" />

      <template v-else>
        <v-row>
          <v-row class="col-12 col-md-8">
            <div class="d-none d-md-block col-2">
              <v-img
                :src="foto"
                v-for="(foto, index) in product.gallery"
                class="mb-2 image_lateral"
                :class="{ image_ativa: foto === activeImage }"
                :key="index"
                @click="changeImage(foto)"
              ></v-img>
            </div>
            <div class="col-12 col-md-10">
              <InnerImageZoom :src="activeImage" :zoomSrc="activeImage" />
            </div>
            <div class="d-md-none col-12 row">
              <div class="col-4" v-for="(foto, index) in product.gallery" :key="index">
                <v-img :src="foto" :class="{ image_ativa: foto === activeImage }" @click="changeImage(foto)"></v-img>
              </div>
            </div>
          </v-row>
          <v-col>
            <h2>{{ product.name }}</h2>
            <p>{{ product.short_description }}</p>
            <p class="price">{{ product.price | numeroPreco }}</p>
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
                <router-link
                  v-for="category in product.categories"
                  :key="category"
                  class="text-capitalize text-muted"
                  :to="{ name: 'Categoria', params: { id: category } }"
                >
                  {{ category }}
                </router-link>
              </p>
              <v-text-field :counter="8" maxlength="6" label="Calcular Frete"></v-text-field>
              <v-row class="mt-5 pa-2">
                <v-btn class="col-12 mb-2 pa-7" color="primary">Comprar Agora</v-btn>
                <v-btn class="col-12 mb-2 pa-7" color="warning" :disabled="!btnAdd" @click="adicionarCarrinho(product)">Adicionar ao Carrinho +</v-btn>
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
      </template>
      <productsRelacionados />
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import InnerImageZoom from 'vue-inner-image-zoom';
import productsRelacionados from '@/components/Paginaproduct/productsRelacionados.vue';
import Skeletonproduct from '@/components/Skeleton/SkeletonPaginaproduct.vue';
import SubHeader from '@/components/SubHeader.vue';
import 'vue-inner-image-zoom/lib/vue-inner-image-zoom.css';

import { productService } from '@/services/api';
import { shippingService } from '@/services/utils/';

import { IProduct } from '@/models/data';
import { mapActions } from 'vuex';

@Component({
  components: {
    SubHeader,
    InnerImageZoom,
    productsRelacionados,
    Skeletonproduct,
  },
  methods: mapActions('cart', ['addCarrinho']),
})
export default class Paginaproduct extends Vue {
  @Prop() public readonly id!: string;

  public breadCrumbs: IProduct[] = [];
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
    publish: false,
  };

  public activeImage: string = '';
  public loading: boolean = true;
  public selection: string = '';
  public cep: string = '';
  public btnAdd = true;
  public addCarrinho!: (product: IProduct) => void;

  @Watch('id')
  async onIdChange(): Promise<void> {
    await this.fetchProduct();
    this.setBreadCrumb();
  }

  async created(): Promise<void> {
    await this.fetchProduct();
    this.loading = false;
  }

  public async fetchProduct(): Promise<void> {
    await productService.getUnique(this.id).then((response) => {
      this.product = response.data;
      this.activeImage = this.product.gallery[0];
    });
    this.setBreadCrumb();
  }

  public changeImage(image): void {
    this.activeImage = image;
  }

  public setBreadCrumb(): void {
    this.breadCrumbs = [
      { text: 'Home', disabled: false, to: '/' },
      { text: this.product.categories[0], disabled: false, to: `/category/${this.product.categories[0]}` },
      { text: this.product.name, disabled: true, to: `/category/${this.product.id}` },
    ];
  }

  public adicionarCarrinho(product: IProduct): void {
    this.addCarrinho(product);
    this.btnAdd = false;
    setTimeout(() => {
      this.btnAdd = true;
    }, 2000);
  }
}
</script>

<style lang="scss" scoped>
@import '@/sass/custom.scss';

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
