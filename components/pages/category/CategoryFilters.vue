<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { objectToQuery } from '~/assets/ts';
import { categoryService } from '~/services/api';
import { ICategory, IProductQuery } from '~/models/data';

type IColor = { name: string; class: string; active: boolean };
type ISubCategory = ICategory & { active: boolean };
@Component
export default class extends Vue {
  public subCategories: ISubCategory[] = [];
  public selectedSubCategoriesIndex: number[] = [];
  public minPrice: number = Number(this.$route.query.price_gte) || 0;
  public maxPrice: number = Number(this.$route.query.price_lte) || 1000;
  public selectedColors: number[] = [];
  public colorsOptions: IColor[] = [
    { name: 'Branco', class: 'blue-grey', active: false },
    { name: 'Preto', class: 'blue-grey', active: false },
    { name: 'Vermelho', class: 'red', active: false },
    { name: 'Verde', class: 'green', active: false },
    { name: 'Azul', class: 'blue', active: false },
    { name: 'Rosa', class: 'pink', active: false },
    { name: 'Roxo', class: 'purple', active: false },
    { name: 'Amarelo', class: 'amber', active: false },
    { name: 'Laranja', class: 'deep-orange', active: false },
    { name: 'Marrom', class: 'brown', active: false }
  ];

  public get selectedSubCategoriesIds(): string[] {
    return this.selectedSubCategoriesIndex.map((i) => this.subCategories[i].id);
  }

  async fetch() {
    const { data } = await categoryService.get(35);
    this.subCategories = data
      .sort((a, b) => (a.name > b.name ? 1 : -1))
      .filter((category) => category.id !== this.$route.params.id);
  }

  mounted() {
    this.selectedSubCategoriesIndex = this.subCategories
      .map((category, i) => (this.$route.query.categories_like?.includes(category.id) ? i : -1))
      .filter((i) => i !== -1);
  }

  public filterCategory(): void {
    const params: IProductQuery = { categories_like: this.selectedSubCategoriesIds };
    this.filter(params, true);
  }

  public filterByPrice(): void {
    const params: IProductQuery = { price_gte: this.minPrice, price_lte: this.maxPrice };
    this.filter(params, true);
  }

  public filter(query: IProductQuery, isFirstPage: boolean): void {
    if (isFirstPage) query = Object.assign(query, { _page: 1 });
    const newQuery = {
      ...this.$route.query,
      ...query
    };

    const queryParams: string = objectToQuery(newQuery);
    this.$router.push(`${this.$route.path}${queryParams}`);
  }
}
</script>

<template>
  <v-card class="sub-categories-list">
    <div class="filter-title mb-4">Refinar Busca</div>

    <v-card class="filter-option pa-4 mb-4" elevation="2">
      <div class="option-title mb-2">Adicionar Sub-Categorias</div>
      <v-chip-group v-model="selectedSubCategoriesIndex" active-class="primary" column multiple>
        <v-chip v-for="(category, index) in subCategories" :key="index" @input="filterCategory">{{
          category.name
        }}</v-chip>
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
        <v-slider
          v-model="maxPrice"
          :min="minPrice"
          :max="1000"
          class="align-center"
          @change="filterByPrice"></v-slider>

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
        <v-chip
          v-for="color in colorsOptions"
          :key="color.name"
          :active-class="color.class"
          :input-value="color.active"
          >{{ color.name }}</v-chip
        >
      </v-chip-group>
    </v-card>
  </v-card>
</template>

<style lang="scss" scoped>
.sub-categories-list {
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
