<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class TheHeaderLogo extends Vue {
  public logo: string = require('~/assets/images/logo/logo.svg');
}
</script>

<template>
  <v-toolbar-title>
    <nuxt-link to="/">
      <v-img :src="logo" class="logo"></v-img>
    </nuxt-link>
  </v-toolbar-title>
</template>

<style>
.logo {
  max-width: 100px;
}
</style>
