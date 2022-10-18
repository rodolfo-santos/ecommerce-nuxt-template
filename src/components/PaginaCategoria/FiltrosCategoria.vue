<template>
  <v-card class="lista-categories">
    <div class="filtro-titulo mb-4">Refinar Busca</div>

    <v-card class="filtro-opcao pa-4 mb-4" elevation="2">
      <div class="opcao-titulo mb-2">Adicionar Sub-Categorias</div>
      <v-chip-group v-model="categoriasSelecionadas" active-class="primary" column multiple>
        <v-chip v-for="(category, index) in categories" :key="index" @input="filtrarCategoria">{{ category.name }}</v-chip>
      </v-chip-group>
    </v-card>

    <v-card class="filtro-opcao pa-4 mb-4" elevation="2">
      <div class="opcao-titulo mb-2">Faixa de Preço</div>
      <div class="pl-2">
        <div class="d-flex justify-space-between">
          <div class="align-end">Valor Máximo</div>
          <div>
            <input v-model="valorMaximo" class="input-price" type="number" @change="filtrarPreco" />
          </div>
        </div>
        <v-slider v-model="valorMaximo" :min="valorMinimo" :max="1000" class="align-center" @change="filtrarPreco"></v-slider>

        <div class="d-flex justify-space-between">
          <div>Valor Mínimo</div>
          <div>
            <input v-model="valorMinimo" class="input-price" type="number" @change="filtrarPreco" />
          </div>
        </div>
        <v-slider v-model="valorMinimo" :max="valorMaximo" :min="0" class="align-center" @change="filtrarPreco"></v-slider>
      </div>
    </v-card>

    <v-card class="filtro-opcao pa-4 mb-4" elevation="2">
      <div class="opcao-titulo mb-2">Cor</div>
      <v-chip-group v-model="coresSelecionadas" column multiple>
        <v-chip v-for="cor in cores" :key="cor.name" :active-class="cor.class">{{ cor.name }}</v-chip>
      </v-chip-group>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { serialize } from '@/helpers';

import CategoriasServ from '@/services/categories';

import Categoria from '@/models/ICategory';

@Component
export default class FiltrosCategorias extends Vue {
  public categories: Categoria[] = [];
  public categoriasSelecionadas: number[] = [];
  public valorMinimo: number = 0;
  public valorMaximo: number = 1000;
  public coresSelecionadas: number[] = [];
  public cores: object[] = [
    {
      name: 'Branco',
      class: 'blue-grey',
    },
    {
      name: 'Preto',
      class: 'blue-grey',
    },
    {
      name: 'Vermelho',
      class: 'red',
    },
    {
      name: 'Verde',
      class: 'green',
    },
    {
      name: 'Azul',
      class: 'blue',
    },
    {
      name: 'Rosa',
      class: 'pink',
    },
    {
      name: 'Roxo',
      class: 'purple',
    },
    {
      name: 'Amarelo',
      class: 'amber',
    },
    {
      name: 'Laranja',
      class: 'deep-orange',
    },
    {
      name: 'Marrom',
      class: 'brown',
    },
  ];

  public filtrarCategoria(): void {
    const categories = this.categoriasSelecionadas.map((i) => this.categories[i].id);
    const params = { categorias_like: categories };
    this.filtrar(params, true);
  }

  public filtrarPreco(): void {
    const params = { preco_gte: this.valorMinimo, preco_lte: this.valorMaximo };
    this.filtrar(params, true);
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

  public async getCategorias(): Promise<void> {
    await CategoriasServ.listar(35).then((response) => {
      this.categories = response.data;
    });
  }

  public sortItems(): void {
    this.categories = this.categories.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  public async created(): Promise<void> {
    await this.getCategorias();
    this.sortItems();
  }
}
</script>

<style lang="scss" scoped>
@import '@/sass/custom.scss';

.lista-categories {
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

.input-price {
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
</style>
