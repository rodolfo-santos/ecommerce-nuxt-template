<template>
  <v-card class="lista-categorias">
    <div class="filtro-titulo mb-4">Refinar Busca</div>

    <v-card class="filtro-opcao pa-4 mb-4" elevation="2">
      <div class="opcao-titulo mb-2">Categoria</div>
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
      <v-chip-group v-model="coresSelecionadas" column multiple>
        <v-chip v-for="cor in cores" :key="cor.nome" :active-class="cor.class">{{ cor.nome }}</v-chip>
      </v-chip-group>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { serialize } from '@/helpers';

import CategoriasServ from '@/services/categorias';

import Categoria from '@/models/Categoria';

@Component
export default class FiltrosCategorias extends Vue {
  public categorias: Categoria[] = [];
  public categoriasSelecionadas: number[] = [];
  public valorMinimo: number = 0;
  public valorMaximo: number = 1000;
  public coresSelecionadas: number[] = [];
  public cores: object[] = [
    {
      nome: 'Branco',
      class: 'blue-grey',
    },
    {
      nome: 'Preto',
      class: 'blue-grey',
    },
    {
      nome: 'Vermelho',
      class: 'red',
    },
    {
      nome: 'Verde',
      class: 'green',
    },
    {
      nome: 'Azul',
      class: 'blue',
    },
    {
      nome: 'Rosa',
      class: 'pink',
    },
    {
      nome: 'Roxo',
      class: 'purple',
    },
    {
      nome: 'Amarelo',
      class: 'amber',
    },
    {
      nome: 'Laranja',
      class: 'deep-orange',
    },
    {
      nome: 'Marrom',
      class: 'brown',
    },
  ];

  public filtrarCategoria(): void {
    const categorias = this.categoriasSelecionadas.map((i) => this.categorias[i].id);
    const params = { categorias_like: categorias };
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
      this.categorias = response.data;
    });
  }

  public sortItems(): void {
    this.categorias = this.categorias.sort((a, b) => (a.nome > b.nome ? 1 : -1));
  }

  public async created(): Promise<void> {
    await this.getCategorias();
    this.sortItems();
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
</style>
