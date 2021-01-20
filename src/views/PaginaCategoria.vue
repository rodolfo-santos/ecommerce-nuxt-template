<template>
  <v-main>
    <SubHeader :titulo="titulo" :breadCrumbs="breadCrumbs" />
    <v-container>
      <v-row>
        <v-card class="d-none d-md-block col-md-3 lista-categorias">
          <div class="filtro-titulo mb-4">Filtrar por</div>

          <v-card class="filtro-opcao pa-4 mb-4" elevation="2">
            <div class="opcao-titulo mb-2">Sub-Categoria</div>
            <v-chip-group v-model="categoriasSelecionadas" active-class="primary" column multiple>
              <v-chip v-for="(categoria, index) in categorias" :key="index" @input="filtrarCategoria">{{ categoria.nome }}</v-chip>
            </v-chip-group>
          </v-card>

          <v-card class="filtro-opcao pa-4 mb-4" elevation="2">
            <div class="opcao-titulo mb-2">Faixa de Preço</div>
            <div class="pl-2">
              <div class="d-flex justify-space-between">
                <div class="align-end">Valor Máximo</div>
                <div>
                  <input v-model="valorMaximo" class="input-preco" type="number" @change="filtrarPreco" />
                </div>
              </div>
              <v-slider v-model="valorMaximo" :min="valorMinimo" :max="1000" class="align-center" @change="filtrarPreco"></v-slider>

              <div class="d-flex justify-space-between">
                <div>Valor Mínimo</div>
                <div>
                  <input v-model="valorMinimo" class="input-preco" type="number" @change="filtrarPreco" />
                </div>
              </div>
              <v-slider v-model="valorMinimo" :max="valorMaximo" :min="0" class="align-center" @change="filtrarPreco"></v-slider>
            </div>
          </v-card>

          <v-card class="filtro-opcao pa-4 mb-4" elevation="2">
            <div class="opcao-titulo mb-2">Cor</div>
            <v-chip-group v-model="coresSelecionadas" active-class="primary" column multiple>
              <v-chip v-for="cor in cores" :key="cor">{{ cor }}</v-chip>
            </v-chip-group>
          </v-card>
        </v-card>

        <div class="col-12 col-md-9 pa-5">
          <div class="d-flex justify-space-between align-center">
            <transition name="fade" mode="out-in" appear>
              <div v-if="loading"><v-progress-circular indeterminate color="primary"></v-progress-circular></div>
              <div v-else>Sua pesquisa retornou {{ totalProdutos }} resultados.</div>
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
                  <img :src="imgNotFound" class="not-found-img mb-4" />
                  <strong>
                    Infelizmente não encontramos o que você procura.
                  </strong>
                  <p>Tente mudar um pouco os parâmetros de pesquisa</p>
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

      <Paginacao :limit="10" :total="totalProdutos" />

      <v-navigation-drawer v-model="filtro" fixed bottom temporary class="filtro-mobile">
        <v-container id="scroll-target" class="overflow-y-auto">
          <v-card class="lista-categorias">
            <div class="filtro-titulo mb-4">Filtrar por</div>

            <v-card class="filtro-opcao pa-4 mb-4" elevation="2">
              <div class="opcao-titulo mb-2">Categoria</div>
              <v-chip-group v-model="categoriasSelecionadas" active-class="primary" column multiple>
                <v-chip v-for="(categoria, index) in categorias" :key="index">{{ categoria.nome }}</v-chip>
              </v-chip-group>
            </v-card>

            <v-card class="filtro-opcao pa-4 mb-4" elevation="2">
              <div class="opcao-titulo mb-2">Faixa de Preço</div>
              <div class="pl-2">
                <div class="d-flex justify-space-between">
                  <div class="align-end">Valor Máximo</div>
                  <div>
                    <input v-model="valorMaximo" class="input-preco" type="number" />
                  </div>
                </div>
                <v-slider v-model="valorMaximo" :min="valorMinimo" :max="1000" class="align-center"></v-slider>

                <div class="d-flex justify-space-between">
                  <div>Valor Mínimo</div>
                  <div>
                    <input v-model="valorMinimo" class="input-preco" type="number" />
                  </div>
                </div>
                <v-slider v-model="valorMinimo" :max="valorMaximo" :min="0" class="align-center"></v-slider>

                <div class="d-flex justify-end">
                  <v-btn @click="filtrarPreco">Aplicar</v-btn>
                </div>
              </div>
            </v-card>

            <v-card class="filtro-opcao pa-4 mb-4" elevation="2">
              <div class="opcao-titulo mb-2">Cor</div>
              <v-chip-group v-model="coresSelecionadas" active-class="primary" column multiple>
                <v-chip v-for="cor in cores" :key="cor">{{ cor }}</v-chip>
              </v-chip-group>
            </v-card>
          </v-card>
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

import ProdutosServ from '@/services/produtos';
import CategoriasServ from '@/services/categorias';
import Categorias from '@/services/categorias';
import Categoria from '@/models/Categoria';

@Component({
  components: {
    SubHeader,
    Produto,
    Paginacao,
    Skeleton,
  },
})
export default class PaginaCategoria extends Vue {
  @Prop() private readonly id!: string;
  private categoria: Categoria = {
    nome: 'Loja',
  };
  private loading: boolean = true;
  private categorias: Categoria[] = [];
  private categoriasSelecionadas: number[] = [];
  private produtos: Produto[] = [];
  private breadCrumbs: object[] = [];
  private valorMinimo: number = 0;
  private valorMaximo: number = 1000;
  private selection: string = '';
  private cores: string[] = ['Branco', 'Preto', 'Verde', 'Azul', 'Rosa', 'Roxo', 'Amarelo', 'Outras'];
  private coresSelecionadas: number[] = [];
  private filtro: boolean = false;
  private totalProdutos: number = 0;
  private itemsOrdenacao: string[] = ['Crescente', 'Decrescente'];
  private ordenacao: string = 'Crescente';
  private imgNotFound: string = require('../assets/imagens/not_found.svg');

  get titulo(): string {
    if (!!this.id) {
      return this.id;
    }
    return 'Loja';
  }

  get url(): string {
    const query: string = serialize(this.$route.query);
    return query;
  }

  @Watch('ordenacao')
  private ordenar(): void {
    let params: { _sort: string; _order: string } = null;
    if (this.ordenacao === 'Crescente') {
      params = { _sort: 'nome', _order: 'asc' };
    } else {
      params = { _sort: 'nome', _order: 'desc' };
    }
    this.filtrar(params, true);
  }

  @Watch('$route', { immediate: true, deep: true })
  private recarregar(): void {
    setTimeout(() => {
      this.getProdutos();
    }, 500);
  }

  @Watch('id')
  private async mudarCategoria(): Promise<void> {
    this.setBreadCrumb();
  }

  private filtrarCategoria(): void {
    const categorias = this.categoriasSelecionadas.map((i) => this.categorias[i].id);
    const params = { categorias_like: categorias };
    this.filtrar(params, true);
  }

  private filtrarPreco(): void {
    const params = { preco_gte: this.valorMinimo, preco_lte: this.valorMaximo };
    this.filtrar(params, true);
  }

  private filtrar(filtro, primeiraPagina: boolean): void {
    const query = { ...this.$route.query };
    if (primeiraPagina) {
      filtro = Object.assign(filtro, { _page: 1 });
    }
    const novaQuery = Object.assign(query, filtro);
    const url: string = serialize(novaQuery);
    this.$router.push('?' + url).catch(() => {});
  }

  private async getCategorias(): Promise<void> {
    await CategoriasServ.listar(35).then((response) => {
      this.categorias = response.data;
    });
  }

  private sortItems(): void {
    this.cores = this.cores.sort();
    this.categorias = this.categorias.sort((a, b) => (a.nome > b.nome ? 1 : -1));
  }

  private async getProdutos(): Promise<void> {
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

  private setBreadCrumb(): void {
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

  private abrirFiltro(): void {
    this.filtro = true;
  }

  private async created(): Promise<void> {
    await this.getCategorias();
    this.sortItems();
    this.setBreadCrumb();
  }
}
</script>

<style lang="scss" scoped>
@import '@/sass/custom.scss';
.lista-categorias {
  background-color: $secondary;
}

.filtro-titulo {
  font-size: 0.9em;
  text-transform: uppercase;
  border-left: $primary solid 3px;
  padding-left: 10px;
}

.filtro-opcao {
  background-color: darken($secondary, 1%);
}

.opcao-titulo {
  font-weight: bold;
}

label {
  font-size: 0.9em;
}

.input-preco {
  max-width: 80px;
  margin: 0;
  padding: 0;
  font-size: 0.9em;
  top: 10px;
  color: #ffffff;
  text-align: right;
  transition: 0.5s;

  &:focus,
  &:hover {
    outline: none;
    color: $primary;
  }
}

.filtro-btn {
  z-index: 1;
  position: fixed;
  bottom: 10px;
  right: 10px;
  background: darken($primary, 10%) !important;
}

.filtro-mobile {
  background-color: $secondary;
  padding-top: 15px;
  border-top: $primary solid 5px;
}

.order-select {
  width: 250px;
}

.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 700px;

  .not-found-img {
    width: 400px;
    height: auto;
  }
  strong {
    font-size: 1.5em;
  }
  p {
    font-size: 1.2em;
  }
}
</style>
