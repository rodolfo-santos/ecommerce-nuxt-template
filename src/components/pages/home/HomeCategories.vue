<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { categoryService } from '@/services/api';
import { SkeletonProductList } from '@/components/utils';
import { ICategory } from '@/models/data';

@Component({ components: { SkeletonProductList } })
export default class extends Vue {
  public categories: ICategory[] = [];
  public isLoading: boolean = true;

  created(): void {
    this.fetchCategories();
  }

  private async fetchCategories(): Promise<void> {
    this.isLoading = true;
    try {
      const { data } = await categoryService.get(6);
      this.categories = data;
    } catch (error) {
      console.error(error);
    }
    this.isLoading = false;
  }
}
</script>

<template>
  <v-container class="mt-10">
    <v-row v-if="isLoading">
      <v-col>
        <SkeletonProductList :cols="6" :rows="1" :size="1" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col class="m-auto col-6 col-md-3 col-lg-2" v-for="category in categories" :key="category.id">
        <v-hover>
          <template #default="{ hover }">
            <v-card
              class="home-categories__card"
              :to="{ name: 'category', params: { id: category.id } }"
              :style="`background: url(${category.image})`"
              hover>
              <v-card-text class="home-categories__card-text">{{ category.name }}</v-card-text>
              <v-fade-transition>
                <v-overlay v-if="hover" absolute color="#16D17E" class="home-categories__card-text">
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

.home-categories__card {
  border: $primary 2px solid;
  min-height: 200px;
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  transition: 0.25s !important;

  display: flex;
  align-items: center;
  text-align: center;
}

.home-categories__card:hover {
  transform: scale(1.05);
}

.home-categories__card-text {
  font-size: 1.5em !important;
}
</style>
