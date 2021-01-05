<template>
  <v-main>
    <SubHeader :titulo="produto.nome" :breadCrumbs="breadCrumbs" />
    <v-container class="produto-container">
      <SkeletonProduto v-if="loading && produto.id" />

      <template v-else>
        <v-row>
          <v-row class="col-8">
            <div class="col-2">
              <v-img :src="foto" v-for="(foto, index) in produto.fotos" class="mb-2 imagem_lateral" :class="{ 'imagem_ativa': foto === imagemAtiva }" :key="index" @click="mudarImagem(foto)"></v-img>
            </div>
            <div class="col-10">
              <InnerImageZoom :src="imagemAtiva" :zoomSrc="imagemAtiva" />
            </div>
          </v-row>
          <v-col>
            <h2>{{ produto.nome }}</h2>
            <p> {{ produto.descricao_breve }} </p>
            <p class="preco"> {{ produto.preco | numeroPreco }} </p>
            <v-divider class="mb-4"></v-divider>
            <div class="variacoes">
              <strong>Escolha a variação</strong>
              <v-chip-group v-model="selection" active-class="primary" mandatory>
                <v-chip v-for="variacao in produto.variacoes" :key="variacao">{{variacao}}</v-chip>
              </v-chip-group>
            </div>
            <v-divider class="my-4"></v-divider>
            <div>
              <p>Categorias: <router-link v-for="categoria in produto.categorias" :key="categoria" 
                              class="text-capitalize text-muted" :to="{ name: 'Categoria', params: { id: categoria} }"> {{ categoria }} </router-link>  
              </p>
              <v-text-field :counter="8" maxlength="6" label="Calcular Frete"></v-text-field>  
            <v-row class="mt-5 pa-2">
                <v-btn class="col-12 mb-2 pa-7" color="primary">Comprar Agora</v-btn>
                <v-btn class="col-12 mb-2 pa-7" color="warning">Adicionar ao Carrinho +</v-btn>
              </v-row>
            </div>
          </v-col>
        </v-row>
        
        <section class="mt-15">
          <h2>Descrição</h2>
          <p class="text-justify">{{ produto.descricao_completa}}</p>
          <h4>Informações Complementares</h4>
          <p> Peso Kg: {{ produto.peso_kg }} <br>
              Altura Cm:{{ produto.altura_cm }} <br>
              Largura Cm:{{ produto.largura_cm }} <br>
              Comprimento Cm:{{ produto.comprimento_cm }} <br>
          </p>
        </section>
        <v-divider></v-divider>
      </template>
      <section>
        <h2>Produtos Relacionados</h2>
        <ProdutosRelacionados/>
      </section>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import {Component, Prop, Watch, Vue} from 'vue-property-decorator';
import InnerImageZoom from 'vue-inner-image-zoom';
import ProdutosRelacionados from '@/components/PaginaProduto/ProdutosRelacionados.vue';
import SkeletonProduto from '@/components/Skeleton/SkeletonPaginaProduto.vue';
import SubHeader from '@/components/SubHeader.vue';
import 'vue-inner-image-zoom/lib/vue-inner-image-zoom.css';

import ProdutosServ from '@/services/produtos';
import FreteServ from '@/services/calcularFrete';

import Produto from '@/models/Produto';

@Component({
  components: {
    SubHeader,
    InnerImageZoom,
    ProdutosRelacionados,
    SkeletonProduto,
  },
})
export default class PaginaProduto extends Vue {
  @Prop() private readonly id!: string;
  private breadCrumbs: object[] = [];
  private produto: Produto = {
        id: '',
        nome: '',
        preco: 0,
        descricao_breve: '',
        descricao_completa: '',
        estoque: 0,
        fotos: [''],
        categorias: [],
        variacoes: [],
        peso_kg: 0,
        altura_cm: 0,
        largura_cm: 0,
        comprimento_cm: 0,
  };

  private imagemAtiva: string = '';
  private loading: boolean = true;
  private selection: string = '';
  private cep: string = '';

  private async getProduto() {
    await ProdutosServ.produto_unico(this.id).then((response) => {
      this.produto = response.data;
      this.imagemAtiva = this.produto.fotos[0];
    });
    this.setBreadCrumb();
  }

  private mudarImagem(imagem): void {
    this.imagemAtiva = imagem;
  }

  private setBreadCrumb() {
    this.breadCrumbs = [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: this.produto.categorias[0],
          disabled: false,
          href: `/categoria/${this.produto.categorias[0]}`,
        },
        {
          text: this.produto.nome,
          disabled: true,
          href: `/categoria/${this.produto.id}`,
        },

    ];
  }

  private async created() {
    await this.getProduto();
    this.loading = false;
  }
}

</script>

<style lang="scss" scoped>
@import '@/sass/custom.scss';

.imagem_lateral {
  opacity: .5;
  transition: .25s;
}

.imagem_ativa {
  opacity: 1;
}

.produto-container {
  max-width: 1300px;
}

.variacoes {
  max-width: 300px;
}

.preco {
  font-size: 1.3em;
  color: $primary;
}

</style>