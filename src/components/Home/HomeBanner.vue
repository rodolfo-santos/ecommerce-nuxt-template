<template>
  <v-carousel class="banner-home">
    <v-carousel-item class="banner" v-for="(item, i) in items" :key="i">
      <v-parallax :src="item.src">
        <v-container class="content">
          <h5 class="display-1 text-upper pb-2">{{ item.content.textOne }}</h5>
          <h4 class="display-2 text-upper">{{ item.content.textTwo }}</h4>
          <h4 class="display-2 text-upper">{{ item.content.textoThree }}</h4>
          <hr class="hr-base" />
          <v-btn outlined color="white" class="btn-banner" link :to="{ name: 'Store' }"> Confira Agora</v-btn>
        </v-container>
      </v-parallax>
    </v-carousel-item>
  </v-carousel>
</template>

<script lang="ts">
import { IBannerData } from '@/models/data';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
  public items: IBannerData[] = [
    {
      src: require('@/assets/images/banner_loja.jpg'),
      content: {
        textOne: 'Desapegou!',
        textTwo: 'Roupas Sociais a',
        textoThree: 'preços Incríveis',
      },
    },
    {
      src: require('@/assets/images/banner_loja.jpg'),
      content: {
        textOne: 'Confira as Novidades',
        textTwo: 'fique ligado nos',
        textoThree: 'Últimos Anúncios',
      },
    },
  ];
}
</script>

<style lang="scss">
@import '@/sass/custom.scss';

.banner-home {
  height: 100vh;

  @media (max-width: 600px) {
    height: 85vh !important;
  }

  .content {
    display: flex;
    flex-flow: column;
    height: 100%;
    justify-content: center;
    padding-bottom: 100px;

    h4 {
      font-weight: bold;
    }
  }

  .btn-banner {
    max-width: 250px;
    @media (max-width: 600px) {
      padding: 30px !important;
      background-color: rgba($secondary, 0.8);
    }
  }

  .v-carousel__item,
  .v-parallax {
    height: 100% !important;
  }
}
</style>
