<template>
  <v-main>
    <SubHeader :titulo="titulo" :breadCrumbs="breadCrumbs" :background="categoria.banner" />
    <v-container>
      <v-row>
        <FiltrosCategoria class="d-none d-md-block col-md-3 mt-8" />
        <div class="col-12 col-md-9 pa-5">
          <div class="d-block d-md-flex justify-space-between align-center">
            <transition name="fade" mode="out-in" appear>
              <div v-if="loading"><v-progress-circular indeterminate color="primary"></v-progress-circular></div>
              <div v-else class="text-primary">
                <div v-if="totalProdutos === 0" class="text-center text-md-left">Sua pesquina não encontrou resultados.</div>
                <div v-else-if="totalProdutos === 1">Sua pesquina encontrou 1 resultado.</div>
                <div v-else>Sua pesquina encontrou {{ totalProdutos }} resultados.</div>
              </div>
            </transition>

            <div class="d-flex align-center justify-center">
              <div class="d-flex align-center justify-center">
                <v-icon class="mr-4">mdi-view-grid-outline</v-icon>
                <v-icon>mdi-format-list-bulleted</v-icon>
              </div>
              <div class="ml-4">
                <v-select :items="itemsOrdenacao" v-model="ordenacao" class="order-select"></v-select>
              </div>
            </div>
          </div>
          <v-divider></v-divider>
          <div v-if="loading" class="mt-5">
            <transition name="slow" mode="out-in" appear>
              <Skeleton :rows="5" :cols="4" />
            </transition>
          </div>
          <div v-else>
            <transition name="slow" mode="out-in" appear>
              <v-row v-if="produtos.length === 0">
                <v-col class="not-found">
                  <img :src="imgNotFound" class="not-found-img mb-8 " />
                  <div class="text-center">
                    <strong>Infelizmente não encontramos o que você procura. </strong>
                    <p class="d-none d-md-block">Tente mudar um pouco os parâmetros de pesquisa</p>
                  </div>
                </v-col>
              </v-row>
              <v-row v-else>
                <v-col v-for="produto in produtos" :key="produto.id" class="col-12 col-md-4 col-xl-3">
                  <Produto :dados="produto" />
                </v-col>
              </v-row>
            </transition>
          </div>
        </div>
      </v-row>

      <Paginacao v-if="produtos.length !== 0" :limit="10" :total="totalProdutos" />

      <v-navigation-drawer v-model="filtro" fixed bottom temporary class="filtro-mobile">
        <v-container id="scroll-target" class="overflow-y-auto">
          <FiltrosCategoria class="pa-3" />
        </v-container>
      </v-navigation-drawer>

      <v-btn class="d-md-none filtro-btn" fab x-large dark @click="abrirFiltro">
        <v-icon>mdi-filter</v-icon>
      </v-btn>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { serialize } from '@/helpers';

import SubHeader from '@/components/SubHeader.vue';
import Produto from '@/components/Produto.vue';
import Paginacao from '@/components/Paginacao.vue';
import Skeleton from '@/components/Skeleton/SkeletonProdutoList.vue';
import FiltrosCategoria from '@/components/PaginaCategoria/FiltrosCategoria.vue';

import CategoriasServ from '@/services/categorias';
import ProdutosServ from '@/services/produtos';

import Categoria from '@/models/Categoria';

@Component({
  components: {
    SubHeader,
    Produto,
    Paginacao,
    Skeleton,
    FiltrosCategoria,
  },
})
export default class PaginaCategoria extends Vue {
  @Prop() public readonly id!: string;
  public categoria: Categoria = {
    nome: 'Loja',
  };
  public loading: boolean = true;
  public produtos: Produto[] = [];
  public breadCrumbs: object[] = [];
  public filtro: boolean = false;

  public totalProdutos: number = 0;
  public itemsOrdenacao: string[] = ['Crescente', 'Decrescente'];
  public ordenacao: string = 'Crescente';
  public imgNotFound: string = require('../assets/imagens/not_found.svg');

  get titulo(): string {
    if (!!this.id) {
      return this.categoria.nome;
    }
    return 'Loja';
  }

  get url(): string {
    const query: string = serialize(this.$route.query);
    return query;
  }

  @Watch('ordenacao')
  public ordenar(): void {
    let params: { _sort: string; _order: string } = null;
    if (this.ordenacao === 'Crescente') {
      params = { _sort: 'nome', _order: 'asc' };
    } else {
      params = { _sort: 'nome', _order: 'desc' };
    }
    this.filtrar(params, true);
  }

  @Watch('$route', { immediate: true, deep: true })
  public recarregar(): void {
    setTimeout(() => {
      this.getProdutos();
    }, 500);
  }

  @Watch('id')
  public async mudarCategoria(): Promise<void> {
    this.getCategoria();
    this.setBreadCrumb();
  }

  public filtrar(filtro, primeiraPagina: boolean): void {
    const query = { ...this.$route.query };
    if (primeiraPagina) {
      filtro = Object.assign(filtro, { _page: 1 });
    }
    const novaQuery = Object.assign(query, filtro);
    const url: string = serialize(novaQuery);
    this.$router.push('?' + url).catch(() => {});
  }

  public async getProdutos(): Promise<void> {
    this.loading = true;
    if (!!this.id) {
      await ProdutosServ.listar(12, this.url, this.id).then((response) => {
        this.totalProdutos = Number(response.headers['x-total-count']);
        this.produtos = response.data;
        this.loading = false;
      });
    } else {
      await ProdutosServ.listar(12, this.url, '').then((response) => {
        this.totalProdutos = Number(response.headers['x-total-count']);
        this.produtos = response.data;
        this.loading = false;
      });
    }
  }

  public setBreadCrumb(): void {
    this.breadCrumbs = [
      {
        text: 'Home',
        disabled: false,
        to: '/',
      },
      {
        text: 'Loja',
        disabled: false,
        to: '/loja',
      },
    ];
    if (!!this.id) {
      const categoria: object = {
        text: this.categoria.nome,
        disabled: true,
        href: `/categoria/${this.categoria.id}`,
      };
      this.breadCrumbs.push(categoria);
    }
  }

  public async getCategoria(): Promise<void> {
    await CategoriasServ.categoria_unica(this.id).then((response) => {
      this.categoria = response.data;
    });
  }

  public abrirFiltro(): void {
    this.filtro = true;
  }

  public async created(): Promise<void> {
    this.getCategoria();
    this.setBreadCrumb();
  }
}
</script>

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
