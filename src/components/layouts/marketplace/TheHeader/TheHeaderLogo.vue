<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TheHeaderLogo extends Vue {
  public logo: string = require('@/assets/logo/logo.svg');
}
</script>

<template>
  <v-toolbar-title>
    <router-link to="/">
      <v-img :src="logo" class="logo"></v-img>
    </router-link>
  </v-toolbar-title>
</template>

<style>
.logo {
  max-width: 100px;
}
</style>
