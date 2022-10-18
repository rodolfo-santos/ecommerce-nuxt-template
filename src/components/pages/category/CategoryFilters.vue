<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { objectToQuery } from '@/assets/ts';
import { categoryService } from '@/services/api';
import { ICategory } from '@/models/data';

type IColor = { name: string; class: string };

@Component
export default class extends Vue {
  public categories: ICategory[] = [];
  public selectedCategories: number[] = [];
  public minPrice: number = 0;
  public maxPrice: number = 1000;
  public selectedColors: number[] = [];
  public colorsOptions: IColor[] = [
    { name: 'Branco', class: 'blue-grey' },
    { name: 'Preto', class: 'blue-grey' },
    { name: 'Vermelho', class: 'red' },
    { name: 'Verde', class: 'green' },
    { name: 'Azul', class: 'blue' },
    { name: 'Rosa', class: 'pink' },
    { name: 'Roxo', class: 'purple' },
    { name: 'Amarelo', class: 'amber' },
    { name: 'Laranja', class: 'deep-orange' },
    { name: 'Marrom', class: 'brown' },
  ];

  public filterCategory(): void {
    const categories = this.selectedCategories.map((i) => this.categories[i].id);
    const params = { categories_like: categories };
    this.filter(params, true);
  }

  public filterByPrice(): void {
    const params = { price_gte: this.minPrice, price_lte: this.maxPrice };
    this.filter(params, true);
  }

  public filter(filter, isFirstPage: boolean): void {
    const query = { ...this.$route.query };
    if (isFirstPage) filter = Object.assign(filter, { _page: 1 });
    const novaQuery = Object.assign(query, filter);
    const url: string = objectToQuery(novaQuery);
    this.$router.push('?' + url).catch(() => {});
  }

  public async fetchCategories(): Promise<void> {
    await categoryService.get(35).then((response) => {
      this.categories = response.data;
    });
  }

  public sortItems(): void {
    this.categories = this.categories.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  public async created(): Promise<void> {
    await this.fetchCategories();
    this.sortItems();
  }
}
</script>

<template>
  <v-card class="categories-list">
    <div class="filter-title mb-4">Refinar Busca</div>

    <v-card class="filter-option pa-4 mb-4" elevation="2">
      <div class="option-title mb-2">Adicionar Sub-Categorias</div>
      <v-chip-group v-model="selectedCategories" active-class="primary" column multiple>
        <v-chip v-for="(category, index) in categories" :key="index" @input="filterCategory">{{ category.name }}</v-chip>
      </v-chip-group>
    </v-card>

    <v-card class="filter-option pa-4 mb-4" elevation="2">
      <div class="option-title mb-2">Faixa de Preço</div>
      <div class="pl-2">
        <div class="d-flex justify-space-between">
          <div class="align-end">Valor Máximo</div>
          <div>
            <input v-model="maxPrice" class="input-price" type="number" @change="filterByPrice" />
          </div>
        </div>
        <v-slider v-model="maxPrice" :min="minPrice" :max="1000" class="align-center" @change="filterByPrice"></v-slider>

        <div class="d-flex justify-space-between">
          <div>Valor Mínimo</div>
          <div>
            <input v-model="minPrice" class="input-price" type="number" @change="filterByPrice" />
          </div>
        </div>
        <v-slider v-model="minPrice" :max="maxPrice" :min="0" class="align-center" @change="filterByPrice"></v-slider>
      </div>
    </v-card>

    <v-card class="filter-option pa-4 mb-4" elevation="2">
      <div class="option-title mb-2">Cor</div>
      <v-chip-group v-model="selectedColors" column multiple>
        <v-chip v-for="cor in colorsOptions" :key="cor.name" :active-class="cor.class">{{ cor.name }}</v-chip>
      </v-chip-group>
    </v-card>
  </v-card>
</template>

<style lang="scss" scoped>
@import '@/sass/custom.scss';

.categories-list {
  background-color: $secondary;
}

.filter-title {
  font-size: 0.9em;
  text-transform: uppercase;
  border-left: $primary solid 3px;
  padding-left: 10px;
}

.filter-option {
  background-color: darken($secondary, 1%);
}

.option-title {
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
