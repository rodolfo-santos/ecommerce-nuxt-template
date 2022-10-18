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
                class="mb-2 imagem_lateral"
                :class="{ imagem_ativa: foto === imagemAtiva }"
                :key="index"
                @click="mudarImagem(foto)"
              ></v-img>
            </div>
            <div class="col-12 col-md-10">
              <InnerImageZoom :src="imagemAtiva" :zoomSrc="imagemAtiva" />
            </div>
            <div class="d-md-none col-12 row">
              <div class="col-4" v-for="(foto, index) in product.gallery" :key="index">
                <v-img :src="foto" :class="{ imagem_ativa: foto === imagemAtiva }" @click="mudarImagem(foto)"></v-img>
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

import productsServ from '@/services/products';
import FreteServ from '@/services/utils/ShippingCalculatorService';

import product from '@/models/product';
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
  public breadCrumbs: object[] = [];
  public product: product = {
    id: '',
    name: '',
    price: 0,
    short_description: '',
    full_description: '',
    inventory: 0,
    gallery: [''],
    categories: [],
    variations: [],
    weight_kg: 0,
    height_cm: 0,
    width_cm: 0,
    length_cm: 0,
  };

  public imagemAtiva: string = '';
  public loading: boolean = true;
  public selection: string = '';
  public cep: string = '';
  public btnAdd = true;
  public addCarrinho!: (product: product) => void;

  @Watch('id')
  public async mudarproduct(): Promise<void> {
    await this.getproduct();
    this.setBreadCrumb();
  }

  public async getproduct(): Promise<void> {
    await productsServ.product_unico(this.id).then((response) => {
      this.product = response.data;
      this.imagemAtiva = this.product.gallery[0];
    });
    this.setBreadCrumb();
  }

  public mudarImagem(imagem): void {
    this.imagemAtiva = imagem;
  }

  public setBreadCrumb(): void {
    this.breadCrumbs = [
      {
        text: 'Home',
        disabled: false,
        to: '/',
      },
      {
        text: this.product.categories[0],
        disabled: false,
        to: `/category/${this.product.categories[0]}`,
      },
      {
        text: this.product.name,
        disabled: true,
        to: `/category/${this.product.id}`,
      },
    ];
  }

  public adicionarCarrinho(product: object): void {
    this.addCarrinho(product);
    this.btnAdd = false;
    setTimeout(() => {
      this.btnAdd = true;
    }, 2000);
  }

  public async created(): Promise<void> {
    await this.getproduct();
    this.loading = false;
  }
}
</script>

<style lang="scss" scoped>
@import '@/sass/custom.scss';

.imagem_lateral {
  opacity: 0.5;
  transition: 0.25s;
}

.imagem_ativa {
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
