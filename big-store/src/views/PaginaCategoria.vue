<template>
  <v-main>
    <SubHeader :titulo="categoria.nome" :breadCrumbs="breadCrumbs" />
    <v-container>
      <v-row>
        
        <v-card class="col-3 lista-categorias">
          <div class="filtro-titulo mb-4">Filtrar por</div>

          <v-card class="filtro-opcao pa-4 mb-4" elevation="2">
            <div class="opcao-titulo mb-2">Categoria</div>
              <v-chip-group v-model="selection" active-class="primary" column multiple>
                <v-chip v-for="( categoria, index) in categoriasNome" :key="index">{{ categoria }}</v-chip>
              </v-chip-group>
              <div class="pl-2">

                <div class="d-flex justify-end">
                  <v-btn>Aplicar</v-btn>
                </div>
              </div>
          </v-card>

          <v-card class="filtro-opcao pa-4 mb-4" elevation="2">
            <div class="opcao-titulo mb-2">Faixa de Preço</div>
              <div class="pl-2">

                <div class="d-flex justify-space-between">
                  <div class="align-end">Valor Máximo </div>
                  <div>
                    <input v-model="valorMaximo" class="input-preco" type="number">
                  </div>
                </div>
                <v-slider v-model="valorMaximo" :min="valorMinimo" :max="1000" class="align-center"></v-slider>


                <div class="d-flex justify-space-between">
                  <div>Valor Mínimo </div>
                  <div>
                    <input v-model="valorMinimo" class="input-preco" type="number">
                  </div>
                </div>
                <v-slider v-model="valorMinimo" :max="valorMaximo" :min="0" class="align-center"></v-slider>

                <div class="d-flex justify-end">
                  <v-btn>Aplicar</v-btn>
                </div>
              </div>
          </v-card>

          <v-card class="filtro-opcao pa-4 mb-4" elevation="2">
            <div class="opcao-titulo mb-2">Cor</div>
              <v-chip-group v-model="selection" active-class="primary" column multiple>
                <v-chip v-for="cor in cores" :key="cor">{{cor}}</v-chip>
              </v-chip-group>
              <div class="pl-2">

                <div class="d-flex justify-end">
                  <v-btn>Aplicar</v-btn>
                </div>
              </div>
          </v-card>
        </v-card>

        <div class="col-9 pa-5">
          <v-row v-if="produtos.length === 0">
            <v-col>
                <Loading />
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col v-for="produto in produtos" :key="produto.id" class="col-12 col-md-4 col-xl-3">
              <Produto :dados="produto" />
            </v-col>
          </v-row>
        </div>

      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';

import SubHeader from '@/components/SubHeader.vue';
import Produto from '@/components/Produto.vue';

import ProdutosServ from '@/services/produtos';
import CategoriasServ from '@/services/categorias';
import Categorias from '@/services/categorias';

import Categoria from '@/models/Categoria';

@Component({
  components: {
    SubHeader,
    Produto,
  },
})

export default class PaginaCategoria extends Vue {
  @Prop() private readonly id!: string;
  private categoria: Categoria = {};
  private categorias: Categoria[] = [];
  private categoriasNome: string[] = [];
  private produtos: Produto[] = [];
  private breadCrumbs: object[] = [];
  private valorMinimo: number = 0;
  private valorMaximo: number = 1000;
  private selection: string = '';
  private cores: string[] = [
    'Branco',
    'Preto',
    'Verde',
    'Azul',
    'Rosa',
    'Roxo',
    'Amarelo',
    'Outras',
  ];

  @Watch('id')
  private async mudarCategoria() {
    await this.getProdutos();
    await this.getCategoria();
    this.setBreadCrumb();
  }

  private async getCategoria() {
    await CategoriasServ.categoria_unica(this.id).then((response) => {
      this.categoria = response.data;
    });
  }

  private async getCategorias() {
    await CategoriasServ.listar(35).then((response) => {
      this.categorias = response.data;
      this.categoriasNome = this.categorias.map((categoria) => categoria.nome);
    });
  }

  private sortItems() {
    this.cores = this.cores.sort();
    this.categoriasNome = this.categoriasNome.sort();
  }

  private async getProdutos() {
    await ProdutosServ.filtrar(this.id).then((response) => {
      this.produtos = response.data;
    });
  }

  private setBreadCrumb() {
    this.breadCrumbs = [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: 'Loja',
          disabled: false,
          href: '/loja',
        },
        {
          text: this.categoria.nome,
          disabled: true,
          href: `/categoria/${this.id}`,
        },
    ];
  }

  private async created() {
    await this.getProdutos();
    await this.getCategoria();
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

.filtro-titulo{
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
  transition: .5s;
  -moz-appearance:textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
      /* display: none; <- Crashes Chrome on hover */
      -webkit-appearance: none;
      margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  &:focus, &:hover {
    outline: none;
    color: $primary;
  }
}



</style>