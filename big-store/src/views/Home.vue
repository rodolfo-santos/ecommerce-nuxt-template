<template>
  <v-main>
    <Banner />
    <Categorias />
    <Lancamentos />
    <DivImage />
    <MelhoresProdutos />
    <v-container class="flex-center">
      <v-btn large color="primary"><v-icon left>mdi-instagram</v-icon> Visite nosso Instagram</v-btn>
    </v-container>
  </v-main>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import Banner from '@/components/Home/Banner.vue';
import Categorias from '@/components/Home/Categorias.vue';
import Lancamentos from '@/components/Home/Lancamentos.vue';
import DivImage from '@/components/Home/DivImage.vue';
import MelhoresProdutos from '@/components/Home/MelhoresProdutos.vue';

@Component({
  components: {
    Banner,
    Categorias,
    Lancamentos,
    DivImage,
    MelhoresProdutos,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>

</style>
