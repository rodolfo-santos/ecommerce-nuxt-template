<script>
import { Component, Vue } from 'vue-property-decorator';
import { HomeBanner, HomeBestProducts, HomeCategories, HomeDivImage, HomeLaunched } from '@/components/Home';

@Component({
  components: {
    HomeBanner,
    HomeBestProducts,
    HomeCategories,
    HomeDivImage,
    HomeLaunched,
  },
})
export default class Home extends Vue {}
</script>

<template>
  <v-main>
    <HomeBanner />
    <HomeCategories />
    <HomeLaunched />
    <HomeDivImage />
    <HomeBestProducts />
    <v-container class="flex-center">
      <a href="https://www.instagram.com/rodolfo.d.santos/" target="_blank">
        <v-btn large color="primary"> <v-icon left>mdi-instagram</v-icon> Visite nosso Instagram </v-btn>
      </a>
    </v-container>
  </v-main>
</template>

<style lang="scss" scoped></style>
