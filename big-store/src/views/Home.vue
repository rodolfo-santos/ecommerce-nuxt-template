<template>
  <v-main>
    <Banner />
    <Categorias />
  </v-main>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import Banner from '@/components/Home/Banner.vue';
import Categorias from '@/components/Home/Categorias.vue';

@Component({
  components: {
    Banner,
    Categorias,
  },
})
export default class Home extends Vue {}
</script>

<style></style>
