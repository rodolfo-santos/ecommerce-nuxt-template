<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  HomeBanner,
  HomeBestProducts,
  HomeCategories,
  HomeDivImage,
  HomeLaunched,
  HomeInstagramVisit
} from '@/components/pages/home';

@Component({
  components: { HomeBanner, HomeBestProducts, HomeCategories, HomeDivImage, HomeLaunched, HomeInstagramVisit }
})
export default class extends Vue {}
</script>

<template>
  <v-main>
    <HomeBanner />
    <HomeCategories />
    <HomeLaunched />
    <HomeDivImage />
    <HomeBestProducts />
    <HomeInstagramVisit />
  </v-main>
</template>
