<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { categoryService } from '@/services/api';
import { SkeletonProductList } from '@/components/utils';
import { ICategory } from '@/models/data';

@Component({ components: { SkeletonProductList } })
export default class Categorias extends Vue {
  public categories: ICategory[] = [];
  public overlay: boolean = false;

  public getCategorias(): void {
    categoryService.get(6).then((response) => {
      this.categories = response.data;
    });
  }

  public created(): void {
    this.getCategorias();
  }
}
</script>

<template>
  <v-container class="mt-10">
    <v-row v-if="categories.length === 0">
      <v-col>
        <SkeletonProductList :cols="6" :rows="1" :size="1" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col class="m-auto col-6 col-md-3 col-lg-2" v-for="category in categories" :key="category.id">
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card class="category" :to="{ name: 'Categoria', params: { id: category.id } }" :style="`background: url(${category.image})`" hover>
              <v-card-text class="texto">{{ category.name }}</v-card-text>
              <v-fade-transition>
                <v-overlay v-if="hover" absolute color="#16D17E" class="overlay-texto">
                  {{ category.name }}
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
@import '@/sass/custom.scss';

.category {
  border: $primary 2px solid;
  min-height: 200px;
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  transition: 0.25s !important;

  display: flex;
  align-items: center;
  text-align: center;

  &:hover {
    transform: scale(1.05);
  }

  .texto,
  .overlay-texto {
    font-size: 1.5em !important;
  }
}
</style>
