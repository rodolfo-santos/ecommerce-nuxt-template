<template>
  <v-carousel class="banner-home">
    <v-carousel-item class="banner" v-for="(item, i) in items" :key="i">
      <v-parallax :src="item.src">
        <v-container class="content">
          <h5 class="display-1 text-upper pb-2">{{ item.content.texto01 }}</h5>
          <h4 class="display-2 text-upper">{{ item.content.texto02 }}</h4>
          <h4 class="display-2 text-upper">{{ item.content.texto03 }}</h4>
          <hr class="hr-base" />
          <v-btn outlined color="white" class="btn-banner" link :to="{ name: 'Loja' }"> Confira Agora</v-btn>
        </v-container>
      </v-parallax>
    </v-carousel-item>
  </v-carousel>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Banner extends Vue {
  public items: any = [
    {
      src: require('@/assets/imagens/banner_loja.jpg'),
      content: {
        texto01: 'Desapegou!',
        texto02: 'Roupas Sociais a',
        texto03: 'preços Incríveis',
      },
    },
    {
      src: require('@/assets/imagens/banner_loja.jpg'),
      content: {
        texto01: 'Confira as Novidades',
        texto02: 'fique ligado nos',
        texto03: 'Últimos Anúncios',
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
