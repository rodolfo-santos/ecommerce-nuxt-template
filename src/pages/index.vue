<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import {
  HomeBanner,
  HomeBestProducts,
  HomeCategories,
  HomeDivImage,
  HomeLaunched,
  HomeInstagramVisit
} from '~/components/pages/home';

@Component({
  layout: 'marketplace',
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
