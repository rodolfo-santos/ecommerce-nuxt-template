<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class extends Vue {
  public items = [
    {
      src: require('~/static/images/site-images/banner_loja.jpg'),
      content: ['Desapegou!', 'Roupas Sociais a', 'preços Incríveis']
    },
    {
      src: require('~/static/images/site-images/banner_loja.jpg'),
      content: ['Confira as Novidades', 'fique ligado nos', 'Últimos Anúncios']
    }
  ];
}
</script>

<template>
  <v-carousel class="home-banner">
    <v-carousel-item v-for="(item, i) in items" :key="i">
      <v-parallax :src="item.src">
        <v-container class="home-banner__content">
          <div class="display-1 text-upper pb-2">{{ item.content[0] }}</div>
          <div class="display-2 text-upper">{{ item.content[1] }}</div>
          <div class="display-2 text-upper">{{ item.content[2] }}</div>
          <hr class="hr-base" />
          <v-btn outlined color="white" class="home-banner__cta" link to="/category"> Confira Agora </v-btn>
        </v-container>
      </v-parallax>
    </v-carousel-item>
  </v-carousel>
</template>

<style lang="scss">
.home-banner {
  height: 100vh;
}

.home-banner__content {
  display: flex;
  flex-flow: column;
  height: 100%;
  justify-content: center;
  padding-bottom: 100px;
}

.home-banner__cta {
  max-width: 250px;
}

.home-banner .v-carousel__item,
.home-banner .v-parallax {
  height: 100% !important;
}

@media (max-width: $bk-xs) {
  .home-banner {
    height: 85vh !important;
  }

  .home-banner__cta {
    padding: 30px !important;
    background-color: rgba($secondary, 0.8);
  }
}
</style>
