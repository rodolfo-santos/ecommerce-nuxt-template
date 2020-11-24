<template>
  <v-main>
    <Banner />
  </v-main>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import Banner from '../components/Home/Banner.vue';

@Component({
  components: {
    Banner,
  },
})
export default class Home extends Vue {}
</script>

<style></style>
