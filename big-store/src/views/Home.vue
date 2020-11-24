<template>
  <v-main>
    <Banner />
    <Categorias />
    <Lancamentos />
    <DivImage />
  </v-main>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import Banner from '@/components/Home/Banner.vue';
import Categorias from '@/components/Home/Categorias.vue';
import Lancamentos from '@/components/Home/Lancamentos.vue';
import DivImage from '@/components/DivImage.vue';

@Component({
  components: {
    Banner,
    Categorias,
    Lancamentos,
    DivImage,
  },
})
export default class Home extends Vue {}
</script>

<style></style>
